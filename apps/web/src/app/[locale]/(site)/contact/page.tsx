import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { CONTACT_EMAIL, whatsappLink } from '@bcn/core/site';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/contact`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/contact`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/contact`, languages },
  };
}

export default async function ContactPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: t('h1'), url: `/${locale}/contact` },
        ]}
      />
      <PageHero title={t('h1')} intro={t('intro')} />

      <div className="mx-auto grid max-w-3xl gap-5 px-4 py-14 sm:grid-cols-2">
        <a
          href={whatsappLink('Hi, I would like to book a Barcelona airport taxi.')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-card border-2 border-accent/40 bg-accent/5 p-6 transition hover:border-gold"
        >
          <h2 className="font-display text-lg font-extrabold">{t('whatsappTitle')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-dim">{t('whatsappBody')}</p>
        </a>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-card border border-line bg-raise p-6 transition hover:border-gold/60"
        >
          <h2 className="font-display text-lg font-extrabold">{t('emailTitle')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-dim">{t('emailBody')}</p>
          <p className="mt-3 font-mono text-sm">{CONTACT_EMAIL}</p>
        </a>
      </div>
    </>
  );
}
