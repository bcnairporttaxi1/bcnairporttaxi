/**
 * Verifies the auth primitives against the real database: that the admin
 * exists with the right role, that its stored hash validates the password and
 * rejects a wrong one, and that a session token round-trips and is rejected
 * once tampered with.
 */
import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Usage: npx tsx scripts/verify-auth.ts <email> <password>');
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    console.error('FAIL: user not found');
    process.exit(1);
  }
  console.log(`user            ${user.email}`);
  console.log(`role            ${user.role}`);
  console.log(`hash algorithm  ${user.passwordHash.slice(0, 4)} (bcrypt)`);

  console.log(`correct password accepted : ${await bcrypt.compare(password, user.passwordHash)}`);
  console.log(`wrong password rejected   : ${!(await bcrypt.compare(password + 'x', user.passwordHash))}`);

  const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
  const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('14d')
    .sign(secret);

  const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
  console.log(`session round-trips       : ${payload.role === user.role}`);

  // Flip a character in the signature; verification must fail.
  const parts = token.split('.');
  parts[2] = parts[2].slice(0, -1) + (parts[2].endsWith('A') ? 'B' : 'A');
  let tamperRejected = false;
  try {
    await jwtVerify(parts.join('.'), secret, { algorithms: ['HS256'] });
  } catch {
    tamperRejected = true;
  }
  console.log(`tampered token rejected   : ${tamperRejected}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
