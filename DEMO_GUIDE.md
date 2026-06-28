# InScape — Demo Guide & Feature Logic

A plain-English reference for demoing the InScape prototype: what every feature
is, the logic behind it, how it would be populated by a real backend, and what
is currently real vs. mocked. Read the **"Reality check"** section before the
demo so you never over-promise.

---

## 1. What InScape is (the one-liner)

> InScape is a **premium US membership platform**. Members hold **Credits** and
> use them to **Join** prize **Campaigns** (luxury cars, travel, tech, cash) and
> to unlock members-only **Partner Offers**. One membership, three kinds of value:
> prize campaigns, partner discounts, and ongoing member rewards.

**Vocabulary (use these exact words — they're deliberately neutral/global):**

| Term | Meaning |
|------|---------|
| **Credits** | The in-app currency. You get some free, earn more, or buy top-ups. |
| **Join** | Entering a campaign by spending Credits (we never say "buy entries"). |
| **Campaign** | A single prize draw (a car, a trip, cash, etc.). |
| **Participants** | The people who have joined a campaign. |
| **Allocation** | One unit of participation in a campaign (you can add more). |
| **Momentum** | A monthly engagement score that pays bonus Credits (see §4). |
| **Tiers** | Entry / Premium / Elite membership levels. |

Words we **never** use: entries, buy entries, lottery, raffle, jackpot,
giveaway, bet, wager, deals.

---

## 2. How the model works (the business logic)

1. **You become a member** (free to start, or a paid monthly tier).
2. **You receive Credits** — 3 free on signup, then monthly Credits from your
   tier, plus top-ups and bonuses.
3. **You spend Credits to Join campaigns.** Each campaign has a cost per
   allocation (1–2 Credits). Add more allocations to increase participation.
4. **At campaign close, a winner is drawn** transparently (independently
   witnessed/audited in the real product).
5. **Membership keeps paying back** every month via partner discounts, Momentum
   bonuses, and referral rewards — so the value compounds whether or not you win.

Revenue = monthly membership subscriptions + Credit top-ups. The partner offers
make the membership "pay for itself," which is the retention hook.

---

## 3. Screen map & what each does

### Public (logged-out)
- **Landing (`PublicHome`)** — marketing site: hero, live campaigns (with an
  Airbnb-style category filter), partner offers, real winners, how-it-works,
  membership tiers, FAQ-style sections. CTAs push to sign-up / sign-in.
- **Sign up** — 2 steps: details → consents (age/US-resident, official rules,
  terms). Grants 3 free Credits. Carries the member's name into the welcome
  splash.
- **Sign in** — email + password (or Google/Apple buttons, currently visual).
  Derives a first name from the email for the welcome splash.
- **Welcome → Onboarding** — a short, animated explainer of Credits, campaigns,
  Momentum and referrals, ending in the dashboard.
- **Brand splash** — the InScape reveal that plays before the dashboard,
  now personalised ("Welcome, *{name}*").

### Member (logged-in, left sidebar / mobile bottom-nav)
- **Dashboard** — balance, your active campaigns, Monthly Momentum, quick
  actions, recent activity. Has three variants: `free`, `member`, `past-due`.
- **Campaigns** — browse/filter all campaigns (category, sort, Live/Upcoming/
  Past tabs), live countdowns, "% allocated".
- **Campaign detail** — full prize info, rules/eligibility, countdown, sticky
  "Join" panel.
- **My Campaigns** — the campaigns you've joined and your allocations.
- **Wallet** — Credit balance + full ledger (earned/spent), top-up entry.
- **Boost** — buy a Credit top-up (with a simulated checkout).
- **Membership** — view/upgrade tiers (with a simulated checkout).
- **Membership manage** — renewal status, change plan, cancel, resume, past-due.
- **Referrals** — your invite code, invited/qualified counts, rewards.
- **Partner Offers** — members-only brand discounts (promo code / tracked link).
- **Winners** — recent winners gallery.
- **Insights** — your activity/Momentum over time (simple charts).
- **Notifications / Support** — alerts, and a support entry with reference IDs.

---

## 4. Monthly Momentum — the feature you asked about

**What it is:** a **monthly engagement score from 0–100%** that rewards members
for staying active. It is the "keeps giving back every month" mechanic and the
main retention loop. Think of it as a loyalty/streak meter, not a prize odds bar.

**The logic (how the % is meant to be calculated):**

```
Momentum%  =  min(100,  (this month's participation  ÷  monthly target) × 100)
```

- **"Participation this month"** = the Credits you've allocated to campaigns
  since the 1st of the current month (the natural activity signal), **plus**
  engagement bonuses such as qualified referrals (+40 each).
- **"Monthly target"** = the activity level we expect for a full bar. It can be
  flat (e.g. 100 Credits) or scaled to the member's tier.
- It **resets to 0% on the 1st of each month** (the widget shows "Resets 14d" =
  days until reset).

**The reward ladder (the "up to 90 Credits/month"):** crossing each milestone
grants bonus Credits automatically, once per month:

| Milestone | Bonus Credits |
|-----------|---------------|
| 25%       | +10 |
| 50%       | +20 |
| 75%       | +25 |
| 100%      | +35 |
| **Total** | **+90 / month** |

(The dashboard shows the next reward, e.g. *"Next: +25 cr at 75%"*, and the
25/50/75/100 ladder.) When a milestone pays out, it posts to the wallet as a
ledger line — you can already see an example in **Recent Activity**:
*"Momentum reward · 50% +20."*

**How it would be populated by a real backend:**
- A nightly (or on-event) job aggregates the member's allocation + referral
  events for the current month, divides by their target, and writes the
  `momentum_pct`.
- When the pct crosses a milestone not yet rewarded this month, it credits the
  wallet and records a "Momentum reward" transaction.
- On the 1st, it resets the month's counters.

**Current prototype state:** the value is **hard-coded** for the demo —
`MomentumWidget value={62} nextReward="+25 cr" nextThreshold={75} resets="14d"`
in `Dashboard.jsx`. Nothing computes it yet; it's a UI placeholder ready to be
wired to the formula above.

**If a stakeholder says "this doesn't make sense":** explain it as a
gamified monthly loyalty meter — spend/engage during the month, hit 25/50/75/100%,
get bonus Credits, resets monthly. It exists to drive repeat engagement, not to
represent win probability.

---

## 5. The other numbers, and how they'd be populated

Everything below is **illustrative mock data** in the prototype. Real values come
from the noted source.

| Thing | Where it shows | Real source |
|-------|----------------|-------------|
| Credit balance ("124 Credits") | Dashboard, Wallet, sidebar | Wallet ledger sum |
| "% allocated" on a campaign | cards, hero, detail | allocations ÷ campaign cap |
| Countdown timers | cards, detail | campaign `closesAt` timestamp (this is **real/live** in the UI) |
| Participants count | cards | distinct members who joined |
| "In play / Bonus earned / Next Credits" | dashboard balance card | open allocations / month's bonuses / billing date |
| Referral "4 invited · 1 qualified" | dashboard, referrals | referral records |
| Stats on landing (50,000+, $20M+, 4.8/5) | landing | marketing/analytics — currently placeholders |
| Past winners (name, city, prize) | landing, Winners | draw results |
| Tier pricing (14.99 / 19.99 / 24.99) | landing, Membership | billing config |

---

## 6. Suggested 5-minute demo script

1. **Landing** — scroll the hero (brand still + live campaign card), the
   category filter on "Campaigns open now", partner offers ("membership that
   pays for itself"), winners, tiers. *Message: one membership, three kinds of
   value.*
2. **Sign up** — fill the form, accept consents, claim **3 free Credits**.
3. **Welcome / Onboarding** — quick swipe through, hit "Enter InScape".
4. **Personalised splash** — point out *"Welcome, {name}"*.
5. **Dashboard** — balance, your campaigns, **Monthly Momentum** (explain §4),
   quick actions, recent activity.
6. **Campaigns → a campaign → Join** — show the countdown, "% allocated", and
   the Join/allocate flow (simulated checkout).
7. **Wallet** — show the ledger; **Boost** — show a top-up checkout.
8. **Membership manage** — show change/cancel/past-due states.
9. **Referrals / Partner Offers / Winners** — quick tour of the retention loops.

---

## 7. Reality check — what's real vs. mocked (read this!)

**This is a front-end prototype.** It demonstrates the full product UI and every
user journey, but there is **no backend yet**. Specifically:
- **Data is mocked** — campaigns, balances, winners, stats are illustrative.
- **Payments are simulated** — checkouts have review → processing → success/
  failed states (and a "simulate a declined card" demo toggle), but no real
  charge happens.
- **Draws are not run** — winners are sample data; no selection engine yet.
- **Momentum / Credits / referrals are not computed** — the screens are wired
  for those values but a backend must populate them.
- **What IS real:** the complete responsive UI, navigation, all 12 documented
  flows incl. payment/recovery/lifecycle states, live countdown timers,
  accessibility (keyboard nav, reduced-motion), and the brand system.

Good framing for Monday: *"This is the full clickable product and every screen/
flow the platform needs. The next phase wires it to a backend (auth, billing,
the Credit ledger, the draw engine, and the Momentum/referral jobs)."*

---

## 8. Open product decisions (worth aligning on)

- **Momentum target** — flat, or scaled per tier? And exact reward amounts.
- **Allocation cap per campaign** — drives the "% allocated" bar; needs a real number.
- **Draw mechanics & compliance** — selection method, witnessing, official rules
  per US state.
- **Theme scope** — the public landing is light/editorial; the signed-in app is
  still dark. Decide whether to bring the app to light too.
- **Imagery hosting** — prize photos should move to your Cloudinary (or the repo)
  for guaranteed loading, like the hero still does now.
