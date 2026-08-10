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
  estimateTotal: number;
  bookingFee: number;
  vehicleName?: string | null;
  feePaid: boolean;
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

  const feeLine = d.feePaid
    ? `<p style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;font-size:14px">
         Booking fee of <strong>${eur(d.bookingFee)}</strong> paid. This receipt covers the booking fee only.
       </p>`
    : `<p style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px;font-size:14px">
         Your booking fee of <strong>${eur(d.bookingFee)}</strong> is not yet paid. Your reservation is
         confirmed once payment completes.
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
       ${row('Estimated meter fare', eur(d.estimateTotal), true)}
       ${row('Booking fee (20%)', eur(d.bookingFee), true)}
     </table>
     ${feeLine}
     <p style="font-size:14px;line-height:1.6">
       You pay the <strong>metered fare</strong> directly to your driver in the taxi, by cash or card.
       The amount above is an estimate based on the official AMB tariff.
     </p>`,
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
    `Estimated meter fare: ${eur(d.estimateTotal)}`,
    `Booking fee (20%):    ${eur(d.bookingFee)} ${d.feePaid ? '(paid)' : '(unpaid)'}`,
    ``,
    `You pay the metered fare directly to your driver in the taxi.`,
    `The final fare is set by the official taxi meter; an invoice is available on request.`,
  ].join('\n');

  return { subject: `Your Barcelona taxi — booking ${d.reference}`, html, text };
}
