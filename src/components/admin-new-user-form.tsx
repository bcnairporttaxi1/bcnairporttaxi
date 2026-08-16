'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { AdminActionState } from '@/app/[locale]/admin/actions';

const field =
  'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-xl bg-accent px-5 py-3 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
    >
      {pending ? 'Creating…' : 'Create and email password'}
    </button>
  );
}

export function NewUserForm({
  locale,
  action,
}: {
  locale: string;
  action: (
    state: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
}) {
  const [state, formAction] = useActionState(action, {} as AdminActionState);

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-white p-6">
      <input type="hidden" name="locale" value={locale} />

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">Full name</span>
        <input name="name" required className={field} />
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">Email</span>
        <input name="email" type="email" required className={field} />
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">
          Phone <span className="text-muted">(optional)</span>
        </span>
        <input name="phone" type="tel" className={field} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Role</span>
        <select name="role" defaultValue="USER" className={field}>
          <option value="USER">Passenger</option>
          <option value="DRIVER">Driver</option>
          <option value="ADMIN">Admin</option>
        </select>
      </label>

      <p className="mt-4 rounded-lg bg-porcelain p-3 text-xs leading-relaxed text-muted">
        We generate the password, email it, and store only its hash — so it cannot be read
        back from any screen, including this one. The account is locked to the
        change-password page until it is replaced.
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

      <Submit />
    </form>
  );
}
