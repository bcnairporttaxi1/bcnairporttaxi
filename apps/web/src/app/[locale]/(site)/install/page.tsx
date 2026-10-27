import { fitTitle } from '@/lib/title';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero, Prose } from '@/components/page-hero';
import { InstallPrompt } from '@/components/install-prompt';
import { localeHrefLang, locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHrefLang[l]] = `/${l}/install`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/install`;
  const t = await getTranslations({ locale, namespace: 'install' });
  return {
    title: fitTitle(t('metaTitle')),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/install`, languages },
    // A ~140-word PWA how-to in ten languages. It has no search intent and
    // adds a thin-content signal to a young site, so it stays reachable for
    // the people who need it and stays out of the index. Both halves ship
    // together: noindex plus a sitemap entry is a contradiction Search
    // Console reports as "excluded by noindex".
    robots: { index: false, follow: true },
  };
}

export default async function InstallPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('install');

  // Every step string may bold a UI label, so they all render through `rich`.
  const b = { b: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

  return (
    <>
      <PageHero title={t('title')} intro={t('intro')} />

      <Prose>
        <InstallPrompt />

        <h2>{t('iphoneH2')}</h2>
        <ul>
          <li>{t.rich('iphone1', b)}</li>
          <li>{t.rich('iphone2', b)}</li>
          <li>{t.rich('iphone3', b)}</li>
          <li>{t.rich('iphone4', b)}</li>
        </ul>

        <h2>{t('androidH2')}</h2>
        <ul>
          <li>{t.rich('android1', b)}</li>
          <li>{t.rich('android2', b)}</li>
          <li>{t.rich('android3', b)}</li>
          <li>{t.rich('android4', b)}</li>
        </ul>

        <h2>{t('desktopH2')}</h2>
        <p>{t.rich('desktopBody', b)}</p>

        <h2>{t('benefitsH2')}</h2>
        <ul>
          <li>{t('benefit1')}</li>
          <li>{t('benefit2')}</li>
          <li>{t('benefit3')}</li>
        </ul>
      </Prose>
    </>
  );
}
