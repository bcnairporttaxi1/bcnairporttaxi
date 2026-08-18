import { Link } from '@/i18n/navigation';
import { StatusPill } from '@/components/panel-shell';
import {
  AssignDriverControl,
  type AssignableDriver,
} from '@/components/assign-driver-control';

/**
 * One ride, told completely.
 *
 * Dispatch was previously reading a summary and then opening the booking page
 * for anything real — the phone number, the flight note, what the passenger
 * actually paid. Everything needed to act on a ride is here: who, where, when,
 * how much, and who is driving.
 *
 * Laid out by the order the questions get asked, not by the order the columns
 * happen to sit in the database.
 */

export interface AdminBooking {
  id: string;
  reference: string;
  status: string;
  paymentStatus: string;
  paymentMode: string;
  pickupAt: Date;
  createdAt: Date;
  pickupLabel: string;
  dropoffLabel: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  passengers: number;
  luggage: number;
  notes: string | null;
  roadKm: number;
  durationMin: number;
  tariff: string;
  startFare: unknown;
  perKmRate: unknown;
  supplements: unknown;
  meterEstimate: unknown;
  fixedFare: unknown;
  bookingFee: unknown;
  amountOnline: unknown;
  driverPayout: unknown;
  driverId: string | null;
  driver: { name: string; phone: string; plate: string | null } | null;
  vehicle: { name: string } | null;
}

function Row({
  label,
  children,
  strong = false,
}: {
  label: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className={`text-right ${strong ? 'font-mono font-bold' : 'font-mono'}`}>
        {children}
      </dd>
    </div>
  );
}

