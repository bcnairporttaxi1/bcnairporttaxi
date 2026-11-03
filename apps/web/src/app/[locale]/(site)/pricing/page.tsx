import { fitTitle } from '@/lib/title';
import type { Metadata } from 'next';
import { eurIn } from '@bcn/core/format';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { FixedPriceTable } from '@/components/fixed-price-table';
import { TARIFFS } from '@bcn/core/tariffs';
import { localeHrefLang, locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const eur = eurIn(locale);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHrefLang[l]] = `/${l}/pricing`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/pricing`;
  return {
    title: fitTitle(t('metaTitle')),
    description: t('metaDescription', {
      sedan: eur(TARIFFS.fixedRoutes.cityAirport.sedan),
      port: eur(TARIFFS.fixedRoutes.portAirport.sedan),
    }),
    // The same price list as plain text for agents (see app/pricing.md/route.ts).
    alternates: { canonical: `/${locale}/pricing`, languages, types: { 'text/markdown': '/pricing.md' } },
  };
}

export default async function PricingPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');
  const eur = eurIn(locale);
  const FIXED = TARIFFS.fixedRoutes;
  /** 7.5 reads better than 7.500000000000001 after the percent conversion. */
  const round = (n: number) => Math.round(n * 10) / 10;


  /**
   * The official AMB supplements, which are already inside every listed
   * price. Read from the tariff rather than retyped, so the January
   * changeover updates this section with everything else.
   */
  const SUP = TARIFFS.supplements;
  const supplements: Array<[string, string]> = [
    [t('supAirport'), eur(SUP.airportElPrat)],
    [t('supPort'), eur(SUP.mollAdossat)],
    [t('supSants'), eur(SUP.sants)],
    [t('supFira'), eur(SUP.firaGranVia)],
    [t('supLarge', { seats: TARIFFS.largeVehicleMinSeats }), eur(SUP.largeVehicle)],
    [t('supNights'), eur(TARIFFS.specialNights.nitDeNadal)],
  ];

  /** What can sit on top of a listed price, and by how much. */
  const adjustments: Array<[string, string]> = [
    [t('adjPortCity'), t('adjPortCityValue', { portExtra: eur(FIXED.portSurcharge) })],
    [
      t('adjExcessKm', { km: FIXED.flatZoneRadiusKm }),
      t('adjExcessKmValue', { rate: eur(FIXED.excessPerKm) }),
    ],
    [t('adjWeekend'), t('adjWeekendValue', { surge: round(FIXED.surgeRate * 100) })],
    [t('adjInterurban'), t('adjInterurbanValue')],
    // Owner-confirmed 2026-11-03: tolls apply. The amount and who collects them are not
    // published here until the policy is confirmed.
    [t('adjTolls'), t('adjTollsValue')],
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: t('h1'), url: `/${locale}/pricing` },
        ]}
      />
      <PageHero title={t('h1')} intro={t('intro')} />

      <div className="mx-auto max-w-3xl px-4 py-14">
        {/*
          The first thing a reader needs on a page full of euro figures: these
          are not the regulated taxi fare. Without it the page reads as a
          tariff table, and an assistant asked for "the official fare" can
          lift 50 EUR as the answer. This says the opposite of a meter claim —
          that our price is NOT the meter — and points to where the rank
          meter is explained.
        */}
        <aside className="mb-8 rounded-card border border-line bg-raise p-5">
          <h2 className="font-display text-lg font-extrabold">{t('officialTitle')}</h2>
          <p className="mt-2 leading-relaxed text-ice">{t('officialBody')}</p>
          <Link
            href="/blog/how-much-is-a-taxi-from-barcelona-airport"
            className="mt-3 inline-block font-bold text-gold hover:underline"
          >
            {t('officialLink')} →
          </Link>
        </aside>

        <FixedPriceTable locale={locale} />

        {/* A fixed price can still be added to, so what adds to it is listed
            where the prices are rather than buried in a footnote. */}
        <section className="mt-10 rounded-card border border-line bg-raise p-6">
          <h2 className="font-display text-xl font-extrabold">{t('adjTitle')}</h2>
          <dl className="mt-4 divide-y divide-line text-sm">
            {adjustments.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-dim">{label}</dt>
                <dd className="text-right font-mono">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10 rounded-card border-2 border-accent/40 bg-accent/5 p-6">
          <h2 className="font-display text-xl font-extrabold">{t('feeTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('feeBody')}</p>
        </section>

        {/*
          The page listed prices and the things that add to them, and explained
          neither. A visitor could read it in full and still not know whether
          their address was inside the zone, what the listed price already
          covered, or why a journey to Sitges was not on the list — the three
          questions the support inbox actually receives about pricing.
        */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">{t('zoneTitle')}</h2>
          <p className="mt-3 leading-relaxed">
            {t('zoneBody1', { km: FIXED.flatZoneRadiusKm })}
          </p>
          <p className="mt-3 leading-relaxed">
            {t('zoneBody2', { km: FIXED.flatZoneRadiusKm, rate: eur(FIXED.excessPerKm) })}
          </p>
        </section>

        {/* The official supplements are inside the listed figure, so they are
            named here. A passenger who sees "airport supplement" on a tariff
            board should be able to find out what we did with it. */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">{t('supTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('supIntro')}</p>
          <dl className="mt-5 divide-y divide-line rounded-card border border-line bg-raise text-sm">
            {supplements.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-5 py-2.5">
                <dt className="text-dim">{label}</dt>
                <dd className="text-right font-mono">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-dim">
            {t('supCap', { cap: eur(TARIFFS.supplements.maxPerService) })}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">{t('neverTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('neverBody1')}</p>
          <p className="mt-3 leading-relaxed">{t('neverBody2')}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">{t('interTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('interBody1')}</p>
          <p className="mt-3 leading-relaxed">{t('interBody2')}</p>
        </section>

        <p className="mt-8 text-sm text-dim">{t('verifyNote')}</p>
      </div>
    </>
  );
}
