'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { TipState } from '@/app/[locale]/(panel)/trip/[reference]/actions';

/**
 * Tipping the driver, offered once the ride is done.
 *
 * Three amounts and an "other" field rather than a slider or a percentage:
 * a percentage of a fare the passenger already paid invites them to do
 * arithmetic about a number they have stopped thinking about, and the
 * amounts people actually give for an airport run are a short list.
 *
 * Nothing here is preselected. A tip that arrives because a default was left
 * alone is not a tip, and on a site whose promise is that nothing further is
 * owed, a pre-ticked amount would read as a charge.
 */
export function TipForm({
  reference,
  presets,
  action,
  driverName,
}: {
  reference: string;
  presets: readonly number[];
  action: (state: TipState, formData: FormData) => Promise<TipState>;
  driverName: string;
}) {
  const [state, formAction] = useActionState(action, {} as TipState);
  const [amount, setAmount] = useState('');
  const t = useTranslations('tip');

  const chosen = (v: number) => String(v) === amount;

  return (
    <form action={formAction} className="self-start p-card p-5">
      <input type="hidden" name="reference" value={reference} />

      <h3 className="font-display text-lg font-extrabold">{t('title')}</h3>
      <p className="mt-1 text-sm p-muted">{t('intro', { name: driverName })}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(String(v))}
            aria-pressed={chosen(v)}
            className={`rounded-xl border px-4 py-2.5 font-mono text-sm font-bold transition-colors ${
              chosen(v)
                ? 'border-[var(--p-gold)] bg-[var(--p-gold)] text-[#0a0a0b]'
                : 'p-hairline hover:border-[var(--p-gold)]'
            }`}
          >
            €{v}
          </button>
        ))}
        <label className="relative">
          <span className="sr-only">{t('other')}</span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm p-muted"
          >
            €
          </span>
          <input
            id="tip-amount"
            name="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t('other')}
            // Inline, not a utility class: `.p-input` sets its own padding in
            // a later layer and was winning, which put the euro sign on top
            // of the placeholder's first letter.
            style={{ paddingLeft: '1.75rem' }}
            className="p-input w-28 font-mono"
          />
        </label>
      </div>

      {state?.error && (
        <p role="alert" className="mt-3 rounded-lg bg-[var(--p-down-dim)] px-3 py-2 text-sm text-[var(--p-down)]">
          {t(`errors.${state.error}`)}
        </p>
      )}

      <Submit label={t('submit')} pending={t('sending')} disabled={!amount.trim()} />

      <p className="mt-3 text-xs leading-relaxed p-muted">{t('note')}</p>
    </form>
  );
}

function Submit({ label, pending, disabled }: { label: string; pending: string; disabled: boolean }) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || status.pending}
      className="p-btn p-btn-gold mt-4 w-full disabled:opacity-45"
    >
      {status.pending ? pending : label}
    </button>
  );
}
