import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { FleetVehicle } from '@bcn/core/fleet';

function PersonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.8c-3.6 0-8 1.8-8 4.2v2.2h16V18c0-2.4-4.4-4.2-8-4.2Z" />
    </svg>
  );
}

function SuitcaseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1h2.5A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5H9V4Zm1.5 1h3V4h-3v1ZM8 7.5v11h1.6v-11H8Zm6.4 0v11H16v-11h-1.6Z" />
    </svg>
  );
}

/**
 * Fleet card. Capacity is the deciding factor for most bookings, so passengers
 * and luggage are given equal visual weight to the model name.
 *
 * `priority` should be set on the first card only — it is the one likely to be
 * in the initial viewport.
 */
export async function VehicleCard({
  vehicle,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: {
  vehicle: FleetVehicle;
  priority?: boolean;
  sizes?: string;
}) {
  const t = await getTranslations('fleet');
  const tc = await getTranslations('common');

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-white">
      <Image
        src={vehicle.image}
        alt={vehicle.imageAlt}
        width={1200}
        height={800}
        sizes={sizes}
        priority={priority}
        className="aspect-[3/2] w-full bg-ink object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">{vehicle.name}</h3>
        <p className="text-sm text-muted">{t(`categories.${vehicle.categoryKey}`)}</p>

        {/* A dl's div may contain only dt and dd, so the icons live inside the
            dd rather than as siblings. */}
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">{t('passengersLabel')}</dt>
            <dd className="flex items-center gap-1.5 font-mono font-bold">
              <span className="text-accent-text">
                <PersonIcon />
              </span>
              {t('seats', { count: vehicle.seats })}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">{t('luggageLabel')}</dt>
            <dd className="flex items-center gap-1.5 font-mono font-bold">
              <span className="text-accent-text">
                <SuitcaseIcon />
              </span>
              {t('bags', { count: vehicle.bags })}
            </dd>
          </div>
        </dl>

        <p className="mt-3 text-sm leading-relaxed text-muted">{vehicle.luggageNote}</p>

        {/* Pushed to the bottom so every card's CTA lines up regardless of how
            long the luggage note runs. */}
        <Link
          href={{ pathname: '/book', query: { vehicle: vehicle.slug } }}
          className="wave mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 pt-3 font-display text-sm font-bold text-porcelain transition hover:bg-accent hover:text-ink"
        >
          {tc('book')}
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="m7.5 4 6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
          </svg>
          <span className="sr-only">— {vehicle.name}</span>
        </Link>
      </div>
    </article>
  );
}
