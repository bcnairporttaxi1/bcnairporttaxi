import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { Card, CardHeader } from '@/components/panel/ui';
import { RideProgress, STAGE_SENTENCE } from '@/components/panel/ride-progress';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { eurIn, dateIn } from '@bcn/core/format';
import { toBarcelonaInput } from '@bcn/core/barcelona-time';
import { adminNav } from '../../tabs';
import { assignDriver, cancelRide, editRide, setBookingStatus } from '../../actions';

export const metadata: Metadata = {
  title: { absolute: 'Ride | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

/**
 * One booking, everything on it.
 *
 * The rides list showed a row per booking and nothing opened from it. There
 * was no way to see the passenger's email, the notes they left, the flight
 * number, the vehicle, how the price was built, when the driver actually
 * arrived, or the payment reference — and no way to act on one ride short of
 * selecting it in the bulk bar. An earlier detail card had been built for
 * exactly this, but nothing ever linked to it, so a later tidy-up removed it
 * as unreferenced. This page is the route it should have had.
 *
 * Every action here already existed in admin/actions.ts. This adds the page,
 * not the behaviour.
 */

const STATUSES = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'EN_ROUTE',
  'ARRIVED',
  'ON_BOARD',
  'COMPLETED',
  'CANCELLED',
] as const;

function Row({ label, children, mono = false }: { label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[var(--p-line-soft)] py-2.5 text-sm last:border-0">
      <dt className="shrink-0 p-muted">{label}</dt>
      <dd className={`text-right ${mono ? 'font-mono' : ''}`}>{children}</dd>
    </div>
  );
}

export default async function AdminRideDetailPage(props: {
  params: Promise<{ locale: string; reference: string }>;
}) {
  const { locale, reference } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const [booking, drivers] = await Promise.all([
    prisma.booking.findUnique({
      where: { reference: reference.toUpperCase() },
      include: {
        driver: { select: { id: true, name: true, phone: true, plate: true } },
        vehicle: { select: { name: true, seats: true, bags: true } },
        user: { select: { id: true, email: true, name: true } },
        _count: { select: { messages: true, reviews: true, reports: true } },
      },
    }),
    prisma.driver.findMany({
      where: { active: true, blocked: false },
      select: { id: true, name: true, vehicle: { select: { name: true } } },
      orderBy: { name: 'asc' },
    }),
  ]);
  if (!booking) notFound();

  const eur = eurIn(locale);
  const when = dateIn(locale, 'long');
  const b = booking;

  const live = ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'].includes(b.status);
  const closed = b.status === 'COMPLETED' || b.status === 'CANCELLED';
  const mapsUrl = (lat: number, lng: number) => `https://www.google.com/maps?q=${lat},${lng}`;
  const wa = (phone: string) => `https://wa.me/${phone.replace(/[^\d]/g, '')}`;

  return (
    <PanelShell
      title={b.reference}
      subtitle={STAGE_SENTENCE[b.status] ?? b.status}
      userName={user.name}
      locale={locale}
      groups={adminNav()}
      activeHref="/admin/rides"
    >
      {/* ── Header strip ──────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/rides"
          className="text-sm font-semibold p-muted underline underline-offset-4 hover:text-[var(--p-text)]"
        >
          ← All rides
        </Link>
        <span className="flex items-center gap-2">
          {live && <span aria-hidden="true" className="p-step-dot p-step-now" />}
          <StatusPill value={b.status} />
        </span>
        <span className="text-xs p-faint">
          Booked {when(b.createdAt)} · {b.paymentMode === 'FULL_PREPAID' ? 'prepaid' : 'fee only'} ·{' '}
          {b.paymentStatus.toLowerCase()}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ── Passenger ─────────────────────────────────────────────── */}
        <Card>
          <CardHeader
            title="Passenger"
            hint={b.user ? 'Has an account' : 'Guest checkout'}
            actions={
              <span className="flex gap-2">
                <a href={`tel:${b.contactPhone}`} className="p-btn p-btn-ghost">
                  Call
                </a>
                <a
                  href={wa(b.contactPhone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-btn p-btn-ghost"
                >
                  WhatsApp
                </a>
              </span>
            }
          />
          <dl>
            <Row label="Name">
              <span className="font-semibold">{b.contactName}</span>
            </Row>
            <Row label="Phone" mono>
              <a href={`tel:${b.contactPhone}`} className="hover:text-[var(--p-gold-bright)]">
                {b.contactPhone}
              </a>
            </Row>
            <Row label="Email" mono>
              <a href={`mailto:${b.contactEmail}`} className="break-all hover:text-[var(--p-gold-bright)]">
                {b.contactEmail}
              </a>
            </Row>
            <Row label="Language">{b.locale.toUpperCase()}</Row>
            <Row label="Group" mono>
              {b.passengers} pax · {b.luggage} bags
            </Row>
            {b.user && (
              <Row label="Account">
                <Link href="/admin/users" className="underline underline-offset-4 hover:text-[var(--p-gold-bright)]">
                  {b.user.email}
                </Link>
              </Row>
            )}
          </dl>

          {/* Notes carry the flight number and anything else the passenger
              wanted the driver to know. They are the single most useful
              field on this page and were the least visible. */}
          <div className="mt-4">
            <h3 className="font-mono text-[11px] uppercase tracking-wider p-faint">
              Notes for the driver
            </h3>
            {b.notes ? (
              <p className="mt-2 whitespace-pre-wrap rounded-lg bg-[var(--p-surface-2)] p-3 text-sm leading-relaxed">
                {b.notes}
              </p>
            ) : (
              <p className="mt-2 text-sm p-faint">None left.</p>
            )}
          </div>
        </Card>

        {/* ── Journey ───────────────────────────────────────────────── */}
        <Card>
          <CardHeader title="Journey" hint={`${b.roadKm} km · about ${b.durationMin} min`} />
          <dl>
            <Row label="Pickup">
              <a
                href={mapsUrl(b.pickupLat, b.pickupLng)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--p-gold-bright)]"
              >
                {b.pickupLabel}
              </a>
            </Row>
            <Row label="Drop-off">
              <a
                href={mapsUrl(b.dropoffLat, b.dropoffLng)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--p-gold-bright)]"
              >
                {b.dropoffLabel}
              </a>
            </Row>
            <Row label="Pickup time">
              <span className="font-semibold">{when(b.pickupAt)}</span>
            </Row>
            <Row label="Vehicle">
              {b.vehicle ? (
                <>
                  {b.vehicle.name}{' '}
                  <span className="p-faint">
                    · {b.vehicle.seats} seats · {b.vehicle.bags} bags
                  </span>
                </>
              ) : (
                <span className="p-faint">Not chosen</span>
              )}
            </Row>
            <Row label="Driver">
              {b.driver ? (
                <>
                  <span className="font-semibold">{b.driver.name}</span>
                  <span className="block font-mono text-xs p-muted">
                    {b.driver.phone}
                    {b.driver.plate && ` · ${b.driver.plate}`}
                  </span>
                </>
              ) : (
                <span className="p-faint">Unassigned</span>
              )}
            </Row>
          </dl>
        </Card>

        {/* ── Money ─────────────────────────────────────────────────── */}
        <Card>
          <CardHeader
            title="Money"
            hint="Every component stored at booking time, so this stays true after the tariff changes"
          />
          <dl>
            <Row label="Tariff" mono>
              {b.tariff}
            </Row>
            <Row label="Start fare" mono>
              {eur(b.startFare)}
            </Row>
            <Row label="Per km" mono>
              {eur(b.perKmRate)}
              <span className="p-faint"> meter · </span>
              {eur(b.perKmRateCharged)}
              <span className="p-faint"> charged</span>
            </Row>
            <Row label="Supplements" mono>
              {eur(b.supplements)}
            </Row>
            <Row label="Meter estimate" mono>
              {eur(b.meterEstimate)}
            </Row>
            <Row label="Fare" mono>
              {eur(b.fixedFare)}
            </Row>
            <Row label="Service charge" mono>
              {eur(b.bookingFee)}
            </Row>
            <Row label="Taken online" mono>
              <span className="font-bold p-gold">{eur(b.amountOnline)}</span>
              <span className="p-faint"> · {b.paymentStatus.toLowerCase()}</span>
            </Row>
            <Row label="Driver pay" mono>
              {b.driverPay != null ? (
                eur(b.driverPay)
              ) : (
                <span className="p-faint">not set · fare on completion</span>
              )}
            </Row>
            <Row label="Paid out" mono>
              {Number(b.driverPayout) > 0 ? eur(b.driverPayout) : <span className="p-faint">—</span>}
            </Row>
            <Row label="Cash in car" mono>
              {Number(b.cashToCollect) > 0 ? (
                <>
                  {eur(b.cashToCollect)}
                  <span className="p-faint"> · {b.cashCollected ? 'collected' : 'not yet'}</span>
                </>
              ) : (
                <span className="p-faint">—</span>
              )}
            </Row>
            {b.sumupRef && (
              <Row label="SumUp ref" mono>
                <span className="break-all text-xs">{b.sumupRef}</span>
              </Row>
            )}
          </dl>
        </Card>

        {/* ── Timeline ──────────────────────────────────────────────── */}
        <Card>
          <CardHeader
            title="Timeline"
            hint={
              b._count.messages + b._count.reviews + b._count.reports > 0
                ? `${b._count.messages} messages · ${b._count.reviews} reviews · ${b._count.reports} reports`
                : undefined
            }
          />
          <RideProgress
            locale={locale}
            timeline={{
              status: b.status,
              hasDriver: b.driverId !== null,
              enRouteAt: b.enRouteAt,
              arrivedAt: b.arrivedAt,
              onBoardAt: b.onBoardAt,
              completedAt: b.completedAt,
              cancelledAt: b.cancelledAt,
            }}
          />
          {b.status === 'CANCELLED' && (
            <p className="mt-3 text-sm p-muted">
              By {b.cancelledBy?.toLowerCase() ?? 'unknown'}
              {b.cancelReason && <> — “{b.cancelReason}”</>}
            </p>
          )}
          {live && (
            <p className="mt-4">
              <Link
                href={`/trip/${b.reference}`}
                className="p-btn p-btn-ghost"
              >
                Open live trip view
              </Link>
            </p>
          )}
        </Card>
      </div>

      {/* ── Actions ─────────────────────────────────────────────────────
          Each form posts to an action that already existed for the bulk bar;
          here it acts on this one ride. Closed rides keep the forms but the
          status select is the only sensible thing left to touch on them. */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Driver"
            hint="The driver sees only the pay figure — never the fare. Emails both sides."
          />
          <form action={assignDriver} className="flex flex-wrap gap-2">
            <input type="hidden" name="bookingId" value={b.id} />
            <input type="hidden" name="locale" value={locale} />
            <select
              name="driverId"
              defaultValue={b.driverId ?? ''}
              className="p-select min-w-0 flex-1 basis-40"
              aria-label="Driver"
            >
              <option value="">— unassign —</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                  {d.vehicle ? ` · ${d.vehicle.name}` : ''}
                </option>
              ))}
            </select>
            <label className="relative basis-28">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm p-muted">
                €
              </span>
              <input
                type="text"
                inputMode="decimal"
                name="driverPay"
                defaultValue={b.driverPay != null ? Number(b.driverPay).toFixed(2) : ''}
                placeholder="pay"
                aria-label="Driver pay in euros"
                className="p-input w-full pl-7 font-mono"
              />
            </label>
            <button type="submit" className="p-btn p-btn-gold" disabled={closed}>
              Assign
            </button>
          </form>
        </Card>

        <Card>
          <CardHeader title="Status" hint="Completing here settles the driver the same as from their panel" />
          <form action={setBookingStatus} className="flex gap-2">
            <input type="hidden" name="bookingId" value={b.id} />
            <input type="hidden" name="locale" value={locale} />
            <select name="status" defaultValue={b.status} className="p-select flex-1" aria-label="Status">
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, ' ').toLowerCase()}
                </option>
              ))}
            </select>
            <button type="submit" className="p-btn p-btn-gold">
              Set
            </button>
          </form>
        </Card>

        <Card>
          <CardHeader title="Cancel" hint="The reason is kept on the record" />
          <form action={cancelRide} className="flex gap-2">
            <input type="hidden" name="bookingId" value={b.id} />
            <input type="hidden" name="locale" value={locale} />
            <input
              name="reason"
              placeholder="Reason (optional)"
              className="p-input flex-1"
              aria-label="Cancellation reason"
              disabled={closed}
            />
            <button type="submit" className="p-btn p-btn-danger" disabled={closed}>
              Cancel ride
            </button>
          </form>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader title="Edit the ride" hint="Changes here do not re-price; the stored fare stays" />
        <form action={editRide} className="grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="bookingId" value={b.id} />
          <input type="hidden" name="locale" value={locale} />
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs p-muted">Pickup address</span>
            <input name="pickupLabel" defaultValue={b.pickupLabel} required className="p-input w-full" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs p-muted">Drop-off address</span>
            <input name="dropoffLabel" defaultValue={b.dropoffLabel} required className="p-input w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs p-muted">Pickup time (Barcelona)</span>
            <input
              name="pickupAt"
              type="datetime-local"
              defaultValue={toBarcelonaInput(b.pickupAt)}
              required
              className="p-input w-full"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-xs p-muted">Passengers</span>
              <input name="passengers" type="number" min={1} max={8} defaultValue={b.passengers} className="p-input w-full" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs p-muted">Bags</span>
              <input name="luggage" type="number" min={0} max={16} defaultValue={b.luggage} className="p-input w-full" />
            </label>
          </div>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs p-muted">Notes</span>
            <textarea name="notes" defaultValue={b.notes ?? ''} rows={3} className="p-input w-full" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="p-btn p-btn-gold">
              Save changes
            </button>
          </div>
        </form>
      </Card>
    </PanelShell>
  );
}
