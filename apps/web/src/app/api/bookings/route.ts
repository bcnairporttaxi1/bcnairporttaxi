import { NextResponse } from 'next/server';
import { clientKey, rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { randomBytes, randomUUID } from 'node:crypto';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import {
  amountDueInTaxi,
  amountDueOnline,
  calculateQuote,
  servesTrip,
  meetsLeadTime,
} from '@bcn/core/pricing';
import { DEFAULT_PAYMENT_MODE } from '@bcn/core/tariffs';
import { adminBookingEmail, bookingConfirmationEmail, sendEmail } from '@/lib/email';
import { createCheckout } from '@/lib/payments/sumup';
import { ADMIN_NOTIFY_EMAIL, SITE_URL, absoluteUrl } from '@bcn/core/site';

const OSRM = process.env.OSRM_BASE_URL ?? 'https://router.project-osrm.org';

const coord = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  label: z.string().trim().min(1).max(300),
});

const bodySchema = z.object({
  pickup: coord,
  dropoff: coord,
  pickupAt: z.iso.datetime(),
  contactName: z.string().trim().min(2).max(120),
  contactEmail: z.email().max(200),
  contactPhone: z.string().trim().min(6).max(40),
  passengers: z.number().int().min(1).max(8),
  luggage: z.number().int().min(0).max(12),
  vehicleSlug: z.string().trim().max(60).optional(),
  /* Accepted for backward compatibility with in-flight clients and ignored:
     the server decides the mode. See paymentMode below. */
  paymentMode: z.enum(['FEE_ONLY', 'FULL_PREPAID']).optional(),
  notes: z.string().trim().max(1000).optional(),
  /** Airline code and number, e.g. VY8301. Free text, the driver reads it. */
  flightNumber: z.string().trim().toUpperCase().max(12).optional(),
  /** Present when the passenger wants the journey back too. */
  returnAt: z.iso.datetime().optional(),
  returnFlightNumber: z.string().trim().toUpperCase().max(12).optional(),
  locale: z.string().trim().max(5).default('en'),
});

const RETURN_MIN_GAP_MS = 60 * 60 * 1000;

/** Human-quotable reference, e.g. BCN-7Q4K2M. Avoids ambiguous 0/O/1/I. */
function makeReference(): string {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const bytes = randomBytes(6);
  let out = '';
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `BCN-${out}`;
}

async function fetchRoute(
  pickup: { lat: number; lng: number },
  dropoff: { lat: number; lng: number },
) {
  const path = `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`;
  const url = new URL(`/route/v1/driving/${path}`, OSRM);
  url.searchParams.set('overview', 'false');

  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    code: string;
    routes?: Array<{ distance: number; duration: number }>;
  };
  const route = data.routes?.[0];
  if (data.code !== 'Ok' || !route) return null;

  return {
    roadKm: Math.round((route.distance / 1000) * 100) / 100,
    durationMin: Math.round(route.duration / 60),
  };
}

