'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { absoluteUrl } from '@bcn/core/site';
import { passwordResetEmail, sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import {
  RESET_TTL_MINUTES,
  generateResetToken,
  hashResetToken,
  resetExpiry,
} from '@/lib/password-reset';
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
  /** Set once a reset link has been requested — see requestPasswordReset. */
  sent?: boolean;
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

/**
 * Step one of a self-service reset: email a single-use link.
 *
 * Answers identically whether or not the address has an account, whether or
 * not the account is blocked, and whether or not the rate limit was hit. Any
 * difference in the response would let the form be used to discover which
 * addresses are customers — and the admin addresses are the interesting ones.
 *
 * The token is only stored if the email actually went. A bounce would
 * otherwise leave a live token in the table that nobody received, which is a
 * credential with no owner.
 */
export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const locale = String(formData.get('locale') ?? 'en');

  const parsed = z.email().max(200).safeParse(formData.get('email'));
  if (!parsed.success) {
    return { error: 'Enter a valid email address.' };
  }
  const email = parsed.data.toLowerCase();

  // Two limits: per address, so one inbox cannot be flooded, and per client,
  // so one script cannot walk a list of addresses. Both fail silently —
  // a 429 here would be an oracle for which addresses exist.
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const allowed =
    rateLimit(`reset:ip:${ip}`, 5, 15 * 60).ok &&
    rateLimit(`reset:email:${email}`, 3, 15 * 60).ok;

  if (allowed) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && !user.blocked) {
      const { token, hash } = generateResetToken();
      const mail = passwordResetEmail({
        name: user.name,
        url: absoluteUrl(`/${locale}/reset-password?token=${token}`),
        minutes: RESET_TTL_MINUTES,
      });
      const outcome = await sendEmail({ to: user.email, ...mail });

      if (outcome.sent) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            passwordResetTokenHash: hash,
            passwordResetExpiresAt: resetExpiry(),
          },
        });
      }
    }
  }

  return { sent: true };
}

/**
 * Step two: the link was followed, set the new password.
 *
 * The token is looked up by its hash and must be unexpired. It is cleared in
 * the same write that sets the password, so it cannot be used twice — and
 * cannot be used at all once the password has changed by any other route.
 */
export async function resetPassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const locale = String(formData.get('locale') ?? 'en');
  const token = String(formData.get('token') ?? '');
  const next = String(formData.get('newPassword') ?? '');
  const confirm = String(formData.get('confirmPassword') ?? '');

  const stale = 'This link has expired or already been used. Request a new one.';

  if (!token) return { error: stale };

  const user = await prisma.user.findUnique({
    where: { passwordResetTokenHash: hashResetToken(token) },
  });
  if (!user || !user.passwordResetExpiresAt || user.passwordResetExpiresAt < new Date()) {
    return { error: stale };
  }

  if (next !== confirm) {
    return { error: 'The two passwords do not match.' };
  }
  const problem = passwordProblem(next, user.email);
  if (problem) return { error: problem };

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(next),
      passwordResetTokenHash: null,
      passwordResetExpiresAt: null,
      mustChangePassword: false,
      passwordChangedAt: new Date(),
    },
  });

  redirect(`/${locale}/login?reset=done`);
}
