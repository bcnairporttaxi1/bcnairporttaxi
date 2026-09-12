import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { QuoteWidget } from '@/components/quote-widget';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { Rise, Stagger, StaggerItem } from '@/components/motion';
import { TrustBand } from '@/components/trust-band';
import {
  LANDING_PAGES,
  getLandingCopy,
  getLandingPage,
} from '@bcn/core/landing-pages';
import { locales } from '@/i18n/routing';

/**
 * Catch-all so nested keyword routes such as `/neighborhoods/eixample` resolve
 * alongside flat ones such as `/el-prat-airport-taxi`. Static segments like
 * `/fleet` still win over this route.
 *
 * This one file renders all twelve keyword pages in all ten languages — 120
 * URLs — and Search Console puts roughly sixty per cent of the site's
 * impressions through them. It had none of the design the home page got: no
 * motion, no editorial type, no call to action past the quote widget, and body
 * copy set in full-strength ice, which is right for a headline over a
 * photograph and punishing across six paragraphs of prose.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    LANDING_PAGES.map((p) => ({ locale, slug: p.slug.split('/') })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const path = slug.join('/');
  const page = getLandingPage(path);
  if (!page) return {};

  const copy = getLandingCopy(page, locale);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/${path}`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/${path}`;

  /**
   * /book renders this page's copy verbatim — same title, same description,
   * same h1, same sections — so /book-online and /book were byte-identical
   * documents at two URLs, each declaring itself canonical. Search Console
   * shows the cost: 177 impressions on one and 122 on the other, both stuck
   * around position 80, because the two were competing for the same intent
   * with the same words.
   *
   * /book wins the consolidation. Not because it is the better page — they
   * are the same page — but because the header CTA links to it from every
   * page on the site, so it already holds nearly all of the internal link
   * equity. A keyword in a slug does not come close to that.
   */
  const canonical = path === 'book-online' ? `/${locale}/book` : `/${locale}/${path}`;

  return {
    // Absolute so the layout's "| BCNAirportTaxi" suffix does not push these
    // past the length Google will display.
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical, languages },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `/${locale}/${path}`,
    },
  };
}

/**
 * Stable anchor for a heading.
 *
 * Diacritics are folded before the non-word characters are stripped, so the
 * Catalan and Spanish headings do not lose their accented letters entirely.
 * Falls back to the position when a heading is wholly non-Latin — the Chinese
 * and Russian catalogues would otherwise produce an empty id, and duplicate
 * empty ids break every jump link on the page at once.
 */
function anchor(heading: string, index: number): string {
  const slug = heading
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || `section-${index + 1}`;
}

