'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { AuthState } from '@/app/[locale]/(auth)/actions';

/**
 * The two halves of a self-service password reset.
 *
 * Styled to match AuthForm exactly — same card, same fields, same button —
 * because a reader arrives here from the sign-in screen and should not feel
 * they have left it.
 */

const field =
  'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="wave mt-6 w-full rounded-xl bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

/** Step one: ask for the address. */
export function ForgotPasswordForm({
  locale,
  action,
}: {
  locale: string;
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction] = useActionState(action, {} as AuthState);
  const t = useTranslations('auth');

  // The action reports success for every address, known or not, so this is
  // the only state the form ever shows after submitting.
  if (state?.sent) {
    return (
      <div className="rounded-card border border-hairline bg-white p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-green-100 text-green-800"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
            </svg>
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">{t('linkSentTitle')}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{t('linkSentBody')}</p>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/login" className="font-semibold text-accent-text underline underline-offset-4">
            {t('backToLogin')}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t('email')}</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>

      {state?.error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <SubmitButton label={t('sendLink')} pendingLabel={t('sending')} />

      <p className="mt-5 text-center text-sm text-muted">
        <Link href="/login" className="font-semibold text-accent-text underline underline-offset-4">
          {t('backToLogin')}
        </Link>
      </p>
    </form>
  );
}

/** Step two: the link was followed, choose the new password. */
export function ResetPasswordForm({
  locale,
  token,
  action,
}: {
  locale: string;
  token: string;
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction] = useActionState(action, {} as AuthState);
  const t = useTranslations('auth');

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="token" value={token} />

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">{t('newPassword')}</span>
        <input
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={field}
        />
        <span className="mt-1 block text-xs text-muted">{t('passwordHint')}</span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t('confirmPassword')}</span>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={field}
        />
      </label>

      {state?.error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {state.error}{' '}
          <Link href="/forgot-password" className="font-semibold underline underline-offset-4">
            {t('requestNew')}
          </Link>
        </p>
      )}

      <SubmitButton label={t('setPassword')} pendingLabel={t('setting')} />
    </form>
  );
}
