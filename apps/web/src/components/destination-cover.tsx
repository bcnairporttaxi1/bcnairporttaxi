import type { DestinationMotif } from '@bcn/core/destination-photos';

/**
 * Cover for a destination that has no licensed photograph.
 *
 * Eleven of the thirty-three destinations have one. The rest opened straight
 * on a badge, so the grid read as half-finished rather than as two kinds of
 * card. This fills the gap without inventing attribution for a photo we do not
 * hold rights to.
 *
 * It carries information rather than decoration: the distance and the drive
 * time, which is what someone scanning a destination list actually wants, over
 * a horizon drawn for the kind of place it is. Inline SVG on the theme's own
 * tokens — no request, no licence, sharp at any size.
 */
export function DestinationCover({
  motif,
  km,
  minutes,
  className = '',
  labels,
}: {
  motif: DestinationMotif;
  km?: number | null;
  minutes?: number | null;
  className?: string;
  labels?: { km: string; min: string };
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[radial-gradient(120%_150%_at_25%_0%,#1c1c22_0%,#111115_55%,#0a0a0c_100%)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-12 h-44 w-44 rounded-full bg-gold/[0.18] blur-[58px]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 320 200"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`dc-${motif}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0b429" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c4901a" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {HORIZON[motif](`url(#dc-${motif})`)}
      </svg>

      {/* The figures sit above the drawing, bottom-left, where a caption goes. */}
      {(km != null || minutes != null) && (
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-5 p-4">
          {km != null && (
            <span className="font-mono text-[13px] tabular-nums text-ice">
              {km}
              <span className="ml-1 text-[10px] uppercase tracking-[0.14em] text-ghost">
                {labels?.km ?? 'km'}
              </span>
            </span>
          )}
          {minutes != null && (
            <span className="font-mono text-[13px] tabular-nums text-ice">
              {minutes}
              <span className="ml-1 text-[10px] uppercase tracking-[0.14em] text-ghost">
                {labels?.min ?? 'min'}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

const FAINT = 'rgb(255 255 255 / 0.10)';

/**
 * A horizon per kind of destination. Drawn to the bottom of the frame so the
 * shapes read as landscape rather than as floating icons, and kept low-contrast
 * so the distance figures on top stay the loudest thing on the card.
 */
const HORIZON: Record<DestinationMotif, (gold: string) => React.ReactNode> = {
  /** Coast: a headland and the sea beyond it. */
  coast: (gold) => (
    <>
      <path d="M0 148 C 44 138, 78 120, 118 124 C 158 128, 186 146, 232 140 C 268 136, 296 126, 320 130 L320 200 L0 200 Z" fill={gold} opacity="0.16" />
      <path d="M0 148 C 44 138, 78 120, 118 124 C 158 128, 186 146, 232 140 C 268 136, 296 126, 320 130" fill="none" stroke={gold} strokeWidth="1.6" />
      <path d="M28 170 H92 M118 178 H176 M206 168 H262" stroke={FAINT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="252" cy="58" r="15" fill="none" stroke={gold} strokeWidth="1.4" opacity="0.7" />
    </>
  ),

  /** Parks and the south: a low coast with a big wheel on it. */
  parks: (gold) => (
    <>
      <path d="M0 156 L 78 156 L 108 132 L 150 156 L 320 156 L320 200 L0 200 Z" fill={gold} opacity="0.14" />
      <path d="M0 156 L 78 156 L 108 132 L 150 156 L 320 156" fill="none" stroke={gold} strokeWidth="1.6" />
      <circle cx="238" cy="112" r="30" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.75" />
      <circle cx="238" cy="112" r="4" fill={gold} opacity="0.75" />
      <path d="M238 82 V142 M208 112 H268 M217 91 L259 133 M259 91 L217 133" stroke={gold} strokeWidth="1" opacity="0.45" />
      <path d="M228 142 L238 156 L248 142" fill="none" stroke={gold} strokeWidth="1.4" opacity="0.6" />
    </>
  ),

  /** Mountains: peaks with a snow line. */
  mountains: (gold) => (
    <>
      <path d="M0 168 L 62 104 L 104 142 L 156 74 L 214 142 L 258 112 L 320 168 L320 200 L0 200 Z" fill={gold} opacity="0.15" />
      <path d="M0 168 L 62 104 L 104 142 L 156 74 L 214 142 L 258 112 L 320 168" fill="none" stroke={gold} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M143 88 L156 74 L169 88 L161 92 L152 86 Z" fill={gold} opacity="0.55" />
      <path d="M52 116 L62 104 L72 116 L65 119 L58 114 Z" fill={gold} opacity="0.4" />
    </>
  ),

  /** Long distance: one long arc, and a lot of ground under it. */
  distance: (gold) => (
    <>
      <path d="M0 178 H320 L320 200 L0 200 Z" fill={gold} opacity="0.12" />
      <path d="M0 178 H320" stroke={gold} strokeWidth="1.4" opacity="0.5" />
      <path d="M22 168 C 96 60, 226 60, 300 168" fill="none" stroke={gold} strokeWidth="1.8" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="22" cy="168" r="6" fill="#39d98a" />
      <rect x="294" y="162" width="12" height="12" rx="2.5" fill={gold} />
    </>
  ),
};
