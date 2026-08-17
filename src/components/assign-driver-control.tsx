'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export interface AssignableDriver {
  id: string;
  name: string;
  plate: string | null;
  vehicleName: string | null;
  /** Rides already on this driver's plate today, so dispatch can spread load. */
  loadToday: number;
  busy: boolean;
}

/**
 * One-click driver assignment.
 *
 * The previous control was a select plus a submit button: choose, then confirm,
 * then wait. Dispatch does this dozens of times a day, so it is now one button
 * per driver — press the name, the ride is theirs.
 *
 * A select reappears only past eight drivers, where a wall of buttons would be
 * slower to scan than a list. Load and availability sit on each button because
 * "who is free" is the actual question being answered, and making someone open
 * a second screen to answer it is what made the old control tiring.
 */

function DriverButton({
  driver,
  assigned,
}: {
  driver: AssignableDriver;
  assigned: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="driverId"
      value={driver.id}
      disabled={pending}
      aria-pressed={assigned}
      className={`group flex min-w-[9.5rem] flex-col items-start gap-0.5 rounded-xl border-2 px-3.5 py-2.5 text-left transition disabled:opacity-50 ${
        assigned
          ? 'border-accent bg-accent/15'
          : 'border-hairline bg-white hover:border-ink hover:bg-porcelain'
      }`}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <span className="font-display text-sm font-bold">{driver.name}</span>
        {assigned && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text">
            assigned
          </span>
        )}
      </span>
      <span className="font-mono text-[11px] text-muted">
        {driver.plate ?? 'no plate'}
        {driver.vehicleName ? ` · ${driver.vehicleName}` : ''}
      </span>
      <span className="text-[11px] text-muted">
        {driver.busy ? (
          <span className="font-semibold text-amber-700">on a ride now</span>
        ) : driver.loadToday > 0 ? (
          `${driver.loadToday} today`
        ) : (
          <span className="text-green-700">free today</span>
        )}
      </span>
    </button>
  );
}

function Unassign() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name="driverId"
      value=""
      disabled={pending}
      className="rounded-xl border-2 border-hairline px-3.5 py-2.5 text-sm font-bold text-muted transition hover:border-red-400 hover:text-red-800 disabled:opacity-50"
    >
      Unassign
    </button>
  );
}

export function AssignDriverControl({
  bookingId,
  locale,
  drivers,
  assignedId,
  action,
}: {
  bookingId: string;
  locale: string;
  drivers: AssignableDriver[];
  assignedId: string | null;
  action: (formData: FormData) => Promise<void>;
}) {
  const [showAll, setShowAll] = useState(false);

  if (drivers.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-hairline px-4 py-3 text-sm text-muted">
        No active drivers yet. Add one under{' '}
        <span className="font-semibold">Drivers</span> to assign this ride.
      </p>
    );
  }

  // Free drivers first — that is who dispatch is looking for.
  const sorted = [...drivers].sort((a, b) => {
    if (a.id === assignedId) return -1;
    if (b.id === assignedId) return 1;
    if (a.busy !== b.busy) return a.busy ? 1 : -1;
    return a.loadToday - b.loadToday;
  });

  const compact = sorted.length > 8 && !showAll;
  const shown = compact ? sorted.slice(0, 8) : sorted;

  return (
    <form action={action} className="flex flex-wrap items-stretch gap-2">
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="locale" value={locale} />

      {shown.map((d) => (
        <DriverButton key={d.id} driver={d} assigned={d.id === assignedId} />
      ))}

      {compact && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="rounded-xl border-2 border-dashed border-hairline px-3.5 py-2.5 text-sm font-bold text-muted hover:border-ink hover:text-ink"
        >
          +{sorted.length - 8} more
        </button>
      )}

      {assignedId && <Unassign />}
    </form>
  );
}
