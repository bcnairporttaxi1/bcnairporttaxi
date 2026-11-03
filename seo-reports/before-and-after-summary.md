# Before and after

"Before" = live production, crawled 2026-11-03. "After" = local production build of branch `seo/full-site-optimisation` (5 commits, 47 files, +1,866 / -202 lines). The branch is not deployed. No SEO score and no ranking forecast is given: neither can be measured honestly without Search Console and field data.

| Measure | Before | After |
|---|---|---|
| URLs crawled / indexable | 451 / 375 | 461 / 385 |
| Languages with a cruise-port page | 0 | 10 |
| Pages whose text shows the fixed price table | `/pricing` only | `/pricing` + price page + airport-to-city + city-to-airport + el-prat + cruise-port (all locales) |
| Euro amounts in the text of `/en/barcelona-airport-taxi-price` | 0 | 6 |
| Home copy calling the price "regulated" / "real tariff" | 10 locales | 0 (guard test added) |
| `og:locale` valid for Open Graph | 0 of 10 locales | 10 of 10 |
| Destination pages whose Service schema names the destination and quoted price | 0 | 12 destinations x 10 locales |
| Inbound internal links to the 3 guides + FAQ | 1-2 each | every landing page (13+) |
| Cached images / icons | revalidate every visit | 1 day + stale-while-revalidate |
| Pages with a text/markdown twin advertised | 0 | /pricing |
| Spanish usted/tú mix on pricing, FAQ, fleet | mixed | tú (31 edits); "precio fijo" used consistently |
| Orphan pages | 0 | 0 |
| Broken internal links | 0 | 0 |
| Metadata out of range / missing H1 | 0 / 0 | 0 / 0 |
| Tests | core 422, web 167 | core 423, web 168 |

## Not measurable here (so not claimed)
Rankings, impressions, clicks, Core Web Vitals field data, backlink counts, and the Lighthouse effect of the branch (the earlier mobile score improved 89 -> 93 after inline CSS; the owner's re-run after the later change is pending).
