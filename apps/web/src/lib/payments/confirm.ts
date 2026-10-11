import 'server-only';
import { prisma } from '@/lib/db';
import type { Prisma } from '@/generated/prisma/client';
import { getCheckoutResult } from '@/lib/payments/sumup';
import { adminBookingEmail, bookingConfirmationEmail, sendEmail } from '@/lib/email';
import { ADMIN_NOTIFY_EMAIL, absoluteUrl } from '@bcn/core/site';

export type ConfirmOutcome = 'paid' | 'already-paid' | 'failed' | 'pending' | 'unknown';

/**
 * Settles a booking's payment state against SumUp and, on the transition to
 * paid, sends the receipt and the desk notice.
 *
 * Two callers. The confirmation page, when the passenger comes back from
 * SumUp; and the webhook, when SumUp tells us directly — which is the path
 * that catches the passenger who paid and closed the tab. Either may fire
 * first, and both may fire, so the transition is a conditional write: the
 * emails go out only from the call whose update actually flipped the row.
 *
 * The status is always re-read from SumUp's API. Neither a return URL nor a
 * webhook body is evidence of payment; both are inputs an attacker controls.
 */
export async function confirmBookingPayment(reference: string): Promise<ConfirmOutcome> {
  const booking = await prisma.booking
    .findUnique({
      where: { reference },
      include: { vehicle: { select: { name: true } } },
    })
    .catch(() => null);
  if (!booking) return 'unknown';
  if (booking.paymentStatus === 'PAID') return 'already-paid';
  if (!booking.sumupCheckoutId) return 'pending';

  const { status, amountPaid } = await getCheckoutResult(booking.sumupCheckoutId);

  if (status === 'FAILED') {
    await prisma.booking.updateMany({
      where: { id: booking.id, paymentStatus: { not: 'PAID' } },
      data: { paymentStatus: 'FAILED' },
    });
    return 'failed';
  }
  if (status !== 'PAID') return 'pending';

  // The guard: only the call that performs the flip continues to the emails.
  const flipped = await prisma.booking.updateMany({
    where: { id: booking.id, paymentStatus: { not: 'PAID' } },
    // amountPaid is what the processor says it took. Storing it is what lets
    // a short payment surface as cash owed rather than vanishing.
    data: { paymentStatus: 'PAID', status: 'CONFIRMED', amountPaid },
  });
  if (flipped.count === 0) return 'already-paid';

  // A return booking's other leg shares the checkout: one payment paid for
  // both, so both are confirmed, each with its own receipt and desk notice.
  if (booking.groupId) {
    const legs = await prisma.booking.findMany({
      where: { groupId: booking.groupId, id: { not: booking.id }, paymentStatus: { not: 'PAID' } },
      include: { vehicle: { select: { name: true } } },
    });
    for (const leg of legs) {
      const done = await prisma.booking.updateMany({
        where: { id: leg.id, paymentStatus: { not: 'PAID' } },
        // One checkout covered both legs, so the paid amount is apportioned
        // to each leg's own price rather than double-counted against both.
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
          amountPaid: amountPaid == null ? null : Number(leg.amountOnline),
        },
      });
      if (done.count === 1)
        await notifyPaid(leg, amountPaid == null ? null : Number(leg.amountOnline));
    }
  }

  await notifyPaid(booking, amountPaid);
  return 'paid';
}

type PaidBooking = Prisma.BookingGetPayload<{ include: { vehicle: { select: { name: true } } } }>;

/**
 * The receipt to the passenger and the notice to the desk, for one leg.
 *
 * `paidNow` is what the processor confirmed. It is passed in rather than read
 * off `booking`, whose row was fetched before the update that set it.
 */
async function notifyPaid(booking: PaidBooking, paidNow: number | null): Promise<void> {

  const receipt = bookingConfirmationEmail({
    reference: booking.reference,
    contactName: booking.contactName,
    pickupLabel: booking.pickupLabel,
    dropoffLabel: booking.dropoffLabel,
    pickupAt: booking.pickupAt,
    roadKm: booking.roadKm,
    durationMin: booking.durationMin,
    tariff: booking.tariff,
    paymentMode: booking.paymentMode,
    meterEstimate: Number(booking.meterEstimate),
    fixedFare: Number(booking.fixedFare),
    bookingFee: Number(booking.bookingFee),
    amountOnline: Number(booking.amountOnline),
    amountInTaxi: booking.paymentMode === 'FULL_PREPAID' ? 0 : Number(booking.meterEstimate),
    vehicleName: booking.vehicle?.name,
    feePaid: true,
    locale: booking.locale,
  });
  await sendEmail({ to: booking.contactEmail, ...receipt });

  // And the desk: this is the moment a driver needs assigning.
  const notice = adminBookingEmail({
    reference: booking.reference,
    paid: true,
    contactName: booking.contactName,
    contactEmail: booking.contactEmail,
    contactPhone: booking.contactPhone,
    pickupLabel: booking.pickupLabel,
    dropoffLabel: booking.dropoffLabel,
    pickupAt: booking.pickupAt,
    roadKm: booking.roadKm,
    durationMin: booking.durationMin,
    passengers: booking.passengers,
    luggage: booking.luggage,
    vehicleName: booking.vehicle?.name,
    notes: booking.notes,
    flightNumber: booking.flightNumber,
    amountOnline: Number(booking.amountOnline),
    amountPaid: paidNow,
    locale: booking.locale,
    rideUrl: absoluteUrl(`/en/admin/rides/${booking.reference}`),
  });
  await sendEmail({
    to: ADMIN_NOTIFY_EMAIL,
    replyTo: booking.contactEmail,
    ...notice,
  });
}
