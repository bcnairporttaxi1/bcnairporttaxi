import type { MetadataRoute } from 'next';
import { SITE_URL } from '@bcn/core/site';
import { LANDING_SLUGS } from '@bcn/core/landing-pages';
import { LEGAL_SLUGS } from '@bcn/core/legal';
import { BLOG_SLUGS } from '@bcn/core/blog';
import { DESTINATION_PAGES } from '@bcn/core/destinations';
import { localeHrefLang, locales } from '@/i18n/routing';

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

function priorityFor(path: string): number {
  if (path === '') return 1;
  if (path === '/book' || path === '/pricing') return 0.9;
  if (LEGAL_SLUGS.some((s) => path === `/${s}`)) return 0.3;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...LANDING_SLUGS.map((s) => `/${s}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
    ...DESTINATION_PAGES.map((d) => `/destinations/${d.slug}`),
    ...LEGAL_SLUGS.map((s) => `/${s}`),
  ];

  const now = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: priorityFor(path),
      // Every URL declares the full alternate set, so search engines can map
      // the same page across all ten languages.
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeHrefLang[l], `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
