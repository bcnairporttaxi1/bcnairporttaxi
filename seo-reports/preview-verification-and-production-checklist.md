# Preview verification and production checklist

Branch `seo/full-site-optimisation`, head `7bd0dd1` (plus report updates). Verified 2026-11-03 on the private Vercel preview. Sections 1-4 and 6-8 were verified at `912e5a1`; the owner-confirmation changes (below) were re-verified at `c74c24c` and `7bd0dd1`.
**Production is untouched**: `main` is still `ed8ab9b`, the only Production deployment is the old one, nothing was merged.

## Update: owner confirmations (2026-11-03), applied and re-verified
| Owner said | What is on the branch now | Verified on the preview (all 374 pages, 10 languages) |
|---|---|---|
| Licensed AMB taxis: keep | "Licensed AMB taxis" badge kept; home and fleet copy say "licensed AMB taxi" | 10 / 10 fleet pages carry the new wording |
| Fully insured: keep | "fully insured" in the same two places, 10 languages | 10 / 10 |
| Required AMB inspections: keep, accurate wording | "subject to the required AMB inspections"; the implied "AMB's schedule" and the unconfirmed "working meter" are gone. No licence numbers, insurance details or dates are stated | 0 "working meter" claims left |
| No child seats | fleet note, booking-notes hint and private-transfer page now say they are not provided; the heading that named them was renamed | the only seat mentions left are "we do not provide" statements |
| Tolls apply | neutral row "Motorway tolls: apply where the route uses a toll road" on the pricing page (10 languages), `pricing.md`, `llms.txt`. **Not** described as included; no amount or method invented | toll row on 10 / 10 pricing pages |

**Open and blocking: the toll policy.** The owner confirmed tolls apply, but not who pays, when, how the amount is known or which routes. Several site-wide statements ("Nothing to pay your driver", "Nothing further is owed to the driver in the vehicle", "all-inclusive") conflict with a separately charged toll. They are listed, with the four questions I need answered, in `outstanding-issues.md` section A. I did not reword them without the policy.

Tests before the toll change: core 423 passed, web 251 passed (adds `owner-facts.test.ts`, which pins the confirmed facts in every language), `tsc` clean for the web app, `eslint` clean, production build exit 0.

## Update 2: toll policy (owner, 2026-11-03), applied and re-verified at `b35168d`
Owner: motorway tolls are NOT included in the fixed transfer price and are charged separately to the customer. Applied in all 10 languages: every "all-inclusive" and "nothing is owed to the driver / nothing to pay in the taxi" claim was removed or rewritten, and the toll exclusion is stated wherever a price is explained (pricing page, quote notes, booking and checkout, FAQ, destination pages, Terms, `pricing.md`, `llms.txt`, schema, manifest, emails, SumUp description). No amount, estimate, cap, payment method or route list was invented.

Verified on the preview at `b35168d` (in-browser, all 374 sitemap pages plus checkout, Terms, Refund policy, `pricing.md`, `llms.txt`, manifest): 0 old claims in any of the 10 languages; toll statement on the pricing, home, FAQ, booking, price and cruise pages in 10 / 10 languages and on 120 / 120 destination pages; checkout 10 / 10; Terms and Refund policy say tolls are not part of the fixed price; `og:locale`, hreflang, H1, structured data, titles and descriptions all still pass. Tests: core 423, web 290, `tsc` clean, `eslint` clean, production build exit 0.

Open (see `outstanding-issues.md` section A): who collects tolls and how, how the customer learns the amount, which routes, and whether the Terms need a toll clause. The preview-only changes touch payment-adjacent text (the SumUp checkout description now reads "Barcelona taxi REF - fixed price" instead of "all-inclusive") and the email templates; no payment logic, price calculation or booking flow code changed.

## Update 3: tolls are collected by the driver in the car (owner, 2026-11-03), applied and re-verified at `e7e0534`+
Owner: the driver collects tolls from the customer in the car, and tells the customer on the way when the route uses a toll road; tolls are still not in the fixed price. The English and all nine other languages now say that wherever payment is explained (pricing page including the toll row, quote/booking/checkout notes, FAQ, how it works, landing pages, account page, Terms, `pricing.md`, `llms.txt`, and all four email types). Still not stated: amount, payment method, route list.

