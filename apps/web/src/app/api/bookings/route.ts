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
import {
  MAX_CARS_PER_BOOKING,
  allocateParty,
  type VehicleChoice,
} from '@bcn/core/party';

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
  // Across every car in the booking, not per car: six vans hold plenty.
  passengers: z.number().int().min(1).max(8 * MAX_CARS_PER_BOOKING),
  luggage: z.number().int().min(0).max(12 * MAX_CARS_PER_BOOKING),
  /** A single vehicle. Kept for clients that predate `vehicles`. */
  vehicleSlug: z.string().trim().max(60).optional(),
  /**
   * One entry per vehicle class the passenger wants, with how many of each.
   * A party of ten books two vans; each van is dispatched separately and so
   * becomes its own booking, and they are paid for together.
   */
  vehicles: z
    .array(
      z.object({
        slug: z.string().trim().min(1).max(60),
        count: z.number().int().min(1).max(MAX_CARS_PER_BOOKING),
      }),
    )
    .min(1)
    .max(8)
    .optional(),
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

  /*
   * The fleet for this booking.
   *
   * `vehicles` carries a count per class; `vehicleSlug` is the older single
   * -vehicle form and means one of that class. Either way what comes out is a
   * list of physical cars, because each car is dispatched to its own driver
   * and therefore becomes its own booking row.
   */
  const wanted = input.vehicles ?? (input.vehicleSlug ? [{ slug: input.vehicleSlug, count: 1 }] : []);

  const vehicleRows = wanted.length
    ? await prisma.vehicle.findMany({ where: { slug: { in: wanted.map((w) => w.slug) } } })
    : [];
  const bySlug = new Map(vehicleRows.map((v) => [v.slug, v]));

  const choices: VehicleChoice[] = [];
  for (const w of wanted) {
    const row = bySlug.get(w.slug);
    // An unknown slug is a client out of step with the fleet, not something
    // to price as a saloon and hope.
    if (!row) return NextResponse.json({ error: 'unknown_vehicle' }, { status: 400 });
    choices.push({ slug: row.slug, seats: row.seats, bags: row.bags, count: w.count });
  }

  const totalCars = choices.reduce((n, c) => n + c.count, 0);
  if (totalCars > MAX_CARS_PER_BOOKING) {
    return NextResponse.json({ error: 'too_many_vehicles' }, { status: 400 });
  }

  // One car is still the overwhelming majority, and an empty choice keeps the
  // old behaviour: priced as a saloon with nothing recorded against it.
  const allocation =
    totalCars > 0 ? allocateParty(choices, input.passengers, input.luggage) : null;
  if (totalCars > 0 && !allocation) {
    return NextResponse.json({ error: 'party_does_not_fit' }, { status: 400 });
  }

  /** One entry per car, or a single unspecified car when none was chosen. */
  const cars: Array<{
    vehicle: (typeof vehicleRows)[number] | null;
    passengers: number;
    luggage: number;
  }> = allocation
    ? allocation.map((a) => ({
        vehicle: bySlug.get(a.slug) ?? null,
        passengers: a.passengers,
        luggage: a.luggage,
      }))
    : [{ vehicle: null, passengers: input.passengers, luggage: input.luggage }];

  // Priced per car: a 5-8 seat vehicle carries an official supplement, so a
  // mixed booking genuinely costs different amounts per car.
  const quotes = cars.map((c) =>
    calculateQuote({
      pickup: input.pickup,
      dropoff: input.dropoff,
      roadKm: route.roadKm,
      durationMin: route.durationMin,
      pickupAt,
      vehicleSeats: c.vehicle?.seats,
    }),
  );
  const quote = quotes[0];

  // The return is priced on its own road and its own time of day — a
  // night-rate leg back costs what a night-rate leg costs.
  const returnRoute = returnAt ? await fetchRoute(input.dropoff, input.pickup) : null;
  if (returnAt && !returnRoute) {
    return NextResponse.json({ error: 'routing_unavailable' }, { status: 502 });
  }
  const returnQuotes =
    returnAt && returnRoute
      ? cars.map((c) =>
          calculateQuote({
            pickup: input.dropoff,
            dropoff: input.pickup,
            roadKm: returnRoute.roadKm,
            durationMin: returnRoute.durationMin,
            pickupAt: returnAt,
            vehicleSeats: c.vehicle?.seats,
          }),
        )
      : null;
  const returnQuote = returnQuotes ? returnQuotes[0] : null;

  /* Every booking is all-inclusive and prepaid. Fixed here rather than taken
     from the request so the amount charged online is always the whole price. */
  const paymentMode = DEFAULT_PAYMENT_MODE;
  const outAmounts = quotes.map((q) => amountDueOnline(q, paymentMode));
  const backAmounts = returnQuotes ? returnQuotes.map((q) => amountDueOnline(q, paymentMode)) : [];
  const sum = (ns: number[]) => Math.round(ns.reduce((a, b) => a + b, 0) * 100) / 100;

  /** What the whole order costs, which is what the card is charged. */
  const amountOnline = sum(outAmounts);
  const returnAmountOnline = sum(backAmounts);
  const amountInTaxi = amountDueInTaxi(quote, paymentMode);

  const outReferences = cars.map(() => makeReference());
  const backReferences = returnQuotes ? cars.map(() => makeReference()) : [];
  const reference = outReferences[0];
  const returnReference = backReferences[0] ?? null;

  // A group is anything paid for as one transaction: the legs of a return,
  // the cars of one party, or both at once.
  const legCount = outReferences.length + backReferences.length;
  const groupId = legCount > 1 ? randomUUID() : null;

  /** "2 x Mercedes Vito", or "Mercedes Vito + Toyota Corolla" for a mix. */
  const vehicleSummary = (() => {
    const names = cars.map((c) => c.vehicle?.name).filter((n): n is string => Boolean(n));
    if (names.length === 0) return undefined;
    if (names.length === 1) return names[0];
    const counts = new Map<string, number>();
    for (const n of names) counts.set(n, (counts.get(n) ?? 0) + 1);
    return [...counts].map(([n, k]) => (k > 1 ? `${k} x ${n}` : n)).join(' + ');
  })();

  try {
    /*
     * One row per car, because a car is what a driver is dispatched to: the
     * schema has one driver per booking, so a party in two vans is two
     * bookings sharing a groupId, each with its own reference, driver and
     * status, paid for in one checkout.
     */
    const rows = [
      ...cars.map((c, i) => ({
        reference: outReferences[i],
        quote: quotes[i],
        amount: outAmounts[i],
        at: pickupAt,
        from: input.pickup,
        to: input.dropoff,
        flight: input.flightNumber || null,
        car: c,
      })),
      ...(returnQuotes && returnAt
        ? cars.map((c, i) => ({
            reference: backReferences[i],
            quote: returnQuotes[i],
            amount: backAmounts[i],
            at: returnAt,
            from: input.dropoff,
            to: input.pickup,
            flight: input.returnFlightNumber || null,
            car: c,
          }))
        : []),
    ];

    const created = [];
    for (const r of rows) {
      created.push(
        await prisma.booking.create({
          data: {
            reference: r.reference,
            contactName: input.contactName,
            contactEmail: input.contactEmail,
            contactPhone: input.contactPhone,
            pickupLabel: r.from.label,
            pickupLat: r.from.lat,
            pickupLng: r.from.lng,
            dropoffLabel: r.to.label,
            dropoffLat: r.to.lat,
            dropoffLng: r.to.lng,
            roadKm: r.quote.roadKm,
            durationMin: r.quote.durationMin,
            tariff: r.quote.tariff,
            startFare: r.quote.startFare,
            perKmRate: r.quote.perKmRate,
            perKmRateCharged: r.quote.perKmRateCharged,
            supplements: r.quote.supplements,
            meterEstimate: r.quote.meterEstimate,
            fixedFare: r.quote.fixedFare,
            bookingFee: r.quote.bookingFee,
            amountOnline: r.amount,
            paymentMode,
            pickupAt: r.at,
            // This car's share of the party, not the whole party: a driver
            // told "10 passengers" when six are in the van behind cannot
            // plan the boot or the seats.
            passengers: r.car.passengers,
            luggage: r.car.luggage,
            notes: input.notes,
            flightNumber: r.flight,
            groupId,
            vehicleId: r.car.vehicle?.id,
            // Kept apart from vehicleId, which assignment overwrites with the
            // driver's own car. This stays as what the passenger paid for.
            requestedVehicleId: r.car.vehicle?.id,
            locale: input.locale,
          },
        }),
      );
    }

    const returnBooking = returnQuotes ? (created[cars.length] ?? null) : null;

    // Under FEE_ONLY this is the booking fee alone; under FULL_PREPAID it is the
    // fixed fare plus the fee. The metered fare is never charged online.
    // One checkout covers both legs; both rows carry its id, and payment
    // confirmation flips every booking on that checkout together.
    const checkout = await createCheckout({
      amount: amountOnline + returnAmountOnline,
      currency: quote.currency,
      reference,
      description:
        created.length > 1
          ? `Barcelona taxi ${reference} + ${created.length - 1} more — all-inclusive`
          : `Barcelona taxi ${reference} — all-inclusive`,
      returnUrl: `${SITE_URL}/${input.locale}/booking/${reference}`,
    });

    // Every row on the order carries the checkout id, so confirming the
    // payment flips all of them together.
    await prisma.booking.updateMany({
      where: { id: { in: created.map((b) => b.id) } },
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
      // One receipt for the direction, however many cars it took, so a party
      // in three vans is not sent three near-identical emails.
      vehicleName: vehicleSummary,
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
        vehicleName: vehicleSummary,
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
      // The desk sees the whole party and the whole fleet; each driver sees
      // only their own car's share.
      passengers: input.passengers,
      luggage: input.luggage,
      vehicleName: vehicleSummary,
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
        vehicleName: vehicleSummary,
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
        /** Every booking on this order, in dispatch order. */
        references: created.map((b) => b.reference),
        vehicles: vehicleSummary,
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
