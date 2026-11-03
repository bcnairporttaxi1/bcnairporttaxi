# Outstanding issues (updated 2026-11-03, after the owner's confirmations)

## Confirmed by the owner on 2026-11-03 and now applied on the branch
| Fact | Where it is applied |
|---|---|
| Licensed AMB taxis in Barcelona | top bar badge and home trust band (unchanged, kept); fleet and home copy reworded in all 10 languages |
| Fully insured | home "Licensed drivers only" and fleet "What every car has", all 10 languages |
| Vehicles undergo the required AMB inspections | same two places. Reworded from "inspected on the AMB's schedule" (which implied a known timetable). **No licence numbers, insurance details or inspection dates are stated anywhere, and none were invented** |
| No child seats are provided | the fleet note now opens "We do not provide child seats"; the booking-notes hint no longer lists child seats; the private-transfer page says we do not provide them and its heading no longer names them (10 languages). The one remaining mention is the Aerobús guide's general "travelling with children, a pushchair or a car seat", which refers to the traveller's own seat |
| Tolls apply | listed as "Motorway tolls: apply where the route uses a toll road" on the pricing page (10 languages), in `pricing.md` and in `llms.txt`. **Nothing says tolls are included in the fixed price, and no amount or collection method is stated** |

## A. Toll policy: confirmed and applied; four operational details still open
Owner confirmation (2026-11-03): **motorway tolls are NOT included in the fixed transfer price and are charged separately to the customer.** Applied on the branch in all 10 languages. The site now says exactly that and nothing more: tolls are excluded and are charged separately when the route uses toll roads. **No amount, estimate, cap, payment method or route list is stated anywhere**, because none was given.

Where it is stated (all verified on the private preview, 374 pages): home, pricing, FAQ (what is included / how do I pay), how it works, booking page and widget notes, checkout, all 12 destination pages and the destinations hub, the price and route landing pages including cruise port, footer, Terms, Refund policy, `pricing.md`, `llms.txt`, JSON-LD offer descriptions, the PWA manifest, the booking confirmation / desk / driver / completion emails, the SumUp checkout description, and the account page's prepaid row.

Removed or rewritten: every "all-inclusive" label, "Nothing to pay your driver", "Nothing further is owed to the driver in the vehicle", "nothing to pay in the taxi / car", "nothing is collected in the car", "no second figure at the end", and "no surprise" (all 10 languages). A new test (`toll-policy.test.ts`) fails if any of those claims returns in any language and requires the toll statement wherever a price is explained.

**Still unknown, and therefore not published** (customers will ask; please decide):
1. **Who collects the toll and how**: added to the online payment at booking, paid to the driver in the car, billed afterwards, or another method.
2. **How the customer learns the amount before travelling** (shown in the quote, told by WhatsApp, estimated by route, settled at cost with a receipt).
3. **Which routes carry tolls** (today the pages say only "where the route uses toll roads").
4. **Whether the Terms need a toll clause** with a rate, cap or refund treatment, and whether the Terms' "we do not set fares / the price is set by us" wording needs to mention tolls.

Operational consequence to check: the desk and driver emails no longer say "nothing to collect in the car". They say "no fare balance to collect; motorway tolls are not included and are charged separately". They do **not** tell the driver to collect tolls, because the method is unknown. If the driver does collect them, that instruction needs adding.

