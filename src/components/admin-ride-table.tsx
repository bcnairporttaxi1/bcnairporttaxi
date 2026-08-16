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
}

/**
 * The ride list, with bulk selection.
 *
 * Selection is client state and the ids ride along in the form, so one submit
 * carries the whole batch. The destructive option is guarded twice: it only
 * appears once something is selected, and it asks before firing.
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
      <p className="rounded-card border border-hairline bg-white p-10 text-center text-muted">
        Nothing here.
      </p>
    );
  }

  return (
    <form action={bulkAction}>
      <input type="hidden" name="locale" value={locale} />
      {[...selected].map((id) => (
        <input key={id} type="hidden" name="ids" value={id} />
      ))}

      {selected.size > 0 && (
        <div className="sticky top-0 z-10 mb-3 flex flex-wrap items-center gap-3 rounded-card border-2 border-accent bg-accent/10 p-4">
          <span className="font-display text-sm font-extrabold">
            {selected.size} selected
          </span>

          <select
            name="op"
            value={op}
            onChange={(e) => setOp(e.target.value as typeof op)}
            className="rounded-lg border border-hairline bg-white px-3 py-2 text-sm"
          >
            <option value="status">Set status</option>
            <option value="driver">Assign driver</option>
            <option value="delete">Delete</option>
          </select>

          {op === 'status' && (
            <select
              name="status"
              className="rounded-lg border border-hairline bg-white px-3 py-2 text-sm"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

          {op === 'driver' && (
            <select
              name="driverId"
              className="rounded-lg border border-hairline bg-white px-3 py-2 text-sm"
            >
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
            className={`rounded-lg px-4 py-2 text-sm font-bold ${
              op === 'delete'
                ? 'bg-red-700 text-white hover:bg-red-800'
                : 'bg-ink text-porcelain hover:bg-graphite'
            }`}
          >
            Apply
          </button>

          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Clear
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-card border border-hairline bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-hairline text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={allOn}
                  onChange={() =>
                    setSelected(allOn ? new Set() : new Set(rows.map((r) => r.id)))
                  }
                  aria-label="Select all rides"
                />
              </th>
              <th className="p-3">When</th>
              <th className="p-3">Reference</th>
              <th className="p-3">Route</th>
              <th className="p-3">Passenger</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Fee</th>
              <th className="p-3 text-right">To driver</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`border-b border-hairline last:border-0 ${
                  selected.has(r.id) ? 'bg-accent/5' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                    aria-label={`Select ride ${r.reference}`}
                  />
                </td>
                <td className="whitespace-nowrap p-3">{r.pickupAt}</td>
                <td className="p-3 font-mono">{r.reference}</td>
                <td className="p-3 text-muted">
                  {r.pickupLabel} → {r.dropoffLabel}
                </td>
                <td className="p-3">
                  {r.contactName}
                  <span className="block text-xs text-muted">{r.contactPhone}</span>
                </td>
                <td className="p-3">{r.driverName ?? <span className="text-muted">—</span>}</td>
                <td className="p-3">
                  <StatusPill value={r.status} />
                  <span className="mt-1 block text-xs text-muted">
                    {r.paymentMode === 'FULL_PREPAID' ? 'prepaid' : 'fee only'} ·{' '}
                    {r.paymentStatus.toLowerCase()}
                  </span>
                </td>
                <td className="p-3 text-right font-mono">{r.bookingFee}</td>
                <td className="p-3 text-right font-mono">
                  {r.driverPayout !== '—' ? (
                    <span className="font-bold">{r.driverPayout}</span>
                  ) : (
                    <span className="text-muted" title="Settled in the car">
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
