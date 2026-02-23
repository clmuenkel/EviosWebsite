# Phase 7: Form + API + Footer

**Goal:** Final CTA + embedded lead form, Next.js API route `/api/lead` that sends email via Resend to zad@evioshq.com, honeypot + rate limit, and footer with Privacy/Terms placeholders.

**Context:** Design brief §11 (Form), §12 (Footer). Tech: Resend, env `LEADS_TO_EMAIL` = zad@evioshq.com, `RESEND_API_KEY` (or design brief’s `EMAIL_PROVIDER_API_KEY`). Privacy/Terms: placeholder routes.

---

## Prerequisites

- Phases 1–6 done. Section id `#contact` for form. Resend account (API key for sending).

---

## Tasks

- [ ] **Final CTA + Form section** (id `contact`):
  - Headline: **Want to hear it handle your exact plumbing calls?**
  - Subhead: "Book a demo and we'll show you the call flow, the follow-up engine, and what setup looks like for a small plumbing shop."
  - Form fields:
    - Full name (required)
    - Company name (required)
    - Website (optional)
    - Email (required)
    - Phone (required)
    - What software do you use? (dropdown: ServiceTitan, Jobber, Housecall Pro, Other, None)
    - Message (optional)
  - Hidden honeypot field (e.g. `website_url` or `company_website` that humans leave empty; bots often fill it).
  - On submit: POST to `/api/lead`; show success state: "Got it. We'll reach out shortly." Disable double submit.
- [ ] **API route** `app/api/lead/route.ts` (or `pages/api/lead.ts` if using Pages Router):
  - Accept POST with JSON body (all form fields).
  - Validate required fields; reject invalid payloads with 400.
  - Honeypot: if honeypot field is filled, return 200 but do not send email (silent drop).
  - Rate limit: lightweight per-IP (e.g. 5 submissions per 15 min) to avoid abuse.
  - Send email via Resend to `LEADS_TO_EMAIL` (zad@evioshq.com). Include form data in body (name, company, email, phone, software, message, website).
  - Env: `LEADS_TO_EMAIL`, `RESEND_API_KEY` (or `EMAIL_PROVIDER_API_KEY`).
  - Return 200 on success, 429 on rate limit, 500 on send failure.
- [ ] **Footer**:
  - © Evios
  - Link: Privacy → `/privacy` (placeholder page OK)
  - Link: Terms → `/terms` (placeholder page OK)
  - Contact email (e.g. zad@evioshq.com or contact@evioshq.com — use same as lead or specify)
- [ ] Placeholder pages: `/privacy` and `/terms` with minimal content (e.g. "Privacy policy coming soon" / "Terms of use coming soon") so links don’t 404.

---

## Copy (verbatim)

**CTA headline:** Want to hear it handle your exact plumbing calls?

**CTA subhead:** Book a demo and we'll show you the call flow, the follow-up engine, and what setup looks like for a small plumbing shop.

**Success message:** Got it. We'll reach out shortly.

**Footer:** © Evios | Privacy | Terms | Contact email

---

## Env vars

- `LEADS_TO_EMAIL=zad@evioshq.com`
- `RESEND_API_KEY=re_...` (from Resend dashboard)

---

## How to test

1. Form: all fields render; required validation works; dropdown has correct options; honeypot hidden.
2. Submit valid form: success message appears; no duplicate sends on double-click.
3. Check inbox zad@evioshq.com: email received with form data.
4. Honeypot: submit with honeypot filled → no email sent; optional: still show success to avoid signaling.
5. Rate limit: after N submits from same IP, next submit returns 429 or friendly message.
6. Footer: Privacy and Terms link to `/privacy` and `/terms`; no 404. Contact email correct.
7. Mobile: form usable; buttons and inputs tappable.
