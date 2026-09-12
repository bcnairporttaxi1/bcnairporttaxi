import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

/**
 * Prisma singleton.
 *
 * Prisma 7 requires an explicit driver adapter, and which one depends on
 * where the database is:
 *
 * - Production is Neon. Its adapter talks HTTP/WS rather than holding a TCP
 *   pool, which is what makes it safe on serverless, where every invocation
 *   could otherwise open its own connection.
 *
 * - Local development is a plain Postgres — `npx prisma dev` stands one up
 *   in a few seconds with nothing to install. Neon's driver cannot speak to
 *   it, so a localhost URL takes the standard `pg` adapter instead.
 *
 * Chosen by the URL, not by NODE_ENV: a developer pointing a dev server at
 * the real Neon database still gets the driver that database needs, and a
 * production build pointed at localhost — the CI build does exactly this —
 * still starts.
 *
 * The singleton guards against Next.js dev reloads recreating the client on
 * every file change.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function isLocal(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '::1';
  } catch {
    return false;
  }
}

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  // The prisma dev database is PGlite behind a socket, and PGlite is single-threaded:
  // it serves one connection at a time. pg's default pool of ten opened
  // several and interleaved their prepared statements, which surfaced as
  // "bind message supplies 5 parameters, but prepared statement requires 0"
  // on any page that runs its queries in parallel — the dashboard, first.
  const adapter = isLocal(connectionString)
    ? new PrismaPg({ connectionString, max: 1 })
    : new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
