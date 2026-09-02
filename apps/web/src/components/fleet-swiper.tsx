'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FLEET } from '@bcn/core/fleet';
import { TARIFFS } from '@bcn/core/tariffs';

interface Labels {
  passengers: string;
  luggage: string;
  comfort: string;
  supplement: string;
  noSupplement: string;
  prev: string;
  next: string;
  choose: string;
  categories: Record<string, string>;
}

/**
 * The whole fleet in one window.
 *
 * One vehicle fills the frame at a time and the track slides between them, so
 * the specs of two cars are never on screen competing to be compared. Drag,
 * arrows, dots and the keyboard all drive the same index.
 *
 * The supplied photographs have a solid black background rather than
 * transparency, so they are composited with `screen`: pure black drops out
 * against the dark card. The card is a gradient rather than pure black, so
 * screen alone still leaves a faint rectangle — a radial mask feathers the
 * edges and the car reads as floating.
 */
export function FleetSwiper({ labels }: { labels: Labels }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const delta = useRef(0);
  const count = FLEET.length;

  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(count - 1, next))),
    [count],
  );

  // Keyboard belongs on the container, not the window: arrow keys should only
  // move the fleet while it actually holds focus.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    delta.current = 0;
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    delta.current = e.clientX - startX.current;
    const track = trackRef.current;
    if (!track) return;
    const pct = (delta.current / track.offsetWidth) * 100;
    track.style.transform = `translate3d(${-index * 100 + pct}%,0,0)`;
  };

  const endDrag = () => {
    if (startX.current === null) return;
    const track = trackRef.current;
    const width = track?.offsetWidth ?? 1;
    // A sixth of the frame is enough intent to advance.
    if (Math.abs(delta.current) > width * 0.16) {
      go(index + (delta.current < 0 ? 1 : -1));
    }
    startX.current = null;
    delta.current = 0;
    setDragging(false);
  };

  // Once dragging stops, React owns the transform again.
  useEffect(() => {
    const track = trackRef.current;
    if (track && !dragging) {
      track.style.transform = `translate3d(${-index * 100}%,0,0)`;
    }
  }, [index, dragging]);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-line bg-white/[0.038] p-1.5"
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.choose}
    >
      <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-raise to-pane shadow-[inset_0_1px_1px_rgba(255,255,255,0.09)]">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`flex touch-pan-y ${dragging ? '' : 'transition-transform duration-[950ms] ease-brand'}`}
          style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
        >
          {FLEET.map((v, i) => {
            const supplement = v.seats >= TARIFFS.largeVehicleMinSeats;
            return (
              <article
                key={v.slug}
                aria-hidden={i !== index}
                className="grid w-full flex-none items-center gap-5 p-6 sm:gap-10 sm:p-10 md:grid-cols-[1.15fr_.85fr]"
              >
                <div className="relative order-first grid min-h-[180px] place-items-center sm:min-h-[280px] md:order-none">
                  <div className="pointer-events-none absolute aspect-square w-[78%] rounded-full bg-gold/20 blur-[46px]" />
                  <Image
                    src={v.image}
                    alt={v.imageAlt}
                    width={560}
                    height={320}
                    sizes="(max-width: 768px) 90vw, 430px"
                    priority={i === 0}
                    className="relative w-full max-w-[430px] object-contain mix-blend-screen drop-shadow-[0_26px_34px_rgba(0,0,0,0.75)] [mask-image:radial-gradient(ellipse_74%_66%_at_50%_50%,#000_58%,transparent_100%)]"
                  />
                </div>

                <div>
                  <span className="mb-4 inline-flex rounded-full border border-gold/25 bg-gold/[0.07] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                    {labels.categories[v.categoryKey] ?? v.categoryKey}
                  </span>
                  <h3 className="mb-2 font-display text-2xl font-semibold tracking-tight sm:text-[2.1rem]">
                    {v.name}
                  </h3>

                  <dl className="mb-5 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-3">
                    <Stat k={labels.passengers} v={String(v.seats)} />
                    <Stat k={labels.luggage} v={String(v.bags)} />
                    <Stat k={labels.comfort} v={labels.categories[v.categoryKey] ?? ''} />
                  </dl>

                  <p className="mb-5 max-w-[38ch] text-[15px] leading-relaxed text-dim">
                    {v.luggageNote}
                  </p>

                  <p className="flex items-start gap-2.5 text-[12.5px] text-ghost">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-3.5 w-3.5 flex-none fill-none stroke-current stroke-[1.4]">
                      <circle cx="10" cy="10" r="7.4" />
                      <path d="M10 6.4v4.4M10 13.4h.01" />
                    </svg>
                    {supplement ? labels.supplement : labels.noSupplement}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 px-6 pb-6 sm:px-10 sm:pb-8">
          <RailButton label={labels.prev} onClick={() => go(index - 1)} disabled={index === 0}>
            <path d="M12.5 4.5 7 10l5.5 5.5" />
          </RailButton>
          <RailButton label={labels.next} onClick={() => go(index + 1)} disabled={index === count - 1}>
            <path d="M7.5 4.5 13 10l-5.5 5.5" />
          </RailButton>

          <div className="flex flex-1 flex-wrap gap-1.5" role="tablist" aria-label={labels.choose}>
            {FLEET.map((v, i) => (
              <button
                key={v.slug}
                role="tab"
                aria-selected={i === index}
                aria-label={v.name}
                onClick={() => go(i)}
                className={`h-[3px] min-w-[14px] max-w-[52px] flex-1 rounded-full transition-all duration-700 ease-brand ${
                  i === index ? 'scale-y-150 bg-gold' : 'bg-white/[0.13] hover:bg-white/25'
                }`}
              />
            ))}
          </div>

          <span className="whitespace-nowrap font-mono text-xs tabular-nums text-ghost">
            <span className="text-ice">{index + 1}</span> / {count}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#0C0C0F] px-4 py-3.5 sm:block">
      <dt className="text-[9.5px] font-medium uppercase tracking-[0.15em] text-ghost sm:mb-2">
        {k}
      </dt>
      <dd className="font-display text-lg font-semibold tracking-tight sm:text-xl">{v}</dd>
    </div>
  );
}

function RailButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 transition-all duration-500 ease-brand hover:scale-105 hover:border-line-2 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-ice stroke-[1.4]">
        {children}
      </svg>
    </button>
  );
}
