# Geo services — migration assessment

Prepared in Phase 0. **Nothing was changed.** This records what depends on the
current providers so the migration can be done deliberately in its own phase.

## Current providers

| Function | Provider | Configurable via |
|---|---|---|
| Geocoding / address search | `nominatim.openstreetmap.org` | `NOMINATIM_BASE_URL` |
| Routing / road distance | `router.project-osrm.org` | `OSRM_BASE_URL` |
| Map tiles | `tile.openstreetmap.org` | hardcoded in `route-map.tsx` |

Both are **volunteer-operated demonstration servers**. Their published usage
policies prohibit exactly this kind of use: Nominatim caps absolute traffic at
one request per second and forbids systematic or commercial querying; the OSRM
demo server carries no availability commitment of any kind.

## Why this is the highest availability risk in the platform

Neither provider owes us anything. They can block the origin IP with no notice
and no appeal. When that happens:

- `/api/geocode` fails → **the address fields stop suggesting anything**
- `/api/quote` fails → **no price can be produced, so nobody can book**

That is not degradation. The booking funnel stops. And it would arrive without
warning, most likely at the point traffic grows enough to be noticed by them.

Adding a customer app and a driver app multiplies request volume against a
service already being used outside its terms.

## Affected files

| File | Side | Uses | What breaks without it |
|---|---|---|---|
| `apps/web/src/app/api/geocode/route.ts` | server | Nominatim | Address autocomplete |
| `apps/web/src/app/api/quote/route.ts` | server | OSRM | Every price quote |
| `apps/web/src/app/api/bookings/route.ts` | server | OSRM | Booking creation |
| `apps/web/src/app/[locale]/checkout/page.tsx` | server | OSRM | Checkout route preview |
| `apps/web/src/components/route-map.tsx` | client | OSM tiles | Map rendering only |

**Every geocoding and routing call is already server-side.** No API key would
ever ship to a browser or an app bundle, and both are already reachable only
through our own endpoints. That is the single biggest thing in our favour: the
migration is a change to two route handlers, not to any client.

Both base URLs are already environment variables, so a like-for-like swap needs
no code change at all — only a self-hosted or drop-in-compatible endpoint.

## Affected features

- Address autocomplete in the booking form (`address-field.tsx`)
- Price quoting (`quote-widget.tsx` → `/api/quote`)
- Booking creation — road distance is recomputed server-side
- Checkout route preview and the drawn polyline
- Destination pages quote indicative prices from stored distances, so they are
  **not** affected by an outage

## Current request volume

**NOT CONFIRMED — needs verification.** There is no analytics or request
logging on these endpoints, so actual volume is unknown. Rate limits currently
cap the theoretical maximum at 60 geocode and 60 quote requests per minute per
IP, but that is a ceiling, not a measurement.

Recommended before choosing a paid tier: log request counts for two weeks.

## Options

| Option | Cost shape | Difficulty | Notes |
|---|---|---|---|
| **Self-hosted OSRM + Nominatim** | Fixed VPS, roughly €20–40/mo | Medium | No per-request cost, no rate limits, full control. Needs a server and periodic OSM data updates. Spain-only extract keeps it small |
| **Mapbox** | Free tier then per-request | Low | Geocoding + Directions in one vendor, generous free tier, well documented |
| **Google Maps Platform** | Monthly credit then per-request | Low | Best Spanish address coverage; most expensive at volume |
| **LocationIQ / Geoapify** | Cheap paid tiers | Low | Nominatim-compatible responses — closest to a drop-in swap |
| **Stay as-is** | €0 | — | Accepts an unbounded outage risk on the booking funnel |

## Recommendation

**Two steps, in this order.**

1. **Immediately:** move to a Nominatim-compatible paid provider (LocationIQ or
   Geoapify). Because both base URLs are already environment variables and the
   response shapes match, this is close to a configuration change, and it
   removes the outage risk within a day.

2. **Later, if volume justifies it:** self-host OSRM on a Spain extract. Fixed
   cost, no rate limits, and the routing quality is the same engine we use now.

Map tiles are lower priority — a tile outage degrades the map but does not stop
anyone booking.

## Difficulty

**Low.** Both endpoints are server-side, both base URLs are already
configurable, and the quote path has test coverage. The main work is response
shape mapping if a non-Nominatim-compatible vendor is chosen, plus verifying
that geocoding quality on Spanish addresses is at least as good — which needs a
side-by-side comparison on real Barcelona addresses before switching.
