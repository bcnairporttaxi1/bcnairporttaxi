import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { TripLive } from '@/components/trip-live';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { resolveTripAccess } from '@/lib/trip-access';

export const metadata: Metadata = {
  title: { absolute: 'Live trip | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function TripPage(props: {
  params: Promise<{ locale: string; reference: string }>;
}) {
  const { locale, reference } = await props.params;
  setRequestLocale(locale);

  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  // Same resolver the APIs use, so the page and the endpoints cannot disagree
  // about who is allowed to see a trip.
  const access = await resolveTripAccess(reference);
  if (!access) notFound();

  const booking = await prisma.booking.findUnique({
    where: { id: access.bookingId },
    include: { driver: true, vehicle: true },
  });
  if (!booking) notFound();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  // Marks the viewer present, which is what decides whether an inbound message
  // also gets mirrored to email.
  await prisma.user.update({
    where: { id: session.userId },
    data: { lastSeenAt: new Date() },
  });

  const when = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(booking.pickupAt);

  const live = booking.status === 'ASSIGNED' || booking.status === 'EN_ROUTE';

  return (
    <PanelShell
      title={`Trip ${booking.reference}`}
      subtitle={when}
      userName={user?.name ?? session.email}
      locale={locale}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StatusPill value={booking.status} />
        {booking.driver && (
          <span className="text-sm text-muted">
            Driver: <strong>{booking.driver.name}</strong> ·{' '}
            <a href={`tel:${booking.driver.phone}`} className="font-semibold text-accent-text">
              {booking.driver.phone}
            </a>
          </span>
        )}
        {booking.vehicle && (
          <span className="text-sm text-muted">Vehicle: {booking.vehicle.name}</span>
        )}
      </div>

      <dl className="mb-8 grid gap-x-8 gap-y-2 rounded-card border border-hairline bg-white p-5 text-sm sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="shrink-0 text-muted">From</dt>
          <dd className="font-medium">{booking.pickupLabel}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 text-muted">To</dt>
          <dd className="font-medium">{booking.dropoffLabel}</dd>
        </div>
      </dl>

      {live ? (
        <TripLive
          reference={booking.reference}
          viewerRole={access.as}
          // Admins observe; only the two parties on the trip broadcast.
          canShareLocation={access.as !== 'ADMIN'}
        />
      ) : (
        <p className="rounded-card border border-hairline bg-white p-10 text-center text-muted">
          Live tracking and chat open once a driver is assigned, and close when the trip is
          completed.
        </p>
      )}

      <div className="mt-8">
        <Link
          href={`/booking/${booking.reference}`}
          className="font-semibold text-accent-text underline underline-offset-4"
        >
          View full booking details
        </Link>
      </div>
    </PanelShell>
  );
}
