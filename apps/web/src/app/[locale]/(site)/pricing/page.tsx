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
  const eur = eurIn(locale);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/pricing`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/pricing`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription', {
      sedan: eur(TARIFFS.fixedRoutes.cityAirport.sedan),
      port: eur(TARIFFS.fixedRoutes.portAirport.sedan),
    }),
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


  /** One row per route, priced across the three vehicle classes. */
  const routes: Array<[string, string, string, string]> = [
    [
      t('rowCityAirport', { km: FIXED.flatZoneRadiusKm }),
      eur(FIXED.cityAirport.sedan),
      eur(FIXED.cityAirport.van6),
      eur(FIXED.cityAirport.van7),
    ],
    [
      t('rowPortAirport'),
      eur(FIXED.portAirport.sedan),
      eur(FIXED.portAirport.van6),
      eur(FIXED.portAirport.van7),
    ],
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
        {/* Four columns on a phone would force a pinch, so the table keeps
            its own scroll container rather than widening the page body. */}
        <div className="overflow-x-auto rounded-card border border-line bg-raise">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <caption className="px-5 pt-5 text-left text-sm text-dim">
              {t('tableCaption')}
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 font-display text-sm font-bold">
                  {t('routeCol')}
                </th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">
                  {t('standardCol')}
                </th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">
                  {t('minivanCol')}
                </th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">
                  {t('vanCol')}
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map(([route, sedan, van6, van7]) => (
                <tr key={route} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-3 text-sm font-normal">
                    {route}
                  </th>
                  <td className="px-5 py-3 text-right font-mono text-sm font-bold text-gold">
                    {sedan}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm">{van6}</td>
                  <td className="px-5 py-3 text-right font-mono text-sm">{van7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        <p className="mt-8 text-sm text-dim">{t('verifyNote')}</p>
      </div>
    </>
  );
}
