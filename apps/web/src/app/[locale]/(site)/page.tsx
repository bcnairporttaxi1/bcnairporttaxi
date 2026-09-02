import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { QuoteWidget } from '@/components/quote-widget';
import { FaqAccordion } from '@/components/faq-accordion';
import { FleetSwiper } from '@/components/fleet-swiper';
import { TARIFFS } from '@bcn/core/tariffs';
import { PaymentMethods } from '@/components/payment-methods';
import { Reveal } from '@/components/reveal';
import { LanguageGrid } from '@/components/language-switcher';
import { FaqJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { LANDING_PAGES, getLandingCopy } from '@bcn/core/landing-pages';

const FAQ_KEYS = ['fareAccurate', 'whyFee', 'invoice', 'meetDriver', 'urgent', 'cancel'] as const;

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tw = await getTranslations('howItWorks');
  const tfaq = await getTranslations('faq');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');
  const tf = await getTranslations('fleet');

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
      <section className="stage relative overflow-hidden bg-void">
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
          className="absolute inset-0 bg-gradient-to-b from-ink/92 via-ink/78 to-ink/92 md:bg-gradient-to-r md:from-ink md:via-ink/88 md:to-ink/25"
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
        {/* Copy left, booking panel right on desktop; stacked on mobile with the
            panel first, because that is what people came to do. */}
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(400px,440px)] lg:items-center lg:gap-12 lg:pt-16">
          <div className="order-2 max-w-2xl lg:order-1">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/20 bg-gold/[0.07] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              <span
                aria-hidden="true"
                className="h-[5px] w-[5px] rounded-full bg-jade shadow-[0_0_0_0_rgba(57,217,138,0.6)] motion-safe:animate-ping-slow"
              />
              {t('kicker')}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ice sm:text-5xl lg:text-6xl">
              {t('h1')}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-dim sm:text-lg">
              {t('intro')}
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-dim">
              {(['licensed', 'meter', 'noSurge', 'support'] as const).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-jade">
                    <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
                  </svg>
                  {t(`trust.${k}`)}
                </li>
              ))}
            </ul>

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

          <div className="plinth order-1 animate-fade-rise rounded-card lg:order-2">
            <QuoteWidget variant="panel" />
          </div>
        </div>
      </section>

      {/* Right under the fold: an arriving visitor should be able to see their
          own language without opening anything. */}
      <LanguageGrid />

      {/* How it works */}
      <section className="stage mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.howTitle')}
          </h2>
          <p className="mt-3 max-w-2xl text-dim">{t('sections.howIntro')}</p>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {(['one', 'two', 'three'] as const).map((step, i) => (
            <Reveal as="li" key={step} delay={i * 110}>
              {/* The oversized watermark numeral was removed: at 1.31:1 on white
                  it failed contrast, and the numbered badge already carries the
                  sequence. */}
              <div className="lift relative h-full rounded-card border border-line bg-raise p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-void font-mono text-lg font-bold text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">
                  {tw(`steps.${step}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">
                  {tw(`steps.${step}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Why book with us */}
      <section className="border-y border-line bg-raise py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.whyTitle')}
            </h2>
            <p className="mt-3 max-w-2xl text-dim">{t('sections.whyIntro')}</p>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {(['meter', 'flight', 'licensed', 'support'] as const).map((k, i) => (
              <Reveal as="li" key={k} delay={i * 90}>
                <div className="lift h-full rounded-card border border-line bg-void p-7">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-gold"
                  >
                    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current">
                      <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {t(`why.${k}.title`)}
                  </h3>
                  <p className="mt-2 leading-relaxed text-dim">{t(`why.${k}.body`)}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {t('sections.fleetTitle')}
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

          <Link
            href="/fleet"
            className="mt-8 inline-block rounded-lg border-2 border-ink px-5 py-3 font-display font-bold transition hover:bg-void hover:text-ice"
          >
            {tc('viewFleet')}
          </Link>
        </div>
      </section>

      {/* Popular routes — internal linking hub */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          {t('sections.routesTitle')}
        </h2>
        <p className="mt-3 max-w-2xl text-dim">{t('sections.routesIntro')}</p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_PAGES.map((p, i) => {
            const copy = getLandingCopy(p, locale);
            return (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/${p.slug}`}
                  className="lift group flex h-full flex-col rounded-card border border-line bg-raise p-6 hover:border-gold"
                >
                  <h3 className="font-display text-base font-bold transition-colors group-hover:text-gold">
                    {copy.h1}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-dim">{copy.description}</p>
                  <span
                    aria-hidden="true"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {tc('learnMore')}
                    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                      <path d="m7.5 4 6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

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
          <Link
            href="/book"
            className="sheen mt-8 inline-block rounded-xl bg-gold px-8 py-4 font-display text-base font-extrabold text-void transition hover:bg-accent-deep active:scale-[0.99]"
          >
            {tc('book')}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
