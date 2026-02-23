# Phase 1: Foundation

**Goal:** Next.js + Tailwind app, single page at `/`, sticky header with nav + CTAs, smooth scroll to sections. No content sections yet—just the shell so every later phase has a real app and navigation.

**Context:** Design brief (Evios Plumbing V1). Brand: dark, clean. Lead email: zad@evioshq.com. Resend for form emails. Privacy/Terms: placeholder routes.

---

## Prerequisites

- Node.js 18+ available
- This repo (EviosWebsite)

---

## Tasks

- [ ] Initialize Next.js (App Router) in this repo with TypeScript
- [ ] Add and configure Tailwind CSS (dark-friendly theme)
- [ ] Single page route: `/` — one page component that will hold all sections
- [ ] Add section IDs for smooth scroll: `#how-it-works`, `#demo`, `#integrations`, `#offer`, `#faq`, `#contact` (form)
- [ ] **Sticky header** (always visible):
  - Left: logo text **"evios"** (link to `#` or scroll to top)
  - Right: nav links — How it works, Demo, Integrations, Offer, FAQ (each `scrollIntoView({ behavior: 'smooth' })` to section)
  - Primary button: **"Book a demo"** → scroll to `#contact` (form section)
  - Secondary button/link: **"Hear a demo call"** → scroll to `#demo`
- [ ] Ensure header works on mobile (hamburger or stacked nav as needed)
- [ ] Dark, clean base styles (e.g. dark bg, light text, simple typography)

---

## Copy (header only)

| Element | Copy |
|--------|------|
| Logo | evios |
| Nav | How it works, Demo, Integrations, Offer, FAQ |
| Primary CTA | Book a demo |
| Secondary CTA | Hear a demo call |

---

## How to test

1. `npm run dev` — app runs at `http://localhost:3000`.
2. Single page loads with sticky header; no 404s.
3. Click "Book a demo" → page scrolls to form section (placeholder div with id `contact` is enough).
4. Click "Hear a demo call" → scrolls to demo section (placeholder div with id `demo`).
5. Nav links scroll to corresponding section placeholders.
6. Resize to mobile: header remains usable (no overflow, CTAs reachable).
7. Visual: dark background, clean layout, no layout shift on load.

---

## Notes

- Section targets can be empty divs with min-height for now; Phase 2+ will add real content.
- Keep existing `index.html` / `styles.css` / `script.js` in repo if desired (e.g. for reference); Next app will be the new entry (e.g. under `app/` or `src/app/`).
