import { LoadingRegion, PanelHeaderSkeleton, StatsSkeleton, TableSkeleton } from '@/components/skeleton';

/**
 * Shown while the panel's queries run.
 *
 * Next streams this immediately, so a slow database no longer leaves the
 * browser sitting on the previous page with nothing happening.
 */
export default function Loading() {
  return (
    <LoadingRegion label="Loading bookings">
      <PanelHeaderSkeleton />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <StatsSkeleton />
        <div className="mt-8">
          <TableSkeleton />
        </div>
      </div>
    </LoadingRegion>
  );
}
