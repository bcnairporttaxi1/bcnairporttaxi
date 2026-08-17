import { SITE_URL, absoluteUrl } from '@/lib/site';

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
        areaServed: {
          '@type': 'City',
          name: 'Barcelona',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Barcelona',
            addressRegion: 'Catalonia',
            addressCountry: 'ES',
          },
        },
        provider: {
          '@type': 'Organization',
          name: 'BCNAirportTaxi',
          url: SITE_URL,
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
