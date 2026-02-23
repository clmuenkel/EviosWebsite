# Phase 2: Hero + Trust Bar

**Goal:** Add Hero and Trust Bar sections with exact design-brief copy. Dark, clean. CTAs scroll to form and demo. No new backend.

**Context:** Design brief §2 (Hero), §3 (Trust Bar). Primary CTA → form; secondary → demo.

---

## Prerequisites

- Phase 1 done (Next.js + Tailwind, sticky header, section IDs, smooth scroll).

---

## Tasks

- [ ] **Hero section** (first content block below header):
  - Headline: **Stop losing plumbing jobs to missed calls.**
  - Subhead: **Evios is an AI plumbing receptionist that answers calls 24/7, books jobs, rescues estimates with automated follow-up, and triggers 5-star reviews after completion. Installed in 7 days. Free for 30 days. If it's not a win, you pay $0.**
  - Three hero bullets (list):
    1. **Books plumbing jobs while you're on-site**
    2. **Texts back missed calls in under 60 seconds**
    3. **Follows up on estimates until yes/no**
  - Primary CTA button: **Book a demo** → scroll to `#contact`
  - Secondary CTA (link style): **Hear a demo call** → scroll to `#demo`
  - Microcopy below CTAs: "No contract to start. Keep your current phone system."
- [ ] **Trust bar** (directly below hero):
  - Row of 4–5 chips (no logos). Copy:
    1. Works with your current phone system
    2. After-hours + overflow coverage
    3. Emergency routing (leaks, no water, sewer backup)
    4. Call summaries + transcripts
    5. Setup in 7 days
- [ ] Responsive: hero and trust bar readable and tappable on mobile; chips wrap if needed.
- [ ] Dark, clean styling consistent with Phase 1.

---

## Copy (verbatim from design brief)

**Hero headline:** Stop losing plumbing jobs to missed calls.

**Hero subhead:** Evios is an AI plumbing receptionist that answers calls 24/7, books jobs, rescues estimates with automated follow-up, and triggers 5-star reviews after completion. Installed in 7 days. Free for 30 days. If it's not a win, you pay $0.

**Hero bullets:** Books plumbing jobs while you're on-site | Texts back missed calls in under 60 seconds | Follows up on estimates until yes/no

**Hero microcopy:** No contract to start. Keep your current phone system.

**Trust chips:** Works with your current phone system | After-hours + overflow coverage | Emergency routing (leaks, no water, sewer backup) | Call summaries + transcripts | Setup in 7 days

---

## How to test

1. Hero is first content; headline and subhead match spec.
2. All three bullets and both CTAs present; "Book a demo" scrolls to form section, "Hear a demo call" to demo section.
3. Microcopy visible below CTAs.
4. Trust bar shows five chips; no fake logos; wraps on small screens.
5. Mobile: no horizontal scroll; text readable; buttons have adequate touch targets.
