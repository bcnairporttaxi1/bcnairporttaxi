import { describe, expect, it } from 'vitest';
import { sitemapPaths } from './sitemap-data';

describe('sitemap paths', () => {
  it('omits pages that are noindex or canonicalised elsewhere', () => {
    const paths = sitemapPaths();
    // /reviews is noindex until the first review; /book-online canonicalises
    // to /book. An exclusion that only covered landing slugs missed /reviews,
    // which is a static path — the sitemap advertised it for weeks.
    expect(paths).not.toContain('/reviews');
    expect(paths).not.toContain('/book-online');
  });

  it('still carries the pages that earn traffic', () => {
    const paths = sitemapPaths();
    // The homepage is the empty path; the locale prefix is added per entry.
    for (const p of ['', '/pricing', '/fleet', '/el-prat-airport-taxi', '/destinations/sitges']) {
      expect(paths).toContain(p);
    }
  });
});
