# Schema and structured data report

Source: `seo-schema` agent (live HTML of 8 pages, 2026-11-03) + the full-crawl extraction of 451 URLs.

## Baseline (crawl of 451 URLs, before this branch)
- 0 JSON-LD parse errors on any page.
- LocalBusiness + TaxiService + WebSite on all 375 indexable pages; BreadcrumbList on 364; Service on 251; Article + Organization on the 30 blog URLs (3 guides x 10 locales); FAQPage on 21 pages.
- No `aggregateRating` / `Review` anywhere. **Intentional**: there are no real reviews. Do not add any until real, approved reviews exist.
- FAQPage: Google retired FAQ rich results in May 2026, so this is Info only. Questions are visible on the page, so the markup is truthful; left in place.

## Findings and what was done

| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | `ServiceJsonLd` emitted a second anonymous `Service` per page named after the `<title>` (with the `| BCNAirportTaxi` suffix), duplicating `#service` | Medium | **Fixed**: own `@id` (`<page>#service`), clean name, `isSimilarTo` the sitewide service |
| 2 | Sitges (and every destination) Service said `areaServed: Barcelona` and carried no offer | Medium | **Fixed**: `areaServed` = the destination, `offers.price` = the same all-in quote shown on the page |
| 3 | Sitewide AggregateOffer high price (85) understates the real range | Medium | **Partly**: per-destination Offer now carries the true price with a weekend note. The sitewide offer is scoped to the city/cruise fixed list and left as is |
| 4 | `areaServed` mixed a 120 km circle with destinations 200-350 km away | Medium | **Fixed**: Andorra and Valencian Community added as named areas alongside the circle |
| 5 | Article `publisher` was a cross-block `@id` reference only; author had no URL; JSON was not escaped | Medium | **Fixed**: inline publisher/author (Organization with url + logo), shared `serialise()` escape |
| 6 | Entity graph split across three script blocks | Low | Open: merging into one `@graph` is a larger refactor with no confirmed benefit |
| 7 | Date-only `datePublished`/`dateModified` | Low | Open: Google accepts date-only; full timestamps preferred |
| 8 | `sameAs`, `legalName`, `vatID`, street address absent | Low | **Owner-blocked**: no real profiles / legal entity yet. Do not invent |
| 9 | `openingHours` 00:00-23:59 on LocalBusiness | Low | **Owner to confirm** support is really staffed 24/7 |
| 10 | `priceRange: 'EUR 50+'` non-standard | Low | Open, cosmetic |
| 11 | `paymentAccepted` lists Bizum | Low | **Owner to confirm** checkout accepts it in every locale |

Validation was done by parsing every block and checking types/properties against schema.org and Google's guidance
by hand; no external validator (Rich Results Test / Schema Markup Validator) is reachable from this environment.
