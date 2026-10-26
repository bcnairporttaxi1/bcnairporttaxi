/**
 * Blog posts.
 *
 * Long-form supporting content that targets informational queries the landing
 * pages do not cover, and gives the keyword pages somewhere to link from.
 * Body paragraphs are plain strings rendered as <p>; keep them readable.
 *
 * Two rules, both learned the hard way.
 *
 * First: every figure here is checked against `tariffs.ts` and nowhere else.
 * The first version of the price post opened with "expect EUR 30 to 40 on the
 * meter" and the cover drawing carried a EUR 34.44 readout, written when the
 * site quoted meter estimates. Transfers moved to a fixed list months later,
 * and the post was left asserting a price twenty euros under the one at
 * checkout — on the page that ranks for the question "how much is a taxi from
 * Barcelona airport". A visitor who read it and then saw EUR 50 had been
 * misled by us, not by the meter.
 *
 * Second: length is not the goal, specificity is. These posts are long
 * because the real answers are detailed — the zone is a straight-line radius
 * and that needs explaining, the supplement cap exists and almost nobody
 * reaches it, the interurban meter bills a return leg nobody rides. Padding
 * them to hit a word count would make them worse, and the thing that earns a
 * citation is the sentence only an operator could write.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** ISO date, used for `datePublished` and sitemap lastmod. */
  published: string;
  /**
   * ISO date of the last substantive revision, for `dateModified`.
   *
   * Separate from `published` because they answer different questions, and
   * collapsing them made the pricing correction invisible: the post was
   * rewritten around a new price model while still reporting that nothing had
   * changed since August.
   */
  updated?: string;
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
      'Barcelona airport taxi prices explained: our fixed all-inclusive fares to the city, how the official rank meter differs, and what the supplements add.',
    h1: 'How much is a taxi from Barcelona airport?',
    published: '2026-08-10',
    updated: '2026-10-25',
    readingMinutes: 8,
    excerpt:
      'A booked transfer from El Prat into Barcelona is EUR 50 for a four-seat car, fixed and paid online. The rank outside arrivals works differently, on a regulated meter. Here is what each one actually costs, and why the two numbers are not the same.',
    sections: [
      {
        h2: 'The short answer',
        body: [
          'A booked transfer between El Prat and anywhere in Barcelona is EUR 50 in a four-seat car, EUR 70 in a six-seat Mercedes Vito and EUR 75 in a seven-seat V-Class. That is the whole price. It is quoted before you travel, paid online when you book, and nothing is owed to the driver in the car.',
          'The cruise terminal at Moll Adossat is its own route: EUR 60, EUR 80 and EUR 85 for the same three vehicle sizes.',
          'Those figures do not move with the hour of the day. A pickup at 04:30 for an early flight costs the same as one at two in the afternoon. The only thing that lifts them is a weekend or a public holiday, which adds 7.5 per cent, so a Saturday sedan transfer is EUR 53.75 rather than EUR 50.',
          'If you take a taxi from the rank outside arrivals instead, you are not buying a fixed price at all — you are buying a metered journey, and the number at the end depends on the traffic, the hour and the route. The rest of this page explains both, because which one is cheaper genuinely depends on when you travel.',
        ],
      },
      {
        h2: 'Why one price instead of a meter reading',
        body: [
          'Barcelona taxi fares are regulated by the Àrea Metropolitana de Barcelona, and every licensed taxi in the city runs the same meter at the same rates. That is a real consumer protection and we are not arguing with it. What a regulated meter does not do is tell you the price in advance.',
          'On a 15-kilometre run into the Eixample the meter reading swings by roughly ten euros depending on whether you hit the Ronda de Dalt moving or stationary, and by another twenty-five per cent depending on whether it is a Tuesday lunchtime or a Saturday night. Both numbers are correct. Neither is knowable when you are standing in the arrivals hall deciding what to do.',
          'A fixed price moves that variance onto us. We quote EUR 50, we settle with the driver against whatever the journey actually turns out to cost, and the difference is ours either way. On a free-flowing Tuesday that is a worse deal for you than the rank. In Friday-evening traffic it is a better one. What it always is, is known.',
          'It is also the only honest way to sell a transfer to someone who is not in Barcelona yet. Nobody booking from Manchester in March can price a Thursday-afternoon meter reading in July, so a quote that is really an estimate is a quote that can be wrong — and it is always wrong in the direction of the number going up.',
        ],
      },
      {
        h2: 'The 16-kilometre zone, and why it is measured as the crow flies',
        body: [
          'The list price covers any address within 16 kilometres of the terminal, measured in a straight line. That is the whole centre and almost everywhere a visitor stays: Plaça de Catalunya at 12.3 km, the Barceloneta at 12.8, the Sagrada Família at 14.0, Park Güell up on the hill behind Gràcia at 14.3 and Poblenou at 15.5 all pay the same EUR 50 as a hotel on Passeig de Gràcia. It is not the entire municipality, and it is worth knowing which part is not: the outer northern and eastern districts fall outside, with La Sagrera at 16.4 km, the Fòrum at 17.4, Sant Andreu at 17.7, Nou Barris at 17.9 and Torre Baró at 19.3, and those addresses pay the excess rate below.',
          'The straight-line measurement is deliberate, and it is worth understanding because it works in your favour. Plaça de Catalunya is 12.3 kilometres from the terminal as the crow flies and 19.6 kilometres by road, because the road has to go around the Llobregat and in along the Gran Via. A zone measured along the road at 16 kilometres would put the dead centre of Barcelona outside it, and start billing extra kilometres on the single most common journey the price exists to cover. So the zone is drawn on the map, not on the route.',
          'Outside the zone the price is the list price plus EUR 1.50 for each additional kilometre. Badalona sits at 21.8 kilometres and Sant Cugat del Vallès at 19.5, so both pay the city price plus the difference. Those are the near misses; most of the metropolitan area is inside.',
          'That EUR 1.50 is one published figure rather than the tariff of the hour, which matters more than it sounds. The official night rate is EUR 1.66 a kilometre against EUR 1.35 in the day. Charging whichever applied would put the time of day back into a price list whose entire purpose is that the hour does not move it, and somebody told "fifty euros plus a euro fifty a kilometre" would find themselves billed more than that without warning. One number, all day.',
        ],
      },
      {
        h2: 'What the rank charges instead',
        body: [
          'If you walk out to the rank, three things combine into the figure on the meter: a start fare the moment the meter runs, a per-kilometre rate, and any supplements that apply.',
          'The start fare — the bajada de bandera — is EUR 2.80. The per-kilometre rate is EUR 1.35 under tariff T-1, which applies Monday to Friday between 08:00 and 20:00, and EUR 1.66 under T-2 at every other time: evenings, nights, all of Saturday and Sunday, and public holidays. The gap is about 23 per cent, which is why an identical journey genuinely costs more at 22:00 than at 14:00.',
          'There is also a waiting rate of EUR 27.75 an hour, which the meter counts while you are stationary. In practice this is what makes rush-hour arrivals unpredictable: the meter does not stop when the traffic does.',
          'The current rates run from 19 January 2026 to 17 January 2027. The AMB revises them each January, and anyone quoting you a Barcelona taxi fare from an older board is quoting the wrong year. Ours are checked against the printed tariff board rather than copied from another website.',
        ],
      },
      {
        h2: 'The supplements, and the cap you will probably not reach',
        body: [
          'On top of the metered fare sit fixed supplements for specific places and situations. The El Prat airport supplement is EUR 4.60 and applies to any journey starting or ending at the airport. The Moll Adossat cruise terminal carries the same EUR 4.60. Sants station is EUR 2.55 and the Fira Gran Via exhibition centre is EUR 3.30.',
          'A vehicle carrying five to eight passengers adds EUR 4.60. That is a tariff supplement for the larger vehicle itself rather than a per-person charge, and it is one reason a six-seat Vito costs more than a sedan on the same route.',
          'Three nights of the year carry an additional EUR 4.60: Christmas Eve into Christmas morning, New Year’s Eve into New Year’s Day, and the Revetlla de Sant Joan on the night of 23 June. If you are flying in on one of those nights, the rank will cost more than its usual rate and the booked price will not.',
          'There is a cap of EUR 17.10 on the total supplements chargeable on a single service, which exists for the edge cases — a large vehicle leaving the cruise terminal on New Year’s Eve, for instance. On an ordinary airport run you are paying one EUR 4.60 supplement and nowhere near the ceiling.',
          'All of this is inside our fixed price. The EUR 50 is not a fare with supplements to follow; it is the total, with the airport supplement, the vehicle, the tariff and our own service charge already in it. The single most common complaint about airport transfers anywhere is a price that grows between the quote and the kerb, and the way to not do that is to quote the number you are actually going to charge.',
        ],
      },
      {
        h2: 'The minimum fare from El Prat',
        body: [
          'Any metered journey starting at the airport bills at least EUR 21.00. If the meter would have produced less, the minimum is what you pay.',
          'This exists because a taxi that queues forty minutes at the terminal rank for a four-euro hop to an airport hotel has lost money on the shift, and without a floor nobody would take the short ones. It only bites on genuinely short journeys: into El Prat town, or to one of the hotels along the airport road.',
          'For anything into Barcelona proper the meter comfortably exceeds EUR 21 on its own, so the minimum never enters the calculation. If you are quoted a Barcelona airport taxi price "from EUR 21", that is the floor for a two-kilometre hop being presented as a city fare.',
        ],
      },
      {
        h2: 'The cruise terminal is its own case',
        body: [
          'The run between El Prat and Moll Adossat has an official fixed closed price of EUR 46.00 under tariff T-4, set by the AMB rather than by us. It does not run on the meter at all.',
          'That is unusual and it is there for a good reason: cruise passengers travel against a boarding deadline, often in the worst port traffic of the week, and a metered fare in that situation is a bet nobody wants to take. A closed price removes the traffic risk from a journey where being late is not an inconvenience but a missed ship.',
          'Our booked price for the same route is EUR 60 in a sedan, which is above the official closed price because it includes a specific guarantee the rank does not offer: a driver assigned in advance, meeting you with a name sign, holding the slot whether or not the ship docks on time. For a family with luggage and a sailing time, that is usually the thing worth paying for. For a solo traveller with a rucksack and a relaxed afternoon, the rank at EUR 46 is the better buy and we would rather say so than pretend otherwise.',
          'A transfer between the cruise terminal and the city — rather than the airport — is the city price plus a EUR 10 port surcharge, which lands on the same EUR 60. The symmetry is intentional.',
        ],
      },
      {
        h2: 'Beyond the metropolitan area: Sitges, Girona, Tarragona',
        body: [
          'Once either end of the journey is outside the metropolitan area, Barcelona’s tariffs stop applying entirely and the journey bills on the interurban tariffs set by the Generalitat de Catalunya. These are T-6, Monday to Friday 08:00 to 20:00, and T-7 at all other times including the whole of Saturday and Sunday.',
          'The interurban meter has one feature that surprises almost everyone: it bills the return leg. A taxi taken from Barcelona to Sitges is, on the tariff, an out-and-back journey — the closed circuit — because the driver has to come home and cannot pick up a fare on the way. So a kilometre driven south costs two kilometres on the meter. At the T-6 rate of EUR 0.82 a kilometre that is EUR 1.64 per kilometre actually travelled, not EUR 0.82.',
          'This is why a long transfer costs what it costs, and why a figure that looks like a per-kilometre rate on a comparison site is often half the real one. We charge EUR 1.80 per kilometre travelled on T-6 and EUR 1.98 on T-7, which is the doubled meter rate plus the same small markup the city tariffs carry. Nothing is doubled twice.',
          'The practical upshot: Sitges, Tarragona, Girona, Reus and the Costa Brava are priced per kilometre and quoted before you book, like everything else. They are not covered by the fixed city list, and no honest fixed list could cover them — the distances differ by a factor of five.',
        ],
      },
      {
        h2: 'Weekends, holidays and what actually changes',
        body: [
          'A fixed price rises 7.5 per cent at weekends and on public holidays. On a EUR 50 sedan that is EUR 3.75. The uplift is there because weekend and holiday cover costs more to staff, and it is a single published rate rather than a surge multiplier that moves with demand — the price you are quoted on a Saturday in February is the same one you are quoted on a Saturday in August.',
          'It applies to the fixed city and port prices only. An interurban journey already moves from T-6 to T-7 at the weekend, which carries its own higher rate, so adding the uplift on top would charge the same premium twice.',
          'What does not change: the hour of the day, the terminal, the traffic, the route the driver takes, the number of passengers within the vehicle’s capacity, or the amount of luggage within it. A four-seat car with three suitcases at 06:00 and a four-seat car with one bag at 18:00 are both EUR 50 on a weekday.',
        ],
      },
      {
        h2: 'So what should you budget?',
        body: [
          'For a booked transfer into Barcelona: EUR 50 on a weekday in a four-seat car, EUR 53.75 at a weekend. EUR 70 or EUR 75 if you need a six- or seven-seater, which for four adults with four large cases is usually the honest answer rather than the upsell — three suitcases is the realistic limit in a Corolla or a Toledo.',
          'For the rank, on a weekday daytime run into the centre: the meter plus the EUR 4.60 supplement, typically landing somewhere in the forties, and higher in the evening, at weekends or in heavy traffic. Bring the possibility of a card machine not working, which happens.',
          'For the cruise terminal: EUR 46 at the official closed price, or EUR 60 booked with a driver holding your slot.',
          'The one thing worth saying plainly is that the rank and a booked car are not the same product at a different price. One is a regulated metered journey you buy on arrival. The other is a fixed figure, a named driver and a car that is already assigned when your flight lands. Which is better value depends entirely on how much the uncertainty is worth to you that day, and for a lot of journeys the answer is "not much" — in which case the rank is right there.',
        ],
      },
    ],
    related: ['barcelona-airport-taxi-price', 'airport-to-city', 'el-prat-airport-taxi'],
  },
  {
    slug: 'taxi-or-aerobus-from-barcelona-airport',
    title: 'Taxi or Aerobús from Barcelona Airport?',
    description:
      'Taxi, Aerobús or metro from Barcelona El Prat: the real cost per group, honest door-to-door times, and the luggage and late-night cases where each one wins.',
    h1: 'Taxi or Aerobús from Barcelona airport?',
    published: '2026-08-10',
    updated: '2026-10-25',
    readingMinutes: 7,
    excerpt:
      'The Aerobús is cheaper per person and the metro is cheaper still. Neither is automatically better once you count group size, luggage and the walk at the far end — and for one or two people travelling light, the taxi is the wrong choice and we will say so.',
    sections: [
      {
        h2: 'The arithmetic, with the actual numbers',
        body: [
          'The Aerobús charges per head. A taxi charges per car. That single difference decides most of these arguments before any of the other factors matter.',
          'A booked four-seat transfer into Barcelona is EUR 50 flat. Split between two people that is EUR 25 each, which is several times an Aerobús seat. Split between four it is EUR 12.50 each, and the gap closes to something most people stop caring about — before you count that the taxi ends at your door and the bus ends at Plaça de Catalunya.',
          'The turning point is usually three passengers, and by four it has normally gone. A group of six in a Vito at EUR 70 is under EUR 12 a head, door to door, with the luggage in the boot rather than on your knees.',
          'The honest version of the comparison is this: travelling alone, the bus is better value and it is not close. Travelling as a family of four with cases, the taxi is usually both cheaper in total and substantially easier. Everything in between depends on the luggage.',
        ],
      },
      {
        h2: 'Door-to-door time, not headline time',
        body: [
          'The Aerobús is advertised at roughly 35 minutes to Plaça de Catalunya, and it is accurate — stop to stop. The number you actually experience is longer, because the journey does not begin at the bus bay or end at the square.',
          'Add the walk from arrivals to the stop, which at T1 is a few minutes with a trolley. Add the wait, which is short at peak and can be fifteen minutes late in the evening. Then add the leg from Plaça de Catalunya or Sants to wherever you are staying — on the metro with cases, in a second taxi, or on foot over cobbles in the Gothic Quarter.',
          'A taxi from El Prat to central Barcelona takes 25 to 35 minutes depending on traffic and where in the city you are going, and it ends at the address you typed. For the Eixample or Sant Antoni the difference in total door-to-door time is maybe twenty minutes. For somewhere up in Gràcia, or an apartment with a street entrance in El Born, it is often closer to forty-five.',
          'The variance matters as much as the average. The bus is reliable and the taxi is faster; in heavy traffic they converge, because the bus is in the same traffic and stops more.',
        ],
      },
      {
        h2: 'The metro is cheaper than both, with conditions',
        body: [
          'Line 9 Sud serves both terminals and is the cheapest way into the city by a clear margin. It is a genuinely good option and it is underused by visitors.',
          'The conditions are real, though. It does not go to the centre directly — you change, usually at Collblanc or Torrassa, onto another line, and the airport stations require a specific airport fare rather than a standard single. The stations have lifts, but the interchanges involve corridors, and doing them with two large cases and a tired child is the kind of thing that sounds fine when you are booking and does not feel fine at 23:00.',
          'If you are travelling light, staying near a line 9 interchange, and not in a hurry, the metro is the right answer and costs a fraction of everything else. If any of those three is untrue, it stops being the right answer quite quickly.',
        ],
      },
      {
        h2: 'Luggage is the real deciding factor',
        body: [
          'More than price and more than time, luggage is what actually decides this, and it is the thing people underestimate when booking from home.',
          'A four-seat Barcelona taxi — a Corolla, a SEAT Toledo — takes four passengers and about three suitcases. Four adults each with a large case do not fit, and the answer is a six-seat Vito, which takes six passengers and six cases, or a seven-seat V-Class. Knowing that in advance is the difference between a transfer and a problem on the kerb.',
          'On the Aerobús, luggage goes in a hold under the bus and there is a rack by the door, which works well. On the metro it goes wherever you can hold it, which at rush hour is on top of you.',
          'The rule of thumb that holds up: one bag each and you have a real choice between all three. Two bags each and the taxi is the only one that is actually pleasant, whatever the arithmetic says.',
        ],
      },
      {
        h2: 'When the taxi clearly wins',
        body: [
          'Arriving after midnight. The Aerobús stops running in the small hours and the metro closes, with a limited night-bus network in between that is not a realistic proposition with luggage and no Catalan.',
          'Travelling with children, a pushchair, or a car seat. The bus is manageable with one child and awkward with two, and nobody enjoys the metro interchange with a pushchair and a suitcase.',
          'Catching an early flight. A 04:30 pickup to make a 06:30 departure has no public-transport equivalent, and a booked car at a fixed price is the only version of this that lets you sleep until the alarm.',
          'Staying somewhere the final leg is genuinely awkward: the Gothic Quarter, where vehicles cannot reach many addresses but can get far closer than a bus stop; Gràcia and Sarrià, up the hill from any of the bus routes; anywhere you would otherwise finish with a second taxi, which makes the "cheaper" option cost more.',
          'Groups of four or more. At that point the per-car price has already won on money, so the convenience is free.',
        ],
      },
      {
        h2: 'When it does not, and we will say so',
        body: [
          'One or two people, light luggage, staying near Plaça de Catalunya or on a direct metro line, arriving in the middle of the day. In that situation the Aerobús is the sensible choice, the metro is the cheap one, and a EUR 50 taxi is you paying for convenience you do not especially need.',
          'We would rather write that down than pretend the taxi is always right. An airport transfer is a service with a specific shape — fixed price, assigned driver, door to door, luggage handled — and that shape is worth something to a family of four at midnight and very little to a solo traveller with a backpack at two in the afternoon.',
          'The same logic applies to the rank. A metered taxi from the rank on a quiet weekday afternoon will often come in under a booked fixed price, because the fixed price includes absorbing traffic risk that did not materialise that day. That is how fixed prices work, in both directions.',
        ],
      },
      {
        h2: 'The late-night gap nobody mentions',
        body: [
          'There is a window, roughly from the last Aerobús to the first morning metro, where the public-transport options collapse to a night bus and the rank becomes the default. On a normal night the rank at T1 is well supervised and moves quickly.',
          'Where it goes wrong is a delayed flight landing into that window at the same time as two other delayed flights. The rank is then forty people long and the supply of taxis at 02:00 is thin, because drivers are not sitting at a terminal on the off chance. That is the one scenario where arriving with a car already assigned is worth clearly more than it costs.',
          'If your flight is scheduled to land after about 23:30, it is worth deciding this before you fly rather than in the arrivals hall.',
        ],
      },
      {
        h2: 'Going back to the airport is a different problem',
        body: [
          'Almost everyone plans the arrival and improvises the departure, and the departure is the harder half.',
          'On the way in you have options because you are standing at an airport, which is the one place in the region guaranteed to have taxis. On the way out you are standing on a street in Gràcia at 05:00 with a flight at 07:30, and the things that made the bus and the metro attractive have all stopped running.',
          'The Aerobús does not help for early departures, and hailing a taxi in a residential street before dawn is unreliable in a way that hailing one on the Gran Via is not. Barcelona has plenty of taxis; it does not have plenty of taxis on your corner at five in the morning.',
          'For a daytime departure from a central address, all three options work in reverse exactly as they do inbound, and the same arithmetic applies. For anything before about 07:00, or from an address off the main grid, a booked pickup is less a convenience than the only version that reliably happens. The fixed price is the same in both directions — EUR 50 into the city and EUR 50 out of it, weekdays, four-seat car.',
        ],
      },
      {
        h2: 'How to decide in ten seconds',
        body: [
          'Count the people and count the bags. One or two people with one bag each, arriving in daylight, staying centrally: take the Aerobús, or the metro if you are watching every euro.',
          'Three or more people, or two or more bags each, or an arrival after the buses stop, or an address up a hill or down a lane: take a taxi, and decide separately whether you want the rank or a car booked in advance.',
          'Rank or booked comes down to one question: how badly would a forty-minute queue or an unknown final figure affect your evening? If the answer is "not much", the rank is right outside arrivals and costs less. If you are travelling with people who will not cope with it, or against a deadline, book it.',
        ],
      },
    ],
    related: ['airport-to-city', 'barcelona-airport-taxi-price', 'private-transfer'],
  },
  {
    slug: 'barcelona-airport-terminals-t1-t2-guide',
    title: 'Barcelona Airport Terminals: T1 and T2 Explained',
    description:
      'Which terminal your airline uses at Barcelona El Prat, how the T1 to T2 shuttle works, where the taxi ranks are, and where a booked driver meets you instead.',
    h1: 'Barcelona airport terminals: T1 and T2',
    published: '2026-08-10',
    updated: '2026-10-25',
    readingMinutes: 7,
    excerpt:
      'Getting the terminal wrong costs you a shuttle ride and twenty minutes, and on a departure it can cost you the flight. Here is which is which, where the taxis actually are at each, and the one thing to check the day before you fly.',
    sections: [
      {
        h2: 'Two terminals, several kilometres apart',
        body: [
          'Barcelona El Prat has two passenger terminals, T1 and T2, and the single most important thing to know about them is that they are not walkable from one another. They sit on opposite sides of the runways, a few kilometres apart, connected by a free shuttle bus.',
          'This catches people out because at many airports "terminal" means a different wing of the same building. Here it means a different building with a bus ride in between, and the ride takes 10 to 15 minutes before you count waiting for it.',
          'T1 is the newer and much larger of the two, opened in 2009, and it handles most long-haul traffic along with the bulk of Vueling and the legacy carriers. T2 is the original terminal, older and lower-ceilinged, split into three blocks and serving a number of low-cost airlines.',
          'Both are fully equipped — check-in, security, shops, food, car hire, taxi ranks. Neither is a remote outpost. The only real penalty for going to the wrong one is time.',
        ],
      },
      {
        h2: 'Which airlines use which',
        body: [
          'T1 carries most of what arrives from outside Europe, plus Vueling, which is the dominant carrier at the airport, and most of the traditional flag carriers.',
          'T2 serves a set of low-cost airlines, Ryanair among the largest of them, along with some charter and seasonal traffic.',
          'The useful caveat: this is not stable. Airlines move between terminals when their contracts change, sometimes at a few weeks’ notice, and seasonal schedules shuffle things further. A guide that tells you confidently which terminal your airline uses is telling you which terminal it used when the guide was written.',
          'Codeshares make it worse. If you booked through one airline and are flying on another’s aircraft, the terminal follows the operating carrier, not the one on your booking confirmation. The terminal printed on your boarding pass is the one that counts, and it is the only source worth trusting.',
        ],
      },
      {
        h2: 'Moving between T1 and T2',
        body: [
          'The shuttle bus between the terminals is free, runs frequently and operates through the night, though less often in the small hours. It stops outside arrivals at T1 and at each block of T2.',
          'Budget 25 minutes door to door rather than the 10 to 15 the journey itself takes — you will wait for the bus, load luggage, and walk at the far end. At busy times, with a full bus and standing room only, it is longer and considerably less pleasant with cases.',
          'Line 9 Sud of the metro also connects the two terminals, with a station at each, which is sometimes quicker than waiting for the bus if you are already underground. It is not free, and it requires the airport fare.',
          'If you are connecting between a flight into T2 and a flight out of T1 on separate tickets, treat the transfer as a real leg of the journey and give it an hour. People miss flights on this.',
        ],
      },
      {
        h2: 'T2 is three blocks, and the block matters',
        body: [
          'T2 is divided into blocks A, B and C, laid out in a line along the front of the building. They are connected inside, so you can walk between them, but the walk from one end to the other is several minutes.',
          'Your airline uses a specific block, and the check-in desks, security and the taxi rank are all tied to it. Being dropped at block C when you need block A is not a disaster, but it is a walk you did not plan with luggage.',
          'When you book a transfer with a T2 pickup or drop-off, the block is worth including. It is the difference between a driver who is standing where you come out and a driver who is three hundred metres down the frontage.',
        ],
      },
      {
        h2: 'Where the taxi ranks are',
        body: [
          'Both terminals have official taxi ranks immediately outside arrivals, clearly signed, supervised and usually busy. At T1 the rank is directly in front of the arrivals hall. At T2 there are ranks serving each of the blocks.',
          'The taxis at these ranks are licensed Barcelona taxis in the standard black and yellow livery, all running the same regulated meter. There is no negotiation and no choosing — you take the car at the front. That is the system working as designed, and it means you cannot be overcharged relative to the tariff.',
          'Any journey starting at the airport carries a EUR 4.60 supplement and bills at least the EUR 21 minimum fare, both of which are part of the official tariff rather than anything the driver has added.',
          'What the rank cannot do is tell you the price before you set off, or guarantee there will be a car when you land. On a normal afternoon both are fine. After a cluster of delayed late arrivals, the queue is the whole story.',
        ],
      },
      {
        h2: 'Where a booked driver meets you instead',
        body: [
          'A pre-booked transfer does not use the rank, and this is the part people most often get wrong on arrival.',
          'Your driver waits inside the arrivals hall, on the public side of the exit from baggage reclaim, holding a sign with your name on it. They are not at the kerb and not in the rank queue. You walk out of reclaim and they are standing there, which is the whole point of booking.',
          'The exact meeting point is confirmed by email before you travel, because it differs by terminal and at T2 by block. Read that email on the plane rather than in the hall.',
          'The driver tracks your flight number, so a delay moves the pickup rather than losing it. This is the practical difference between a booked car and a rank: an hour-late landing at 01:00 means a driver who is still there, instead of a rank that has thinned out.',
          'If you cannot find each other, the phone number in the confirmation reaches the driver directly, not a call centre. Arrivals halls are large and signs get lowered; one call solves it.',
        ],
      },
      {
        h2: 'Does the terminal change the fare?',
        body: [
          'Barely, and for a booked transfer not at all.',
          'T1 sits a couple of kilometres further from the city than T2. On a 15-kilometre run into central Barcelona that difference is small, and the EUR 4.60 airport supplement is identical from either terminal. On the meter you might see a euro or two between them.',
          'A booked fixed price does not distinguish between them at all: EUR 50 into the city in a four-seat car from T1 or T2, on a weekday, with the supplement already inside the figure. The same applies in reverse for departures.',
          'What the terminal does change is the shuttle risk. If you are dropped at the wrong one, the cost is 25 minutes and a bus, which on an arrival is annoying and on a departure can be the flight.',
        ],
      },
      {
        h2: 'Departures: where getting it wrong actually hurts',
        body: [
          'On arrival, the wrong terminal costs you time. On departure it can cost you the trip, because you discover the mistake at a check-in desk that does not have your flight and a shuttle that takes 25 minutes you do not have.',
          'Say the terminal when you book a departure transfer, and check it against the boarding pass rather than against memory of the inbound flight. Airlines routinely use different terminals in each direction, and a return on a codeshare can easily be a different terminal from the outbound.',
          'For an early departure, leaving from Barcelona to be at El Prat for a 06:30 flight means a pickup around 04:30 for the city, earlier if you are further out. A booked car at a fixed price is the only version of that which does not involve standing on a street at dawn hoping.',
        ],
      },
      {
        h2: 'How long you will actually take to get out',
        body: [
          'The time that matters for a pickup is not when the aircraft lands, it is when you walk out of baggage reclaim, and the gap between the two is wider than most people allow for.',
          'From a Schengen arrival with hand luggage only, ten to fifteen minutes from wheels down to the arrivals hall is realistic. From outside Schengen, with passport control and a checked bag, half an hour is normal and an hour happens — particularly at T1 mid-morning, when several long-haul flights land together and the queue at control is the bottleneck rather than the carousel.',
          'This is why a booked transfer is keyed to your flight number rather than to a time you typed in. The driver watches the actual landing and allows for the hall, which removes the guess you would otherwise have to make while booking from home weeks earlier.',
          'It also means there is no benefit in padding your own estimate. Booking a pickup an hour after landing "to be safe" does not help, because the tracking already handles it, and it leaves you waiting for a car that is deliberately late.',
          'The one thing to do yourself: if you clear reclaim unusually fast and your driver is not yet in position, the phone number on the confirmation reaches them directly. A car that is eight minutes out is a normal outcome of a fast exit, not a problem.',
        ],
      },
      {
        h2: 'Check it the day before',
        body: [
          'One habit removes almost all of this: the evening before you fly, open the boarding pass and read the terminal. Not the booking confirmation, not the guide you read in March, not the airline’s general route page — the boarding pass for the flight you are taking.',
          'If it does not match what you told us, reply to the confirmation email and we will move it. Changing a terminal on a booking costs nothing and takes a minute. Discovering it at 05:00 costs the shuttle, the stress and sometimes the flight.',
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
