/**
 * Keyword landing pages.
 *
 * Each entry becomes a real page at `/{locale}/{slug}` with its own title, H1,
 * intro, body sections and internal links. Content lives here rather than in
 * the message catalogue because it is long-form SEO copy that differs per page
 * rather than reusable UI strings.
 *
 * Titles are used verbatim (no `| BCNAirportTaxi` suffix appended), so keep
 * them at or under 60 characters or Google truncates them in results.
 *
 * H2s deliberately carry the exact target phrases, because a keyword in a
 * heading is weighted far above the same keyword buried in body copy.
 *
 * Translations: `copy.en` is required. Other locales fall back to English until
 * a translated version is supplied, so a page is never blank.
 */

import { ES_LANDING_COPY } from './landing-copy/es';
import { CA_LANDING_COPY } from './landing-copy/ca';
import { FR_LANDING_COPY } from './landing-copy/fr';
import { DE_LANDING_COPY } from './landing-copy/de';
import { IT_LANDING_COPY } from './landing-copy/it';
import { PT_LANDING_COPY } from './landing-copy/pt';
import { NL_LANDING_COPY } from './landing-copy/nl';
import { RU_LANDING_COPY } from './landing-copy/ru';
import { ZH_LANDING_COPY } from './landing-copy/zh';

export interface LandingSection {
  h2: string;
  body: string;
}

export interface LandingCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
}

