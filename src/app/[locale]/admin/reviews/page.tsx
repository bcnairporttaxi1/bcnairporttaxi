import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PanelShell } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { moderateReview } from '../actions';
import { ADMIN_TABS } from '../tabs';

export const metadata: Metadata = {
  title: { absolute: 'Reviews | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function AdminReviewsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const reviews = await prisma.review.findMany({
    include: { booking: { select: { reference: true } } },
    orderBy: [{ approved: 'asc' }, { createdAt: 'desc' }],
  });

  const pending = reviews.filter((r) => !r.approved);

  return (
    <PanelShell
      title="Reviews"
      subtitle="Only approved reviews appear on the site and feed the aggregate rating."
      userName={user.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin/reviews"
    >
      <p className="text-muted">
        {pending.length} awaiting moderation · {reviews.length - pending.length} published
      </p>

      {reviews.length === 0 ? (
        <p className="mt-6 rounded-card border border-hairline bg-white p-10 text-center text-muted">
          No reviews yet. They appear here once passengers complete trips.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-card border border-hairline bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-accent-text" aria-label={`${r.rating} out of 5`}>
                    {'★'.repeat(r.rating)}
                    <span className="text-muted">{'★'.repeat(5 - r.rating)}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {r.authorName} · booking {r.booking.reference}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    r.approved ? 'bg-green-100 text-green-900' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {r.approved ? 'published' : 'pending'}
                </span>
              </div>

              <p className="mt-3 leading-relaxed">{r.text}</p>

              {!r.approved && (
                <div className="mt-4 flex gap-3 border-t border-hairline pt-4">
                  <form action={moderateReview}>
                    <input type="hidden" name="reviewId" value={r.id} />
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="approve" value="1" />
                    <button
                      type="submit"
                      className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-ink hover:bg-accent-deep"
                    >
                      Publish
                    </button>
                  </form>
                  <form action={moderateReview}>
                    <input type="hidden" name="reviewId" value={r.id} />
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="approve" value="0" />
                    <button
                      type="submit"
                      className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
