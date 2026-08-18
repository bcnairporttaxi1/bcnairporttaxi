import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { resolveTripAccess } from '@/lib/trip-access';
import { shouldNotifyAtDoor } from '@bcn/core/rides';
import { absoluteUrl } from '@bcn/core/site';
import { driverAtDoorEmail, sendEmail } from '@/lib/email';

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

const LIVE_STATUSES = ['ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'ON_BOARD'] as const;

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
    include: { driver: true, vehicle: { select: { name: true } } },
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

  // Sending a position is the consent. Rather than a separate switch that can
  // disagree with what is actually being transmitted, the flag simply tracks
  // whether this party is broadcasting, and DELETE below turns it back off.
  await prisma.booking.update({
    where: { id: access.bookingId },
    data:
      role === 'DRIVER'
        ? { driverSharesLocation: true }
        : { userSharesLocation: true },
  });

  // The "your driver is outside" mail rides on the driver's own pings, so it
  // lands while the car is pulling up rather than after they press a button.
  if (
    role === 'DRIVER' &&
    shouldNotifyAtDoor({
      status: booking.status,
      atDoorNotifiedAt: booking.atDoorNotifiedAt,
      driver: { lat: parsed.data.lat, lng: parsed.data.lng },
      pickup: { lat: booking.pickupLat, lng: booking.pickupLng },
    })
  ) {
    // Claim the send first. Two pings arriving together would otherwise both
    // pass the check above and mail the passenger twice; updateMany with the
    // null guard means only one of them matches a row.
    const claimed = await prisma.booking.updateMany({
      where: { id: booking.id, atDoorNotifiedAt: null },
      data: { atDoorNotifiedAt: new Date() },
    });

    if (claimed.count === 1 && booking.driver) {
      const mail = driverAtDoorEmail({
        name: booking.contactName,
        reference: booking.reference,
        pickupLabel: booking.pickupLabel,
        driverName: booking.driver.name,
        driverPhone: booking.driver.phone,
        plate: booking.driver.plate,
        vehicleName: booking.vehicle?.name,
        tripUrl: absoluteUrl(`/${booking.locale}/trip/${booking.reference}`),
      });
      await sendEmail({ to: booking.contactEmail, ...mail });
    }
  }

  return NextResponse.json({ ok: true });
}

/** Stops sharing: the other side loses sight of this party immediately. */
export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ reference: string }> },
) {
  const { reference } = await ctx.params;
  const access = await resolveTripAccess(reference);
  if (!access) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  if (access.as === 'ADMIN') {
    return NextResponse.json({ error: 'observer_only' }, { status: 403 });
  }

  await prisma.booking.update({
    where: { id: access.bookingId },
    data:
      access.as === 'DRIVER'
        ? { driverSharesLocation: false }
        : { userSharesLocation: false },
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
        driverSharesLocation: true,
        userSharesLocation: true,
      },
    }),
  ]);

  const shape = (p: typeof driver) =>
    p ? { lat: p.lat, lng: p.lng, ts: p.ts.toISOString() } : null;

  return NextResponse.json({
    status: booking?.status ?? null,
    // The passenger sees the driver; the driver sees the passenger. Neither
    // needs their own position echoed back, and each side is withheld unless
    // that party has opted into sharing on this ride.
    driver:
      access.as === 'DRIVER' || !booking?.driverSharesLocation ? null : shape(driver),
    passenger:
      access.as === 'USER' || !booking?.userSharesLocation ? null : shape(passenger),
    pickup: booking ? { lat: booking.pickupLat, lng: booking.pickupLng } : null,
    dropoff: booking ? { lat: booking.dropoffLat, lng: booking.dropoffLng } : null,
  });
}
