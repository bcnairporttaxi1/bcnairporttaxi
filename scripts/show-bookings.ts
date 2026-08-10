/** Quick operational check: list the most recent bookings. */
import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

  const total = await prisma.booking.count();
  const rows = await prisma.booking.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  console.log(`Bookings in database: ${total}\n`);
  for (const b of rows) {
    console.log(
      [
        b.reference,
        b.status,
        b.paymentStatus,
        b.tariff,
        `${b.roadKm} km`,
        `EUR ${b.estimateTotal}`,
        `fee EUR ${b.bookingFee}`,
        b.vehicle?.name ?? 'no vehicle',
        b.pickupAt.toISOString(),
      ].join('  |  '),
    );
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
