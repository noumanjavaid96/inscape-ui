# InScape — Consumer Blueprint

A premium, fully-responsive front end for **InScape**, a campaign-credit
allocation platform. Members receive credits, allocate them to live campaigns
(travel, vehicles, tech and more), earn monthly *Momentum* bonuses, and follow
transparent prize draws.

The interface is a dark, editorial design system built for both web and native
mobile out of the box — a sidebar-driven desktop layout that collapses to a
bottom-nav mobile app at smaller breakpoints, with no separate codebase.

---

## Highlights

- **18 screens**, from the public landing page through the full authenticated app.
- **Responsive by construction** — one component tree adapts from a 240px desktop
  sidebar to a 68px icon rail to a fixed mobile bottom-nav.
- **Token-driven design system** — every colour, radius, shadow, font and spacing
  value comes from a single frozen source of truth (`src/design/tokens.js`).
- **Reusable component library** layered `ui → campaign → layout → auth`, so
  screens are thin compositions, not walls of inline markup.
- **Zero emoji, zero Unicode-symbol shortcuts** — every glyph is a real SVG from a
  central `Icon` set. No arrow, chevron, bolt or star characters in any rendered
  output; they are all drawn as proper icons.
- **No heavy dependencies** — no Tailwind, no CSS framework, no component library,
  no router. Just React and a disciplined inline-style system.

---

## Tech stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | React 19                                           |
| Build tool     | Vite 8                                             |
| Language       | JavaScript (JSX) — no TypeScript                   |
| Styling        | Inline style objects driven by design tokens       |
| Navigation     | State machine in `App.jsx` (history stack)         |
| Icons          | Hand-built SVG set (`components/ui/Icon.jsx`)       |
| Fonts          | Inter (UI) + Cormorant Garamond (display)          |
| Linting        | oxlint                                             |

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite, HMR)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```

The dev server prints a local URL (default `http://localhost:5173`). Resize the
window past 768px and 1024px to watch the layout shift between mobile, tablet and
desktop modes.

---

## Architecture

### Navigation

There is no router dependency. `App.jsx` holds the current screen in state and a
history stack for back-navigation. Screens receive an `onNavigate(screenId)`
callback and call it to move around. Public screens render standalone; app
screens are wrapped in `AppLayout` (which supplies the sidebar / bottom-nav).

```
App.jsx
 ├─ PUBLIC_SCREENS  → rendered bare (landing, auth, onboarding, allocate flow)
 └─ app screens     → wrapped in AppLayout (sidebar + content, or bottom-nav)
```

### Responsive strategy

A single `useBreakpoint()` hook is the source of truth for layout decisions:

| Range            | Mode    | Navigation              |
| ---------------- | ------- | ----------------------- |
| `< 768px`        | mobile  | fixed bottom nav        |
| `768 – 1023px`   | tablet  | 68px icon-only sidebar  |
| `≥ 1024px`       | desktop | 240px full sidebar      |

Within screens, the same hook toggles grid column counts, paddings and which
panels are shown (for example, the sticky allocation panel on `CampaignDetail`
becomes an inline CTA on mobile). The landing page additionally uses scoped CSS
media queries for its marketing grids.

### Design tokens

`src/design/tokens.js` exports a deeply-frozen `tokens` object — the single
source of truth for the visual language. Components destructure from it rather
than hard-coding values:

```js
import tokens from '../design/tokens';
const { colors, radius, shadow, font } = tokens;
```

| Group        | Examples                                              |
| ------------ | ----------------------------------------------------- |
| `colors`     | `bg`/`bg1…bg5`, `accent`, `info`, `success`, `warning`, `danger`, `text`/`textMuted…textGhost`, borders |
| `radius`     | `sm` 8 · `md` 12 · `lg` 16 · `xl` 20 · `xxl` 24 · `full` |
| `shadow`     | `card`, `float`, `glow`, `glowStrong`, `glowBlue`     |
| `transition` | `fast`, `base`, `slow`                                |
| `font`       | `family` (Inter), `display` (Cormorant), size + weight scales |
| `spacing`    | `xs` 4 … `huge` 48                                    |

`accentMap` maps semantic names (`orange`, `blue`, `green`, `yellow`, `red`,
`gray`) to their hex values for components like `Badge`.

---

## Component library

Components are layered so dependencies always point downward — no cycles.

### `components/ui/` — primitives

| Component     | Purpose                                                        |
| ------------- | ------------------------------------------------------------- |
| `Icon`        | Central SVG icon set. The only source of glyphs in the app.   |
| `Button`      | `primary` / `secondary` / `ghost` / `danger`, sizes `sm/md/lg`, `fullWidth`, `disabled`, `loading`, hover lift. |
| `Card`        | Base surface. `padding`, `gradient`, `accent` strip, optional hover lift, `onClick`. |
| `Input`       | Labelled dark text field with focus ring, `hint` and `error` states. |
| `Checkbox`    | Accent checkbox with `label` and optional `description`.      |
| `Badge`       | Pill with optional (pulsing) status dot; semantic colour.     |
| `Divider`     | Hairline rule, optionally with a centred label.               |
| `ProgressBar` | Animated 0–100 bar with optional label.                       |
| `Stat`        | Compact value-over-label block, three sizes.                  |
| `Logo`        | InScape monogram + wordmark, three sizes, `showText` toggle.  |

