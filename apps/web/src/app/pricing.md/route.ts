import { SITE_URL } from '@bcn/core/site';
import { TARIFFS } from '@bcn/core/tariffs';
import { FLEET } from '@bcn/core/fleet';

/**
 * `/pricing.md` — the price list in a form an agent can read.
 *
 * An assistant asked "how much is a taxi from Barcelona airport" has two
 * options: read a number stated plainly, or infer one from marketing copy. It
 * used to infer, and inferred wrongly — this site's own `llms.txt` told
 * models the fare "comes to somewhere in the mid thirties of euros" for
 * months after the fixed price list made it fifty.
 *
 * Fixed prices are the whole product here, so publishing them as text costs
 * nothing and removes the guesswork. The file is generated from the same
 * constants the booking engine prices with, so it cannot drift from what a
 * customer is actually charged — the failure that makes a stale pricing file
 * worse than none at all.
 *
 * A convention rather than a standard, like `llms.txt`: cheap, machine-read,
 * and it also gave `/pricing.md` a real response where the route previously
 * fell through the proxy matcher and returned a 500.
 */

export const dynamic = 'force-static';

const eur = (n: number) => `EUR ${n.toFixed(2)}`;

/** Seats decide the column, so the fleet is grouped the way the list prices it. */
function vehicleClass(seats: number): 'sedan' | 'van6' | 'van7' {
  if (seats <= 4) return 'sedan';
  return seats >= 7 ? 'van7' : 'van6';
}

export function GET(): Response {
  const f = TARIFFS.fixedRoutes;
  const surge = Math.round(f.surgeRate * 1000) / 10;

  const vehicleRows = FLEET.map((v) => {
    const col = vehicleClass(v.seats);
    return `| ${v.name} | ${v.seats} | ${v.bags} | ${eur(f.cityAirport[col])} | ${eur(
      f.portAirport[col],
    )} |`;
  }).join('\n');

  const body = `# Pricing — BCNAirportTaxi

> Barcelona airport and cruise-port taxi transfers at fixed, all-inclusive
> prices. One amount, paid online when booking. Nothing is owed to the driver.

Currency: EUR. Prices are per vehicle, not per passenger.
Last updated: ${new Date().toISOString().slice(0, 10)} (generated from the live price list)

## Fixed transfer prices

| Vehicle | Seats | Bags | Airport <-> Barcelona | Airport <-> cruise port |
|---|---|---|---|---|
${vehicleRows}

The airport price covers anywhere within ${f.flatZoneRadiusKm} km of the
terminal, measured as a straight-line radius. That is the whole of Barcelona
and the towns immediately around it: a short hop to El Prat town and a run
across the city to Park Guell cost the same.

## What can be added

| Addition | Amount | When it applies |
|---|---|---|
| Cruise port transfer | + ${eur(f.portSurcharge)} | The quay is one end and the airport is not |
| Distance beyond the flat zone | + ${eur(f.excessPerKm)} per km | Only the kilometres past ${f.flatZoneRadiusKm} km |
| Weekend and public holidays | + ${surge}% | Saturday and Sunday, and the Catalan public holiday calendar, including Christmas and New Year |

Nothing else is added. The time of day does not change a fixed price: a
pickup at 03:00 costs what the same journey costs at midday.

## What is included

- The fare, and every official supplement that applies to the route
- Our service in arranging and guaranteeing the car
- Flight tracking, so a late landing does not lose the booking
- A receipt for the full amount, emailed with the confirmation

Nothing is collected in the vehicle.

## What is not a fixed price

Journeys that leave the Barcelona metropolitan area are priced per kilometre
on the interurban tariff set by the Generalitat de Catalunya (T-6 on weekdays
between 08:00 and 20:00, T-7 at night, weekends and public holidays). Those
are quoted from the real road distance at booking.

## Booking

- Book: ${SITE_URL}/en/book
- Full price list: ${SITE_URL}/en/pricing
- Context for AI systems: ${SITE_URL}/llms.txt

We are a booking service for licensed Barcelona taxis, not a taxi operator.
We set these prices ourselves; they are not the metered fare.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
