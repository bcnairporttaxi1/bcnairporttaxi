import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { QuoteWidget } from '@/components/quote-widget';
import { VehicleCard } from '@/components/vehicle-card';
import { FaqJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { FLEET } from '@/lib/fleet';
import { LANDING_PAGES, getLandingCopy } from '@/lib/landing-pages';

const FAQ_KEYS = ['fareAccurate', 'whyFee', 'invoice', 'meetDriver', 'urgent', 'cancel'] as const;

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tf = await getTranslations('fleet');
  const tw = await getTranslations('howItWorks');
  const tfaq = await getTranslations('faq');
  const tc = await getTranslations('common');

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
      <section className="relative overflow-hidden bg-ink">
        {/* Shown at full strength — it is the brand image, not a texture. */}
        <Image
          src="/img/hero-banner.jpg"
          alt="Black and yellow Mercedes Barcelona taxi on the waterfront at sunset, with the Sagrada Família and the W Hotel behind"
          fill
          priority
          fetchPriority="high"
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
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-porcelain sm:text-5xl lg:text-6xl">
              {t('h1')}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-porcelain/75 sm:text-lg">
              {t('intro')}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-porcelain/70">
              {(['licensed', 'meter', 'noSurge', 'support'] as const).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-accent">
                    <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
                  </svg>
                  {t(`trust.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 animate-fade-rise">
            <QuoteWidget />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          {t('sections.howTitle')}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t('sections.howIntro')}</p>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {(['one', 'two', 'three'] as const).map((step, i) => (
            <li
              key={step}
              className="rounded-card border border-hairline bg-white p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink font-mono text-lg font-bold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">
                {tw(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tw(`steps.${step}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Fleet */}
      <section className="border-y border-hairline bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.fleetTitle')}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t('sections.fleetIntro')}</p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET.map((v) => (
              <li key={v.slug} className="flex">
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>

          <Link
            href="/fleet"
            className="mt-8 inline-block rounded-lg border-2 border-ink px-5 py-3 font-display font-bold transition hover:bg-ink hover:text-porcelain"
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
        <p className="mt-3 max-w-2xl text-muted">{t('sections.routesIntro')}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_PAGES.map((p) => {
            const copy = getLandingCopy(p, locale);
            return (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="group flex h-full flex-col rounded-card border border-hairline bg-white p-5 transition hover:border-ink"
                >
                  <h3 className="font-display text-base font-bold group-hover:text-accent-text">
                    {copy.h1}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{copy.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-t border-hairline bg-white py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.faqTitle')}
          </h2>
          <dl className="mt-8 divide-y divide-hairline">
            {faqItems.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="font-display text-lg font-bold">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/faq"
            className="mt-6 inline-block font-semibold text-accent-text underline underline-offset-4"
          >
            {tc('readAllFaqs')}
          </Link>
        </div>
      </section>
    </>
  );
}
