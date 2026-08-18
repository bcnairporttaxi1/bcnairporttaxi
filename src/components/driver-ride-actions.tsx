'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import type { BookingStatus } from '@/generated/prisma/enums';

/**
 * The four buttons a driver works a ride with, plus the two things they can do
 * once it is over.
 *
 * Only the next legal step is ever offered, so there is nothing to get wrong
 * at the wheel — and completing a ride with cash still to collect asks for
 * confirmation, because that is the one press that cannot be walked back.
 */

const STEP: Partial<
  Record<BookingStatus, { next: BookingStatus; label: string; tone: 'dark' | 'gold' }>
> = {
  ASSIGNED: { next: 'EN_ROUTE', label: 'On the way', tone: 'dark' },
  CONFIRMED: { next: 'EN_ROUTE', label: 'On the way', tone: 'dark' },
  EN_ROUTE: { next: 'ARRIVED', label: 'Arrived', tone: 'dark' },
  ARRIVED: { next: 'ON_BOARD', label: 'Passenger on board', tone: 'dark' },
  ON_BOARD: { next: 'COMPLETED', label: 'Complete ride', tone: 'gold' },
};

function StepButton({ label, tone }: { label: string; tone: 'dark' | 'gold' }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-lg px-5 py-2.5 text-sm font-bold transition disabled:opacity-60 ${
        tone === 'gold'
          ? 'bg-[var(--p-gold)] text-[#0a0a0b] hover:bg-[var(--p-gold-bright)]'
          : 'bg-[var(--p-gold)] text-[#0a0a0b] hover:bg-[var(--p-gold-bright)]'
      }`}
    >
      {pending ? 'Saving…' : label}
    </button>
  );
}

export function RideActions({
  bookingId,
  locale,
  status,
  prepaid,
  cashDue,
  advance,
}: {
  bookingId: string;
  reference: string;
  locale: string;
  status: BookingStatus;
  prepaid: boolean;
  cashDue: string;
  sharingLocation: boolean;
  advance: (formData: FormData) => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const step = STEP[status];

  if (!step) return null;

  const needsCashCheck = step.next === 'COMPLETED' && !prepaid;

  return (
    <div className="mt-3 border-t p-hairline pt-4">
      {needsCashCheck && confirming ? (
        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="text-sm font-bold text-amber-900">
            Have you collected {cashDue} from the passenger?
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <form action={advance}>
              <input type="hidden" name="bookingId" value={bookingId} />
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="status" value="COMPLETED" />
              <StepButton label="Yes, collected — complete" tone="gold" />
            </form>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-lg border-2 border-[var(--p-gold)] px-5 py-2.5 text-sm font-bold hover:bg-[var(--p-gold)] hover:text-[#0a0a0b]"
            >
              Not yet
            </button>
          </div>
        </div>
      ) : needsCashCheck ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="wave rounded-lg bg-[var(--p-gold)] px-5 py-2.5 text-sm font-bold text-[#0a0a0b] transition hover:bg-[var(--p-gold-bright)]"
        >
          {step.label}
        </button>
      ) : (
        <form action={advance}>
          <input type="hidden" name="bookingId" value={bookingId} />
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="status" value={step.next} />
          <StepButton label={step.label} tone={step.tone} />
        </form>
      )}
    </div>
  );
}
