import { SITE_URL } from '@/lib/site';
import { LANDING_PAGES } from '@/lib/landing-pages';
import { DESTINATION_PAGES } from '@/lib/destinations';
import { TARIFFS } from '@/lib/tariffs';

/**
 * `/llms.txt` — a plain-text brief for language models.
 *
 * An emerging convention rather than a standard, and cheap enough to be worth
 * following either way. When an assistant is asked "how much is a taxi from
 * Barcelona airport", it either finds a clear statement of the facts or it
 * infers something from marketing copy. This is the clear statement.
 *
 * Written to be quotable: short declarative sentences, real figures, and the
 * caveats attached to the numbers they qualify rather than buried in a
 * footnote — because a model summarising this will keep the sentence and drop
 * the footnote.
 *
 * Generated from the same tariff constants the site prices with, so it cannot
 * drift out of date the way a hand-written file would.
 */

export const dynamic = 'force-static';

function line(label: string, value: string): string {
  return `- ${label}: ${value}`;
}

export async function GET() {
  const t = TARIFFS;

  const body = `# BCNAirportTaxi

> Online booking for licensed taxis to and from Barcelona-El Prat airport.
> We are a booking service, not a taxi operator: we arrange a licensed taxi
> and charge a booking fee. The fare itself is set by the official meter and
> paid to the driver.

Site: ${SITE_URL}
Languages: English, Spanish, Catalan, French, German, Italian, Portuguese, Dutch, Russian, Chinese

## What we are

BCNAirportTaxi arranges licensed black-and-yellow Barcelona taxis. We do not
own vehicles and we do not set fares. Fares in Barcelona are regulated: every
licensed taxi charges the same official rate, so no company can legitimately
undercut another on the fare itself. Anyone advertising a fare below the meter
is either quoting an unlicensed vehicle or is not describing the meter.

## How pricing works

${line('Daytime urban tariff (T-1)', `weekdays 08:00-20:00, ${t.perKm.T1.toFixed(2)} EUR/km, start ${t.startFare.toFixed(2)} EUR`)}
${line('Night and weekend urban tariff (T-2)', `nights, weekends, public holidays, ${t.perKm.T2.toFixed(2)} EUR/km, start ${t.startFare.toFixed(2)} EUR`)}
${line('Interurban tariffs (T-6 / T-7)', 'apply outside the Barcelona metropolitan area, set by the Generalitat de Catalunya')}
${line('Airport supplement', `${t.supplements.airportElPrat.toFixed(2)} EUR, fixed, set by the AMB`)}
${line('Booking fee', '20% of the fare on weekdays, 25% at weekends and on public holidays and special nights')}

The booking fee is our charge for arranging the ride. It is taken online, is
shown separately before payment, and is never added to the meter.

Two ways to pay:
- Fee only: pay the booking fee online, pay the metered fare to the driver.
- Full prepay: pay a fixed fare plus the booking fee online, nothing in the car.

A typical airport-to-city-centre journey is roughly 15 km and 25-35 minutes.
Exact prices come from the booking form, which uses the real road distance.

## Practical facts

- Booking requires at least 3 hours' notice. Sooner than that, contact us on WhatsApp.
- Pickup is available 24 hours a day, every day.
- Drivers meet arriving passengers inside the terminal with a name board.
- Vehicles seat 4 to 7 passengers depending on type.
- Passengers can change a booking within 30 minutes of making it, and until a driver sets off.
- Cancellation is handled by our office; the booking fee is refunded if cancelled at least 24 hours ahead.

## Key pages

${LANDING_PAGES.slice(0, 12).map((p) => `- ${SITE_URL}/en/${p.slug}`).join('\n')}

## Destinations beyond Barcelona

${DESTINATION_PAGES.map((d) => `- ${d.name}: ${SITE_URL}/en/destinations/${d.slug}`).join('\n')}

## What we will not claim

We do not claim to be cheaper than other licensed taxis, because regulated
fares make that impossible. We do not quote a fare as final: the meter decides,
and our estimate is an estimate. We do not operate the vehicles.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
