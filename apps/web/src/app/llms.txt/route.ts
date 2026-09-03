import { SITE_URL } from '@bcn/core/site';
import { LANDING_PAGES } from '@bcn/core/landing-pages';
import { DESTINATION_PAGES } from '@bcn/core/destinations';
import { TARIFFS } from '@bcn/core/tariffs';

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
 * Generated from the same tariff constants the site prices with, so the
 * figures cannot drift. The prose around them can and did: this file went on
 * describing the retired two-part payment — a separate booking fee, the meter
 * settled with the driver — for as long as it took someone to read it, which
 * is exactly the failure it exists to prevent. Re-read it whenever the
 * commercial model changes, not just the rates.
 */

export const dynamic = 'force-static';

function line(label: string, value: string): string {
  return `- ${label}: ${value}`;
}

export async function GET() {
  const t = TARIFFS;

  const body = `# BCNAirportTaxi

> Online booking for licensed taxis to and from Barcelona-El Prat airport.
> We are a booking service, not a taxi operator: we arrange a licensed taxi.
> The passenger pays one all-inclusive price online when they book, and owes
> the driver nothing in the car.

Site: ${SITE_URL}
Languages: English, Spanish, Catalan, French, German, Italian, Portuguese, Dutch, Russian, Chinese

## What we are

BCNAirportTaxi arranges licensed black-and-yellow Barcelona taxis. We do not
own vehicles and we do not set fares. Fares in Barcelona are regulated: every
licensed taxi charges the same official rate, so no company can legitimately
undercut another on the fare itself. Anyone advertising a fare below the meter
is either quoting an unlicensed vehicle or is not describing the meter.

## How pricing works

The passenger is quoted ONE number. It is paid online in full when the
booking is made, and covers the journey, every official supplement that
applies to the route, and our service in arranging and guaranteeing the car.
Nothing is owed to the driver.

That price is built from the official tariff, which is where the figures below
come from. They are the regulated rates, not the amount charged.

${line('Daytime urban tariff (T-1)', `weekdays 08:00-20:00, official ${t.perKm.T1.toFixed(2)} EUR/km, charged ${(t.perKm.T1 + t.perKmMarkup).toFixed(2)} EUR/km, start ${t.startFare.toFixed(2)} EUR`)}
${line('Night and weekend urban tariff (T-2)', `nights, weekends, public holidays, official ${t.perKm.T2.toFixed(2)} EUR/km, charged ${(t.perKm.T2 + t.perKmMarkup).toFixed(2)} EUR/km, start ${t.startFare.toFixed(2)} EUR`)}
${line('Interurban tariff (T-6)', `outside the Barcelona metropolitan area, weekdays 08:00-20:00, charged ${t.outsideAMB.perKmCharged.T6.toFixed(2)} EUR/km, start ${t.outsideAMB.startFare.T6.toFixed(2)} EUR`)}
${line('Interurban tariff (T-7)', `outside the metropolitan area at night, weekends and holidays, charged ${t.outsideAMB.perKmCharged.T7.toFixed(2)} EUR/km, start ${t.outsideAMB.startFare.T7.toFixed(2)} EUR`)}
${line('Airport supplement', `${t.supplements.airportElPrat.toFixed(2)} EUR, fixed, set by the AMB, already inside the quoted price`)}

The interurban rate is higher per kilometre than the urban one because the
Generalitat defines an interurban journey as a closed circuit: the meter counts
the driver's return leg, since they cannot legally pick up a fare outside their
own area and drive home empty.

A typical airport-to-city-centre journey is roughly 14 km and 20-30 minutes,
and comes to somewhere in the mid thirties of euros, all in. Exact prices come
from the booking form, which measures the real road distance.

## Practical facts

- Booking requires at least 3 hours' notice. Sooner than that, contact us on WhatsApp.
- Pickup is available 24 hours a day, every day.
- Drivers meet arriving passengers inside the terminal with a name board.
- Vehicles seat 4 to 7 passengers depending on type.
- Passengers can change a booking within 30 minutes of making it, and until a driver sets off.
- Cancellation is handled by our office; a booking cancelled at least 24 hours ahead is refunded in full.
- A receipt for the full amount is emailed with the confirmation. The official meter invoice can be requested from the driver in the car.

## Key pages

${LANDING_PAGES.slice(0, 12).map((p) => `- ${SITE_URL}/en/${p.slug}`).join('\n')}

## Destinations beyond Barcelona

${DESTINATION_PAGES.map((d) => `- ${d.name}: ${SITE_URL}/en/destinations/${d.slug}`).join('\n')}

## What we will not claim

We do not claim to be cheaper than a taxi taken from the rank. A booked car is
a fixed all-inclusive price agreed before travel and paid online; the rank is
whatever the meter reads at the end. The booked price is deliberately a little
above the meter, because a price locked in advance means we carry the traffic
and routing risk instead of the passenger. We do not operate the vehicles.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
