/**
 * Transfer destinations outside the AMB zone.
 *
 * IMPORTANT — these routes cannot be priced by the meter engine. AMB tariffs
 * cover the metropolitan area only; anything beyond it falls under the
 * Generalitat's interurban tariff, which is not configured
 * (`TARIFFS.outsideAMB.enabled === false`). Until those rates are supplied,
 * every destination here is quote-on-request via WhatsApp rather than showing
 * a price we cannot stand behind.
 *
 * `hasPage: true` generates a detail page at /destinations/<slug>. The rest
 * render as request-a-quote cards, so no card is ever a dead link.
 */

export interface Destination {
  slug: string;
  name: string;
  /** Only true entries get their own page. */
  hasPage: boolean;
  featured?: boolean;
  /** Approximate one-way road distance from Barcelona, km. */
  km?: number;
  /** Approximate driving time, minutes. */
  minutes?: number;
  /** Card summary. */
  blurb: string;
  /** Long-form page copy. Required when hasPage is true. */
  body?: string[];
}

export interface DestinationGroup {
  slug: string;
  title: string;
  intro: string;
  destinations: Destination[];
}

export const DESTINATION_GROUPS: DestinationGroup[] = [
  {
    slug: 'costa-brava',
    title: 'Costa Brava transfers',
    intro:
      'Private transfers from Barcelona to Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués and the rest of the Costa Brava.',
    destinations: [
      {
        slug: 'costa-brava',
        name: 'Barcelona Airport to Costa Brava',
        hasPage: true,
        featured: true,
        km: 95,
        minutes: 80,
        blurb:
          'Door-to-door transfers from El Prat to the Costa Brava resorts, with luggage space for the whole family.',
        body: [
          'The Costa Brava starts roughly an hour north of Barcelona and runs up to the French border, and almost every visitor arrives through El Prat. The coast road is straightforward, but it is a genuine journey rather than a city hop: allow around 80 minutes to Lloret de Mar and closer to two hours for the northern coves.',
          'A private transfer matters more here than on a city run. There is no direct train to most of the resort towns, the coach services stop only at the larger ones, and the last leg to a hillside hotel or a villa outside town is rarely walkable with cases. Your driver takes you to the door.',
          'We collect from arrivals with a name sign and track your flight, so a delayed landing does not cost you the car. For groups the Mercedes Vito or V-Class carries six or seven passengers with matching luggage, which is usually cheaper than two separate cars and considerably simpler.',
          'Because the Costa Brava lies outside the Barcelona metropolitan area, the journey is not metered on the AMB tariff. We quote a fixed price for the route before you commit, confirmed in writing, so there is nothing to settle at the far end beyond what you agreed.',
        ],
      },
      {
        slug: 'girona',
        name: 'Barcelona to Girona',
        hasPage: true,
        featured: true,
        km: 103,
        minutes: 75,
        blurb:
          'City centre, Girona airport or the old town — a direct run north with no changes.',
        body: [
          'Girona sits about 100 km north of Barcelona and takes a little over an hour by road. It is a common transfer for three quite different reasons: the city itself, the airport that carries its name, and the cathedral steps that draw a steady stream of visitors.',
          'The train is fast between the two city centres, but it does not help if you are starting at El Prat with luggage, arriving late, or heading somewhere other than the station. A private car removes the transfers at both ends.',
          'Girona airport is a further 15 minutes beyond the city and serves a large share of the Costa Brava charter traffic. If you are connecting between El Prat and Girona airport, tell us both flight numbers and we will build in a sensible margin.',
          'This route runs outside the AMB metered zone, so we confirm a fixed price up front. Vehicles range from a standard four-seat taxi to the seven-seat V-Class for families and groups.',
        ],
      },
      {
        slug: 'lloret-de-mar',
        name: 'Barcelona to Lloret de Mar',
        hasPage: true,
        km: 85,
        minutes: 70,
        blurb: 'The Costa Brava’s busiest resort, about 70 minutes from El Prat.',
        body: [
          'Lloret de Mar is the best-known resort on the Costa Brava and one of our most frequent long-distance runs. The drive is around 70 minutes from El Prat outside peak periods.',
          'Coaches serve Lloret in season but run to a timetable and stop at a central point, which is awkward if your hotel sits on one of the hills above the bay. A private transfer ends at the entrance.',
          'For groups arriving together, a six or seven seat minivan usually works out better than multiple cars, and keeps everyone on the same schedule.',
          'The route falls outside the metered AMB zone, so the price is fixed and agreed in advance rather than run on the taxi meter.',
        ],
      },
      {
        slug: 'tossa-de-mar',
        name: 'Barcelona to Tossa de Mar',
        hasPage: true,
        km: 90,
        minutes: 80,
        blurb: 'Walled old town and quieter beaches, around 80 minutes away.',
        body: [
          'Tossa de Mar is the quieter neighbour to Lloret, known for its walled old town above the beach. It is around 80 minutes from Barcelona airport.',
          'The final approach along the coast road is scenic but slow, and public transport involves at least one change. Most guests find a direct car worth it after a flight.',
          'The old town itself is largely pedestrian, so we agree the nearest accessible drop-off with you when you book rather than improvising on arrival.',
          'Pricing is fixed for this route and confirmed before travel, as it sits beyond the AMB metered area.',
        ],
      },
      {
        slug: 'blanes',
        name: 'Barcelona to Blanes',
        hasPage: true,
        km: 75,
        minutes: 65,
        blurb: 'The southern gateway to the Costa Brava, roughly an hour out.',
        body: [
          'Blanes marks the southern end of the Costa Brava and is the closest of the main resorts to Barcelona, at roughly an hour by road.',
          'It has a train station, which makes it one of the more accessible Costa Brava towns, but the connection from the airport still involves changes and a walk at the far end.',
          'We collect from arrivals or from any Barcelona address and drive straight through, which suits families and anyone travelling with beach gear.',
          'As with the rest of the coast, the fare is a fixed quoted price rather than a meter reading.',
        ],
      },
      {
        slug: 'cadaques',
        name: 'Barcelona to Cadaqués',
        hasPage: true,
        km: 170,
        minutes: 145,
        blurb: 'The far north, past Cap de Creus — around two and a half hours.',
        body: [
          'Cadaqués is the most remote of the Costa Brava villages, reached over the Cap de Creus headland on a winding mountain road. Expect around two and a half hours from Barcelona.',
          'There is no rail connection at all, and the bus service is limited and slow. For most visitors a private transfer is the only practical way to arrive at a sensible hour.',
          'The road over the pass is narrow and best driven by someone who knows it, particularly after dark. Our drivers do this route regularly.',
          'Given the distance, this is always a fixed-price journey agreed in advance. Ask us on WhatsApp for a quote with your dates.',
        ],
      },
      { slug: 'roses', name: 'Barcelona to Roses', hasPage: false, blurb: 'Bay of Roses resort town in the far north of the Costa Brava.' },
      { slug: 'empuriabrava', name: 'Barcelona to Empuriabrava', hasPage: false, blurb: 'The canal town on the Gulf of Roses.' },
      { slug: 'begur', name: 'Barcelona to Begur', hasPage: false, blurb: 'Hilltop village and the coves below it.' },
      { slug: 'calella-de-palafrugell', name: 'Barcelona to Calella de Palafrugell', hasPage: false, blurb: 'Whitewashed fishing village on the central Costa Brava.' },
    ],
  },
  {
    slug: 'south-and-theme-parks',
    title: 'South of Barcelona & theme parks',
    intro:
      'Taxi and minivan transfers to Sitges, Tarragona, Salou, PortAventura, Cambrils and the coast south of the city.',
    destinations: [
      {
        slug: 'sitges',
        name: 'Barcelona to Sitges',
        hasPage: true,
        featured: true,
        km: 38,
        minutes: 35,
        blurb: 'Barcelona’s closest resort town — about 25 minutes from El Prat.',
        body: [
          'Sitges is the shortest of our long-distance runs, and the one most often booked. From El Prat it is around 25 minutes; from central Barcelona closer to 40.',
          'The town is a fixture for beach weekends, conference guests staying outside the city, and the festival calendar. It is well served by train from Barcelona Sants, but not from the airport, which is why most arrivals prefer a direct car.',
          'The old centre has narrow one-way streets and restricted access in parts. We agree a practical drop-off point when you book so nothing has to be sorted out on the doorstep.',
          'Sitges sits just outside the AMB metered zone, so the journey is quoted as a fixed price rather than run on the meter. Ask on WhatsApp and we will confirm before you travel.',
        ],
      },
      {
        slug: 'tarragona',
        name: 'Barcelona to Tarragona',
        hasPage: true,
        featured: true,
        km: 100,
        minutes: 75,
        blurb: 'Roman city and cruise port, around 75 minutes south.',
        body: [
          'Tarragona lies about 100 km south of Barcelona, roughly 75 minutes by motorway. It draws visitors for the Roman amphitheatre and old town, and increasingly as a cruise port in its own right.',
          'Cruise transfers are the most time-sensitive version of this trip. If you are joining a ship we build in a margin and confirm the terminal, because a missed departure is not recoverable.',
          'The city is also the gateway to the Costa Dorada beaches, and many guests combine the two — we can drop at a hotel along the coast on the way through.',
          'This route is beyond the AMB metered area, so we quote a fixed price in advance rather than running the meter.',
        ],
      },
      { slug: 'salou', name: 'Barcelona to Salou', hasPage: false, blurb: 'Costa Dorada resort next to PortAventura.' },
      { slug: 'portaventura', name: 'Barcelona to PortAventura', hasPage: false, blurb: 'Direct transfer to the theme park gates.' },
      { slug: 'cambrils', name: 'Barcelona to Cambrils', hasPage: false, blurb: 'Quieter Costa Dorada town south of Salou.' },
      { slug: 'peniscola', name: 'Barcelona to Peñíscola', hasPage: false, blurb: 'Castle town on the Costa del Azahar.' },
      { slug: 'reus', name: 'Barcelona to Reus', hasPage: false, blurb: 'Reus airport and city, inland from Salou.' },
    ],
  },
  {
    slug: 'mountains-and-ski',
    title: 'Mountains, nature & ski transfers',
    intro:
      'Private drivers for Montserrat, Andorra, the ski resorts and mountain villages, including flexible day trips.',
    destinations: [
      {
        slug: 'montserrat',
        name: 'Barcelona to Montserrat',
        hasPage: true,
        featured: true,
        km: 60,
        minutes: 60,
        blurb: 'The mountain monastery, about an hour from the city.',
        body: [
          'Montserrat is the most popular day trip from Barcelona: a Benedictine monastery set in a serrated rock massif about an hour inland.',
          'Reaching it by public transport means a train followed by either a rack railway or a cable car, each with its own queue. A car goes to the monastery car park directly, which matters if you want to be there before the coaches arrive.',
          'Most guests book it as a return with waiting time — typically three to four hours at the site — so the same driver takes them back. Tell us how long you want and we will price it as one journey.',
          'Montserrat is outside the metered zone, so the trip is quoted as a fixed price including waiting rather than run on the meter.',
        ],
      },
      {
        slug: 'andorra',
        name: 'Barcelona to Andorra',
        hasPage: true,
        featured: true,
        km: 200,
        minutes: 180,
        blurb: 'Three hours into the Pyrenees, for skiing or shopping.',
        body: [
          'Andorra is around three hours from Barcelona, climbing steadily into the Pyrenees. It is a regular winter run for the ski resorts and a year-round one for the duty-free shopping.',
          'The route crosses an international border. Bring passports or national ID cards for everyone travelling — checks are usually quick but they do happen, and being turned back is an expensive way to learn that.',
          'In winter the final climb can require chains or winter tyres. We assign a vehicle equipped for the conditions rather than sending a standard city car up a mountain in February.',
          'For ski groups the V-Class carries seven with luggage, though skis and boards need declaring when you book so we allocate the right vehicle. This is a fixed-price route, quoted before travel.',
        ],
      },
      { slug: 'la-molina', name: 'Barcelona to La Molina', hasPage: false, blurb: 'Pyrenean ski resort, around two hours out.' },
      { slug: 'vall-de-nuria', name: 'Barcelona to Vall de Núria', hasPage: false, blurb: 'Mountain sanctuary reached by rack railway.' },
      { slug: 'baqueira-beret', name: 'Barcelona to Baqueira Beret', hasPage: false, blurb: 'The largest ski area in the Spanish Pyrenees.' },
    ],
  },
  {
    slug: 'long-distance',
    title: 'Long distance transfers',
    intro:
      'Direct private taxi and minivan transfers from Barcelona to major Spanish cities.',
    destinations: [
      {
        slug: 'valencia',
        name: 'Barcelona to Valencia',
        hasPage: true,
        featured: true,
        km: 350,
        minutes: 210,
        blurb: 'Three and a half hours down the coast, door to door.',
        body: [
          'Valencia is about 350 km south of Barcelona, roughly three and a half hours by motorway. It is a long transfer, and for most travellers the AVE train is the sensible choice.',
          'A private car earns its place in specific situations: a group of six or seven where individual train tickets add up, an arrival too late for the last train, luggage or equipment that does not travel well by rail, or a door-to-door requirement at both ends.',
          'We drive it direct with a comfort stop, and can drop at any address in the city, at the port for a cruise, or at Valencia airport.',
          'This is always a fixed-price journey quoted in advance. Message us with your dates and party size and we will confirm.',
        ],
      },
      {
        slug: 'la-roca-village',
        name: 'La Roca Village',
        hasPage: true,
        featured: true,
        km: 40,
        minutes: 40,
        blurb: 'The outlet shopping village, about 40 minutes north.',
        body: [
          'La Roca Village is a designer outlet about 40 minutes north of Barcelona, and one of the most requested non-airport destinations we run.',
          'The shuttle bus from the city works well enough but ties you to a fixed return time, which is the wrong constraint on a shopping trip. A private car waits for you.',
          'Most bookings are a return with waiting time — commonly three to five hours. We price it as a single journey including the wait, and there is space for the bags on the way back.',
          'The village is outside the AMB metered zone, so the price is fixed and confirmed before you travel.',
        ],
      },
      { slug: 'alicante', name: 'Barcelona to Alicante', hasPage: false, blurb: 'Costa Blanca, around five hours south.' },
      { slug: 'zaragoza', name: 'Barcelona to Zaragoza', hasPage: false, blurb: 'Aragón’s capital, roughly three hours inland.' },
      { slug: 'madrid', name: 'Barcelona to Madrid', hasPage: false, blurb: 'Long-distance run to the capital.' },
      { slug: 'marbella', name: 'Barcelona to Marbella', hasPage: false, blurb: 'Costa del Sol, a full-day journey.' },
      { slug: 'malaga', name: 'Barcelona to Málaga', hasPage: false, blurb: 'Andalusian coast, long-distance transfer.' },
    ],
  },
];

export const ALL_DESTINATIONS: Destination[] = DESTINATION_GROUPS.flatMap(
  (g) => g.destinations,
);

export const DESTINATION_PAGES = ALL_DESTINATIONS.filter((d) => d.hasPage);

export const FEATURED_DESTINATIONS = ALL_DESTINATIONS.filter((d) => d.featured);

export function getDestination(slug: string): Destination | undefined {
  return ALL_DESTINATIONS.find((d) => d.slug === slug && d.hasPage);
}

export function groupOf(slug: string): DestinationGroup | undefined {
  return DESTINATION_GROUPS.find((g) =>
    g.destinations.some((d) => d.slug === slug),
  );
}
