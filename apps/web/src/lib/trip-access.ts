import 'server-only';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { Role } from '@/generated/prisma/enums';

export interface TripAccess {
  bookingId: string;
  reference: string;
  /** How the caller relates to this trip — decides what they may write. */
  as: Role;
  driverId: string | null;
}

/**
 * Decides whether the caller may see or post to a trip's live channel.
 *
 * Three ways in, and no others:
 *   - ADMIN,
 *   - the driver assigned to this specific booking,
 *   - the customer, matched on account id or the email the booking was made
 *     with (guest bookings have no userId).
 *
 * Returns null rather than throwing so callers can answer 404 and avoid
 * confirming that a reference exists.
 */
export async function resolveTripAccess(
  reference: string,
): Promise<TripAccess | null> {
  const session = await getSession();
  if (!session) return null;

  const booking = await prisma.booking.findUnique({
    where: { reference },
    select: {
      id: true,
      reference: true,
      userId: true,
      contactEmail: true,
      driverId: true,
      driver: { select: { userId: true } },
    },
  });
  if (!booking) return null;

  if (session.role === 'ADMIN') {
    return {
      bookingId: booking.id,
      reference: booking.reference,
      as: 'ADMIN',
      driverId: booking.driverId,
    };
  }

  if (booking.driver?.userId && booking.driver.userId === session.userId) {
    return {
      bookingId: booking.id,
      reference: booking.reference,
      as: 'DRIVER',
      driverId: booking.driverId,
    };
  }

  const isCustomer =
    (booking.userId && booking.userId === session.userId) ||
    booking.contactEmail.toLowerCase() === session.email.toLowerCase();

  if (isCustomer) {
    return {
      bookingId: booking.id,
      reference: booking.reference,
      as: 'USER',
      driverId: booking.driverId,
    };
  }

  return null;
}
