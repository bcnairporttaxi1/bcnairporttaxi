/**
 * Where a ride has got to, and when each step happened.
 *
 * The admin panel could already show a status word — ON_BOARD — but a word
 * alone answers "what" without answering "for how long", which is the question
 * that actually matters on a dispatch desk. A driver who has been ARRIVED for
 * two minutes is working; one who has been ARRIVED for twenty-five is a
 * problem, and the status word is identical in both cases.
 *
 * So each step carries its own timestamp, and the live stage carries the time
 * elapsed since it began.
 */

export type RideStage =
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'ON_BOARD'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'PENDING';

export interface RideTimeline {
  status: RideStage;
  /**
   * Assignment has no timestamp of its own: the schema stamps only the four
   * moments a driver presses a button. So this step is derived from whether a
   * driver is attached, and its time column reads "—" rather than borrowing a
   * neighbouring stamp and implying a precision the record does not have.
   */
  hasDriver: boolean;
  enRouteAt: Date | null;
  arrivedAt: Date | null;
  onBoardAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
}

/** The steps a ride passes through, in order, as the driver presses them. */
const STEPS: Array<{ key: string; label: string; at: keyof RideTimeline | null }> = [
  { key: 'ASSIGNED', label: 'Driver assigned', at: null },
  { key: 'EN_ROUTE', label: 'On the way', at: 'enRouteAt' },
  { key: 'ARRIVED', label: 'Waiting at pickup', at: 'arrivedAt' },
  { key: 'ON_BOARD', label: 'Passenger on board', at: 'onBoardAt' },
  { key: 'COMPLETED', label: 'Ride completed', at: 'completedAt' },
];

/** Plain-language description of the live stage, for the dispatch desk. */
export const STAGE_SENTENCE: Record<string, string> = {
  ASSIGNED: 'Driver assigned, not yet moving',
  EN_ROUTE: 'Driver is on the way to the pickup',
  ARRIVED: 'Driver is waiting at the door',
  ON_BOARD: 'Passenger is in the car',
  COMPLETED: 'Ride completed',
  CANCELLED: 'Ride cancelled',
  CONFIRMED: 'Paid, waiting for a driver',
  PENDING: 'Payment not completed',
};

/** "4m", "1h 12m" — short enough to sit in a table cell. */
export function formatMinutes(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export function elapsed(from: Date, now: Date = new Date()): string {
  return formatMinutes((now.getTime() - from.getTime()) / 60_000);
}

/** When the current stage began, so the desk can see how long it has lasted. */
export function stageSince(t: RideTimeline): Date | null {
  switch (t.status) {
    case 'ON_BOARD':
      return t.onBoardAt;
    case 'ARRIVED':
      return t.arrivedAt;
    case 'EN_ROUTE':
      return t.enRouteAt;
    case 'COMPLETED':
      return t.completedAt;
    case 'CANCELLED':
      return t.cancelledAt;
    default:
      return null;
  }
}

function timeOf(d: Date | null, locale: string): string {
  if (!d) return '—';
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(d);
}

export function RideProgress({
  timeline,
  locale,
  now = new Date(),
}: {
  timeline: RideTimeline;
  locale: string;
  now?: Date;
}) {
  if (timeline.status === 'CANCELLED') {
    return (
      <p className="text-sm text-[var(--p-down)]">
        Cancelled{timeline.cancelledAt ? ` at ${timeOf(timeline.cancelledAt, locale)}` : ''}.
      </p>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === timeline.status);

  return (
    <ol className="space-y-0">
      {STEPS.map((step, i) => {
        const at = step.at ? (timeline[step.at] as Date | null) : null;
        // A step counts as done when it has a timestamp. Falling back to index
        // comparison would mark steps complete that a driver skipped — the
        // record should show what happened, not what should have. Assignment
        // is the one exception, having no stamp to check.
        const done = step.at === null ? timeline.hasDriver : at !== null;
        const isNow = i === currentIndex && timeline.status !== 'COMPLETED';

        return (
          <li key={step.key} className="flex items-start gap-3">
            {/* Rail: dot plus the connector down to the next step */}
            <div className="flex shrink-0 flex-col items-center self-stretch">
              <span
                aria-hidden="true"
                className={`p-step-dot mt-1.5 ${
                  isNow ? 'p-step-now' : done ? 'p-step-done' : 'p-step-todo'
                }`}
              />
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="w-px flex-1"
                  style={{
                    minHeight: '1.1rem',
                    background: done ? 'var(--p-gold)' : 'var(--p-line)',
                  }}
                />
              )}
            </div>

            <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3 pb-2">
              <span
                className={`truncate text-sm ${
                  isNow
                    ? 'font-bold text-[var(--p-up)]'
                    : done
                      ? 'text-[var(--p-text)]'
                      : 'p-faint'
                }`}
              >
                {step.label}
                {isNow && at && (
                  <span className="ml-2 font-mono text-xs font-normal p-muted">
                    {elapsed(at, now)} ago
                  </span>
                )}
              </span>
              <span className="shrink-0 font-mono text-xs p-muted">
                {timeOf(at, locale)}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** One-line version for a table cell: the stage, and how long it has run. */
export function StageCell({
  timeline,
  now = new Date(),
}: {
  timeline: RideTimeline;
  now?: Date;
}) {
  const live = ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'].includes(timeline.status);
  const since = stageSince(timeline);

  return (
    <span className="flex items-center gap-2">
      {live && <span aria-hidden="true" className="p-step-dot p-step-now" />}
      <span className="min-w-0">
        <span className={`block truncate text-xs ${live ? 'text-[var(--p-up)]' : 'p-muted'}`}>
          {STAGE_SENTENCE[timeline.status] ?? timeline.status}
        </span>
        {live && since && (
          <span className="block font-mono text-[11px] p-faint">
            {elapsed(since, now)} in this stage
          </span>
        )}
      </span>
    </span>
  );
}
