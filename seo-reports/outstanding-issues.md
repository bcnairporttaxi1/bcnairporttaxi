# Outstanding issues

## A. Needs the owner (no code can fix these honestly)
| # | Item | Why it matters |
|---|---|---|
| 1 | **Legal entity**: company name, NIF/CIF and registered address (`NEXT_PUBLIC_LEGAL_COMPANY`, `_VAT_ID`, `_ADDRESS` are empty in production). The privacy text also needs the data controller and a contact for rights requests | LSSI/GDPR; unblocks Google Business Profile, citations, `legalName` / `vatID` in schema |
| 2 | **Google Business Profile**: needs (1) plus an address Google accepts for verification; check eligibility for an intermediary without premises or vehicles | the map pack is shown first for "taxi aeropuerto barcelona" |
| 3 | **Real reviews**: collect from completed trips with consent. Never add `aggregateRating` / `Review` markup before they exist | trust, and rich-result eligibility |
| 4 | **Google API access**: Search Console (and its Links report), PageSpeed/CrUX key, GA4, Bing Webmaster verification, a free Moz key | without these no field data, real queries, positions or backlinks can be measured |
| 5 | Who sets the price (the Terms now say "set by us"); whether "Licensed AMB taxis" is backed by the drivers' licences; whether drivers are insured | claims on every page |
| 6 | Whether +34 632 414 610 takes voice calls (if yes, show it as a `tel:` link on /contact) and the real support hours (schema says 00:00-23:59) | NAP and schema accuracy |
| 7 | Policies the content review found missing, which need facts: child seats, wheelchair access, pets, free waiting time and the charge after it, tolls / cross-border / winter promises for Andorra, round-trip pricing, refunds inside 24 h, WhatsApp hours | what searchers expect and competitors state |
| 8 | Current Aerobús and metro fares (with the date checked) and the 2026 AMB tariff figures quoted in the blog (T-1 EUR 1.35, T-2 EUR 1.66, start EUR 2.80, waiting EUR 27.75/h): could not be verified here | the guides compare taxi and Aerobús on cost |
| 9 | Whether Bizum / Mastercard work in the SumUp checkout (schema lists Bizum; checkout shows VISA/AMEX) | `paymentAccepted` accuracy |
| 10 | "Most booked" labels (home, Sitges page) have no data behind them: confirm or remove | unsupported claim |
| 11 | Whether the Andorra and Sitges figures are binding quotes or guides (the pages say both) | consistency of "fixed price" |

## B. Needs your approval first (deploy, migration, external action)
- Deploying this branch to production. It exists locally only; it has not been pushed.
- Localising URL slugs (`/es/precios`): would redirect 364 URLs.
- Any outreach, directory submission or purchase listed in `backlink-opportunities.md`.

## C. Engineering backlog (found, not fixed)
- Mobile LCP render delay (about 1.9 s, an unidentified 848 ms main-thread task), the unused/legacy JavaScript chunk, about 500 KB of HTML (`performance-report.md`).
- Destination pages: per-vehicle price table, FAQ and inline quote form for Andorra and Sitges. The FAQ needs the owner facts in A-7 and A-11.
- About 270 words of boilerplate repeated verbatim on the 13 destination pages; repeated "Four seats, three cases" blocks.
- Home `why.meter.body` still says the price is set "not by distance or the hour": true for the city list, not for interurban trips. Scope it in all 10 locales.
- Mixed-case paths (`/en/Book`) return 200 instead of 308 (the canonical is lowercase, so no duplicate-index risk).
- Merge the three JSON-LD blocks into one `@graph`; full ISO timestamps on Article dates; the `Photo:` credit label is English in every locale.
- Heading inflation ("Barcelona airport taxi" in 6-8 headings per page) and 13 near-identical home anchors.
- CSP allows `unsafe-inline` / `unsafe-eval` (security, not SEO); `Access-Control-Allow-Origin: *` on HTML pages.
- `robots.txt` carries a `Host:` line that Google ignores (harmless).
