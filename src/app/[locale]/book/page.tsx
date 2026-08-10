import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { QuoteWidget } from '@/components/quote-widget';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { locales } from '@/i18n/routing';
import { getLandingCopy, getLandingPage } from '@/lib/landing-pages';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const page = getLandingPage('book-online')!;
  const copy = getLandingCopy(page, locale);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/book`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/book`, languages },
  };
}

export default async function BookPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const page = getLandingPage('book-online')!;
  const copy = getLandingCopy(page, locale);
  const t = await getTranslations('quote');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: copy.h1, url: `/${locale}/book` },
        ]}
      />

      <div className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12">
          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-porcelain sm:text-5xl">
            {copy.h1}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-porcelain/75">{copy.intro}</p>
          <div className="mt-10">
            <QuoteWidget />
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-14">
        {copy.sections.map((s) => (
          <section key={s.h2} className="mb-10">
            <h2 className="font-display text-2xl font-extrabold">{s.h2}</h2>
            <p className="mt-3 leading-relaxed">{s.body}</p>
          </section>
        ))}
        <p className="mt-10 rounded-card border border-hairline bg-white p-5 text-sm text-muted">
          {t('disclaimer')}
        </p>
      </article>
    </>
  );
}