Verified on the preview (all 374 pages, 10 languages, plus checkout): 0 leftover old claims; toll and driver wording on checkout 10 / 10; every other check (hreflang, `og:locale`, H1, structured data, titles, descriptions) still passes. Tests: core 423, web 300, `tsc` clean, `eslint` clean, production build exit 0. Two leftover contradictory sentences that the first pass missed (a Dutch "nothing is collected in the car" and a Chinese "nothing is charged in the car") were found by a broader scan and fixed; the test now catches them.

## 1. Preview
- Environment: **Preview** (Vercel confirms), not Production. Address: `https://bcnairporttaxi-git-seo-full-si-6ad3a7-bcnairporttaxi1s-projects.vercel.app` (behind your Vercel login, so it is private; crawlers and PageSpeed cannot reach it).
- `GET /api/health` on the preview returns `{"status":"ok","database":"up","commit":"912e5a1"}`. **The preview is connected to a database.** Treat it as live data: nobody should place a booking on the preview.

## 2. All 10 languages (final commit, in-browser sweep of the preview's sitemap: 374 URLs)
| Check | Result |
|---|---|
| HTTP status | 374 / 374 are 200 |
| `og:locale` correct for the language | 374 / 374 |
| hreflang | 11 tags on every page; the 4 English-only legal pages carry 2 (self + x-default), by design |
| Exactly one H1 | 374 / 374 |
| JSON-LD parses | 0 errors |
| Canonical = its own URL; no noindex page in the sitemap | 374 / 374; 0 |
| Title 30-60 and description 120-160 characters (Chinese judged by width) | 0 out of range |
| Banned phrases ("Regulated fares", "real tariff", "Tarifas reguladas", "tarifa real", the old "34.44") | 0 pages |

Per language: en 41 pages (includes the 4 legal pages), es/ca/fr/de/it/nl/pt/ru/zh 37 each. Zero failures in any language.

## 3. Every fixed-price amount against the pricing configuration
Method: extracted every euro figure from all 374 rendered pages (62 distinct values), generated the set of valid values from `TARIFFS`, the destination route estimates and the arithmetic derived from them, and compared. Then called the live `/api/quote` on the preview.

| Result | Detail |
|---|---|
| Matches the configuration | City 50 / 70 / 75; cruise port 60 / 80 / 85; port charge 10; weekend 53.75 (50 + 7.5%) and 3.75; extra km 1.50; supplements (4.60, 2.55, 3.30, 17.10 cap); all-in interurban rates 2.16 / 2.38 / 2.48; every destination "from" price (Sitges 90.78, Girona 231.18, Tarragona 224.70, Montserrat 138.30, Lloret 192.30, Tossa 203.10, Blanes 170.70, La Roca 95.10, Cadaqués 375.90, Andorra 440.70, Valencia 764.70); group examples 100 / 120 / 125; "EUR 20 to 25" upgrade (70 - 50, 75 - 50); "EUR 12.50 each" (50 / 4) |
| Parsing artefacts, not bugs | 125.04, 450, 690.78, 913, 954, 3305, 6224.70, 6231.18 are digits glued to a neighbouring number in the page text ("T-6" + "90,78", "€91" + "38 km") |
| **Real bugs found and fixed on the branch** | (a) `/book` step artwork showed a hard-coded **EUR 34.44** (an old meter estimate) beside real quotes of EUR 50. It now reads the tariff, and a new test fails on any literal euro amount in a component. (b) The home destination card said "from EUR 214" for Costa Brava while its own page says "on request"; the card now shows no price when its page has none. Verified on the final preview: art shows EUR 50, Costa Brava card has no price |
| Third-party figures that cannot be checked here | AMB regulated rates quoted in the blog (T-6 EUR 0.82/km, EUR 21 minimum, EUR 46 closed fare, T-1 EUR 1.35, T-2 EUR 1.66, start EUR 2.80, waiting EUR 27.75/h, supplements) come from the AMB tariff, not our configuration. Unverified (see 9) |

