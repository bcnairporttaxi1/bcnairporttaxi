import { getTranslations } from 'next-intl/server';
import { Rise } from '@/components/motion';

/**
 * How booking works, told as one journey rather than three tiles.
 *
 * The three steps are moments on a single route — a price is measured along
 * it, a car is held and drives it, a driver waits at its end — so the
 * section draws that route once and lets the three happen on it in order.
 * The list on the left is the same sequence in words; each marker lights as
 * its moment plays on the stage.
 *
 * Everything moves in CSS (globals.css, `.journey`). The stage is server
 * rendered in its finished state, the animation plays once when the section
 * scrolls in, and reduced-motion readers get the finished scene directly.
 * No library, no JavaScript beyond the viewport trigger the rest of the site
 * already uses.
 */
export async function BookingJourney() {
  const t = await getTranslations('home');
  const tw = await getTranslations('howItWorks');
  const steps = ['one', 'two', 'three'] as const;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
      {/* Three grid children rather than two columns, so that on a phone the
          stage sits between the heading and the list — where it is on screen
          when the sequence starts — and on a wide screen it spans both rows
          beside them. */}
      <Rise className="journey grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-8">
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {t('sections.howTitle')}
            <span className="editorial text-[1.08em]">{t('sections.howLede')}</span>
          </h2>
          <p className="mt-3 max-w-md text-dim">{t('sections.howIntro')}</p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Stage />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ol className="journey-steps">
            {steps.map((step, i) => (
              <li key={step} className="journey-step" style={{ '--i': i } as React.CSSProperties}>
                <span className="journey-num font-display" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-ice">
                    {tw(`steps.${step}.title`)}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-dim">
                    {tw(`steps.${step}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Rise>
    </section>
  );
}

/** The route, measured, driven and met. Pure SVG; the motion is in the stylesheet. */
function Stage() {
  const route = 'M84 300 C 180 300, 200 170, 320 170 S 470 96, 556 96';
  return (
    <div className="journey-stage relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] border border-line bg-[radial-gradient(120%_140%_at_30%_0%,#191920_0%,#101014_60%,#0a0a0c_100%)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-[70px]"
      />
      <svg aria-hidden="true" viewBox="0 0 640 400" className="relative h-full w-full">
        <defs>
          <linearGradient id="j-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0b429" />
            <stop offset="100%" stopColor="#c4901a" />
          </linearGradient>
        </defs>

        {/* Faint ground grid — the map under the route. */}
        <g stroke="rgb(255 255 255 / 0.045)" strokeWidth="1">
          {[80, 160, 240, 320].map((y) => (
            <line key={y} x1="0" y1={y} x2="640" y2={y} />
          ))}
          {[128, 256, 384, 512].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="400" />
          ))}
        </g>

        {/* 1 · The route is measured: a faint line is drawn, the dots settle on it. */}
        <path
          d={route}
          className="j-draw"
          pathLength={1}
          fill="none"
          stroke="rgb(255 255 255 / 0.16)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d={route}
          className="j-dots"
          fill="none"
          stroke="url(#j-gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 8"
        />

        {/* Pins. FROM is where the passenger is; TO is the airport, or the reverse. */}
        <g className="j-pin j-pin-from">
          <circle cx="84" cy="300" r="20" fill="none" stroke="#39d98a" strokeOpacity="0.25" className="j-ring" />
          <circle cx="84" cy="300" r="8" fill="#39d98a" />
          <text x="84" y="336" textAnchor="middle" fill="rgb(255 255 255 / 0.4)" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="1.8">
            FROM
          </text>
        </g>
        <g className="j-pin j-pin-to">
          <rect x="548" y="88" width="16" height="16" rx="3.5" fill="url(#j-gold)" />
          <text x="556" y="132" textAnchor="middle" fill="rgb(255 255 255 / 0.4)" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="1.8">
            TO
          </text>
        </g>

        {/* The price, attached to the measured route. */}
        <g className="j-price">
          <rect x="248" y="62" width="150" height="50" rx="13" fill="#0c0c0f" stroke="url(#j-gold)" strokeOpacity="0.5" />
          <text x="323" y="95" textAnchor="middle" fill="#f0b429" fontFamily="ui-monospace, monospace" fontSize="24" fontWeight="700">
            €34.44
          </text>
        </g>

        {/* 2 · The car is held and drives the route. Drawn nose-right at the origin;
            offset-path carries it along the same geometry as the line. */}
        <g className="j-car" style={{ offsetPath: `path('${route}')` }}>
          <rect x="-26" y="-11" width="52" height="22" rx="7" fill="#0c0c0f" stroke="url(#j-gold)" strokeWidth="2.5" />
          <rect x="-12" y="-11" width="20" height="9" rx="3" fill="url(#j-gold)" />
          <circle cx="-14" cy="12" r="5" fill="#0c0c0f" stroke="url(#j-gold)" strokeWidth="2.5" />
          <circle cx="14" cy="12" r="5" fill="#0c0c0f" stroke="url(#j-gold)" strokeWidth="2.5" />
          <g className="j-tick">
            <circle cx="24" cy="-22" r="11" fill="#0c0c0f" stroke="#39d98a" strokeWidth="2" />
            <path d="M19 -22 L23 -18 L30 -26" fill="none" stroke="#39d98a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* 3 · The driver waits at the end with a name board. */}
        <g className="j-driver">
          <rect x="418" y="196" width="150" height="76" rx="12" fill="#0c0c0f" stroke="url(#j-gold)" strokeOpacity="0.5" />
          <rect x="436" y="216" width="80" height="9" rx="4.5" fill="#f0b429" fillOpacity="0.9" />
          <rect x="436" y="236" width="54" height="9" rx="4.5" fill="rgb(255 255 255 / 0.22)" />
          <path d="M493 272 L493 292" stroke="rgb(255 255 255 / 0.14)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="493" cy="308" r="12" fill="none" stroke="url(#j-gold)" strokeWidth="2.5" />
          <path d="M466 344 C466 328, 479 322, 493 322 C507 322, 520 328, 520 344" fill="none" stroke="url(#j-gold)" strokeWidth="2.5" strokeLinecap="round" />
          <g className="j-live">
            <circle cx="552" cy="210" r="4" fill="#39d98a" className="j-live-dot" />
            <circle cx="552" cy="210" r="4" fill="none" stroke="#39d98a" className="j-live-ring" />
          </g>
          <text x="552" y="232" textAnchor="middle" fill="rgb(255 255 255 / 0.4)" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.6">
            LIVE
          </text>
        </g>
      </svg>
    </div>
  );
}
