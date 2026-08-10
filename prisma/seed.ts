import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../src/generated/prisma/client';
import { FLEET } from '../src/lib/fleet';

/**
 * Seeds the fleet. Idempotent — safe to re-run after changing capacities or
 * swapping placeholder artwork for real photography.
 */
const CATEGORY_LABELS: Record<string, string> = {
  eco: 'Eco hybrid taxi',
  standard: 'Standard taxi',
  estate: 'Estate taxi',
  minivan: 'Minivan taxi',
  premium: 'Premium van taxi',
};

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

  for (const v of FLEET) {
    const data = {
      name: v.name,
      category: CATEGORY_LABELS[v.categoryKey] ?? v.categoryKey,
      seats: v.seats,
      bags: v.bags,
      imageUrl: v.image,
      imageAlt: v.imageAlt,
      sortOrder: v.sortOrder,
      active: true,
    };

    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      create: { slug: v.slug, ...data },
      update: data,
    });

    console.log(`seeded ${v.slug}`);
  }

  const count = await prisma.vehicle.count();
  console.log(`\nFleet seeded. ${count} vehicles in database.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
