import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/reveal';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { FLEET } from '@bcn/core/fleet';
import { calculateQuote } from '@bcn/core/pricing';
import {
  DESTINATION_PAGES,
  getDestination,
  groupOf,
} from '@bcn/core/destinations';
import { attributionLine, destinationPhoto } from '@bcn/core/destination-photos';
import { whatsappLink } from '@bcn/core/site';
import { altLanguages, locales } from '@/i18n/routing';

const eur = (n: number, locale: string) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(n);

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    DESTINATION_PAGES.map((d) => ({ locale, slug: d.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const d = getDestination(slug);
  if (!d) return {};

  const languages = altLanguages(`/destinations/${slug}`);

  const t = await getTranslations({ locale, namespace: 'destinationRoute' });

  return {
    title: { absolute: t('metaTitle', { name: d.name }) },
    description: d.blurb,
    alternates: { canonical: `/${locale}/destinations/${slug}`, languages },
    openGraph: { title: t('ogTitle', { name: d.name }), description: d.blurb },
  };
}

export default async function DestinationPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const d = getDestination(slug);
  if (!d) notFound();

  const group = groupOf(slug);
  const siblings = (group?.destinations ?? []).filter((x) => x.slug !== slug).slice(0, 6);

  // Indicative price on the Generalitat interurban tariff. Built from the
  // published distance rather than a live route lookup, so it is a guide
  // figure — the exact fare still comes from the booking form or a quote.
  const estimate =
    d.km !== undefined
      ? calculateQuote({
          // A representative city-centre origin and a point outside the AMB:
          // enough to select the interurban tariff, which is what sets the rate.
          pickup: { lat: 41.3874, lng: 2.1686 },
          dropoff: { lat: 41.9794, lng: 2.8214 },
          roadKm: d.km,
          durationMin: d.minutes ?? 0,
          // Weekday midday, so the quoted "from" price is the cheaper T-6 band.
          pickupAt: new Date('2026-07-15T13:00:00+02:00'),
        })
      : null;

  const t = await getTranslations('destinationRoute');
  const tHub = await getTranslations('destinations');

  const quote = t('waQuote', { name: d.name });
  const photo = destinationPhoto(slug);
  const place = d.name.replace('Barcelona to ', '').replace('Barcelona Airport to ', '');

  return (
    <>
      <ServiceJsonLd
        name={t('serviceName', { name: d.name })}
        description={d.blurb}
        url={`/${locale}/destinations/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: tHub('crumbHome'), url: `/${locale}` },
          { name: tHub('crumbDestinations'), url: `/${locale}/destinations` },
          { name: d.name, url: `/${locale}/destinations/${slug}` },
        ]}
      />

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-porcelain/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/destinations" className="hover:text-accent">
                  {tHub('crumbDestinations')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-porcelain/80">
                {d.name}
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-porcelain sm:text-5xl">
            {t('h1', { name: d.name })}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-porcelain/75">{d.blurb}</p>

          {d.km && d.minutes && (
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3">
              <div>
                <dt className="text-xs uppercase tracking-wider text-porcelain/50">
                  {t('distance')}
                </dt>
                <dd className="font-mono text-xl font-bold text-porcelain">~{d.km} km</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-porcelain/50">
                  {t('journeyTime')}
                </dt>
                <dd className="font-mono text-xl font-bold text-porcelain">
                  ~{Math.round(d.minutes / 5) * 5} min
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-porcelain/50">
                  {t('fromDaytime')}
                </dt>
                <dd className="font-mono text-xl font-bold text-accent">
                  {estimate ? eur(estimate.fixedFare, locale) : t('onRequest')}
                </dd>
              </div>
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen rounded-xl bg-accent px-6 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep"
            >
              {t('ctaFixedQuote')}
            </a>
            <Link
              href="/book"
              className="rounded-xl border-2 border-white/25 px-6 py-3.5 font-display font-bold text-porcelain transition hover:bg-white/10"
            >
              {t('ctaBookInstead')}
            </Link>
          </div>

          {photo && (
            <figure className="mt-10 overflow-hidden rounded-card border border-white/10">
              <Image
                src={photo.file}
                alt={t('photoAlt', { place })}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 1100px"
                priority
                className="aspect-[16/9] w-full object-cover"
              />
              {/* CC BY and CC BY-SA both require the author to be credited
                  wherever the image is shown. */}
              <figcaption className="bg-graphite px-4 py-2 text-xs text-porcelain/50">
                <a
                  href={photo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-accent"
                >
                  {attributionLine(photo)} · Wikimedia Commons
                </a>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14">
        {(d.body ?? []).map((p) => (
          <p key={p.slice(0, 40)} className="mt-5 leading-relaxed text-slate-body first:mt-0">
            {p}
          </p>
        ))}

        <div className="mt-10 rounded-card border-2 border-accent/40 bg-accent/5 p-6">
          <h2 className="font-display text-lg font-extrabold">{t('pricedH2')}</h2>
          <p className="mt-3 text-sm leading-relaxed">
            {t.rich('pricedP1', { place, b: (chunks) => <strong>{chunks}</strong> })}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{t('pricedP2')}</p>
        </div>

        <h2 className="mt-12 font-display text-2xl font-extrabold">{t('vehiclesH2')}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {FLEET.filter((v) => v.seats >= 4).map((v) => (
            <li
              key={v.slug}
              className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-white px-4 py-3"
            >
              <span className="font-display text-sm font-bold">{v.name}</span>
              <span className="font-mono text-xs text-muted">
                {t('paxBags', { seats: v.seats, bags: v.bags })}
              </span>
            </li>
          ))}
        </ul>
      </article>

      {siblings.length > 0 && (
        <section className="border-t border-hairline bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold">
                {t('otherIn', { group: group?.title.toLowerCase() ?? '' })}
              </h2>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  {s.hasPage ? (
                    <Link
                      href={`/destinations/${s.slug}`}
                      className="lift block h-full rounded-card border border-hairline p-5 hover:border-accent"
                    >
                      <span className="font-display font-bold">{s.name}</span>
                      <span className="mt-1.5 block text-sm text-muted">{s.blurb}</span>
                    </Link>
                  ) : (
                    <a
                      href={whatsappLink(t('waQuoteSibling', { name: s.name }))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lift block h-full rounded-card border border-hairline p-5 hover:border-accent"
                    >
                      <span className="font-display font-bold">{s.name}</span>
                      <span className="mt-1.5 block text-sm text-muted">{s.blurb}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
