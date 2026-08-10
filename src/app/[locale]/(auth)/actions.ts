'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import {
  createSession,
  destroySession,
  hashPassword,
  verifyPassword,
} from '@/lib/auth';

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

  await createSession({ userId: user.id, email: user.email, role: user.role });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastSeenAt: new Date() },
  });

  redirect(`/${locale}${homeFor(user.role)}`);
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
