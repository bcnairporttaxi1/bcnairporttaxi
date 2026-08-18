import { randomInt } from 'node:crypto';

/**
 * Temporary passwords for accounts an admin opens on someone's behalf.
 *
 * These get read off a screen or retyped from an email, so the alphabet drops
 * every character pair that looks alike in a sans-serif font — no O/0, no
 * I/l/1 — and the groups are hyphenated to make them easy to read aloud over
 * the phone. Length is chosen so the result still carries plenty of entropy
 * after those removals: 12 characters from a 46-symbol alphabet is about 66
 * bits, and the password is single-use anyway.
 */

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
const DIGITS = '23456789';
const GROUP = 4;
const GROUPS = 3;

export function generateTemporaryPassword(): string {
  const pool = ALPHABET + DIGITS;
  const chars: string[] = [];
  for (let i = 0; i < GROUP * GROUPS; i++) {
    // randomInt is rejection-sampled, so the distribution stays uniform.
    chars.push(pool[randomInt(pool.length)]);
  }
  // Guarantee at least one digit rather than leaving it to chance.
  chars[randomInt(chars.length)] = DIGITS[randomInt(DIGITS.length)];

  const out: string[] = [];
  for (let i = 0; i < GROUPS; i++) {
    out.push(chars.slice(i * GROUP, (i + 1) * GROUP).join(''));
  }
  return out.join('-');
}

/**
 * Rejects passwords that would pass a bare length check but should not.
 *
 * Deliberately short of a full policy: length does most of the work, and long
 * rule lists push people towards predictable substitutions.
 */
export function passwordProblem(password: string, email?: string): string | null {
  if (password.length < 8) return 'Use at least 8 characters.';
  if (password.length > 200) return 'That password is too long.';
  if (/^\s|\s$/.test(password)) return 'Remove the space at the start or end.';
  if (/^(.)\1+$/.test(password)) return 'Use more than one character.';
  const local = email?.split('@')[0]?.toLowerCase();
  if (local && local.length >= 3 && password.toLowerCase().includes(local)) {
    return 'Do not use your email address in the password.';
  }
  return null;
}
