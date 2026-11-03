# Performance report

Lab data only. **No field data**: the PageSpeed Insights API quota was exhausted and there are no CrUX / Search
Console credentials. Lab numbers on this machine are noisy and lower than the owner's PageSpeed runs; compare relative
numbers only.

## What changed this month
| Date | Change | Evidence |
|---|---|---|
| 2026-10-28 | `experimental.inlineCss: true` (removes 3 render-blocking stylesheets) | Throttled slow-4G / 4x CPU test, cache disabled: first paint ~4.4 s -> ~0.8-0.9 s, hero paint ~4.4 s -> ~1.0-1.1 s. Owner PageSpeed mobile 89 -> 93 (before this change was live: it was deployed afterwards) |
| this branch | WhatsApp button lifts with `transform` instead of animating `bottom` | Lighthouse flagged "1 non-composited animation": it was `a.fab` (bottom transition), not the hero blobs |
| this branch | `/img/*` and `/icons/*` cached 1 day + stale-while-revalidate (were `max-age=0, must-revalidate`) | `technical` agent header check |

## Open items (ranked)
1. **LCP render delay** (~1.9 s on /en with the 15 KB hero image arriving at ~0.37 s): the main thread is busy, not the network. An 848 ms task is attributed to the HTML document. Not yet identified — needs a throttled DevTools trace. Candidates: HTML + inline CSS parse, laying out the very tall mobile hero, blur filters.
2. **Unused JS (~21-27 KiB) and legacy JS (14 KiB)** are in one chunk, likely framework code. Run `next experimental-analyze` before touching anything; if app code is in it, lazy-load below-the-fold client components with SSR kept.
3. **Heavy HTML**: /en is ~500 KB uncompressed (~260 KB RSC payload + ~118 KB inline CSS). Trimming props passed to client components is the lever.
4. **CLS 0.184 on one Sitges run** (0.024 on the other): unattributed; check the heading font swap.
5. Link prefetching competes with images at ~1.3 s; `prefetch={false}` on secondary links is low risk.

## Deliberately not done
- Preloading the heavy fonts (measured earlier: LCP 3.2 -> 3.8 s).
- Recompressing the hero (already ~15 KB) or removing visual features without a measured gain.
