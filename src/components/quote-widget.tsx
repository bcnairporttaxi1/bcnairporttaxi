'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { meetsLeadTime } from '@/lib/pricing';
import type { PaymentMode } from '@/lib/tariffs';
import { whatsappLink } from '@/lib/site';
import { AddressField, type Place } from './address-field';

const RouteMap = dynamic(() => import('./route-map'), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[280px] w-full animate-pulse rounded-xl bg-graphite-2" />
  ),
});

export interface QuotePayload {
  tariff: 'T1' | 'T2' | 'T4';
  roadKm: number;
  durationMin: number;
  perKmRate: number;
  perKmRateCharged: number;
  supplements: number;
  supplementLines: Array<{ key: string; amount: number }>;
  adjustment: 'AIRPORT_MINIMUM' | 'T4_FIXED' | null;
  meterEstimate: number;
  fixedFare: number;
  bookingFee: number;
  payNowFeeOnly: number;
  payNowFull: number;
  payInTaxiFeeOnly: number;
  currency: string;
}

interface QuoteResponse {
  quote: QuotePayload;
  geometry: [number, number][];
}

export const eur = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(n);

/** Default pickup: tomorrow at 10:00, which always clears the 3-hour rule. */
function defaultDateTime() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(10, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: '10:00',
  };
}