Live quote API on the preview (weekday 2026-11-11, Saturday 2026-11-14): airport to Plaça de Catalunya EUR 50.00 / EUR 53.75; airport to cruise port EUR 60.00; Plaça de Catalunya to cruise port EUR 60.00 (50 + 10); Plaça de Catalunya to Sitges **EUR 92.18** on the live road distance of 38.65 km. The Sitges page shows EUR 90.78 because it prices the published 38 km. Both are consistent with the "from" label; the difference is about 1.5%. The checkout recomputes from the live road distance, so the customer pays the quote, not the page figure. Confirm you are comfortable with "from" pages that differ from the final quote by a small amount.

## 4. Legal pages (English only; not changed by me except the two clauses below)
Terms, Privacy, Cookies and Refund Policy were read in full from `packages/core/src/legal.ts`.

| # | Finding | Severity | Action |
|---|---|---|---|
| L1 | **Waiting time.** Wording on the branch (your 2026-11-01 rule): "For journeys within Barcelona the price is fixed and no waiting charge applies; on interurban journeys, waiting time beyond that is charged on the meter at the official AMB waiting rate." Problems: "beyond that" refers to "a reasonable period", which is not defined; the Terms also say "Nothing further is owed to the driver in the vehicle", which contradicts a waiting charge collected in the car; the interurban tariff is the Generalitat's, not the AMB's; and nothing says how a charge is collected after a prepaid booking | High | **Needs your decision + counsel.** Define the free waiting period, the rate, who collects it and how |
| L2 | **Interurban pricing.** Terms: "priced per kilometre on the interurban tariff set by the Generalitat". Our own pages (pricing.md, llms.txt, Sitges 90.78) quote **our own all-in per-km rates including the service charge**, quoted before booking. The Terms also say variations in routing do not change what you pay, but interurban fares come from road distance | High | Proposed replacement, not applied: "Journeys with an end outside the Barcelona metropolitan area are priced per kilometre from the road distance. The price, including our service charge, is quoted in full before you book and is fixed once your booking is confirmed." Counsel to confirm |
| L3 | **Who is the contracting party.** Terms: "Your contract for the journey is with that driver"; also "The price is set by us" and "We settle the journey with the licensed driver ourselves". The earlier text "we do not set fares" is removed on this branch | High | Counsel to confirm the contract structure; owner to confirm who sets the price |
| L4 | **Meter invoice.** "The official taxi meter invoice for the journey remains available from the driver on request." For a prepaid fixed-price journey it is not established that a meter invoice exists | Medium | Owner to confirm or remove |
| L5 | **No legal entity.** No company name, NIF/CIF or address anywhere; Privacy has no data controller or rights-request contact. The footer and schema fields are empty in production | High | Owner |
| L6 | **Language.** Legal texts exist only in English while customers book in ten languages | Medium | Counsel to say whether Spanish (and Catalan) versions are required; do not machine-translate |
| L7 | **"Last updated"** still shows 10 August 2026 (Terms, Privacy, Cookies) although the Terms text changed on this branch | Medium | Set on deploy |
| L8 | Refund policy: "flight cancelled outright" is refunded in full, but the Terms' Cancellation section does not mention it | Low | Add one sentence |

