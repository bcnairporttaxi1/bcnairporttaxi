import { CardsSkeleton, LoadingRegion, PanelHeaderSkeleton, StatsSkeleton } from '@/components/skeleton';

/**
 * Shown while the panel's queries run.
 *
 * Next streams this immediately, so a slow database no longer leaves the
 * browser sitting on the previous page with nothing happening.
 */
export default function Loading() {
  return (
    <LoadingRegion label="Loading your trips">
      <PanelHeaderSkeleton />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <StatsSkeleton count={3} />
        <div className="mt-8">
          <CardsSkeleton />
        </div>
      </div>
    </LoadingRegion>
  );
}
