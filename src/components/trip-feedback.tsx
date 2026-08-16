'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';

interface State {
  error?: string;
  ok?: string;
}

type Action = (state: State, formData: FormData) => Promise<State>;

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? 'Sending…' : label}
    </button>
  );
}

function Notice({ state }: { state: State }) {
  if (state.error)
    return (
      <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
        {state.error}
      </p>
    );
  if (state.ok)
    return (
      <p className="mt-3 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-900">
        {state.ok}
      </p>
    );
  return null;
}

/**
 * Star rating.
 *
 * Radio inputs under the hood so it works without JavaScript and reads
 * correctly to a screen reader; the stars are just the visible skin.
 */
function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Your rating</legend>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`text-3xl leading-none transition ${
                n <= value ? 'text-accent' : 'text-slate-300'
              }`}
            >
              ★
            </span>
            <span className="sr-only">{n} out of 5</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function RateForm({
  bookingId,
  locale,
  action,
  who,
  existing,
}: {
  bookingId: string;
  locale: string;
  action: Action;
  who: string;
  existing?: { rating: number; text: string } | null;
}) {
  const [state, formAction] = useActionState(action, {} as State);
  const [rating, setRating] = useState(existing?.rating ?? 0);

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-5">
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="locale" value={locale} />

      <h3 className="font-display text-lg font-extrabold">
        {existing ? `Your rating of ${who}` : `Rate ${who}`}
      </h3>

      <div className="mt-3">
        <Stars value={rating} onChange={setRating} />
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium">
          Anything to add <span className="text-muted">(optional)</span>
        </span>
        <textarea
          name="text"
          rows={3}
          maxLength={2000}
          defaultValue={existing?.text ?? ''}
          className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm"
        />
      </label>

      <Notice state={state} />
      <Submit label={existing ? 'Update rating' : 'Send rating'} />
    </form>
  );
}

export function ReportForm({
  bookingId,
  locale,
  action,
  who,
  reasons,
}: {
  bookingId: string;
  locale: string;
  action: Action;
  who: string;
  reasons: string[];
}) {
  const [state, formAction] = useActionState(action, {} as State);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-semibold text-muted underline underline-offset-4 hover:text-red-800"
      >
        Report a problem with {who}
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-card border-2 border-red-200 bg-red-50/40 p-5"
    >
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="locale" value={locale} />

      <h3 className="font-display text-lg font-extrabold">Report {who}</h3>
      <p className="mt-1 text-sm text-muted">
        This goes to the office, not to {who}. Serious matters are always followed up.
      </p>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium">What happened</span>
        <select
          name="reason"
          required
          className="w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm"
        >
          <option value="">Choose a reason…</option>
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium">Details</span>
        <textarea
          name="details"
          rows={4}
          maxLength={4000}
          className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm"
        />
      </label>

      <Notice state={state} />
      <div className="flex items-center gap-3">
        <Submit label="Send report" />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 text-sm font-semibold underline underline-offset-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
