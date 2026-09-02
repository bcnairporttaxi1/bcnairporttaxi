'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FleetVehicle } from '@bcn/core/fleet';
import type { Quote } from '@bcn/core/pricing';
import { DEFAULT_PAYMENT_MODE } from '@bcn/core/tariffs';

interface Props {
  locale: string;
  /** Keyed by vehicle slug — the price changes with vehicle capacity. */
  quotesByVehicle: Record<string, Quote>;
  pickup: { lat: number; lng: number; label: string };
  dropoff: { lat: number; lng: number; label: string };
  pickupAtIso: string;
  fleet: FleetVehicle[];
  /** Preselected from the home-screen choice. */
  /** Carried over when rebooking a previous trip. Defaults to a couple. */
  initialPassengers?: number;
  initialLuggage?: number;
}

export function CheckoutForm({
  locale,
  quotesByVehicle,
  pickup,
  dropoff,
  pickupAtIso,
  fleet,
  initialPassengers,
  initialLuggage,
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
  const [passengers, setPassengers] = useState(initialPassengers ?? 2);
  const [luggage, setLuggage] = useState(initialLuggage ?? 2);
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

  /**
   * One number, and it is the whole transaction. There is no mode to choose
   * any more and nothing is settled with the driver, so the summary has a
   * total and nothing else to reconcile against it.
   */
  const dueNow = quote.total;

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
          paymentMode: DEFAULT_PAYMENT_MODE,
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
    'w-full rounded-lg border border-line bg-raise px-3 py-2.5 text-ice placeholder:text-muted/60';

  return (
    <form onSubmit={submit} className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-10">
          {/* Trip */}
          <section>
            <h2 className="font-display text-xl font-extrabold">{t('yourTrip')}</h2>
            <dl className="mt-4 divide-y divide-hairline rounded-card border border-line bg-raise px-5">
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-dim">{tq('pickup')}</dt>
                <dd className="text-right font-medium">{pickup.label}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-dim">{tq('dropoff')}</dt>
                <dd className="text-right font-medium">{dropoff.label}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-dim">{tq('date')}</dt>
                <dd className="text-right font-medium">{when}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-dim">{tq('distance')}</dt>
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
                      className={`cursor-pointer overflow-hidden rounded-card border-2 bg-raise transition ${
                        selected ? 'border-gold' : 'border-line hover:border-ink/40'
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
                        <p className="text-sm text-dim">
                          {tf(`categories.${v.categoryKey}`)}
                        </p>
                        <p className="mt-2 font-mono text-sm">
                          {tf('seats', { count: v.seats })} · {tf('bags', { count: v.bags })}
                        </p>
                        {/* Larger vehicles carry an official supplement, so the
                            total differs per vehicle and must be visible here. */}
                        <p className="mt-2 font-mono text-sm font-bold">
                          {eur(quotesByVehicle[v.slug]?.total ?? 0)}{' '}
                          <span className="font-sans text-xs font-normal text-dim">
                            {tq('allInclusive').toLowerCase()}
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
                <span className="mt-1 block text-xs text-dim">{t('flightHelp')}</span>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">{t('notes')}</span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
                <span className="mt-1 block text-xs text-dim">{t('notesHelp')}</span>
              </label>
            </div>
          </section>
        </div>

        {/* Summary — sticky on desktop so the price stays visible while filling in details */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-line bg-raise p-6">
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

            <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-dim">{tq('tariffBadge', { tariff: quote.tariff })}</dt>
                <dd className="font-mono">{quote.roadKm} km</dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-line pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display font-bold">{t('totalDue')}</span>
                <span className="font-mono text-2xl font-extrabold">{eur(dueNow)}</span>
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-jade">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 flex-none fill-current">
                  <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
                </svg>
                {tq('allInclusive')}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-dim">{tq('includedNote')}</p>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="cta-block cta-gold mt-5"
            >
              {busy ? t('processing') : t('payButton', { amount: eur(dueNow) })}
            </button>

            <p className="mt-3 text-xs leading-relaxed text-dim">{t('agree')}</p>
          </div>
        </aside>
      </div>
    </form>
  );
}
