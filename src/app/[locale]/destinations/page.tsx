import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/reveal';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { DESTINATION_GROUPS, FEATURED_DESTINATIONS, type Destination } from '@/lib/destinations';
import { CONTACT_EMAIL, whatsappLink } from '@/lib/site';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/destinations`;
  return {
    title: { absolute: 'Barcelona Transfer Destinations | Private Taxi & Minivan' },
    description:
      'Private taxi and minivan transfers from Barcelona airport, city, cruise port and hotels to Costa Brava, Sitges, Tarragona, Montserrat, Andorra, Valencia and beyond.',
    alternates: { canonical: `/${locale}/destinations`, languages },
  };
}

const COVERAGE = [
  'Barcelona Airport pickup and drop-off',
  'Cruise port transfers from Barcelona terminals',
  'Hotel pickup for families, couples and business travellers',
  'Private address pickup in Barcelona and nearby towns',
  '4–8 seat vehicles and minivans with luggage space',
  'Fixed price confirmed before you travel',
];

function DestinationCard({ d }: { d: Destination }) {
  const quoteText = `Hi, I would like a quote for a Barcelona transfer to ${d.name.replace('Barcelona to ', '').replace('Barcelona Airport to ', '')}.`;

  const meta =
    d.km && d.minutes ? `${d.km} km · about ${Math.round(d.minutes / 5) * 5} min` : null;

  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            d.hasPage ? 'bg-accent/15 text-accent-text' : 'bg-slate-200 text-slate-700'
          }`}
        >
          {d.hasPage ? 'Route page' : 'On request'}
        </span>
        {d.featured && (
          <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-accent">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-accent-text">
        {d.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.blurb}</p>
      {meta && <p className="mt-3 font-mono text-xs text-muted">{meta}</p>}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent-text">
        {d.hasPage ? 'View route' : 'Ask for a quote'}
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="m7.5 4 6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
        </svg>
      </span>
    </>
  );

  const className =
    'lift group flex h-full flex-col rounded-card border border-hairline bg-white p-6 hover:border-accent';

  return d.hasPage ? (
    <Link href={`/destinations/${d.slug}`} className={className}>
      {inner}
    </Link>
  ) : (
    <a
      href={whatsappLink(quoteText)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
}

export default async function DestinationsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Destinations', url: `/${locale}/destinations` },
        ]}
      />

      {/* Hero */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Route hub
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-porcelain sm:text-5xl">
            Barcelona transfer destinations
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-porcelain/75">
            Private taxi and minivan transfers from Barcelona airport, the city, the cruise
            port, hotels and private addresses to destinations across Catalonia, Andorra and
            Spain.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink('Hi, I would like a quote for a Barcelona transfer.')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-accent px-6 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep"
            >
              Ask on WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-xl border-2 border-white/25 px-6 py-3.5 font-display font-bold text-porcelain transition hover:bg-white/10"
            >
              Email us
            </a>
            <Link
              href="/book"
              className="rounded-xl border-2 border-white/25 px-6 py-3.5 font-display font-bold text-porcelain transition hover:bg-white/10"
            >
              Book an airport transfer
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="border-b border-hairline bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Routes for airports, ports, hotels and groups
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">
              Choose a route page below, or ask us for a fixed quote to anywhere else. We
              confirm the vehicle, the pickup plan and the price before your trip.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COVERAGE.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 3) * 70}>
                <span className="flex items-start gap-2.5 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-text"
                  >
                    <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                      <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
                    </svg>
                  </span>
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing note — these routes genuinely cannot be metered. */}
      <div className="mx-auto max-w-6xl px-4 pt-12">
        <p className="rounded-card border-2 border-accent/40 bg-accent/5 p-5 text-sm leading-relaxed">
          <strong>How these are priced.</strong> AMB meter tariffs cover the Barcelona
          metropolitan area only. Every destination on this page lies beyond it, so these
          journeys run on the interurban tariff set by the Generalitat de Catalunya:{' '}
          <strong>T-6</strong> on weekdays between 08:00 and 20:00, and the higher{' '}
          <strong>T-7</strong> at night, at weekends and on holidays. Enter your addresses in
          the booking form for an exact price, or ask us for a written fixed quote including
          waiting time.
        </p>
      </div>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Featured routes</h2>
          <p className="mt-3 max-w-2xl text-muted">
            The transfers we are asked for most, each with its own route page.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_DESTINATIONS.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 4) * 70} className="flex">
              <DestinationCard d={d} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Groups */}
      {DESTINATION_GROUPS.map((group) => (
        <section
          key={group.slug}
          className="border-t border-hairline py-14 odd:bg-white"
        >
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                {group.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{group.intro}</p>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.destinations.map((d, i) => (
                <Reveal as="li" key={d.slug} delay={(i % 3) * 70} className="flex">
                  <DestinationCard d={d} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
