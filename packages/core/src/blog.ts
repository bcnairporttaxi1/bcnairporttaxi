/**
 * Blog posts.
 *
 * Long-form supporting content that targets informational queries the landing
 * pages do not cover, and gives the keyword pages somewhere to link from.
 * Body paragraphs are plain strings rendered as <p>; keep them readable.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** ISO date, used for `datePublished` and sitemap lastmod. */
  published: string;
  readingMinutes: number;
  excerpt: string;
  sections: Array<{ h2: string; body: string[] }>;
  /** Landing-page slugs to link to from the post. */
  related: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-much-is-a-taxi-from-barcelona-airport',
    title: 'How Much Is a Taxi from Barcelona Airport?',
    description:
      'A straight answer on Barcelona airport taxi costs: how the AMB meter works, what the supplements add, and realistic fares to the main districts.',
    h1: 'How much is a taxi from Barcelona airport?',
    published: '2026-08-10',
    readingMinutes: 6,
    excerpt:
      'Barcelona taxi fares are regulated, so the real question is not who is cheapest but how the meter adds up. Here is the arithmetic, plus realistic figures for the routes people actually take.',
    sections: [
      {
        h2: 'The short answer',
        body: [
          'For a typical journey from El Prat into central Barcelona — Eixample, the Gothic Quarter, El Born — expect somewhere in the region of €30 to €40 on the meter during the day, and more at night or at weekends when the higher tariff applies.',
          'That figure is not a quote from us. It is what the official meter produces for a journey of roughly 13 to 16 kilometres once the fixed airport supplement is added. Every licensed taxi in Barcelona runs the same meter at the same rates.',
        ],
      },
      {
        h2: 'How the meter builds the fare',
        body: [
          'Three things combine: a fixed start fare charged the moment the meter runs, a per-kilometre rate, and any applicable supplements.',
          'The per-kilometre rate depends on when you travel. The daytime rate applies Monday to Friday between 08:00 and 20:00. Outside that — evenings, nights, all of Saturday and Sunday, and public holidays — the higher rate applies. The difference is around 20 to 25 per cent, so an identical journey genuinely costs more at 22:00 than at 14:00.',
          'On top of that sits the El Prat airport supplement, a fixed amount added to any journey starting or ending at the airport. Sants station, the Fira Gran Via exhibition centre and the Moll Adossat cruise terminal carry their own smaller supplements, and there is a cap on the total supplements chargeable on a single service.',
        ],
      },
      {
        h2: 'The airport minimum fare',
        body: [
          'Journeys that start at El Prat have a minimum fare. If the meter would otherwise produce less than that figure, the minimum is what you pay.',
          'In practice this only affects very short hops — to El Prat town, or an airport hotel. Any journey into Barcelona proper comfortably exceeds it, so the minimum never comes into play.',
        ],
      },
      {
        h2: 'What about the cruise port?',
        body: [
          'The run between El Prat and the Moll Adossat cruise terminal is different. It has an official fixed closed price rather than running on the meter, which removes the traffic risk on a journey people usually make against a boarding deadline.',
          'If you enter the cruise terminal as your destination when getting a price, the estimate switches to that fixed figure automatically.',
        ],
      },
      {
        h2: 'Is booking ahead more expensive?',
        body: [
          'The regulated tariff is identical whether you book ahead or join the rank — it has to be, because the rate is set by the AMB.',
          'What differs is that a booked car is a fixed all-inclusive price, agreed before you travel and paid online. That price covers the journey, every official supplement and our service in reserving the car, assigning a driver and supporting the trip. At the rank you take whatever the meter reads at the end.',
          'You can also choose to prepay the entire journey at a fixed price. That price sits slightly above the expected meter reading, because fixing it in advance means we absorb the traffic risk rather than you. In exchange nothing at all is owed in the taxi.',
        ],
      },
    ],
    related: ['barcelona-airport-taxi-price', 'airport-to-city', 'el-prat-airport-taxi'],
  },
  {
    slug: 'taxi-or-aerobus-from-barcelona-airport',
    title: 'Taxi or Aerobús from Barcelona Airport?',
    description:
      'Comparing the taxi, the Aerobús and the metro from Barcelona El Prat: cost per group, real door-to-door time, and when each one genuinely wins.',
    h1: 'Taxi or Aerobús from Barcelona airport?',
    published: '2026-08-10',
    readingMinutes: 5,
    excerpt:
      'The Aerobús is cheaper per person and the metro is cheaper still. Neither is automatically the better choice once you count luggage, group size and the walk at the far end.',
    sections: [
      {
        h2: 'The honest comparison',
        body: [
          'Travelling alone with hand luggage, the Aerobús is hard to argue with. It leaves both terminals frequently, takes about 35 minutes to Plaça de Catalunya, and costs a fraction of a taxi fare.',
          'The calculation changes with people. The Aerobús charges per head; a taxi charges per car. By three passengers the gap has narrowed considerably, and by four it has often closed entirely — before you count the convenience of being driven to your actual door.',
        ],
      },
      {
        h2: 'Door-to-door time, not headline time',
        body: [
          'The Aerobús journey is roughly 35 minutes, but that is stop to stop. Add the walk from arrivals to the bus bay, the wait, and then the leg from Plaça de Catalunya or Sants to wherever you are actually staying — with luggage, possibly on the metro or on foot over cobbles.',
          'A taxi from El Prat to central Barcelona is 25 to 35 minutes, and it ends at the address you gave. For most people the real difference in total door-to-door time is larger than the timetable suggests.',
        ],
      },
      {
        h2: 'When the taxi clearly wins',
        body: [
          'Arriving after midnight, when the Aerobús has stopped and the metro is closing. Travelling with children, a pushchair, or more than one large suitcase each. Staying in the Gothic Quarter or Gràcia, where the final leg from a bus stop is genuinely awkward. Catching an early flight that needs a 04:30 pickup.',
        ],
      },
      {
        h2: 'When it does not',
        body: [
          'One or two people, light luggage, staying near Plaça de Catalunya or on a direct metro line, travelling in the middle of the day. In that situation the Aerobús is the sensible choice and we would say so.',
        ],
      },
    ],
    related: ['airport-to-city', 'barcelona-airport-taxi-price', 'private-transfer'],
  },
  {
    slug: 'barcelona-airport-terminals-t1-t2-guide',
    title: 'Barcelona Airport Terminals: T1 and T2 Explained',
    description:
      'Which terminal your airline uses at Barcelona El Prat, how to move between T1 and T2, and where taxis actually pick up at each.',
    h1: 'Barcelona airport terminals: T1 and T2',
    published: '2026-08-10',
    readingMinutes: 4,
    excerpt:
      'Getting the terminal wrong costs you a shuttle ride and twenty minutes. Here is which is which, and where the taxis are at each.',
    sections: [
      {
        h2: 'Two terminals, several kilometres apart',
        body: [
          'El Prat has two passenger terminals. They are not walkable from one another — a free shuttle bus connects them and takes around 10 to 15 minutes, more at busy times.',
          'T1 is the newer and larger of the two, handling most long-haul traffic and the bulk of Vueling and the legacy carriers. T2 is older, split into blocks A, B and C, and serves a number of low-cost airlines including Ryanair.',
        ],
      },
      {
        h2: 'Check your terminal before you travel',
        body: [
          'Airlines do move between terminals, and codeshare bookings can be misleading. The terminal on your boarding pass is the one that counts.',
          'For departures this matters more than most people realise: being dropped at the wrong terminal means an unplanned shuttle ride with luggage against a check-in deadline.',
        ],
      },
      {
        h2: 'Where taxis pick up',
        body: [
          'Both terminals have official ranks immediately outside arrivals, clearly signed and supervised. T2 has ranks serving each block.',
          'For a pre-booked transfer the arrangement is different: your driver waits inside the arrivals hall with a name sign rather than at the rank, and the exact meeting point is confirmed by email before you travel.',
        ],
      },
      {
        h2: 'Fares between terminals',
        body: [
          'T1 sits slightly further from the city than T2 — a couple of kilometres. On a 15-kilometre run into Barcelona that difference is small, and the airport supplement is identical from either.',
        ],
      },
    ],
    related: ['el-prat-airport-taxi', 'airport-to-city', 'city-to-airport'],
  },
];

/**
 * Cover artwork per post.
 *
 * Kept as a slug->motif map rather than a field on BlogPost so the content
 * stays free of presentation, and so a post added without a motif still
 * renders a cover instead of a hole in the grid.
 */
export type BlogMotif = 'meter' | 'compare' | 'terminal';

export const BLOG_COVERS: Record<string, BlogMotif> = {
  'how-much-is-a-taxi-from-barcelona-airport': 'meter',
  'taxi-or-aerobus-from-barcelona-airport': 'compare',
  'barcelona-airport-terminals-t1-t2-guide': 'terminal',
};

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);
