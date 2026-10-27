import { SITE_URL } from '@bcn/core/site';
import { LANDING_SLUGS } from '@bcn/core/landing-pages';
import { LEGAL_SLUGS } from '@bcn/core/legal';
import { BLOG_POSTS, BLOG_SLUGS } from '@bcn/core/blog';
import { hasBlogTranslation } from '@bcn/core/blog-copy';
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
  /**
   * The date this page's content last actually changed, or undefined when
   * there is no honest answer. Never a build timestamp.
   */
  lastModified?: string;
  /** hreflang -> absolute URL, including x-default. */
  alternates: Array<[string, string]>;
}

/**
 * When each page's content last changed, as a plain date.
 *
 * Every URL previously carried `new Date().toISOString()` — the moment the
 * sitemap was generated. That is not a content date: it moved on every
 * deploy, so `/terms` claimed to have changed at the same instant as a page
 * that really had, and it always read as "just now". Google's guidance is
 * that an inaccurate lastmod gets the signal ignored for the whole site,
 * which makes a wrong value worse than none.
 *
 * Blog posts are not listed here: they carry their own `updated` date, which
 * is already maintained next to the content and is read directly below.
 *
 * MAINTENANCE: bump the entry when you substantively change a page. A date
 * left stale is a smaller problem than one that is always today, and a path
 * with no entry simply omits `lastmod`, which is a valid and honest sitemap.
 */
const PAGE_REVISED: Record<string, string> = {
  '': '2026-10-25',
  '/pricing': '2026-10-26',
  '/fleet': '2026-10-25',
  '/faq': '2026-10-25',
  '/how-it-works': '2026-10-25',
  '/contact': '2026-10-25',
  '/blog': '2026-10-25',
  '/destinations': '2026-10-26',
  '/book': '2026-10-25',
  '/install': '2026-08-10',
  // The landing and neighbourhood pages were rewritten together.
  ...Object.fromEntries(LANDING_SLUGS.map((s) => [`/${s}`, '2026-10-26'])),
  ...Object.fromEntries(DESTINATION_PAGES.map((d) => [`/destinations/${d.slug}`, '2026-10-26'])),
  // Legal pages change on their own schedule and almost never otherwise.
  ...Object.fromEntries(LEGAL_SLUGS.map((s) => [`/${s}`, '2026-10-25'])),
};

/** The content date for a path, or undefined when none is known. */
function revisedFor(path: string): string | undefined {
  const post = BLOG_POSTS.find((p) => `/blog/${p.slug}` === path);
  if (post) return post.updated ?? post.published;
  return PAGE_REVISED[path];
}

/**
 * Landing slugs that are canonicalised to another URL and therefore must not
 * be submitted. A sitemap entry asks Google to index a page; a canonical
 * pointing elsewhere asks it not to. Listing both says both.
 *
 * book-online: /book renders this page's exact copy and holds the site-wide
 * header link, so it is the canonical of the pair.
 */
/**
 * Paths kept out of the sitemap. `book-online` canonicalises to `/book`;
 * `reviews` carries noindex until the first review is published, and a
 * sitemap that advertises a noindex page is a contradiction Search Console
 * reports as "excluded by noindex". Both return the moment they should.
 */
const CANONICALISED_ELSEWHERE = new Set(['book-online', 'reviews', 'install']);

export function sitemapPaths(): string[] {
  // Filtered at the end rather than per source list: `reviews` is a static
  // path and `book-online` a landing slug, and an exclusion that only
  // covered one of the two silently kept the other in the sitemap.
  return [
    ...STATIC_PATHS,
    ...LANDING_SLUGS.map((s) => `/${s}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
    ...DESTINATION_PAGES.map((d) => `/destinations/${d.slug}`),
    ...LEGAL_SLUGS.map((s) => `/${s}`),
  ].filter((path) => !CANONICALISED_ELSEWHERE.has(path.slice(1)));
}

/**
 * The languages a path really exists in.
 *
 * A guide appears only in the languages it has been translated into, and the
 * legal documents only in English. Listing a URL in the sitemap, or naming it
 * in an hreflang set, is a claim about what is on the page; for 63 URLs that
 * claim was false.
 */
export function localesFor(path: string): readonly (typeof locales)[number][] {
  const post = BLOG_SLUGS.find((slug) => path === `/blog/${slug}`);
  if (post) return locales.filter((l) => hasBlogTranslation(post, l));
  if (LEGAL_SLUGS.some((slug) => path === `/${slug}`)) return ['en'];
  return locales;
}

export function sitemapEntries(): SitemapEntry[] {
  return sitemapPaths().flatMap((path) =>
    localesFor(path).map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: revisedFor(path),
      // Every URL declares the full alternate set, so search engines can map
      // the same page across all ten languages.
      //
      // x-default names the version to serve a searcher whose language is not
      // one of the ten. Without it the set describes ten equals and no
      // fallback, and Google picks one itself.
      alternates: [
        ...localesFor(path).map(
          (l) => [localeHrefLang[l], `${SITE_URL}/${l}${path}`] as [string, string],
        ),
        ['x-default', `${SITE_URL}/en${path}`] as [string, string],
      ],
    })),
  );
}
