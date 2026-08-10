import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'howItWorks' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/how-it-works`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/how-it-works`, languages },
  };
}

export default async function HowItWorksPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('howItWorks');
  const tq = await getTranslations('quote');
  const tc = await getTranslations('common');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: t('h1'), url: `/${locale}/how-it-works` },
        ]}
      />
      <PageHero title={t('h1')} />

      <div className="mx-auto max-w-3xl px-4 py-14">
        <ol className="space-y-8">
          {(['one', 'two', 'three'] as const).map((step, i) => (
            <li key={step} className="flex gap-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink font-mono text-lg font-bold text-accent">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-extrabold">
                  {t(`steps.${step}.title`)}
                </h2>
                <p className="mt-2 leading-relaxed">{t(`steps.${step}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 rounded-card border border-hairline bg-white p-5 text-sm text-muted">
          {tq('disclaimer')}
        </p>

        <Link
          href="/book"
          className="mt-8 inline-block rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
        >
          {tc('book')}
        </Link>
      </div>
    </>
  );
}
