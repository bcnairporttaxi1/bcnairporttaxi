'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { FindState } from '@/app/[locale]/(site)/find-booking/actions';

const field = 'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="wave mt-6 w-full rounded-xl bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {label}
    </button>
  );
}

/** Reference and email in, trip page out. Styled like the account forms. */
export function FindBookingForm({
  locale,
  action,
  badLink = false,
}: {
  locale: string;
  action: (state: FindState, formData: FormData) => Promise<FindState>;
  /** Arrived here from an expired or mistyped signed link. */
  badLink?: boolean;
}) {
  const [state, formAction] = useActionState(action, {} as FindState);
  const t = useTranslations('findBooking');

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t('reference')}</span>
        <input
          name="reference"
          type="text"
          required
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="BCN-"
          pattern="[Bb][Cc][Nn]-?[A-Za-z0-9]{6}"
          className={`${field} font-mono uppercase tracking-wider`}
        />
        <span className="mt-1 block text-xs text-muted">{t('hint')}</span>
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium">{t('email')}</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>

      {(state?.error || badLink) && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {t('notFound')}
        </p>
      )}

      <SubmitButton label={t('submit')} />
    </form>
  );
}
