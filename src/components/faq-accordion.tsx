'use client';

import { useState } from 'react';

/**
 * FAQ accordion built on <details>/<summary>.
 *
 * Native disclosure gives keyboard support, screen-reader semantics and
 * find-in-page for free, and the answers stay in the DOM for crawlers. State
 * is tracked only to rotate the chevron.
 */
export function FaqAccordion({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-card border border-hairline bg-white">
      {items.map((item, i) => (
        <details
          key={item.q}
          open={open === i}
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) setOpen(i);
            else if (open === i) setOpen(null);
          }}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-display text-base font-bold transition hover:bg-porcelain sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-accent-text transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M11 5h2v14h-2z" />
                <path d="M5 11h14v2H5z" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5 text-slate-body sm:px-6">
            <p className="leading-relaxed">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
