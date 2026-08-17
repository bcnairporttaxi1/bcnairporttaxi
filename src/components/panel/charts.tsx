/**
 * Dashboard charts, drawn as server-rendered SVG.
 *
 * No charting library. Every figure on this dashboard is already computed on
 * the server, so shipping a rendering library to the client would mean sending
 * the data twice and paying for a hydration pass to draw something that never
 * changes until the next request. These are plain elements: they appear with
 * the first byte of HTML and cost nothing on the main thread.
 *
 * Everything scales to its container with `preserveAspectRatio`, so no
 * measurement pass and no layout shift.
 */

const GOLD = '#c9a227';
const GOLD_BRIGHT = '#e3bf4a';
const LINE = '#26262b';
const MUTED = '#8b8b95';

export interface Point {
  label: string;
  value: number;
}

/** Catmull-Rom through the points, converted to a cubic Bézier path. */
function smoothPath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length < 2) return '';
  const d = [`M ${pts[0].x} ${pts[0].y}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    // Tension of 6 keeps the curve close to the data — a smoother line would
    // invent peaks between points that never happened.
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`);
  }
  return d.join(' ');
}

export function AreaChart({
  data,
  height = 220,
  format = (n: number) => String(n),
  label,
}: {
  data: Point[];
  height?: number;
  format?: (n: number) => string;
  label: string;
}) {
  if (data.length === 0) {
    return <EmptyChart height={height} message="No data for this period yet." />;
  }

  const W = 800;
  const H = height;
  const padL = 52;
  const padR = 12;
  const padT = 14;
  const padB = 26;

  const max = Math.max(...data.map((d) => d.value), 1);
  // Round the ceiling up to something a person would choose as an axis top.
  const step = Math.pow(10, Math.floor(Math.log10(max))) / 2 || 1;
  const top = Math.ceil(max / step) * step;

  const x = (i: number) =>
    padL + (i * (W - padL - padR)) / Math.max(1, data.length - 1);
  const y = (v: number) => padT + (1 - v / top) * (H - padT - padB);

  const pts = data.map((d, i) => ({ x: x(i), y: y(d.value) }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x} ${H - padB} L ${pts[0].x} ${H - padB} Z`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => top * f);
  // Roughly eight labels, whatever the range — more turns the axis to mush.
  const every = Math.max(1, Math.ceil(data.length / 8));

  return (
    <figure className="m-0">
      <figcaption className="sr-only">{label}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-[220px] w-full"
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={LINE} strokeWidth="1" />
            <text
              x={padL - 8}
              y={y(t) + 3}
              textAnchor="end"
              fontSize="10"
              fill={MUTED}
              fontFamily="monospace"
            >
              {format(t)}
            </text>
          </g>
        ))}

        <path d={area} fill="url(#areaFill)" />
        <path d={line} fill="none" stroke={GOLD_BRIGHT} strokeWidth="2" strokeLinecap="round" />

        {data.map((d, i) =>
          i % every === 0 || i === data.length - 1 ? (
            <text
              key={d.label + i}
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              fontSize="10"
              fill={MUTED}
              fontFamily="monospace"
            >
              {d.label}
            </text>
          ) : null,
        )}
      </svg>
    </figure>
  );
}

export function BarChart({
  data,
  height = 180,
  label,
}: {
  data: Point[];
  height?: number;
  label: string;
}) {
  if (data.length === 0) {
    return <EmptyChart height={height} message="Nothing recorded yet." />;
  }

  const W = 800;
  const H = height;
  const padL = 34;
  const padB = 24;
  const padT = 10;
  const max = Math.max(...data.map((d) => d.value), 1);
  const slot = (W - padL) / data.length;
  const barW = Math.min(slot * 0.62, 44);
  const every = Math.max(1, Math.ceil(data.length / 10));

  return (
    <figure className="m-0">
      <figcaption className="sr-only">{label}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        role="img"
        aria-label={label}
      >
        {[0, 0.5, 1].map((f) => {
          const yy = padT + (1 - f) * (H - padT - padB);
          return (
            <g key={f}>
              <line x1={padL} x2={W} y1={yy} y2={yy} stroke={LINE} strokeWidth="1" />
              <text
                x={padL - 6}
                y={yy + 3}
                textAnchor="end"
                fontSize="10"
                fill={MUTED}
                fontFamily="monospace"
              >
                {Math.round(max * f)}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const h = (d.value / max) * (H - padT - padB);
          const cx = padL + i * slot + slot / 2;
          return (
            <g key={d.label + i}>
              <rect
                x={cx - barW / 2}
                y={H - padB - h}
                width={barW}
                height={Math.max(h, d.value > 0 ? 2 : 0)}
                rx="3"
                fill={GOLD}
                opacity={d.value > 0 ? 0.85 : 0.2}
              />
              {(i % every === 0 || i === data.length - 1) && (
                <text
                  x={cx}
                  y={H - 7}
                  textAnchor="middle"
                  fontSize="10"
                  fill={MUTED}
                  fontFamily="monospace"
                >
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function DonutChart({
  data,
  total,
  centreLabel,
  label,
}: {
  data: Array<{ label: string; value: number; colour: string }>;
  total: number;
  centreLabel: string;
  label: string;
}) {
  const size = 180;
  const r = 66;
  const stroke = 22;
  const c = 2 * Math.PI * r;

  const sum = data.reduce((n, d) => n + d.value, 0);
  let offset = 0;

  return (
    <figure className="m-0 flex flex-col items-center">
      <figcaption className="sr-only">{label}</figcaption>
      <div className="relative">
        <svg width={size} height={size} role="img" aria-label={label}>
          <g transform={`translate(${size / 2} ${size / 2}) rotate(-90)`}>
            <circle r={r} fill="none" stroke={LINE} strokeWidth={stroke} />
            {sum > 0 &&
              data.map((d) => {
                const frac = d.value / sum;
                const dash = frac * c;
                const el = (
                  <circle
                    key={d.label}
                    r={r}
                    fill="none"
                    stroke={d.colour}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${c - dash}`}
                    strokeDashoffset={-offset}
                  />
                );
                offset += dash;
                return el;
              })}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-extrabold">{centreLabel}</span>
          <span className="text-[10px] uppercase tracking-wider p-faint">{total} total</span>
        </div>
      </div>
    </figure>
  );
}

/** Horizontal bar for a labelled count — booking status, service mix. */
export function MeterRow({
  label,
  value,
  max,
  colour = GOLD,
}: {
  label: string;
  value: number;
  max: number;
  colour?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[11px] uppercase tracking-wider p-muted">{label}</span>
        <span className="font-mono text-sm font-bold">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: colour }}
        />
      </div>
    </div>
  );
}

function EmptyChart({ height, message }: { height: number; message: string }) {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center rounded-lg border border-dashed p-hairline text-sm p-faint"
    >
      {message}
    </div>
  );
}
