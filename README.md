# BCNAirportTaxi

Barcelona airport taxi booking — [bcnairporttaxi.es](https://bcnairporttaxi.es).
Ten languages, an installable PWA, and an operations panel for the desk and
the drivers.

We are a **booking intermediary**, not a taxi operator. The passenger is quoted
**one all-inclusive price**, built from the official AMB tariff and the real
road distance, and pays it online in full. Nothing is owed to the driver in the
car. The service charge is inside that price, never itemised beside it.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS 4 · `motion/react` for entrances |
| Database | Postgres via Prisma 7 — Neon in production, `prisma dev` locally |
| i18n | next-intl, 10 locales, all at 100% |
| Maps | Leaflet + CARTO tiles |
| Geocoding / routing | Nominatim / OSRM, proxied and rate-limited server-side |
| Payments | SumUp hosted checkout |
| Email | Resend |

## Running it locally

There is no need for a Neon account or anyone's production database. Prisma 7
ships a local Postgres, and a seed builds the whole cast — admin, drivers,
customers, rides in every state — so every panel renders with real data.

```bash
npm install
npm run db:dev            # local Postgres; prints its URL, keep it running
```

Put that URL in a `.env` at the repository root:

```bash
DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
AUTH_SECRET="any-string-at-least-32-characters-long-for-dev"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="34632414610"
```

Then:

```bash
npm run db:deploy         # apply the migrations
npm run db:seed:dev       # admin, 2 drivers, 3 customers, 16 rides
npm run dev
```

Sign in at `/en/login` — every seeded account uses the password
`password123`:

| Account | Sees |
|---|---|
| `admin@local.test` | the operations panel |
| `driver@local.test` | a driver with rides in progress right now |
| `ana@local.test` | a customer with a ride on board |

The seed is idempotent and refuses to run against anything but localhost.
`npm run db:dev:stop` shuts the database down.

Local development uses the standard `pg` adapter; production uses Neon's
serverless one. `src/lib/db.ts` picks by the URL's host, so nothing changes
between the two beyond `DATABASE_URL`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate`, `prisma migrate deploy`, `next build` — what Vercel runs |
| `npm run build:ci` | The same without the migration, for a runner with no database |
| `npm run ci` | typecheck + lint + tests, what CI runs |
| `npm test` | 140 tests across the pricing engine, ride rules, emails and time handling |
| `npm run db:dev` / `db:dev:stop` | Start / stop the local Postgres |
| `npm run db:seed:dev` | Rebuild the development dataset |
| `npm run db:migrate` | Create and apply a migration (needs a database) |
| `npm run indexnow --workspace=@bcn/web` | Push every sitemap URL to Bing, Yandex, Seznam, Naver |
| `npm run admin:reset -- <email> <siteUrl>` | Email someone a temporary password from the terminal |

Customers reset their own passwords at `/forgot-password`; the CLI is for
when email is the thing that is broken.

## Pricing engine

All rates live in [`packages/core/src/tariffs.ts`](packages/core/src/tariffs.ts)
— **the only place a rate is hardcoded**. Verify against
[taxi.amb.cat](https://taxi.amb.cat) every January.

[`packages/core/src/pricing.ts`](packages/core/src/pricing.ts) produces three
figures from one route, and they must never be conflated:

1. **Meter estimate** — the official rates, exactly as the taxi meter would
   read them. Internal: what the driver is settled against.
2. **Fare** — official rates plus a per-km markup, or the flat interurban rate.
3. **Total** — fare plus service charge. The only figure the passenger sees.

Tariff selection runs in `Europe/Madrid`, never server time. Interurban trips
(either end outside the 36 AMB municipalities, resolved by nearest municipality
rather than a bounding box) bill the closed circuit out and back, as the
Generalitat tariff requires.

Every component of a quote is stored on the booking, so a fare quoted in
August is still explicable in December after the tariff has moved.

## Project layout

```
apps/web/src/
  app/[locale]/(site)/     public pages — marketing, landing, booking, legal
  app/[locale]/(panel)/    admin · driver · account, behind a session
  app/api/                 quote, geocode, bookings, trips, health
  components/              UI — motion primitives in motion.tsx
  lib/                     auth, guards, email, payments, db
  messages/                ten catalogues, all complete
packages/core/src/         pricing, tariffs, municipalities, rides, content
prisma/                    schema + migrations
```

The pure modules in `packages/core` never import Prisma or React. That is what
makes 124 of the tests runnable without a database or a renderer, and it is the
constraint most worth defending.

## Deployment

Pushes to `main` deploy to Vercel. CI runs typecheck, lint, tests and a build
first and marks the commit red if any fail. Functions are pinned to `fra1`,
next to the database.

Environment variables are set in the Vercel project. `ADMIN_NOTIFY_EMAIL`
overrides where booking notices go; it defaults to the public contact address.

## Things worth knowing

- **There is no payment webhook.** A booking is marked paid when the passenger
  returns to the site from SumUp. One who pays and closes the tab stays
  `PENDING`; the desk gets a notice on creation for exactly this reason.
- **Times in forms are Barcelona wall-clock.** `packages/core/src/barcelona-time.ts`
  is the only place a `datetime-local` value is converted either way. Do not
  `new Date(string)` one — that reads it in the server's zone.
- The terms in `packages/core/src/legal.ts` describe the current model but
  have not been reviewed by a Spanish lawyer since the switch from
  intermediary fee to full collection. They should be.
