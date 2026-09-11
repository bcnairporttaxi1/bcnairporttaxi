import { sitemapEntries } from '@/lib/sitemap-data';

/**
 * The sitemap, serialised by hand.
 *
 * Next's `app/sitemap.ts` convention produces valid XML but gives no way to
 * attach an `<?xml-stylesheet?>` processing instruction, so a browser opening
 * this file got an unreadable run-on of every URL, date and priority with no
 * structure at all. The instruction below points at /sitemap.xsl, which turns
 * the same bytes into a readable page for a human.
 *
 * Crawlers ignore it. The XML is byte-identical to what the convention emitted
 * apart from that one line, and still validates against the sitemaps.org
 * schema — the stylesheet is a processing instruction, not content.
 */
export const dynamic = 'force-static';

/** XML text escaping. URLs here contain no reserved characters today, but a
 *  slug with an ampersand would silently produce a malformed document. */
function xml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function GET(): Response {
  const entries = sitemapEntries();

  const urls = entries
    .map((e) => {
      const alternates = e.alternates
        .map(
          ([lang, href]) =>
            `<xhtml:link rel="alternate" hreflang="${xml(lang)}" href="${xml(href)}"/>`,
        )
        .join('');

      return (
        `<url>` +
        `<loc>${xml(e.url)}</loc>` +
        alternates +
        `<lastmod>${e.lastModified}</lastmod>` +
        `<changefreq>${e.changeFrequency}</changefreq>` +
        `<priority>${e.priority}</priority>` +
        `</url>`
      );
    })
    .join('');

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
    urls +
    `</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
