import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PanelShell } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { eurIn, dateIn } from '@bcn/core/format';
import { requireRole } from '@/lib/guards';
import { ADMIN_TABS } from '../tabs';
import { decideWithdrawal } from '../actions';

export const metadata: Metadata = {
  title: { absolute: 'Payouts | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const TONE: Record<string, string> = {
  REQUESTED: 'bg-amber-100 text-amber-900',
  APPROVED: 'bg-blue-100 text-blue-900',
  PAID: 'bg-green-100 text-green-900',
  REJECTED: 'bg-red-100 text-red-900',
};

export default async function WithdrawalsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const eur = eurIn(locale);
  const when = dateIn(locale, 'medium');

  const withdrawals = await prisma.withdrawal.findMany({
    include: { driver: { select: { name: true, phone: true } } },
    orderBy: [{ status: 'asc' }, { requestedAt: 'desc' }],
    take: 200,
  });

  const open = withdrawals.filter((w) => w.status === 'REQUESTED' || w.status === 'APPROVED');
  const settled = withdrawals.filter((w) => w.status === 'PAID' || w.status === 'REJECTED');

  function Row({ w }: { w: (typeof withdrawals)[number] }) {
    const actionable = w.status === 'REQUESTED' || w.status === 'APPROVED';
    return (
      <article className="rounded-card border border-hairline bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xl font-extrabold">{eur(w.amount)}</p>
            <p className="text-sm text-muted">
              {w.driver.name} · {w.driver.phone}
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${TONE[w.status] ?? ''}`}
          >
            {w.status}
          </span>
        </div>

        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Method</dt>
            <dd className="font-medium">{w.method === 'BIZUM' ? 'Bizum' : 'Bank transfer'}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Send to</dt>
            <dd className="font-mono">{w.destination}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Requested</dt>
            <dd>{when(w.requestedAt)}</dd>
          </div>
          {w.reference && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">Reference</dt>
              <dd className="font-mono">{w.reference}</dd>
            </div>
          )}
          {w.adminNotes && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">Note</dt>
              <dd>{w.adminNotes}</dd>
            </div>
          )}
        </dl>

        {actionable && (
          <form
            action={decideWithdrawal}
            className="mt-5 flex flex-wrap items-end gap-3 border-t border-hairline pt-4"
          >
            <input type="hidden" name="withdrawalId" value={w.id} />
            <input type="hidden" name="locale" value={locale} />

            <label className="text-sm">
              <span className="mb-1 block text-xs text-muted">Payment reference</span>
              <input
                name="reference"
                placeholder="optional"
                className="rounded-lg border border-hairline px-3 py-2 text-sm"
              />
            </label>
            <label className="flex-1 text-sm">
              <span className="mb-1 block text-xs text-muted">Note to driver</span>
              <input
                name="note"
                className="w-full rounded-lg border border-hairline px-3 py-2 text-sm"
              />
            </label>

            {w.status === 'REQUESTED' && (
              <button
                name="status"
                value="APPROVED"
                className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
              >
                Approve
              </button>
            )}
            <button
              name="status"
              value="PAID"
              className="wave rounded-lg bg-accent px-4 py-2 text-sm font-bold text-ink hover:bg-accent-deep"
            >
              Mark sent
            </button>
            <button
              name="status"
              value="REJECTED"
              className="rounded-lg border-2 border-red-700 px-4 py-2 text-sm font-bold text-red-800 hover:bg-red-700 hover:text-white"
            >
              Decline
            </button>
          </form>
        )}
      </article>
    );
  }

  return (
    <PanelShell
      title="Payouts"
      subtitle="Driver withdrawal requests. Declining returns the money to their balance."
      userName={user.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin/withdrawals"
    >
      <section>
        <h2 className="font-display text-xl font-extrabold">To action ({open.length})</h2>
        {open.length === 0 ? (
          <p className="mt-4 rounded-card border border-hairline bg-white p-8 text-center text-muted">
            Nothing waiting.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {open.map((w) => (
              <Row key={w.id} w={w} />
            ))}
          </div>
        )}
      </section>

      {settled.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold">Settled ({settled.length})</h2>
          <div className="mt-4 space-y-4">
            {settled.map((w) => (
              <Row key={w.id} w={w} />
            ))}
          </div>
        </section>
      )}
    </PanelShell>
  );
}
