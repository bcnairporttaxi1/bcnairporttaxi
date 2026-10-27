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
  // Always prefix so every page has one canonical, unambiguous URL per language.
  localePrefix: 'always',
  /*
   * No HTTP `Link` hreflang header.
   *
   * next-intl adds one by default, and it contradicted the page it was
   * attached to on every one of the 400 URLs: it declared `x-default` as the
   * bare, unprefixed URL (`https://bcnairporttaxi.es/faq`), which 307s to a
   * locale, while the HTML and the sitemap both declare `/en/faq`. It also
   * spelled Chinese `zh` where the sitemap says `zh-Hans`.
   *
   * Search Console shows the cost. Google indexed the unprefixed URLs —
   * `/destinations/lloret-de-mar` alone collected 57 impressions — which can
   * only have been discovered through that header, since nothing links to
   * them. Two hreflang sources that disagree is worse than one, and the HTML
   * tags and the sitemap already carry the full set.
   */
  alternateLinks: false,
});
