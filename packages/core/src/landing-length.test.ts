import { describe, expect, it } from 'vitest';
import { LANDING_PAGES, getLandingCopy } from './landing-pages';

/**
 * Landing pages need enough copy to be worth indexing, in every language.
 *
 * A full crawl of the live site found the English landing pages at 540-660
 * rendered words and the other nine locales at 300-430, because the English
 * copy was expanded and the translations were not. 126 of 400 URLs sat below
 * the 600-word minimum for a service page — and Search Console shows 55% of
 * all impressions are on the Spanish ones.
 *
 * The page template adds roughly 100 words of its own (the booking widget,
 * its disclaimer and the related-links block), so the copy itself needs about
 * 500. Chinese is counted in characters, matching how the crawl counts it.
 *
 * This is a floor, not a target: padding to reach it would make a page worse
 * and the doorway-page problem the floor exists to prevent. It exists so a
 * locale cannot fall back to 300 words unnoticed.
 */

const LOCALES = ['en', 'es', 'ca', 'fr', 'de', 'it', 'nl', 'pt', 'ru', 'zh'];
const MIN_WORDS = 470;

/**
 * Per-language floor, as a share of the English one.
 *
 * Russian runs shorter than English for the same content because it carries
 * what English spreads over several small words in case endings. A faithful
 * Russian translation of the English pages lands near 0.8-0.9x, and the
 * previous version of this test pushed an agent to reach 470 by appending the
 * same three boilerplate sections to 13 pages — 20% of the Russian copy became
 * sentences repeated across pages, against 0% everywhere else. Setting the bar
 * where a true translation lands removes the incentive to pad.
 */
const LANGUAGE_RATIO: Record<string, number> = { ru: 0.78 };
const MIN_CJK_CHARS = 650;

function size(locale: string, text: string): number {
  if (locale === 'zh') return (text.match(/[㐀-鿿]/g) ?? []).length;
  return text.split(/\s+/).filter(Boolean).length;
}

describe.each(LOCALES)('landing copy length [%s]', (locale) => {
  it('gives every page enough copy', () => {
    const short: string[] = [];
    for (const page of LANDING_PAGES) {
      const c = getLandingCopy(page, locale);
      const text = [c.h1, c.intro, ...c.sections.flatMap((s) => [s.h2, s.body])].join(' ');
      const n = size(locale, text);
      const need = locale === 'zh' ? MIN_CJK_CHARS : Math.round(MIN_WORDS * (LANGUAGE_RATIO[locale] ?? 1));
      if (n < need) short.push(`${page.slug}: ${n} / ${need}`);
    }
    expect(short, `${locale} is under the floor on:\n${short.join('\n')}`).toEqual([]);
  });
});

/**
 * No locale may reach the floor by repeating itself.
 *
 * The Russian landing copy once met the word floor by appending the same
 * three sections ("booking deadline and cancellation", "price and payment",
 * "vehicle capacity") to thirteen pages, so 20.1% of it was sentences found
 * on two or more pages. Every other locale was at 0.0%. This measures exactly
 * that, so the next translation that pads fails here instead of passing the
 * length test above.
 */
describe.each(LOCALES)('landing copy is not repeated across pages [%s]', (locale) => {
  it('keeps shared sentences under 5% of the copy', () => {
    const pagesBySentence = new Map<string, Set<string>>();
    const all: Array<{ slug: string; key: string }> = [];

    for (const page of LANDING_PAGES) {
      const c = getLandingCopy(page, locale);
      for (const s of c.sections) {
        for (const sentence of s.body.split(/(?<=[.!?。])\s*/)) {
          const key = sentence
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, ' ')
            .trim();
          if (key.length < 20) continue;
          all.push({ slug: page.slug, key });
          const set = pagesBySentence.get(key) ?? new Set<string>();
          set.add(page.slug);
          pagesBySentence.set(key, set);
        }
      }
    }

    let shared = 0;
    let total = 0;
    for (const { key } of all) {
      total += key.length;
      if ((pagesBySentence.get(key)?.size ?? 0) >= 2) shared += key.length;
    }
    const pct = (100 * shared) / total;
    expect(pct, `${locale}: ${pct.toFixed(1)}% of landing copy is repeated across pages`).toBeLessThan(5);
  });
});
