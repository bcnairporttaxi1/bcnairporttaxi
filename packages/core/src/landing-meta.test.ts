import { describe, expect, it } from 'vitest';
import { LANDING_PAGES, getLandingCopy } from './landing-pages';

/**
 * Titles and meta descriptions inside the ranges Google renders.
 *
 * Written because this drifted twice without anyone noticing: the pricing
 * page's description reached 235 characters in one locale and 70 in another,
 * and every destination page reused a 45-character card blurb as its snippet.
 * Nothing failed, nothing logged, and the only symptom was a truncated or
 * half-empty result in a search engine nobody was watching.
 *
 * The limits are Google's rendering limits, from the skill's quality gates:
 * titles 30-60, descriptions 120-160. Landing pages set their titles with
 * `absolute`, so no site-name suffix is appended and the raw string is what
 * renders — unlike pages that go through the layout's template, which costs
 * seventeen more characters.
 */
const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

/**
 * Every locale's copy for every landing page, flattened for iteration.
 *
 * Read through `getLandingCopy` rather than `page.copy`, because only English
 * lives on the page object — the other nine are merged in from their own
 * modules. A first version of this test read `page.copy` directly and so
 * silently checked English alone, which is exactly the blind spot that let
 * the lengths drift in the first place.
 */
const LOCALES = ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'];

const entries = LANDING_PAGES.flatMap((page) =>
  LOCALES.map((locale) => {
    const copy = getLandingCopy(page, locale);
    return {
      slug: page.slug,
      locale,
      title: copy.title,
      description: copy.description,
    };
  }),
);

/**
 * Chinese is measured on rendered width, not character count.
 *
 * Google cuts a description at roughly 920 pixels. A Latin character averages
 * about 5.8px there, which is where 160 comes from; a full-width CJK glyph is
 * about 16px, so the same slot holds only about 57 of them. Holding Chinese
 * to the Latin count would overflow the snippet by nearly triple and the
 * surplus would be filler nobody wrote for a reader.
 *
 * Titles follow the same ratio: 60 Latin characters of title is about 28 CJK.
 */
const isCjk = (locale: string) => locale === 'zh';
const descBand = (locale: string) =>
  isCjk(locale) ? { min: 40, max: 58 } : { min: DESC_MIN, max: DESC_MAX };
const titleBand = (locale: string) =>
  isCjk(locale) ? { min: 12, max: 28 } : { min: TITLE_MIN, max: TITLE_MAX };

describe('landing page metadata', () => {
  it('has copy for every page', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('keeps every title inside the length Google renders', () => {
    const bad = entries
      .filter((e) => {
        const { min, max } = titleBand(e.locale);
        return e.title.length < min || e.title.length > max;
      })
      .map((e) => `${e.slug} [${e.locale}] ${e.title.length}: ${e.title}`);
    expect(bad, `\n${bad.join('\n')}`).toEqual([]);
  });

  it('keeps every meta description inside the length Google renders', () => {
    const bad = entries
      .filter((e) => {
        const { min, max } = descBand(e.locale);
        return e.description.length < min || e.description.length > max;
      })
      .map((e) => `${e.slug} [${e.locale}] ${e.description.length}: ${e.description.slice(0, 80)}`);
    expect(bad, `\n${bad.join('\n')}`).toEqual([]);
  });

  it('gives every page a title and description distinct from the others', () => {
    // Two pages sharing a snippet compete for the same result rather than
    // ranking for their own query.
    for (const locale of [...new Set(entries.map((e) => e.locale))]) {
      const forLocale = entries.filter((e) => e.locale === locale);
      const titles = forLocale.map((e) => e.title);
      const descriptions = forLocale.map((e) => e.description);
      expect(new Set(titles).size, `duplicate title in ${locale}`).toBe(titles.length);
      expect(new Set(descriptions).size, `duplicate description in ${locale}`).toBe(
        descriptions.length,
      );
    }
  });
});
