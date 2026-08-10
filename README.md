# BCNAirportTaxi

Premium Barcelona airport taxi booking site and installable PWA.

We are a **booking intermediary**, not a taxi operator. The site shows a km-based
fare estimate built from official AMB tariffs; the fare the passenger actually
pays is the **taxi meter**, settled with the driver in the car. We collect a
separate **20% booking fee** online, receipted separately.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS 4 |
| Database | Neon Postgres via Prisma 7 (`@prisma/adapter-neon`) |
| i18n | next-intl, 10 locales, localized routes |
| Maps | Leaflet + OpenStreetMap tiles |
| Geocoding | Nominatim (proxied server-side, throttled + cached) |
| Routing | OSRM (road distance, not straight-line) |
| Email | Resend |
| Images | Gemini `gemini-2.5-flash-image`, generated at build time |

## Getting started

```bash
npm install
cp .env.example .env      # fill in the values
npm run db:migrate        # apply the schema to Neon
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate` then a production build |
| `npm test` | Pricing engine unit tests (Vitest) |
| `npm run db:migrate` | Create + apply a migration |
| `npm run db:deploy` | Apply migrations in CI/production |
| `npm run gen:images` | Regenerate hero + fleet imagery via Gemini |

### Regenerating imagery

`npm run gen:images` calls Gemini once per image and writes the results to
`public/img/`. Commit the output — images are **never** generated per request,
so the site always serves static optimized assets.

The script rotates across `GEMINI_API_KEY_1..3`, moving to the next key on a
429 / `RESOURCE_EXHAUSTED` response. If every key is exhausted it logs clearly
and leaves the committed artwork in place, so a build never breaks.

> **Current state:** all three supplied keys report `limit: 0` for image
> generation — the projects behind them have no image quota, which is a billing
> setting rather than a rate limit. The committed `public/img/*.svg` files are
> styled placeholders in the brand palette. Enable billing on the Google Cloud
> project (or supply keys from one that has image quota) and re-run the script.

### Regenerating icons

`npx tsx scripts/make-icons.ts` rasterises the PWA icons and favicon from a
single inline SVG source via `sharp`.

## Pricing engine

All rates live in [`src/lib/tariffs.ts`](src/lib/tariffs.ts) — **the only place
a rate is hardcoded**. Verify them at [taxi.amb.cat](https://taxi.amb.cat) every
January when the AMB publishes the new tariff.

[`src/lib/pricing.ts`](src/lib/pricing.ts) implements:

- **Tariff selection** evaluated in `Europe/Madrid`, not server time. T-1 is
  Mon–Fri 08:00–20:00; T-2 covers nights, weekends and Barcelona holidays.
- **Supplements** for El Prat, Moll Adossat, Sants and Fira, capped per service.
- **Airport minimum fare**, applied to the whole metered total, origin only.
- **Fixed T-4 price** for airport ↔ Moll Adossat, in both directions.
- **Booking fee** derived from the final estimate, always reported separately.

Covered by 20 unit tests including DST boundaries and UTC-vs-local edge cases:

```bash
npm test
```

## Project layout

```
src/
  app/[locale]/       localized routes (10 languages)
    [slug]/           SEO keyword landing pages, data-driven
  app/api/            geocode + quote endpoints
  components/         UI, incl. the taximeter readout and route map
  i18n/               routing, navigation helpers, request config
  lib/                tariffs, pricing, fleet, landing copy, legal, db
  messages/           translation catalogues
prisma/               schema + migrations
scripts/              image + icon generation
```

## Internationalization

Ten locales: `en es ca fr de it pt nl ru zh`, each on its own URL prefix with
full `hreflang` and per-locale canonicals.

`src/i18n/request.ts` deep-merges each catalogue over English, so a partially
translated locale renders its translated strings and falls back to English for
the rest rather than erroring or showing blanks.

> **Current state:** `en.json` is complete. The other nine catalogues are not
> yet written, so those locales currently render English. Add
> `src/messages/<locale>.json` and the merge picks it up with no code change.

## Things to confirm before launch

- WhatsApp business number (`NEXT_PUBLIC_WHATSAPP_NUMBER`) — currently a placeholder.
- SumUp merchant credentials, and who receives the booking-fee payout.
- A verified Resend sending domain (the current key can only send from
  `onboarding@resend.dev` to the account owner).
- Exact fleet seat/bag counts.
- Legal review of `src/lib/legal.ts` by a Spanish lawyer.
- Re-verify AMB tariffs at go-live and each January.
