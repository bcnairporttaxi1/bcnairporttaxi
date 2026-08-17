import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { CheckoutForm } from '@/components/checkout-form';
import { calculateQuote, meetsLeadTime } from '@/lib/pricing';
import { FLEET } from '@/lib/fleet';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'checkout' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // A checkout URL carries trip parameters and has no search value.
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/checkout` },
  };
}

const OSRM = process.env.OSRM_BASE_URL ?? 'https://router.project-osrm.org';

async function fetchRoute(
  pickup: { lat: number; lng: number },
  dropoff: { lat: number; lng: number },
) {
  const path = `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`;
  const url = new URL(`/route/v1/driving/${path}`, OSRM);
  url.searchParams.set('overview', 'false');

  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    code: string;
    routes?: Array<{ distance: number; duration: number }>;
  };
  const route = data.routes?.[0];
  if (data.code !== 'Ok' || !route) return null;

  return {
    roadKm: Math.round((route.distance / 1000) * 100) / 100,
    durationMin: Math.round(route.duration / 60),
  };
}

function num(v: string | undefined): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default async function CheckoutPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const sp = await props.searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) as string | undefined;

  const t = await getTranslations('checkout');

  /** Keeps a prefill inside the range the form allows, or drops it. */
  const clamp = (v: number | null, lo: number, hi: number) =>
    v === null || Number.isNaN(v) ? undefined : Math.min(hi, Math.max(lo, Math.round(v)));

  const plat = num(one('plat'));
  const plng = num(one('plng'));
  const dlat = num(one('dlat'));
  const dlng = num(one('dlng'));
  const plabel = one('plabel') ?? '';
  const dlabel = one('dlabel') ?? '';
  const at = one('at');

  const haveTrip =
    plat !== null && plng !== null && dlat !== null && dlng !== null && Boolean(at);

  // Without a trip there is nothing to price — send them back for a quote
  // rather than rendering a broken form.
  if (!haveTrip) {
    return (
      <>
        <PageHero title={t('h1')} />
        <div className="mx-auto max-w-3xl px-4 py-14">
          <p className="rounded-card border border-hairline bg-white p-8 text-center">
            {t('missingQuote')}
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="wave inline-block rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
            >
              {t('getPrice')}
            </Link>
          </div>
        </div>
      </>
    );
  }

  const pickupAt = new Date(at!);
  const pickup = { lat: plat!, lng: plng! };
  const dropoff = { lat: dlat!, lng: dlng! };

  if (Number.isNaN(pickupAt.getTime()) || !meetsLeadTime(pickupAt)) {
    return (
      <>
        <PageHero title={t('h1')} />
        <div className="mx-auto max-w-3xl px-4 py-14">
          <p className="rounded-card border border-hairline bg-white p-8 text-center">
            {t('errors.expired')}
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="wave inline-block rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
            >
              {t('getPrice')}
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Priced here on the server. The URL carries the trip, never the fare.
  const route = await fetchRoute(pickup, dropoff);
  if (!route) {
    return (
      <>
        <PageHero title={t('h1')} />
        <div className="mx-auto max-w-3xl px-4 py-14">
          <p className="rounded-card border border-hairline bg-white p-8 text-center">
            {t('errors.failed')}
          </p>
        </div>
      </>
    );
  }

  // One quote per vehicle: 5-8 seat vehicles carry an AMB supplement, so
  // switching vehicle changes the price. Priced here rather than in the
  // browser so the figure shown always matches the figure charged.
  const quotesByVehicle = Object.fromEntries(
    FLEET.map((v) => [
      v.slug,
      calculateQuote({
        pickup,
        dropoff,
        roadKm: route.roadKm,
        durationMin: route.durationMin,
        pickupAt,
        vehicleSeats: v.seats,
      }),
    ]),
  );

  return (
    <>
      <PageHero title={t('h1')} />
      <CheckoutForm
        locale={locale}
        quotesByVehicle={quotesByVehicle}
        pickup={{ ...pickup, label: plabel }}
        dropoff={{ ...dropoff, label: dlabel }}
        pickupAtIso={pickupAt.toISOString()}
        fleet={FLEET}
        initialMode={one('mode') === 'FULL_PREPAID' ? 'FULL_PREPAID' : 'FEE_ONLY'}
        // Carried over by the rebook link so a repeat trip opens as it was.
        initialPassengers={clamp(num(one('pax')), 1, 8)}
        initialLuggage={clamp(num(one('bags')), 0, 16)}
      />
    </>
  );
}
