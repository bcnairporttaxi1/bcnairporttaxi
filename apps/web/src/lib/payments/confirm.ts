import "server-only";
import { prisma } from "@/lib/db";
import { getCheckoutStatus } from "@/lib/payments/sumup";
import {
  adminBookingEmail,
  bookingConfirmationEmail,
  sendEmail,
} from "@/lib/email";
import { ADMIN_NOTIFY_EMAIL, absoluteUrl } from "@bcn/core/site";

export type ConfirmOutcome =
  "paid" | "already-paid" | "failed" | "pending" | "unknown";

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
export async function confirmBookingPayment(
  reference: string,
): Promise<ConfirmOutcome> {
  const booking = await prisma.booking
    .findUnique({
      where: { reference },
      include: { vehicle: { select: { name: true } } },
    })
    .catch(() => null);
  if (!booking) return "unknown";
  if (booking.paymentStatus === "PAID") return "already-paid";
  if (!booking.sumupCheckoutId) return "pending";

  const status = await getCheckoutStatus(booking.sumupCheckoutId);

  if (status === "FAILED") {
    await prisma.booking.updateMany({
      where: { id: booking.id, paymentStatus: { not: "PAID" } },
      data: { paymentStatus: "FAILED" },
    });
    return "failed";
  }
  if (status !== "PAID") return "pending";

  // The guard: only the call that performs the flip continues to the emails.
  const flipped = await prisma.booking.updateMany({
    where: { id: booking.id, paymentStatus: { not: "PAID" } },
    data: { paymentStatus: "PAID", status: "CONFIRMED" },
  });
  if (flipped.count === 0) return "already-paid";

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
    amountInTaxi:
      booking.paymentMode === "FULL_PREPAID"
        ? 0
        : Number(booking.meterEstimate),
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
    amountOnline: Number(booking.amountOnline),
    locale: booking.locale,
    rideUrl: absoluteUrl(`/en/admin/rides/${booking.reference}`),
  });
  await sendEmail({
    to: ADMIN_NOTIFY_EMAIL,
    replyTo: booking.contactEmail,
    ...notice,
  });

  return "paid";
}
