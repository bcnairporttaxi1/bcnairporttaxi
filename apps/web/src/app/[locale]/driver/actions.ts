'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { absoluteUrl } from '@bcn/core/site';
import { sendEmail, rideCompletedEmail, withdrawalEmail } from '@/lib/email';
import { DRIVER_FLOW, canTransition, settlementFor } from '@bcn/core/rides';
import { applyRideStatus } from '@/lib/ride-service';
import { driverBalance } from '@/lib/driver-balance';
import type { BookingStatus } from '@/generated/prisma/enums';

export interface DriverActionState {
  error?: string;
  ok?: string;
}

/** The signed-in driver, or null when the account has no driver record. */
async function currentDriver() {
  const session = await getSession();
  if (!session) return null;
  const driver = await prisma.driver.findUnique({
    where: { userId: session.userId },
  });
  if (!driver || driver.blocked) return null;
  return driver;
}

/**
 * Advances a ride one step along the driver flow.
 *
 * The transition is checked against the state actually in the database rather
 * than against whatever the page was showing, so a stale tab cannot skip a
 * step, and the `driverId` in the where clause means a crafted booking id
 * belonging to someone else simply matches nothing.
 */
export async function advanceRide(formData: FormData): Promise<void> {
  const driver = await currentDriver();
  if (!driver) throw new Error('No driver record');

  const bookingId = String(formData.get('bookingId'));
  const locale = String(formData.get('locale') ?? 'en');
  const parsed = z.enum(DRIVER_FLOW as unknown as [string, ...string[]]).safeParse(
    formData.get('status'),
  );
  if (!parsed.success) return;
  const next = parsed.data as BookingStatus;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, driverId: driver.id },
    include: { vehicle: true },
  });
  if (!booking) throw new Error('Not your booking');
  if (!canTransition(booking.status, next)) {
    // Someone else already moved it, or the tab is stale. Re-render rather
    // than forcing the state, which would lose whatever really happened.
    revalidatePath(`/${locale}/driver`);
    return;
  }

  // The service stamps the timestamp and, on completion, freezes the split so
  // a later tariff edit cannot rewrite what a driver was owed for work already
  // done. Shared with the admin panel so the two cannot drift apart.
  await applyRideStatus(booking.id, next, 'DRIVER');

  const money = settlementFor({
    paymentMode: booking.paymentMode,
    meterEstimate: Number(booking.meterEstimate),
    fixedFare: Number(booking.fixedFare),
  });

  if (next === 'COMPLETED') {
    const mail = rideCompletedEmail({
      name: booking.contactName,
      reference: booking.reference,
      reviewUrl: absoluteUrl(`/${booking.locale}/trip/${booking.reference}`),
      paidInCar: money.prepaid ? null : money.cashToCollect,
      locale: booking.locale,
    });
    await sendEmail({ to: booking.contactEmail, ...mail });
  }

  revalidatePath(`/${locale}/driver`);
  revalidatePath(`/${locale}/trip/${booking.reference}`);
}

const payoutSchema = z
  .object({
    method: z.enum(['BIZUM', 'BANK']),
    bizumPhone: z.string().trim().max(40).optional(),
    iban: z.string().trim().max(64).optional(),
    holder: z.string().trim().max(120).optional(),
  })
  .refine((v) => v.method !== 'BIZUM' || !!v.bizumPhone, {
    message: 'Add the phone number your Bizum is registered to.',
  })
  .refine((v) => v.method !== 'BANK' || (!!v.iban && !!v.holder), {
    message: 'Add both the IBAN and the name on the account.',
  });

