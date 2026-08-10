'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { BookingStatus } from '@/generated/prisma/enums';

/**
 * Drivers may only move their own trips, and only forward through the states
 * that make sense from the wheel. Cancellation stays with the office.
 */
const DRIVER_STATUSES = ['EN_ROUTE', 'COMPLETED'] as const;

export async function updateTripStatus(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) throw new Error('Not signed in');

  const bookingId = String(formData.get('bookingId'));
  const locale = String(formData.get('locale') ?? 'en');
  const parsed = z.enum(DRIVER_STATUSES).safeParse(formData.get('status'));
  if (!parsed.success) return;

  const driver = await prisma.driver.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  if (!driver) throw new Error('No driver record');

  // The where clause includes driverId, so a crafted bookingId belonging to
  // someone else simply matches nothing.
  const result = await prisma.booking.updateMany({
    where: { id: bookingId, driverId: driver.id },
    data: { status: parsed.data as BookingStatus },
  });

  if (result.count === 0) throw new Error('Not your booking');

  revalidatePath(`/${locale}/driver`);
}
