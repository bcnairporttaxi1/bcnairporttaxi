/**
 * A realistic development dataset for the panels.
 *
 * The panels cannot be seen without a database, and the one seed the repo had
 * created only the fleet. Anyone who wanted to look at the admin, driver or
 * account screens had to either point at production or invent rows by hand.
 *
 * This creates the whole cast: an admin, two drivers with cars, three
 * customers, and bookings in every state the ride lifecycle has — pending,
 * confirmed, assigned, on the way, waiting at the door, on board, completed,
 * cancelled — spread across the past week and the next, with payouts,
 * withdrawals, reviews in both directions, a report and a message thread.
 * Money on each booking is the real engine's answer for that route, not a
 * typed-in figure.
 *
 * Idempotent: it clears its own rows and rebuilds them, so it can be re-run
 * after a schema change. Refuses to run against anything but localhost.
 *
 *   DATABASE_URL=postgres://...localhost... npx tsx scripts/seed-dev.ts
 *
 * Sign in afterwards as admin@local.test / driver@local.test / ana@local.test,
 * all with the password `password123`.
 */
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';
import { FLEET } from '@bcn/core/fleet';
import { calculateQuote } from '@bcn/core/pricing';
import { LANDMARKS } from '@bcn/core/tariffs';

const url = process.env.DATABASE_URL ?? '';
if (!/localhost|127\.0\.0\.1/.test(url)) {
  console.error('seed-dev only runs against a localhost database. Refusing.');
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 1 }) });

const PASSWORD = 'password123';

const AIRPORT = { lat: LANDMARKS.elPratAirport.lat, lng: LANDMARKS.elPratAirport.lng };
const PLACES = {
  eixample: { label: 'Passeig de Gràcia 92, Eixample', lat: 41.3954, lng: 2.1618, km: 15.1 },
  gothic: { label: 'Hotel Neri, Carrer de Sant Sever 5', lat: 41.3831, lng: 2.1763, km: 14.6 },
  sants: { label: 'Estació de Sants', lat: 41.3792, lng: 2.14, km: 12.2 },
  arts: { label: 'Hotel Arts, Carrer de la Marina 19', lat: 41.3874, lng: 2.1963, km: 17.4 },
  sitges: { label: 'Hotel Terramar, Sitges', lat: 41.2306, lng: 1.8039, km: 32.8 },
  girona: { label: 'Girona Airport, Vilobí d’Onyar', lat: 41.901, lng: 2.7606, km: 97.0 },
};

const hours = (n: number) => new Date(Date.now() + n * 3600_000);
const days = (n: number) => hours(n * 24);
const ref = (n: number) => `BCN-DEV${String(n).padStart(2, '0')}`;

