import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { resolveTripAccess } from '@/lib/trip-access';

/**
 * Live position channel for a trip.
 *
 * Polled rather than pushed: a taxi transfer lasts under an hour and a ping
 * every few seconds is plenty, which avoids running a websocket tier for a
 * handful of concurrent trips.
 *
 * Positions are only ever written by the party they belong to, and only while
 * the trip is actually live.
 */

const pingSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

const LIVE_STATUSES = ['ASSIGNED', 'EN_ROUTE'] as const;

export async function POST(
  request: Request,
  ctx: { params: Promise<{ reference: string }> },
) {
  const { reference } = await ctx.params;
  const access = await resolveTripAccess(reference);
  if (!access) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = pingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: access.bookingId },
    select: { status: true },
  });

  // Refuse to record positions for a trip that has not started or is over —
  // there is no reason to keep collecting location data after the fact.
  if (!booking || !LIVE_STATUSES.includes(booking.status as never)) {
    return NextResponse.json({ error: 'trip_not_live' }, { status: 409 });
  }

  // An admin watching a trip is an observer, not a participant.
  const role = access.as === 'DRIVER' ? 'DRIVER' : 'USER';
  if (access.as === 'ADMIN') {
    return NextResponse.json({ error: 'observer_only' }, { status: 403 });
  }

  await prisma.locationPing.create({
    data: { bookingId: access.bookingId, role, lat: parsed.data.lat, lng: parsed.data.lng },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ reference: string }> },
) {
  const { reference } = await ctx.params;
  const access = await resolveTripAccess(reference);
  if (!access) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const [driver, passenger, booking] = await Promise.all([
    prisma.locationPing.findFirst({
      where: { bookingId: access.bookingId, role: 'DRIVER' },
      orderBy: { ts: 'desc' },
    }),
    prisma.locationPing.findFirst({
      where: { bookingId: access.bookingId, role: 'USER' },
      orderBy: { ts: 'desc' },
    }),
    prisma.booking.findUnique({
      where: { id: access.bookingId },
      select: {
        status: true,
        pickupLat: true,
        pickupLng: true,
        dropoffLat: true,
        dropoffLng: true,
      },
    }),
  ]);

  const shape = (p: typeof driver) =>
    p ? { lat: p.lat, lng: p.lng, ts: p.ts.toISOString() } : null;

  return NextResponse.json({
    status: booking?.status ?? null,
    // The passenger sees the driver; the driver sees the passenger. Neither
    // needs their own position echoed back.
    driver: access.as === 'DRIVER' ? null : shape(driver),
    passenger: access.as === 'USER' ? null : shape(passenger),
    pickup: booking ? { lat: booking.pickupLat, lng: booking.pickupLng } : null,
    dropoff: booking ? { lat: booking.dropoffLat, lng: booking.dropoffLng } : null,
  });
}
