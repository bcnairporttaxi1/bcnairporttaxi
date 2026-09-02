import { Resend } from 'resend';

/**
 * Transactional email via Resend.
 *
 * Sending never throws into the caller: a booking that is paid for and stored
 * must not be reported as failed just because the confirmation email bounced.
 * Failures are logged and surfaced through the return value instead.
 */

const FROM = process.env.RESEND_FROM ?? 'BCNAirportTaxi <onboarding@resend.dev>';

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export interface SendResult {
  sent: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendResult> {
  const resend = client();
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping email to', opts.to);
    return { sent: false, error: 'not_configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });

    if (error) {
      console.error('Resend error:', error);
      return { sent: false, error: error.message };
    }
    return { sent: true, id: data?.id };
  } catch (err) {
    console.error('Resend threw:', err);
    return { sent: false, error: (err as Error).message };
  }
}

export interface BookingEmailData {
  reference: string;
  contactName: string;
  pickupLabel: string;
  dropoffLabel: string;
  pickupAt: Date;
  roadKm: number;
  durationMin: number;
  tariff: string;
  paymentMode: 'FEE_ONLY' | 'FULL_PREPAID';
  /** What the taxi meter is expected to read. */
  meterEstimate: number;
  /** Our locked prepaid fare. */
  fixedFare: number;
  bookingFee: number;
  /** Taken online, per the chosen mode. */
  amountOnline: number;
  /** Still owed to the driver. Zero when fully prepaid. */
  amountInTaxi: number;
  vehicleName?: string | null;
  feePaid: boolean;
  locale?: string;
}

function layout(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#faf8f3;font-family:-apple-system,Segoe UI,Inter,sans-serif;color:#2a2a2e">
<div style="max-width:560px;margin:0 auto;padding:24px">
  <div style="background:#0e0e10;border-radius:14px;padding:22px">
    <p style="margin:0;font-size:19px;font-weight:800;color:#faf8f3">BCN<span style="color:#f5b301">AirportTaxi</span></p>
  </div>
  <h1 style="font-size:22px;margin:26px 0 10px">${title}</h1>
  ${body}
  <p style="margin-top:28px;font-size:12px;line-height:1.6;color:#6b6b72">
    The final fare is set by the official taxi meter and paid to your driver in the car.
    An invoice is available in the taxi on request. The booking fee is a separate service
    charge for arranging your ride.
  </p>
</div></body></html>`;
}

function row(label: string, value: string, strong = false): string {
  return `<tr>
    <td style="padding:9px 0;color:#6b6b72;font-size:14px">${label}</td>
    <td style="padding:9px 0;text-align:right;font-size:14px;${strong ? 'font-weight:700' : ''}">${value}</td>
  </tr>`;
}

export function bookingConfirmationEmail(d: BookingEmailData) {
  const eur = (n: number) =>
    new Intl.NumberFormat(d.locale ?? 'en', {
      style: 'currency',
      currency: 'EUR',
    }).format(n);

  const when = new Intl.DateTimeFormat(d.locale ?? 'en', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(d.pickupAt);

  /**
   * All-inclusive prepaid is the only mode now: one amount, paid online, with
   * the service charge inside it rather than beside it. Bookings taken before
   * the changeover were settled partly in the car and their emails still have
   * to say so, hence the branch rather than a rewrite.
   */
  const prepaid = d.paymentMode === 'FULL_PREPAID';

  /**
   * A booking sends two of these: once when it is created and payment is still
   * outstanding, and again when payment completes. They used to share a
   * subject, a headline and an opening line, so the second arrived looking
   * like a duplicate of the first — and, worse, like a duplicate that
   * contradicted it. Every line a reader uses to tell them apart now keys off
   * `feePaid`.
   */
  const heading = d.feePaid ? 'Booking confirmed' : 'Booking received';
  const subject = d.feePaid
    ? `Payment confirmed — booking ${d.reference}`
    : `Booking ${d.reference} — payment outstanding`;
  const opener = d.feePaid
    ? `Hello ${d.contactName}, your Barcelona taxi is confirmed.`
    : `Hello ${d.contactName}, we have your booking. It is confirmed as soon as payment completes.`;

  const status = d.feePaid
    ? `<p style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;font-size:14px">
         Payment of <strong>${eur(d.amountOnline)}</strong> received.
         ${prepaid
           ? 'Your journey is paid in full — there is nothing to pay in the taxi.'
           : `You still pay the metered fare of about <strong>${eur(d.amountInTaxi)}</strong> to your driver.`}
       </p>`
    : `<p style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px;font-size:14px">
         <strong>${eur(d.amountOnline)}</strong> is not yet paid. Your reservation is confirmed
         as soon as payment completes.
       </p>`;

  const fareRows = prepaid
    ? `${row('Total price (paid online)', eur(d.amountOnline), true)}
       ${row('To pay in the taxi', 'Nothing')}`
    : `${row('Estimated meter fare', eur(d.meterEstimate), true)}
       ${row('Paid online', eur(d.amountOnline), true)}
       ${row('To pay your driver', `about ${eur(d.amountInTaxi)}`, true)}`;

  const closing = prepaid
    ? `<p style="font-size:14px;line-height:1.6">
         Your price is <strong>locked and all-inclusive</strong> — the fare, every official
         supplement and the booking itself. Whatever the traffic does, you owe nothing
         further in the taxi.
       </p>`
    : `<p style="font-size:14px;line-height:1.6">
         You pay the <strong>metered fare</strong> directly to your driver in the taxi, by cash or card.
         The figure above is an estimate from the official AMB tariff; the meter decides the exact amount.
       </p>`;

  const html = layout(
    heading,
    `<p style="font-size:15px;line-height:1.6">${opener}</p>
     <table style="width:100%;border-collapse:collapse;margin-top:14px;border-top:1px solid #e4e0d7">
       ${row('Pickup', d.pickupLabel)}
       ${row('Drop-off', d.dropoffLabel)}
       ${row('When', when)}
       ${row('Vehicle', d.vehicleName ?? 'Assigned on confirmation')}
       ${row('Distance', `${d.roadKm} km · approx ${d.durationMin} min`)}
       ${row('Tariff', d.tariff)}
       ${fareRows}
     </table>
     ${status}
     ${closing}`,
  );

  const text = [
    `${heading} — ${d.reference}`,
    opener,
    ``,
    `Pickup:   ${d.pickupLabel}`,
    `Drop-off: ${d.dropoffLabel}`,
    `When:     ${when}`,
    `Vehicle:  ${d.vehicleName ?? 'Assigned on confirmation'}`,
    `Distance: ${d.roadKm} km, approx ${d.durationMin} min`,
    `Tariff:   ${d.tariff}`,
    ``,
    prepaid ? null : `Est. meter fare:   ${eur(d.meterEstimate)}`,
    `${prepaid ? 'Total price' : 'Paid online'}:       ${eur(d.amountOnline)} ${
      d.feePaid ? '(received)' : '(pending)'
    }`,
    `Pay in the taxi:   ${prepaid ? 'Nothing' : `about ${eur(d.amountInTaxi)}`}`,
    ``,
    prepaid
      ? `Your price is locked and all-inclusive. Nothing further is owed in the taxi.`
      : `You pay the metered fare directly to your driver. The meter decides the exact amount.`,
  ]
    // A prepaid booking drops the meter line, so the array can hold a null.
    .filter((line): line is string => line !== null)
    .join('\n');

  return { subject, html, text };
}

/**
 * The password an admin-opened account is born with.
 *
 * The password itself only ever exists in this email and in the admin's browser
 * at the moment of creation — it is hashed on the way into the database, so no
 * screen anywhere can show it again.
 */
export function temporaryPasswordEmail(d: {
  name: string;
  email: string;
  password: string;
  loginUrl: string;
}) {
  const subject = 'Your BCNAirportTaxi account';

  const html = layout(
    'Your account is ready',
    `<p style="font-size:15px;line-height:1.7">Hello ${d.name}, we have opened an account for you at BCNAirportTaxi.</p>
     <table style="width:100%;border-collapse:collapse;margin-top:14px">
       ${row('Email', d.email)}
       ${row('Temporary password', `<code style="font-family:ui-monospace,Menlo,monospace;font-size:16px">${d.password}</code>`, true)}
     </table>
     <p style="margin-top:18px"><a href="${d.loginUrl}" style="display:inline-block;background:#f5b301;color:#0e0e10;font-weight:800;text-decoration:none;padding:12px 22px;border-radius:10px">Sign in</a></p>
     <p style="font-size:14px;line-height:1.7;color:#6b6b72;margin-top:18px">
       This password works once. You will be asked to choose your own as soon as you sign in.
     </p>`,
  );

  const text = [
    `Hello ${d.name},`,
    ``,
    `We have opened an account for you at BCNAirportTaxi.`,
    ``,
    `Email:              ${d.email}`,
    `Temporary password: ${d.password}`,
    ``,
    `Sign in: ${d.loginUrl}`,
    ``,
    `You will be asked to choose your own password as soon as you sign in.`,
  ].join('\n');

  return { subject, html, text };
}

/**
 * Sent once, when the car is essentially outside.
 *
 * Triggered by the driver's location rather than by them pressing a button, so
 * it lands while the passenger still has time to come down.
 */
export function driverAtDoorEmail(d: {
  name: string;
  reference: string;
  pickupLabel: string;
  driverName: string;
  driverPhone: string;
  plate?: string | null;
  vehicleName?: string | null;
  tripUrl: string;
}) {
  const subject = `Your driver is outside — ${d.reference}`;

  const html = layout(
    'Your driver is outside',
    `<p style="font-size:15px;line-height:1.7">${d.name}, your car has arrived at ${d.pickupLabel}.</p>
     <table style="width:100%;border-collapse:collapse;margin-top:14px">
       ${row('Driver', d.driverName)}
       ${row('Phone', d.driverPhone)}
       ${d.plate ? row('Number plate', `<strong>${d.plate}</strong>`, true) : ''}
       ${d.vehicleName ? row('Vehicle', d.vehicleName) : ''}
       ${row('Reference', d.reference)}
     </table>
     <p style="margin-top:18px"><a href="${d.tripUrl}" style="display:inline-block;background:#f5b301;color:#0e0e10;font-weight:800;text-decoration:none;padding:12px 22px;border-radius:10px">Track and message your driver</a></p>`,
  );

  const text = [
    `${d.name}, your driver is outside at ${d.pickupLabel}.`,
    ``,
    `Driver:       ${d.driverName}`,
    `Phone:        ${d.driverPhone}`,
    d.plate ? `Number plate: ${d.plate}` : '',
    d.vehicleName ? `Vehicle:      ${d.vehicleName}` : '',
    `Reference:    ${d.reference}`,
    ``,
    `Track and message: ${d.tripUrl}`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

/** Tells the passenger a driver has been attached, with the details to look for. */
export function driverAssignedEmail(d: {
  name: string;
  reference: string;
  pickupAt: Date;
  locale?: string;
  driverName: string;
  driverPhone: string;
  plate?: string | null;
  vehicleName?: string | null;
  tripUrl: string;
}) {
  const when = new Intl.DateTimeFormat(d.locale ?? 'en', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(d.pickupAt);

  const subject = `Your driver for ${d.reference}`;

  const html = layout(
    'Your driver is confirmed',
    `<p style="font-size:15px;line-height:1.7">${d.name}, here is who is picking you up on ${when}.</p>
     <table style="width:100%;border-collapse:collapse;margin-top:14px">
       ${row('Driver', d.driverName)}
       ${row('Phone', d.driverPhone)}
       ${d.plate ? row('Number plate', `<strong>${d.plate}</strong>`, true) : ''}
       ${d.vehicleName ? row('Vehicle', d.vehicleName) : ''}
     </table>
     <p style="margin-top:18px"><a href="${d.tripUrl}" style="display:inline-block;background:#f5b301;color:#0e0e10;font-weight:800;text-decoration:none;padding:12px 22px;border-radius:10px">View your trip</a></p>`,
  );

  const text = [
    `${d.name}, your driver for ${when}:`,
    ``,
    `Driver:       ${d.driverName}`,
    `Phone:        ${d.driverPhone}`,
    d.plate ? `Number plate: ${d.plate}` : '',
    d.vehicleName ? `Vehicle:      ${d.vehicleName}` : '',
    ``,
    `Your trip: ${d.tripUrl}`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

/** Asks the passenger to rate the driver once the ride is done. */
export function rideCompletedEmail(d: {
  name: string;
  reference: string;
  reviewUrl: string;
  paidInCar: number | null;
  locale?: string;
}) {
  const money = (n: number) =>
    new Intl.NumberFormat(d.locale ?? 'en', {
      style: 'currency',
      currency: 'EUR',
    }).format(n);

  const subject = `Thanks for travelling with us — ${d.reference}`;

  const settled = d.paidInCar
    ? `You paid the metered fare of about ${money(d.paidInCar)} to your driver in the car. An invoice is available from the driver on request.`
    : `This ride was paid in full in advance — nothing was owed in the car.`;

  const html = layout(
    'Ride complete',
    `<p style="font-size:15px;line-height:1.7">${d.name}, thank you for travelling with us.</p>
     <p style="font-size:15px;line-height:1.7">${settled}</p>
     <p style="margin-top:18px"><a href="${d.reviewUrl}" style="display:inline-block;background:#f5b301;color:#0e0e10;font-weight:800;text-decoration:none;padding:12px 22px;border-radius:10px">Rate your driver</a></p>`,
  );

  const text = [
    `${d.name}, thank you for travelling with us.`,
    ``,
    settled,
    ``,
    `Rate your driver: ${d.reviewUrl}`,
  ].join('\n');

  return { subject, html, text };
}

/** Confirms to a driver that a withdrawal has been requested or settled. */
export function withdrawalEmail(d: {
  driverName: string;
  amount: number;
  method: 'BIZUM' | 'BANK';
  destination: string;
  status: 'REQUESTED' | 'APPROVED' | 'PAID' | 'REJECTED';
  note?: string | null;
}) {
  const money = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

  const headline = {
    REQUESTED: 'Withdrawal requested',
    APPROVED: 'Withdrawal approved',
    PAID: 'Withdrawal sent',
    REJECTED: 'Withdrawal declined',
  }[d.status];

  const subject = `${headline} — ${money(d.amount)}`;

  const html = layout(
    headline,
    `<table style="width:100%;border-collapse:collapse">
       ${row('Amount', money(d.amount), true)}
       ${row('Method', d.method === 'BIZUM' ? 'Bizum' : 'Bank transfer')}
       ${row('To', d.destination)}
     </table>
     ${d.note ? `<p style="font-size:14px;line-height:1.7;color:#6b6b72;margin-top:16px">${d.note}</p>` : ''}`,
  );

  const text = [
    headline,
    ``,
    `Amount: ${money(d.amount)}`,
    `Method: ${d.method === 'BIZUM' ? 'Bizum' : 'Bank transfer'}`,
    `To:     ${d.destination}`,
    d.note ? `\n${d.note}` : '',
  ].join('\n');

  return { subject, html, text };
}
