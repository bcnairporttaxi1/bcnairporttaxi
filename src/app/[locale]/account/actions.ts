'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { isPassengerEditable } from '@/lib/rides';

export interface AccountActionState {
  error?: string;
  ok?: string;
}

/**
 * Finds a booking the signed-in passenger owns.
 *
 * Matched on the account id or the contact email, so a ride booked as a guest
 * before signing up still belongs to the person who took it.
 */
async function ownedBooking(bookingId: string) {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, blocked: true },
  });
  if (!user || user.blocked) return null;

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      OR: [{ userId: user.id }, { contactEmail: user.email }],
    },
  });
  return booking ? { booking, user } : null;
}

const editSchema = z.object({
  pickupLabel: z.string().trim().min(3).max(300),
  dropoffLabel: z.string().trim().min(3).max(300),
  passengers: z.coerce.number().int().min(1).max(8),
  luggage: z.coerce.number().int().min(0).max(16),
  notes: z.string().trim().max(1000).optional(),
});

/**
 * Lets a passenger change their ride inside the edit window.
 *
 * The window is re-checked here against the stored booking, never against
 * whatever the page believed when it rendered — a form left open past the
 * deadline must not still go through.
 *
 * Note what is missing: there is no cancel. Passengers cannot call a ride off
 * themselves, because a cancellation has to decide what happens to a booking
 * fee that has already been taken, and that is an office decision.
 */
export async function editMyRide(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const locale = String(formData.get('locale') ?? 'en');
  const owned = await ownedBooking(String(formData.get('bookingId')));
  if (!owned) return { error: 'That booking is not on your account.' };

  const { booking } = owned;
  if (!isPassengerEditable(booking)) {
    return {
      error:
        'This ride can no longer be changed online. Message us on WhatsApp and we will sort it out.',
    };
  }

  const parsed = editSchema.safeParse({
    pickupLabel: formData.get('pickupLabel'),
    dropoffLabel: formData.get('dropoffLabel'),
    passengers: formData.get('passengers'),
    luggage: formData.get('luggage'),
    notes: formData.get('notes') || undefined,
  });
  if (!parsed.success) return { error: 'Check the addresses and passenger count.' };

  // Addresses are stored as typed, but the coordinates behind them still point
  // at the old ones. Dropping an assigned ride back to CONFIRMED puts it in
  // front of dispatch again, so the route and price are re-checked rather than
  // a driver being sent to a stale pin.
  const movedPickup = parsed.data.pickupLabel !== booking.pickupLabel;
  const movedDropoff = parsed.data.dropoffLabel !== booking.dropoffLabel;

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      pickupLabel: parsed.data.pickupLabel,
      dropoffLabel: parsed.data.dropoffLabel,
      passengers: parsed.data.passengers,
      luggage: parsed.data.luggage,
      notes: parsed.data.notes ?? null,
      ...(movedPickup || movedDropoff
        ? { status: booking.status === 'ASSIGNED' ? 'CONFIRMED' : booking.status }
        : {}),
    },
  });

  revalidatePath(`/${locale}/account`);
  revalidatePath(`/${locale}/booking/${booking.reference}`);

  return {
    ok:
      movedPickup || movedDropoff
        ? 'Saved. We will re-check the route and confirm the price if it changes.'
        : 'Saved.',
  };
}

const ratingSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().trim().max(2000).optional(),
});

/** The passenger's rating of the driver, once the ride is done. */
export async function rateMyDriver(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const locale = String(formData.get('locale') ?? 'en');
  const owned = await ownedBooking(String(formData.get('bookingId')));
  if (!owned) return { error: 'That booking is not on your account.' };

  const { booking, user } = owned;
  if (booking.status !== 'COMPLETED') {
    return { error: 'You can rate the driver once the ride is finished.' };
  }

  const parsed = ratingSchema.safeParse({
    rating: formData.get('rating'),
    text: formData.get('text') || undefined,
  });
  if (!parsed.success) return { error: 'Choose a rating from 1 to 5.' };

  await prisma.review.upsert({
    where: {
      bookingId_direction: { bookingId: booking.id, direction: 'USER_TO_DRIVER' },
    },
    create: {
      bookingId: booking.id,
      direction: 'USER_TO_DRIVER',
      userId: user.id,
      driverId: booking.driverId,
      authorName: booking.contactName,
      rating: parsed.data.rating,
      text: parsed.data.text ?? '',
      // Publishing is an editorial decision, so nothing reaches the public
      // reviews page until someone in the office approves it.
      approved: false,
    },
    update: { rating: parsed.data.rating, text: parsed.data.text ?? '' },
  });

  revalidatePath(`/${locale}/trip/${booking.reference}`);
  return { ok: 'Thanks — your rating was saved.' };
}

const reportSchema = z.object({
  reason: z.string().trim().min(3).max(120),
  details: z.string().trim().max(4000).optional(),
});

/** Raises a complaint about the driver on a specific ride. */
export async function reportMyDriver(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const locale = String(formData.get('locale') ?? 'en');
  const owned = await ownedBooking(String(formData.get('bookingId')));
  if (!owned) return { error: 'That booking is not on your account.' };

  const { booking, user } = owned;
  const parsed = reportSchema.safeParse({
    reason: formData.get('reason'),
    details: formData.get('details') || undefined,
  });
  if (!parsed.success) return { error: 'Tell us briefly what happened.' };

  await prisma.report.create({
    data: {
      bookingId: booking.id,
      reporterRole: 'USER',
      byUserId: user.id,
      againstDriverId: booking.driverId,
      reason: parsed.data.reason,
      details: parsed.data.details,
    },
  });

  revalidatePath(`/${locale}/trip/${booking.reference}`);
  return { ok: 'Reported. Someone from the office will be in touch.' };
}
