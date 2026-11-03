import { getTranslations } from 'next-intl/server';
import { eurIn } from '@bcn/core/format';
import { TARIFFS } from '@bcn/core/tariffs';

/**
 * The fixed price list as a real table in the server HTML.
 *
 * The dedicated price page promised "the whole list" and rendered no euro
 * amount at all: the figures lived only in the quote widget and in JSON-LD,
 * so the page that exists to answer "precio taxi aeropuerto barcelona" had no
 * price a crawler, a snippet or an assistant could read. Pricing and the
 * route landing pages that draw price queries share this one table, read
 * from the tariff so it cannot drift from checkout.
 *
 * A phone cannot fit four columns, so the table keeps its own scroll
 * container, sticks the route column and fades the right edge.
 */
export async function FixedPriceTable({ locale, heading }: { locale: string; heading?: string }) {
  const t = await getTranslations('pricing');
  const eur = eurIn(locale);
  const FIXED = TARIFFS.fixedRoutes;

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

  return (
    <div>
      {heading && <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight">{heading}</h2>}
      <div className="relative">
        <div className="overflow-x-auto rounded-card border border-line bg-raise">
          <table className="w-full min-w-[420px] border-collapse text-left sm:min-w-[520px] [&_tbody_th]:sticky [&_tbody_th]:left-0 [&_tbody_th]:bg-raise [&_thead_th:first-child]:sticky [&_thead_th:first-child]:left-0 [&_thead_th:first-child]:bg-raise">
            <caption className="px-5 pt-5 text-left text-sm text-dim">{t('tableCaption')}</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 font-display text-sm font-bold">{t('routeCol')}</th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">{t('standardCol')}</th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">{t('minivanCol')}</th>
                <th scope="col" className="px-5 py-3 text-right font-display text-sm font-bold">{t('vanCol')}</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(([route, sedan, van6, van7]) => (
                <tr key={route} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-3 text-sm font-normal">{route}</th>
                  <td className="px-5 py-3 text-right font-mono text-sm font-bold text-gold">{sedan}</td>
                  <td className="px-5 py-3 text-right font-mono text-sm">{van6}</td>
                  <td className="px-5 py-3 text-right font-mono text-sm">{van7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-card bg-gradient-to-l from-raise to-transparent sm:hidden"
        />
      </div>
    </div>
  );
}
