import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import {
  amountDueInTaxi,
  amountDueOnline,
  calculateQuote,
  isAirport,
  meetsLeadTime,
} from '@/lib/pricing';
import { bookingConfirmationEmail, sendEmail } from '@/lib/email';
import { createCheckout } from '@/lib/payments/sumup';
import { SITE_URL } from '@/lib/site';

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
  paymentMode: z.enum(['FEE_ONLY', 'FULL_PREPAID']).default('FEE_ONLY'),
  notes: z.string().trim().max(1000).optional(),
  locale: z.string().trim().max(5).default('en'),
});

const CITY_BOUNDS = { minLat: 41.2, maxLat: 41.55, minLng: 1.9, maxLng: 2.35 };

function insideServiceArea(p: { lat: number; lng: number }): boolean {
  return (
    p.lat >= CITY_BOUNDS.minLat &&
    p.lat <= CITY_BOUNDS.maxLat &&
    p.lng >= CITY_BOUNDS.minLng &&
    p.lng <= CITY_BOUNDS.maxLng
  );
}

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
  if (!insideServiceArea(input.pickup) && !isAirport(input.pickup)) {
    return NextResponse.json({ error: 'pickup_outside_area' }, { status: 422 });
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

  const amountOnline = amountDueOnline(quote, input.paymentMode);
  const amountInTaxi = amountDueInTaxi(quote, input.paymentMode);

  const reference = makeReference();

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
        paymentMode: input.paymentMode,
        pickupAt,
        passengers: input.passengers,
        luggage: input.luggage,
        notes: input.notes,
        vehicleId: vehicle?.id,
        locale: input.locale,
      },
    });

    // Under FEE_ONLY this is the booking fee alone; under FULL_PREPAID it is the
    // fixed fare plus the fee. The metered fare is never charged online.
    const checkout = await createCheckout({
      amount: amountOnline,
      currency: quote.currency,
      reference,
      description:
        input.paymentMode === 'FULL_PREPAID'
          ? `Barcelona taxi ${reference} — fare and booking fee`
          : `Booking fee for Barcelona taxi ${reference}`,
      returnUrl: `${SITE_URL}/${input.locale}/booking/${reference}`,
    });

    await prisma.booking.update({
      where: { id: booking.id },
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
      paymentMode: input.paymentMode,
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

    return NextResponse.json(
      {
        reference,
        quote,
        amountOnline,
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