## 5. Unverified claims (not invented, not removed: they are the owner's to confirm)
| Claim (where) | Status |
|---|---|
| "Licensed AMB taxis" (top bar and home badge); "Every car is a licensed Barcelona taxi" (home, fleet); "Every car is inspected on the AMB's schedule and insured as a licensed taxi"; "with a working meter and the insurance the city requires" (home, fleet); "regulated taxi" (fleet) | **Confirmed by the owner (2026-11-03) and reworded; historical row.** Still no licence numbers, driver authorisations or insurance documents in the repo, and none are published |
| Child seats: "Child seats are not fitted as standard; if you need one, ask in the booking notes so the right car is assigned" (fleet, group page) | **Owner confirmed: none provided; copy fixed. This row is historical.** Previously unverified. It implies a car with a child seat can be supplied; no policy is stated. Owner must confirm availability |
| Andorra winter: "In winter the final climb can require chains or winter tyres. We assign a vehicle equipped for the conditions" (Andorra page) | **Unverified operational promise** |
| Andorra border: "Bring passports or national ID cards" | General guidance; fine but not checked against current border rules |
| Tolls | **Owner confirmed: tolls apply (policy not yet stated, see outstanding-issues.md section A).** Previously silent everywhere. No page says whether motorway tolls (AP-7, Cadí tunnel on the Andorra route) are included in the "all-inclusive" price. Customers will ask |
| Andorra and Sitges: "a fixed-price route, quoted before travel" vs "the figure above is a guide" | The pages say both. The destination figures are indicative; confirm which is binding |
| "Most booked" labels (home, Sitges) | No data behind them |
| "24/7" / "24 h booking" beside a 3-hour minimum notice | Wording to confirm |
| 24-hour availability in schema (00:00-23:59) | Owner to confirm support is staffed 24/7 |
| Driver waits in arrivals "with a name sign" and "tracks your flight"; free change "within 30 minutes of booking and until the driver sets off" | Operational promises: owner to confirm they are practice |
| Blog: AMB figures listed in section 3; Aerobús and metro fares | Unverified; need source and date |
| Payment methods: schema lists Bizum; checkout shows VISA/AMEX | Owner to confirm |

## 6. Cruise-port pages (10 languages), on the final preview
- 10 / 10 return 200, `index, follow`, canonical to their own URL, 11 hreflang tags, correct `og:locale`, one H1, titles 21-51 characters and descriptions 143-160 (Chinese 53 by width).
- In the sitemap (10 entries). Linked from the header Services menu and from the related-pages blocks of airport-to-city, city-to-airport, El Prat and group-taxi: no orphan page in the final crawl.
- Schema: Service with its own `@id`, area Barcelona, the fixed price table in the text (16 euro figures per page), BreadcrumbList (2 items), sitewide LocalBusiness/TaxiService/WebSite. No review or rating markup.
- Facts used: EUR 60 / 80 / 85, port charge EUR 10, weekend +7.5%, terminals A-E on Moll Adossat, World Trade Center priced as a city address (from `tariffs.ts` and `places.ts`).
- Not verified: the cruise lines' real terminal allocations (the page tells readers to ask their line), and that the "free change if the ship docks late" promise matches practice (it restates the existing FAQ: changes cost nothing until the driver sets off).

## 7. Booking, payment, SumUp, emails, WhatsApp, tracking: no real booking or payment was made
What was done (safe, read-only or stateless):
- `POST /api/quote` x 5 (stateless): see section 3.
- `POST /api/bookings` with an empty body: **400 `invalid_input`** listing the required fields, so validation runs before any database write, email or SumUp call. Nothing was created.
- `/book`, `/checkout`, `/find-booking`, `/contact` and the cruise page render with the booking widget; WhatsApp link `wa.me/34632414610`, `tel:+34632414610` and `mailto:bcnairporttaxi1@gmail.com` are identical on every page checked and match production.
- The branch changes **no checkout, booking, payment, SumUp, email or WhatsApp code**. Of the 55 files changed, none of those files is among them. The only API-folder change is the geocode User-Agent string; the only layout change is `og:locale`. `DEFAULT_PAYMENT_MODE` is still `FULL_PREPAID`.
- 251 web tests and 423 core tests pass (section 8).

What was **not** done and cannot be done without side effects:
- A booking, a SumUp checkout or its webhook, and the confirmation / driver emails (Resend). These are exercised only by a real booking. Recommended after deploy: you place one minimum-value booking yourself and cancel it, watching the SumUp checkout, the customer email, the admin email and the WhatsApp message.
- **Tracking**: there is **no analytics or advertising tracking installed on the site, in production or on the preview** (no gtag, dataLayer, Meta pixel or third-party script or iframe on `/en`, `/en/book`, `/en/checkout`). If you expected GA4 or Google Ads conversion tracking, it is not in this codebase, so nothing was broken by this branch and nothing is being measured.

