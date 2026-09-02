'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { eurIn } from '@bcn/core/format';
import { Link } from '@/i18n/navigation';
import { meetsLeadTime } from '@bcn/core/pricing';
import type { PaymentMode } from '@bcn/core/tariffs';
import { whatsappLink } from '@bcn/core/site';
import { AddressField, type Place } from './address-field';

const RouteMap = dynamic(() => import('./route-map'), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[280px] w-full animate-pulse rounded-xl bg-raise-2" />
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
  /** 0.20 on weekdays, 0.25 at weekends and on special days. */
  bookingFeeRate: number;
  payNowFeeOnly: number;
  payNowFull: number;
  payInTaxiFeeOnly: number;
  currency: string;
}

interface QuoteResponse {
  quote: QuotePayload;
  geometry: [number, number][];
}



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
  variant = 'full',
}: {
  presetPickup?: string;
  presetDropoff?: string;
  /**
   * `panel` stacks everything into one column for the hero sidebar and drops
   * the map, which has no room there. `full` is the two-column layout used on
   * the booking and landing pages.
   */
  variant?: 'full' | 'panel';
}) {
  const locale = useLocale();

  // Euros the way the reader writes them: "€45.20" in English, "45,20 €" in Spanish.
  // The shared formatter caches its Intl instance per locale. Building one
  // inline rebuilt it on every keystroke in the address fields.
  const eur = eurIn(locale);

  const t = useTranslations('quote');
  const initial = useMemo(() => defaultDateTime(), []);
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
  const [tripType, setTripType] = useState<'ONE_WAY' | 'RETURN'>('ONE_WAY');

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

  const isPanel = variant === 'panel';

  return (
    <section
      aria-labelledby={headingId}
      className={
        isPanel
          ? 'overflow-hidden rounded-card border border-white/12 bg-graphite/95 shadow-2xl backdrop-blur'
          : 'grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'
      }
    >
      {isPanel && (
        <div className="relative border-b border-line bg-pane px-6 py-5">
          {/* A hairline of saffron along the top edge rather than a solid slab:
              the panel reads as an instrument, and the heading keeps full
              contrast on dark instead of sitting white on amber. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            {t('panelKicker')}
          </p>
          <h2 id={headingId} className="mt-1.5 font-display text-2xl font-extrabold text-ice">
            {t('panelTitle')}
          </h2>
          <p className="mt-1 text-sm text-dim">{t('panelSub')}</p>
        </div>
      )}

      <form
        onSubmit={submit}
        className={
          isPanel
            ? 'p-5 sm:p-6'
            : 'rounded-card border border-white/12 bg-graphite/95 p-5 shadow-2xl backdrop-blur sm:p-7'
        }
      >
        {!isPanel && (
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id={headingId} className="font-display text-xl font-extrabold text-ice">
                {t('title')}
              </h2>
              <p className="mt-1 text-xs text-ghost">{t('instantPrice')}</p>
            </div>
            <span className="hidden shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-gold sm:block">
              24/7
            </span>
          </div>
        )}

        {/* Trip type — one way is the overwhelming majority, so it leads. */}
        <fieldset className={isPanel ? '' : 'mt-5'}>
          <legend className="sr-only">{t('tripType')}</legend>
          <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/12 bg-ink/60 p-1.5">
            {(['ONE_WAY', 'RETURN'] as const).map((v) => {
              const active = tripType === v;
              return (
                <label
                  key={v}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 text-center text-sm font-bold transition ${
                    active
                      ? 'bg-gold text-void'
                      : 'text-dim hover:bg-white/5 hover:text-ice'
                  }`}
                >
                  <input
                    type="radio"
                    name="tripType"
                    value={v}
                    checked={active}
                    onChange={() => setTripType(v)}
                    className="sr-only"
                  />
                  {v === 'ONE_WAY' ? t('oneWay') : t('return')}
                </label>
              );
            })}
          </div>
        </fieldset>

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
              <span className="mb-1.5 block text-sm font-medium text-dim">
                {t('date')}
              </span>
              <input
                type="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-void px-3 py-2.5 text-ice [color-scheme:dark]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-dim">
                {t('time')}
              </span>
              <input
                type="time"
                value={time}
                required
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-void px-3 py-2.5 text-ice [color-scheme:dark]"
              />
            </label>
          </div>
        </div>

        {tripType === 'RETURN' && (
          <p className="mt-3 rounded-lg border border-white/12 bg-white/5 px-3 py-2.5 text-xs leading-relaxed text-dim">
            {t('returnNote')}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="sheen mt-5 w-full rounded-xl bg-gold px-5 py-4 font-display text-base font-extrabold text-void shadow-lg shadow-accent/20 transition hover:bg-accent-deep hover:shadow-accent/30 active:scale-[0.99] disabled:opacity-60"
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
            <h3 className="font-display font-bold text-gold">{t('urgent.title')}</h3>
            <p className="mt-1.5 text-sm text-dim">{t('urgent.body')}</p>
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
              className="wave mt-3 inline-block rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-void hover:bg-accent-deep"
            >
              {t('urgent.cta')}
            </a>
          </div>
        )}
      </form>

      <div className={isPanel ? 'px-5 pb-5 sm:px-6 sm:pb-6' : 'grid gap-4'}>
        <div className={`taximeter rounded-card p-5 ${isPanel ? '' : 'sm:p-6'}`}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-ghost">
              {t('estimatedFare')}
            </p>
            {q && (
              <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs text-gold">
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

          {q && <p className="mt-1 text-xs text-ghost">{tariffLabel}</p>}

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
            <div>
              <dt className="text-ghost">{t('distance')}</dt>
              <dd className="font-mono text-ice">{q ? `${q.roadKm} km` : '—'}</dd>
            </div>
            <div>
              <dt className="text-ghost">{t('duration')}</dt>
              <dd className="font-mono text-ice">{q ? `${q.durationMin} min` : '—'}</dd>
            </div>
          </dl>

          {q && q.supplementLines.length > 0 && (
            <dl className="mt-3 space-y-1 border-t border-white/10 pt-3 text-sm">
              {q.supplementLines.map((line) => (
                <div key={line.key} className="flex justify-between">
                  <dt className="text-ghost">
                    {t(`supplementNames.${line.key}` as never)}
                  </dt>
                  <dd className="font-mono text-dim">+{eur(line.amount)}</dd>
                </div>
              ))}
            </dl>
          )}

          {q?.adjustment === 'AIRPORT_MINIMUM' && (
            <p className="mt-3 text-xs text-gold">
              {t('airportMinimumApplied', { amount: eur(q.meterEstimate) })}
            </p>
          )}
          {q?.adjustment === 'T4_FIXED' && (
            <p className="mt-3 text-xs text-gold">{t('t4Applied')}</p>
          )}

          {/* Real radio choice, carried through to checkout. Neither option is
              preferred by default styling — only the actual selection is lit. */}
          {q && (
            <fieldset className="mt-5">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-ghost">
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
                          ? 'border-gold bg-accent/15'
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
                            selected ? 'border-gold' : 'border-porcelain/40'
                          }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-gold" />}
                        </span>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${
                            selected ? 'text-gold' : 'text-dim'
                          }`}
                        >
                          {opt.title}
                        </span>
                      </span>
                      <span className="mt-1.5 block font-mono text-xl font-bold text-ice">
                        {eur(opt.amount)}
                      </span>
                      <span className="mt-1 block text-xs text-ghost">{opt.sub}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {q && (
            <Link
              href={checkoutHref}
              className="wave mt-4 block rounded-lg bg-gold px-5 py-3.5 text-center font-display font-extrabold text-void transition hover:bg-accent-deep"
            >
              {t('bookNow')}
            </Link>
          )}

          {q && (
            <p className="mt-3 text-xs text-ghost">
              {t('bookingFee', { pct: Math.round(q.bookingFeeRate * 100) })} ·{' '}
              {eur(q.bookingFee)}
            </p>
          )}

          <p className="mt-4 text-xs leading-relaxed text-ghost">{t('disclaimer')}</p>
        </div>

        {/* Leaflet is ~150KB of JS for a panel that is usually below the fold on
            mobile. Mount it only once it is near the viewport, or as soon as
            there is a route to draw. The hero sidebar has no room for a map at
            all, so it is skipped there entirely. */}
        <div
          ref={mapSlotRef}
          hidden={isPanel}
          className="overflow-hidden rounded-card border border-white/10 bg-raise-2 p-1.5"
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
              className="h-full min-h-[280px] w-full rounded-xl bg-raise-2"
            />
          )}
        </div>
      </div>
    </section>
  );
}
