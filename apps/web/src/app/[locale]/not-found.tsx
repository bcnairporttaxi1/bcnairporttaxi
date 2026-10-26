import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

/**
 * A 404 inside a locale segment inherits the locale layout's metadata unless
 * it overrides it, and the layout is written for a real page: it sets
 * `robots: { index: true, follow: true }`, a canonical to `/${locale}`, and
 * ten hreflang alternates.
 *
 * So every locale-prefixed miss — `/en/nonexistent`, `/en/booking`, any
 * mistyped URL — served two contradictory robots tags (Next adds `noindex`
 * for the 404 status, the layout adds `index, follow`) plus a canonical
 * pointing at the homepage and a full alternates set. Google honours the
 * most restrictive directive, so these were not being indexed, but a 404
 * declaring itself canonical to the homepage is a soft-duplicate signal
 * aimed at the most important URL on the site.
 *
 * Root-level misses never had this, because they are served by
 * `global-not-found`, which bypasses layouts entirely. Fixing that one did
 * not fix this one, and the two have to be checked separately.
 *
 * `null` rather than `undefined` on the alternates: Next's metadata merge
 * treats an explicit `undefined` as "inherit", and only `null` removes an
 * inherited value.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null, languages: {} },
};

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="font-mono text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 text-dim">{t('body')}</p>
      <Link
        href="/"
        className="wave mt-8 rounded-lg bg-gold px-5 py-3 font-display font-extrabold text-void hover:bg-accent-deep"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