export function QuoteWidget({
  presetPickup = '',
  presetDropoff = '',
}: {
  presetPickup?: string;
  presetDropoff?: string;
}) {
  const t = useTranslations('quote');
  const initial = useMemo(defaultDateTime, []);
  const headingId = useId();

  const [pickup, setPickup] = useState<Place | null>(null);
  const [dropoff, setDropoff] = useState<Place | null>(null);
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);

  const [result, setResult] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tooSoon, setTooSoon] = useState(false);
  /** Chosen here on the home screen and carried into checkout preselected. */
  const [mode, setMode] = useState<PaymentMode>('FEE_ONLY');

  const mapSlotRef = useRef<HTMLDivElement>(null);
  const [mapInView, setMapInView] = useState(false);
  /** A fetched route always wins, even if the panel is still off-screen. */
  const showMap = mapInView || Boolean(result);

  useEffect(() => {
    const el = mapSlotRef.current;
    if (!el || mapInView) return;

    // No IntersectionObserver (very old browser) — just show it.
    if (typeof IntersectionObserver === 'undefined') {
      setMapInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setMapInView(true);
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mapInView]);

  const pickupAt = useMemo(() => new Date(`${date}T${time}:00`), [date, time]);

  // A stale estimate next to changed inputs would be misleading.
  useEffect(() => {
    setResult(null);
  }, [pickup, dropoff, date, time]);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setTooSoon(false);

      if (!pickup) return setError(t('errors.pickupRequired'));
      if (!dropoff) return setError(t('errors.dropoffRequired'));

      if (!meetsLeadTime(pickupAt)) {
        setTooSoon(true);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pickup: { lat: pickup.lat, lng: pickup.lng },
            dropoff: { lat: dropoff.lat, lng: dropoff.lng },
            pickupAt: pickupAt.toISOString(),
          }),
        });

        if (res.status === 422) {
          const body = await res.json();
          setError(
            body.error === 'pickup_outside_area'
              ? t('errors.pickupOutsideCity')
              : t('errors.routeFailed'),
          );
          return;
        }
        if (!res.ok) {
          setError(t('errors.routeFailed'));
          return;
        }

        setResult((await res.json()) as QuoteResponse);
      } catch {
        setError(t('errors.routeFailed'));
      } finally {
        setLoading(false);
      }
    },
    [pickup, dropoff, pickupAt, t],
  );

  const q = result?.quote;

  const tariffLabel = q
    ? q.tariff === 'T1'
      ? t('tariffT1')
      : q.tariff === 'T2'
        ? t('tariffT2')
        : t('tariffT4')
    : '';

  /**
   * Carries only the trip inputs to checkout, never the price. Checkout
   * recomputes the fare server-side, so a hand-edited URL cannot set what is
   * charged.
   */
  const checkoutHref =
    pickup && dropoff
      ? `/checkout?${new URLSearchParams({
          plat: String(pickup.lat),
          plng: String(pickup.lng),
          plabel: pickup.label,
          dlat: String(dropoff.lat),
          dlng: String(dropoff.lng),
          dlabel: dropoff.label,
          at: pickupAt.toISOString(),
          mode,
        }).toString()}`
      : '/book';

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <form
        onSubmit={submit}
        className="rounded-card border border-white/10 bg-graphite p-5 sm:p-6"
      >
        <h2 id={headingId} className="font-display text-xl font-bold text-porcelain">
          {t('title')}
        </h2>

        <div className="mt-5 space-y-4">
          <AddressField
            label={t('pickup')}
            placeholder={t('pickupPlaceholder')}
            value={pickup}
            onChange={setPickup}
            initialQuery={presetPickup}
          />
          <AddressField
            label={t('dropoff')}
            placeholder={t('dropoffPlaceholder')}
            value={dropoff}
            onChange={setDropoff}
            initialQuery={presetDropoff}
          />

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-porcelain/80">
                {t('date')}
              </span>
              <input
                type="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-ink px-3 py-2.5 text-porcelain [color-scheme:dark]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-porcelain/80">
                {t('time')}
              </span>
              <input
                type="time"
                value={time}
                required
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-ink px-3 py-2.5 text-porcelain [color-scheme:dark]"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep disabled:opacity-60"
        >
          {loading ? t('calculating') : t('calculate')}
        </button>

        <p aria-live="polite" className="sr-only">
          {q ? `${t('estimatedFare')} ${eur(q.meterEstimate)}` : ''}
        </p>

        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-red-500/15 px-3 py-2.5 text-sm text-red-200">
            {error}
          </p>
        )}

        {tooSoon && (
          <div role="alert" className="mt-4 rounded-xl border border-accent/40 bg-accent/10 p-4">
            <h3 className="font-display font-bold text-accent">{t('urgent.title')}</h3>
            <p className="mt-1.5 text-sm text-porcelain/80">{t('urgent.body')}</p>
            <a
              href={whatsappLink(
                t('urgent.prefill', {
                  pickup: pickup?.label ?? '—',
                  dropoff: dropoff?.label ?? '—',
                  time: `${date} ${time}`,
                }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-ink hover:bg-accent-deep"
            >
              {t('urgent.cta')}
            </a>
          </div>
        )}
      </form>

      <div className="grid gap-4">
        <div className="taximeter rounded-card p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-porcelain/55">
              {t('estimatedFare')}
            </p>
            {q && (
              <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                {t('tariffBadge', { tariff: q.tariff })}
              </span>
            )}
          </div>

          <p
            key={q?.meterEstimate ?? 'idle'}
            className="taximeter-digits animate-digit-roll mt-2 text-5xl font-bold sm:text-6xl"
          >
            {q ? eur(q.meterEstimate) : '— . —'}
          </p>

          {q && <p className="mt-1 text-xs text-porcelain/50">{tariffLabel}</p>}

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
            <div>
              <dt className="text-porcelain/50">{t('distance')}</dt>
              <dd className="font-mono text-porcelain">{q ? `${q.roadKm} km` : '—'}</dd>
            </div>
            <div>
              <dt className="text-porcelain/50">{t('duration')}</dt>
              <dd className="font-mono text-porcelain">{q ? `${q.durationMin} min` : '—'}</dd>
            </div>
          </dl>

          {q && q.supplementLines.length > 0 && (
            <dl className="mt-3 space-y-1 border-t border-white/10 pt-3 text-sm">
              {q.supplementLines.map((line) => (
                <div key={line.key} className="flex justify-between">
                  <dt className="text-porcelain/50">
                    {t(`supplementNames.${line.key}` as never)}
                  </dt>
                  <dd className="font-mono text-porcelain/80">+{eur(line.amount)}</dd>
                </div>
              ))}
            </dl>
          )}

          {q?.adjustment === 'AIRPORT_MINIMUM' && (
            <p className="mt-3 text-xs text-accent">
              {t('airportMinimumApplied', { amount: eur(q.meterEstimate) })}
            </p>
          )}
          {q?.adjustment === 'T4_FIXED' && (
            <p className="mt-3 text-xs text-accent">{t('t4Applied')}</p>
          )}

          {/* Real radio choice, carried through to checkout. Neither option is
              preferred by default styling — only the actual selection is lit. */}
          {q && (
            <fieldset className="mt-5">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-porcelain/55">
                {t('chooseHowToPay')}
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {(
                  [
                    {
                      value: 'FEE_ONLY' as const,
                      title: t('modeFeeOnlyTitle'),
                      amount: q.payNowFeeOnly,
                      sub: `+ ${eur(q.payInTaxiFeeOnly)} ${t('payInTaxi').toLowerCase()}`,
                    },
                    {
                      value: 'FULL_PREPAID' as const,
                      title: t('modeFullTitle'),
                      amount: q.payNowFull,
                      sub: t('nothingInTaxi'),
                    },
                  ]
                ).map((opt) => {
                  const selected = mode === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`cursor-pointer rounded-lg border p-3 transition ${
                        selected
                          ? 'border-accent bg-accent/15'
                          : 'border-white/12 bg-white/5 hover:border-white/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value={opt.value}
                        checked={selected}
                        onChange={() => setMode(opt.value)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
                            selected ? 'border-accent' : 'border-porcelain/40'
                          }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-accent" />}
                        </span>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${
                            selected ? 'text-accent' : 'text-porcelain/60'
                          }`}
                        >
                          {opt.title}
                        </span>
                      </span>
                      <span className="mt-1.5 block font-mono text-xl font-bold text-porcelain">
                        {eur(opt.amount)}
                      </span>
                      <span className="mt-1 block text-xs text-porcelain/50">{opt.sub}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {q && (
            <Link
              href={checkoutHref}
              className="mt-4 block rounded-lg bg-accent px-5 py-3.5 text-center font-display font-extrabold text-ink transition hover:bg-accent-deep"
            >
              {t('bookNow')}
            </Link>
          )}

          <p className="mt-4 text-xs leading-relaxed text-porcelain/45">{t('disclaimer')}</p>
        </div>

        {/* Leaflet is ~150KB of JS for a panel that is usually below the fold on
            mobile. Mount it only once it is near the viewport, or as soon as
            there is a route to draw. */}
        <div
          ref={mapSlotRef}
          className="overflow-hidden rounded-card border border-white/10 bg-graphite-2 p-1.5"
        >
          {showMap ? (
            <RouteMap
              pickup={pickup}
              dropoff={dropoff}
              geometry={result?.geometry ?? null}
              label="Route map from pickup to drop-off in Barcelona"
            />
          ) : (
            <div
              aria-hidden="true"
              className="h-full min-h-[280px] w-full rounded-xl bg-graphite-2"
            />
          )}
        </div>
      </div>
    </section>
  );
}