### `components/campaign/` — domain

| Component        | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| `CampaignCard`   | Campaign tile in three sizes (`sm` dashboard, `md` grid, `lg` hero). |
| `StatusPill`     | `LIVE` / `CLOSING SOON` / `UPCOMING` / `CLOSED` with correct colour + pulse. |
| `MomentumWidget` | Monthly Momentum tracker with the 25/50/75/100% milestone ladder. |

### `components/layout/` — page scaffolding

| Component    | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| `PageHeader` | Title / subtitle block with optional back button + actions. |
| `Section`    | Titled content section with an optional right-side action. |
| `EmptyState` | Centred icon + copy + action placeholder.                 |

### `components/auth/`

| Component   | Purpose                                                      |
| ----------- | ----------------------------------------------------------- |
| `AuthShell` | Centred dark auth layout (logo, ambient glow, card) shared by Sign Up and Login. |

### App chrome

| Component   | Purpose                                                    |
| ----------- | --------------------------------------------------------- |
| `Sidebar`   | Desktop / tablet navigation (full or icon-only).          |
| `BottomNav` | Mobile bottom tab bar.                                     |
| `AppLayout` | Picks sidebar vs bottom-nav based on breakpoint.          |

---

## Screen inventory (18)

**Public / onboarding**

1. `PublicHome` — marketing landing page (hero, live campaigns, how-it-works, stats, membership, CTA, footer).
2. `SignUp` — two-step account creation with consents.
3. `Login` — email/password + social sign-in.
4. `Welcome` — post-signup welcome and credit grant.
5. `Onboarding` — four-slide product tour.

**Core app**

6. `Dashboard` — balance hero, active campaigns, Momentum, quick actions, recent activity.
7. `Campaigns` — browse / filter all campaigns.
8. `CampaignDetail` — full campaign view with sticky allocation panel.
9. `MyCampaigns` — active and past participations.

**Allocation flow**

10. `Allocate` — credit-quantity stepper and summary.
11. `AllocationSuccess` — confirmation with reference and Momentum earned.

**Wallet & growth**

12. `Wallet` — balance and transaction history.
13. `Boost` — one-time credit top-up packages.
14. `Membership` — Entry / Premium / Elite plan comparison.
15. `Offers` — partner offers (codes and tracked links).
16. `Referral` — referral code, rewards explainer and invite tracker.

**Account**

17. `Profile` — member summary, stats and settings menu.
18. `Notifications` — activity feed.

---

## Project structure

```
src/
├─ App.jsx                  # screen state machine + router
├─ main.jsx                 # React entry
├─ index.css                # fonts, resets, livePulse keyframe, scrollbar
│
├─ design/
│  └─ tokens.js             # frozen design tokens (single source of truth)
│
├─ hooks/
│  └─ useBreakpoint.js      # responsive breakpoint hook
│
├─ layouts/
│  └─ AppLayout.jsx         # sidebar vs bottom-nav shell
│
├─ components/
│  ├─ ui/                   # primitives (Button, Card, Icon, Input, …)
│  ├─ campaign/             # CampaignCard, StatusPill, MomentumWidget
│  ├─ layout/               # PageHeader, Section, EmptyState
│  ├─ auth/                 # AuthShell
│  ├─ Sidebar.jsx
│  └─ BottomNav.jsx
│
└─ screens/                 # the 18 screens
```

---

## Conventions

- **No emoji or symbol glyphs.** Every icon is an SVG from `components/ui/Icon.jsx`.
  Add new glyphs there rather than pasting characters into JSX. A middle-dot
  separator and the numeric-stepper minus are the only typographic marks used,
  and both are intentional.
- **Approved terminology only.** The brand bans gambling language. Do **not** use
  *Entries, Buy Entries, Lottery, Raffle, Jackpot, Giveaway, Bet, Wager, Deals*.
  Use the neutral, globally-understood vocabulary instead:
  - The product is a **Campaign**.
  - The currency is **Credits** (a.k.a. Campaign Credits).
  - The action is **Join** / **Join Campaign** (you *join with credits*).
  - The participation count is **participants** (e.g. "4,821 participants").
  ("Entry" is allowed **only** as a membership tier name: Entry / Premium / Elite.)
- **No magic values in screens.** Pull colours, radii, shadows and fonts from
  `tokens`. If you need a new value, add it to the token set.
- **Screens compose, components contain.** A screen should read as a layout of
  library components plus its own data; visual primitives live in `components/`.
- **One breakpoint hook.** Use `useBreakpoint()` for responsive logic instead of
  ad-hoc `window.innerWidth` checks.
- **Accessibility & motion.** Animations respect `prefers-reduced-motion`
  (see `index.css`); decorative SVGs are `aria-hidden`.

---

## Design language

- **Surface palette** — near-black `#050505` base layered up through five subtle
  greys for depth.
- **Accent** — InScape orange `#FF8000`, with `info` blue, `success` green and
  `warning` yellow for semantic states.
- **Type** — Inter for UI text; Cormorant Garamond for display headings and
  prize titles, giving the product its editorial, premium feel.
- **Motion** — restrained: hover lifts, a single `livePulse` keyframe for LIVE
  status dots, and smooth scroll between screens.
