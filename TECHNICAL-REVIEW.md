# Technical review

Written as the person who would still be maintaining this in five years. It is
deliberately a list of objections, so it reads more negatively than the state of
the codebase warrants — the things that work are not repeated here.

Ordered by what would hurt most, soonest.

---

## 1. You are holding other people's money

**This is the one to get advice on before launching.**

Full-prepaid rides collect the fare from the passenger and hold it until a
driver withdraws it. That is not a booking fee — it is funds belonging to
someone else, sitting in a company account for an unbounded period. In the EU
that pattern is what payment-institution and e-money rules exist to govern, and
"we are only a booking site" stops being a defence at the point money is held
rather than passed through.

Nothing in the code caps it. There is no ceiling on the aggregate balance, no
segregation of held funds, and no maximum time before payout.

The cheap way out, if the advice is unfavourable: drop full prepay and take
only the booking fee. The pricing engine already supports fee-only as a first-
class mode, so this is a configuration decision, not a rewrite. **Ask an
advisor before spending more engineering on the prepaid path.**

## 2. The routing and geocoding are free public instances

`nominatim.openstreetmap.org` and `router.project-osrm.org` are volunteer-run
demo servers. Their usage policies prohibit exactly what a commercial booking
site does. Two consequences:

- They can block our IP with no notice and no appeal, at which point **nobody
  can get a price and the site stops taking bookings.** Not degraded — stopped.
- There is no availability commitment. A quiet Sunday outage is unremarkable to
  them and total to us.

I added rate limits, which keeps us inside their policy for casual traffic and
does nothing about the underlying dependency. The fix is a paid geocoding and
routing provider, or self-hosted OSRM. **This is the highest-probability cause
of a first outage.**

## 3. There is a refund policy but no refund mechanism

The Terms, the refund page and a landing page all promise that the booking fee
is refunded on cancellation, no-show, or when no driver can be assigned. The
`PaymentStatus` enum has a `REFUNDED` value.

Nothing in the codebase can set it. Every refund is somebody logging into SumUp
by hand, and the database will not reflect it. That is a published commitment
the software cannot keep, and it will be discovered by a customer rather than
by us.

Either build the refund path or change the published policy. Making a promise
in the Terms that the system cannot execute is the worse of the two.

## 4. One admin account, one password, no second factor

The admin panel can read every passenger's name, phone, email and travel
history, suspend accounts and approve payouts. It is protected by a single
password on a single Gmail address, with no second factor and no audit of
sign-ins.

`AuditLog` records what admins *do*, which is good, and nothing records who
*is*. For the number of admins involved, TOTP is a small amount of work and the
single largest reduction in blast radius available.

## 5. Guest checkout with unverified contact details

Anyone can book with any phone number. Rate limiting caps volume; it does
nothing about a booking with a mistyped or fabricated number, which surfaces as
a driver at a kerb with nobody to call.

The counter-argument is real: forcing registration before a price would cost
conversions, and this is a business where people book once. A middle option is
verifying the number only at the point of booking rather than of browsing.
Worth a decision either way — right now it is a default rather than a choice.

## 6. Polling has a visible ceiling

Every open trip page polls twice every six seconds. At ten concurrent trips
that is ~200 requests a minute, which is nothing. At three hundred it is 6,000
a minute against a serverless function that opens a database connection each
time, and Neon's connection ceiling arrives before the request ceiling does.

The decision was right for today and it is not a decision that ages well
silently — it degrades all at once. **Revisit at around 100 concurrent trips.**
The change is server-sent events, not a full websocket tier.

## 7. Rate limiting is per-instance

`lib/rate-limit.ts` holds counters in process memory. On serverless each
instance counts separately, so the effective limit is the nominal one
multiplied by however many instances are warm. It stops one script from one
address, which is the realistic threat, and would not stop a distributed one.

Deliberate, documented in the file, and the fix is a shared store when there is
a reason to add one.

## 8. Ten languages is a permanent tax nobody has priced

Every piece of customer-facing copy now exists ten times. Adding a sentence to
the FAQ is ten edits, and the nine translations were produced by me rather than
a native speaker.

The reach is real. The cost is that content changes get avoided because they
are tedious, and the site slowly goes stale in nine languages at once. If
traffic is concentrated in three or four, dropping the tail would make the rest
better maintained. **Check analytics before adding a tenth thing to translate.**

---

## Questions I cannot answer from the code

1. **Is the prepaid model legally cleared?** Everything in item 1 turns on this.
2. **What is the expected concurrency?** Ten trips a day and a hundred are
   different systems, and items 2 and 6 have different urgency at each.
3. **Who operates this day to day?** The admin panel assumes someone watching
   the "new" bucket. If nobody is, rides need auto-assignment instead.
4. **Are the drivers employees or contractors?** It changes what the payout
   ledger has to record and how long it must be kept.
5. **Which languages actually convert?** See item 8.

## What I would not change

The pure-module boundary. The tariff table as one source of truth. Storing
every component of a quote rather than the total. Recomputing price server-side
and never trusting the client. Two-way ratings with a moderation gate. These
are the parts that will still look right in five years.
