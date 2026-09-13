import { getTranslations } from 'next-intl/server';
import { Rise } from '@/components/motion';
import { LiveRoute } from '@/components/live-route';
import { DEMO_ROUTE } from '@/components/live-route-data';
import { calculateQuote } from '@bcn/core/pricing';
import { eurIn } from '@bcn/core/format';

/**
 * How booking works, played on a real map.
 *
 * The three steps are moments on one journey — a price is measured along a
 * route, a car is confirmed and drives it, a driver waits at its end — so
 * the section shows that journey once, on Esri's dark map of Barcelona,
 * along the road OSRM actually drives from Terminal 1 to Plaça de
 * Catalunya. The list beside it is the same sequence in words; each
 * numeral lights as its moment plays.
 *
 * The price is the pricing engine's figure for that exact road distance
 * and duration, computed here at build, so it moves with the tariff table
 * rather than drifting from it in a drawing.
 */
export async function BookingJourney({ locale }: { locale: string }) {
  const t = await getTranslations('home');
  const tw = await getTranslations('howItWorks');
  const steps = ['one', 'two', 'three'] as const;

  const quote = calculateQuote({
    pickup: DEMO_ROUTE.from,
    dropoff: DEMO_ROUTE.to,
    roadKm: DEMO_ROUTE.roadKm,
    durationMin: DEMO_ROUTE.durationMin,
    pickupAt: new Date('2026-06-10T12:00:00+02:00'),
  });
  const price = eurIn(locale)(quote.total);
  const labels = {
    reserved: tw('live.reserved'),
    arrived: tw('live.arrived'),
    live: tw('live.live'),
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
      {/* Three grid children rather than two columns, so that on a phone the
          stage sits between the heading and the list — where it is on screen
          when the sequence starts — and on a wide screen it spans both rows
          beside them. */}
      <Rise className="journey grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-8">
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.howTitle')}
            <span className="editorial text-[1.08em]">{t('sections.howLede')}</span>
          </h2>
          <p className="mt-3 max-w-md text-dim">{t('sections.howIntro')}</p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <LiveRoute price={price} labels={labels} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ol className="journey-steps">
            {steps.map((step, i) => (
              <li key={step} className="journey-step" style={{ '--i': i } as React.CSSProperties}>
                <span className="journey-num font-display" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-ice">
                    {tw(`steps.${step}.title`)}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-dim">
                    {tw(`steps.${step}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Rise>
    </section>
  );
}
