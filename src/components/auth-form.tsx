'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Link } from '@/i18n/navigation';
import type { AuthState } from '@/app/[locale]/(auth)/actions';

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-xl bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

const field =
  'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

export function AuthForm({
  mode,
  locale,
  action,
}: {
  mode: 'login' | 'register';
  locale: string;
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction] = useActionState(action, {} as AuthState);
  const isRegister = mode === 'register';

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />

      {isRegister && (
        <>
          <label className="mb-4 block">
            <span className="mb-1.5 block text-sm font-medium">Full name</span>
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="mb-4 block">
            <span className="mb-1.5 block text-sm font-medium">
              Phone <span className="text-muted">(optional)</span>
            </span>
            <input name="phone" type="tel" autoComplete="tel" className={field} />
          </label>
        </>
      )}

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          className={field}
        />
        {isRegister && (
          <span className="mt-1 block text-xs text-muted">At least 8 characters.</span>
        )}
      </label>

      {state?.error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <SubmitButton
        label={isRegister ? 'Create account' : 'Sign in'}
        pendingLabel={isRegister ? 'Creating…' : 'Signing in…'}
      />

      <p className="mt-5 text-center text-sm text-muted">
        {isRegister ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-accent-text underline underline-offset-4">
              Sign in
            </Link>
          </>
        ) : (
          <>
            No account yet?{' '}
            <Link href="/register" className="font-semibold text-accent-text underline underline-offset-4">
              Create one
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
