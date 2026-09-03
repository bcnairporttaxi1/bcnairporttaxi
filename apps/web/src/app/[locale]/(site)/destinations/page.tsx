import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/reveal';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { DESTINATION_GROUPS, FEATURED_DESTINATIONS, type Destination } from '@bcn/core/destinations';
import { destinationMotif, destinationPhoto } from '@bcn/core/destination-photos';
import { DestinationCover } from '@/components/destination-cover';
import { CONTACT_EMAIL, whatsappLink } from '@bcn/core/site';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'destinations' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/destinations`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/destinations`;
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/destinations`, languages },
  };
}

/** Strips the routing prefix so copy can name the place on its own. */
const placeOf = (name: string) =>
  name.replace('Barcelona to ', '').replace('Barcelona Airport to ', '');

type Copy = Awaited<ReturnType<typeof getTranslations<'destinations'>>>;

function DestinationCard({ d, t }: { d: Destination; t: Copy }) {
  const place = placeOf(d.name);
  const photo = destinationPhoto(d.slug);

  const inner = (
    <>
      {/* Every card leads with something. Only eleven destinations have a
          licensed photograph; the rest get a drawn cover carrying the distance
          and drive time, rather than opening straight on a badge and looking
          unfinished next to the ones that do. */}
      <div className="zoom-frame -mx-6 -mt-6 mb-5 overflow-hidden">
        {photo ? (
          <Image
            src={photo.file}
            alt={t('photoAlt', { place })}
            width={1200}
            height={800}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-[3/2] w-full object-cover"
          />
        ) : (
          <DestinationCover
            motif={destinationMotif(d.slug)}
            className="aspect-[3/2] w-full"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            d.hasPage
              ? 'border border-gold/25 bg-gold/[0.09] text-gold'
              : 'border border-line-2 bg-white/[0.05] text-dim'
          }`}
        >
          {d.hasPage ? t('badgeRoutePage') : t('badgeOnRequest')}
        </span>
        {d.featured && (
          <span className="rounded-full bg-void px-2.5 py-1 text-xs font-bold text-gold">
            {t('badgeFeatured')}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-gold">
        {d.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-dim">{d.blurb}</p>
      {d.km && d.minutes && (
        <p className="mt-3 font-mono text-xs text-dim">
          {t('cardMeta', { km: d.km, min: Math.round(d.minutes / 5) * 5 })}
        </p>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold">
        {d.hasPage ? t('ctaViewRoute') : t('ctaAskQuote')}
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="m7.5 4 6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
        </svg>
      </span>
    </>
  );

  const className =
    'lift group flex h-full flex-col overflow-hidden rounded-card border border-line bg-raise p-6 hover:border-gold';

  return d.hasPage ? (
    <Link href={`/destinations/${d.slug}`} className={className}>
      {inner}
    </Link>
  ) : (
    <a
      href={whatsappLink(t('waQuoteTo', { place }))}
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
  const t = await getTranslations('destinations');

  const coverage = [
    t('coverage1'),
    t('coverage2'),
    t('coverage3'),
    t('coverage4'),
    t('coverage5'),
    t('coverage6'),
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('crumbHome'), url: `/${locale}` },
          { name: t('crumbDestinations'), url: `/${locale}/destinations` },
        ]}
      />

      {/* Hero */}
      <section className="bg-void">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            {t('eyebrow')}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-ice sm:text-5xl">
            {t('h1')}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-dim">{t('intro')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(t('waQuoteGeneric'))}
              target="_blank"
              rel="noopener noreferrer"
              className="wave rounded-xl bg-gold px-6 py-3.5 font-display font-extrabold text-void transition hover:bg-accent-deep"
            >
              {t('askWhatsapp')}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-xl border-2 border-white/25 px-6 py-3.5 font-display font-bold text-ice transition hover:bg-white/10"
            >
              {t('emailUs')}
            </a>
            <Link
              href="/book"
              className="rounded-xl border-2 border-white/25 px-6 py-3.5 font-display font-bold text-ice transition hover:bg-white/10"
            >
              {t('bookTransfer')}
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="border-b border-line bg-raise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              {t('coverageH2')}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-dim">{t('coverageIntro')}</p>
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 3) * 70}>
                <span className="flex items-start gap-2.5 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-gold"
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
          <strong>{t('pricingTitle')}</strong>{' '}
          {t.rich('pricingBody', {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </div>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t('featuredH2')}</h2>
          <p className="mt-3 max-w-2xl text-dim">{t('featuredIntro')}</p>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_DESTINATIONS.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 4) * 70} className="flex">
              <DestinationCard d={d} t={t} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Groups */}
      {DESTINATION_GROUPS.map((group) => (
        <section
          key={group.slug}
          className="border-t border-line py-14 odd:bg-raise"
        >
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                {group.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-dim">{group.intro}</p>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.destinations.map((d, i) => (
                <Reveal as="li" key={d.slug} delay={(i % 3) * 70} className="flex">
                  <DestinationCard d={d} t={t} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
