'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import type { AccountActionState } from '@/app/[locale]/account/actions';

const field =
  'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="wave mt-5 rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  );
}

/**
 * The passenger's edit form, with the window counting down in view.
 *
 * The countdown is presentation only — the server re-checks the deadline
 * against the stored booking, so a form left open past zero is refused there
 * rather than trusted here.
 */
export function EditRideForm({
  bookingId,
  locale,
  action,
  minutesLeft,
  current,
}: {
  bookingId: string;
  locale: string;
  action: (
    state: AccountActionState,
    formData: FormData,
  ) => Promise<AccountActionState>;
  minutesLeft: number;
  current: {
    pickupLabel: string;
    dropoffLabel: string;
    passengers: number;
    luggage: number;
    notes: string;
  };
}) {
  const [state, formAction] = useActionState(action, {} as AccountActionState);
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(minutesLeft);

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((n) => Math.max(0, n - 1)), 60_000);
    return () => clearInterval(id);
  }, [left]);

  if (left <= 0) {
    return (
      <p className="rounded-card border border-hairline bg-white p-4 text-sm text-muted">
        The window for changing this ride online has closed. Message us on WhatsApp and we
        will sort it out.
      </p>
    );
  }

  if (!open) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-card border-2 border-accent/40 bg-accent/5 p-4">
        <p className="flex-1 text-sm">
          You can still change this ride for{' '}
          <strong>
            {left} more minute{left === 1 ? '' : 's'}
          </strong>
          .
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-porcelain hover:bg-graphite"
        >
          Change ride
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-5">
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="locale" value={locale} />

      <p className="mb-4 text-sm text-muted">
        {left} minute{left === 1 ? '' : 's'} left to change this ride.
      </p>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">Pick-up address</span>
        <input name="pickupLabel" defaultValue={current.pickupLabel} required className={field} />
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">Drop-off address</span>
        <input
          name="dropoffLabel"
          defaultValue={current.dropoffLabel}
          required
          className={field}
        />
      </label>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Passengers</span>
          <input
            name="passengers"
            type="number"
            min={1}
            max={8}
            defaultValue={current.passengers}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Bags</span>
          <input
            name="luggage"
            type="number"
            min={0}
            max={16}
            defaultValue={current.luggage}
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">
          Notes for the driver <span className="text-muted">(optional)</span>
        </span>
        <textarea
          name="notes"
          rows={3}
          defaultValue={current.notes}
          className={field}
        />
      </label>

      <p className="mt-4 rounded-lg bg-porcelain p-3 text-xs leading-relaxed text-muted">
        Changing an address means we re-check the route. If the distance changes, the price
        changes with it and we will confirm before you travel.
      </p>

      {state.error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="mt-4 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-900">
          {state.ok}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Submit />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-5 text-sm font-semibold underline underline-offset-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