/** Stores where a driver wants prepaid earnings sent. */
export async function savePayoutDetails(
  _prev: DriverActionState,
  formData: FormData,
): Promise<DriverActionState> {
  const driver = await currentDriver();
  if (!driver) return { error: 'No driver record on this account.' };

  const locale = String(formData.get('locale') ?? 'en');
  const parsed = payoutSchema.safeParse({
    method: formData.get('method'),
    bizumPhone: formData.get('bizumPhone') || undefined,
    iban: formData.get('iban') || undefined,
    holder: formData.get('holder') || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Check your payout details.' };
  }

  await prisma.driver.update({
    where: { id: driver.id },
    data: {
      payoutMethod: parsed.data.method,
      payoutBizumPhone: parsed.data.bizumPhone ?? null,
      payoutIban: parsed.data.iban?.replace(/\s+/g, '').toUpperCase() ?? null,
      payoutHolder: parsed.data.holder ?? null,
    },
  });

  revalidatePath(`/${locale}/driver/earnings`);
  return { ok: 'Payout details saved.' };
}

/** Raises a withdrawal request against the available balance. */
export async function requestWithdrawal(
  _prev: DriverActionState,
  formData: FormData,
): Promise<DriverActionState> {
  const driver = await currentDriver();
  if (!driver) return { error: 'No driver record on this account.' };

  const locale = String(formData.get('locale') ?? 'en');
  const amount = Number(formData.get('amount'));

  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: 'Enter an amount to withdraw.' };
  }
  if (!driver.payoutMethod) {
    return { error: 'Add your Bizum or bank details before requesting a payout.' };
  }

  const destination =
    driver.payoutMethod === 'BIZUM'
      ? (driver.payoutBizumPhone ?? '')
      : `${driver.payoutIban ?? ''} · ${driver.payoutHolder ?? ''}`;
  if (!destination.trim()) {
    return { error: 'Add your Bizum or bank details before requesting a payout.' };
  }

  // Re-read the balance here rather than trusting a number from the form.
  const balance = await driverBalance(driver.id);
  if (amount > balance.available) {
    return { error: `You can withdraw up to ${balance.available.toFixed(2)} €.` };
  }

  await prisma.withdrawal.create({
    data: {
      driverId: driver.id,
      amount,
      method: driver.payoutMethod,
      destination,
    },
  });

  // The driver's login email lives on the linked user account.
  const account = await prisma.user.findFirst({
    where: { driver: { id: driver.id } },
    select: { email: true },
  });
  if (account?.email) {
    const mail = withdrawalEmail({
      driverName: driver.name,
      amount,
      method: driver.payoutMethod,
      destination,
      status: 'REQUESTED',
      note: 'We will process this and let you know when the money is on its way.',
    });
    await sendEmail({ to: account.email, ...mail });
  }

  revalidatePath(`/${locale}/driver/earnings`);
  return { ok: 'Withdrawal requested.' };
}

const ratingSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().trim().max(2000).optional(),
});

/** The driver's rating of the passenger, once the ride is done. */
export async function ratePassenger(
  _prev: DriverActionState,
  formData: FormData,
): Promise<DriverActionState> {
  const driver = await currentDriver();
  if (!driver) return { error: 'No driver record on this account.' };

  const locale = String(formData.get('locale') ?? 'en');
  const bookingId = String(formData.get('bookingId'));

  const parsed = ratingSchema.safeParse({
    rating: formData.get('rating'),
    text: formData.get('text') || undefined,
  });
  if (!parsed.success) return { error: 'Choose a rating from 1 to 5.' };

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, driverId: driver.id, status: 'COMPLETED' },
    select: { id: true, userId: true, contactName: true },
  });
  if (!booking) return { error: 'You can only rate a ride you completed.' };

  await prisma.review.upsert({
    where: {
      bookingId_direction: { bookingId: booking.id, direction: 'DRIVER_TO_USER' },
    },
    create: {
      bookingId: booking.id,
      direction: 'DRIVER_TO_USER',
      driverId: driver.id,
      userId: booking.userId,
      authorName: driver.name,
      rating: parsed.data.rating,
      text: parsed.data.text ?? '',
      // Ratings of passengers are internal and never surface publicly.
      approved: false,
    },
    update: { rating: parsed.data.rating, text: parsed.data.text ?? '' },
  });

  revalidatePath(`/${locale}/driver`);
  return { ok: 'Thanks — your rating was saved.' };
}

const reportSchema = z.object({
  reason: z.string().trim().min(3).max(120),
  details: z.string().trim().max(4000).optional(),
});

/** Raises a complaint about the passenger on a specific ride. */
export async function reportPassenger(
  _prev: DriverActionState,
  formData: FormData,
): Promise<DriverActionState> {
  const driver = await currentDriver();
  if (!driver) return { error: 'No driver record on this account.' };

  const locale = String(formData.get('locale') ?? 'en');
  const bookingId = String(formData.get('bookingId'));

  const parsed = reportSchema.safeParse({
    reason: formData.get('reason'),
    details: formData.get('details') || undefined,
  });
  if (!parsed.success) return { error: 'Tell us briefly what happened.' };

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, driverId: driver.id },
    select: { id: true, userId: true },
  });
  if (!booking) return { error: 'That ride is not yours.' };

  await prisma.report.create({
    data: {
      bookingId: booking.id,
      reporterRole: 'DRIVER',
      byDriverId: driver.id,
      againstUserId: booking.userId,
      reason: parsed.data.reason,
      details: parsed.data.details,
    },
  });

  revalidatePath(`/${locale}/driver`);
  return { ok: 'Reported. The office will look into it.' };
}
