# Architecture

A booking intermediary, not a taxi operator. That distinction drives most of
what follows: we never own a fare, we take a service fee for arranging a ride,
and the meter in the car belongs to the driver. Anywhere the code looks
over-careful about separating those two pots of money, that is why.

## Shape

```
                        ┌────────────────────────────────────┐
  Visitor ──▶ Vercel ──▶│ proxy.ts — locale prefix, always   │
              edge      └────────────────┬───────────────────┘
                                         │
        ┌────────────────────────────────┼─────────────────────────────┐
        │                                │                             │
   54 SSG pages                   23 dynamic routes              6 API routes
   marketing, landing,            panels, trip, booking          quote, geocode,
   destinations, legal            (session-dependent)            bookings, trips/*,
   — built per locale                     │                      health
        │                                 │                             │
        └────────────────┬────────────────┴─────────────────────────────┘
                         │
                  ┌──────▼───────┐
                  │  src/lib     │  pricing · rides · auth · guards · format
                  │  23 modules  │  no React, no Prisma in the pure ones
                  └──────┬───────┘
                         │
   ┌─────────────┬───────┴────────┬──────────────┬─────────────┐
   │             │                │              │             │
 Neon PG      SumUp            Resend        Nominatim       OSRM
 10 models    checkout         email         geocoding       routing
```

Functions are pinned to `fra1` in `vercel.json` because Neon is in
`eu-central-1` and the panels make several round trips per page. This is not
theoretical: the default put them in `iad1`, and `/api/health` measured a
**664 ms** round trip to the database from Virginia — a transatlantic hop on
every single query. Frankfurt is a few milliseconds from the database.

## Layers, and the one rule that matters

```
src/
  app/[locale]/…        pages and server actions  — may import lib
  app/api/…             HTTP endpoints            — may import lib
  components/…          React                     — may import pure lib only
  lib/
    pricing.ts          pure  · fare arithmetic, tariff selection
    rides.ts            pure  · lifecycle rules, edit window, settlement
    format.ts           pure  · money and dates per locale
    tariffs.ts          pure  · the rate table, single source of truth
    auth.ts             server· JWT sessions
    guards.ts           server· role checks, re-read from the database
    ride-service.ts     server· the only writer of booking status
    db.ts               server· Prisma client
```

**The pure modules never import Prisma or React.** That is what makes the 95
tests possible without a database or a renderer, and it is the constraint most
worth defending — every rule that has ever broken in this codebase broke
because it lived in a page component where nothing could test it.

## Data flow: a booking

```
1. Quote      client → POST /api/quote → OSRM route → calculateQuote() → price
                                                          │
                     the client's price is never trusted; ─┘
                     it is recomputed here and again at step 2

2. Book       client → POST /api/bookings
                        ├── rate limit (10 / 10 min / IP)
                        ├── recompute the quote server-side
                        ├── persist Booking (PENDING)  ← every component of the
                        │                                price stored, so a fare
                        │                                stays explicable after
                        │                                the tariff table changes
                        ├── SumUp checkout → redirect URL
                        └── confirmation email

3. Pay        SumUp hosted page → returns to /booking/[reference]
                        └── status re-read from the SumUp API.
                            The return URL is a hint, never evidence.

4. Dispatch   admin assigns a driver → ASSIGNED → email with plate and phone

5. Ride       driver: EN_ROUTE → ARRIVED → ON_BOARD → COMPLETED
                        │
                        ├── each press stamps its own timestamp
                        ├── location pings drive the at-door email
                        └── COMPLETED freezes the settlement  ← see below

6. Settle     prepaid  → driverPayout = fixed fare, collect nothing
              fee-only → driverPayout = 0, driver takes the meter in the car
```

Step 6 is the part that has already broken once. Settlement used to live in the
driver panel, so a ride the office completed paid the driver nothing. It now
lives in `statusWriteFor`, and every path that writes a status goes through it —
there is no way to set `COMPLETED` without settling, because the settlement is
part of what the status *means*.

## The two money paths

| | Fee-only | Full prepaid |
|---|---|---|
| Taken online | booking fee | fare + booking fee |
| Paid in the car | metered fare | nothing |
| Platform owes driver | nothing | the fare |
| Our income | the fee | the fee |

Only the fee is ever revenue. A prepaid fare passes through our account on its
way to a driver, which is why the revenue panel separates "what we earn" from
"money passing through" rather than showing one total.

## Database

Ten models. The shapes worth explaining:

**Booking** stores every component of the quote — start fare, per-km rate, the
rate actually charged, supplements — not just the total. A fare quoted in
August must still be explicable in December after the tariff table has moved,
and a dispute is settled from the record rather than from a recalculation that
would now give a different answer.

**Review** carries a `direction` and is unique on `(bookingId, direction)`, so
one ride holds at most one rating each way. Passenger-to-driver ratings can be
published; driver-to-passenger ones are internal and have no publish path at
all — enforced in the query, in the action, and in what the admin UI draws.

**Withdrawal** snapshots the destination onto the row. A driver changing their
IBAN must not rewrite where last month's money went.

**LocationPing** is append-only and only written while a trip is live.

## API

| Route | Auth | Notes |
|---|---|---|
| `POST /api/quote` | none | 60/min per IP — each call costs an OSRM lookup |
| `GET /api/geocode` | none | 60/min; cached an hour; Nominatim's policy is the real limit |
| `POST /api/bookings` | none | 10 per 10 min; guest checkout is deliberate |
| `GET/POST/DELETE /api/trips/[ref]/location` | trip access | ping in, positions out, consent-gated |
| `GET/POST /api/trips/[ref]/messages` | trip access | polled, not socketed |
| `GET /api/health` | none | 503 when Neon is down |

Everything else is a server action, which keeps mutations typed end to end and
means no hand-written endpoint for each form. The cost is a sharp edge worth
naming: **every exported async function in a `'use server'` file is a public
endpoint.** That is not obvious, and it already bit once — `driverBalance` was
exported beside the actions and became an unauthenticated read of any driver's
earnings.

## Caching

Modest on purpose:

- **54 SSG pages** — marketing, landing and destination pages, built per locale
  at deploy. Nothing personalised, so nothing to invalidate.
- **Geocode responses** cached an hour at the edge. Addresses do not move.
- **Panels are uncached.** A dispatcher looking at a stale ride list is worse
  than a slow one.
- **`revalidatePath`** after every mutation, scoped to the pages that changed.
- **`Intl` formatters** memoised per locale — they are expensive to construct
  and render inside table loops.

No Redis. Nothing here has a cache-shaped problem yet, and adding a second
store to keep coherent would be a real cost against a hypothetical benefit.

## Realtime

Polling, every 6 seconds, stopping when the tab is hidden. A transfer lasts
under an hour and there are a handful of concurrent trips; a websocket tier
would be more moving parts to run and monitor for something HTTP already does.
This is a decision to revisit at a few hundred concurrent trips, not before.
