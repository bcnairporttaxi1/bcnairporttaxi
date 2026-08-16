'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import {
  createSession,
  destroySession,
  getSession,
  hashPassword,
  verifyPassword,
} from '@/lib/auth';
import { passwordProblem } from '@/lib/passwords';

export interface AuthState {
  error?: string;
}

const credentials = z.object({
  email: z.email().max(200),
  password: z.string().min(8).max(200),
});

const registration = credentials.extend({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional(),
});

/** Where each role lands after signing in. */
function homeFor(role: string): string {
  if (role === 'ADMIN') return '/admin';
  if (role === 'DRIVER') return '/driver';
  return '/account';
}

/**
 * Accounts opened by an admin arrive with a generated password. Until it is
 * replaced the session exists but goes nowhere else — see `requireRole`, which
 * bounces every other panel back to this screen.
 */
const CHANGE_PASSWORD = '/account/password';

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const locale = String(formData.get('locale') ?? 'en');

  const parsed = credentials.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: 'Enter a valid email and a password of at least 8 characters.' };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  // Same message whether the address is unknown or the password is wrong, so
  // this cannot be used to discover which addresses have accounts.
  const ok = user && (await verifyPassword(parsed.data.password, user.passwordHash));
  if (!user || !ok) {
    return { error: 'Those details do not match an account.' };
  }

  // Checked after the password so a blocked account cannot be told apart from
  // a wrong one by anybody who does not already hold the credentials.
  if (user.blocked) {
    return {
      error: 'This account is suspended. Contact us if you think that is a mistake.',
    };
  }

  await createSession({ userId: user.id, email: user.email, role: user.role });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastSeenAt: new Date() },
  });

  redirect(
    `/${locale}${user.mustChangePassword ? CHANGE_PASSWORD : homeFor(user.role)}`,
  );
}

export async function register(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const locale = String(formData.get('locale') ?? 'en');

  const parsed = registration.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    phone: formData.get('phone') || undefined,
  });
  if (!parsed.success) {
    return { error: 'Check your details. Passwords need at least 8 characters.' };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: 'An account with that email already exists.' };
  }

  // Role is never taken from the form — self-registration is always a customer.
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      phone: parsed.data.phone,
      passwordHash: await hashPassword(parsed.data.password),
      role: 'USER',
      locale,
    },
  });

  await createSession({ userId: user.id, email: user.email, role: user.role });
  redirect(`/${locale}/account`);
}

export async function logout(formData: FormData): Promise<void> {
  const locale = String(formData.get('locale') ?? 'en');
  await destroySession();
  redirect(`/${locale}`);
}

/**
 * Replaces the password of the signed-in account.
 *
 * Used both by people changing a password they chose and by people clearing
 * the generated one they were emailed. The current password is required in
 * both cases: a session left open on a shared machine should not be enough to
 * take an account over.
 */
export async function changePassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const locale = String(formData.get('locale') ?? 'en');

  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  const current = String(formData.get('currentPassword') ?? '');
  const next = String(formData.get('newPassword') ?? '');
  const confirm = String(formData.get('confirmPassword') ?? '');

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) redirect(`/${locale}/login`);

  if (!(await verifyPassword(current, user.passwordHash))) {
    return { error: 'That is not your current password.' };
  }
  if (next !== confirm) {
    return { error: 'The two new passwords do not match.' };
  }
  const problem = passwordProblem(next, user.email);
  if (problem) return { error: problem };
  if (await verifyPassword(next, user.passwordHash)) {
    return { error: 'Choose a password you have not just been using.' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(next),
      mustChangePassword: false,
      passwordChangedAt: new Date(),
    },
  });

  redirect(`/${locale}${homeFor(user.role)}`);
}
