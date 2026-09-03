import { BLOG_COVERS, type BlogMotif } from '@bcn/core/blog';

/**
 * Blog thumbnails.
 *
 * The posts had none, so the index was a wall of text and every card looked
 * the same. Rather than dress them in stock photography that says nothing
 * about the post — a generic taxi, a generic skyline — each one gets a drawn
 * cover keyed to what it is actually about: a meter readout, a comparison of
 * two routes, a terminal map.
 *
 * They are inline SVG on a token gradient, so they cost no request, need no
 * licence, scale to any card size and follow the theme. Marked aria-hidden
 * because the post title beside them already carries the meaning.
 */
export function BlogCover({
  motif,
  className = '',
}: {
  motif: BlogMotif;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-[radial-gradient(120%_140%_at_20%_0%,#1d1d22_0%,#121216_55%,#0b0b0d_100%)] ${className}`}
    >
      {/* A single warm bloom, off-centre, so the panel is not flat black. */}
      <span className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-[54px]" />
      <svg
        viewBox="0 0 320 180"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`bc-${motif}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0b429" />
            <stop offset="100%" stopColor="#c4901a" />
          </linearGradient>
        </defs>
        {MOTIFS[motif](`url(#bc-${motif})`)}
      </svg>
      {/* Hairline along the bottom edge, matching the card borders. */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

/**
 * One drawing per motif. Each takes the gold gradient reference so the accent
 * is defined once on the wrapper rather than repeated per shape.
 */
const MOTIFS: Record<BlogMotif, (gold: string) => React.ReactNode> = {
  /** Fares: a meter readout mid-count. */
  meter: (gold) => (
    <>
      <rect x="86" y="46" width="148" height="88" rx="14" fill="#0d0d10" stroke="rgb(255 255 255 / 0.09)" />
      <rect x="86" y="46" width="148" height="88" rx="14" fill="none" stroke={gold} strokeOpacity="0.25" />
      <text
        x="160"
        y="98"
        textAnchor="middle"
        fill={gold}
        fontFamily="ui-monospace, monospace"
        fontSize="30"
        fontWeight="700"
        letterSpacing="-1"
      >
        €34.44
      </text>
      <text
        x="160"
        y="117"
        textAnchor="middle"
        fill="rgb(255 255 255 / 0.34)"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2.4"
      >
        T-1 · ALL IN
      </text>
      <circle cx="104" cy="62" r="3" fill="#39d98a" />
    </>
  ),

  /** Taxi against Aerobús: two routes to the same point, one direct. */
  compare: (gold) => (
    <>
      <path
        d="M44 132 C 110 132, 120 60, 190 60 L 268 60"
        fill="none"
        stroke={gold}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 132 L 118 132 L 118 96 L 196 96 L 196 60"
        fill="none"
        stroke="rgb(255 255 255 / 0.22)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="7 8"
      />
      <circle cx="44" cy="132" r="7" fill="#39d98a" />
      <rect x="262" y="54" width="12" height="12" rx="2.5" fill={gold} />
      <circle cx="118" cy="132" r="4" fill="rgb(255 255 255 / 0.3)" />
      <circle cx="196" cy="96" r="4" fill="rgb(255 255 255 / 0.3)" />
    </>
  ),

  /** Terminals: two piers off one spine. */
  terminal: (gold) => (
    <>
      <rect x="40" y="86" width="240" height="8" rx="4" fill="rgb(255 255 255 / 0.12)" />
      <rect x="66" y="50" width="76" height="36" rx="9" fill="#0d0d10" stroke={gold} strokeOpacity="0.5" />
      <rect x="178" y="94" width="76" height="36" rx="9" fill="#0d0d10" stroke="rgb(255 255 255 / 0.16)" />
      <text x="104" y="73" textAnchor="middle" fill={gold} fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="700">
        T1
      </text>
      <text x="216" y="117" textAnchor="middle" fill="rgb(255 255 255 / 0.55)" fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="700">
        T2
      </text>
      <path d="M104 86 L104 94 M216 86 L216 94" stroke="rgb(255 255 255 / 0.2)" strokeWidth="2" />
      <circle cx="40" cy="90" r="5" fill={gold} />
    </>
  ),
};

/** Motif for a slug, falling back so a new post is never coverless. */
export function coverFor(slug: string): BlogMotif {
  return BLOG_COVERS[slug] ?? 'meter';
}
