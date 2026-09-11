import { SITE_URL } from '@bcn/core/site';
import { LANDING_SLUGS } from '@bcn/core/landing-pages';
import { LEGAL_SLUGS } from '@bcn/core/legal';
import { BLOG_SLUGS } from '@bcn/core/blog';
import { DESTINATION_PAGES } from '@bcn/core/destinations';
import { localeHrefLang, locales } from '@/i18n/routing';

/**
 * Every URL in the sitemap, and the alternates for each.
 *
 * This used to live in `app/sitemap.ts`, the Next file convention. It moved
 * out so the XML can be serialised by hand: the convention gives no way to
 * emit an `<?xml-stylesheet?>` processing instruction, and without one a
 * browser shows the sitemap as an unreadable run-on wall of text. The data is
 * unchanged — only who writes the angle brackets.
 */

/** Routes that exist as their own page files, relative to a locale prefix. */
const STATIC_PATHS = [
  '',
  '/book',
  '/pricing',
  '/fleet',
  '/how-it-works',
  '/faq',
  '/contact',
  '/reviews',
  '/install',
  '/blog',
  '/destinations',
];

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'weekly';
  priority: number;
  /** hreflang -> absolute URL, including x-default. */
  alternates: Array<[string, string]>;
}

function priorityFor(path: string): number {
  if (path === '') return 1;
  if (path === '/book' || path === '/pricing') return 0.9;
  if (LEGAL_SLUGS.some((s) => path === `/${s}`)) return 0.3;
  return 0.7;
}

/**
 * Landing slugs that are canonicalised to another URL and therefore must not
 * be submitted. A sitemap entry asks Google to index a page; a canonical
 * pointing elsewhere asks it not to. Listing both says both.
 *
 * book-online: /book renders this page's exact copy and holds the site-wide
 * header link, so it is the canonical of the pair.
 */
const CANONICALISED_ELSEWHERE = new Set(['book-online']);

export function sitemapPaths(): string[] {
  return [
    ...STATIC_PATHS,
    ...LANDING_SLUGS.filter((s) => !CANONICALISED_ELSEWHERE.has(s)).map((s) => `/${s}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
    ...DESTINATION_PAGES.map((d) => `/destinations/${d.slug}`),
    ...LEGAL_SLUGS.map((s) => `/${s}`),
  ];
}

export function sitemapEntries(now: Date = new Date()): SitemapEntry[] {
  const lastModified = now.toISOString();

  return sitemapPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: priorityFor(path),
      // Every URL declares the full alternate set, so search engines can map
      // the same page across all ten languages.
      //
      // x-default names the version to serve a searcher whose language is not
      // one of the ten. Without it the set describes ten equals and no
      // fallback, and Google picks one itself.
      alternates: [
        ...locales.map(
          (l) => [localeHrefLang[l], `${SITE_URL}/${l}${path}`] as [string, string],
        ),
        ['x-default', `${SITE_URL}/en${path}`] as [string, string],
      ],
    })),
  );
}
