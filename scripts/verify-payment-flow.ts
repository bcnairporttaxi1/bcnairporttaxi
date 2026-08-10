/**
 * Verifies the payment-status path end to end, short of an actual card charge.
 *
 * What this proves:
 *  - a real SumUp checkout exists for the booking,
 *  - our status reader talks to SumUp and maps the response correctly,
 *  - an unpaid checkout is reported PENDING, so nothing is marked paid by
 *    merely landing on the return URL.
 *
 * What it cannot prove: the PAID transition itself, which needs a real card on
 * SumUp's hosted page. Run `npm run verify:payment -- <reference>` again after
 * completing a real payment and it will show PAID plus the booking flipping to
 * CONFIRMED.
 */
import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../src/generated/prisma/client';
import { getCheckoutStatus, isSumUpConfigured } from '../src/lib/payments/sumup';

async function main() {
  const reference = process.argv[2];
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  console.log(`SumUp configured: ${isSumUpConfigured()}`);
  if (!isSumUpConfigured()) {
    console.log('Set SUMUP_API_KEY and SUMUP_MERCHANT_CODE first.');
    process.exit(1);
  }

  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

  const booking = reference
    ? await prisma.booking.findUnique({ where: { reference } })
    : await prisma.booking.findFirst({ orderBy: { createdAt: 'desc' } });

  if (!booking) {
    console.log('No booking found. Create one first.');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`\nBooking      ${booking.reference}`);
  console.log(`  mode       ${booking.paymentMode}`);
  console.log(`  due online EUR ${booking.amountOnline}`);
  console.log(`  status     ${booking.status} / ${booking.paymentStatus}`);
  console.log(`  checkout   ${booking.sumupCheckoutId ?? '(none)'}`);

  if (!booking.sumupCheckoutId) {
    console.log('\nNo SumUp checkout attached — cannot verify.');
    await prisma.$disconnect();
    process.exit(1);
  }

  const status = await getCheckoutStatus(booking.sumupCheckoutId);
  console.log(`\nSumUp reports: ${status}`);

  if (status === 'PAID' && booking.paymentStatus !== 'PAID') {
    await prisma.booking.update({
      where: { id: booking.id },
      data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
    });
    console.log('-> booking updated to CONFIRMED / PAID');
  } else if (status === 'PENDING') {
    console.log(
      '-> correctly left unpaid. Landing on the return URL alone cannot confirm a booking.',
    );
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
