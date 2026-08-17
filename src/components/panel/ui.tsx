import { Link } from '@/i18n/navigation';

/** Shared panel primitives: cards, stat tiles, section headers, empty states. */

export function Card({
  children,
  className = '',
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`p-card ${padded ? 'p-5' : ''} ${className}`}>{children}</div>
  );
}

export function CardHeader({
  title,
  hint,
  actions,
}: {
  title: string;
  hint?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="font-display text-sm font-bold tracking-wide">{title}</h2>
        {hint && <p className="mt-0.5 text-xs p-muted">{hint}</p>}
      </div>
      {actions}
    </div>
  );
}

/**
 * Trend badge.
 *
 * Direction is carried by the arrow as well as the colour, so it still reads
 * without colour vision. A change of exactly zero is shown as flat rather than
 * as a positive, because "no change" and "up nothing" are different facts.
 */
export function Trend({ pct }: { pct: number | null }) {
  if (pct === null || !Number.isFinite(pct)) return null;
  const tone = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
  const arrow = pct > 0 ? '↗' : pct < 0 ? '↘' : '→';
  return (
    <span className={`p-trend p-trend-${tone}`}>
      {arrow} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

export function StatTile({
  icon,
  label,
  value,
  sub,
  trend,
  href,
  tone = 'plain',
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  trend?: number | null;
  href?: string;
  tone?: 'plain' | 'gold' | 'urgent';
}) {
  const inner = (
    <div
      className={`p-card h-full p-4 transition ${
        href ? 'hover:border-[var(--p-gold)]' : ''
      } ${tone === 'urgent' ? 'border-[rgb(248_113_113/40%)]' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 place-items-center rounded-lg text-sm ${
            tone === 'urgent'
              ? 'bg-[rgb(248_113_113/12%)] text-[var(--p-down)]'
              : 'bg-[var(--p-gold-dim)] p-gold'
          }`}
        >
          {icon ?? '●'}
        </span>
        {trend !== undefined && <Trend pct={trend ?? null} />}
      </div>
      <p
        className={`mt-3 font-mono text-2xl font-extrabold leading-none ${
          tone === 'gold' ? 'p-gold' : ''
        }`}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11px] uppercase tracking-wider p-muted">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] p-faint">{sub}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

/** Compact figure for the secondary row — no icon, no trend. */
export function MiniStat({
  label,
  value,
  tone = 'plain',
  href,
}: {
  label: string;
  value: string | number;
  tone?: 'plain' | 'urgent' | 'good';
  href?: string;
}) {
  const colour =
    tone === 'urgent'
      ? 'text-[var(--p-down)]'
      : tone === 'good'
        ? 'text-[var(--p-up)]'
        : 'p-gold';
  const inner = (
    <div
      className={`p-card flex items-center gap-3 px-4 py-3 transition ${
        href ? 'hover:border-[var(--p-gold)]' : ''
      }`}
    >
      <span className={`font-mono text-xl font-extrabold ${colour}`}>{value}</span>
      <span className="text-[11px] uppercase tracking-wider p-muted">{label}</span>
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function Empty({ message }: { message: string }) {
  return (
    <div className="p-card border-dashed p-10 text-center text-sm p-faint">{message}</div>
  );
}

/** Segmented control rendered as links, so it works without JavaScript. */
export function RangeTabs({
  options,
  active,
  hrefFor,
}: {
  options: Array<{ key: string; label: string }>;
  active: string;
  hrefFor: (key: string) => Parameters<typeof Link>[0]['href'];
}) {
  return (
    <div className="flex gap-1 rounded-lg border p-hairline p-0.5">
      {options.map((o) => (
        <Link
          key={o.key}
          href={hrefFor(o.key)}
          aria-current={o.key === active ? 'true' : undefined}
          className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold transition ${
            o.key === active
              ? 'bg-[var(--p-gold)] text-[#0a0a0b]'
              : 'p-muted hover:text-[var(--p-text)]'
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
