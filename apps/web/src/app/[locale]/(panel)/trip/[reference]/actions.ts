'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import { resolveTripAccess } from '@/lib/trip-access';
import { rateLimit } from '@/lib/rate-limit';
import { startTip, TIP_MAX, TIP_MIN } from '@/lib/payments/tip';

export interface TipState {
  error?: 'amount' | 'notYours' | 'notFinished' | 'alreadyTipped' | 'unavailable';
}

const amountSchema = z.coerce.number().min(TIP_MIN).max(TIP_MAX);

/**
 * Starts a tip for the driver of this ride.
 *
 * Access goes through `resolveTripAccess`, not the account helper the rating
 * form uses: most passengers book as guests and hold a signed trip cookie
 * rather than a session, and a tip only an account holder could leave would
 * miss nearly everyone who rides.
 *
 * Only the passenger may tip. A driver tipping their own ride, or an admin
 * doing it on someone's behalf, is not a thing we want to make possible.
 */
export async function tipDriver(_prev: TipState, formData: FormData): Promise<TipState> {
  const reference = String(formData.get('reference') ?? '');

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`tip:ip:${ip}`, 10, 10 * 60).ok) return { error: 'unavailable' };

  const access = await resolveTripAccess(reference);
  if (!access || access.as !== 'USER') return { error: 'notYours' };

  const parsed = amountSchema.safeParse(
    String(formData.get('amount') ?? '').trim().replace(',', '.'),
  );
  if (!parsed.success) return { error: 'amount' };

  const started = await startTip(reference, parsed.data);
  if (!started.ok) {
    return {
      error:
        started.reason === 'not-finished'
          ? 'notFinished'
          : started.reason === 'already-tipped'
            ? 'alreadyTipped'
            : started.reason === 'bad-amount'
              ? 'amount'
              : 'unavailable',
    };
  }

  // Stub mode (no SumUp credentials) has nowhere to send them; the tip stays
  // recorded as started and unpaid rather than silently counting as given.
  if (!started.redirectUrl) return { error: 'unavailable' };

  redirect(started.redirectUrl);
}
