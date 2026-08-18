'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { AuthState } from '@/app/[locale]/(auth)/actions';

const field =
  'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

function Submit() {
  const t = useTranslations('password');
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="wave mt-6 w-full rounded-xl bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? t('saving') : t('save')}
    </button>
  );
}

export function ChangePasswordForm({
  locale,
  action,
}: {
  locale: string;
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction] = useActionState(action, {} as AuthState);
  const t = useTranslations('password');

  return (
    <form
      action={formAction}
      className="rounded-card border border-hairline bg-white p-6 sm:p-8"
    >
      <input type="hidden" name="locale" value={locale} />

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">{t('current')}</span>
        <input
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className={field}
        />
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">{t('next')}</span>
        <input
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={field}
        />
        <span className="mt-1 block text-xs text-muted">{t('hint')}</span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t('confirm')}</span>
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
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800"
        >
          {state.error}
        </p>
      )}

      <Submit />
    </form>
  );
}
