/**
 * Loading placeholders.
 *
 * Every panel in this app is server-rendered against Neon, so on a slow
 * connection the browser sat on the previous page with nothing happening until
 * the whole thing arrived. These give Next something to stream immediately.
 *
 * Shapes deliberately echo the real content — a table looks like a table
 * before it has rows — because a placeholder that matches what follows reads
 * as loading, while a generic spinner reads as broken.
 *
 * They are drawn in the panel's dark palette. Every file that imports this
 * lives under `(panel)`, and the previous light version meant each panel
 * navigation flashed a white page and a tall dark hero before settling into
 * the dark console — the placeholder contradicting the thing it stood in for.
 *
 * All of it is `aria-hidden` behind a single polite live region: a screen
 * reader should hear "loading" once, not read out forty grey rectangles.
 */

function Bar({ className = '' }: { className?: string }) {
  return (
    <span
      className={`block animate-pulse rounded bg-[rgb(255_255_255/8%)] ${className}`}
    />
  );
}

/** The rail and top bar, so the chrome does not jump when the page lands. */
export function PanelHeaderSkeleton() {
  return (
    <div className="border-b p-hairline bg-[var(--p-surface)]">
      <div className="flex items-center justify-between px-5 py-3.5 lg:px-8">
        <div>
          <Bar className="h-5 w-44" />
          <Bar className="mt-2 h-3 w-56" />
        </div>
        <Bar className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

/** A row of summary figures, as on the revenue and earnings pages. */
export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="p-card p-4">
          <Bar className="h-8 w-8 rounded-lg" />
          <Bar className="mt-3 h-6 w-24" />
          <Bar className="mt-2 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="p-card overflow-hidden">
      <div className="border-b p-hairline p-4">
        <Bar className="h-3 w-40" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-[var(--p-line-soft)] p-4 last:border-0"
        >
          <Bar className="h-4 w-24 shrink-0" />
          <Bar className="h-4 w-28 shrink-0" />
          <Bar className="h-4 flex-1" />
          <Bar className="h-4 w-20 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function CardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="p-card p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <Bar className="h-5 w-44" />
              <Bar className="mt-2 h-3 w-28" />
            </div>
            <Bar className="h-6 w-20 rounded-full" />
          </div>
          <Bar className="mt-4 h-4 w-full" />
          <Bar className="mt-2 h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

/**
 * Wraps a skeleton so assistive technology announces the state once rather
 * than trying to describe the placeholder geometry.
 *
 * The `panel` class is applied here rather than in each of the twelve
 * `loading.tsx` files: the tokens the placeholders are drawn from only exist
 * inside it, so keeping the two together means a skeleton cannot be rendered
 * without its palette.
 */
export function LoadingRegion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel min-h-screen">
      <span role="status" aria-live="polite" className="sr-only">
        {label}
      </span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}
