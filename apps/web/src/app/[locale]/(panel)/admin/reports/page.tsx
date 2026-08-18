import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { dateIn } from '@bcn/core/format';
import { requireRole } from '@/lib/guards';
import { adminNav } from '../tabs';
import { resolveReport, setUserBlocked } from '../actions';

export const metadata: Metadata = {
  title: { absolute: 'Reports | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const TONE: Record<string, string> = {
  OPEN: 'bg-red-100 text-red-900',
  REVIEWING: 'bg-amber-100 text-amber-900',
  RESOLVED: 'bg-green-100 text-green-900',
  DISMISSED: 'bg-slate-200 text-slate-700',
};

export default async function ReportsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const when = dateIn(locale, 'medium');

  const reports = await prisma.report.findMany({
    include: {
      booking: { select: { reference: true, pickupAt: true } },
      byUser: { select: { name: true, email: true } },
      byDriver: { select: { name: true, phone: true } },
      againstUser: { select: { id: true, name: true, email: true, blocked: true } },
      againstDriver: { select: { id: true, name: true, phone: true, blocked: true } },
    },
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    take: 200,
  });

  const open = reports.filter((r) => r.status === 'OPEN' || r.status === 'REVIEWING');
  const closed = reports.filter((r) => r.status === 'RESOLVED' || r.status === 'DISMISSED');

  function Card({ r }: { r: (typeof reports)[number] }) {
    const from = r.reporterRole === 'DRIVER' ? r.byDriver?.name : r.byUser?.name;
    const about =
      r.reporterRole === 'DRIVER' ? r.againstUser?.name : r.againstDriver?.name;
    const blocked =
      r.reporterRole === 'DRIVER' ? r.againstUser?.blocked : r.againstDriver?.blocked;

    return (
      <article className="p-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display font-extrabold">{r.reason}</p>
            <p className="mt-1 text-sm p-muted">
              {r.reporterRole === 'DRIVER' ? 'Driver' : 'Passenger'}{' '}
              <strong>{from ?? 'unknown'}</strong> about{' '}
              <strong>{about ?? 'unknown'}</strong> · {when(r.createdAt)}
            </p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${TONE[r.status]}`}>
            {r.status}
          </span>
        </div>

        {r.details && (
          <p className="mt-3 rounded-lg bg-[var(--p-surface-2)] p-3 text-sm leading-relaxed">
            {r.details}
          </p>
        )}

        <p className="mt-3 text-sm p-muted">
          Ride{' '}
          <Link
            href={{ pathname: '/admin/rides', query: { bucket: 'completed' } }}
            className="font-mono font-semibold p-gold underline underline-offset-4"
          >
            {r.booking.reference}
          </Link>
        </p>

        <form
          action={resolveReport}
          className="mt-5 flex flex-wrap items-end gap-3 border-t p-hairline pt-4"
        >
          <input type="hidden" name="reportId" value={r.id} />
          <input type="hidden" name="locale" value={locale} />
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-xs p-muted">Notes</span>
            <input
              name="notes"
              defaultValue={r.adminNotes ?? ''}
              className="w-full rounded-lg border p-hairline px-3 py-2 text-sm"
            />
          </label>
          {r.status === 'OPEN' && (
            <button
              name="status"
              value="REVIEWING"
              className="rounded-lg border-2 border-[var(--p-gold)] px-4 py-2 text-sm font-bold hover:bg-[var(--p-gold)] hover:text-[#0a0a0b]"
            >
              Reviewing
            </button>
          )}
          <button
            name="status"
            value="RESOLVED"
            className="wave rounded-lg bg-[var(--p-gold)] px-4 py-2 text-sm font-bold text-[#0a0a0b] hover:bg-[var(--p-gold-bright)]"
          >
            Resolve
          </button>
          <button
            name="status"
            value="DISMISSED"
            className="rounded-lg border-2 p-hairline px-4 py-2 text-sm font-bold hover:border-[var(--p-gold)]"
          >
            Dismiss
          </button>
        </form>

        {/* Suspension is separate from resolving the report: an upheld complaint
            does not automatically mean an account should stop working. */}
        {r.reporterRole === 'DRIVER' && r.againstUser && (
          <form
            action={setUserBlocked}
            className="mt-3 flex flex-wrap items-end gap-3 border-t p-hairline pt-4"
          >
            <input type="hidden" name="userId" value={r.againstUser.id} />
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="blocked" value={blocked ? '0' : '1'} />
            <label className="flex-1 text-sm">
              <span className="mb-1 block text-xs p-muted">Suspension reason</span>
              <input
                name="reason"
                className="w-full rounded-lg border p-hairline px-3 py-2 text-sm"
              />
            </label>
            <button
              className={`rounded-lg px-4 py-2 text-sm font-bold ${
                blocked
                  ? 'border-2 border-[var(--p-gold)] hover:bg-[var(--p-gold)] hover:text-[#0a0a0b]'
                  : 'border-2 border-red-700 text-red-800 hover:bg-red-700 hover:text-white'
              }`}
            >
              {blocked ? 'Restore passenger account' : 'Suspend passenger account'}
            </button>
          </form>
        )}
      </article>
    );
  }

  return (
    <PanelShell
      title="Reports"
      subtitle="Complaints raised by passengers about drivers, and by drivers about passengers."
      userName={user.name}
      locale={locale}
      groups={adminNav()}
      activeHref="/admin/reports"
    >
      <section>
        <h2 className="font-display text-xl font-extrabold">Open ({open.length})</h2>
        {open.length === 0 ? (
          <p className="mt-4 p-card p-8 text-center p-muted">
            Nothing outstanding.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {open.map((r) => (
              <Card key={r.id} r={r} />
            ))}
          </div>
        )}
      </section>

      {closed.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold">Closed ({closed.length})</h2>
          <div className="mt-4 space-y-4">
            {closed.map((r) => (
              <Card key={r.id} r={r} />
            ))}
          </div>
        </section>
      )}
    </PanelShell>
  );
}
