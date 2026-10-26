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

/** What an unusable tag falls back to. */
const FALLBACK = 'en';

/**
 * Chinese needs an explicit script subtag; bare `zh` leaves the choice of Han
 * script to the runtime, which is not the same across environments.
 *
 * Anything `Intl` cannot parse falls back to English instead of throwing.
 * That is not defensiveness for its own sake — the argument arrives here as a
 * URL segment, and `Intl` throws a RangeError on a malformed tag rather than
 * degrading.
 *
 * It cost a 500 on every unmatched path containing a dot. The proxy's matcher
 * excludes those so that real files and route handlers resolve, which left
 * `/ads.txt` or `/wp-config.php` matching `[locale]` with the locale set to
 * "ads.txt". The layout rejects an unknown locale and returns a 404, but a
 * child component formats a price while that check is still running, so the
 * RangeError escaped first and the server answered 500. Crawlers read that as
 * "ask again later" and keep every probe URL queued; a 404 retires it.
 *
 * Validating the tag here rather than at the one call site that broke, because
 * every caller passes a route segment and the next one will have the same bug.
 */
function intlLocale(locale: string): string {
  const tag = locale === 'zh' ? 'zh-Hans' : locale;
  try {
    // Throws on a malformed tag; a well-formed but unknown one is fine and
    // resolves to the runtime's closest match.
    return Intl.getCanonicalLocales(tag)[0] ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
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
