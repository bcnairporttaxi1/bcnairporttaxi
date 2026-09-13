import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { QuoteWidget } from '@/components/quote-widget';
import { FaqAccordion } from '@/components/faq-accordion';
import { FleetSwiper } from '@/components/fleet-swiper';
import { DestinationStrip } from '@/components/destination-strip';
import { FEATURED_DESTINATIONS, ALL_DESTINATIONS } from '@bcn/core/destinations';
import { attributionLine, destinationPhoto } from '@bcn/core/destination-photos';
import { LANDMARKS, TARIFFS } from '@bcn/core/tariffs';
import { calculateQuote } from '@bcn/core/pricing';
import { PaymentMethods } from '@/components/payment-methods';
import { Reveal } from '@/components/reveal';
import { Rise, Stagger, StaggerItem, LiftCard } from '@/components/motion';
import { LanguageGrid } from '@/components/language-switcher';
import { TrustBand } from '@/components/trust-band';
import { BookingJourney } from '@/components/booking-journey';
import { FaqJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { LANDING_PAGES, getLandingCopy } from '@bcn/core/landing-pages';

const FAQ_KEYS = ['fareAccurate', 'whyFee', 'invoice', 'meetDriver', 'urgent', 'cancel'] as const;

/**
 * The four reasons, each with its own mark.
 *
 * They previously shared one tick icon four times over, which told the reader
 * nothing and made the grid read as filler. `wide` gives the price guarantee —
 * the only one of the four that is a promise rather than a fact — the tall
 * cell on desktop.
 */
/**
 * The four reasons, each with a photograph of the thing it claims: the
 * meter that sets the fare, the tablet tracking the flight, the licensed
 * driver at the door, the desk on WhatsApp. Photographs are in
 * public/img/why; the copy keys are unchanged. `wide` gives the price
 * guarantee — the one promise among four facts — the full row. `from` is
 * the side each photograph is revealed from as the section scrolls in: the
 * wide one wipes in the reading direction while its copy arrives from the
 * right, and the three below come from the left, from below and from the
 * right, closing on the centre. See `.why-grid` in globals.css.
 */
const WHY = [
  { key: 'meter' as const, wide: true, from: 'left' as const, alt: 'Driver beside a black-and-yellow Barcelona taxi at the airport, with the taximeter showing the official tariff' },
  { key: 'flight' as const, wide: false, from: 'left' as const, alt: 'Driver at the terminal checking an arriving flight on a tablet, the plane landing behind' },
  { key: 'licensed' as const, wide: false, from: 'below' as const, alt: 'Licensed driver holding the taxi door open for a passenger at Terminal 1, the meter visible inside' },
  { key: 'support' as const, wide: false, from: 'right' as const, alt: 'Booking desk agent on a headset answering a WhatsApp message, a taxi waiting at the terminal' },
];

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tfaq = await getTranslations('faq');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');
  const tf = await getTranslations('fleet');
  const td = await getTranslations('destinations');
  const tfare = await getTranslations('fares');

  /* Every figure below comes out of calculateQuote — the same function the
     booking form calls — rather than a formula retyped here. Hand-written
     copies of the tariff arithmetic are exactly how a published price ends up
     disagreeing with the one the customer is actually charged.

     A fixed weekday noon keeps the table stable: Wed 10 June 2026 is not a
     holiday, so it lands on T-1 and T-6 rather than flipping to the night
     tariff depending on when the page happens to be rendered. */
  const SAMPLE_AT = new Date('2026-06-10T12:00:00+02:00');
  const BCN_CENTRE = { lat: 41.387, lng: 2.1701 }; // Placa de Catalunya
  const SITGES = { lat: 41.2351, lng: 1.8117 };
  const TARRAGONA = { lat: 41.1189, lng: 1.2445 };
  const GIRONA_AIRPORT = { lat: 41.901, lng: 2.7606 };

  const sample = (pickup: { lat: number; lng: number }, dropoff: { lat: number; lng: number }, km: number) =>
    calculateQuote({ pickup, dropoff, roadKm: km, durationMin: Math.round(km * 1.2), pickupAt: SAMPLE_AT });

  const eur = (n: number) => `€${n.toFixed(2)}`;
  const airport = { lat: LANDMARKS.elPratAirport.lat, lng: LANDMARKS.elPratAirport.lng };
  const moll = { lat: LANDMARKS.mollAdossat.lat, lng: LANDMARKS.mollAdossat.lng };

  const fareRows = [
    { route: tfare('rowAirportCity'), distance: '14.2 km', tariff: 'T-1', fare: eur(sample(airport, BCN_CENTRE, 14.2).total) },
    { route: tfare('rowAirportPort'), distance: tfare('fixed'), tariff: 'T-4', fare: eur(sample(airport, moll, 12.4).total) },
    { route: tfare('rowAirportSitges'), distance: '32.8 km', tariff: 'T-6', fare: eur(sample(airport, SITGES, 32.8).total) },
    { route: tfare('rowBcnTarragona'), distance: '97.3 km', tariff: 'T-6', fare: eur(sample(BCN_CENTRE, TARRAGONA, 97.3).total) },
    { route: tfare('rowBcnGirona'), distance: '97.0 km', tariff: 'T-6', fare: eur(sample(BCN_CENTRE, GIRONA_AIRPORT, 97.0).total) },
  ];

  /* Cards that carry a photograph read far better than ones that do not, so
     the strip prefers featured destinations that have one. */
  const stripSource = [...FEATURED_DESTINATIONS, ...ALL_DESTINATIONS]
    .filter((d, i, a) => a.findIndex((x) => x.slug === d.slug) === i)
    .filter((d) => d.hasPage && d.km != null && destinationPhoto(d.slug))
    .slice(0, 12);

  const stripItems = stripSource.map((d) => {
    const photo = destinationPhoto(d.slug);
    const place = d.name.replace('Barcelona Airport to ', '').replace('Barcelona to ', '');
    /* Also straight from the engine. Every one of these destinations lies
       outside the AMB and none is within the El Prat supplement radius, so the
       quote turns only on the distance — but running it through calculateQuote
       rather than reimplementing T-6 is what keeps the card and the booking
       form agreeing after the next tariff change. */
    const fare = sample(BCN_CENTRE, GIRONA_AIRPORT, d.km as number).total;
    return {
      slug: d.slug,
      place,
      href: `/destinations/${d.slug}`,
      km: d.km,
      minutes: d.minutes,
      fare: `€${Math.round(fare)}`,
      photo: photo ? { file: photo.file, alt: td('photoAlt', { place }) } : null,
    };
  });

  const photoCredits =
    td('photoCreditsPrefix') +
    ' ' +
    stripSource
      .map((d) => destinationPhoto(d.slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => attributionLine(c).replace('Photo: ', ''))
      .filter((v, i, a) => a.indexOf(v) === i)
      .join(' · ');

  const faqItems = FAQ_KEYS.map((k) => ({
    q: tfaq(`items.${k}.q`),
    a: tfaq(`items.${k}.a`),
  }));

  return (
    <>
      <ServiceJsonLd
        name={t('metaTitle')}
        description={t('metaDescription')}
        url={`/${locale}`}
      />
      <FaqJsonLd items={faqItems} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-void">
        {/* Shown at full strength — it is the brand image, not a texture. */}
        <Image
          src="/img/hero-banner.jpg"
          alt="Black and yellow Mercedes Barcelona taxi on the waterfront at sunset, with the Sagrada Família and the W Hotel behind"
          fill
          priority
          fetchPriority="high"
          // It sits under a heavy scrim, so compression artefacts are not
          // visible and this keeps the LCP payload down.
          quality={60}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Readability scrim. The headline sits left and the car sits right, so
            on wide screens the darkening sweeps left-to-right and leaves the
            vehicle clear. Narrow screens get a vertical scrim instead, because
            the text spans the full width there. Without this the porcelain
            headline fails contrast against the sunset. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/72 to-void/95 md:bg-gradient-to-r md:from-ink md:via-ink/88 md:to-ink/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(245,179,1,0.16),transparent)]"
        />

        {/* Two very slow blobs drifting behind the copy. They animate transform
            only and sit above the scrim but below the text, so they add depth
            without ever touching contrast on the headline. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="aurora left-[-10%] top-[-15%] h-[420px] w-[420px] bg-accent/25" />
          <span className="aurora aurora-slow bottom-[-25%] right-[-5%] h-[520px] w-[520px] bg-accent/15" />
        </div>
        {/* Copy left, booking panel right on desktop. On a phone they stack in
            source order — headline first. The panel used to lead there, which
            meant the first thing on the site was a form for a service the
            visitor had not yet been told anything about; the h1 was pushed a
            full screen down and the page opened on an empty price readout. */}
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(400px,440px)] lg:items-center lg:gap-12 lg:pt-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-balance rounded-2xl border border-gold/20 bg-gold/[0.07] px-3 py-1.5 font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.13em] text-gold sm:rounded-full sm:px-3.5 sm:text-[10px] sm:tracking-[0.2em]">
              {t('kicker')}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ice sm:text-5xl lg:text-6xl">
              {t('h1')}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ice/85 sm:text-lg">
              {t('intro')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* The primary CTA carries a permanent slow swell so it reads as
                  live before anyone points at it; the secondary only waves on
                  approach, so the two never compete. */}
              <Link href="/book" className="cta cta-gold group">
                {tc('book')}
                <span className="cta-pip" aria-hidden="true">
                  <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                    <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
                  </svg>
                </span>
              </Link>
              <Link href="/destinations" className="cta cta-ghost group">
                {tn('destinations')}
                <span className="cta-pip" aria-hidden="true">
                  <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                    <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div id="book" className="plinth animate-fade-rise rounded-shell scroll-mt-28">
            <QuoteWidget variant="panel" />
          </div>
        </div>
      </section>

      <TrustBand />

      <BookingJourney locale={locale} />

      {/* Why book with us. Each reason now shows the thing it claims — the
          meter, the flight on the tablet, the driver at the door, the desk
          on WhatsApp — rather than an icon standing in for it. The price
          guarantee, the one promise among four facts, keeps the full row. */}
      <section className="border-y border-line bg-raise py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Rise>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.whyTitle')}
              <span className="editorial text-[1.08em]">{t('sections.whyLede')}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-dim">{t('sections.whyIntro')}</p>
          </Rise>

          <Stagger as="ul" className="why-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ key, wide, alt, from }) => (
              <LiftCard as="li" key={key} className={wide ? 'sm:col-span-2 lg:col-span-3' : ''}>
                <div
                  className={`group relative h-full overflow-hidden rounded-[1.4rem] border border-line bg-void transition-colors duration-500 ease-brand hover:border-gold/40 ${
                    wide ? 'lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'flex flex-col'
                  }`}
                >
                  {/* The photograph. On the wide card it takes the left column
                      at full height; on the others it is the card's top. The
                      slow zoom on hover is the card's only motion. */}
                  <div className={`why-photo why-from-${from} relative overflow-hidden ${wide ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]' : 'aspect-[16/10]'}`}>
                    <Image
                      src={`/img/why/${key}.jpg`}
                      alt={alt}
                      fill
                      sizes={wide ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                      className="object-cover transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]"
                    />
                    {/* A fade into the card's ground so the photo and the text
                        read as one surface, not a picture with a caption. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 ${
                        wide
                          ? 'bg-gradient-to-t from-void via-void/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-void'
                          : 'bg-gradient-to-t from-void via-void/20 to-transparent'
                      }`}
                    />
                  </div>

                  <div className={`why-text relative ${wide ? 'p-7 lg:flex lg:flex-col lg:justify-center lg:p-10' : 'p-6 pt-5'}`}>
                    <h3
                      className={`font-display font-bold tracking-tight ${
                        wide ? 'text-2xl sm:text-3xl' : 'text-lg'
                      }`}
                    >
                      {t(`why.${key}.title`)}
                    </h3>
                    <p
                      className={`mt-2.5 leading-relaxed text-dim ${
                        wide ? 'text-base lg:text-[17px]' : 'text-[15px]'
                      }`}
                    >
                      {t(`why.${key}.body`)}
                    </p>
                  </div>
                </div>
              </LiftCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.fleetTitle')}
              <span className="editorial text-[1.08em]">{t('sections.fleetLede')}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-dim">{t('sections.fleetIntro')}</p>
          </Reveal>

          {/* One window rather than a rail: a single vehicle fills the frame,
              so two sets of specs never compete to be compared. */}
          <div className="mt-12">
            <FleetSwiper
              labels={{
                passengers: tf('passengersCol'),
                luggage: tf('luggageCol'),
                comfort: tf('comfortCol'),
                supplement: tf('supplement', {
                  amount: `€${TARIFFS.supplements.largeVehicle.toFixed(2)}`,
                }),
                noSupplement: tf('noSupplement'),
                prev: tf('prevVehicle'),
                next: tf('nextVehicle'),
                choose: tf('chooseVehicle'),
                categories: {
                  eco: tf('categories.eco'),
                  standard: tf('categories.standard'),
                  estate: tf('categories.estate'),
                  minivan: tf('categories.minivan'),
                  premium: tf('categories.premium'),
                },
              }}
            />
          </div>

          <Link href="/fleet" className="cta cta-ghost group mt-8">
            {tc('viewFleet')}
            <span className="cta-pip" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Destinations — the photography is the argument here, so the strip
          leads and the text hub follows. */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.destTitle')}
              <span className="editorial text-[1.08em]">{t('sections.destLede')}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-dim">{t('sections.destIntro')}</p>
          </Reveal>
          <div className="mt-12">
            <DestinationStrip
              items={stripItems}
              labels={{
                prev: td('stripPrev'),
                next: td('stripNext'),
                from: td('stripFrom'),
              }}
            />
          </div>
          {/* CC BY and CC BY-SA both require the author be named wherever the
              photograph appears, so the credits travel with the strip. */}
          <p className="mt-4 text-xs leading-relaxed text-ghost">
            {photoCredits}
          </p>
        </div>
      </section>

      {/* Popular routes — the internal-linking hub. Every card repeated a
          three-line meta description, which made this the densest block of
          prose on the page for the least reward. A route name and a direction
          is what anyone reads here; the description still lives on the page it
          belongs to. */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Rise>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.routesTitle')}
            <span className="editorial text-[1.08em]">{t('sections.routesLede')}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-dim">{t('sections.routesIntro')}</p>
        </Rise>

        <Stagger
          as="ul"
          className="mt-12 grid gap-px overflow-hidden rounded-[1.4rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {LANDING_PAGES.map((p) => {
            const copy = getLandingCopy(p, locale);
            return (
              <StaggerItem as="li" key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="group flex h-full items-center gap-4 bg-raise px-6 py-5 transition-colors duration-500 ease-brand hover:bg-white/[0.035]"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-none rounded-full bg-gold/40 transition-all duration-500 ease-brand group-hover:w-5 group-hover:bg-gold"
                  />
                  <span className="flex-1 font-display text-[15px] font-semibold leading-snug tracking-tight transition-colors duration-500 group-hover:text-gold">
                    {copy.h1}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-4 w-4 flex-none fill-current text-ghost transition-all duration-500 ease-brand group-hover:translate-x-1 group-hover:text-gold"
                  >
                    <path d="m7.5 4 6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
                  </svg>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Fares — the differentiator is that these are the real schedule, not a
          markup, so they are shown rather than described. Every figure is
          derived from TARIFFS at render time so the table cannot drift. */}
      <section className="border-y border-line bg-raise py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.faresTitle')}
              <span className="editorial text-[1.08em]">{t('sections.faresLede')}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-dim">{t('sections.faresIntro')}</p>
          </Reveal>

          <Reveal>
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-white/[0.038] p-1.5">
              <div className="overflow-x-auto rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-raise to-pane shadow-[inset_0_1px_1px_rgba(255,255,255,0.09)]">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <caption className="sr-only">{t('sections.faresTitle')}</caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
                        {tfare('route')}
                      </th>
                      <th scope="col" className="px-6 py-4 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
                        {tfare('distance')}
                      </th>
                      <th scope="col" className="px-6 py-4 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
                        {tfare('tariff')}
                      </th>
                      <th scope="col" className="px-6 py-4 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
                        {tfare('totalPrice')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fareRows.map((r) => (
                      <tr key={r.route} className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.022]">
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-3.5 text-[15px]">
                            <span aria-hidden="true" className="h-[7px] w-[7px] flex-none rounded-full bg-gold shadow-[0_0_12px_rgb(240_180_41/50%)]" />
                            {r.route}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-[13.5px] tabular-nums text-dim">
                          {r.distance}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-[13.5px] tabular-nums text-dim">
                          {r.tariff}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-display text-[17px] font-semibold tabular-nums text-gold">
                          {r.fare}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ghost">{tfare('note')}</p>
          </Reveal>
        </div>
      </section>

      {/* Closing band */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] border border-gold/25 px-6 py-14 text-center sm:px-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgb(240_180_41/16%),transparent_70%)]"
            />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                {t('sections.closingTitle')}
                <span className="editorial text-[1.08em]">{t('sections.closingLede')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[44ch] text-dim">{t('sections.closingIntro')}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/book" className="cta cta-gold group">
                  {tc('book')}
                  <span className="cta-pip" aria-hidden="true">
                    <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                      <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
                    </svg>
                  </span>
                </Link>
                <Link href="/pricing" className="cta cta-ghost group">
                  {tn('pricing')}
                  <span className="cta-pip" aria-hidden="true">
                    <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                      <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Language choice belongs down here, not between the hero and the
          first explanation of the service. */}
      <LanguageGrid />

      <PaymentMethods />

      {/* FAQ */}
      <section className="border-t border-line bg-raise py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.faqTitle')}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-10">
              <FaqAccordion items={faqItems} />
            </div>
            <Link
              href="/faq"
              className="link-underline mt-7 inline-block font-semibold text-gold"
            >
              {tc('readAllFaqs')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-void py-20 sm:py-24">
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-extrabold text-ice sm:text-4xl">
            {t('h1')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-dim">
            {t('sections.howIntro')}
          </p>
          <Link href="/book" className="cta cta-gold group mt-8">
            {tc('book')}
            <span className="cta-pip" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
