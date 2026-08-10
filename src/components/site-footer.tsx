import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LANDING_PAGES, getLandingCopy } from '@/lib/landing-pages';
import { getLocale } from 'next-intl/server';

const COMPANY_LINKS = [
  { href: '/how-it-works', key: 'howItWorks' },
  { href: '/fleet', key: 'fleet' },
  { href: '/pricing', key: 'pricing' },
  { href: '/reviews', key: 'reviews' },
  { href: '/contact', key: 'contact' },
] as const;

const LEGAL_LINKS = [
  { href: '/terms', key: 'terms' },
  { href: '/privacy', key: 'privacy' },
  { href: '/cookies', key: 'cookies' },
  { href: '/refund-policy', key: 'refunds' },
] as const;

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const locale = await getLocale();

  // Link the six strongest landing pages; the rest are reachable from each other.
  const routes = LANDING_PAGES.slice(0, 6);

  return (
    <footer className="mt-24 border-t border-white/10 bg-ink text-porcelain/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/img/logo.png"
            alt="BCNAirportTaxi — Barcelona airport taxi booking"
            width={258}
            height={120}
            className="h-11 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-porcelain/65">{t('about')}</p>
        </div>

        <nav aria-labelledby="footer-routes">
          <h2 id="footer-routes" className="font-display text-sm font-bold uppercase tracking-wider text-porcelain">
            {t('routes')}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {routes.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-accent">
                  {getLandingCopy(p, locale).h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="font-display text-sm font-bold uppercase tracking-wider text-porcelain">
            {t('company')}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.key === 'reviews' ? 'Reviews' : tn(l.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="hover:text-accent">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/install" className="hover:text-accent">
                {t('installApp')}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="font-display text-sm font-bold uppercase tracking-wider text-porcelain">
            {t('legal')}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-porcelain/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BCNAirportTaxi. {t('rights')}</p>
          <p className="max-w-xl sm:text-right">{t('disclaimerShort')}</p>
        </div>
      </div>
    </footer>
  );
}
