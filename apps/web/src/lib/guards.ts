import 'server-only';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { Role } from '@/generated/prisma/enums';

/** Everything an account holding a generated password may still reach. */
const PASSWORD_RESET_PATH = '/account/password';

/**
 * Loads the signed-in user and enforces a role.
 *
 * The role is re-read from the database rather than trusted from the token: a
 * session minted before someone was demoted must stop working immediately, and
 * the same read catches accounts suspended or handed a temporary password
 * after the session was issued.
 */
export async function requireRole(
  allowed: Role[],
  locale: string,
  options: { allowTemporaryPassword?: boolean } = {},
) {
  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      locale: true,
      blocked: true,
      mustChangePassword: true,
    },
  });

  if (!user) redirect(`/${locale}/login`);
  if (user.blocked) redirect(`/${locale}/login`);

  // A generated password gets you exactly one screen: the one that replaces it.
  if (user.mustChangePassword && !options.allowTemporaryPassword) {
    redirect(`/${locale}${PASSWORD_RESET_PATH}`);
  }

  if (!allowed.includes(user.role)) redirect(`/${locale}`);

  return user;
}

/** The driver record attached to a signed-in driver account. */
export async function requireDriver(locale: string) {
  const user = await requireRole(['DRIVER', 'ADMIN'], locale);
  const driver = await prisma.driver.findUnique({ where: { userId: user.id } });
  if (driver?.blocked) redirect(`/${locale}/login`);
  return { user, driver };
}
