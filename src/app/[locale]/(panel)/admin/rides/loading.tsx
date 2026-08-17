import { LoadingRegion, PanelHeaderSkeleton, TableSkeleton } from '@/components/skeleton';

/**
 * Shown while the panel's queries run.
 *
 * Next streams this immediately, so a slow database no longer leaves the
 * browser sitting on the previous page with nothing happening.
 */
export default function Loading() {
  return (
    <LoadingRegion label="Loading rides">
      <PanelHeaderSkeleton />
      <div className="px-5 py-6 lg:px-8 lg:py-8">
        <TableSkeleton />
      </div>
    </LoadingRegion>
  );
}
