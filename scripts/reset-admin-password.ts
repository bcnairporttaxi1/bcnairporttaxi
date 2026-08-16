/**
 * Issues a fresh temporary password to an account and emails it.
 *
 * Order matters here. The email is sent *before* the database is touched, and
 * the hash is only replaced if the send succeeded — otherwise a bounced email
 * would leave the account holding a password nobody on earth knows, locking
 * them out permanently. On a send failure this exits without changing
 * anything, so the existing password keeps working.
 *
 *   npm run admin:reset -- someone@example.com [https://site.url]
 */
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';
import { generateTemporaryPassword } from '../src/lib/passwords';
import { sendEmail, temporaryPasswordEmail } from '../src/lib/email';

async function main() {
  const [email, siteUrlArg] = process.argv.slice(2);
  if (!email) {
    console.error('Usage: npm run admin:reset -- <email> [siteUrl]');
    process.exitCode = 1;
    return;
  }

  // The local .env points at localhost, which would put a dead link in the
  // email, so the real address is passed in rather than inferred.
  const siteUrl = (siteUrlArg ?? process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
  if (!siteUrl || siteUrl.includes('localhost')) {
    console.error(
      'Refusing to send a login link to localhost. Pass the public URL as the second argument.',
    );
    process.exitCode = 1;
    return;
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });

  try {
    const normalised = email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalised } });
    if (!user) {
      console.error(`No account found for ${normalised}`);
      process.exitCode = 1;
      return;
    }

    const password = generateTemporaryPassword();

    console.log(`Account   ${user.email} (${user.role})`);
    console.log(`Sender    ${process.env.RESEND_FROM ?? '(default)'}`);
    console.log('Sending the email before changing anything…');

    const mail = temporaryPasswordEmail({
      name: user.name,
      email: user.email,
      password,
      loginUrl: `${siteUrl}/en/login`,
    });
    const sent = await sendEmail({ to: user.email, ...mail });

    if (!sent.sent) {
      console.error(`\nEmail failed: ${sent.error}`);
      console.error('Nothing was changed — the existing password still works.');
      process.exitCode = 1;
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: await bcrypt.hash(password, 12),
        mustChangePassword: true,
        passwordChangedAt: null,
      },
    });

    console.log(`\nSent (id ${sent.id}). The new password is in that inbox only.`);
    console.log(`Sign in at ${siteUrl}/en/login — you will be asked to choose your own.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
