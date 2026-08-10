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

const eur = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(n);

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
  const when = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(d.pickupAt);

  const prepaid = d.paymentMode === 'FULL_PREPAID';

  const status = d.feePaid
    ? `<p style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;font-size:14px">
         Payment of <strong>${eur(d.amountOnline)}</strong> received.
         ${prepaid
           ? 'Your fare is fully paid — there is nothing to pay in the taxi.'
           : `You still pay the metered fare of about <strong>${eur(d.amountInTaxi)}</strong> to your driver.`}
       </p>`
    : `<p style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px;font-size:14px">
         <strong>${eur(d.amountOnline)}</strong> is not yet paid. Your reservation is confirmed
         as soon as payment completes.
       </p>`;

  const fareRows = prepaid
    ? `${row('Fixed price (paid online)', eur(d.fixedFare), true)}
       ${row('Booking fee (20%)', eur(d.bookingFee), true)}
       ${row('Total paid online', eur(d.amountOnline), true)}
       ${row('To pay in the taxi', 'Nothing')}`
    : `${row('Estimated meter fare', eur(d.meterEstimate), true)}
       ${row('Booking fee (20%), paid online', eur(d.bookingFee), true)}
       ${row('To pay your driver', `about ${eur(d.amountInTaxi)}`, true)}`;

  const closing = prepaid
    ? `<p style="font-size:14px;line-height:1.6">
         Your price is <strong>locked</strong>. Whatever the traffic does, you owe nothing further
         in the taxi.
       </p>`
    : `<p style="font-size:14px;line-height:1.6">
         You pay the <strong>metered fare</strong> directly to your driver in the taxi, by cash or card.
         The figure above is an estimate from the official AMB tariff; the meter decides the exact amount.
       </p>`;

  const html = layout(
    `Booking ${d.reference}`,
    `<p style="font-size:15px;line-height:1.6">Hello ${d.contactName}, your Barcelona taxi is reserved.</p>
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
    `Booking ${d.reference}`,
    `Hello ${d.contactName}, your Barcelona taxi is reserved.`,
    ``,
    `Pickup:   ${d.pickupLabel}`,
    `Drop-off: ${d.dropoffLabel}`,
    `When:     ${when}`,
    `Vehicle:  ${d.vehicleName ?? 'Assigned on confirmation'}`,
    `Distance: ${d.roadKm} km, approx ${d.durationMin} min`,
    `Tariff:   ${d.tariff}`,
    ``,
    prepaid
      ? `Fixed price:       ${eur(d.fixedFare)}`
      : `Est. meter fare:   ${eur(d.meterEstimate)}`,
    `Booking fee (20%): ${eur(d.bookingFee)}`,
    `Paid online:       ${eur(d.amountOnline)} ${d.feePaid ? '(received)' : '(pending)'}`,
    `Pay in the taxi:   ${prepaid ? 'Nothing' : `about ${eur(d.amountInTaxi)}`}`,
    ``,
    prepaid
      ? `Your price is locked. Nothing further is owed in the taxi.`
      : `You pay the metered fare directly to your driver. The meter decides the exact amount.`,
  ].join('\n');

  return { subject: `Your Barcelona taxi — booking ${d.reference}`, html, text };
}
