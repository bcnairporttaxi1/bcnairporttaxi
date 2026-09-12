import 'server-only';
import { createHash, randomBytes } from 'node:crypto';

/**
 * Self-service password reset tokens.
 *
 * The token that goes in the email is 32 random bytes; what goes in the
 * database is its SHA-256. A stolen database dump therefore contains nothing
 * that can be pasted into a reset link, and a token is only ever compared by
 * hashing the submitted value and looking the hash up — never by decrypting
 * anything.
 *
 * This is the link pattern, not the temporary-password pattern the admin CLI
 * uses. The difference matters for a public form: with a link, the existing
 * password keeps working until the link is actually clicked, so anyone who
 * knows an admin's address cannot lock them out by submitting the form. With
 * a temporary password they could.
 */

/** How long a link stays valid. Long enough to find the email, short enough
 *  that a message left open in a shared inbox goes stale. */
export const RESET_TTL_MINUTES = 60;

export function hashResetToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function generateResetToken(): { token: string; hash: string } {
  // base64url so it survives a URL query string untouched — no '+' or '/'
  // to be percent-encoded, no '=' padding to be trimmed by a mail client.
  const token = randomBytes(32).toString('base64url');
  return { token, hash: hashResetToken(token) };
}

export function resetExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + RESET_TTL_MINUTES * 60_000);
}
