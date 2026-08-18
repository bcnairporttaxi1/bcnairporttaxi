/**
 * Sends one of every transactional email to a real inbox.
 *
 * Rendering a template proves it compiles. It does not prove Resend accepts
 * it, that the sending domain is allowed, or that the result is readable —
 * which is why this sends rather than snapshots.
 *
 *   npm run verify:emails -- you@example.com
 */
import {
  bookingConfirmationEmail,
  driverAssignedEmail,
  driverAtDoorEmail,
  rideCompletedEmail,
  sendEmail,
  temporaryPasswordEmail,
  withdrawalEmail,
} from '../src/lib/email';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bcnairporttaxi.es').replace(
  /\/$/,
  '',
);

const pickupAt = new Date(Date.now() + 6 * 3600_000);
const REF = 'BCN-VERIFY';

const CASES = [
  {
    name: '1. Booking confirmation — fee only, unpaid',
    mail: () =>
      bookingConfirmationEmail({
        reference: REF,
        contactName: 'Verification',
        pickupLabel: 'Barcelona Airport T1',
        dropoffLabel: 'Passeig de Gracia 1',
        pickupAt,
        roadKm: 15.2,
        durationMin: 26,
        tariff: 'T1',
        paymentMode: 'FEE_ONLY',
        meterEstimate: 40.05,
        fixedFare: 43.6,
        bookingFee: 8.72,
        amountOnline: 8.72,
        amountInTaxi: 40.05,
        vehicleName: 'Mercedes E-Class',
        feePaid: false,
        locale: 'en',
      }),
  },
  {
    name: '2. Booking confirmation — fully prepaid, paid (25% weekend fee)',
    mail: () =>
      bookingConfirmationEmail({
        reference: REF,
        contactName: 'Verification',
        pickupLabel: 'Barcelona Airport T2',
        dropoffLabel: 'Hotel Arts',
        pickupAt,
        roadKm: 15.2,
        durationMin: 26,
        tariff: 'T2',
        paymentMode: 'FULL_PREPAID',
        meterEstimate: 40.05,
        fixedFare: 43.6,
        // 25% of the fixed fare — the label in the email must say 25%, not 20%.
        bookingFee: 10.9,
        amountOnline: 54.5,
        amountInTaxi: 0,
        vehicleName: 'Mercedes V-Class',
        feePaid: true,
        locale: 'en',
      }),
  },
  {
    name: '3. Driver assigned — with plate and vehicle',
    mail: () =>
      driverAssignedEmail({
        name: 'Verification',
        reference: REF,
        pickupAt,
        locale: 'en',
        driverName: 'Jordi Puig',
        driverPhone: '+34 600 123 456',
        plate: '1234 ABC',
        vehicleName: 'Mercedes E-Class',
        tripUrl: `${SITE}/en/trip/${REF}`,
      }),
  },
  {
    name: '4. Driver at the door',
    mail: () =>
      driverAtDoorEmail({
        name: 'Verification',
        reference: REF,
        pickupLabel: 'Passeig de Gracia 1',
        driverName: 'Jordi Puig',
        driverPhone: '+34 600 123 456',
        plate: '1234 ABC',
        vehicleName: 'Mercedes E-Class',
        tripUrl: `${SITE}/en/trip/${REF}`,
      }),
  },
  {
    name: '5. Ride completed — paid in car',
    mail: () =>
      rideCompletedEmail({
        name: 'Verification',
        reference: REF,
        reviewUrl: `${SITE}/en/trip/${REF}`,
        paidInCar: 40.05,
        locale: 'en',
      }),
  },
  {
    name: '6. Temporary password (new account)',
    mail: () =>
      temporaryPasswordEmail({
        name: 'Verification',
        email: 'verification@example.invalid',
        password: 'Ab3d-Kf7m-Qp2r',
        loginUrl: `${SITE}/en/login`,
      }),
  },
  {
    name: '7. Withdrawal requested (driver)',
    mail: () =>
      withdrawalEmail({
        driverName: 'Jordi Puig',
        amount: 43.6,
        method: 'BIZUM',
        destination: '+34 600 123 456',
        status: 'REQUESTED',
        note: 'We will let you know when the money is on its way.',
      }),
  },
];

async function main() {
  const to = process.argv[2];
  if (!to) {
    console.error('Usage: npm run verify:emails -- you@example.com');
    process.exitCode = 1;
    return;
  }

  console.log(`\nSending ${CASES.length} emails to ${to}`);
  console.log(`From: ${process.env.RESEND_FROM ?? '(default onboarding@resend.dev)'}`);
  console.log(`Links point at: ${SITE}\n`);

  let failed = 0;

  for (const c of CASES) {
    const mail = c.mail();
    const res = await sendEmail({ to, ...mail });
    if (res.sent) {
      console.log(`  ok    ${c.name}`);
      console.log(`        subject: ${mail.subject}`);
      console.log(`        id: ${res.id}`);
    } else {
      failed++;
      console.log(`  FAIL  ${c.name}`);
      console.log(`        ${res.error}`);
    }
    // Resend rate-limits bursts; a short gap keeps the run clean.
    await new Promise((r) => setTimeout(r, 700));
  }

  console.log(
    failed === 0
      ? `\nAll ${CASES.length} sent. Check ${to} — every link should point at ${SITE}.\n`
      : `\n${failed} of ${CASES.length} failed.\n`,
  );
  process.exitCode = failed === 0 ? 0 : 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