export default async function LandingPageRoute(props: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const path = slug.join('/');
  const page = getLandingPage(path);
  if (!page) notFound();

  const copy = getLandingCopy(page, locale);
  const t = await getTranslations('common');
  const tq = await getTranslations('quote');
  const th = await getTranslations('home');
  const tn = await getTranslations('nav');

  const isNested = slug.length > 1;
  const sections = copy.sections.map((s, i) => ({ ...s, id: anchor(s.h2, i) }));

  return (
    <>
      <ServiceJsonLd
        name={copy.title}
        description={copy.description}
        url={`/${locale}/${path}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          ...(isNested
            ? [{ name: 'Neighbourhoods', url: `/${locale}/${slug[0]}` }]
            : []),
          { name: copy.h1, url: `/${locale}/${path}` },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────
          Copy left, quote widget right on desktop; stacked headline-first on a
          phone, the order the home page settled on for the same reason — a
          visitor arriving from a search has not yet been told what this is. */}
      <section className="relative overflow-hidden bg-void">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-gold/[0.07] blur-[90px]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 lg:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ghost">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  {t('backHome')}
                </Link>
              </li>
              <li aria-hidden="true" className="text-line-2">
                /
              </li>
              <li aria-current="page" className="text-dim">
                {copy.h1}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(400px,440px)] lg:items-start lg:gap-12">
            <div className="max-w-2xl">
              {/* The hero is not wrapped in <Rise>. Rise renders opacity:0 on the
                  server and fades in after hydration, which on a phone left the
                  largest text block invisible for two seconds after its bytes
                  had arrived — Lighthouse called it a 2.35 s LCP render delay.
                  Entrances belong below the fold, where they are seen. */}
              <div>
                <p className="inline-flex items-center gap-2.5 text-balance rounded-2xl border border-gold/20 bg-gold/[0.07] px-3 py-1.5 font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.13em] text-gold sm:rounded-full sm:px-3.5 sm:text-[10px] sm:tracking-[0.2em]">
                  {tq('allInclusive')}
                </p>

                <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.06] text-ice sm:text-4xl lg:text-5xl">
                  {copy.h1}
                </h1>

                <p className="mt-5 text-base leading-relaxed text-ice/85 sm:text-lg">
                  {copy.intro}
                </p>

              </div>

              {/* Jump links earn their space on a long page: they give the
                  reader the shape of the answer before committing to it, and
                  they give Google addressable passages. */}
              {sections.length >= 3 && (
                <div>
                  <nav
                    aria-label={copy.h1}
                    className="mt-9 rounded-[1.2rem] border border-line bg-raise p-5"
                  >
                    <ol className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {sections.map((s, i) => (
                        <li key={s.id} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[3px] font-mono text-[11px] tabular-nums text-gold/80"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <a
                            href={`#${s.id}`}
                            className="text-[14.5px] leading-snug text-dim transition-colors hover:text-gold"
                          >
                            {s.h2}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              )}
            </div>

            <div id="quote" className="plinth animate-fade-rise scroll-mt-28 rounded-shell">
              <QuoteWidget
                variant="panel"
                presetPickup={page.preset?.pickup}
                presetDropoff={page.preset?.dropoff}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBand />

      {/* ── The answer ─────────────────────────────────────────────────── */}
      <article className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        {sections.map((s, i) => (
          <Rise key={s.id} as="section" className="mb-12 last:mb-0">
            <div id={s.id} className="flex scroll-mt-28 items-baseline gap-4">
              <span
                aria-hidden="true"
                className="font-mono text-[11px] tabular-nums text-gold/50"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-[27px]">
                {s.h2}
              </h2>
            </div>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-dim sm:pl-8">
              {s.body}
            </p>
          </Rise>
        ))}
      </article>

      {/* Every one of these pages draws price queries — "precio taxi
          aeropuerto", "cuanto cuesta" — and the answer to all of them is the
          same sentence, so it belongs on all of them. */}
      <section className="border-y border-line bg-raise py-14">
        <Rise className="mx-auto flex max-w-3xl items-start gap-4 px-4">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-gold/20 bg-gold/[0.08] text-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current stroke-[1.6]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l7.5 7.5-9 9z" />
              <circle cx="8" cy="8" r="1.4" />
            </svg>
          </span>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">
              {tq('totalPrice')}
            </h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-dim">
              {tq('includedNote')}
            </p>
          </div>
        </Rise>
      </section>

      {/* ── Related routes ───────────────────────────────────────────────
          Was a two-column scatter of bordered boxes. The hairline grid the home
          page uses fits more in less height and reads as one object. */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Rise>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            {t('relatedTransfers')}
          </h2>
        </Rise>

        <Stagger
          as="ul"
          className="mt-8 grid gap-px overflow-hidden rounded-[1.4rem] border border-line bg-line sm:grid-cols-2"
        >
          {page.related.map((rel) => {
            const target = getLandingPage(rel);
            if (!target) return null;
            return (
              <StaggerItem as="li" key={rel}>
                <Link
                  href={`/${rel}`}
                  className="group flex h-full items-center gap-4 bg-raise px-6 py-5 transition-colors duration-500 ease-brand hover:bg-white/[0.035]"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-none rounded-full bg-gold/40 transition-all duration-500 ease-brand group-hover:w-5 group-hover:bg-gold"
                  />
                  <span className="flex-1 font-display text-[15px] font-semibold leading-snug tracking-tight transition-colors duration-500 group-hover:text-gold">
                    {getLandingCopy(target, locale).h1}
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

      {/* The widget is a long way back up by now. Someone who read to the end
          should not have to scroll to act. */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Rise>
          <div className="relative overflow-hidden rounded-[22px] border border-gold/25 px-6 py-14 text-center sm:px-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgb(240_180_41/16%),transparent_70%)]"
            />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                {th('sections.closingTitle')}
                <span className="editorial text-[1.08em]">
                  {th('sections.closingLede')}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-[44ch] text-dim">
                {th('sections.closingIntro')}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/book" className="cta cta-gold group">
                  {t('book')}
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
        </Rise>
      </section>
    </>
  );
}
