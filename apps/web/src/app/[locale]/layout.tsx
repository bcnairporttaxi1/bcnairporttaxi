import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

import { localeHrefLang, locales, routing, type Locale } from '@/i18n/routing';
import { SITE_URL, absoluteUrl } from '@bcn/core/site';
import { OrganizationJsonLd } from '@/components/json-ld';
import '../globals.css';

// Omitting `weight` loads the variable font: one file covering every weight,
// instead of one file per weight. Sora and Inter both ship variable versions.
/**
 * Geist carries both display and body. It is a single variable file across the
 * whole weight range, so using it twice costs nothing extra, and its tight
 * apertures hold up at the headline sizes this page uses.
 */
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

/**
 * The one editorial note. Used italic, in saffron, on the second line of a
 * heading — never for body copy, where its low x-height would cost legibility
 * for the tired traveller this site is actually for.
 */
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic', 'normal'],
  variable: '--font-editorial',
  display: 'swap',
});



// Space Mono has no variable version. It is used only for figures, so the
// regular weight alone is loaded and bold is synthesised.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0E0E10',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'home' });

  // hreflang for every language, plus x-default pointing at English.
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHrefLang[l]] = `/${l}`;
  }
  languages['x-default'] = '/en';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('metaTitle'),
      template: '%s | BCNAirportTaxi',
    },
    description: t('metaDescription'),
    applicationName: 'BCNAirportTaxi',
    manifest: '/manifest.webmanifest',
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'BCNAirportTaxi',
      locale: localeHrefLang[locale as Locale],
      url: absoluteUrl(`/${locale}`),
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [
        {
          url: '/img/hero-banner.jpg',
          width: 1920,
          height: 1080,
          alt: 'Black and yellow Barcelona airport taxi on the waterfront at sunset with the Sagrada Família behind',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'BCNAirportTaxi',
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale segment.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={localeHrefLang[locale as Locale]}
      className={`${geist.variable} ${instrument.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {t('skipToContent')}
          </a>
            {/* Site header, footer and cookie banner live in the (site) route
                group now. They belong to the public website, not to the
                signed-in panels, which render their own application chrome
                through PanelShell. Route groups do not affect URLs. */}
            {props.children}
          <OrganizationJsonLd locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
