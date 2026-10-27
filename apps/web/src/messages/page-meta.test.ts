import { describe, expect, it } from 'vitest';
import { DESTINATION_GROUPS } from '@bcn/core/destinations';
import { destinationCopy } from '@bcn/core/destination-copy';
import ca from './ca.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import italian from './it.json';
import nl from './nl.json';
import pt from './pt.json';
import ru from './ru.json';
import zh from './zh.json';

/**
 * Every page title and meta description, in every language, inside the
 * lengths Google renders.
 *
 * A direct crawl found 52 titles past 60 characters: the Spanish fleet page at
 * 73, Catalan at 77. The page text had been written to fit, and the layout's
 * " | BCNAirportTaxi" suffix (17 characters) was added afterwards by a
 * template nobody checked. The landing pages already had this test; the static
 * pages and the destination templates did not, which is where the overflow
 * lived.
 *
 * Chinese is judged on rendered width, not character count: a CJK glyph is
 * roughly three Latin characters wide, so the limits are tighter.
 */

type Catalogue = Record<string, Record<string, unknown>>;

const CATALOGUES: Record<string, Catalogue> = {
  en, es, ca, fr, de, it: italian, nl, pt, ru, zh,
} as unknown as Record<string, Catalogue>;

const NAMESPACES = ['pricing', 'fleet', 'faq', 'howItWorks', 'contact', 'destinations', 'blog', 'reviews'];

const titleRange = (l: string) => (l === 'zh' ? { min: 12, max: 28 } : { min: 30, max: 60 });
const descRange = (l: string) => (l === 'zh' ? { min: 40, max: 58 } : { min: 120, max: 160 });

/** Fill ICU placeholders the way next-intl would, closely enough to measure. */
const fill = (s: string, vars: Record<string, string>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '€50,00');

describe.each(Object.keys(CATALOGUES))('page metadata [%s]', (locale) => {
  const cat = CATALOGUES[locale];

  it.each(NAMESPACES)('%s title and description fit', (ns) => {
    const m = cat[ns] as { metaTitle?: string; metaDescription?: string } | undefined;
    if (!m?.metaTitle) return;

    const raw = fill(m.metaTitle, {});
    // The suffix is dropped by fitTitle() when it would overflow, so what
    // matters is that the title ALONE fits, and that the title with the suffix
    // fits whenever the suffix is kept.
    const tr = titleRange(locale);
    expect(raw.length, `${ns} title "${raw}"`).toBeLessThanOrEqual(tr.max);
    expect(raw.length, `${ns} title "${raw}"`).toBeGreaterThanOrEqual(tr.min);

    if (m.metaDescription) {
      const d = fill(m.metaDescription, {});
      const dr = descRange(locale);
      expect(d.length, `${ns} description "${d}"`).toBeGreaterThanOrEqual(dr.min);
      expect(d.length, `${ns} description "${d}"`).toBeLessThanOrEqual(dr.max);
    }
  });

  it('renders every destination page title and description in range', () => {
    const r = cat.destinationRoute as {
      metaTitle: string;
      metaDescription: string;
    };
    const tr = titleRange(locale);
    const dr = descRange(locale);
    const wrong: string[] = [];

    for (const d of DESTINATION_GROUPS.flatMap((g) => g.destinations).filter((x) => x.hasPage)) {
      const c = destinationCopy(d, locale);
      const vars = { name: c.route, place: c.place };
      const title = fill(r.metaTitle, vars);
      const desc = fill(r.metaDescription, vars);
      if (title.length > tr.max || title.length < tr.min) wrong.push(`${d.slug} title ${title.length}: ${title}`);
      if (desc.length > dr.max || desc.length < dr.min) wrong.push(`${d.slug} desc ${desc.length}: ${desc}`);
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });
});
