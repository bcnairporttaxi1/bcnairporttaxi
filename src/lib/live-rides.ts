import 'server-only';
import { prisma } from '@/lib/db';
import { AT_DOOR_METRES, distanceMetres } from '@/lib/rides';
import type { RideStage } from '@/components/panel/ride-progress';

/**
 * Rides happening right now.
 *
 * A dispatch desk needs a different question answered than a ride list does.
 * The list answers "what bookings exist"; this answers "what is happening at
 * this moment, and does any of it need me". Those are different queries and
 * different sorts, so they are kept apart rather than bolted onto one another.
 *
 * Ordering puts the ride furthest through the flow first — a passenger already
 * on board is closer to a completion than a driver who has just set off — and
 * within a stage, the ride that has been stuck in it longest comes first,
 * because that is the one most likely to be in trouble.
 */

const LIVE_STATUSES = ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'] as const;

/** How long a stage may run before the desk should look at it. */
const STALL_MINUTES: Record<string, number> = {
  EN_ROUTE: 45,
  ARRIVED: 10, // a driver waiting this long at the door usually means no-show
  ON_BOARD: 90,
};

export interface LiveRide {
  id: string;
  reference: string;
  status: RideStage;
  hasDriver: boolean;
  pickupLabel: string;
  dropoffLabel: string;
  pickupAt: Date;
  contactName: string;
  contactPhone: string;
  driverName: string | null;
  driverPhone: string | null;
  plate: string | null;
  paymentMode: string;
  /** What the driver must take in the car, already formatted upstream. */
  cashToCollect: number;
  enRouteAt: Date | null;
  arrivedAt: Date | null;
  onBoardAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  /** Metres from the pickup point, when the driver is sharing location. */
  driverMetresAway: number | null;
  atDoor: boolean;
  /** Minutes spent in the current stage. */
  stageMinutes: number;
  /** True once that exceeds what the stage should normally take. */
  stalled: boolean;
}

function sinceFor(b: {
  status: string;
  enRouteAt: Date | null;
  arrivedAt: Date | null;
  onBoardAt: Date | null;
}): Date | null {
  if (b.status === 'ON_BOARD') return b.onBoardAt;
  if (b.status === 'ARRIVED') return b.arrivedAt;
  if (b.status === 'EN_ROUTE') return b.enRouteAt;
  return null;
}

export async function liveRides(now: Date = new Date()): Promise<LiveRide[]> {
  const bookings = await prisma.booking.findMany({
    where: { status: { in: [...LIVE_STATUSES] } },
    include: {
      driver: { select: { name: true, phone: true, plate: true } },
      // Only the newest ping per ride is of any use; ordering plus a take of
      // one keeps this from dragging a whole trip's history into memory.
      locationPings: {
        where: { role: 'DRIVER' },
        orderBy: { ts: 'desc' },
        take: 1,
        select: { lat: true, lng: true },
      },
    },
    orderBy: { pickupAt: 'asc' },
    take: 100,
  });

  const rides: LiveRide[] = bookings.map((b) => {
    const ping = b.locationPings[0] ?? null;
    // Location sharing is opt-in and revocable mid-trip, so a stale ping must
    // not keep being shown after consent is withdrawn.
    const shared = b.driverSharesLocation && ping !== null;
    const metres = shared
      ? Math.round(
          distanceMetres(
            { lat: ping!.lat, lng: ping!.lng },
            { lat: b.pickupLat, lng: b.pickupLng },
          ),
        )
      : null;

    const since = sinceFor(b);
    const stageMinutes = since
      ? Math.max(0, Math.floor((now.getTime() - since.getTime()) / 60_000))
      : 0;

    return {
      id: b.id,
      reference: b.reference,
      status: b.status as RideStage,
      hasDriver: b.driverId !== null,
      pickupLabel: b.pickupLabel,
      dropoffLabel: b.dropoffLabel,
      pickupAt: b.pickupAt,
      contactName: b.contactName,
      contactPhone: b.contactPhone,
      driverName: b.driver?.name ?? null,
      driverPhone: b.driver?.phone ?? null,
      plate: b.driver?.plate ?? null,
      paymentMode: b.paymentMode,
      cashToCollect: Number(b.cashToCollect),
      enRouteAt: b.enRouteAt,
      arrivedAt: b.arrivedAt,
      onBoardAt: b.onBoardAt,
      completedAt: b.completedAt,
      cancelledAt: b.cancelledAt,
      driverMetresAway: metres,
      atDoor: metres !== null && metres <= AT_DOOR_METRES,
      stageMinutes,
      stalled: stageMinutes > (STALL_MINUTES[b.status] ?? Infinity),
    };
  });

  const order: Record<string, number> = { ON_BOARD: 0, ARRIVED: 1, EN_ROUTE: 2 };
  return rides.sort(
    (a, b) =>
      (order[a.status] ?? 9) - (order[b.status] ?? 9) ||
      b.stageMinutes - a.stageMinutes,
  );
}