export interface LandingPage {
  /** May contain slashes for nested routes, e.g. `neighborhoods/eixample`. */
  slug: string;
  /** Slugs of related pages, rendered as an internal-link block. No orphans. */
  related: string[];
  /** Prefills the booking form when the page is about a specific route. */
  preset?: { pickup?: string; dropoff?: string };
  copy: Partial<Record<string, LandingCopy>> & { en: LandingCopy };
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'airport-to-city',
    related: ['city-to-airport', 'el-prat-airport-taxi', 'barcelona-airport-taxi-price', 'hotel-transfers'],
    preset: { pickup: 'Barcelona El Prat Airport (BCN)' },
    copy: {
      en: {
        title: 'Barcelona Airport to City Taxi | Book Online',
        description:
          'Book a taxi from Barcelona airport to the city centre. One fixed all-inclusive price, El Prat supplement included, driver waiting at arrivals.',
        h1: 'Taxi from Barcelona airport to the city',
        intro:
          'A taxi from Barcelona El Prat to the city centre takes roughly 25 to 35 minutes depending on traffic and which terminal you land at. Booking ahead means a driver is already assigned when you land, holding a name sign in arrivals, instead of joining the rank queue at T1 or T2.',
        sections: [
          {
            h2: 'What a Barcelona airport transfer taxi costs',
            body: 'Your price is a fixed figure from our own list, not a meter reading and not an estimate — every official supplement that applies to the route is already inside it. A ride from the airport to anywhere in Barcelona is a fixed EUR 50 in a standard taxi, whatever the distance and whatever the hour; weekends and public holidays add 7.5%. Enter your exact destination above to see your own all-inclusive price.',
          },
          {
            h2: 'Where your driver meets you at arrivals',
            body: 'Your driver waits inside the arrivals hall of your terminal with a name sign and tracks your flight number, so a delayed landing does not cost you the car. The exact meeting point for T1 and T2 is included in your confirmation email.',
          },
          {
            h2: 'Terminal 1 and Terminal 2',
            body: 'Both terminals have official taxi ranks, and both are served by our drivers. T1 handles most long-haul and Vueling traffic; T2 serves many low-cost carriers. The fare difference between them is small — a couple of kilometres — but T1 is slightly further from the city.',
          },
          {
            h2: 'How far the EUR 50 reaches',
            body:
              'One price covers any address within 16 km of the terminal, measured in a straight line rather than along the road. Every part of Barcelona is inside it — Park Güell, up behind Gràcia, is the furthest point in the city at 14.3 km, and it pays the same as a hotel on Passeig de Gràcia. The straight-line measurement works in your favour: Plaça de Catalunya is 12.3 km from the terminal as the crow flies but 19.6 km by road, so a zone drawn along the road would push the city centre outside it. Beyond the zone — Badalona at 21.8 km, Sant Cugat at 19.5 — the list price applies plus EUR 1.50 for each additional kilometre.',
          },
          {
            h2: 'Taxi, Aerobús or metro into the city',
            body:
              'The Aerobús charges per person and a taxi charges per car, which settles most of this before anything else. Travelling alone with hand luggage, the bus is better value and it is not close; at three passengers the gap has narrowed, and at four it has usually gone. Line 9 Sud of the metro is cheaper than both but needs an interchange, which is fine with one bag each and considerably less fine with two. The honest rule: count the people and count the bags. One or two of each in daylight, take the bus. Three or more people, or two bags each, or an arrival after the buses stop — take a taxi.',
          },
        ],
      },
    },
  },
  {
    slug: 'city-to-airport',
    related: ['airport-to-city', 'hotel-transfers', 'sants-station-to-airport', '24-hour-taxi'],
    preset: { dropoff: 'Barcelona El Prat Airport (BCN)' },
    copy: {
      en: {
        title: 'Taxi from Barcelona to the Airport | Book Online',
        description:
          'Book a taxi from Barcelona city to El Prat airport. Fixed pickup time, one fixed all-inclusive price, and a driver who knows the terminal drop-off points.',
        h1: 'Taxi from Barcelona to the airport',
        intro:
          'Going the other way is the trip worth booking in advance. A pre-booked taxi to Barcelona airport arrives at your hotel or apartment at a set time, which matters far more when you have a flight to catch than when you are arriving.',
        sections: [
          {
            h2: 'When to book your Barcelona to airport taxi',
            body: 'For a short-haul flight within Europe, allow two hours between arriving at El Prat and departure; for long-haul, three. Add 30 to 40 minutes for the journey from central Barcelona, and more during weekday rush hours. Our booking form requires at least three hours notice, so reserve the night before at the latest.',
          },
          {
            h2: 'Barcelona city to airport taxi drop-off points',
            body: 'Tell us your airline and we drop you at the right terminal door. T1 departures is a single large hall; T2 is split into blocks A, B and C, and being dropped at the wrong block means a long walk with luggage.',
          },
          {
            h2: 'Early morning Barcelona to El Prat airport taxi runs',
            body: 'The first wave of departures from El Prat leaves before 07:00, which means pickups from 04:30. A 04:30 pickup costs exactly what the same journey costs at midday — the hour does not move a fixed price — and we confirm the driver the evening before so there is no uncertainty at 4am.',
          },
          {
            h2: 'Check the terminal on your boarding pass, not the booking',
            body:
              'T1 and T2 are not walkable from one another. They sit on opposite sides of the runways, connected by a free shuttle that takes 10 to 15 minutes before you count waiting for it — budget 25 minutes door to door. On a departure that matters far more than on an arrival: being dropped at the wrong one means discovering it at a check-in desk that does not have your flight. Airlines move between terminals when contracts change, and a codeshare follows the operating carrier rather than the airline on your confirmation, so the terminal printed on your boarding pass is the only source worth trusting. If it does not match what you told us, reply to your confirmation and we will change it for nothing.',
          },
          {
            h2: 'If your plans change before the pickup',
            body:
              'You can change the details yourself within 30 minutes of booking, and after that up until your driver sets off — reply to your confirmation or message us on WhatsApp. Moving a pickup time, a terminal or an address costs nothing, and a wrong terminal is the most common correction we make. If the trip falls through entirely, cancel at least 24 hours before the pickup and the whole amount is refunded to the card you paid with, normally within five to ten working days. Inside that 24-hour window we will still try to help, but a refund is no longer automatic.',
          },
        ],
      },
    },
  },
  {
    slug: 'el-prat-airport-taxi',
    related: ['airport-to-city', 'city-to-airport', 'barcelona-airport-taxi-price', '24-hour-taxi'],
    copy: {
      en: {
        title: 'El Prat Airport Taxi | Licensed Barcelona Transfers',
        description:
          'Licensed taxis to and from Barcelona El Prat airport (BCN). Book online at a fixed all-inclusive price, with a driver assigned to your flight.',
        h1: 'El Prat airport taxi',
        intro:
          'Josep Tarradellas Barcelona–El Prat, still known to nearly everyone as El Prat, sits about 15 km southwest of the city. It is the second-busiest airport in Spain, and the taxi rank is the fastest way into Barcelona at almost any hour — provided there is a car waiting.',
        sections: [
          {
            h2: 'Booking a taxi to Barcelona airport versus the rank',
            body: 'The official rank at El Prat is well run and usually moves quickly. It backs up at predictable moments: mid-morning arrival banks, Sunday evenings, and whenever several long-haul flights land together. Booking ahead removes that risk entirely, fixes your driver in advance, and fixes your price before you travel.',
          },
          {
            h2: 'The El Prat airport supplement',
            body: 'The official airport supplement and every other charge that applies to the route are inside the fixed price you are quoted. There is no meter running on your journey and no second figure at the end of it, so there is nothing to be surprised by.',
          },
          {
            h2: 'Cruise passengers and the port',
            body: 'For passengers connecting to a cruise, the run between El Prat and the Moll Adossat cruise terminal has its own fixed price, listed separately from the city price. Enter the cruise terminal as your destination and the quote switches to it automatically.',
          },
          {
            h2: 'Which vehicle you need for your luggage',
            body:
              'Choose on suitcases, not headcount. A four-seat taxi carries four passengers but only about three large cases — the boot of a Corolla or a SEAT Toledo is the real constraint, and it is the one most often misjudged when booking from home. Four adults each with a full-size case need the six-seat Mercedes Vito, which takes six passengers and six bags; above that, the seven-seat V-Class carries seven of each. Something oversized — a bicycle, skis, a surfboard — belongs in the booking notes rather than in a hope that a bigger car will do, because the right answer is sometimes a particular vehicle and not simply a roomier one.',
          },
          {
            h2: 'Picking up at Terminal 1 and Terminal 2',
            body:
              'A booked transfer does not use the rank. Your driver waits inside the arrivals hall, on the public side of the exit from baggage reclaim, holding a sign with your name — not at the kerb and not in the queue. T2 is split into blocks A, B and C along the front of the building, so including your block when you book is the difference between a driver standing where you come out and one three hundred metres down the frontage. The driver follows your flight number, so a late landing moves the pickup instead of losing it, and the phone number in your confirmation reaches them directly rather than an office.',
          },
        ],
      },
    },
  },
  {
    slug: 'barcelona-airport-taxi-price',
    related: ['el-prat-airport-taxi', 'airport-to-city', 'city-to-airport', 'private-transfer'],
    copy: {
      en: {
        title: 'Barcelona Airport Taxi Price | Fixed 2026 Fares',
        description:
          'What a Barcelona airport taxi really costs: our fixed prices per vehicle, how far the flat price reaches, and what the weekend and out-of-zone rates add.',
        h1: 'Barcelona airport taxi price',
        intro:
          'A Barcelona airport transfer with us is one fixed price, agreed before you book and locked when you do. No meter, no distance guesswork and nothing to settle in the car. Here is the whole list and the three things that can add to it.',
        sections: [
          {
            h2: 'How your Barcelona airport taxi fare is calculated',
            body: 'A transfer is one fixed price, set by vehicle rather than by distance or clock. The airport to anywhere in Barcelona is one figure, the airport to the cruise terminal another, and a standard taxi, a six-seat minivan and a seven-seat van each have their own. Only three things can add to it: a drop-off beyond the flat zone, a transfer to or from the cruise quay, and the weekend and public-holiday rate. Each is shown as its own line before you pay.',
          },
          {
            h2: 'Is there a cheap taxi from Barcelona airport?',
            body: 'Compare on what the price actually protects you from rather than on the headline figure. A fixed price cannot move once agreed: traffic, a longer route, a late landing and the time of day are our problem, not yours, and nothing is collected in the car. What you can control is vehicle choice and travelling outside the weekend window. Be wary of an unusually low quote — it usually means an unlicensed vehicle, or a figure that will grow before you arrive.',
          },
          {
            h2: 'How far the fixed price reaches',
            body: 'The city price covers everywhere within a 16 km radius of the terminal, which is the whole of Barcelona and the towns immediately around it — a short hop to El Prat town and a run across the city to Park Güell cost the same. Beyond that radius the fixed price still stands and only the kilometres past it are added, at a published rate.',
          },
          {
            h2: 'What we charge on top',
            body: 'You pay one all-inclusive price online when you reserve. It covers the journey, every official supplement that applies to your route, and our service in arranging and guaranteeing the car. There is no second amount to settle: nothing at all is owed in the taxi, and you receive a receipt for the full price by email.',
          },
          {
            h2: 'What never changes your price',
            body:
              'Not the hour of the day: a 04:30 pickup for an early departure costs exactly what a two-in-the-afternoon run costs, because a fixed price carries no night rate. Not the traffic, the route your driver takes, which terminal you land at, the number of passengers up to the vehicle’s capacity, or the amount of luggage within it. Weekends and public holidays are the only thing that lifts a listed price, by one published percentage rather than a surge that moves with demand. Everything else is our risk rather than yours, which is precisely what fixing a price in advance buys.',
          },
        ],
      },
    },
  },
  {
    slug: 'hotel-transfers',
    related: ['city-to-airport', 'airport-to-city', 'neighborhoods/eixample', 'private-transfer'],
    copy: {
      en: {
        title: 'Barcelona Hotel to Airport Transfer | Door to Door',
        description:
          'Book a taxi from your Barcelona hotel to El Prat airport, or from the airport to your hotel door. Door-to-door, licensed, one fixed price paid online.',
        h1: 'Barcelona hotel to airport transfers',
        intro:
          'Most of our bookings are hotel transfers, in both directions. A door-to-door taxi removes the part of the trip people most underestimate: getting luggage from the hotel lobby to a rank, or finding the right address after a long flight.',
        sections: [
          {
            h2: 'Taxi from hotel to Barcelona airport',
            body: 'Give us the hotel name and we handle the rest. In the narrow streets of the Gothic Quarter and El Born, where cars cannot always reach the entrance, we agree the nearest accessible pickup point with you in advance rather than leaving it to chance on the day.',
          },
          {
            h2: 'Barcelona airport transfer from hotel, on arrival',
            body: 'Coming the other way, your driver meets you inside arrivals with a name sign and takes you straight to the hotel entrance. Useful with children, heavy luggage, or a late-night landing.',
          },
          {
            h2: 'Booking a hotel to Barcelona airport taxi for apartments',
            body: 'The same applies to short-term apartments and Airbnb addresses. Add the door code or specific entrance in your booking notes and your driver will have it before pickup.',
          },
          {
            h2: 'Hotels on streets a car cannot reach',
            body:
              'Parts of Barcelona are not driveable to the door. Much of the Barri Gòtic, the lanes of El Born and the narrow streets above Gràcia are pedestrianised or too tight for a taxi to wait in, and a hotel address in one of them means a meeting point a short walk away rather than at reception. Tell us the hotel by name when you book and we will set that point and put it in your confirmation, instead of leaving your driver circling a restricted block while you wait inside. For a departure from one of these addresses, allow five minutes more than the journey time suggests.',
          },
          {
            h2: 'Checking out, and where the luggage goes',
            body:
              'Hotel departures bunch: most check-outs fall between 10:00 and 12:00, which is also when the city’s traffic is at its least predictable. If your flight is in the early afternoon, book the pickup for the start of that window rather than the end of it. If you have checked out but your pickup is later, most hotels will hold luggage, and it is worth asking at reception the night before rather than on the morning. Help with the bags into and out of the boot is included in the price and never charged for, as is a reasonable wait while you settle the bill.',
          },
          {
            h2: 'Invoices for a business stay',
            body:
              'A receipt for the full amount reaches you with the confirmation email, which is usually what an expense system wants and means you are not chasing paperwork from a hotel desk at check-out. If you need a VAT invoice with company details on it, send them by email and we will issue one against the booking reference. For a stay with several transfers, ask and we will invoice them together rather than one at a time.',
          },
        ],
      },
    },
  },
  {
    slug: 'sants-station-to-airport',
    related: ['city-to-airport', 'hotel-transfers', 'barcelona-airport-taxi-price', 'neighborhoods/city-centre'],
    preset: { pickup: 'Barcelona Sants Station', dropoff: 'Barcelona El Prat Airport (BCN)' },
    copy: {
      en: {
        title: 'Taxi Sants Station to Barcelona Airport',
        description:
          'Book a taxi from Barcelona Sants railway station to El Prat airport. Around 15 minutes, one all-inclusive price including the Sants station supplement.',
        h1: 'Taxi from Sants station to Barcelona airport',
        intro:
          'Sants is Barcelona\'s main railway station and the arrival point for AVE high-speed trains from Madrid, Valencia and Seville. It is also the closest major transport hub to El Prat: the taxi run takes around 15 minutes outside rush hour.',
        sections: [
          {
            h2: 'The Sants station supplement',
            body: 'Journeys starting or ending at Sants station carry a small fixed supplement set by the AMB. Combined with the airport supplement, both are already inside the price you see before booking — there is nothing to add on afterwards.',
          },
          {
            h2: 'Where to meet your driver at Sants',
            body: 'The official taxi rank sits on the Plaça dels Països Catalans side of the station. For a pre-booked transfer we agree a precise meeting point when you book, which is worth doing at Sants — it is a large station with several exits.',
          },
          {
            h2: 'Connecting from an AVE train',
            body: 'If you are connecting from an AVE service, book your pickup for around 15 minutes after scheduled arrival to allow for platform-to-street time with luggage.',
          },
          {
            h2: 'Train or taxi from Sants to El Prat',
            body:
              'There is a Rodalies train from Sants to the airport, and for one person travelling light it is the cheapest way there by a wide margin. The conditions matter: it serves T2 directly, so T1 means the shuttle at the far end, and it runs at a frequency that is comfortable with an hour in hand and uncomfortable without. A taxi is per car rather than per head, ends at your terminal door, and takes the luggage. For two people with cases, or anyone connecting off a delayed AVE with a flight to catch, that is usually the better buy — and for one traveller with a rucksack and time to spare, it honestly is not.',
          },
          {
            h2: 'Allowing for a connection that is running late',
            body:
              'A long-distance train arriving late is the common reason a Sants transfer goes wrong, and it is the one thing we cannot track the way we track a flight. If your connection is tight, book the pickup from the scheduled arrival rather than from the platform time you hope for, and message us on WhatsApp as soon as you know the train is delayed — a pickup can be moved while the driver is still on the way. Sants has several exits onto different streets, so the meeting point in your confirmation names one specific door rather than the station, which is a building with four of them.',
          },
          {
            h2: 'Which terminal we drop you at',
            body:
              'Tell us your airline and the drop-off is at the right terminal door. That matters more from Sants than from a hotel, because the train alternative serves T2 and a T1 departure means the inter-terminal shuttle at the far end — 25 minutes door to door once you have waited for it. A taxi removes that leg entirely. T1 departures is one large hall; T2 is blocks A, B and C along the frontage, and the wrong block is a long walk with cases.',
          },
        ],
      },
    },
  },
  {
    slug: 'private-transfer',
    related: ['hotel-transfers', 'barcelona-airport-taxi-price', 'airport-to-city', '24-hour-taxi'],
    copy: {
      en: {
        title: 'Barcelona Airport Private Transfer | Your Own Taxi',
        description:
          'A private Barcelona airport transfer: your own licensed taxi, no sharing, no waiting for other passengers, one fixed price agreed before you book.',
        h1: 'Barcelona airport private transfer',
        intro:
          'Every booking here is a private transfer. The vehicle is yours alone: no shared shuttle, no detours to collect other passengers, no fixed departure slot. You travel directly from your pickup point to your destination.',
        sections: [
          {
            h2: 'Why book a private taxi from Barcelona airport',
            body: 'Shared airport shuttles are cheaper per head but collect several parties and drop them in sequence, which can add an hour to a 30-minute journey. For two or more travellers the price gap narrows sharply, and for a family with luggage a private taxi is usually both faster and simpler.',
          },
          {
            h2: 'Choosing your vehicle',
            body: 'Choose a standard taxi for up to four passengers, a Mercedes Vito minivan for six, or a V-Class for seven with luggage to match. Each has its own fixed transfer price, shown side by side before you book, so you can weigh capacity and comfort against the figure.',
          },
          {
            h2: 'Business travel and invoices',
            body: 'For business trips we can assign the premium V-Class. A full receipt for the whole amount is emailed with your confirmation, which is what expenses normally need; if you also want the official taxi invoice for the journey itself, your driver can provide it in the car.',
          },
          {
            h2: 'What “private” means here',
            body:
              'The car is yours for the journey. Nobody else is picked up, there is no pooling with another party going the same way, and no waiting at the terminal until a vehicle fills — the three things that make a cheaper airport transfer cheaper. It is a licensed Barcelona taxi with a driver assigned to your booking in advance, going from your pickup to your destination and nowhere else. That is worth paying for on a late arrival with children and worth rather less on a quiet weekday afternoon alone, and we would rather say so than imply every journey needs it.',
          },
          {
            h2: 'Parties too large for one car',
            body:
              'Above seven passengers you need more than one vehicle, and they can be booked together rather than separately. Choose several cars in a single booking and they are reserved as one party, paid in one checkout and dispatched to the same pickup point, up to six cars. Each is charged at the published price for its size, so a group of ten is two cars at list price rather than a bespoke quote — and the whole party is assigned together, which matters more than the arithmetic when ten people are standing in an arrivals hall at midnight.',
          },
          {
            h2: 'Child seats and anything unusual',
            body:
              'Child seats are not fitted as standard, so if you need one, say so in the booking notes and the right car is assigned rather than the nearest one. The same applies to anything that changes which vehicle should come: a folded wheelchair, a bicycle, skis, an instrument, or a pet. None of these is a problem given notice and all of them are a problem at the kerb, which is the whole argument for mentioning them when you book.',
          },
        ],
      },
    },
  },
  {
    slug: '24-hour-taxi',
    related: ['el-prat-airport-taxi', 'city-to-airport', 'airport-to-city', 'barcelona-airport-taxi-price'],
    copy: {
      en: {
        title: '24 Hour Taxi Barcelona Airport | Night Transfers',
        description:
          'A 24-hour Barcelona airport taxi service. Book night landings and pre-dawn departures in advance, on the official AMB night tariff.',
        h1: '24 hour Barcelona airport taxi',
        intro:
          'El Prat operates around the clock, and so does the taxi service. The hours worth booking in advance are the awkward ones: landings after midnight, and departures that need a pickup before dawn.',
        sections: [
          {
            h2: 'Airport taxi Barcelona 24 hours a day',
            body: 'A night pickup costs the same as the same journey at midday: the hour does not move a fixed price. Weekends and public holidays do — Saturday and Sunday, Christmas, New Year and the Catalan calendar each add 7.5%, shown as its own line before you pay rather than discovered later. Christmas Eve and New Year\'s Eve nights carry an additional official supplement.',
          },
          {
            h2: 'Late night arrivals',
            body: 'If your flight lands at 01:00, the rank at El Prat still operates, but coverage thins as the night goes on. A booked car with your flight number attached is the difference between walking straight out and waiting.',
          },
          {
            h2: 'Pre-dawn departures',
            body: 'Pickups from 04:00 are routine for us. Book the evening before at the latest, and your driver is confirmed to you by email so there is nothing left to arrange at that hour.',
          },
          {
            h2: 'The hour of the day does not change the price',
            body:
              'A 03:00 pickup costs what the same journey costs at three in the afternoon. That is unusual enough to be worth stating plainly: a fixed price carries no night rate, so there is no band you cross at 20:00 and no surcharge that appears at the end of a journey you took at an inconvenient time. Weekends and public holidays add one published percentage and nothing else moves it. Three nights of the year do carry an additional regulated supplement — Christmas Eve, New Year’s Eve and the night of Sant Joan on 23 June — and on those nights a booked price with the supplement already inside it is worth more than usual.',
          },
          {
            h2: 'The gap after the buses stop',
            body:
              'Between the last Aerobús and the first morning metro, the public options collapse to a thin night-bus network, and the rank becomes the default. On an ordinary night the rank at T1 is well supervised and moves quickly. It goes wrong when three delayed flights land into that window together: the queue is then forty people long and the supply of taxis at 02:00 is thin, because drivers are not waiting at a terminal on the off chance. That is the scenario where arriving with a car already assigned is worth clearly more than it costs, and it is worth deciding before you fly rather than in the hall.',
          },
          {
            h2: 'Booking a pickup for the middle of the night',
            body:
              'A 03:00 or 04:30 pickup is confirmed the same way as any other, and we confirm the assigned driver the evening before so there is no uncertainty at the time of day when uncertainty is worst. Give a mobile number that will be switched on, and for an airport collection the flight number — a night arrival is the one most likely to land late, and tracking it is what keeps the car there.',
          },
        ],
      },
    },
  },
  {
    slug: 'neighborhoods/gothic-quarter',
    related: ['hotel-transfers', 'city-to-airport', 'neighborhoods/city-centre', 'neighborhoods/eixample'],
    copy: {
      en: {
        title: 'Taxi Gothic Quarter to Barcelona Airport',
        description:
          'Book a taxi from the Gothic Quarter to Barcelona airport. We agree an accessible pickup point in advance — most Barri Gòtic streets are too narrow for cars.',
        h1: 'Taxi from the Gothic Quarter to Barcelona airport',
        intro:
          'The Barri Gòtic is the part of Barcelona where booking ahead genuinely changes the experience. Most of the quarter is pedestrianised or too narrow for a car, so the question is not when your taxi arrives but where it can actually reach you.',
        sections: [
          {
            h2: 'Pickup points that work in the Barri Gòtic',
            body: 'We agree a specific accessible point when you book — typically Via Laietana, Plaça de la Catedral, Passeig de Colom or the Rambla side, depending on your address. Your driver waits there and helps with luggage from the corner, rather than circling streets they cannot enter.',
          },
          {
            h2: 'Journey time from the Gothic Quarter to El Prat',
            body: 'From the Gothic Quarter to the airport is around 20 to 30 minutes outside peak hours, using the Ronda Litoral. Allow longer on weekday mornings and when a cruise ship is turning around at the port.',
          },
          {
            h2: 'Arriving into the quarter from the airport',
            body: 'Coming from the airport, the same constraint applies in reverse. Give us the street address and we will get you as close as vehicles are permitted, then point you the short walk to the door.',
          },
          {
            h2: 'Luggage over the cobbles',
            body:
              'The walk from a vehicle to a Gothic Quarter address is almost always over stone setts, and often up a flight of stairs at the far end. It is a short walk and an awkward one with two large cases, which is the single thing most worth planning for here. Where the address allows it we set the meeting point on the nearest street a car can legally stop on rather than the nearest point on a map, because those are not the same in the Barri Gòtic. Help with the bags to and from the car is included; the stairs inside the building are not something any transfer can solve.',
          },
          {
            h2: 'Getting out of the quarter for an early flight',
            body:
              'For a dawn departure the quarter is quiet, the streets are empty and the journey to El Prat is at its fastest — 20 to 25 minutes rather than the 30 to 35 it takes at nine in the morning. What is not easy at 04:30 is finding a taxi. Hailing one in a pedestrianised lane before dawn does not work, and the nearest rank is a walk with luggage. This is the clearest case on the whole site for booking rather than improvising, and the price is the same as the same journey at noon.',
          },
        ],
      },
    },
  },
  {
    slug: 'neighborhoods/eixample',
    related: ['hotel-transfers', 'city-to-airport', 'neighborhoods/city-centre', 'private-transfer'],
    copy: {
      en: {
        title: 'Taxi Eixample to Barcelona Airport | Door to Door',
        description:
          'Book a taxi from Eixample to Barcelona El Prat airport. Straightforward door-to-door pickup on the grid, at one fixed price.',
        h1: 'Taxi from Eixample to Barcelona airport',
        intro:
          'Eixample is the easiest district in Barcelona for a taxi pickup. Cerdà\'s grid means almost every address is directly reachable by car, with room to stop and load luggage — the opposite of the old town.',
        sections: [
          {
            h2: 'Door-to-door pickup across the Eixample grid',
            body: 'Give us the street and number and your driver will be at the door. The chamfered corners of the Eixample blocks make convenient, safe loading points if your exact address falls on a busy stretch of Aragó or Balmes.',
          },
          {
            h2: 'Journey time from Eixample to El Prat',
            body: 'From Eixample to El Prat is typically 25 to 35 minutes. From the Dreta de l\'Eixample and the Sagrada Família end, add a little; from Sants-adjacent blocks near Plaça d\'Espanya, subtract a little.',
          },
          {
            h2: 'Hotels on Passeig de Gràcia',
            body: 'Eixample holds a large share of Barcelona\'s hotels, including most of the Passeig de Gràcia properties. Enter the hotel name rather than the address and we will match it.',
          },
          {
            h2: 'Which corner of the block to stand on',
            body:
              'The Eixample grid makes a pickup easy and a meeting point ambiguous: a single block has four corners, each on a different street, and a building number can sit a hundred metres from the junction a driver is waiting at. Give the full street address when you book rather than the junction, and your driver comes to the door. Where the chamfered corner is the only legal place to stop — on the busier crossings of Aragó, Balmes and Gran Via it often is — the confirmation names which one.',
          },
          {
            h2: 'Traffic out of the Eixample, by time of day',
            body:
              'The run to El Prat from the Eixample is 25 to 35 minutes for most of the day and noticeably worse twice: weekday mornings between 08:00 and 09:30, when the Gran Via and the Ronda carry commuter traffic in both directions, and Friday afternoons from about 17:00. From the Sagrada Família end of the district add five to ten minutes on top; from blocks near Plaça d’Espanya subtract about the same. A fixed price absorbs all of that — the figure does not move with the traffic — but your departure time still has to allow for it.',
          },
        ],
      },
    },
  },
  {
    slug: 'neighborhoods/city-centre',
    related: ['neighborhoods/gothic-quarter', 'neighborhoods/eixample', 'city-to-airport', 'hotel-transfers'],
    copy: {
      en: {
        title: 'Taxi Barcelona City Centre to Airport',
        description:
          'Book a taxi from Barcelona city centre to El Prat airport. Pickup from any central address, one all-inclusive price, driver confirmed in advance.',
        h1: 'Taxi from Barcelona city centre to the airport',
        intro:
          'From anywhere central — the Rambla, Plaça de Catalunya, El Born, the Raval or Passeig de Gràcia — El Prat is a 20 to 35 minute drive. Booking ahead fixes the pickup time and the car, which matters most on the outbound leg.',
        sections: [
          {
            h2: 'Central pickup points',
            body: 'Wide central streets allow door pickup directly. For addresses inside pedestrianised zones we agree the nearest accessible corner when you book, so nothing has to be improvised on the day.',
          },
          {
            h2: 'Traffic and timing from the centre',
            body: 'Weekday mornings between 08:00 and 09:30 and evenings from 18:00 slow the Ronda routes noticeably. Our estimate includes a realistic journey time, but for an early flight book the pickup with a margin.',
          },
          {
            h2: 'What a city centre to airport taxi costs',
            body: 'One fixed price from anywhere in the centre to El Prat, with every official supplement already inside it and nothing to pay in the taxi. The hour does not change it; weekends and public holidays add 7.5%. Enter your address to see your exact price before you commit.',
          },
          {
            h2: 'What counts as the centre for the fixed price',
            body:
              'All of it, and a good deal more. The list price covers any address within 16 km of the terminal measured in a straight line, and the furthest point in Barcelona proper is Park Güell at 14.3 km. So the distinction between the Gothic Quarter, the Eixample, Gràcia, Sants and the Barceloneta does not exist as far as the price is concerned: they are one figure. What does differ between them is the journey time and whether a car can reach the door, which is why the address matters even when the price does not.',
          },
          {
            h2: 'Where a car can actually stop',
            body:
              'The centre contains the two awkward cases on this site: streets that are pedestrianised outright, and streets narrow enough that stopping blocks them. In both, the meeting point is the nearest street a taxi can legally wait on, named in your confirmation rather than left to be worked out on the day. For an arrival that means a driver standing in a known place with a sign; for a departure it means a short walk with the bags, and five minutes more than the journey time alone suggests.',
          },
          {
            h2: 'Arriving into the centre late at night',
            body:
              'After about 23:30 the centre is the easiest part of the city to be driven into and the hardest to walk across with luggage: the metro is closing, the streets around the Rambla are busy in a way that slows a car, and the final hundred metres over setts is done in the dark. A booked car ends at the nearest point to your door rather than at a rank, and the driver has the address before you land. The price is the same figure as the same journey at noon.',
          },
        ],
      },
    },
  },
  {
    slug: 'book-online',
    related: ['barcelona-airport-taxi-price', 'airport-to-city', 'city-to-airport', 'private-transfer'],
    copy: {
      en: {
        title: 'Book Airport Taxi Barcelona Online | Instant Price',
        description:
          'Book a Barcelona airport taxi online in minutes. Instant fixed all-inclusive price, secure payment and an email confirmation straight away.',
        h1: 'Book an airport taxi in Barcelona online',
        intro:
          'Booking online takes a couple of minutes and gives you a confirmed car with an assigned driver. You pay one all-inclusive price online, and owe nothing at all in the taxi.',
        sections: [
          {
            h2: 'What you need to book a taxi to Barcelona airport',
            body: 'Your pickup address, your destination, the date and time, and a contact phone number. For airport pickups add your flight number so your driver can track the landing. Bookings need at least three hours notice; for anything sooner, message us on WhatsApp.',
          },
          {
            h2: 'After your Barcelona airport taxi booking is placed',
            body: 'You receive a confirmation email immediately, with your route, vehicle, fare estimate and a receipt for what you paid online. A driver is then assigned and their details are sent to you before the trip.',
          },
          {
            h2: 'Changes and cancellations',
            body: 'Plans change. Cancel at least 24 hours before pickup and you are refunded in full. To move a booking, reply to your confirmation email and we will reschedule it.',
          },
          {
            h2: 'What to have in front of you',
            body:
              'A full address rather than a district, the number of passengers, and how many suitcases you are actually carrying — the last of which matters more than people expect, because a four-seat car takes four passengers but only about three cases. If you are arriving by air, your flight number: it is optional, but with it we track the real landing and move the pickup automatically, so a delay costs you nothing and you do not have to guess at a safe time weeks in advance. A mobile number reachable on the day completes the set, since it is how your driver reaches you if the arrivals hall defeats you both.',
          },
          {
            h2: 'Why the form asks for three hours’ notice',
            body:
              'Online bookings need at least three hours before the pickup, and the reason is a driver rather than a system: assigning a specific car and person to a specific time reliably takes longer than assigning one in the abstract. Inside three hours the honest answer is to message us on WhatsApp, where we can check what is actually available and confirm a car directly, or tell you straight away that there is not one. That is a worse experience than the form and a better one than a confirmation we cannot keep.',
          },
          {
            h2: 'How you pay, and what you get back',
            body:
              'The whole amount is paid online when you book, by credit card, debit card or Bizum. There is no deposit-and-balance split and nothing at all is owed to the driver in the car — no fare, no supplement, no tip expected. A receipt for the full amount is emailed with your confirmation, so the paperwork for an expense claim arrives before the trip rather than after it. If you also need the regulated taxi invoice for the journey itself, your driver can issue it on request.',
          },
        ],
      },
    },
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

/**
 * Translated long-form copy, kept in per-locale modules so this file stays
 * readable. A locale with no entry for a page falls back to English rather
 * than rendering a blank section.
 */
const TRANSLATIONS: Record<string, Record<string, LandingCopy>> = {
  es: ES_LANDING_COPY,
  ca: CA_LANDING_COPY,
  fr: FR_LANDING_COPY,
  de: DE_LANDING_COPY,
  it: IT_LANDING_COPY,
  pt: PT_LANDING_COPY,
  nl: NL_LANDING_COPY,
  ru: RU_LANDING_COPY,
  zh: ZH_LANDING_COPY,
};

export function getLandingCopy(page: LandingPage, locale: string): LandingCopy {
  return (
    TRANSLATIONS[locale]?.[page.slug] ??
    page.copy[locale] ??
    page.copy.en
  );
}

/** Locales with a full translation of a given page — used for hreflang sanity. */
export function translatedLocales(slug: string): string[] {
  return Object.entries(TRANSLATIONS)
    .filter(([, pages]) => slug in pages)
    .map(([locale]) => locale);
}

export const LANDING_SLUGS = LANDING_PAGES.map((p) => p.slug);
