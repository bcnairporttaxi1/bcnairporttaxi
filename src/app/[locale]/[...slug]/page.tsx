import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { QuoteWidget } from '@/components/quote-widget';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/json-ld';
import {
  LANDING_PAGES,
  getLandingCopy,
  getLandingPage,
} from '@/lib/landing-pages';
import { locales } from '@/i18n/routing';

/**
 * Catch-all so nested keyword routes such as `/neighborhoods/eixample` resolve
 * alongside flat ones such as `/el-prat-airport-taxi`. Static segments like
 * `/fleet` still win over this route.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    LANDING_PAGES.map((p) => ({ locale, slug: p.slug.split('/') })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const path = slug.join('/');
  const page = getLandingPage(path);
  if (!page) return {};

  const copy = getLandingCopy(page, locale);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/${path}`;

  return {
    // Absolute so the layout's "| BCNAirportTaxi" suffix does not push these
    // past the length Google will display.
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: `/${locale}/${path}`, languages },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `/${locale}/${path}`,
    },
  };
}

export default async function LandingPageRoute(props: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const path = slug.join('/');
  const page = getLandingPage(path);
  if (!page) notFound();

  const copy = getLandingCopy(page, locale);
  const t = await getTranslations('common');

  const isNested = slug.length > 1;

  return (
    <>
      <ServiceJsonLd
        name={copy.title}
        description={copy.description}
        url={`/${locale}/${path}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          ...(isNested
            ? [{ name: 'Neighbourhoods', url: `/${locale}/${slug[0]}` }]
            : []),
          { name: copy.h1, url: `/${locale}/${path}` },
        ]}
      />

      <div className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-porcelain/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent">
                  {t('backHome')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-porcelain/80">
                {copy.h1}
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-porcelain sm:text-5xl">
            {copy.h1}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-porcelain/75">{copy.intro}</p>

          <div className="mt-10">
            <QuoteWidget
              presetPickup={page.preset?.pickup}
              presetDropoff={page.preset?.dropoff}
            />
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-16">
        {copy.sections.map((s) => (
          <section key={s.h2} className="mb-10">
            <h2 className="font-display text-2xl font-extrabold">{s.h2}</h2>
            <p className="mt-3 leading-relaxed text-slate-body">{s.body}</p>
          </section>
        ))}
      </article>

      <section className="border-t border-hairline bg-white py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-xl font-extrabold">{t('relatedTransfers')}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.related.map((rel) => {
              const target = getLandingPage(rel);
              if (!target) return null;
              return (
                <li key={rel}>
                  <Link
                    href={`/${rel}`}
                    className="block rounded-xl border border-hairline p-4 transition hover:border-ink"
                  >
                    <span className="font-display font-bold">
                      {getLandingCopy(target, locale).h1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
