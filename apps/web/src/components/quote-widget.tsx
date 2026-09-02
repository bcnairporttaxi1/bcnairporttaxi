'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { eurIn } from '@bcn/core/format';
import { Link } from '@/i18n/navigation';
import { meetsLeadTime } from '@bcn/core/pricing';
import { DEFAULT_PAYMENT_MODE } from '@bcn/core/tariffs';
import { whatsappLink } from '@bcn/core/site';
import { AddressField, type Place } from './address-field';

const RouteMap = dynamic(() => import('./route-map'), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[280px] w-full animate-pulse rounded-xl bg-raise-2" />
  ),
});

export interface QuotePayload {
  tariff: 'T1' | 'T2' | 'T4' | 'T6' | 'T7';
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
  /**
   * The only figure this widget shows. Fare, official supplements and our
   * service charge, all in, paid online — see `Quote.total`.
   */
  total: number;
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
  const [tripType, setTripType] = useState<'ONE_WAY' | 'RETURN'>('ONE_WAY');
  /**
   * Bumped on every swap. AddressField keeps its own text state, seeded once
   * from `initialQuery`, so exchanging the two places has to remount them —
   * otherwise the labels stay put while the coordinates cross over, which is
   * the worst of both.
   */
  const [swapSeq, setSwapSeq] = useState(0);

  const swap = useCallback(() => {
    setPickup(dropoff);
    setDropoff(pickup);
    setSwapSeq((n) => n + 1);
  }, [pickup, dropoff]);

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

  const TARIFF_LABELS = {
    T1: 'tariffT1',
    T2: 'tariffT2',
    T4: 'tariffT4',
    T6: 'tariffT6',
    T7: 'tariffT7',
  } as const;
  const tariffLabel = q ? t(TARIFF_LABELS[q.tariff]) : '';

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
          mode: DEFAULT_PAYMENT_MODE,
        }).toString()}`
      : '/book';

  const isPanel = variant === 'panel';

  return (
    <section
      aria-labelledby={headingId}
      className={
        isPanel
          ? 'overflow-hidden rounded-shell border border-line-2 bg-pane/85 shadow-[0_40px_90px_-40px_#000] backdrop-blur-2xl backdrop-saturate-150'
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
            : 'rounded-shell border border-line-2 bg-pane/85 p-5 shadow-[0_40px_90px_-40px_#000] backdrop-blur-2xl sm:p-7'
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

        {/* Trip type. The indicator travels rather than the two halves
            recolouring — the movement is what confirms the choice landed. */}
        <fieldset className={isPanel ? '' : 'mt-5'}>
          <legend className="sr-only">{t('tripType')}</legend>
          <div className="seg well">
            <span
              aria-hidden="true"
              className="seg-thumb"
              style={{
                transform: `translateX(${tripType === 'RETURN' ? '100%' : '0%'})`,
              }}
            />
            {(['ONE_WAY', 'RETURN'] as const).map((v) => {
              const active = tripType === v;
              return (
                <label
                  key={v}
                  className={`relative cursor-pointer rounded-[0.55rem] px-3 py-2.5 text-center text-sm font-bold transition-colors duration-500 ease-brand ${
                    active ? 'text-void' : 'text-dim hover:text-ice'
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

        {/* Pickup and drop-off are one object, not two questions. The spine
            down the left says so: an origin dot, a dotted run, a destination
            square — ornament that happens to also be information. */}
        <div className="well relative mt-4 rounded-2xl p-4">
          <div className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-3">
            <span aria-hidden="true" className="spine-dot mt-[1.45rem] justify-self-center" />
            <div className="pr-10">
              <AddressField
                key={`pickup-${swapSeq}`}
                bare
                label={t('pickup')}
                placeholder={t('pickupPlaceholder')}
                value={pickup}
                onChange={setPickup}
                initialQuery={swapSeq === 0 ? presetPickup : (pickup?.label ?? '')}
              />
            </div>

            <span aria-hidden="true" className="spine-run justify-self-center" />
            <div aria-hidden="true" className="my-3 h-px bg-line" />

            <span aria-hidden="true" className="spine-end mt-[1.45rem] justify-self-center" />
            <div className="pr-10">
              <AddressField
                key={`dropoff-${swapSeq}`}
                bare
                label={t('dropoff')}
                placeholder={t('dropoffPlaceholder')}
                value={dropoff}
                onChange={setDropoff}
                initialQuery={swapSeq === 0 ? presetDropoff : (dropoff?.label ?? '')}
              />
            </div>
          </div>

          {/* Sits on the divider, so it reads as the hinge the two ends turn
              around. Disabled until there is actually something to exchange. */}
          <button
            type="button"
            onClick={swap}
            disabled={!pickup && !dropoff}
            aria-label={t('swap')}
            title={t('swap')}
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-raise-2 text-dim transition-all duration-500 ease-brand hover:rotate-180 hover:border-gold/50 hover:text-gold disabled:pointer-events-none disabled:opacity-35"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[1.6]">
              <path d="M6.5 3.5 3.5 6.5l3 3M3.5 6.5h13M13.5 16.5l3-3-3-3M16.5 13.5h-13" />
            </svg>
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="well block rounded-2xl px-4 py-3">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
              {t('date')}
            </span>
            <input
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
              className="bare-input mt-1 font-medium [color-scheme:dark]"
            />
          </label>
          <label className="well block rounded-2xl px-4 py-3">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
              {t('time')}
            </span>
            <input
              type="time"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
              className="bare-input mt-1 font-medium [color-scheme:dark]"
            />
          </label>
        </div>

        {tripType === 'RETURN' && (
          <p className="mt-3 rounded-xl border border-line-2 bg-white/5 px-3.5 py-2.5 text-xs leading-relaxed text-dim">
            {t('returnNote')}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="cta-block cta-gold mt-4 gap-2.5"
        >
          {loading && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-void/25 border-t-void"
            />
          )}
          {loading ? t('calculating') : t('calculate')}
        </button>

        <p aria-live="polite" className="sr-only">
          {q ? `${t('totalPrice')} ${eur(q.total)}` : ''}
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
              className="cta cta-gold cta-sm group mt-3"
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
              {t('totalPrice')}
            </p>
            {q && (
              <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs text-gold">
                {t('tariffBadge', { tariff: q.tariff })}
              </span>
            )}
          </div>

          <p
            key={q?.total ?? 'idle'}
            className="taximeter-digits animate-digit-roll mt-2 text-5xl font-bold sm:text-6xl"
          >
            {q ? eur(q.total) : '— . —'}
          </p>

          <p className="mt-1.5 flex items-center gap-2 text-xs text-jade">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 flex-none fill-current">
              <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
            </svg>
            {t('allInclusive')}
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

          {q?.adjustment === 'AIRPORT_MINIMUM' && (
            <p className="mt-3 text-xs text-gold">
              {t('airportMinimumApplied', { amount: eur(q.total) })}
            </p>
          )}
          {q?.adjustment === 'T4_FIXED' && (
            <p className="mt-3 text-xs text-gold">{t('t4Applied')}</p>
          )}

          {q && (
            <Link href={checkoutHref} className="cta-block cta-gold mt-4">
              {t('bookNow')}
            </Link>
          )}

          {q && (
            <p className="mt-3 text-xs leading-relaxed text-dim">{t('includedNote')}</p>
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
