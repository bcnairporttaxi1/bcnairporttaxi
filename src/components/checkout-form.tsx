'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FleetVehicle } from '@/lib/fleet';
import type { Quote } from '@/lib/pricing';
import type { PaymentMode } from '@/lib/tariffs';

interface Props {
  locale: string;
  /** Keyed by vehicle slug — the price changes with vehicle capacity. */
  quotesByVehicle: Record<string, Quote>;
  pickup: { lat: number; lng: number; label: string };
  dropoff: { lat: number; lng: number; label: string };
  pickupAtIso: string;
  fleet: FleetVehicle[];
  /** Preselected from the home-screen choice. */
  initialMode: PaymentMode;
}

export function CheckoutForm({
  locale,
  quotesByVehicle,
  pickup,
  dropoff,
  pickupAtIso,
  fleet,
  initialMode,
}: Props) {
  // Same locale rule as the date formatter below: zh needs an explicit script.
  const eur = (n: number) =>
    new Intl.NumberFormat(locale === 'zh' ? 'zh-Hans' : locale, {
      style: 'currency',
      currency: 'EUR',
    }).format(n);

  const t = useTranslations('checkout');
  const tq = useTranslations('quote');
  const tf = useTranslations('fleet');

  const [vehicleSlug, setVehicleSlug] = useState(fleet[1]?.slug ?? fleet[0].slug);
  const [mode, setMode] = useState<PaymentMode>(initialMode);
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flight, setFlight] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicle = fleet.find((v) => v.slug === vehicleSlug) ?? fleet[0];
  const overCapacity = passengers > vehicle.seats || luggage > vehicle.bags;

  const quote = quotesByVehicle[vehicle.slug] ?? Object.values(quotesByVehicle)[0];

  const dueNow = mode === 'FULL_PREPAID' ? quote.payNowFull : quote.payNowFeeOnly;
  const dueInTaxi = mode === 'FULL_PREPAID' ? 0 : quote.payInTaxiFeeOnly;

  const when = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'zh' ? 'zh-Hans' : locale, {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Madrid',
      }).format(new Date(pickupAtIso)),
    [pickupAtIso, locale],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup: { lat: pickup.lat, lng: pickup.lng, label: pickup.label },
          dropoff: { lat: dropoff.lat, lng: dropoff.lng, label: dropoff.label },
          pickupAt: pickupAtIso,
          contactName: name,
          contactEmail: email,
          contactPhone: phone,
          passengers,
          luggage,
          vehicleSlug,
          paymentMode: mode,
          notes: [flight && `Flight: ${flight}`, notes].filter(Boolean).join(' — '),
          locale,
        }),
      });

      if (!res.ok) {
        setError(t('errors.failed'));
        return;
      }

      const data = (await res.json()) as {
        reference: string;
        payment: { redirectUrl: string | null };
      };

      // Hosted checkout when SumUp is live; otherwise straight to the
      // confirmation page, which shows the booking as awaiting payment.
      window.location.href =
        data.payment.redirectUrl ?? `/${locale}/booking/${data.reference}`;
    } catch {
      setError(t('errors.failed'));
    } finally {
      setBusy(false);
    }
  }

  const field =
    'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-slate-body placeholder:text-muted/60';

  return (
    <form onSubmit={submit} className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-10">
          {/* Trip */}
          <section>
            <h2 className="font-display text-xl font-extrabold">{t('yourTrip')}</h2>
            <dl className="mt-4 divide-y divide-hairline rounded-card border border-hairline bg-white px-5">
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-muted">{tq('pickup')}</dt>
                <dd className="text-right font-medium">{pickup.label}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-muted">{tq('dropoff')}</dt>
                <dd className="text-right font-medium">{dropoff.label}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-muted">{tq('date')}</dt>
                <dd className="text-right font-medium">{when}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-muted">{tq('distance')}</dt>
                <dd className="text-right font-mono">
                  {quote.roadKm} km · {quote.durationMin} min
                </dd>
              </div>
            </dl>
          </section>

          {/* Vehicle */}
          <section>
            <h2 className="font-display text-xl font-extrabold">{t('chooseVehicle')}</h2>
            <fieldset className="mt-4">
              <legend className="sr-only">{t('chooseVehicle')}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {fleet.map((v) => {
                  const selected = v.slug === vehicleSlug;
                  return (
                    <label
                      key={v.slug}
                      className={`cursor-pointer overflow-hidden rounded-card border-2 bg-white transition ${
                        selected ? 'border-accent' : 'border-hairline hover:border-ink/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="vehicle"
                        value={v.slug}
                        checked={selected}
                        onChange={() => setVehicleSlug(v.slug)}
                        className="sr-only"
                      />
                      <Image
                        src={v.image}
                        alt={v.imageAlt}
                        width={1200}
                        height={800}
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="aspect-[3/2] w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="font-display font-bold">{v.name}</p>
                        <p className="text-sm text-muted">
                          {tf(`categories.${v.categoryKey}`)}
                        </p>
                        <p className="mt-2 font-mono text-sm">
                          {tf('seats', { count: v.seats })} · {tf('bags', { count: v.bags })}
                        </p>
                        {/* Larger vehicles carry an official supplement, so the
                            total differs per vehicle and must be visible here. */}
                        <p className="mt-2 font-mono text-sm font-bold">
                          {eur(
                            mode === 'FULL_PREPAID'
                              ? (quotesByVehicle[v.slug]?.payNowFull ?? 0)
                              : (quotesByVehicle[v.slug]?.payNowFeeOnly ?? 0),
                          )}{' '}
                          <span className="font-sans text-xs font-normal text-muted">
                            {tq('payNow').toLowerCase()}
                          </span>
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {overCapacity && (
              <p role="alert" className="mt-3 rounded-lg bg-amber-100 px-3 py-2.5 text-sm text-amber-900">
                {t('capacityWarning', { seats: vehicle.seats, bags: vehicle.bags })}
              </p>
            )}
          </section>

          {/* Payment choice */}
          <section>
            <h2 className="font-display text-xl font-extrabold">{tq('chooseHowToPay')}</h2>
            <fieldset className="mt-4 grid gap-3">
              <legend className="sr-only">{tq('chooseHowToPay')}</legend>

              <label
                className={`cursor-pointer rounded-card border-2 p-5 transition ${
                  mode === 'FEE_ONLY' ? 'border-accent bg-accent/5' : 'border-hairline bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'FEE_ONLY'}
                  onChange={() => setMode('FEE_ONLY')}
                  className="sr-only"
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display font-bold">{tq('modeFeeOnlyTitle')}</span>
                  <span className="font-mono text-lg font-bold">{eur(quote.payNowFeeOnly)}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {tq('modeFeeOnlyBody', {
                    fee: eur(quote.bookingFee),
                    fare: eur(quote.meterEstimate),
                  })}
                </p>
              </label>

              <label
                className={`cursor-pointer rounded-card border-2 p-5 transition ${
                  mode === 'FULL_PREPAID'
                    ? 'border-accent bg-accent/5'
                    : 'border-hairline bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'FULL_PREPAID'}
                  onChange={() => setMode('FULL_PREPAID')}
                  className="sr-only"
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display font-bold">{tq('modeFullTitle')}</span>
                  <span className="font-mono text-lg font-bold">{eur(quote.payNowFull)}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {tq('modeFullBody', { total: eur(quote.payNowFull) })}
                </p>
              </label>
            </fieldset>
            <p className="mt-3 text-xs leading-relaxed text-muted">{tq('fixedFareNote')}</p>
          </section>

          {/* Details */}
          <section>
            <h2 className="font-display text-xl font-extrabold">{t('yourDetails')}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">{t('name')}</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{t('email')}</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{t('phone')}</span>
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} autoComplete="tel" placeholder="+34 600 000 000" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{t('passengers')}</span>
                <input type="number" min={1} max={8} value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{t('luggage')}</span>
                <input type="number" min={0} max={12} value={luggage} onChange={(e) => setLuggage(Number(e.target.value))} className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">{t('flight')}</span>
                <input value={flight} onChange={(e) => setFlight(e.target.value)} className={field} placeholder="VY1234" />
                <span className="mt-1 block text-xs text-muted">{t('flightHelp')}</span>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">{t('notes')}</span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
                <span className="mt-1 block text-xs text-muted">{t('notesHelp')}</span>
              </label>
            </div>
          </section>
        </div>

        {/* Summary — sticky on desktop so the price stays visible while filling in details */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-hairline bg-white p-6">
            <h2 className="font-display text-lg font-extrabold">{t('summary')}</h2>

            <Image
              src={vehicle.image}
              alt={vehicle.imageAlt}
              width={1200}
              height={800}
              sizes="360px"
              className="mt-4 aspect-[3/2] w-full rounded-xl object-cover"
            />
            <p className="mt-2 font-display font-bold">{vehicle.name}</p>

            <dl className="mt-5 space-y-2.5 border-t border-hairline pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">{tq('tariffBadge', { tariff: quote.tariff })}</dt>
                <dd className="font-mono">
                  {eur(quote.perKmRateCharged)}/km
                </dd>
              </div>
              {quote.supplementLines.map((l) => (
                <div key={l.key} className="flex justify-between">
                  <dt className="text-muted">{tq(`supplementNames.${l.key}` as never)}</dt>
                  <dd className="font-mono">{eur(l.amount)}</dd>
                </div>
              ))}
              <div className="flex justify-between">
                <dt className="text-muted">
                  {mode === 'FULL_PREPAID' ? tq('fixedFare') : tq('estimatedFare')}
                </dt>
                <dd className="font-mono">
                  {eur(mode === 'FULL_PREPAID' ? quote.fixedFare : quote.meterEstimate)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{tq('bookingFee', { pct: Math.round(quote.bookingFeeRate * 100) })}</dt>
                <dd className="font-mono">{eur(quote.bookingFee)}</dd>
              </div>
            </dl>

            <div className="mt-4 space-y-2 border-t border-hairline pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display font-bold">{tq('payNow')}</span>
                <span className="font-mono text-2xl font-extrabold">{eur(dueNow)}</span>
              </div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted">{tq('payInTaxi')}</span>
                <span className="font-mono">
                  {dueInTaxi === 0 ? tq('nothingInTaxi') : eur(dueInTaxi)}
                </span>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="wave mt-5 w-full rounded-lg bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
            >
              {busy ? t('processing') : t('payButton', { amount: eur(dueNow) })}
            </button>

            <p className="mt-3 text-xs leading-relaxed text-muted">{t('agree')}</p>
          </div>
        </aside>
      </div>
    </form>
  );
}
