import { defineRouting } from 'next-intl/routing';

export const locales = [
  'en',
  'es',
  'ca',
  'fr',
  'de',
  'it',
  'pt',
  'nl',
  'ru',
  'zh',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Display names shown in the language switcher, each in its own language. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  ru: 'Русский',
  zh: '中文',
};

/** BCP-47 tags for `hreflang` and `<html lang>`. */
export const localeHrefLang: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  ca: 'ca',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  nl: 'nl',
  ru: 'ru',
  zh: 'zh-Hans',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Every URL already carries its locale, so the NEXT_LOCALE cookie adds nothing
  // for routing — and a Set-Cookie on every response makes each page uncacheable
  // at the CDN. Off, the marketing pages render statically and serve from the edge.
  // The site root still picks a language from Accept-Language on first visit.
  localeCookie: false,
  // Always prefix so every page has one canonical, unambiguous URL per language.
  localePrefix: 'always',
});

/**
 * `alternates.languages` for one page.
 *
 * Keys are BCP-47 tags from {@link localeHrefLang} — so Chinese is emitted as
 * `zh-Hans`, not `zh` — and every page gets an `x-default` pointing at the
 * English URL. Pages used to build this map inline from the raw locale keys,
 * which dropped `x-default` and disagreed with the root layout on Chinese.
 *
 * `altLanguages('/pricing')` → `{ en: '/en/pricing', …, 'x-default': '/en/pricing' }`
 */
export function altLanguages(path = ''): Record<string, string> {
  const suffix = path && !path.startsWith('/') ? `/${path}` : path;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHrefLang[l]] = `/${l}${suffix}`;
  }
  languages['x-default'] = `/${defaultLocale}${suffix}`;
  return languages;
}
