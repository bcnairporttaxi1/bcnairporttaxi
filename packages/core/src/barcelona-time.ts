import { TZDate } from '@date-fns/tz';

/**
 * Wall-clock time in Barcelona, for forms.
 *
 * A `<input type="datetime-local">` carries no zone: it is whatever the
 * person typing it means. On this site that is always Barcelona — the desk is
 * there, the pickups are there, the tariff is defined there. But `Date` reads
 * and writes such strings in the *server's* zone, and the server is wherever
 * it happens to run: Frankfurt in production, a laptop in dev, a CI runner
 * anywhere.
 *
 * That produced a real defect. A ride the passenger booked for 13:22 showed
 * 11:22 in the edit form on a UTC server, and 04:22 on a Pacific one; an
 * admin who corrected it to what they read as 14:00 saved a pickup two hours
 * later than they meant. These two functions are the only place the site
 * converts between a Barcelona wall-clock string and an instant, so the
 * server's zone never enters into it.
 */
export const BARCELONA = 'Europe/Madrid';

const pad = (n: number) => String(n).padStart(2, '0');

/** An instant, as the `YYYY-MM-DDTHH:MM` a datetime-local input wants. */
export function toBarcelonaInput(at: Date): string {
  const z = new TZDate(at, BARCELONA);
  return `${z.getFullYear()}-${pad(z.getMonth() + 1)}-${pad(z.getDate())}T${pad(z.getHours())}:${pad(z.getMinutes())}`;
}

/**
 * A datetime-local string, read as Barcelona wall-clock time.
 *
 * Returns null rather than an Invalid Date for anything malformed, so a
 * caller validating a form gets one clear failure instead of a NaN that
 * survives until it reaches the database.
 */
export function fromBarcelonaInput(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m.map(Number);
  // Range-check before constructing: the Date constructors roll an
  // out-of-range field into its neighbour, so month 13 becomes January of
  // next year rather than an error, and hour 99 becomes four days later.
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59 || (s || 0) > 59) return null;
  const z = new TZDate(y, mo - 1, d, h, mi, s || 0, BARCELONA);
  // A day that does not exist in that month (31 April) still rolls. Catch it
  // by checking the constructed date kept the day it was given.
  if (z.getDate() !== d || z.getMonth() !== mo - 1) return null;
  return new Date(z.getTime());
}