## B. Needs the owner (no code can fix these honestly)
| # | Item | Why it matters |
|---|---|---|
| 1 | **Legal entity**: company name, NIF/CIF, registered address (`NEXT_PUBLIC_LEGAL_COMPANY`, `_VAT_ID`, `_ADDRESS` are empty in production); data controller and rights-request contact for the Privacy text | LSSI/GDPR; unblocks Google Business Profile, citations, `legalName` / `vatID` in schema |
| 2 | **Legal texts**: waiting-time clause (the "reasonable period", rate and collection method are undefined and contradict "nothing owed to the driver"), interurban wording (Terms say Generalitat tariff; we quote our own all-in rates), who is the contracting party, the "official taxi meter invoice" sentence, and whether Spanish/Catalan versions are required. Proposed wording is in `preview-verification-and-production-checklist.md` section 4 | High. Recommended: counsel reviews before production |
| 3 | **Google Business Profile**: needs (1) plus an address Google accepts for verification; check eligibility for an intermediary without premises or vehicles | the map pack is shown first for "taxi aeropuerto barcelona" |
| 4 | **Real reviews**: collect from completed trips with consent. Never add `aggregateRating` / `Review` markup before they exist | trust, and rich-result eligibility |
| 5 | **Google API access**: Search Console (and its Links report), PageSpeed/CrUX key, GA4, Bing Webmaster verification, a free Moz key | no field data, real queries, positions or backlinks can be measured without them |
| 6 | Who sets the price (the Terms now say "set by us") | claims on every page |
| 7 | Whether +34 632 414 610 takes voice calls; real support hours (schema says 00:00-23:59); WhatsApp hours | NAP and schema accuracy |
| 8 | Still unconfirmed policies: wheelchair access and pets (the private-transfer page says "none of these is a problem given notice"), free waiting time at pickup and any charge after it, round trips, refunds inside 24 h, the Andorra winter-equipment promise ("we assign a vehicle equipped for the conditions"), border documents | what searchers expect and what pages currently promise |
| 9 | Current Aerobús and metro fares (with the date checked) and the AMB tariff figures quoted in the blog (T-6 EUR 0.82/km, EUR 21 minimum, EUR 46 closed fare, T-1 EUR 1.35, T-2 EUR 1.66, start EUR 2.80, waiting EUR 27.75/h) | the guides compare taxi and Aerobús on cost |
| 10 | Whether Bizum / Mastercard work in the SumUp checkout (schema lists Bizum; checkout shows VISA/AMEX) | `paymentAccepted` accuracy |
| 11 | "Most booked" labels (home, Sitges page) have no data behind them: confirm or remove | unsupported claim |
| 12 | Whether the Andorra and Sitges figures are binding quotes or guides (pages say both; the live quote can differ by about 1.5%) | consistency of "fixed price" |
| 13 | Whether you want GA4 / Google Ads conversion tracking added (none exists today) | measurement |

## C. Needs your approval first (deploy, migration, external action)
- Merging and deploying this branch to production. Nothing has been merged; production is still `ed8ab9b`.
- Localising URL slugs (`/es/precios`): would redirect 364 URLs.
- Any outreach, directory submission or purchase listed in `backlink-opportunities.md`.

## D. Engineering backlog (found, not fixed)
- Mobile LCP render delay (about 1.9 s, an unidentified 848 ms main-thread task), unused/legacy JavaScript chunk, about 500 KB of HTML (`performance-report.md`).
- Destination pages: per-vehicle price table, FAQ and inline quote form for Andorra and Sitges (the FAQ needs the answers in A and B-8).
- About 270 words of boilerplate repeated verbatim on the 13 destination pages; repeated "Four seats, three cases" blocks.
- Home `why.meter.body` says the price is set "not by distance or the hour": true for the city list, not for interurban trips. Scope it in all 10 languages.
- `licensedBody1` (fleet) says each vehicle "can issue an official meter invoice"; see B-2.
- Mixed-case paths (`/en/Book`) return 200 instead of 308 (the canonical is lowercase, so no duplicate-index risk).
- Merge the three JSON-LD blocks into one `@graph`; full ISO timestamps on Article dates; the `Photo:` credit label is English in every locale.
- `tsc` run directly inside `packages/core` reports two errors that predate this work (`src/index.ts` re-exports `PaymentMode` twice; a literal-type mismatch in `pricing.test.ts`). The web app type-checks clean and all tests pass; the core package is not type-checked on its own in the build.
- CSP allows `unsafe-inline` / `unsafe-eval` (security, not SEO); `Access-Control-Allow-Origin: *` on HTML pages; `robots.txt` carries a `Host:` line Google ignores.
