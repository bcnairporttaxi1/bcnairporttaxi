import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import en from '../messages/en.json';

type Messages = typeof en;
type Loose = Record<string, unknown>;

/**
 * Deep-merges a locale catalogue over the English one.
 *
 * Translation lands incrementally: a locale that is only partly translated
 * renders its translated strings and falls back to English for the rest,
 * rather than throwing a missing-message error or showing a blank label.
 */
function mergeWithFallback(base: Loose, override: Loose): Loose {
  const out: Loose = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const baseValue = out[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      out[key] = mergeWithFallback(baseValue as Loose, value as Loose);
    } else if (value !== undefined && value !== '') {
      out[key] = value;
    }
  }

  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messages = en as unknown as Loose;

  if (locale !== 'en') {
    try {
      const localeMessages = (await import(`../messages/${locale}.json`)).default;
      messages = mergeWithFallback(en as unknown as Loose, localeMessages);
    } catch {
      // No catalogue for this locale yet — serve English rather than failing.
    }
  }

  return {
    locale,
    messages: messages as Messages,
    timeZone: 'Europe/Madrid',
  };
});
