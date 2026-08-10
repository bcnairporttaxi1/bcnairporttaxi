import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, Sora, Space_Mono } from 'next/font/google';

import { localeHrefLang, locales, routing, type Locale } from '@/i18n/routing';
import { SITE_URL, absoluteUrl } from '@/lib/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieBanner } from '@/components/cookie-banner';
import { OrganizationJsonLd } from '@/components/json-ld';
import '../globals.css';

// Omitting `weight` loads the variable font: one file covering every weight,
// instead of one file per weight. Sora and Inter both ship variable versions.
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

// Space Mono has no variable version. It is used only for figures, so the
// regular weight alone is loaded and bold is synthesised.
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-space-mono',
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
      className={`${sora.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {t('skipToContent')}
          </a>
          <SiteHeader />
          <main id="main">{props.children}</main>
          <SiteFooter />
          <CookieBanner />
          <OrganizationJsonLd locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
