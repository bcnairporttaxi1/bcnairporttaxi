/**
 * Creates or promotes an admin account.
 *
 * There is deliberately no way to self-register as an admin — the public
 * registration action always writes role USER. This script is the only path.
 *
 * Usage: npm run admin -- admin@example.com "StrongPassword" "Full Name"
 */
import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const [email, password, name = 'Administrator'] = process.argv.slice(2);

  if (!email || !password) {
    console.error('Usage: npm run admin -- <email> <password> [name]');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
  const passwordHash = await bcrypt.hash(password, 12);
  const normalised = email.toLowerCase();

  const user = await prisma.user.upsert({
    where: { email: normalised },
    create: { email: normalised, name, passwordHash, role: 'ADMIN' },
    update: { role: 'ADMIN', passwordHash },
  });

  console.log(`Admin ready: ${user.email} (${user.id})`);
  console.log('Sign in at /en/login');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
