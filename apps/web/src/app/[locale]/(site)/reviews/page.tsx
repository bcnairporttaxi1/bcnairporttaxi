import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
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
  return {
    title: 'Barcelona Airport Taxi Reviews',
    description:
      'Reviews from passengers who booked a Barcelona airport taxi with BCNAirportTaxi. Every review comes from a completed, verified booking.',
    alternates: { canonical: `/${locale}/reviews`, languages },
  };
}

export default async function ReviewsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

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

      <PageHero
        title="Passenger reviews"
        intro="Every review here comes from a completed booking. We publish them after a quick check that the trip actually took place."
      />

      <div className="mx-auto max-w-3xl px-4 py-14">
        {reviews.length === 0 ? (
          <p className="rounded-card border border-line bg-raise p-8 text-center text-dim">
            No reviews published yet. Once passengers start completing trips, their
            reviews will appear here.
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
      </div>
    </>
  );
}
