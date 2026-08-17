'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import type { DriverActionState } from '@/app/[locale]/driver/actions';

const field =
  'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

type Action = (
  state: DriverActionState,
  formData: FormData,
) => Promise<DriverActionState>;

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="wave mt-5 w-full rounded-xl bg-accent px-5 py-3 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? 'Saving…' : label}
    </button>
  );
}

function Notice({ state }: { state: DriverActionState }) {
  if (state.error) {
    return (
      <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p className="mt-4 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-900">
        {state.ok}
      </p>
    );
  }
  return null;
}

export function PayoutDetailsForm({
  locale,
  action,
  current,
}: {
  locale: string;
  action: Action;
  current: {
    method: 'BIZUM' | 'BANK' | null;
    bizumPhone: string;
    iban: string;
    holder: string;
  };
}) {
  const [state, formAction] = useActionState(action, {} as DriverActionState);
  // Held in state so the right fields appear immediately on switching, rather
  // than after a round trip.
  const [method, setMethod] = useState<'BIZUM' | 'BANK'>(current.method ?? 'BIZUM');

  return (
    <form
      action={formAction}
      className="rounded-card border border-hairline bg-white p-6"
    >
      <input type="hidden" name="locale" value={locale} />

      <fieldset>
        <legend className="mb-3 text-sm font-medium">How would you like to be paid?</legend>
        <div className="flex gap-3">
          {(['BIZUM', 'BANK'] as const).map((m) => (
            <label
              key={m}
              className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center text-sm font-bold transition ${
                method === m ? 'border-accent bg-accent/10' : 'border-hairline hover:border-ink'
              }`}
            >
              <input
                type="radio"
                name="method"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
                className="sr-only"
              />
              {m === 'BIZUM' ? 'Bizum' : 'Bank transfer'}
            </label>
          ))}
        </div>
      </fieldset>

      {method === 'BIZUM' ? (
        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-medium">Bizum phone number</span>
          <input
            name="bizumPhone"
            type="tel"
            defaultValue={current.bizumPhone}
            placeholder="+34 6XX XXX XXX"
            className={field}
          />
        </label>
      ) : (
        <>
          <label className="mt-5 block">
            <span className="mb-1.5 block text-sm font-medium">IBAN</span>
            <input
              name="iban"
              defaultValue={current.iban}
              placeholder="ES91 2100 0418 4502 0005 1332"
              className={field}
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium">Name on the account</span>
            <input name="holder" defaultValue={current.holder} className={field} />
          </label>
        </>
      )}

      <Notice state={state} />
      <Submit label="Save payout details" />
    </form>
  );
}

export function WithdrawForm({
  locale,
  action,
  available,
  hasDetails,
}: {
  locale: string;
  action: Action;
  available: number;
  hasDetails: boolean;
}) {
  const [state, formAction] = useActionState(action, {} as DriverActionState);

  if (!hasDetails) {
    return (
      <p className="rounded-card border border-hairline bg-white p-6 text-sm text-muted">
        Add your Bizum or bank details first, then you can request a payout.
      </p>
    );
  }

  if (available <= 0) {
    return (
      <p className="rounded-card border border-hairline bg-white p-6 text-sm text-muted">
        Nothing available to withdraw right now. Prepaid rides land here once you complete
        them.
      </p>
    );
  }

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-6">
      <input type="hidden" name="locale" value={locale} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Amount</span>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          max={available}
          defaultValue={available.toFixed(2)}
          required
          className={field}
        />
        <span className="mt-1 block text-xs text-muted">
          Up to {available.toFixed(2)} €.
        </span>
      </label>

      <Notice state={state} />
      <Submit label="Request withdrawal" />
    </form>
  );
}
