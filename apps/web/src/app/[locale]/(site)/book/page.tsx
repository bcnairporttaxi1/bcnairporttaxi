import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { QuoteWidget } from '@/components/quote-widget';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { PaymentMethods } from '@/components/payment-methods';
import { StepArt } from '@/components/step-art';
import { Rise, Stagger, StaggerItem, LiftCard } from '@/components/motion';
import { locales } from '@/i18n/routing';
import { getLandingCopy, getLandingPage } from '@bcn/core/landing-pages';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const page = getLandingPage('book-online')!;
  const copy = getLandingCopy(page, locale);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/book`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/book`;
  return {
    // Absolute so the layout suffix does not push it past display length.
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: `/${locale}/book`, languages },
  };
}

const TRUST = ['licensed', 'meter', 'noSurge', 'support'] as const;

export default async function BookPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const page = getLandingPage('book-online')!;
  const copy = getLandingCopy(page, locale);
  const t = await getTranslations('quote');
  const th = await getTranslations('home');
  const tw = await getTranslations('howItWorks');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: copy.h1, url: `/${locale}/book` },
        ]}
      />

      {/*
       * The booking page is the one page with a single job, so it opens on the
       * instrument rather than on prose. It used to be a bare h1 over a form on
       * flat black, with a tall column of nothing beside it — the same widget
       * the home page dresses properly, presented as if it were an afterthought.
       */}
      <section className="relative overflow-hidden bg-void">
        <Image
          src="/img/hero-banner.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={55}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-void/92 via-void/80 to-void"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="aurora left-[-8%] top-[-20%] h-[380px] w-[380px] bg-accent/20" />
          <span className="aurora aurora-slow bottom-[-30%] right-[-8%] h-[460px] w-[460px] bg-accent/12" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:pt-14">
          <Rise className="max-w-3xl">
            <p className="inline-flex items-center gap-2.5 rounded-2xl border border-gold/20 bg-gold/[0.07] px-3 py-1.5 font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.13em] text-gold sm:rounded-full sm:px-3.5 sm:text-[10px] sm:tracking-[0.2em]">
              <span
                aria-hidden="true"
                className="h-[5px] w-[5px] flex-none rounded-full bg-jade motion-safe:animate-ping-slow"
              />
              {t('instantPrice')}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ice sm:text-5xl">
              {copy.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ice/85 sm:text-lg">
              {copy.intro}
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ice/85">
              {TRUST.map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-jade">
                    <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
                  </svg>
                  {th(`trust.${k}`)}
                </li>
              ))}
            </ul>
          </Rise>

          <div className="plinth mt-10 rounded-shell">
            <QuoteWidget />
          </div>
        </div>
      </section>

      {/* What happens after the payment goes through — the question every
          first-time booker actually has at this point. */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Rise>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.nextTitle')}
            <span className="editorial text-[1.08em]">{t('sections.nextLede')}</span>
          </h2>
        </Rise>

        <Stagger as="ol" className="mt-12 grid gap-6 md:grid-cols-3">
          {(['one', 'two', 'three'] as const).map((step, i) => (
            <LiftCard as="li" key={step} className="h-full">
              <div className="flex h-full flex-col rounded-[1.4rem] border border-line bg-raise p-5 transition-colors duration-500 ease-brand hover:border-gold/40">
                <StepArt step={(i + 1) as 1 | 2 | 3} />
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-gold font-mono text-sm font-bold text-void">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {tw(`steps.${step}.title`)}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dim">
                  {tw(`steps.${step}.body`)}
                </p>
              </div>
            </LiftCard>
          ))}
        </Stagger>
      </section>

      {/* The long-form copy, in two columns rather than one narrow stack, so
          the page stops looking like a form bolted onto an article. */}
      <section className="border-t border-line bg-raise py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Stagger as="div" className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {copy.sections.map((s) => (
              <StaggerItem key={s.h2}>
                <h2 className="flex items-start gap-3 font-display text-xl font-bold tracking-tight">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-gold"
                  />
                  {s.h2}
                </h2>
                <p className="mt-3 pl-[1.125rem] leading-relaxed text-dim">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Rise>
            <p className="mt-14 rounded-[1.4rem] border border-line bg-void p-6 text-sm leading-relaxed text-ghost">
              {t('disclaimer')}
            </p>
          </Rise>
        </div>
      </section>

      <PaymentMethods />
    </>
  );
}