async function main() {
  console.log('Clearing dev rows…');
  await prisma.$transaction([
    prisma.locationPing.deleteMany(),
    prisma.message.deleteMany(),
    prisma.review.deleteMany(),
    prisma.report.deleteMany(),
    prisma.withdrawal.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.driver.deleteMany(),
    prisma.user.deleteMany({ where: { email: { endsWith: '@local.test' } } }),
  ]);

  const passwordHash = await bcrypt.hash(PASSWORD, 12);

  // ── Fleet ─────────────────────────────────────────────────────────────
  const vehicles = await Promise.all(
    FLEET.map((v, i) =>
      prisma.vehicle.upsert({
        where: { slug: v.slug },
        create: {
          slug: v.slug,
          name: v.name,
          category: v.categoryKey,
          seats: v.seats,
          bags: v.bags,
          imageUrl: v.image,
          imageAlt: v.imageAlt,
          sortOrder: i,
        },
        update: { name: v.name, seats: v.seats, bags: v.bags, imageUrl: v.image },
      }),
    ),
  );
  const car = (slug: string) => vehicles.find((v) => v.slug === slug)!;

  // ── People ────────────────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: { email: 'admin@local.test', name: 'Núria Ops', passwordHash, role: 'ADMIN', locale: 'es' },
  });

  const driverUsers = await Promise.all([
    prisma.user.create({ data: { email: 'driver@local.test', name: 'Jordi Puig', phone: '+34611222333', passwordHash, role: 'DRIVER', locale: 'ca' } }),
    prisma.user.create({ data: { email: 'driver2@local.test', name: 'Amira Haddad', phone: '+34622333444', passwordHash, role: 'DRIVER', locale: 'es' } }),
  ]);

  const [jordi, amira] = await Promise.all([
    prisma.driver.create({
      data: {
        userId: driverUsers[0].id, name: 'Jordi Puig', phone: '+34611222333', whatsapp: '+34611222333',
        licenseNumber: 'BCN-TX-04412', plate: '7731 KLM', vehicleId: car('mercedes-vito').id,
        payoutMethod: 'BANK', payoutIban: 'ES91 2100 0418 4502 0005 1332', payoutHolder: 'Jordi Puig Ferrer',
        lastSeenAt: hours(-0.2),
      },
    }),
    prisma.driver.create({
      data: {
        userId: driverUsers[1].id, name: 'Amira Haddad', phone: '+34622333444',
        licenseNumber: 'BCN-TX-05108', plate: '2290 MNP', vehicleId: car('toyota-corolla').id,
        payoutMethod: 'BIZUM', payoutBizumPhone: '+34622333444', payoutHolder: 'Amira Haddad',
        lastSeenAt: hours(-3),
      },
    }),
  ]);

  const [ana, tom, yuki] = await Promise.all([
    prisma.user.create({ data: { email: 'ana@local.test', name: 'Ana Ferreira', phone: '+351912345678', passwordHash, role: 'USER', locale: 'pt' } }),
    prisma.user.create({ data: { email: 'tom@local.test', name: 'Tom Whitaker', phone: '+447700900123', passwordHash, role: 'USER', locale: 'en' } }),
    prisma.user.create({ data: { email: 'yuki@local.test', name: '田中 由紀', phone: '+819012345678', passwordHash, role: 'USER', locale: 'zh' } }),
  ]);

  // ── Bookings ──────────────────────────────────────────────────────────
  type Place = { label: string; lat: number; lng: number; km: number };
  let n = 0;

  async function book(o: {
    user: typeof ana | null;
    name: string; email: string; phone: string; locale: string;
    from: Place | 'airport'; to: Place | 'airport';
    at: Date; status: string; vehicle: string; driver?: typeof jordi | null;
    passengers?: number; luggage?: number; notes?: string | null;
    paid?: boolean; stamps?: Partial<Record<'enRouteAt' | 'arrivedAt' | 'onBoardAt' | 'completedAt' | 'cancelledAt', Date>>;
    cancelledBy?: 'USER' | 'ADMIN' | 'DRIVER'; cancelReason?: string;
  }) {
    n += 1;
    const pickup = o.from === 'airport' ? { ...AIRPORT, label: 'Aeroport T1, El Prat' } : o.from;
    const dropoff = o.to === 'airport' ? { ...AIRPORT, label: 'Aeroport T1, El Prat' } : o.to;
    const km = (o.from === 'airport' ? (o.to as Place).km : (o.from as Place).km);
    const v = car(o.vehicle);
    const q = calculateQuote({ pickup, dropoff, roadKm: km, durationMin: Math.round(km * 1.5), pickupAt: o.at, vehicleSeats: v.seats });
    const paid = o.paid ?? o.status !== 'PENDING';
    const done = o.status === 'COMPLETED';

    return prisma.booking.create({
      data: {
        reference: ref(n),
        userId: o.user?.id ?? null,
        contactName: o.name, contactEmail: o.email, contactPhone: o.phone,
        pickupLabel: pickup.label, pickupLat: pickup.lat, pickupLng: pickup.lng,
        dropoffLabel: dropoff.label, dropoffLat: dropoff.lat, dropoffLng: dropoff.lng,
        roadKm: km, durationMin: Math.round(km * 1.5),
        tariff: q.tariff, startFare: q.startFare, perKmRate: q.perKmRate, perKmRateCharged: q.perKmRateCharged,
        supplements: q.supplements, meterEstimate: q.meterEstimate, fixedFare: q.fixedFare,
        bookingFee: q.bookingFee, amountOnline: q.total, paymentMode: 'FULL_PREPAID',
        pickupAt: o.at, passengers: o.passengers ?? 2, luggage: o.luggage ?? 2, notes: o.notes ?? null,
        vehicleId: v.id, driverId: o.driver?.id ?? null,
        status: o.status as never, paymentStatus: paid ? 'PAID' : 'PENDING',
        sumupCheckoutId: `dev_${n}`, sumupRef: paid ? `SUMUP-DEV-${1000 + n}` : null,
        driverPayout: done ? q.fixedFare : 0, cashToCollect: 0,
        editableUntil: new Date(o.at.getTime() - 3 * 3600_000),
        cancelledBy: o.cancelledBy ?? null, cancelReason: o.cancelReason ?? null,
        locale: o.locale, createdAt: new Date(o.at.getTime() - 2 * 86_400_000),
        ...o.stamps,
      },
    });
  }

  // Live, right now — one ride in each in-progress stage.
  const enRoute = await book({ user: tom, name: 'Tom Whitaker', email: 'tom@local.test', phone: '+447700900123', locale: 'en', from: 'airport', to: PLACES.gothic, at: hours(0.4), status: 'EN_ROUTE', vehicle: 'mercedes-vito', driver: jordi, passengers: 3, luggage: 4, notes: 'Flight BA478 — landing 14:05. Child seat please.', stamps: { enRouteAt: hours(-0.3) } });
  const arrived = await book({ user: null, name: 'Marta Vidal', email: 'marta.vidal@example.com', phone: '+34600111222', locale: 'es', from: PLACES.eixample, to: 'airport', at: hours(0.1), status: 'ARRIVED', vehicle: 'toyota-corolla', driver: amira, passengers: 1, luggage: 1, stamps: { enRouteAt: hours(-0.6), arrivedAt: hours(-0.1) } });
  const onBoard = await book({ user: ana, name: 'Ana Ferreira', email: 'ana@local.test', phone: '+351912345678', locale: 'pt', from: PLACES.sants, to: 'airport', at: hours(-0.3), status: 'ON_BOARD', vehicle: 'mercedes-vito', driver: jordi, passengers: 4, luggage: 5, notes: 'Vuelo TP1039 a Lisboa', stamps: { enRouteAt: hours(-0.9), arrivedAt: hours(-0.4), onBoardAt: hours(-0.25) } });

  // Upcoming.
  const assigned = await book({ user: yuki, name: '田中 由紀', email: 'yuki@local.test', phone: '+819012345678', locale: 'zh', from: 'airport', to: PLACES.arts, at: hours(5), status: 'ASSIGNED', vehicle: 'mercedes-vclass', driver: jordi, passengers: 2, luggage: 3 });
  await book({ user: null, name: 'Lukas Brandt', email: 'lukas.brandt@example.de', phone: '+491701234567', locale: 'de', from: 'airport', to: PLACES.sitges, at: days(1), status: 'CONFIRMED', vehicle: 'toyota-corolla-estate', passengers: 2, luggage: 4, notes: 'Lufthansa LH1138' });
  await book({ user: tom, name: 'Tom Whitaker', email: 'tom@local.test', phone: '+447700900123', locale: 'en', from: PLACES.gothic, to: 'airport', at: days(2), status: 'CONFIRMED', vehicle: 'toyota-corolla', passengers: 1, luggage: 1 });
  await book({ user: null, name: 'Chloé Martin', email: 'chloe.martin@example.fr', phone: '+33612345678', locale: 'fr', from: 'airport', to: PLACES.girona, at: days(3), status: 'CONFIRMED', vehicle: 'mercedes-vito', passengers: 5, luggage: 6, notes: 'Groupe de 5, 2 planches de surf' });

  // Pending — paid at SumUp or abandoned; the desk cannot tell yet.
  await book({ user: null, name: 'Sofia Rossi', email: 'sofia.rossi@example.it', phone: '+393331234567', locale: 'it', from: 'airport', to: PLACES.eixample, at: days(1.5), status: 'PENDING', vehicle: 'toyota-prius', paid: false });
  await book({ user: null, name: 'Piet de Vries', email: 'piet@example.nl', phone: '+31612345678', locale: 'nl', from: PLACES.arts, to: 'airport', at: days(4), status: 'PENDING', vehicle: 'seat-toledo', paid: false, passengers: 2, luggage: 2 });

  // History.
  const done1 = await book({ user: ana, name: 'Ana Ferreira', email: 'ana@local.test', phone: '+351912345678', locale: 'pt', from: 'airport', to: PLACES.eixample, at: days(-1), status: 'COMPLETED', vehicle: 'mercedes-vito', driver: jordi, stamps: { enRouteAt: days(-1.02), arrivedAt: days(-1.005), onBoardAt: days(-1), completedAt: days(-0.98) } });
  const done2 = await book({ user: tom, name: 'Tom Whitaker', email: 'tom@local.test', phone: '+447700900123', locale: 'en', from: PLACES.eixample, to: 'airport', at: days(-2), status: 'COMPLETED', vehicle: 'toyota-corolla', driver: amira, stamps: { enRouteAt: days(-2.03), arrivedAt: days(-2.01), onBoardAt: days(-2), completedAt: days(-1.98) } });
  await book({ user: null, name: 'Olga Petrova', email: 'olga.p@example.ru', phone: '+79161234567', locale: 'ru', from: 'airport', to: PLACES.sitges, at: days(-3), status: 'COMPLETED', vehicle: 'mercedes-vclass', driver: jordi, passengers: 3, luggage: 5, stamps: { enRouteAt: days(-3.04), arrivedAt: days(-3.01), onBoardAt: days(-3), completedAt: days(-2.96) } });
  await book({ user: null, name: 'Ken Adeyemi', email: 'ken.a@example.com', phone: '+2348012345678', locale: 'en', from: PLACES.sants, to: 'airport', at: days(-4), status: 'COMPLETED', vehicle: 'toyota-corolla', driver: amira, stamps: { enRouteAt: days(-4.03), arrivedAt: days(-4.01), onBoardAt: days(-4), completedAt: days(-3.985) } });
  await book({ user: null, name: 'Ingrid Berg', email: 'ingrid@example.se', phone: '+46701234567', locale: 'en', from: 'airport', to: PLACES.gothic, at: days(-5), status: 'COMPLETED', vehicle: 'toyota-prius', driver: amira, stamps: { enRouteAt: days(-5.03), arrivedAt: days(-5.01), onBoardAt: days(-5), completedAt: days(-4.98) } });
  await book({ user: yuki, name: '田中 由紀', email: 'yuki@local.test', phone: '+819012345678', locale: 'zh', from: 'airport', to: PLACES.arts, at: days(-6), status: 'CANCELLED', vehicle: 'mercedes-vito', cancelledBy: 'USER', cancelReason: 'Flight cancelled', stamps: { cancelledAt: days(-6.5) } });
  await book({ user: null, name: 'Diego Álvarez', email: 'diego@example.es', phone: '+34655667788', locale: 'es', from: PLACES.eixample, to: 'airport', at: days(-2.5), status: 'CANCELLED', vehicle: 'seat-toledo', driver: amira, cancelledBy: 'ADMIN', cancelReason: 'No-show at pickup after 25 min', stamps: { enRouteAt: days(-2.53), arrivedAt: days(-2.51), cancelledAt: days(-2.49) } });

  // ── Around the rides ──────────────────────────────────────────────────
  await prisma.message.createMany({
    data: [
      { bookingId: enRoute.id, senderRole: 'USER', senderId: tom.id, body: 'Just landed, heading to baggage now.', createdAt: hours(-0.25), deliveredEmail: true },
      { bookingId: enRoute.id, senderRole: 'DRIVER', senderId: driverUsers[0].id, body: 'Perfect. I am at the taxi rank outside T1 arrivals, grey Vito 7731 KLM.', createdAt: hours(-0.2), deliveredEmail: true },
      { bookingId: assigned.id, senderRole: 'USER', senderId: yuki.id, body: '我们有两个大行李箱，可以吗？', createdAt: hours(-2), deliveredEmail: true },
    ],
  });

  await prisma.review.createMany({
    data: [
      { bookingId: done1.id, direction: 'USER_TO_DRIVER', userId: ana.id, driverId: jordi.id, authorName: 'Ana F.', rating: 5, text: 'Jordi was waiting with a sign, helped with all four bags and knew a faster route than my phone. Would book again without thinking.', approved: true, createdAt: days(-0.9) },
      { bookingId: done2.id, direction: 'USER_TO_DRIVER', userId: tom.id, driverId: amira.id, authorName: 'Tom W.', rating: 4, text: 'On time and a clean car. Card reader took a moment but otherwise faultless.', approved: false, createdAt: days(-1.9) },
      { bookingId: done1.id, direction: 'DRIVER_TO_USER', userId: ana.id, driverId: jordi.id, authorName: 'Jordi P.', rating: 5, text: 'Punctual, friendly, clear about the pickup point.', approved: false, createdAt: days(-0.9) },
    ],
  });

  await prisma.report.create({
    data: { bookingId: arrived.id, reporterRole: 'DRIVER', byDriverId: amira.id, againstUserId: null, reason: 'Passenger not answering phone', details: 'Waited at Passeig de Gràcia 92 for 12 minutes, three calls unanswered. Still waiting.', status: 'OPEN', createdAt: hours(-0.05) },
  });

  await prisma.withdrawal.createMany({
    data: [
      { driverId: jordi.id, amount: 186.4, method: 'BANK', destination: 'ES91 2100 0418 4502 0005 1332', status: 'REQUESTED', requestedAt: hours(-6) },
      { driverId: amira.id, amount: 120.0, method: 'BIZUM', destination: '+34622333444', status: 'PAID', requestedAt: days(-4), processedAt: days(-3), reference: 'BZM-88213' },
      { driverId: amira.id, amount: 45.5, method: 'BIZUM', destination: '+34622333444', status: 'REJECTED', requestedAt: days(-6), processedAt: days(-5.5), adminNotes: 'Duplicate of BZM-88213' },
    ],
  });

  // A live ride has pings.
  await prisma.locationPing.createMany({
    data: [0, 1, 2, 3, 4].map((i) => ({
      bookingId: onBoard.id, role: 'DRIVER' as const,
      lat: 41.3792 + i * 0.002, lng: 2.14 - i * 0.004, ts: hours(-0.2 + i * 0.03),
    })),
  });

  console.log(`\nSeeded ${n} bookings, 3 customers, 2 drivers, 1 admin.`);
  console.log(`\n  admin    admin@local.test`);
  console.log(`  driver   driver@local.test   (Jordi — has live rides)`);
  console.log(`  driver   driver2@local.test  (Amira)`);
  console.log(`  customer ana@local.test     (has a ride on board right now)`);
  console.log(`  customer tom@local.test`);
  console.log(`\n  password for all: ${PASSWORD}\n`);
  console.log(`  ${admin.email} is the one you want for the admin panel.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
