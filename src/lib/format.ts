/**
 * Locale-aware formatters.
 *
 * These were previously redefined inside a dozen page components, which meant
 * every fix — the switch off hardcoded en-GB, the Chinese script tag — had to
 * be made a dozen times and was missed at least once. One definition each.
 *
 * Constructing an `Intl` formatter is not cheap and these render inside table
 * loops, so instances are cached per locale rather than rebuilt per row.
 */

const money = new Map<string, Intl.NumberFormat>();
const dates = new Map<string, Intl.DateTimeFormat>();

/**
 * Chinese needs an explicit script subtag; bare `zh` leaves the choice of Han
 * script to the runtime, which is not the same across environments.
 */
function intlLocale(locale: string): string {
  return locale === 'zh' ? 'zh-Hans' : locale;
}

/** Euros the way the reader writes them: €45.20 in English, 45,20 € in Spanish. */
export function eurIn(locale: string): (n: unknown) => string {
  const key = intlLocale(locale);
  let f = money.get(key);
  if (!f) {
    f = new Intl.NumberFormat(key, { style: 'currency', currency: 'EUR' });
    money.set(key, f);
  }
  return (n: unknown) => f!.format(Number(n));
}

export type DateStyle = 'short' | 'medium' | 'long' | 'full' | 'dateOnly' | 'timeOnly';

const STYLES: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { dateStyle: 'short', timeStyle: 'short' },
  medium: { dateStyle: 'medium', timeStyle: 'short' },
  long: { dateStyle: 'long', timeStyle: 'short' },
  full: { dateStyle: 'full', timeStyle: 'short' },
  dateOnly: { dateStyle: 'medium' },
  timeOnly: { timeStyle: 'short' },
};

/**
 * Dates in the reader's locale, always on Barcelona time.
 *
 * The timezone is not negotiable: a pickup at 07:00 means 07:00 in Barcelona
 * whether the passenger is reading from London or Shanghai, and rendering it
 * in their own zone would be actively misleading.
 */
export function dateIn(locale: string, style: DateStyle = 'medium'): (d: Date) => string {
  const key = `${intlLocale(locale)}|${style}`;
  let f = dates.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(intlLocale(locale), {
      ...STYLES[style],
      timeZone: 'Europe/Madrid',
    });
    dates.set(key, f);
  }
  return (d: Date) => f!.format(d);
}
