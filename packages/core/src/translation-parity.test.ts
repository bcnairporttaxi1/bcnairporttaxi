import { describe, expect, it } from 'vitest';
import { BLOG_POSTS } from './blog';
import { BLOG_COPY_LOCALES, blogCopyFor } from './blog-copy';
import { DESTINATION_GROUPS } from './destinations';
import { DESTINATION_COPY_LOCALES, destinationCopyFor } from './destination-copy';
import { LANDING_PAGES, translatedLocales } from './landing-pages';

/**
 * Translations must be translations.
 *
 * Three ways a 1:1 translation silently goes wrong, all of which happened on
 * this site or its sibling catalogues:
 *
 *  - A figure changes. A translator rounds, reformats or drops "14.3 km" or
 *    "EUR 50", and a price page now disagrees with the checkout. The check is
 *    that every number in the English is present in the translation, which is
 *    crude and catches exactly this.
 *  - English survives. The destination pages shipped "Traslado a Barcelona to
 *    Andorra" because a template was fed an English route name. The check is
 *    that the leaked phrase appears nowhere.
 *  - A glyph from the wrong script lands mid-sentence. A Chinese character
 *    appeared inside Russian copy three times while writing this catalogue;
 *    it parses, builds and renders, and only a reader of that language sees
 *    it.
 *
 * Structure is checked too: same number of paragraphs per body and sections
 * per guide, because a translation that quietly drops a paragraph reads fine.
 */

const LOCALES = DESTINATION_COPY_LOCALES;
const CJK = /[㐀-䶿一-鿿豈-﫿]/;
const CYRILLIC = /[Ѐ-ӿ]/;

/** Numbers worth preserving: anything with a decimal or two-plus digits. */
function figures(text: string): string[] {
  const out = new Set<string>();
  for (const m of text.matchAll(/\d+(?:[.,]\d+)?/g)) {
    const raw = m[0];
    const normal = raw.replace(',', '.');
    if (normal.includes('.') || raw.length >= 2) out.add(normal);
  }
  return [...out];
}

function strayScript(locale: string, text: string): string | null {
  if (locale !== 'zh' && CJK.test(text)) return `CJK ${JSON.stringify(CJK.exec(text)![0])}`;
  if (locale !== 'ru' && CYRILLIC.test(text)) return `Cyrillic ${JSON.stringify(CYRILLIC.exec(text)![0])}`;
  return null;
}

const ALL_DESTINATIONS = DESTINATION_GROUPS.flatMap((g) => g.destinations);
const PAGE_DESTINATIONS = ALL_DESTINATIONS.filter((d) => d.hasPage);

describe('translation tables exist for every locale', () => {
  it('has the nine non-English locales', () => {
    expect([...LOCALES].sort()).toEqual(['ca', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'ru', 'zh']);
    expect([...BLOG_COPY_LOCALES].sort()).toEqual([...LOCALES].sort());
  });
});

