'use client';

import { useState } from 'react';
import { StatusPill } from '@/components/panel-shell';

export interface RideRow {
  id: string;
  reference: string;
  status: string;
  pickupAt: string;
  pickupLabel: string;
  dropoffLabel: string;
  contactName: string;
  contactPhone: string;
  driverName: string | null;
  paymentMode: string;
  paymentStatus: string;
  bookingFee: string;
  fare: string;
  driverPayout: string;
  cashToCollect: string;
  /** Plain-language stage, e.g. "Driver is waiting at the door". */
  stage: string;
  /** How long the ride has been in that stage, when it is in progress. */
  stageFor: string | null;
  live: boolean;
}

/**
 * The ride list, with bulk selection.
 *
 * Selection is client state and the ids ride along in the form, so one submit
 * carries the whole batch. The destructive option is guarded twice: it only
 * appears once something is selected, and it asks before firing.
 *
 * Everything visual here is expressed through the panel's own tokens. The
 * previous version reused the marketing site's classes — `text-muted`,
 * `bg-white`, `border-hairline` — which are tuned for a white page. On the
 * panel's near-black ground `text-muted` measured 3.74:1, below the 4.5:1 that
 * WCAG AA asks of body text, and the dates, references, passenger names and
 * fees were effectively invisible.
 */
export function AdminRideTable({
  rows,
  locale,
  drivers,
  statuses,
  bulkAction,
}: {
  rows: RideRow[];
  locale: string;
  drivers: { id: string; name: string }[];
  statuses: string[];
  bulkAction: (formData: FormData) => Promise<void>;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [op, setOp] = useState<'status' | 'driver' | 'delete'>('status');

  const allOn = rows.length > 0 && selected.size === rows.length;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (rows.length === 0) {
    return (
      <div className="p-card border-dashed p-10 text-center text-sm p-muted">
        Nothing in this list.
      </div>
    );
  }

  return (
    <form action={bulkAction}>
      <input type="hidden" name="locale" value={locale} />
      {[...selected].map((id) => (
        <input key={id} type="hidden" name="ids" value={id} />
      ))}

      {selected.size > 0 && (
        <div className="sticky top-16 z-10 mb-3 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--p-gold)] bg-[var(--p-surface-2)] p-4 shadow-lg">
          <span className="font-display text-sm font-extrabold p-gold">
            {selected.size} selected
          </span>

          <select
            name="op"
            value={op}
            onChange={(e) => setOp(e.target.value as typeof op)}
            className="p-select"
            aria-label="Bulk action"
          >
            <option value="status">Set status</option>
            <option value="driver">Assign driver</option>
            <option value="delete">Delete</option>
          </select>

          {op === 'status' && (
            <select name="status" className="p-select" aria-label="New status">
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, ' ').toLowerCase()}
                </option>
              ))}
            </select>
          )}

          {op === 'driver' && (
            <select name="driverId" className="p-select" aria-label="Driver">
              <option value="">— unassign —</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            onClick={(e) => {
              if (
                op === 'delete' &&
                !confirm(
                  `Delete ${selected.size} ride(s)? Anything already paid for is cancelled instead, so the record survives.`,
                )
              ) {
                e.preventDefault();
              }
            }}
            className={`p-btn ${op === 'delete' ? 'p-btn-danger' : 'p-btn-gold'}`}
          >
            Apply
          </button>

          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-sm font-semibold p-muted underline underline-offset-4 hover:text-[var(--p-text)]"
          >
            Clear
          </button>
        </div>
      )}

      <div className="p-card overflow-x-auto">
        <table className="p-table">
          <thead>
            <tr>
              <th className="w-10">
                <input
                  type="checkbox"
                  checked={allOn}
                  onChange={() =>
                    setSelected(allOn ? new Set() : new Set(rows.map((r) => r.id)))
                  }
                  aria-label="Select all rides"
                />
              </th>
              <th>When</th>
              <th>Reference</th>
              <th>Route</th>
              <th>Passenger</th>
              <th>Driver</th>
              <th>Status</th>
              <th className="text-right">Fee</th>
              <th className="text-right">To driver</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="p-row" data-selected={selected.has(r.id)}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                    aria-label={`Select ride ${r.reference}`}
                  />
                </td>
                <td className="whitespace-nowrap font-mono text-xs">{r.pickupAt}</td>
                <td className="whitespace-nowrap font-mono text-xs font-bold p-gold">
                  {r.reference}
                </td>
                <td className="max-w-xs">
                  <span className="line-clamp-2">
                    {r.pickupLabel}
                    <span className="p-faint"> → </span>
                    {r.dropoffLabel}
                  </span>
                </td>
                <td>
                  <span className="block whitespace-nowrap">{r.contactName}</span>
                  <a
                    href={`tel:${r.contactPhone}`}
                    className="font-mono text-xs p-muted hover:text-[var(--p-gold-bright)]"
                  >
                    {r.contactPhone}
                  </a>
                </td>
                <td className="whitespace-nowrap">
                  {r.driverName ?? <span className="p-faint">—</span>}
                </td>
                <td className="min-w-56">
                  <span className="flex items-center gap-2">
                    {r.live && <span aria-hidden="true" className="p-step-dot p-step-now" />}
                    <StatusPill value={r.status} />
                  </span>
                  {/* The stage in words, because ON_BOARD tells an operator
                      less than "Passenger is in the car" does. */}
                  <span
                    className={`mt-1 block text-xs ${
                      r.live ? 'text-[var(--p-up)]' : 'p-muted'
                    }`}
                  >
                    {r.stage}
                    {r.stageFor && (
                      <span className="ml-1 font-mono p-faint">· {r.stageFor}</span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs p-faint">
                    {r.paymentMode === 'FULL_PREPAID' ? 'prepaid' : 'fee only'} ·{' '}
                    {r.paymentStatus.toLowerCase()}
                  </span>
                </td>
                <td className="whitespace-nowrap text-right font-mono">{r.bookingFee}</td>
                <td className="whitespace-nowrap text-right font-mono">
                  {r.driverPayout !== '—' ? (
                    <span className="font-bold p-gold">{r.driverPayout}</span>
                  ) : (
                    <span className="p-muted" title="Settled in the car">
                      {r.cashToCollect}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}
