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
});
