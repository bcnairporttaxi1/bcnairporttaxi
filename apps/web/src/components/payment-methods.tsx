/**
 * Accepted-payment marquee.
 *
 * Purely decorative reassurance: nothing here is a link or a button, and the
 * whole strip is hidden from assistive tech behind a single summary label,
 * because a screen-reader user gains nothing from hearing the card list twice
 * over as it loops.
 *
 * The row is duplicated and translated by exactly -50%, so the loop is
 * seamless: the second copy reaches the start position as the first leaves.
 */

interface Brand {
  label: string;
  /** Inline mark so the strip costs no extra requests. */
  mark: React.ReactNode;
}

function Wordmark({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-display text-sm font-extrabold tracking-tight ${className}`}>
      {children}
    </span>
  );
}

const BRANDS: Brand[] = [
  {
    label: 'Visa',
    mark: <Wordmark className="italic text-[#1434CB]">VISA</Wordmark>,
  },
  {
    label: 'Mastercard',
    mark: (
      <span className="flex items-center" aria-hidden="true">
        <span className="h-5 w-5 rounded-full bg-[#EB001B]" />
        <span className="-ml-2 h-5 w-5 rounded-full bg-[#F79E1B] mix-blend-multiply" />
      </span>
    ),
  },
  {
    label: 'Maestro',
    mark: (
      <span className="flex items-center" aria-hidden="true">
        <span className="h-5 w-5 rounded-full bg-[#0099DF]" />
        <span className="-ml-2 h-5 w-5 rounded-full bg-[#ED0006] mix-blend-multiply" />
      </span>
    ),
  },
  {
    label: 'American Express',
    mark: (
      <Wordmark className="rounded bg-[#006FCF] px-1.5 py-0.5 text-[10px] text-white">
        AMEX
      </Wordmark>
    ),
  },
  {
    label: 'Stripe',
    mark: <Wordmark className="text-[#635BFF]">stripe</Wordmark>,
  },
  {
    label: 'Cash',
    mark: (
      <span className="flex items-center gap-1 text-[#1F7A4D]" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M2 6h20v12H2z" opacity=".18" />
          <path d="M2 6h20v12H2V6Zm2 2v8h16V8H4Zm8 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
        </svg>
        <Wordmark className="text-[#1F7A4D]">CASH</Wordmark>
      </span>
    ),
  },
];

const ASSURANCES = [
  { icon: '🔒', label: 'SSL encrypted' },
  { icon: '🛡️', label: 'PCI compliant' },
  { icon: '⚡', label: 'Instant processing' },
];

function Chip({ brand }: { brand: Brand }) {
  return (
    /* Deliberately a light tile on a dark page: card marks are drawn for white
       backgrounds, and the Visa/Mastercard discs use mix-blend-multiply, which
       only composites correctly over a light surface. */
    <li className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl border border-line bg-porcelain px-4 shadow-sm">
      {brand.mark}
    </li>
  );
}

export function PaymentMethods() {
  // Two identical passes make the -50% loop seamless.
  const strip = [...BRANDS, ...BRANDS];

  return (
    <section className="border-y border-line bg-void py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-900">
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M10 1.7 3 4.6v4.6c0 4.3 3 8.3 7 9.1 4-.8 7-4.8 7-9.1V4.6L10 1.7Zm-1 12L5.6 10.3 7 8.9l2 2 4-4 1.4 1.4L9 13.7Z" />
          </svg>
          Secure &amp; trusted
        </p>

        <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
          Accepted payment methods
        </h2>
        <p className="mt-3 text-dim">
          Secure and convenient — pay with your preferred method
        </p>
      </div>

      {/* Edges fade so chips enter and leave rather than being clipped. */}
      <div
        className="marquee relative mt-10 [--marquee-duration:38s]"
        role="img"
        aria-label="We accept Visa, Mastercard, Maestro, American Express, Stripe and cash."
      >
        <ul className="marquee-track flex w-max gap-4">
          {strip.map((brand, i) => (
            <Chip key={`${brand.label}-${i}`} brand={brand} />
          ))}
        </ul>
      </div>

      <ul className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm font-semibold">
        {ASSURANCES.map((a) => (
          <li key={a.label} className="flex items-center gap-2">
            <span aria-hidden="true">{a.icon}</span>
            {a.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
