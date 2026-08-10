import 'server-only';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { Role } from '@/generated/prisma/enums';

/**
 * Loads the signed-in user and enforces a role.
 *
 * The role is re-read from the database rather than trusted from the token: a
 * session minted before someone was demoted must stop working immediately.
 */
export async function requireRole(allowed: Role[], locale: string) {
  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) redirect(`/${locale}/login`);
  if (!allowed.includes(user.role)) redirect(`/${locale}`);

  return user;
}

/** The driver record attached to a signed-in driver account. */
export async function requireDriver(locale: string) {
  const user = await requireRole(['DRIVER', 'ADMIN'], locale);
  const driver = await prisma.driver.findUnique({ where: { userId: user.id } });
  return { user, driver };
}
