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
 * All of it is `aria-hidden` behind a single polite live region: a screen
 * reader should hear "loading" once, not read out forty grey rectangles.
 */

function Bar({ className = '' }: { className?: string }) {
  return <span className={`block animate-pulse rounded bg-slate-200 ${className}`} />;
}

/** Panel header: title, subtitle and the row of tabs. */
export function PanelHeaderSkeleton() {
  return (
    <div className="border-b border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Bar className="h-9 w-56 bg-white/15" />
        <Bar className="mt-3 h-4 w-80 bg-white/10" />
        <div className="mt-7 flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }, (_, i) => (
            <Bar key={i} className="h-9 w-24 bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A row of summary figures, as on the revenue and earnings pages. */
export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="rounded-card border border-hairline bg-white p-5">
          <Bar className="h-3 w-24" />
          <Bar className="mt-3 h-7 w-28" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-white">
      <div className="border-b border-hairline p-4">
        <Bar className="h-3 w-40" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-hairline p-4 last:border-0">
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
        <div key={i} className="rounded-card border border-hairline bg-white p-5">
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
 */
export function LoadingRegion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <span role="status" aria-live="polite" className="sr-only">
        {label}
      </span>
      <div aria-hidden="true">{children}</div>
    </>
  );
}
