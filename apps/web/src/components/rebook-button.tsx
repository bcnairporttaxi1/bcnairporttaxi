import { Link } from '@/i18n/navigation';

/**
 * One-click rebooking.
 *
 * Most people who book an airport transfer take the same journey again — out
 * on Sunday, back on Friday, the same two addresses. Making them retype both
 * into an autocomplete is the single most avoidable friction in the product.
 *
 * The link carries the whole previous journey, including the coordinates, so
 * checkout opens already priced. The one thing deliberately not carried over
 * is the date: the caller supplies a sensible default, because the old date is
 * the one value that is certainly wrong.
 *
 * The default arrives as a prop rather than being computed here. Reading the
 * clock during render makes a component non-idempotent, and this one is shared
 * — it should stay safe to drop into a client tree later.
 */
export function RebookButton({
  booking,
  label,
  variant = 'primary',
  defaultAt,
}: {
  booking: {
    pickupLat: number;
    pickupLng: number;
    pickupLabel: string;
    dropoffLat: number;
    dropoffLng: number;
    dropoffLabel: string;
    pickupAt: Date;
    paymentMode: string;
    passengers: number;
    luggage: number;
  };
  label: string;
  variant?: 'primary' | 'quiet';
  /** When the prefilled pickup should land. Computed by the caller. */
  defaultAt: Date;
}) {

  return (
    <Link
      href={{
        pathname: '/checkout',
        query: {
          plat: String(booking.pickupLat),
          plng: String(booking.pickupLng),
          plabel: booking.pickupLabel,
          dlat: String(booking.dropoffLat),
          dlng: String(booking.dropoffLng),
          dlabel: booking.dropoffLabel,
          at: defaultAt.toISOString(),
          mode: booking.paymentMode,
          pax: String(booking.passengers),
          bags: String(booking.luggage),
        },
      }}
      className={
        variant === 'primary'
          ? 'wave inline-flex items-center gap-2 rounded-xl bg-[var(--p-gold)] px-5 py-2.5 font-display text-sm font-extrabold text-[#0a0a0b] transition hover:bg-[var(--p-gold-bright)]'
          : 'inline-flex items-center gap-2 rounded-lg border-2 border-[var(--p-gold)] px-4 py-2 text-sm font-bold transition hover:bg-[var(--p-gold)] hover:text-[#0a0a0b]'
      }
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M10 3a7 7 0 1 0 6.32 4h-2.2A5 5 0 1 1 10 5V3z" />
        <path d="M10 1.5 14 4l-4 2.5z" />
      </svg>
      {label}
    </Link>
  );
}
