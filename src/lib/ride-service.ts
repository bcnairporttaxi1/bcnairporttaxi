import 'server-only';
import { prisma } from '@/lib/db';
import { statusWriteFor } from '@/lib/rides';
import type { BookingStatus, Role } from '@/generated/prisma/enums';

/**
 * The single place a ride's status is written.
 *
 * Completion is not just a status change: it freezes what the driver is owed
 * and what they took in the car. That used to live only in the driver panel,
 * which meant a ride the office completed on a driver's behalf silently paid
 * them nothing. Routing every path through here makes that impossible to
 * reintroduce — there is no way to set COMPLETED without settling.
 */

/** Prisma Decimals arrive as objects; the rules work in plain numbers. */
function toMoney(b: { paymentMode: 'FEE_ONLY' | 'FULL_PREPAID'; meterEstimate: unknown; fixedFare: unknown }) {
  return {
    paymentMode: b.paymentMode,
    meterEstimate: Number(b.meterEstimate),
    fixedFare: Number(b.fixedFare),
  };
}

/** Moves one ride, settling it if the move completes it. */
export async function applyRideStatus(
  bookingId: string,
  status: BookingStatus,
  actor: Role,
): Promise<boolean> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, paymentMode: true, meterEstimate: true, fixedFare: true },
  });
  if (!booking) return false;

  await prisma.booking.update({
    where: { id: booking.id },
    data: statusWriteFor(status, toMoney(booking), actor),
  });
  return true;
}

/**
 * Moves many rides at once.
 *
 * Deliberately not a single updateMany: the settlement figures differ per
 * booking, so each row needs its own values. They go in one transaction so a
 * failure halfway cannot leave half a batch completed but unsettled.
 */
export async function applyRideStatusBulk(
  ids: string[],
  status: BookingStatus,
  actor: Role,
): Promise<number> {
  if (ids.length === 0) return 0;

  const bookings = await prisma.booking.findMany({
    where: { id: { in: ids } },
    select: { id: true, paymentMode: true, meterEstimate: true, fixedFare: true },
  });

  await prisma.$transaction(
    bookings.map((b) =>
      prisma.booking.update({
        where: { id: b.id },
        data: statusWriteFor(status, toMoney(b), actor),
      }),
    ),
  );

  return bookings.length;
}
