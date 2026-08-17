/**
 * Deletes every booking. Development helper only — used to clear throwaway
 * test rows before a migration that adds required columns.
 */
import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

  const before = await prisma.booking.count();
  const { count } = await prisma.booking.deleteMany({});
  console.log(`deleted ${count} of ${before} bookings`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