describe.each(LOCALES)('destination copy [%s]', (locale) => {
  const table = destinationCopyFor(locale)!;

  it('covers every destination, including the request-a-quote cards', () => {
    const missing = ALL_DESTINATIONS.filter((d) => !table.destinations[d.slug]).map((d) => d.slug);
    expect(missing, `${locale} is missing: ${missing.join(', ')}`).toEqual([]);
  });

  it('covers every destination group', () => {
    const missing = DESTINATION_GROUPS.filter((g) => !table.groups[g.slug]).map((g) => g.slug);
    expect(missing, `${locale} is missing groups: ${missing.join(', ')}`).toEqual([]);
  });

  it('gives every page a body with the same number of paragraphs as English', () => {
    const wrong: string[] = [];
    for (const d of PAGE_DESTINATIONS) {
      const t = table.destinations[d.slug];
      if (!t?.body) {
        wrong.push(`${d.slug}: no body`);
      } else if (t.body.length !== (d.body ?? []).length) {
        wrong.push(`${d.slug}: ${t.body.length} paragraphs, English has ${(d.body ?? []).length}`);
      }
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });

  it('keeps every figure the English states', () => {
    const wrong: string[] = [];
    for (const d of PAGE_DESTINATIONS) {
      const t = table.destinations[d.slug];
      if (!t?.body) continue;
      const have = new Set(figures(t.body.join(' ')));
      for (const f of figures((d.body ?? []).join(' '))) {
        if (!have.has(f)) wrong.push(`${d.slug}: lost the figure ${f}`);
      }
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });

  it('has no English route phrase left in any string', () => {
    const wrong: string[] = [];
    for (const [slug, t] of Object.entries(table.destinations)) {
      const text = [t.place, t.route, t.blurb, ...(t.body ?? [])].join(' ');
      if (/Barcelona (?:Airport )?to /.test(text)) wrong.push(`${slug}: contains an English "Barcelona to"`);
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });

  it('keeps the route phrase short enough to sit in a title', () => {
    const wrong: string[] = [];
    for (const [slug, t] of Object.entries(table.destinations)) {
      const max = locale === 'zh' ? 18 : 40;
      if (t.route.length > max) wrong.push(`${slug}: route is ${t.route.length} chars: ${t.route}`);
      const maxPlace = locale === 'zh' ? 10 : 24;
      if (t.place.length > maxPlace) wrong.push(`${slug}: place is ${t.place.length} chars: ${t.place}`);
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });

  it('has no glyphs from the wrong script', () => {
    const wrong: string[] = [];
    for (const [slug, t] of Object.entries(table.destinations)) {
      for (const s of [t.place, t.route, t.blurb, ...(t.body ?? [])]) {
        const bad = strayScript(locale, s);
        if (bad) wrong.push(`${slug}: ${bad} in "${s.slice(0, 60)}"`);
      }
    }
    for (const [slug, g] of Object.entries(table.groups)) {
      for (const s of [g.title, g.intro]) {
        const bad = strayScript(locale, s);
        if (bad) wrong.push(`group ${slug}: ${bad}`);
      }
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });
});

describe.each(LOCALES)('guides [%s]', (locale) => {
  const table = blogCopyFor(locale)!;

  it.each(BLOG_POSTS.map((p) => p.slug))('translates %s with the same structure', (slug) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug)!;
    const t = table[slug];
    expect(t, `${locale} has no translation of ${slug}`).toBeDefined();
    expect(t.sections.length, 'section count').toBe(post.sections.length);
    post.sections.forEach((s, i) => {
      expect(t.sections[i].body.length, `section ${i} paragraph count`).toBe(s.body.length);
    });
  });

  it.each(BLOG_POSTS.map((p) => p.slug))('keeps every figure in %s', (slug) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug)!;
    const t = table[slug];
    if (!t) return; // reported by the structure test
    const english = figures(post.sections.flatMap((s) => s.body).join(' '));
    const have = new Set(figures(t.sections.flatMap((s) => s.body).join(' ')));
    const lost = english.filter((f) => !have.has(f));
    expect(lost, `${locale} ${slug} lost figures: ${lost.join(', ')}`).toEqual([]);
  });

  it.each(BLOG_POSTS.map((p) => p.slug))('has a title and description that fit in %s', (slug) => {
    const t = table[slug];
    if (!t) return;
    const cjk = locale === 'zh';
    const title = cjk ? { min: 12, max: 28 } : { min: 30, max: 60 };
    const desc = cjk ? { min: 40, max: 58 } : { min: 120, max: 160 };
    expect(t.title.length, `title "${t.title}"`).toBeGreaterThanOrEqual(title.min);
    expect(t.title.length, `title "${t.title}"`).toBeLessThanOrEqual(title.max);
    expect(t.description.length, `description "${t.description}"`).toBeGreaterThanOrEqual(desc.min);
    expect(t.description.length, `description "${t.description}"`).toBeLessThanOrEqual(desc.max);
  });

  it('has no glyphs from the wrong script and no English headline left', () => {
    const wrong: string[] = [];
    for (const [slug, t] of Object.entries(table)) {
      const post = BLOG_POSTS.find((p) => p.slug === slug)!;
      if (t.title === post.title) wrong.push(`${slug}: title is still English`);
      for (const s of [t.title, t.description, t.h1, t.excerpt, ...t.sections.flatMap((x) => [x.h2, ...x.body])]) {
        const bad = strayScript(locale, s);
        if (bad) wrong.push(`${slug}: ${bad} in "${s.slice(0, 60)}"`);
      }
    }
    expect(wrong, wrong.join('\n')).toEqual([]);
  });
});

describe('landing pages are translated, not served as English', () => {
  it.each(LANDING_PAGES.map((p) => p.slug))('%s exists in all nine other locales', (slug) => {
    const have = translatedLocales(slug).sort();
    const missing = ['ca', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'ru', 'zh'].filter((l) => !have.includes(l));
    expect(missing, `${slug} falls back to English in: ${missing.join(', ')}`).toEqual([]);
  });
});
