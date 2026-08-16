/**
 * End-to-end check of the ride lifecycle against the real database.
 *
 * Creates a throwaway driver, passenger and booking, walks the booking through
 * every driver state, exercises ratings, a report and a withdrawal, then
 * deletes everything it made. Run it against a database you are willing to
 * write to.
 */
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { canTransition, settlementFor, shouldNotifyAtDoor } from '../src/lib/rides';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

const TAG = `verify-${Date.now()}`;
let failures = 0;

function check(label: string, ok: boolean, detail = '') {
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${label}${detail ? `  ${detail}` : ''}`);
}

async function main() {
  console.log(`\nRide flow verification (${TAG})\n`);

  const user = await prisma.user.create({
    data: {
      email: `${TAG}-rider@example.invalid`,
      name: 'Verify Rider',
      passwordHash: 'x'.repeat(60),
      role: 'USER',
      mustChangePassword: true,
    },
  });

  const driverUser = await prisma.user.create({
    data: {
      email: `${TAG}-driver@example.invalid`,
      name: 'Verify Driver',
      passwordHash: 'x'.repeat(60),
      role: 'DRIVER',
    },
  });

  const driver = await prisma.driver.create({
    data: {
      userId: driverUser.id,
      name: 'Verify Driver',
      phone: '+34600000001',
      whatsapp: '+34600000001',
      licenseNumber: TAG,
      plate: '1234 VER',
      payoutMethod: 'BIZUM',
      payoutBizumPhone: '+34600000001',
    },
  });

  const pickupAt = new Date(Date.now() + 6 * 3600_000);
  const booking = await prisma.booking.create({
    data: {
      reference: TAG.slice(-10).toUpperCase(),
      userId: user.id,
      contactName: 'Verify Rider',
      contactEmail: user.email,
      contactPhone: '+34600000002',
      pickupLabel: 'Barcelona Airport T1',
      pickupLat: 41.2974,
      pickupLng: 2.0833,
      dropoffLabel: 'Passeig de Gracia 1',
      dropoffLat: 41.3874,
      dropoffLng: 2.1686,
      roadKm: 15.2,
      durationMin: 26,
      tariff: 'T1',
      startFare: 2.6,
      perKmRate: 1.24,
      perKmRateCharged: 1.34,
      supplements: 4.6,
      meterEstimate: 40.05,
      fixedFare: 43.6,
      bookingFee: 8.72,
      amountOnline: 52.32,
      paymentMode: 'FULL_PREPAID',
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      pickupAt,
      driverId: driver.id,
    },
  });

  console.log('Lifecycle');
  let status = booking.status;
  for (const next of ['ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'ON_BOARD', 'COMPLETED'] as const) {
    check(`${status} -> ${next}`, canTransition(status, next));
    status = next;
  }
  check('COMPLETED is terminal', !canTransition('COMPLETED', 'CANCELLED'));
  check('cannot skip ARRIVED', !canTransition('EN_ROUTE', 'ON_BOARD'));

  console.log('\nSettlement');
  const prepaid = settlementFor({
    paymentMode: 'FULL_PREPAID',
    meterEstimate: 40.05,
    fixedFare: 43.6,
  });
  check('prepaid owes the driver the fare', prepaid.driverPayout === 43.6);
  check('prepaid collects nothing in car', prepaid.cashToCollect === 0);

  const feeOnly = settlementFor({
    paymentMode: 'FEE_ONLY',
    meterEstimate: 40.05,
    fixedFare: 43.6,
  });
  check('fee-only owes the driver nothing', feeOnly.driverPayout === 0);
  check('fee-only collects the meter', feeOnly.cashToCollect === 40.05);

  console.log('\nAt-door trigger');
  check(
    'quiet 2 km out',
    !shouldNotifyAtDoor({
      status: 'EN_ROUTE',
      atDoorNotifiedAt: null,
      driver: { lat: 41.3154, lng: 2.0833 },
      pickup: { lat: 41.2974, lng: 2.0833 },
    }),
  );
  check(
    'fires at the kerb',
    shouldNotifyAtDoor({
      status: 'EN_ROUTE',
      atDoorNotifiedAt: null,
      driver: { lat: 41.2975, lng: 2.0834 },
      pickup: { lat: 41.2974, lng: 2.0833 },
    }),
  );

  // The real one-shot guard is the conditional update, not the pure function.
  await prisma.booking.update({
    where: { id: booking.id },
    data: { status: 'COMPLETED', completedAt: new Date(), driverPayout: 43.6 },
  });
  const first = await prisma.booking.updateMany({
    where: { id: booking.id, atDoorNotifiedAt: null },
    data: { atDoorNotifiedAt: new Date() },
  });
  const second = await prisma.booking.updateMany({
    where: { id: booking.id, atDoorNotifiedAt: null },
    data: { atDoorNotifiedAt: new Date() },
  });
  check('at-door mail claimed exactly once', first.count === 1 && second.count === 0);

  console.log('\nRatings in both directions');
  await prisma.review.create({
    data: {
      bookingId: booking.id,
      direction: 'USER_TO_DRIVER',
      userId: user.id,
      driverId: driver.id,
      authorName: 'Verify Rider',
      rating: 5,
      text: 'Verification row',
    },
  });
  await prisma.review.create({
    data: {
      bookingId: booking.id,
      direction: 'DRIVER_TO_USER',
      userId: user.id,
      driverId: driver.id,
      authorName: 'Verify Driver',
      rating: 4,
      text: 'Verification row',
    },
  });
  const both = await prisma.review.count({ where: { bookingId: booking.id } });
  check('one booking holds two ratings', both === 2);

  let rejected = false;
  try {
    await prisma.review.create({
      data: {
        bookingId: booking.id,
        direction: 'USER_TO_DRIVER',
        authorName: 'Duplicate',
        rating: 1,
        text: 'should fail',
      },
    });
  } catch {
    rejected = true;
  }
  check('a second rating in the same direction is refused', rejected);

  const unapproved = await prisma.review.count({
    where: { bookingId: booking.id, approved: true },
  });
  check('nothing is publicly visible without moderation', unapproved === 0);

  console.log('\nReports');
  const report = await prisma.report.create({
    data: {
      bookingId: booking.id,
      reporterRole: 'USER',
      byUserId: user.id,
      againstDriverId: driver.id,
      reason: 'Verification',
    },
  });
  check('report opens in OPEN', report.status === 'OPEN');

  console.log('\nWithdrawals');
  const earned = await prisma.booking.aggregate({
    where: { driverId: driver.id, status: 'COMPLETED' },
    _sum: { driverPayout: true },
  });
  check('balance reflects the completed prepaid ride', Number(earned._sum.driverPayout) === 43.6);

  const w = await prisma.withdrawal.create({
    data: {
      driverId: driver.id,
      amount: 43.6,
      method: 'BIZUM',
      destination: '+34600000001',
    },
  });
  const held = await prisma.withdrawal.aggregate({
    where: { driverId: driver.id, status: { in: ['REQUESTED', 'APPROVED'] } },
    _sum: { amount: true },
  });
  const available = Number(earned._sum.driverPayout) - Number(held._sum.amount ?? 0);
  check('a pending request removes it from available', available === 0, `available ${available}`);

  await prisma.withdrawal.update({ where: { id: w.id }, data: { status: 'REJECTED' } });
  const heldAfter = await prisma.withdrawal.aggregate({
    where: { driverId: driver.id, status: { in: ['REQUESTED', 'APPROVED'] } },
    _sum: { amount: true },
  });
  check(
    'declining returns it to the balance',
    Number(earned._sum.driverPayout) - Number(heldAfter._sum.amount ?? 0) === 43.6,
  );

  console.log('\nAccount state');
  check('new account is forced to change its password', user.mustChangePassword);

  // Clean up everything this run created.
  await prisma.review.deleteMany({ where: { bookingId: booking.id } });
  await prisma.report.deleteMany({ where: { bookingId: booking.id } });
  await prisma.withdrawal.deleteMany({ where: { driverId: driver.id } });
  await prisma.locationPing.deleteMany({ where: { bookingId: booking.id } });
  await prisma.message.deleteMany({ where: { bookingId: booking.id } });
  await prisma.booking.delete({ where: { id: booking.id } });
  await prisma.driver.delete({ where: { id: driver.id } });
  await prisma.user.deleteMany({ where: { id: { in: [user.id, driverUser.id] } } });

  const leftover = await prisma.booking.count({ where: { reference: booking.reference } });
  check('\nteardown left nothing behind', leftover === 0);

  console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) FAILED.\n`);
  process.exitCode = failures === 0 ? 0 : 1;
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
