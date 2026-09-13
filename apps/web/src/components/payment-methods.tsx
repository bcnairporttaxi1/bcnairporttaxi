import { getTranslations } from 'next-intl/server';

/**
 * How the passenger pays: the card marks, one line of copy, nothing else.
 *
 * This was a marquee under a "Secure & trusted" pill with emoji
 * assurances, a Stripe chip (checkout is SumUp) and a Cash chip (nothing is
 * paid in the car). It now says the one true thing — pay online, once, in
 * full — and shows the four marks a traveller looks for. The marks are
 * inline so the strip costs no requests, and they sit on light tiles
 * because card marks are drawn for white.
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
];

function Chip({ brand }: { brand: Brand }) {
  return (
    /* Deliberately a light tile on a dark page: card marks are drawn for white
       backgrounds, and the Visa/Mastercard discs use mix-blend-multiply, which
       only composites correctly over a light surface. */
    <li className="flex h-12 w-24 shrink-0 items-center justify-center rounded-xl border border-line bg-porcelain px-3 shadow-sm">
      {brand.mark}
    </li>
  );
}

export async function PaymentMethods() {
  const t = await getTranslations('home');

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="max-w-md">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{t('payment.title')}</h2>
          <p className="mt-1.5 text-sm text-dim">{t('payment.note')}</p>
        </div>
        <ul className="flex flex-wrap gap-3" role="img" aria-label={BRANDS.map((b) => b.label).join(', ')}>
          {BRANDS.map((brand) => (
            <Chip key={brand.label} brand={brand} />
          ))}
        </ul>
      </div>
    </section>
  );
}
