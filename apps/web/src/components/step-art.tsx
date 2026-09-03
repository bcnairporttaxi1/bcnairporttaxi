/**
 * Artwork for the three booking steps.
 *
 * The section was three numbered paragraphs, which is the least memorable
 * shape a "how it works" can take. Each step now leads with a drawing of the
 * thing it describes — a route being measured, a car being held, a driver
 * waiting — so the sequence can be understood without reading it.
 *
 * Inline SVG on the page's own tokens: no request, no licence, sharp at any
 * size, and it follows the theme. Server-rendered; the motion around it lives
 * in the parent.
 */
export function StepArt({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.1rem] border border-line bg-[radial-gradient(120%_140%_at_30%_0%,#191920_0%,#101014_60%,#0a0a0c_100%)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-gold/15 blur-[46px]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 200"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`sa-${step}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0b429" />
            <stop offset="100%" stopColor="#c4901a" />
          </linearGradient>
        </defs>
        {ART[step](`url(#sa-${step})`)}
      </svg>
    </div>
  );
}

const HAIRLINE = 'rgb(255 255 255 / 0.14)';
const FAINT = 'rgb(255 255 255 / 0.32)';

const ART: Record<1 | 2 | 3, (gold: string) => React.ReactNode> = {
  /** Measuring the route: two ends, a road between them, a price attached. */
  1: (gold) => (
    <>
      <path
        d="M52 150 C 96 150, 104 92, 150 92 S 214 62, 262 62"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <circle cx="52" cy="150" r="7" fill="#39d98a" />
      <circle cx="52" cy="150" r="13" fill="none" stroke="#39d98a" strokeOpacity="0.3" />
      <rect x="256" y="56" width="12" height="12" rx="2.5" fill={gold} />
      <rect
        x="112"
        y="26"
        width="112"
        height="40"
        rx="11"
        fill="#0c0c0f"
        stroke={gold}
        strokeOpacity="0.42"
      />
      <text
        x="168"
        y="52"
        textAnchor="middle"
        fill={gold}
        fontFamily="ui-monospace, monospace"
        fontSize="19"
        fontWeight="700"
      >
        €34.44
      </text>
      <text
        x="52"
        y="176"
        textAnchor="middle"
        fill={FAINT}
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="1.6"
      >
        FROM
      </text>
      <text
        x="262"
        y="88"
        textAnchor="middle"
        fill={FAINT}
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="1.6"
      >
        TO
      </text>
    </>
  ),

  /** Holding the car: a vehicle card, paid, with a confirmation tick. */
  2: (gold) => (
    <>
      <rect x="46" y="46" width="228" height="108" rx="16" fill="#0c0c0f" stroke={HAIRLINE} />
      <rect x="46" y="46" width="228" height="30" rx="16" fill="rgb(255 255 255 / 0.03)" />
      <circle cx="64" cy="61" r="3.5" fill={gold} />
      <circle cx="76" cy="61" r="3.5" fill="rgb(255 255 255 / 0.16)" />
      {/* Car, simplified to a silhouette so it reads at card size. */}
      <path
        d="M78 122 L86 100 C88 95, 92 92, 98 92 L182 92 C188 92, 193 95, 196 100 L208 122 Z"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M70 122 H216" stroke={gold} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="98" cy="128" r="7" fill="#0c0c0f" stroke={gold} strokeWidth="2.5" />
      <circle cx="188" cy="128" r="7" fill="#0c0c0f" stroke={gold} strokeWidth="2.5" />
      <circle cx="238" cy="118" r="19" fill="#0c0c0f" stroke="#39d98a" strokeWidth="2" />
      <path
        d="M230 118 L236 124 L247 112"
        fill="none"
        stroke="#39d98a"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  /** Waiting for you: a name board at arrivals. */
  3: (gold) => (
    <>
      <rect x="86" y="34" width="148" height="80" rx="12" fill="#0c0c0f" stroke={gold} strokeOpacity="0.42" />
      <rect x="104" y="56" width="76" height="8" rx="4" fill={gold} fillOpacity="0.85" />
      <rect x="104" y="74" width="52" height="8" rx="4" fill="rgb(255 255 255 / 0.22)" />
      <path d="M160 114 L160 132" stroke={HAIRLINE} strokeWidth="3" strokeLinecap="round" />
      {/* Driver: shoulders and head, no face — a figure, not a portrait. */}
      <circle cx="160" cy="146" r="11" fill="none" stroke={gold} strokeWidth="2.5" />
      <path
        d="M136 178 C136 164, 147 158, 160 158 C173 158, 184 164, 184 178"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="256" cy="46" r="4" fill="#39d98a" />
      <text
        x="256"
        y="68"
        textAnchor="middle"
        fill={FAINT}
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="1.4"
      >
        LIVE
      </text>
    </>
  ),
};
