import { createHmac, timingSafeEqual } from 'node:crypto';
import { absoluteUrl } from '@bcn/core/site';

/**
 * A guest's key to their own trip page.
 *
 * Most passengers book without an account, and until now every link to
 * `/trip/<reference>` — in the confirmation, the "your driver" email, the
 * at-the-door email — landed them on a login page for an account they never
 * made. The trip page and its APIs resolve access from a session; this gives
 * a guest something equivalent: a token derived from the reference and the
 * site secret, carried in the link and then held in a cookie scoped to that
 * one trip.
 *
 * Nothing is stored. The token is an HMAC of the reference, so it cannot be
 * guessed from the reference, and a reference cannot be recovered from it.
 * Rotating AUTH_SECRET invalidates every link at once, which is the right
 * failure mode.
 */

const COOKIE_PREFIX = 'trip.';
const TTL_DAYS = 30;

function secret(): string {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) throw new Error('AUTH_SECRET is missing or too short');
  return value;
}

export function tripToken(reference: string): string {
  return createHmac('sha256', secret()).update(`trip:${reference}`).digest('base64url').slice(0, 32);
}

export function verifyTripToken(reference: string, candidate: string | null | undefined): boolean {
  if (!candidate || candidate.length !== 32) return false;
  const expected = Buffer.from(tripToken(reference));
  const given = Buffer.from(candidate);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** The link to put in an email: opens the trip without an account. */
export function tripLink(locale: string, reference: string): string {
  return absoluteUrl(`/${locale}/trip/${reference}?k=${tripToken(reference)}`);
}

export function tripCookieName(reference: string): string {
  return COOKIE_PREFIX + reference;
}

export const TRIP_COOKIE_MAX_AGE = TTL_DAYS * 24 * 60 * 60;
