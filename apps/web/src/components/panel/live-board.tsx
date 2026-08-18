import { Card, CardHeader, Empty } from '@/components/panel/ui';
import { StatusPill } from '@/components/panel-shell';
import { RideProgress, STAGE_SENTENCE, formatMinutes } from '@/components/panel/ride-progress';
import type { LiveRide } from '@/lib/live-rides';

/**
 * The rides in motion right now, one card each.
 *
 * This exists because a status column answers "what" but not "how long", and
 * on a dispatch desk the second question is the one that starts a phone call.
 * Each card therefore leads with the stage in plain language — "Driver is
 * waiting at the door" rather than ARRIVED — and states how long it has been
 * true.
 *
 * Cards that have outrun their stage are flagged rather than merely sorted to
 * the top, so the desk sees a problem without having to know that the top of
 * the list is where problems live.
 */

function metresLabel(m: number): string {
  return m < 1000 ? `${m} m away` : `${(m / 1000).toFixed(1)} km away`;
}

function LiveCard({ ride, locale, now }: { ride: LiveRide; locale: string; now: Date }) {
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(ride.pickupAt);

  return (
    <div
      className={`p-card p-4 ${ride.stalled ? 'border-[rgb(248_113_113/45%)]' : ''}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold p-gold">{ride.reference}</span>
            <StatusPill value={ride.status} />
          </p>
          <p className="mt-1.5 text-sm font-bold">
            {STAGE_SENTENCE[ride.status] ?? ride.status}
          </p>
          <p className="mt-0.5 font-mono text-xs p-muted">
            {ride.stageMinutes < 1
              ? 'just now'
              : `${formatMinutes(ride.stageMinutes)} in this stage`}
            {ride.driverMetresAway !== null && ` · ${metresLabel(ride.driverMetresAway)}`}
          </p>
        </div>

        {ride.stalled && (
          <span className="rounded-full bg-[rgb(248_113_113/14%)] px-2.5 py-1 text-xs font-bold text-[var(--p-down)]">
            Needs a look
          </span>
        )}
      </div>

      {/* Proximity is a stronger signal than the button the driver pressed:
          the car can be outside before anyone taps Arrived. */}
      {ride.atDoor && ride.status !== 'ON_BOARD' && (
        <p className="mt-3 rounded-lg bg-[rgb(74_222_128/10%)] px-3 py-2 text-xs font-bold text-[var(--p-up)]">
          Car is at the door — within {ride.driverMetresAway} m of the pickup point
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-wider p-faint">Route</p>
          <p className="mt-1 text-sm">
            {ride.pickupLabel}
            <span className="p-faint"> → </span>
            {ride.dropoffLabel}
          </p>
          <p className="mt-2 font-mono text-xs p-muted">Pickup booked for {time}</p>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider p-faint">
            Passenger
          </p>
          <p className="mt-1 text-sm">{ride.contactName}</p>
          <a
            href={`tel:${ride.contactPhone}`}
            className="font-mono text-xs p-gold hover:underline"
          >
            {ride.contactPhone}
          </a>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider p-faint">
            Driver
          </p>
          <p className="mt-1 text-sm">
            {ride.driverName ?? <span className="p-faint">Not assigned</span>}
            {ride.plate && <span className="ml-2 font-mono text-xs p-muted">{ride.plate}</span>}
          </p>
          {ride.driverPhone && (
            <a
              href={`tel:${ride.driverPhone}`}
              className="font-mono text-xs p-gold hover:underline"
            >
              {ride.driverPhone}
            </a>
          )}

          <p className="mt-3 text-xs p-muted">
            {ride.paymentMode === 'FULL_PREPAID' ? (
              <span className="text-[var(--p-up)]">Prepaid — nothing to collect</span>
            ) : (
              <span className="p-gold">
                Driver collects the metered fare in the car
              </span>
            )}
          </p>
        </div>

        <div className="min-w-0">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider p-faint">
            Progress
          </p>
          <RideProgress
            timeline={{
              status: ride.status,
              hasDriver: ride.hasDriver,
              enRouteAt: ride.enRouteAt,
              arrivedAt: ride.arrivedAt,
              onBoardAt: ride.onBoardAt,
              completedAt: ride.completedAt,
              cancelledAt: ride.cancelledAt,
            }}
            locale={locale}
            now={now}
          />
        </div>
      </div>
    </div>
  );
}

export function LiveBoard({
  rides,
  locale,
  now = new Date(),
  limit,
  hint,
}: {
  rides: LiveRide[];
  locale: string;
  now?: Date;
  /** Cap for the dashboard, where this is a summary rather than the workspace. */
  limit?: number;
  hint?: string;
}) {
  const shown = limit ? rides.slice(0, limit) : rides;
  const stalled = rides.filter((r) => r.stalled).length;

  return (
    <Card>
      <CardHeader
        title="Live rides"
        hint={
          hint ??
          (rides.length === 0
            ? 'nothing on the road right now'
            : `${rides.length} in progress${stalled > 0 ? ` · ${stalled} needing a look` : ''}`)
        }
      />
      {shown.length === 0 ? (
        <Empty message="No ride is in progress. Rides appear here the moment a driver sets off." />
      ) : (
        <div className="grid gap-3">
          {shown.map((r) => (
            <LiveCard key={r.id} ride={r} locale={locale} now={now} />
          ))}
          {limit && rides.length > limit && (
            <p className="text-center text-xs p-muted">
              {rides.length - limit} more in progress
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