## 8. Final production-build tests (commit `912e5a1`)
| Check | Result |
|---|---|
| Core unit/acceptance tests | 14 files, **423 passed** |
| Web tests | 10 files, **251 passed** |
| `tsc --noEmit` | clean |
| `eslint src` | clean |
| `next build` | exit 0; 20 `prisma:error` lines are build-time review queries against the local database that is not running (the reviews page falls back); Vercel's own build succeeded |
| Vercel preview build | succeeded for both pushed commits |

## 9. Needs your confirmation (the list)
1. Legal waiting clause (L1), interurban wording (L2), contracting party (L3), meter invoice (L4) and whether legal texts are needed in Spanish/Catalan (L6). Recommended: counsel reviews before production.
2. Legal entity: company name, NIF/CIF, registered address, data controller and rights contact.
3. ~~Licensed AMB taxis, insurance, inspections~~ confirmed 2026-11-03 and applied.
4. ~~Child seats~~ confirmed: not provided, applied. Still open: wheelchair access, pets, round trips.
5. **Toll policy (blocking)**: who pays, when, how the amount is known, which routes. Plus the Andorra winter-equipment promise and border documents.
6. Which price is binding for Andorra and Sitges, and whether small differences between the page "from" price and the live quote are acceptable.
7. Free waiting time and any charge after it, for city and interurban trips.
8. Whether +34 632 414 610 takes voice calls; real support hours; WhatsApp hours.
9. "Most booked" labels: keep or remove.
10. AMB regulated figures quoted in the blog, and current Aerobús and metro fares with the date checked.
11. Payment methods really accepted at checkout (Bizum, Mastercard).
12. Whether you want GA4 / Google Ads conversion tracking added (it does not exist today).
13. No reviews, ratings, addresses or credentials were invented anywhere.

## 10. Production deployment checklist (do not start until you approve)
1. Approve the items in section 9 that change copy (L1, L2, L3 wording; claims you want removed or softened). I will apply them on the branch and re-verify on a fresh preview.
2. Set the legal "Last updated" dates to the deployment date.
3. Take a note of the current production deployment (`ed8ab9b`) so it can be promoted back instantly if needed.
4. Merge `seo/full-site-optimisation` into `main` (fast-forward; it is 9 commits ahead, including this report, and `main` has not moved) and push with `git push https://bcnairporttaxi1@github.com/bcnairporttaxi1/bcnairporttaxi.git main`. Vercel builds Production.
5. Wait for the Production deployment for that SHA (not a Preview: a SHA already built as a preview is not rebuilt for production, which is why the preview branch carries real file changes).
6. Smoke test on production, from the logged-in browser (curl is blocked by the bot checkpoint): `/api/health` shows the new commit; `/en/barcelona-airport-taxi-price` shows euro amounts; `/es/cruise-port-taxi` returns 200 and `index`; `/book` step art shows EUR 50; `/sitemap.xml` has 374 URLs.
7. Place one minimum-value test booking yourself (card), confirm the SumUp checkout, the customer and admin emails and the WhatsApp message, then cancel it.
8. In Search Console (owner): submit `sitemap.xml` again and use URL Inspection > Request indexing for `/en`, `/es`, `/es/cruise-port-taxi`, `/en/cruise-port-taxi`, `/en/barcelona-airport-taxi-price`, `/es/barcelona-airport-taxi-price`.
9. Re-run PageSpeed on `/en` (mobile) and send me the numbers.
10. After 2-3 weeks, export Search Console again and compare with the 2026-10-24 export (13 clicks, about 3,300 impressions, Spanish pages 55% of impressions at average position about 80).
11. Rollback: Vercel > Deployments > the previous production deployment > Promote to Production (no code change needed).
