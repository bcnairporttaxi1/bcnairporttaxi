# @bcn/core

The booking rules, in one place, consumed by every client.

## The contract

**No React. No Next.js. No Prisma client at runtime.** Type-only imports from
the generated Prisma enums are permitted — they erase at compile time — but
anything that would drag a database connection or a rendering framework into a
React Native bundle does not belong here.

That constraint is the whole point. It is what lets the website, the customer
app, the driver app and the API share one implementation of the fare engine
rather than four that drift.

## What is here

| Module | Responsibility |
|---|---|
| `tariffs` | Official AMB and Generalitat rate table — single source of truth |
| `pricing` | Fare arithmetic, tariff selection, booking-fee windows |
| `rides` | Lifecycle rules, edit window, settlement split |
| `format` | Locale-aware money and dates, Intl instances cached |
| `fleet` | Vehicle catalogue |
| `destinations` | Route hub data and long-form copy |
| `landing-pages` | Keyword landing copy in ten locales |
| `legal`, `blog`, `site` | Static content and site constants |

## What is deliberately not here

Anything needing a secret or a database: `auth`, `db`, `guards`,
`ride-service`, `trip-access`, `driver-balance`, `rate-limit`, `passwords`,
`email`, `payments`. Those stay in `apps/web/src/lib` and always will.

## Pricing is not authoritative on the client

A mobile app may import `pricing` to *show* a breakdown. It must never decide
what to charge. The server recomputes every quote before creating a booking and
ignores whatever the client believed. Sharing the code makes the two agree; it
does not make the client the authority.
