import { fitTitle } from '@/lib/title';
import type { Metadata } from 'next';
import { eurIn } from '@bcn/core/format';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
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

        {/* Four columns on a phone would force a pinch, so the table keeps
            its own scroll container rather than widening the page body. */}
        {/*
          The price has to be visible on a phone, and it was not.
          The table sat at min-width 520px inside a 341px scroll container on
          a 375px screen, so the first price column was already clipped
          ("Standa...") and the six- and seven-seat columns were off-screen
          with nothing to indicate they existed. A pricing page where a
          visitor cannot see a price is worse than a thin one.

          Three changes, all mobile-only: the route column sticks so the row
          keeps its label while the prices scroll past it, the minimum width
          drops so the first price is on screen unscrolled, and a gradient on
          the right edge shows there is more to reach. The route labels are
          what pushed the table wide, so they are allowed to wrap.
        */}
        <div className="relative">
          <div className="overflow-x-auto rounded-card border border-line bg-raise">
            <table className="w-full min-w-[420px] border-collapse text-left sm:min-w-[520px] [&_tbody_th]:sticky [&_tbody_th]:left-0 [&_tbody_th]:bg-raise [&_thead_th:first-child]:sticky [&_thead_th:first-child]:left-0 [&_thead_th:first-child]:bg-raise">
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
          {/* Shows there is more table to the right. Hidden once the whole
              table fits, and hidden from assistive tech, which gets the
              scroll container instead. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-card bg-gradient-to-l from-raise to-transparent sm:hidden"
          />
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
