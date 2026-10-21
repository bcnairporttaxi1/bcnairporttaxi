import type { Metadata } from 'next';
import { eurIn } from '@bcn/core/format';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { TARIFFS } from '@bcn/core/tariffs';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/pricing`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/pricing`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/pricing`, languages },
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


  const rows: Array<[string, string]> = [
    ['startFare', eur(TARIFFS.startFare)],
    ['perKmT1', eur(TARIFFS.perKm.T1)],
    ['perKmT2', eur(TARIFFS.perKm.T2)],
    ['waitPerHour', eur(TARIFFS.waitPerHour)],
    ['airportSupplement', eur(TARIFFS.supplements.airportElPrat)],
    ['mollSupplement', eur(TARIFFS.supplements.mollAdossat)],
    ['santsSupplement', eur(TARIFFS.supplements.sants)],
    ['firaSupplement', eur(TARIFFS.supplements.firaGranVia)],
    ['maxSupplement', eur(TARIFFS.supplements.maxPerService)],
    ['minFromAirport', eur(TARIFFS.minFareFromAirport)],
    ['t4Fixed', eur(TARIFFS.t4FixedAirportMollAdossat)],
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
        {/* Wide table scrolls inside its own container, never the page body. */}
        <div className="overflow-x-auto rounded-card border border-line bg-raise">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <caption className="px-5 pt-5 text-left text-sm text-dim">
              {t('tableCaption')}
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 font-display text-sm font-bold">
                  {t('concept')}
                </th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">
                  {t('amount')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([key, value]) => (
                <tr key={key} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-3 text-sm font-normal">
                    {t(`rows.${key}` as never)}
                  </th>
                  <td className="px-5 py-3 text-right font-mono text-sm">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* The table above is the official meter. A transfer is not priced
            off it any more, so the list that does price it says so here,
            before the page explains what the figure includes. */}
        <section className="mt-10 rounded-card border-2 border-gold/40 bg-gold/5 p-6">
          <h2 className="font-display text-xl font-extrabold">{t('fixedTitle')}</h2>
          <p className="mt-3 leading-relaxed">
            {t('fixedBody', {
              sedan: eur(FIXED.cityAirport.sedan),
              van6: eur(FIXED.cityAirport.van6),
              van7: eur(FIXED.cityAirport.van7),
              port: eur(FIXED.portAirport.sedan),
              portExtra: eur(FIXED.portSurcharge),
              rate: eur(FIXED.excessPerKm),
              km: FIXED.flatZoneRadiusKm,
              surge: round(FIXED.surgeRate * 100),
            })}
          </p>
        </section>

        <section className="mt-10 rounded-card border-2 border-accent/40 bg-accent/5 p-6">
          <h2 className="font-display text-xl font-extrabold">{t('feeTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('feeBody')}</p>
        </section>

        <p className="mt-8 text-sm text-dim">{t('verifyNote')}</p>
      </div>
    </>
  );
}
