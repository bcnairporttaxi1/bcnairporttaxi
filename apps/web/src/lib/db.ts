import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/generated/prisma/client';

/**
 * Prisma singleton, backed by Neon's serverless driver.
 *
 * Prisma 7 requires an explicit driver adapter. The Neon adapter talks HTTP/WS
 * rather than holding a TCP pool, which is what makes it safe on serverless
 * where every invocation could otherwise open its own connection.
 *
 * The singleton itself guards against Next.js dev reloads recreating the client
 * on every file change.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
