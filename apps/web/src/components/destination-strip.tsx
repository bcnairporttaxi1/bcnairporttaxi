'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export interface StripItem {
  slug: string;
  place: string;
  href: string;
  km?: number;
  minutes?: number;
  /** Pre-formatted fare, computed on the server from the live tariff. */
  fare?: string;
  photo?: { file: string; alt: string } | null;
}

/**
 * Horizontal filmstrip of destinations.
 *
 * Native scrolling does the work, so touch momentum and trackpad gestures
 * behave exactly as the platform intends; the buttons and the progress bar are
 * an addition for mouse and keyboard. Photographs sit desaturated at rest and
 * come up to full colour under the pointer, so the row reads as one surface
 * rather than a wall of competing images.
 */
export function DestinationStrip({
  items,
  labels,
}: {
  items: StripItem[];
  labels: { prev: string; next: string; from: string };
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ pct: 0, width: 30 });

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress({
      pct: max > 0 ? (el.scrollLeft / max) * 100 : 0,
      width: Math.max(12, (el.clientWidth / el.scrollWidth) * 100),
    });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 280) + 14;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((d) => (
          <Link
            key={d.slug}
            href={d.href}
            data-card
            className="group relative aspect-[3/4.1] w-[clamp(228px,25vw,308px)] flex-none snap-start overflow-hidden rounded-[26px] border border-line transition-all duration-[900ms] ease-brand hover:-translate-y-2.5 hover:border-gold/40 hover:shadow-[0_34px_70px_-34px_#000]"
          >
            {d.photo ? (
              <Image
                src={d.photo.file}
                alt={d.photo.alt}
                fill
                sizes="(max-width: 640px) 76vw, 308px"
                className="object-cover brightness-[.62] saturate-[.62] transition-all duration-[1500ms] ease-brand group-hover:scale-[1.09] group-hover:brightness-[.78] group-hover:saturate-100"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-b from-raise-2 to-pane" />
            )}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent"
            />
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="block font-display text-xl font-semibold text-ice">
                {d.place}
              </span>
              <span className="mt-1.5 flex flex-wrap items-baseline gap-2 text-[12.5px] text-dim">
                {d.fare && (
                  <span className="font-display text-[15px] font-semibold text-gold">
                    {labels.from} {d.fare}
                  </span>
                )}
                {d.km != null && <span>{d.km} km</span>}
                {d.minutes != null && <span>{d.minutes} min</span>}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <RailBtn label={labels.prev} onClick={() => nudge(-1)}>
          <path d="M12.5 4.5 7 10l5.5 5.5" />
        </RailBtn>
        <RailBtn label={labels.next} onClick={() => nudge(1)}>
          <path d="M7.5 4.5 13 10l-5.5 5.5" />
        </RailBtn>
        <span className="ml-2 h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
          <span
            className="block h-full rounded-full bg-gold transition-transform duration-300 ease-brand"
            style={{
              width: `${progress.width}%`,
              transform: `translateX(${(progress.pct / 100) * (100 / (progress.width / 100) - 100)}%)`,
            }}
          />
        </span>
      </div>
    </div>
  );
}

function RailBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 transition-all duration-500 ease-brand hover:scale-105 hover:border-line-2 hover:bg-white/10"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-ice stroke-[1.4]">
        {children}
      </svg>
    </button>
  );
}