export function AdminBookingCard({
  b,
  locale,
  drivers,
  eur,
  when,
  assignAction,
}: {
  b: AdminBooking;
  locale: string;
  drivers: AssignableDriver[];
  eur: (n: unknown) => string;
  when: (d: Date) => string;
  assignAction: (formData: FormData) => Promise<void>;
}) {
  const prepaid = b.paymentMode === 'FULL_PREPAID';
  const fixed = Number(b.fixedFare);
  // The rate charged varies by day, so it is derived rather than assumed.
  const feePct = fixed > 0 ? Math.round((Number(b.bookingFee) / fixed) * 100) : 20;
  const paid = b.paymentStatus === 'PAID';

  return (
    <article className="overflow-hidden rounded-card border border-hairline bg-white">
      {/* Header: what and when — the two things scanned first */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline bg-porcelain px-5 py-4">
        <div>
          <p className="font-display text-xl font-extrabold leading-tight">
            {when(b.pickupAt)}
          </p>
          <p className="mt-0.5 font-mono text-sm text-muted">{b.reference}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill value={b.status} />
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-xs font-bold ${
              paid
                ? 'bg-green-100 text-green-900'
                : b.paymentStatus === 'FAILED'
                  ? 'bg-red-100 text-red-900'
                  : 'bg-amber-100 text-amber-900'
            }`}
          >
            {paid ? 'PAID' : b.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-2">
        {/* Journey + passenger */}
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Journey
          </h3>
          <div className="mt-2 space-y-2 text-sm">
            <p className="flex gap-2">
              <span aria-hidden="true" className="mt-1 text-accent-text">▲</span>
              <span className="font-medium">{b.pickupLabel}</span>
            </p>
            <p className="flex gap-2">
              <span aria-hidden="true" className="mt-1 text-muted">▼</span>
              <span className="font-medium">{b.dropoffLabel}</span>
            </p>
          </div>
          <p className="mt-2 font-mono text-xs text-muted">
            {b.roadKm} km · approx {b.durationMin} min · tariff {b.tariff}
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${b.pickupLat},${b.pickupLng}&destination=${b.dropoffLat},${b.dropoffLng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs font-semibold text-accent-text underline underline-offset-2"
          >
            Open route in Maps
          </a>

          <h3 className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted">
            Passenger
          </h3>
          <p className="mt-2 font-display font-bold">{b.contactName}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={`tel:${b.contactPhone}`} className="font-semibold text-accent-text">
              {b.contactPhone}
            </a>
            <a
              href={`https://wa.me/${b.contactPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-text"
            >
              WhatsApp
            </a>
            <a href={`mailto:${b.contactEmail}`} className="text-muted underline">
              {b.contactEmail}
            </a>
          </div>
          <p className="mt-1 font-mono text-xs text-muted">
            {b.passengers} passenger{b.passengers === 1 ? '' : 's'} · {b.luggage} bag
            {b.luggage === 1 ? '' : 's'}
            {b.vehicle ? ` · ${b.vehicle.name}` : ' · vehicle on assignment'}
          </p>
          {b.notes && (
            <p className="mt-3 rounded-lg bg-porcelain p-3 text-sm leading-relaxed">
              <span className="font-semibold">Note: </span>
              {b.notes}
            </p>
          )}
        </div>

        {/* Money — the full breakdown, not a summary */}
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Price breakdown
          </h3>
          <dl className="mt-2 text-sm">
            <Row label="Start fare">{eur(b.startFare)}</Row>
            <Row label={`Per km (${b.roadKm} km)`}>{eur(b.perKmRate)}/km</Row>
            {Number(b.supplements) > 0 && (
              <Row label="Supplements">{eur(b.supplements)}</Row>
            )}
            <div className="my-1 border-t border-hairline" />
            <Row label="Meter estimate" strong>
              {eur(b.meterEstimate)}
            </Row>
            <Row label="Fixed prepaid fare">{eur(b.fixedFare)}</Row>
            <Row label={`Booking fee (${feePct}%)`} strong>
              {eur(b.bookingFee)}
            </Row>
            <div className="my-1 border-t border-hairline" />
            <Row label="Charged online" strong>
              {eur(b.amountOnline)}
            </Row>
            <Row label="Driver collects in car" strong>
              {prepaid ? 'nothing' : eur(b.meterEstimate)}
            </Row>
            {Number(b.driverPayout) > 0 && (
              <Row label="We owe the driver" strong>
                {eur(b.driverPayout)}
              </Row>
            )}
          </dl>
          <p className="mt-2 rounded-lg bg-porcelain px-3 py-2 text-xs leading-relaxed text-muted">
            {prepaid
              ? 'Prepaid: fare and fee taken online. The driver collects nothing and is owed the fare.'
              : 'Fee only: the booking fee was taken online. The driver keeps the metered fare.'}
          </p>
        </div>
      </div>

      {/* Driver — one click */}
      <div className="border-t border-hairline bg-porcelain/60 px-5 py-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Driver
          </h3>
          {b.driver && (
            <p className="text-sm">
              <span className="font-display font-bold">{b.driver.name}</span>
              <span className="text-muted"> · </span>
              <a href={`tel:${b.driver.phone}`} className="font-semibold text-accent-text">
                {b.driver.phone}
              </a>
              {b.driver.plate && (
                <span className="ml-2 rounded bg-ink px-1.5 py-0.5 font-mono text-[11px] font-bold text-accent">
                  {b.driver.plate}
                </span>
              )}
            </p>
          )}
        </div>
        <AssignDriverControl
          bookingId={b.id}
          locale={locale}
          drivers={drivers}
          assignedId={b.driverId}
          action={assignAction}
        />
        <div className="mt-3 flex flex-wrap gap-4 border-t border-hairline pt-3 text-xs">
          <Link
            href={`/booking/${b.reference}`}
            className="font-semibold text-accent-text underline underline-offset-2"
          >
            Booking page
          </Link>
          <Link
            href={`/trip/${b.reference}`}
            className="font-semibold text-accent-text underline underline-offset-2"
          >
            Live trip &amp; chat
          </Link>
          <span className="text-muted">Booked {when(b.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}
