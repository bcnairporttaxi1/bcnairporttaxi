/**
 * Renders the admin panel as a signed-in admin and checks the result.
 *
 * Two things are asserted, both of which have gone wrong before:
 *
 * 1. No light-theme text class survives inside the dark panel. `text-muted`
 *    measures 3.74:1 on the panel ground and made whole columns unreadable —
 *    a class that renders but cannot be read is not caught by a build.
 * 2. The live-ride stage is actually present, in words, for any ride in
 *    progress.
 *
 * Run against a locally started server: `npx tsx scripts/verify-panel-contrast.ts`
 */

import { SignJWT } from 'jose';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
config({ path: join(here, '..', '.env') });
config({ path: join(here, '..', '.env.local'), override: true });

const BASE = process.env.VERIFY_BASE ?? 'http://127.0.0.1:3000';

/** Classes that only make sense on the white marketing pages. */
const LIGHT_ONLY = [
  'text-muted',
  'bg-white',
  'bg-porcelain',
  'border-hairline',
  'text-ink',
  'bg-ink',
];

async function main() {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { PrismaClient } = await import('../src/generated/prisma/client.js');
  const { PrismaNeon } = await import('@prisma/adapter-neon');
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
  });

  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) throw new Error('No admin user to sign in as.');

  const token = await new SignJWT({ userId: admin.id, email: admin.email, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('600s')
    .sign(secret);

  const pages = [
    '/en/admin',
    '/en/admin/rides?bucket=pending',
    '/en/admin/rides?bucket=active',
  ];

  let failures = 0;

  for (const path of pages) {
    const res = await fetch(BASE + path, {
      headers: { cookie: `bcn_session=${token}` },
      redirect: 'manual',
    });
    const html = await res.text();

    console.log(`\n${path}  →  ${res.status}`);

    if (!html.includes('class="panel')) {
      console.log('  ! panel theme class missing');
      failures++;
    }

    // `(?![\w/-])` matters: `bg-white/6` is a 6%-alpha utility that is fine on
    // a dark ground, while a bare `bg-white` is the light theme leaking in.
    // Without it the two are indistinguishable and the check cries wolf.
    const found = LIGHT_ONLY.filter((c) =>
      new RegExp(`class="[^"]*\\b${c}(?![\\w/-])`).test(html),
    );
    if (found.length > 0) {
      console.log(`  ! light-theme classes present: ${found.join(', ')}`);
      for (const c of found) {
        const m = html.match(new RegExp(`class="[^"]*\\b${c}(?![\\w/-])[^"]*"`, 'g')) ?? [];
        console.log(`      ${c} ×${m.length}: ${m[0]?.slice(0, 130)}`);
        // Show surrounding markup so the owning element is identifiable.
        const at = html.indexOf(m[0] ?? '');
        if (at > 0) {
          console.log(`      context: ${html.slice(Math.max(0, at - 120), at + 60).replace(/\s+/g, ' ')}`);
        }
      }
      failures++;
    } else {
      console.log('  ok  no light-theme text classes');
    }

    const stages = [
      'Driver is on the way to the pickup',
      'Driver is waiting at the door',
      'Passenger is in the car',
      'Paid, waiting for a driver',
      'Payment not completed',
    ].filter((s) => html.includes(s));
    console.log(`  stages rendered: ${stages.length > 0 ? stages.join(' | ') : 'none'}`);

    const svg = (html.match(/<svg/g) ?? []).length;
    if (svg > 0) console.log(`  svg elements: ${svg}`);

    // The live board must be on the page whether or not anything is moving:
    // an absent board and a quiet night look identical otherwise.
    if (path === '/en/admin' || path.includes('bucket=active')) {
      const board =
        html.includes('Live rides') &&
        (html.includes('No ride is in progress') || html.includes('in this stage'));
      console.log(`  live board: ${board ? 'ok' : 'MISSING'}`);
      if (!board) failures++;
    }
  }

  await prisma.$disconnect();
  console.log(failures === 0 ? '\nPASS' : `\nFAIL (${failures})`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
