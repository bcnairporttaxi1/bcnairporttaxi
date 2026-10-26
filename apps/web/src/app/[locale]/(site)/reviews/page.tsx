import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { locales } from '@/i18n/routing';
import { prisma } from '@/lib/db';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/reviews`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/reviews`;
  // An empty reviews page is thin content, and there are ten of them. Keep
  // them out of the index until the first approved review exists; the tag
  // lifts itself on the next build after that.
  const approved = await prisma.review
    .count({ where: { approved: true, direction: 'USER_TO_DRIVER' } })
    .catch(() => 0);
  const t = await getTranslations({ locale, namespace: 'reviews' });
  return {
    title: t('metaTitle'),
    robots: approved > 0 ? undefined : { index: false, follow: true },
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/reviews`, languages },
  };
}

export default async function ReviewsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // The hero and the empty-state were hardcoded English, so nine locales read
  // an untranslated page while claiming `hreflang` coverage for it.
  const t = await getTranslations('reviews');

  // Only moderated reviews are ever shown, and only these feed AggregateRating.
  const reviews = await prisma.review
    .findMany({
      // Direction matters as much as approval here: a driver's rating of a
      // passenger is internal and must never surface as a testimonial, even
      // if something upstream marked it approved.
      where: { approved: true, direction: 'USER_TO_DRIVER' },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    .catch(() => []);

  const average =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : null;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Reviews', url: `/${locale}/reviews` },
        ]}
      />
      {/* AggregateRating is emitted only once real approved reviews exist —
          never with placeholder numbers. */}
      {average !== null && reviews.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AggregateRating',
              itemReviewed: { '@type': 'TaxiService', name: 'BCNAirportTaxi' },
              ratingValue: average.toFixed(1),
              reviewCount: reviews.length,
            }),
          }}
        />
      )}

      <PageHero title={t('h1')} intro={t('intro')} />

      <div className="mx-auto max-w-3xl px-4 py-14">
        {reviews.length === 0 ? (
          <p className="rounded-card border border-line bg-raise p-8 text-center text-dim">
            {t('empty')}
          </p>
        ) : (
          <>
            <p className="font-mono text-lg">
              {average?.toFixed(1)} / 5 · {reviews.length} reviews
            </p>
            <ul className="mt-8 space-y-5">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-card border border-line bg-raise p-6">
                  <p aria-label={`${r.rating} out of 5`} className="font-mono text-gold">
                    {'★'.repeat(r.rating)}
                    <span className="text-dim">{'★'.repeat(5 - r.rating)}</span>
                  </p>
                  <p className="mt-3 leading-relaxed">{r.text}</p>
                  <p className="mt-3 text-sm text-dim">{r.authorName}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {/*
          Why the policy is spelled out on a page that currently lists nothing:
          the honest explanation of how reviews get here is the one piece of
          content this page can carry without any reviews existing, and it is
          the part that matters. Inventing testimonials, or emitting an
          AggregateRating off zero reviews, would be fraud rather than SEO.
        */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-extrabold">{t('policyTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('policyBody1')}</p>
          <p className="mt-3 leading-relaxed">{t('policyBody2')}</p>

          <h2 className="mt-12 font-display text-2xl font-extrabold">{t('whyEmptyTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('whyEmptyBody1')}</p>
          <p className="mt-3 leading-relaxed">{t('whyEmptyBody2')}</p>
        </section>
      </div>
    </>
  );
}
