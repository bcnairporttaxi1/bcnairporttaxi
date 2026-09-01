'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Horizontal rail for the fleet.
 *
 * The scrolling itself is native, so touch momentum and trackpad gestures work
 * exactly as the platform intends. The buttons are an addition for mouse and
 * keyboard users, and disable at each end rather than sitting there inert.
 */
export function FleetRail({ children }: { children: React.ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
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

  const nudge = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    // Step by one card plus its gap, so cards land on snap points.
    const card = el.querySelector('[data-rail-item]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="rail -mx-4 px-4 pb-4"
        tabIndex={0}
        role="region"
        aria-label="Fleet, scroll horizontally"
      >
        {children}
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="Show previous vehicles"
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink text-ice transition hover:bg-void hover:text-ice disabled:cursor-not-allowed disabled:border-line disabled:text-dim disabled:hover:bg-transparent"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M12.5 4 6.1 10l6.4 6 1.4-1.4L9.3 10l4.6-4.6z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="Show more vehicles"
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink text-ice transition hover:bg-void hover:text-ice disabled:cursor-not-allowed disabled:border-line disabled:text-dim disabled:hover:bg-transparent"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="m7.5 4 6.4 6-6.4 6-1.4-1.4L10.7 10 6.1 5.4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
