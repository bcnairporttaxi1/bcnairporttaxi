/**
 * Legal page content.
 *
 * Written to match how the service actually operates: we are a booking
 * intermediary, the transport itself is performed by an independent licensed
 * driver, and we collect one all-inclusive price for the booking. Have a
 * Spanish lawyer review
 * these before launch — they are drafted, not certified.
 */
export interface LegalSection {
  h2: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const OPERATOR_NOTE =
  'BCNAirportTaxi is a booking intermediary. We arrange journeys with licensed Barcelona taxi drivers; we do not operate taxis ourselves and we do not set fares.';

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description:
      'The terms governing bookings made through BCNAirportTaxi, including how the price is set, how it is paid, and cancellation.',
    h1: 'Terms of service',
    updated: '10 August 2026',
    intro: OPERATOR_NOTE,
    sections: [
      {
        h2: 'What we provide',
        paragraphs: [
          'We provide an online service that lets you reserve a licensed Barcelona taxi in advance, gives you a fixed all-inclusive price calculated from the official AMB tariff, and assigns a driver to your journey.',
          'The transport itself is provided by an independent licensed taxi driver. Your contract for the journey is with that driver, under the regulated conditions that apply to all Barcelona taxis.',
        ],
      },
      {
        h2: 'Prices and payment',
        paragraphs: [
          'You pay a single all-inclusive price, quoted before you book and collected by us online at the time of booking. It covers the journey, every official supplement that applies to your route, and our service in arranging, confirming and supporting the reservation. Nothing further is owed to the driver in the vehicle.',
          'The price is calculated from the official AMB tariff and the real road distance of your route, and is fixed once your booking is confirmed. Variations in traffic or routing do not change what you pay.',
          'We settle the journey with the licensed driver ourselves. You receive a receipt for the full amount by email with your confirmation; the official taxi meter invoice for the journey remains available from the driver on request.',
        ],
      },
      {
        h2: 'Making a booking',
        paragraphs: [
          'Bookings require at least three hours notice before the pickup time. For journeys sooner than that, contact us on WhatsApp and we will confirm a vehicle directly if one is available.',
          'At launch, pickups must be within Barcelona city or at El Prat airport. Destinations may be anywhere.',
          'Your booking is confirmed once payment is complete. You will receive a confirmation email with your route, vehicle, price and booking reference.',
        ],
      },
      {
        h2: 'Cancellation',
        paragraphs: [
          'You may cancel free of charge up to 24 hours before your pickup time, and you are refunded in full.',
          'Cancellations within 24 hours of pickup, and no-shows, are not refunded, because a driver has been committed to your journey. See our refund policy for the full detail.',
        ],
      },
      {
        h2: 'Delays and no-shows',
        paragraphs: [
          'For airport pickups we track your flight number and adjust to a delayed landing at no extra cost.',
          'If you are not at the agreed pickup point and cannot be reached, the driver will wait a reasonable period before releasing the booking. Waiting time beyond that is charged on the meter at the official AMB waiting rate.',
        ],
      },
      {
        h2: 'Liability',
        paragraphs: [
          'Our responsibility is limited to arranging your booking correctly. Where we fail to do so — for example a driver is not assigned — we refund your payment in full.',
          'Liability for the journey itself, including punctuality, conduct and property, rests with the licensed taxi operator, who carries the insurance required by Barcelona taxi regulations.',
        ],
      },
      {
        h2: 'Governing law',
        paragraphs: [
          'These terms are governed by Spanish law, and disputes fall to the courts of Barcelona. Nothing here limits the statutory rights you hold as a consumer under Spanish and EU law.',
        ],
      },
    ],
  },

  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How BCNAirportTaxi collects, uses and protects your personal data under the GDPR, including location data during a live trip.',
    h1: 'Privacy policy',
    updated: '10 August 2026',
    intro:
      'This policy explains what personal data we collect when you book a taxi through this site, why we hold it, and the rights you have over it under the GDPR.',
    sections: [
      {
        h2: 'What we collect',
        paragraphs: [
          'Booking details: your name, email address, phone number, pickup and drop-off addresses, travel date and time, passenger and luggage counts, and any notes you add.',
          'Payment data: we receive a payment reference and status from our payment provider. Card numbers are handled by the provider and never reach our systems.',
          'Location data: while a trip is active, and only then, we process the live position of the driver and — if you grant permission — your own, so that each can find the other. Pings are retained briefly for support purposes and then deleted.',
          'Technical data: essential cookies needed to run the site. Analytics cookies are set only if you consent to them.',
        ],
      },
      {
        h2: 'Why we hold it',
        paragraphs: [
          'To perform the booking contract with you: arranging the journey, assigning a driver, and sending confirmations.',
          'To meet legal obligations, including tax and accounting records for the booking fee.',
          'With your consent, for analytics that help us improve the service. You may withdraw that consent at any time.',
        ],
      },
      {
        h2: 'Who we share it with',
        paragraphs: [
          'The driver assigned to your journey receives your name, phone number and pickup details — the minimum needed to collect you.',
          'Our processors: a database host, an email provider, a payment provider, and the mapping and routing services used to calculate your route. Each processes data only on our instructions.',
          'We do not sell personal data, and we do not share it for advertising.',
        ],
      },
      {
        h2: 'How long we keep it',
        paragraphs: [
          'Booking records are retained for the period required by Spanish tax law. Location pings are deleted shortly after a trip completes. Chat messages are kept for the duration of the booking plus a short support window.',
        ],
      },
      {
        h2: 'Your rights',
        paragraphs: [
          'You may request access to your data, correct it, ask for its deletion, object to processing, or request it in portable form. Write to us and we will respond within one month.',
          'You also have the right to complain to the Agencia Española de Protección de Datos.',
        ],
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    description:
      'The cookies BCNAirportTaxi uses, which are essential, which require consent, and how to change your choice.',
    h1: 'Cookie policy',
    updated: '10 August 2026',
    intro:
      'We keep cookies to a minimum. Nothing beyond what is strictly necessary is set unless you agree to it first.',
    sections: [
      {
        h2: 'Essential cookies',
        paragraphs: [
          'These make the site work and cannot be switched off: your language preference, your session if you sign in, and a record of your cookie choice so we stop asking.',
        ],
      },
      {
        h2: 'Analytics cookies',
        paragraphs: [
          'If you accept them, these tell us which pages are used and where people abandon a booking, in aggregate. They are not set unless you choose "Accept all", and no analytics or marketing script loads before that point.',
        ],
      },
      {
        h2: 'Changing your mind',
        paragraphs: [
          'Clear this site\'s data in your browser settings and the consent banner will appear again on your next visit, letting you make a different choice.',
        ],
      },
    ],
  },

  'refund-policy': {
    slug: 'refund-policy',
    title: 'Refund Policy',
    description:
      'When the BCNAirportTaxi booking fee is refunded: cancellations, no-shows, and cases where no driver could be assigned.',
    h1: 'Refund policy',
    updated: '10 August 2026',
    intro:
      'This policy covers the booking fee, which is the only amount we collect. The metered fare is paid to your driver in the taxi and is not ours to refund.',
    sections: [
      {
        h2: 'Cancelling in good time',
        paragraphs: [
          'Cancel more than 24 hours before your pickup time and we refund the booking fee in full, to the original payment method, normally within five to ten working days.',
        ],
      },
      {
        h2: 'Late cancellations and no-shows',
        paragraphs: [
          'Cancellations inside 24 hours of pickup are not refunded, because a driver has already been committed to your journey.',
          'If you do not appear at the pickup point and cannot be reached, the booking is treated as a no-show and the fee is not refunded.',
        ],
      },
      {
        h2: 'When we refund automatically',
        paragraphs: [
          'If we cannot assign a driver, if the vehicle fails to arrive, or if we cancel your booking for any reason, the booking fee is refunded in full without you having to ask.',
          'If a genuine error in our fare estimate materially misled you — for example the wrong tariff was applied — contact us and we will correct it and refund the difference in the fee.',
        ],
      },
      {
        h2: 'Flight delays',
        paragraphs: [
          'A delayed flight is not a cancellation. We track your flight number and move the pickup, at no extra charge. If your flight is cancelled outright, tell us as soon as you know and we will refund the fee in full.',
        ],
      },
      {
        h2: 'How to request a refund',
        paragraphs: [
          'Reply to your confirmation email with your booking reference. We aim to answer within one working day.',
        ],
      },
    ],
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS);
