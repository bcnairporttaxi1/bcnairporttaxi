/**
 * Proves the live-ride board with a ride actually in progress.
 *
 * The empty state renders whether the feature works or not, so it is no
 * evidence. This puts one existing test booking into ARRIVED with a
 * backdated stamp, renders the admin panel, checks the stage wording and the
 * elapsed-time reading, then restores the row exactly as it was.
 *
 * The restore runs in a `finally`, so an assertion failure still puts the row
 * back. Nothing here goes through the booking service, so no mail is sent.
 */

import { SignJWT } from 'jose';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
config({ path: join(here, '..', '..', '..', '.env') });
config({ path: join(here, '..', '..', '..', '.env.local'), override: true });

const BASE = process.env.VERIFY_BASE ?? 'http://127.0.0.1:3000';

async function main() {
  const { PrismaClient } = await import('../src/generated/prisma/client.js');
  const { PrismaNeon } = await import('@prisma/adapter-neon');
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
  });

  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  const driver = await prisma.driver.findFirst({ where: { active: true } });
  const booking = await prisma.booking.findFirst({
    where: { contactName: { contains: 'Test' } },
    orderBy: { createdAt: 'desc' },
  });

  if (!admin || !booking) throw new Error('Need an admin and a test booking.');
  if (!driver) throw new Error('Need an active driver.');

  // Everything needed to put the row back, captured before anything changes.
  const before = {
    status: booking.status,
    driverId: booking.driverId,
    arrivedAt: booking.arrivedAt,
    enRouteAt: booking.enRouteAt,
    driverSharesLocation: booking.driverSharesLocation,
  };

  const token = await new SignJWT({ userId: admin.id, email: admin.email, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('600s')
    .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

  let failures = 0;
  const check = (name: string, ok: boolean, detail = '') => {
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
    if (!ok) failures++;
  };

  try {
    const now = Date.now();
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'ARRIVED',
        driverId: driver.id,
        enRouteAt: new Date(now - 26 * 60_000),
        // 14 minutes at the door: past the 10-minute mark, so this should also
        // trip the "needs a look" flag.
        arrivedAt: new Date(now - 14 * 60_000),
        driverSharesLocation: true,
      },
    });

    // A ping 60 m from the pickup point — inside the at-door radius.
    await prisma.locationPing.create({
      data: {
        bookingId: booking.id,
        role: 'DRIVER',
        lat: booking.pickupLat + 0.00054,
        lng: booking.pickupLng,
      },
    });

    for (const path of ['/en/admin', '/en/admin/rides?bucket=active']) {
      const html = await (
        await fetch(BASE + path, { headers: { cookie: `bcn_session=${token}` } })
      ).text();

      console.log(`\n${path}`);
      check('stage in plain language', html.includes('Driver is waiting at the door'));
      check('time in stage shown', /1[0-9]m in this stage/.test(html), 'expected ~14m');
      check('stalled ride flagged', html.includes('Needs a look'));
      check('at-door proximity shown', html.includes('Car is at the door'));
      check('driver name on card', html.includes(driver.name));
      check('passenger phone on card', html.includes(booking.contactPhone));
      check('timeline step reached', html.includes('Waiting at pickup'));
      check('live pulse dot', html.includes('p-step-now'));
    }
  } finally {
    await prisma.locationPing.deleteMany({ where: { bookingId: booking.id } });
    await prisma.booking.update({ where: { id: booking.id }, data: before });
    const after = await prisma.booking.findUnique({ where: { id: booking.id } });
    console.log(
      `\nrestored: status=${after?.status} driver=${after?.driverId ?? 'null'} arrivedAt=${after?.arrivedAt ?? 'null'}`,
    );
    await prisma.$disconnect();
  }

  console.log(failures === 0 ? '\nPASS' : `\nFAIL (${failures})`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
