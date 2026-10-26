import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SOCIAL_CARD, socialImages, twitterImages } from './social-card';

/**
 * Any route that sets `openGraph` must also set `images`.
 *
 * Next merges metadata shallowly from layout to page: a page-level
 * `openGraph` object *replaces* the layout's rather than merging into it, so
 * omitting `images` silently removes the social image instead of inheriting
 * it. Nothing fails, nothing warns, and the page looks fine in a browser —
 * the loss is only visible in a link preview.
 *
 * It cost 230 of this site's 400 URLs: all twelve destination pages and all
 * eleven landing pages, across ten locales each. The homepage and the blog
 * were unaffected, which is why it survived several metadata reviews. It
 * matters here beyond the usual, because WhatsApp is a primary conversion
 * channel for this business and WhatsApp previews read `og:image` only —
 * they do not fall back to `twitter:image`.
 *
 * This scans the route files as text rather than importing them, because
 * `generateMetadata` needs a request context that does not exist in a unit
 * test. Crude, and it catches the thing a types check cannot.
 */

const APP_DIR = join(import.meta.dirname, '..', 'app');

/** Every page/layout file under app/, recursively. */
function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...routeFiles(full));
    } else if (/^(page|layout)\.tsx$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

describe('social card', () => {
  it('points at a file that exists and is a social-safe format', () => {
    const file = join(import.meta.dirname, '..', '..', 'public', SOCIAL_CARD.url);
    expect(existsSync(file), `missing: ${SOCIAL_CARD.url}`).toBe(true);
    // Facebook's and WhatsApp's scrapers are unreliable with WebP for
    // og:image, so the card stays JPEG or PNG even though every on-page
    // image is served as AVIF/WebP.
    expect(SOCIAL_CARD.url).toMatch(/\.(jpe?g|png)$/i);
  });

  it('is at least 1200px wide and landscape', () => {
    // 1200x630 is the platform baseline; anything portrait crops badly.
    expect(SOCIAL_CARD.width).toBeGreaterThanOrEqual(1200);
    expect(SOCIAL_CARD.width).toBeGreaterThan(SOCIAL_CARD.height);
  });

  it('carries alt text', () => {
    expect(SOCIAL_CARD.alt.length).toBeGreaterThan(20);
  });

  it('exports the shapes the metadata objects spread', () => {
    expect(socialImages).toHaveLength(1);
    expect(twitterImages).toEqual([SOCIAL_CARD.url]);
  });

  it('is set by every route that declares openGraph', () => {
    const offenders: string[] = [];

    for (const file of routeFiles(APP_DIR)) {
      const src = readFileSync(file, 'utf8');
      if (!/openGraph\s*:\s*\{/.test(src)) continue;

      // `images` anywhere in the file is enough: it is either the literal key
      // or the shared constant spread into the object.
      const hasImages = /images\s*:/.test(src) || /socialImages/.test(src);
      if (!hasImages) {
        offenders.push(file.slice(file.indexOf('app')));
      }
    }

    expect(
      offenders,
      `these routes set openGraph without images, which REPLACES the layout's\n` +
        `object and ships no og:image at all:\n${offenders.join('\n')}`,
    ).toEqual([]);
  });

  it('found route files to scan at all', () => {
    // Guards against the walk silently returning nothing, which would make
    // the assertion above pass for the wrong reason.
    expect(routeFiles(APP_DIR).length).toBeGreaterThan(10);
  });
});
