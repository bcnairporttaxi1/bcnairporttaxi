'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { rateLimit } from '@/lib/rate-limit';
import { tripToken } from '@/lib/trip-token';

export interface FindState {
  error?: 'notFound' | 'limited';
}

/**
 * Reference plus the email it was booked with opens the trip page.
 *
 * The reference is six characters from a 32-letter alphabet, so it is not
 * guessable in bulk; the email check is what stops someone who has seen a
 * reference — on a driver's board, say — from opening the passenger's page.
 * The same answer for "no such reference" and "wrong email", and a limit
 * per address, keep it from being used to test which references exist.
 */
export async function findBooking(_prev: FindState, formData: FormData): Promise<FindState> {
  const locale = String(formData.get('locale') ?? 'en');
  const reference = String(formData.get('reference') ?? '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
  const email = z.email().max(200).safeParse(String(formData.get('email') ?? '').trim());

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`find:ip:${ip}`, 10, 15 * 60).ok) return { error: 'limited' };

  if (!/^BCN-[A-Z0-9]{6}$/.test(reference) || !email.success) return { error: 'notFound' };

  const booking = await prisma.booking
    .findUnique({ where: { reference }, select: { contactEmail: true } })
    .catch(() => null);
  if (!booking || booking.contactEmail.toLowerCase() !== email.data.toLowerCase()) {
    return { error: 'notFound' };
  }

  redirect(`/api/trips/${reference}/access?k=${tripToken(reference)}&locale=${locale}`);
}
