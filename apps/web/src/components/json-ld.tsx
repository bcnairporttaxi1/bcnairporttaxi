import { CONTACT_EMAIL, SITE_URL, WHATSAPP_NUMBER, absoluteUrl } from '@bcn/core/site';

/**
 * Structured data. Rendered as a plain script tag rather than via a library so
 * the payload stays inspectable and adds no client JavaScript.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own constants, never from user input.
      dangerouslySetInnerHTML={{ __html: serialise(data) }}
    />
  );
}

/**
 * JSON for a <script> block.
 *
 * A literal `</script>` anywhere in the data would close the tag early and
 * let whatever follows be parsed as markup. None of the current callers pass
 * anything a visitor wrote, but this sits one careless prop away from doing
 * so, and escaping the angle bracket costs nothing.
 */
function serialise(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function OrganizationJsonLd({ locale }: { locale: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        '@id': `${SITE_URL}/#organization`,
        name: 'BCNAirportTaxi',
        url: absoluteUrl(`/${locale}`),
        description:
          'Online booking service for licensed Barcelona airport taxis to and from El Prat, priced on official AMB tariffs.',
        // A search engine deciding whether we serve a given query needs to
        // know where. City alone under-describes a business whose whole
        // proposition is airport-to-anywhere, so the radius covers the
        // metropolitan area and the named places are the routes we sell.
        areaServed: [
          {
            '@type': 'City',
            name: 'Barcelona',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Barcelona',
              addressRegion: 'Catalonia',
              addressCountry: 'ES',
            },
          },
          { '@type': 'Place', name: 'Josep Tarradellas Barcelona-El Prat Airport' },
          { '@type': 'Place', name: 'Barcelona Cruise Port' },
          { '@type': 'AdministrativeArea', name: 'Catalonia' },
        ],
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 41.3874,
            longitude: 2.1686,
          },
          geoRadius: '120000',
        },
        // Where the airport actually is, which is the anchor for "taxi near
        // me" style queries arriving at the terminal.
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 41.2974,
          longitude: 2.0833,
        },
        // Fares are regulated, so this is a fact rather than a positioning
        // claim: the meter is the meter whoever you ride with.
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Debit Card, Bizum',
        knowsLanguage: ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'reservations',
          email: CONTACT_EMAIL,
          availableLanguage: ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'],
          // Deliberately no telephone: the only number configured is a
          // placeholder, and a fake contact number in structured data is
          // worse than none at all.
          ...(WHATSAPP_NUMBER && WHATSAPP_NUMBER !== '34600000000'
            ? { telephone: `+${WHATSAPP_NUMBER}` }
            : {}),
        },
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#provider`,
          name: 'BCNAirportTaxi',
          url: SITE_URL,
          email: CONTACT_EMAIL,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/img/logo.png'),
          },
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: absoluteUrl(`/${locale}/book`),
          availableLanguage: ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'],
        },
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday', 'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.url),
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Airport taxi transfer',
        name,
        description,
        url: absoluteUrl(url),
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Barcelona' },
      }}
    />
  );
}
