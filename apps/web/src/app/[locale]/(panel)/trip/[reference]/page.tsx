import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { TripLive } from '@/components/trip-live';
import { RateForm, ReportForm } from '@/components/trip-feedback';
import { rateMyDriver, reportMyDriver } from '@/app/[locale]/(panel)/account/actions';
import { ratePassenger, reportPassenger } from '@/app/[locale]/(panel)/driver/actions';
import { ACTIVE_STATUSES } from '@bcn/core/rides';
import { prisma } from '@/lib/db';
import { dateIn, eurIn } from '@bcn/core/format';
import { getSession } from '@/lib/auth';
import { resolveTripAccess } from '@/lib/trip-access';
import { TIP_PRESETS, confirmTip } from '@/lib/payments/tip';
import { TipForm } from '@/components/tip-form';
import { tipDriver } from './actions';
import { cookies } from 'next/headers';
import { tripCookieName, verifyTripToken } from '@/lib/trip-token';

export const metadata: Metadata = {
  title: { absolute: 'Live trip | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function TripPage(props: {
  params: Promise<{ locale: string; reference: string }>;
  searchParams: Promise<{ k?: string; tip?: string }>;
}) {
  const { locale, reference } = await props.params;
  setRequestLocale(locale);

  const session = await getSession();
  if (!session) {
    // A guest with a signed link: hand it to the route that sets the trip
    // cookie, which sends them straight back here without the key in the
    // URL. Anyone else goes to the booking finder, not a login page for an
    // account they never made.
    const { k } = await props.searchParams;
    if (k && verifyTripToken(reference, k)) {
      redirect(`/api/trips/${reference}/access?k=${k}&locale=${locale}`);
    }
    const jar = await cookies();
    if (!verifyTripToken(reference, jar.get(tripCookieName(reference))?.value)) {
      redirect(`/${locale}/find-booking`);
    }
  }

  // Same resolver the APIs use, so the page and the endpoints cannot disagree
  // about who is allowed to see a trip.
  const access = await resolveTripAccess(reference);
  if (!access) notFound();

  // Back from SumUp after tipping. Settled here, against SumUp's own answer,
  // for the same reason the fare is: a return URL is a hint, not a receipt.
  const { tip } = await props.searchParams;
  const tipOutcome = tip === 'done' ? await confirmTip(reference) : null;
  const tt = await getTranslations('tip');

  // These three do not depend on each other, so they go together rather than
  // three round trips deep. The update marks the viewer present, which is what
  // decides whether an inbound message also gets mirrored to email.
  const [booking, user] = await Promise.all([
    prisma.booking.findUnique({
      where: { id: access.bookingId },
      include: { driver: true, vehicle: true },
    }),
    // A guest has no user row: nothing to look up, nothing to stamp.
    session
      ? prisma.user.findUnique({ where: { id: session.userId }, select: { name: true } })
      : Promise.resolve(null),
    session
      ? prisma.user.update({ where: { id: session.userId }, data: { lastSeenAt: new Date() } })
      : Promise.resolve(null),
  ]);
  if (!booking) notFound();

  const when = dateIn(locale, 'full')(booking.pickupAt);

  // Tracking and chat run from the moment a driver is attached until the ride
  // is closed out, which now spans four states rather than one.
  const live =
    booking.status === 'ASSIGNED' || ACTIVE_STATUSES.includes(booking.status);
  const finished = booking.status === 'COMPLETED';

  const existingRating = finished
    ? await prisma.review.findUnique({
        where: {
          bookingId_direction: {
            bookingId: booking.id,
            direction: access.as === 'DRIVER' ? 'DRIVER_TO_USER' : 'USER_TO_DRIVER',
          },
        },
        select: { rating: true, text: true },
      })
    : null;

  return (
    <PanelShell
      title={`Trip ${booking.reference}`}
      subtitle={when}
      userName={user?.name ?? session?.email ?? booking.contactName}
      locale={locale}
      guest={!session}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StatusPill value={booking.status} />
      </div>

      {/* Who is picking you up, and how to recognise the car. */}
      {booking.driver && access.as !== 'DRIVER' && (
        <section className="mb-8 rounded-card border-2 border-[var(--p-gold)]/40 bg-[var(--p-gold-dim)] p-5">
          <h2 className="font-display text-lg font-extrabold">Your driver</h2>
          <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">Name</dt>
              <dd className="font-medium">{booking.driver.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">Phone</dt>
              <dd>
                <a
                  href={`tel:${booking.driver.phone}`}
                  className="font-semibold p-gold"
                >
                  {booking.driver.phone}
                </a>
                {booking.driver.whatsapp && (
                  <>
                    {' · '}
                    <a
                      href={`https://wa.me/${booking.driver.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold p-gold"
                    >
                      WhatsApp
                    </a>
                  </>
                )}
              </dd>
            </div>
            {booking.driver.plate && (
              <div className="flex gap-2">
                <dt className="shrink-0 p-muted">Number plate</dt>
                <dd className="font-mono text-base font-extrabold">
                  {booking.driver.plate}
                </dd>
              </div>
            )}
            {booking.vehicle && (
              <div className="flex gap-2">
                <dt className="shrink-0 p-muted">Vehicle</dt>
                <dd className="font-medium">{booking.vehicle.name}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {/* The reverse view: who the driver is collecting. */}
      {access.as === 'DRIVER' && (
        <section className="mb-8 rounded-card border-2 border-[var(--p-gold)]/40 bg-[var(--p-gold-dim)] p-5">
          <h2 className="font-display text-lg font-extrabold">Your passenger</h2>
          <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">Name</dt>
              <dd className="font-medium">{booking.contactName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">Phone</dt>
              <dd>
                <a
                  href={`tel:${booking.contactPhone}`}
                  className="font-semibold p-gold"
                >
                  {booking.contactPhone}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">People / bags</dt>
              <dd>
                {booking.passengers} / {booking.luggage}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">Payment</dt>
              <dd className="font-bold">
                {booking.paymentMode === 'FULL_PREPAID'
                  ? 'Prepaid — collect nothing'
                  : 'Collect the meter in the car'}
              </dd>
            </div>
          </dl>
        </section>
      )}

      <dl className="mb-8 grid gap-x-8 gap-y-2 p-card p-5 text-sm sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="shrink-0 p-muted">From</dt>
          <dd className="font-medium">{booking.pickupLabel}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 p-muted">To</dt>
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
        <p className="p-card p-10 text-center p-muted">
          Live tracking and chat open once a driver is assigned, and close when the trip is
          completed.
        </p>
      )}

      {/* Both sides rate each other once the ride is closed out. */}
      {/* Tipping belongs here and nowhere earlier. The fare was quoted and
          paid before the journey as one all-inclusive figure, and the promise
          that nothing further is owed is what the site sells; an offer to pay
          more at checkout would contradict it. Once the ride is done the
          passenger has met the driver, and the offer contradicts nothing. */}
      {finished && access.as === 'USER' && (
        <section className="mt-10">
          {booking.tipPaidAt ? (
            <p className="p-card p-5 text-sm">
              <span className="font-display text-base font-extrabold p-gold">
                {tt('thanksTitle')}
              </span>
              <span className="mt-1 block p-muted">
                {tt('thanksBody', {
                  amount: eurIn(locale)(Number(booking.tipAmount ?? 0)),
                  name: booking.driver?.name ?? tt('yourDriver'),
                })}
              </span>
            </p>
          ) : (
            <TipForm
              reference={booking.reference}
              presets={TIP_PRESETS}
              action={tipDriver}
              driverName={booking.driver?.name ?? tt('yourDriver')}
            />
          )}
          {tipOutcome === 'pending' && (
            <p className="mt-3 text-sm p-muted">{tt('pending')}</p>
          )}
        </section>
      )}

      {finished && access.as !== 'ADMIN' && (
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <RateForm
            bookingId={booking.id}
            locale={locale}
            action={access.as === 'DRIVER' ? ratePassenger : rateMyDriver}
            who={
              access.as === 'DRIVER'
                ? booking.contactName
                : (booking.driver?.name ?? 'your driver')
            }
            existing={existingRating}
          />
          <div className="self-start p-card p-5">
            <h3 className="font-display text-lg font-extrabold">Something wrong?</h3>
            <p className="mt-1 mb-4 text-sm p-muted">
              Ratings are for the everyday. Anything serious should be reported so we can
              act on it.
            </p>
            <ReportForm
              bookingId={booking.id}
              locale={locale}
              action={access.as === 'DRIVER' ? reportPassenger : reportMyDriver}
              who={
                access.as === 'DRIVER'
                  ? booking.contactName
                  : (booking.driver?.name ?? 'the driver')
              }
              reasons={
                access.as === 'DRIVER'
                  ? [
                      'Passenger did not show up',
                      'Abusive or unsafe behaviour',
                      'Refused to pay',
                      'Damage to the vehicle',
                      'Something else',
                    ]
                  : [
                      'Driver did not arrive',
                      'Unsafe driving',
                      'Rude or unprofessional',
                      'Overcharged or meter not used',
                      'Vehicle was not as booked',
                      'Something else',
                    ]
              }
            />
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link
          href={`/booking/${booking.reference}`}
          className="font-semibold p-gold underline underline-offset-4"
        >
          View full booking details
        </Link>
      </div>
    </PanelShell>
  );
}
