import { describe, expect, it } from 'vitest';
import ca from './ca.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
// Named `italian` rather than `it`: the Italian catalogue and vitest's `it`
// cannot both hold that binding.
import italian from './it.json';
import nl from './nl.json';
import pt from './pt.json';
import ru from './ru.json';
import zh from './zh.json';

/**
 * Catalogue integrity across the ten locales.
 *
 * Three faults these catch, all of which shipped at least once by hand and
 * were found by rereading rather than by any tool:
 *
 *  - A key in en.json missing from a locale. This is worse than a crash:
 *    `i18n/request.ts` deep-merges over English, so the page renders that one
 *    paragraph in the wrong language, looks complete, and counts toward the
 *    word count. Nothing fails.
 *  - A stray glyph from another script. A Chinese character landed mid-word
 *    inside the Russian copy twice while this page set was being written. It
 *    parses, it typechecks, the page renders, and only a reader of that
 *    language ever sees it.
 *  - A placeholder dropped in translation. `{km}` missing from a translated
 *    string does not throw — next-intl just renders the sentence without the
 *    number, so the German pricing page states a radius of nothing.
 */

type Catalogue = Record<string, unknown>;

const CATALOGUES: Record<string, Catalogue> = {
  en,
  es,
  ca,
  fr,
  de,
  it: italian,
  nl,
  pt,
  ru,
  zh,
};
const OTHERS = Object.keys(CATALOGUES).filter((l) => l !== 'en');

/** Every leaf path in a catalogue, as "a.b.c". */
function leafPaths(obj: Catalogue, prefix = ''): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out.push(...leafPaths(v as Catalogue, p));
    } else {
      out.push(p);
    }
  }
  return out;
}

function at(obj: Catalogue, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>((o, k) => (o == null ? o : (o as Catalogue)[k]), obj);
}

const EN_PATHS = leafPaths(en as Catalogue);

describe('message catalogues', () => {
  it('has a non-trivial English catalogue to compare against', () => {
    // Guards against the suite passing because the import resolved to {}.
    expect(EN_PATHS.length).toBeGreaterThan(400);
  });

  it.each(OTHERS)('%s translates every English key', (locale) => {
    const have = new Set(leafPaths(CATALOGUES[locale]));
    const missing = EN_PATHS.filter((p) => !have.has(p));
    expect(missing, `${missing.length} keys fall back to English:\n${missing.join('\n')}`)
      .toEqual([]);
  });

  it.each(OTHERS)('%s has no keys English does not', (locale) => {
    // An orphan key is copy nothing renders, usually a rename applied to one
    // catalogue and not the rest.
    const extra = leafPaths(CATALOGUES[locale]).filter((p) => !EN_PATHS.includes(p));
    expect(extra, `orphan keys:\n${extra.join('\n')}`).toEqual([]);
  });

  it.each(Object.keys(CATALOGUES))('%s contains no stray script', (locale) => {
    const CJK = /[㐀-䶿一-鿿豈-﫿]/;
    const CYRILLIC = /[Ѐ-ӿ]/;
    const hits: string[] = [];

    for (const p of leafPaths(CATALOGUES[locale])) {
      const v = at(CATALOGUES[locale], p);
      if (typeof v !== 'string') continue;
      if (locale !== 'zh' && CJK.test(v)) {
        hits.push(`${p}: stray CJK ${JSON.stringify(CJK.exec(v)![0])} in "${v.slice(0, 70)}"`);
      }
      if (locale !== 'ru' && CYRILLIC.test(v)) {
        hits.push(
          `${p}: stray Cyrillic ${JSON.stringify(CYRILLIC.exec(v)![0])} in "${v.slice(0, 70)}"`,
        );
      }
    }

    expect(hits, hits.join('\n')).toEqual([]);
  });

  it('keeps every placeholder the English string declares', () => {
    const TOKEN = /\{(\w+)\}/g;
    const wrong: string[] = [];

    for (const p of EN_PATHS) {
      const src = at(en as Catalogue, p);
      if (typeof src !== 'string') continue;
      const want = [...src.matchAll(TOKEN)].map((m) => m[1]).sort().join(',');
      if (!want) continue;

      for (const locale of OTHERS) {
        const v = at(CATALOGUES[locale], p);
        if (typeof v !== 'string') continue; // absence is the other test's job
        const got = [...v.matchAll(TOKEN)].map((m) => m[1]).sort().join(',');
        if (got !== want) wrong.push(`${locale} ${p}: has [${got}], en has [${want}]`);
      }
    }

    expect(wrong, wrong.join('\n')).toEqual([]);
  });
});
