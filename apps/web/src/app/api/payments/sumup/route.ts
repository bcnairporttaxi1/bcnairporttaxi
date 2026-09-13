import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { confirmBookingPayment } from "@/lib/payments/confirm";

/**
 * SumUp payment notification.
 *
 * Register this URL in the SumUp dashboard (Developers → Webhooks, event
 * `checkout.status.updated`) or pass it as `redirect_url`'s sibling
 * `hooks` when creating the checkout. Until it is registered, nothing calls
 * it and the site behaves as before: a booking is marked paid when the
 * passenger returns from SumUp.
 *
 * The body is treated as a hint, not as evidence. We take a checkout id or
 * our own reference from it, look the booking up, and re-read the status
 * from SumUp's API through the same path the confirmation page uses. A
 * forged notification therefore does nothing a forged return URL could not.
 *
 * Always 200. SumUp retries on non-2xx, and there is nothing a retry would
 * fix that the next real notification or the passenger's return would not.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: true, outcome: "ignored" });
  }

  // SumUp's payloads have varied across API versions; accept the shapes seen
  // in the wild rather than one. Our reference is `checkout_reference`.
  const checkoutId =
    str(body.id) ?? str(body.checkout_id) ?? str(nested(body, "checkout")?.id);
  const reference =
    str(body.checkout_reference) ??
    str(nested(body, "checkout")?.checkout_reference);

  const booking = reference
    ? await prisma.booking
        .findUnique({ where: { reference }, select: { reference: true } })
        .catch(() => null)
    : checkoutId
      ? await prisma.booking
          .findFirst({
            where: { sumupCheckoutId: checkoutId },
            select: { reference: true },
          })
          .catch(() => null)
      : null;

  if (!booking) return NextResponse.json({ ok: true, outcome: "unknown" });

  const outcome = await confirmBookingPayment(booking.reference).catch(
    (err) => {
      console.error("sumup webhook: confirm failed", err);
      return "pending" as const;
    },
  );
  return NextResponse.json({ ok: true, outcome });
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 && v.length < 200
    ? v
    : undefined;
}

function nested(
  o: Record<string, unknown>,
  k: string,
): Record<string, unknown> | undefined {
  const v = o[k];
  return v && typeof v === "object"
    ? (v as Record<string, unknown>)
    : undefined;
}
