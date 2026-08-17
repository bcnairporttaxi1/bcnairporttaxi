import { randomUUID } from 'node:crypto';

/**
 * SumUp booking-fee checkout.
 *
 * Only ever charges OUR booking fee. The metered fare is settled with the
 * driver in the taxi and must never pass through here.
 *
 * SumUp credentials have not been supplied yet, so the provider runs in stub
 * mode: it mints a local reference and reports `configured: false`, letting the
 * whole booking flow be exercised end to end. Set SUMUP_API_KEY and
 * SUMUP_MERCHANT_CODE and the live path takes over with no other code change.
 */

const API_BASE = 'https://api.sumup.com/v0.1';

export interface CheckoutRequest {
  amount: number;
  currency: string;
  reference: string;
  description: string;
  returnUrl: string;
}

export interface CheckoutResult {
  checkoutId: string;
  /** Where to send the customer to pay. Null in stub mode. */
  redirectUrl: string | null;
  configured: boolean;
}

export type CheckoutStatus = 'PENDING' | 'PAID' | 'FAILED';

export function isSumUpConfigured(): boolean {
  return Boolean(process.env.SUMUP_API_KEY && process.env.SUMUP_MERCHANT_CODE);
}

export async function createCheckout(req: CheckoutRequest): Promise<CheckoutResult> {
  if (!isSumUpConfigured()) {
    return {
      checkoutId: `stub_${randomUUID()}`,
      redirectUrl: null,
      configured: false,
    };
  }

  const res = await fetch(`${API_BASE}/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      checkout_reference: req.reference,
      amount: req.amount,
      currency: req.currency,
      merchant_code: process.env.SUMUP_MERCHANT_CODE,
      description: req.description,
      return_url: req.returnUrl,
      redirect_url: req.returnUrl,
      // Without this SumUp returns a bare checkout intended for their widget;
      // we want the hosted page so card data never touches our origin.
      hosted_checkout: { enabled: true },
    }),
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) {
    throw new Error(`SumUp checkout failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as { id: string; hosted_checkout_url?: string };

  return {
    checkoutId: data.id,
    redirectUrl: data.hosted_checkout_url ?? null,
    configured: true,
  };
}

/**
 * Server-side verification of a checkout.
 *
 * Payment state is always re-read from SumUp rather than trusted from a
 * redirect parameter, so a crafted return URL cannot mark a booking as paid.
 */
export async function getCheckoutStatus(checkoutId: string): Promise<CheckoutStatus> {
  if (!isSumUpConfigured()) {
    // Stub mode: treat as still pending so nothing is falsely marked paid.
    return 'PENDING';
  }

  const res = await fetch(`${API_BASE}/checkouts/${checkoutId}`, {
    headers: { Authorization: `Bearer ${process.env.SUMUP_API_KEY}` },
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) return 'PENDING';

  const data = (await res.json()) as { status?: string };

  switch (data.status) {
    case 'PAID':
      return 'PAID';
    case 'FAILED':
    case 'EXPIRED':
      return 'FAILED';
    default:
      return 'PENDING';
  }
}
