import 'server-only';
import { prisma } from '@/lib/db';
import { createCheckout, getCheckoutStatus } from '@/lib/payments/sumup';
import { driverTipEmail, sendEmail } from '@/lib/email';
import { absoluteUrl } from '@bcn/core/site';

/**
 * The voluntary tip a passenger adds after the ride.
 *
 * Deliberately a second, separate payment rather than a line on the booking:
 * the fare is quoted and charged before the journey as one all-inclusive
 * figure, and the promise that nothing further is owed is the thing the site
 * sells. A tip offered at checkout would contradict that promise and ask for
 * money before the service existed. Offered once the ride is complete, it
 * contradicts nothing — the passenger has met the driver and decided.
 *
 * The money is the driver's in full. No service charge is taken from it, and
 * it is never part of our revenue figures.
 */

/** What a passenger may give: enough range to be useful, not a blank cheque. */
export const TIP_MIN = 1;
export const TIP_MAX = 100;
export const TIP_PRESETS = [3, 5, 10] as const;

export type TipStart =
  | { ok: true; redirectUrl: string | null }
  | { ok: false; reason: 'not-found' | 'not-finished' | 'already-tipped' | 'bad-amount' | 'unavailable' };

/**
 * Opens a checkout for a tip and records which one it was.
 *
 * The amount is re-validated here rather than trusted from the form, and the
 * ride must actually be finished: a tip before the driver has arrived is
 * either a mistake or someone probing the endpoint.
 */
export async function startTip(reference: string, amount: number): Promise<TipStart> {
  const rounded = Math.round(amount * 100) / 100;
  if (!Number.isFinite(rounded) || rounded < TIP_MIN || rounded > TIP_MAX) {
    return { ok: false, reason: 'bad-amount' };
  }

  const booking = await prisma.booking
    .findUnique({
      where: { reference },
      select: { id: true, reference: true, status: true, locale: true, tipPaidAt: true, driverId: true },
    })
    .catch(() => null);

  if (!booking || !booking.driverId) return { ok: false, reason: 'not-found' };
  if (booking.status !== 'COMPLETED') return { ok: false, reason: 'not-finished' };
  if (booking.tipPaidAt) return { ok: false, reason: 'already-tipped' };

  const checkout = await createCheckout({
    amount: rounded,
    currency: 'EUR',
    // A distinct reference so the tip can never be mistaken for the fare in
    // the SumUp dashboard or by the booking webhook.
    reference: `${booking.reference}-TIP`,
    description: `Tip for your driver — ${booking.reference}`,
    returnUrl: absoluteUrl(`/${booking.locale}/trip/${booking.reference}?tip=done`),
  }).catch(() => null);

  if (!checkout) return { ok: false, reason: 'unavailable' };

  await prisma.booking.update({
    where: { id: booking.id },
    data: { tipAmount: rounded, tipCheckoutId: checkout.checkoutId },
  });

  return { ok: true, redirectUrl: checkout.redirectUrl };
}

export type TipOutcome = 'paid' | 'already-paid' | 'pending' | 'none';

/**
 * Settles a started tip against SumUp.
 *
 * Called when the passenger lands back on the trip page. Same shape as the
 * booking confirmation: the status is re-read from SumUp rather than trusted
 * from the return URL, and the write is conditional so two tabs cannot pay
 * the driver twice or send two emails.
 */
export async function confirmTip(reference: string): Promise<TipOutcome> {
  const booking = await prisma.booking
    .findUnique({
      where: { reference },
      select: {
        id: true,
        reference: true,
        contactName: true,
        tipAmount: true,
        tipCheckoutId: true,
        tipPaidAt: true,
        locale: true,
        driver: { select: { name: true, user: { select: { email: true } } } },
      },
    })
    .catch(() => null);

  if (!booking || !booking.tipCheckoutId || booking.tipAmount == null) return 'none';
  if (booking.tipPaidAt) return 'already-paid';

  const status = await getCheckoutStatus(booking.tipCheckoutId);
  if (status !== 'PAID') return 'pending';

  const claimed = await prisma.booking.updateMany({
    where: { id: booking.id, tipPaidAt: null },
    data: { tipPaidAt: new Date() },
  });
  if (claimed.count === 0) return 'already-paid';

  // Telling the driver is the point of the feature: a tip nobody hears about
  // buys no goodwill.
  const email = booking.driver?.user?.email;
  if (email) {
    const mail = driverTipEmail({
      driverName: booking.driver?.name ?? 'there',
      reference: booking.reference,
      passengerName: booking.contactName,
      amount: Number(booking.tipAmount),
      panelUrl: absoluteUrl('/en/driver/earnings'),
    });
    await sendEmail({ to: email, ...mail }).catch((err) =>
      console.error('Driver tip notice failed:', err),
    );
  }

  return 'paid';
}
