import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero, Prose } from '@/components/page-hero';
import { InstallPrompt } from '@/components/install-prompt';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/install`;
  const t = await getTranslations({ locale, namespace: 'install' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/install`, languages },
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
