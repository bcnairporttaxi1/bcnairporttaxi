import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Liveness and dependency check for uptime monitoring.
 *
 * Deliberately shallow: it proves the process is up and that Neon answers,
 * which is what an uptime monitor needs to decide whether to page someone.
 * It does not touch SumUp or Resend — a payment provider having a bad
 * afternoon should not make our own health check go red and train whoever is
 * on call to ignore it.
 *
 * Returns 503 rather than 200-with-a-flag when the database is unreachable,
 * because monitors alert on status codes.
 */

export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();

  let database: 'up' | 'down' = 'down';
  let databaseMs: number | null = null;

  try {
    const t = Date.now();
    // Cheapest possible round trip that still proves the connection works.
    await prisma.$queryRaw`SELECT 1`;
    databaseMs = Date.now() - t;
    database = 'up';
  } catch (err) {
    console.error('Health check: database unreachable', err);
  }

  const healthy = database === 'up';

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'degraded',
      database,
      databaseMs,
      // Vercel exposes the deployed commit, which turns "is the fix live yet?"
      // into a question the monitor can answer.
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local',
      region: process.env.VERCEL_REGION ?? 'local',
      tookMs: Date.now() - startedAt,
    },
    {
      status: healthy ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
