# Phase 8: SEO + Polish

**Goal:** SEO meta tags (title, description, OpenGraph), any final responsive/mobile polish, and ensure lead email and env are documented and used.

**Context:** Design brief tech requirements (SEO). Lead email: zad@evioshq.com. Dark, clean. No new sections.

---

## Prerequisites

- Phases 1–7 done. Form sends to zad@evioshq.com via Resend.

---

## Tasks

- [ ] **SEO (App Router):**
  - Title: **Evios | AI Plumbing Receptionist That Books Jobs**
  - Meta description: plumbing-focused, ~155 chars (e.g. "AI plumbing receptionist that answers calls 24/7, books jobs, and rescues estimates. Free 30-day trial. For small plumbing shops.")
  - OpenGraph: `og:title`, `og:description`, `og:type`, optional `og:image` if you have a share image.
- [ ] **Documentation:**
  - `.env.example` (or README) lists: `LEADS_TO_EMAIL`, `RESEND_API_KEY` (or `EMAIL_PROVIDER_API_KEY`). Do not commit real keys.
- [ ] **Polish:**
  - Quick pass: all sections have sensible spacing; no layout shift on load; CTAs visible and scroll targets correct.
  - Mobile: no horizontal scroll; touch targets adequate; text readable.
  - Optional: `prefers-reduced-motion` for animations (design brief doesn’t require it but good practice).
- [ ] Confirm no placeholder like "LEADS_EMAIL_PLACEHOLDER" remains in code; use `LEADS_TO_EMAIL` and zad@evioshq.com in docs.

---

## Copy

**Title:** Evios | AI Plumbing Receptionist That Books Jobs

**Meta description (example):** AI plumbing receptionist that answers calls 24/7, books jobs, and rescues estimates with follow-up. Free 30-day trial. Built for small plumbing shops. Integrates with ServiceTitan, Jobber, Housecall Pro.

---

## How to test

1. View page source or use "Inspect" → `<title>` and meta tags present and correct.
2. Share link in Slack/Discord/Twitter: OpenGraph title and description show as expected (if og:image omitted, card may show without image).
3. Run Lighthouse (or similar) for performance and accessibility; fix any critical issues if time allows.
4. Full scroll through page on mobile and desktop: no broken links, no overflow, CTAs work.
5. `.env.example` or README documents required env vars; no secrets in repo.
