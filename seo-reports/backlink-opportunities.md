# Backlink opportunities and link-building plan

Prepared 2026-11-03 by the `seo-backlinks` agent, plus the `seo-flow` plan. Nothing was contacted, purchased
or submitted. Everything below is a plan for the owner to approve.

## What could and could not be measured

| Source | Status |
|---|---|
| Common Crawl web graph (release cc-main-2026-jan-feb-mar, domain level) | Queried. bcnairporttaxi.es is **not in the graph** (expected: the site was first indexed 2026-09-03, after the release). This is not evidence of zero links. |
| Moz API | **Not configured** (free key: 2,500 rows/month) |
| Bing Webmaster Tools | **Not configured** (site not verified) |
| DataForSEO | **Not available** |
| Google Search Console "Links" report | **No access** — best free source of real referring domains |

Backlink Health Score: **insufficient data** (fewer than 4 factors measured). No score, referring-domain count
or anchor profile is reported, because none could be measured honestly.

Own-site observation from the crawl: no page links out to any external domain.

## Competitors seen in results (2026-11-03)

taxiaeropuerto.barcelona, taxibarcelona.taxi, barcelonataxi.org, taxibcnaeropuerto.com, taxiaeropuertobcn.com.
Only the first was in the Common Crawl graph (PageRank ~4.2e-9, harmonic rank ~17.2M), i.e. the niche is itself
low-authority. Several competitors market "official tariffs"; our fixed-price positioning is a genuine difference
worth explaining in a guide. Marketplaces (mytransfers, kiwitaxi, suntransfers, jamtransfer, welcomepickups) and
informational guides (barcelona-tourist-guide.com, felicesvacaciones.es, airmundo.com) hold most first-page positions
for the head terms.

## Plan (legitimate, earned links only)

**Priority 1: link-worthy assets that already exist or are one step away**
1. `/blog/how-much-is-a-taxi-from-barcelona-airport` and `/pricing` as the neutral reference on "rank meter vs fixed
   price". Needs sourced, dated figures (AMB/Ajuntament pages) before pitching. Must never claim to be the regulated tariff.
2. `/blog/taxi-or-aerobus-from-barcelona-airport` and the T1/T2 guide: add the current Aerobús and metro fares with
   source and date (owner to confirm), then pitch to expat, digital-nomad and cruise communities.
3. Destination pages (Sitges, Montserrat, Girona, Costa Brava, La Roca Village) as "getting there from BCN" notes for
   local tourism pages.
4. New `/cruise-port-taxi` page (shipped on branch `seo/full-site-optimisation`): cruise forums and port-day guides.

**Priority 2: earned or manual placements, each needing real relevance**
- Hotel and apartment partners listing us as the airport-transfer option (`/hotel-transfers` exists for this).
- Town and tourism-board "how to get here" pages for Sitges, Lloret, Tossa, Cadaqués, Girona, Tarragona.
- Genuine answers on travel forums (disclose affiliation; nofollow is fine). Do not seed links.
- Business listings, **blocked until the legal entity and address exist**: Google Business Profile, Bing Places, Apple
  Business Connect, Páginas Amarillas, Cylex, Yelp, Tripadvisor, Foursquare, Cámara de Comercio de Barcelona. Name,
  address and phone must be identical everywhere.

**Priority 3: digital PR** — an original, defensible data piece (e.g. fixed-price vs rank-taxi cost on 20 common
routes, refreshed quarterly) for Spanish travel and consumer outlets. Only if the data is real.

**Avoid:** private blog networks, bought links, comment/forum spam, link exchanges, fake reviews.

## Cheapest next step to get real data
1. Verify the site in Bing Webmaster Tools and Google Search Console (owner).
2. Add a free Moz key to `~/.config/claude-seo/` and re-run `/seo backlinks`.