export async function POST(request: Request) {
  // Ten bookings per ten minutes from one address. Well above any real
  // customer, well below what it takes to fill the table with junk and
  // burn SumUp checkouts and outbound email.
  const limit = rateLimit(clientKey(request, 'bookings'), 10, 600);
  if (!limit.ok) return tooManyRequests(limit);

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_input', issues: parsed.error.issues.map((i) => i.path.join('.')) },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const pickupAt = new Date(input.pickupAt);

  if (!meetsLeadTime(pickupAt)) {
    return NextResponse.json({ error: 'lead_time' }, { status: 422 });
  }
  if (!servesTrip(input.pickup, input.dropoff)) {
    return NextResponse.json({ error: 'pickup_outside_area' }, { status: 422 });
  }

  // A return leg is a second ride, back the other way, at a later time. It
  // must be a real interval after the outbound so the two cannot overlap.
  const returnAt = input.returnAt ? new Date(input.returnAt) : null;
  if (returnAt && returnAt.getTime() < pickupAt.getTime() + RETURN_MIN_GAP_MS) {
    return NextResponse.json({ error: 'return_too_early' }, { status: 422 });
  }

  // Distance and price are recomputed here from scratch. Anything the client
  // sent about km or fare is ignored, so a tampered payload cannot set a price.
  const route = await fetchRoute(input.pickup, input.dropoff);
  if (!route) {
    return NextResponse.json({ error: 'routing_unavailable' }, { status: 502 });
  }

  // Vehicle first: 5-8 seat vehicles carry an official supplement, so the
  // quote depends on which one was chosen.
  const vehicle = input.vehicleSlug
    ? await prisma.vehicle.findUnique({ where: { slug: input.vehicleSlug } })
    : null;

  const quote = calculateQuote({
    pickup: input.pickup,
    dropoff: input.dropoff,
    roadKm: route.roadKm,
    durationMin: route.durationMin,
    pickupAt,
    vehicleSeats: vehicle?.seats,
  });

  // The return is priced on its own road and its own time of day — a
  // night-rate leg back costs what a night-rate leg costs.
  const returnRoute = returnAt ? await fetchRoute(input.dropoff, input.pickup) : null;
  if (returnAt && !returnRoute) {
    return NextResponse.json({ error: 'routing_unavailable' }, { status: 502 });
  }
  const returnQuote =
    returnAt && returnRoute
      ? calculateQuote({
          pickup: input.dropoff,
          dropoff: input.pickup,
          roadKm: returnRoute.roadKm,
          durationMin: returnRoute.durationMin,
          pickupAt: returnAt,
          vehicleSeats: vehicle?.seats,
        })
      : null;

  /* Every booking is all-inclusive and prepaid. Fixed here rather than taken
     from the request so the amount charged online is always the whole price. */
  const paymentMode = DEFAULT_PAYMENT_MODE;
  const amountOnline = amountDueOnline(quote, paymentMode);
  const amountInTaxi = amountDueInTaxi(quote, paymentMode);
  const returnAmountOnline = returnQuote ? amountDueOnline(returnQuote, paymentMode) : 0;

  const reference = makeReference();
  const returnReference = returnQuote ? makeReference() : null;
  const groupId = returnQuote ? randomUUID() : null;

  try {
    const booking = await prisma.booking.create({
      data: {
        reference,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        pickupLabel: input.pickup.label,
        pickupLat: input.pickup.lat,
        pickupLng: input.pickup.lng,
        dropoffLabel: input.dropoff.label,
        dropoffLat: input.dropoff.lat,
        dropoffLng: input.dropoff.lng,
        roadKm: quote.roadKm,
        durationMin: quote.durationMin,
        tariff: quote.tariff,
        startFare: quote.startFare,
        perKmRate: quote.perKmRate,
        perKmRateCharged: quote.perKmRateCharged,
        supplements: quote.supplements,
        meterEstimate: quote.meterEstimate,
        fixedFare: quote.fixedFare,
        bookingFee: quote.bookingFee,
        amountOnline,
        paymentMode,
        pickupAt,
        passengers: input.passengers,
        luggage: input.luggage,
        notes: input.notes,
        flightNumber: input.flightNumber || null,
        groupId,
        vehicleId: vehicle?.id,
        // Kept apart from vehicleId, which assignment overwrites with the
        // driver's own car. This stays as what the passenger paid for.
        requestedVehicleId: vehicle?.id,
        locale: input.locale,
      },
    });

    const returnBooking =
      returnQuote && returnAt && returnReference
        ? await prisma.booking.create({
            data: {
              reference: returnReference,
              contactName: input.contactName,
              contactEmail: input.contactEmail,
              contactPhone: input.contactPhone,
              pickupLabel: input.dropoff.label,
              pickupLat: input.dropoff.lat,
              pickupLng: input.dropoff.lng,
              dropoffLabel: input.pickup.label,
              dropoffLat: input.pickup.lat,
              dropoffLng: input.pickup.lng,
              roadKm: returnQuote.roadKm,
              durationMin: returnQuote.durationMin,
              tariff: returnQuote.tariff,
              startFare: returnQuote.startFare,
              perKmRate: returnQuote.perKmRate,
              perKmRateCharged: returnQuote.perKmRateCharged,
              supplements: returnQuote.supplements,
              meterEstimate: returnQuote.meterEstimate,
              fixedFare: returnQuote.fixedFare,
              bookingFee: returnQuote.bookingFee,
              amountOnline: returnAmountOnline,
              paymentMode,
              pickupAt: returnAt,
              passengers: input.passengers,
              luggage: input.luggage,
              notes: input.notes,
              flightNumber: input.returnFlightNumber || null,
              groupId,
              vehicleId: vehicle?.id,
              requestedVehicleId: vehicle?.id,
              locale: input.locale,
            },
          })
        : null;

    // Under FEE_ONLY this is the booking fee alone; under FULL_PREPAID it is the
    // fixed fare plus the fee. The metered fare is never charged online.
    // One checkout covers both legs; both rows carry its id, and payment
    // confirmation flips every booking on that checkout together.
    const checkout = await createCheckout({
      amount: amountOnline + returnAmountOnline,
      currency: quote.currency,
      reference,
      description: returnReference
        ? `Barcelona taxi ${reference} + return ${returnReference}`
        : `Barcelona taxi ${reference} — all-inclusive`,
      returnUrl: `${SITE_URL}/${input.locale}/booking/${reference}`,
    });

    await prisma.booking.updateMany({
      where: { id: { in: [booking.id, ...(returnBooking ? [returnBooking.id] : [])] } },
      data: { sumupCheckoutId: checkout.checkoutId },
    });

    // Email failure must not fail the booking — it is already persisted.
    const mail = bookingConfirmationEmail({
      reference,
      contactName: input.contactName,
      pickupLabel: input.pickup.label,
      dropoffLabel: input.dropoff.label,
      pickupAt,
      roadKm: quote.roadKm,
      durationMin: quote.durationMin,
      tariff: quote.tariff,
      paymentMode,
      meterEstimate: quote.meterEstimate,
      fixedFare: quote.fixedFare,
      bookingFee: quote.bookingFee,
      amountOnline,
      amountInTaxi,
      vehicleName: vehicle?.name,
      feePaid: false,
      locale: input.locale,
    });

    const emailResult = await sendEmail({
      to: input.contactEmail,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });

    if (returnBooking && returnQuote && returnAt) {
      const back = bookingConfirmationEmail({
        reference: returnBooking.reference,
        contactName: input.contactName,
        pickupLabel: input.dropoff.label,
        dropoffLabel: input.pickup.label,
        pickupAt: returnAt,
        roadKm: returnQuote.roadKm,
        durationMin: returnQuote.durationMin,
        tariff: returnQuote.tariff,
        paymentMode,
        meterEstimate: returnQuote.meterEstimate,
        fixedFare: returnQuote.fixedFare,
        bookingFee: returnQuote.bookingFee,
        amountOnline: returnAmountOnline,
        amountInTaxi: amountDueInTaxi(returnQuote, paymentMode),
        vehicleName: vehicle?.name,
        feePaid: false,
        locale: input.locale,
      });
      await sendEmail({ to: input.contactEmail, ...back });
    }

    // The desk hears about every booking the moment it exists. Not awaited
    // on the same promise as the receipt so a failure here cannot fail the
    // booking — the passenger has already been charged or is about to be.
    const notice = adminBookingEmail({
      reference,
      paid: false,
      contactName: input.contactName,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      pickupLabel: input.pickup.label,
      dropoffLabel: input.dropoff.label,
      pickupAt,
      roadKm: route.roadKm,
      durationMin: route.durationMin,
      passengers: input.passengers,
      luggage: input.luggage,
      vehicleName: vehicle?.name,
      notes: input.notes,
      flightNumber: input.flightNumber,
      amountOnline,
      locale: input.locale,
      rideUrl: absoluteUrl(`/en/admin/rides/${reference}`),
    });
    sendEmail({ to: ADMIN_NOTIFY_EMAIL, replyTo: input.contactEmail, ...notice }).catch(
      (err) => console.error('Admin booking notice failed:', err),
    );

    if (returnBooking && returnQuote && returnAt && returnRoute) {
      const backNotice = adminBookingEmail({
        reference: returnBooking.reference,
        paid: false,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        pickupLabel: input.dropoff.label,
        dropoffLabel: input.pickup.label,
        pickupAt: returnAt,
        roadKm: returnRoute.roadKm,
        durationMin: returnRoute.durationMin,
        passengers: input.passengers,
        luggage: input.luggage,
        vehicleName: vehicle?.name,
        notes: input.notes,
        flightNumber: input.returnFlightNumber,
        amountOnline: returnAmountOnline,
        locale: input.locale,
        rideUrl: absoluteUrl(`/en/admin/rides/${returnBooking.reference}`),
      });
      sendEmail({ to: ADMIN_NOTIFY_EMAIL, replyTo: input.contactEmail, ...backNotice }).catch(
        (err) => console.error('Admin booking notice failed:', err),
      );
    }

    return NextResponse.json(
      {
        reference,
        returnReference,
        quote,
        returnQuote,
        amountOnline: amountOnline + returnAmountOnline,
        amountInTaxi,
        payment: {
          configured: checkout.configured,
          redirectUrl: checkout.redirectUrl,
        },
        emailSent: emailResult.sent,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Booking creation failed:', err);
    return NextResponse.json({ error: 'booking_failed' }, { status: 500 });
  }
}
