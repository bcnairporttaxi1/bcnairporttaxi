import { CONTACT_EMAIL, LEGAL, SITE_URL, WHATSAPP_NUMBER, absoluteUrl } from '@bcn/core/site';
import { TARIFFS } from '@bcn/core/tariffs';

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
  const languages = ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'];
  const f = TARIFFS.fixedRoutes;

  /** Every fixed price actually published, as offers a machine can read. */
  const offers = [
    ['Standard taxi, airport to Barcelona', f.cityAirport.sedan],
    ['Six-seat minivan, airport to Barcelona', f.cityAirport.van6],
    ['Seven-seat van, airport to Barcelona', f.cityAirport.van7],
    ['Standard taxi, airport to cruise port', f.portAirport.sedan],
    ['Six-seat minivan, airport to cruise port', f.portAirport.van6],
    ['Seven-seat van, airport to cruise port', f.portAirport.van7],
  ].map(([name, price]) => ({
    '@type': 'Offer',
    name,
    price: (price as number).toFixed(2),
    priceCurrency: TARIFFS.currency,
    availability: 'https://schema.org/InStock',
    url: absoluteUrl(`/${locale}/book`),
  }));

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            /*
             * The business. LocalBusiness rather than Organization because
             * that is the type on which the trading facts below are defined,
             * and there is no taxi subtype in the vocabulary.
             */
            '@type': 'LocalBusiness',
            '@id': `${SITE_URL}/#provider`,
            name: 'BCNAirportTaxi',
            url: SITE_URL,
            email: CONTACT_EMAIL,
            image: absoluteUrl('/img/hero-banner.jpg'),
            logo: { '@type': 'ImageObject', url: absoluteUrl('/img/logo.png') },
            description:
              'Online booking service for licensed Barcelona airport taxis to and from El Prat, at fixed all-inclusive prices paid online.',
            ...(WHATSAPP_NUMBER && WHATSAPP_NUMBER !== '34600000000'
              ? { telephone: `+${WHATSAPP_NUMBER}` }
              : {}),
            /*
             * Barcelona, without a street. The company has no public
             * shopfront, and the previous coordinates were the airport's,
             * which asserted it operates from inside the terminal. An
             * invented street address is worse than none.
             */
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Barcelona',
              addressRegion: 'Catalonia',
              addressCountry: 'ES',
              ...(LEGAL.address ? { streetAddress: LEGAL.address } : {}),
            },
            ...(LEGAL.company ? { legalName: LEGAL.company } : {}),
            ...(LEGAL.vatId ? { vatID: LEGAL.vatId } : {}),
            priceRange: `${TARIFFS.currency} ${f.cityAirport.sedan.toFixed(0)}-${f.portAirport.van7.toFixed(0)}`,
            currenciesAccepted: TARIFFS.currency,
            // No cash. The whole price is taken online and nothing is
            // collected in the car, so listing it contradicted the product.
            paymentAccepted: 'Credit Card, Debit Card, Bizum',
            knowsLanguage: languages,
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday', 'Sunday',
              ],
              opens: '00:00',
              closes: '23:59',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'reservations',
              email: CONTACT_EMAIL,
              availableLanguage: languages,
              ...(WHATSAPP_NUMBER && WHATSAPP_NUMBER !== '34600000000'
                ? { telephone: `+${WHATSAPP_NUMBER}` }
                : {}),
            },
          },
          {
            /*
             * What is sold. A Service carries no place or trading facts, so
             * it carries none: provider, where it runs, how to buy it, when,
             * and at what price.
             */
            '@type': 'TaxiService',
            '@id': `${SITE_URL}/#service`,
            name: 'Barcelona airport and cruise port taxi transfers',
            serviceType: 'Fixed-price airport transfer',
            provider: { '@id': `${SITE_URL}/#provider` },
            // Where a search engine should believe we operate. The radius is
            // the operating area, not the flat-price zone — those are
            // different facts and conflating them misstates both.
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
              { '@type': 'Airport', name: 'Josep Tarradellas Barcelona-El Prat Airport', iataCode: 'BCN' },
              { '@type': 'Place', name: 'Barcelona Cruise Port, Moll Adossat' },
              { '@type': 'AdministrativeArea', name: 'Catalonia' },
              {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 41.3874,
                  longitude: 2.1686,
                },
                geoRadius: '120000',
              },
            ],
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: TARIFFS.currency,
              lowPrice: f.cityAirport.sedan.toFixed(2),
              highPrice: f.portAirport.van7.toFixed(2),
              offerCount: offers.length,
              availability: 'https://schema.org/InStock',
              offers,
            },
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: absoluteUrl(`/${locale}/book`),
              availableLanguage: languages,
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
          },
        ],
      }}
    />
  );
}

/**
 * The site and the company as named entities.
 *
 * Rendered once per page beside the service markup. Both carry an `@id` so
 * the service node can reference them instead of repeating itself, which is
 * what lets a crawler merge the three into one understanding of the business.
 */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'BCNAirportTaxi',
            inLanguage: ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'],
            publisher: { '@id': `${SITE_URL}/#provider` },
          },
        ],
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
        provider: { '@id': `${SITE_URL}/#provider` },
        areaServed: { '@type': 'City', name: 'Barcelona' },
      }}
    />
  );
}
