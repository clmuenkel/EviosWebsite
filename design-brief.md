# CURSOR BUILD SPEC: Evios Plumbing Website (V1)

Cool. Here's an **explicit, Cursor-ready spec** you can paste in and have it generate the site fast. It's plumbing-first, embedded form, small shops, and "integrates with ServiceTitan/Jobber/Housecall Pro."

I'm going to keep the "proof" parts **ethical**: you can use *simulated/demo* calls and screenshots as long as they're labeled as examples.

---

## Goal

Build a 1-page, high-converting marketing site for **Evios** focused on **small plumbing companies** (1–10 trucks). Primary conversion is **embedded "Book a demo" lead form** that emails the team when submitted.

### Primary CTA

"Book a demo" (scrolls to embedded form section)

### Secondary CTA

"Hear a demo call" (scrolls to demo audio/transcript section)

### Site structure (single page)

Sections, in this exact order:

1. Sticky Header
2. Hero
3. Trust Bar (no fake logos)
4. Pain/Outcome section (plumbing-specific)
5. 3 Pillars (Voice + Follow-up + Reviews/Referrals)
6. Demo section (simulated call recordings + transcript UI)
7. Integrations section (ServiceTitan/Jobber/Housecall Pro + "keep your stack")
8. Offer / Risk Reversal (free discovery + free install + free 30 days + $0 if no value)
9. How it Works (7-day implementation timeline)
10. FAQ
11. Final CTA + Lead Form
12. Footer

---

## DESIGN RULES

* Tone: direct, confident, blue-collar friendly. No corporate fluff.
* Visual style: clean modern SaaS, but with "home services" cues (subtle plumbing iconography OK).
* Mobile-first. CTA always accessible.
* Repeated CTA buttons throughout page.
* Include social proof placeholders labeled clearly as "example" or "demo" (NOT real results).

---

## COPY (USE THIS VERBATIM)

### 1) Sticky Header

Left: Evios logo text "evios"
Right nav links: How it works, Demo, Integrations, Offer, FAQ
Buttons:

* Primary: "Book a demo"
* Secondary: "Hear a demo call"

### 2) Hero

Headline:
**Stop losing plumbing jobs to missed calls.**

Subhead:
**Evios is an AI plumbing receptionist that answers calls 24/7, books jobs, rescues estimates with automated follow-up, and triggers 5-star reviews after completion. Installed in 7 days. Free for 30 days. If it's not a win, you pay $0.**

Hero bullets (3):

* **Books plumbing jobs while you're on-site**
* **Texts back missed calls in under 60 seconds**
* **Follows up on estimates until yes/no**

Hero CTAs:

* Button: **Book a demo**
* Link button: **Hear a demo call**

Hero microcopy:
"No contract to start. Keep your current phone system."

### 3) Trust Bar (no fake logos)

Row of 4–5 chips:

* Works with your current phone system
* After-hours + overflow coverage
* Emergency routing (leaks, no water, sewer backup)
* Call summaries + transcripts
* Setup in 7 days

### 4) Plumbing Pain → Outcome

Section title:
**When you're under a sink, the phone can't ring twice.**

Text:
"Most small plumbing shops miss leads because techs can't answer mid-job, after-hours goes to voicemail, and estimates die in follow-up. Evios handles the front door so you can stay on the tools."

3 cards:

1. **Answer + qualify**
   "Name, address, issue, urgency, availability, budget range if needed."
2. **Schedule + route**
   "Books into your calendar or sends to dispatch with all details."
3. **Follow-up + close**
   "Automated touches for missed calls and estimates."

### 5) The 3 Pillars

Headline:
**Everything you need to turn calls into booked plumbing jobs.**

Pillar 1: AI Voice Intake (24/7)

* Answers inbound calls
* Qualifies (issue type, urgency, location)
* Emergency triage + escalation rules
* Books jobs or sends handoff to team
* Filters spam and robocalls

Pillar 2: Follow-up Automation
Subhead: "Missed-call rescue + estimate rescue"

* Missed-call text back within 60 seconds
* Multi-touch follow-up for estimates (SMS/email/voicemail)
* Stops when customer says yes/no or requests removal
* Sends updates to your team

Pillar 3: Reviews + Referrals

* After job complete, sends review request
* Routes unhappy customers to private feedback
* If happy, pushes Google review
* Optional referral ask: "Know a neighbor who needs a plumber?"

### 6) Demo Section (SIMULATED, LABELED)

Headline:
**Hear how it sounds (demo calls).**

Subtext:
"These are **simulated demo calls** showing the experience and flow."

UI requirements:

* 3 audio players with titles:

  1. "Emergency leak call (triage + dispatch)"
  2. "Routine water heater quote request (qualification + booking)"
  3. "After-hours missed call (text-back + scheduling)"
* Under each: collapsible transcript (accordion)
* Include "What happens next" panel showing:

  * internal summary message
  * customer confirmation text message
  * booking notification

### 7) Integrations

Headline:
**Keep your stack. We integrate into it.**

Copy:
"Already using software? Perfect. Evios overlays your workflow and pushes booked jobs + notes where you need them."

Integration tiles (logos can be simple text):

* ServiceTitan
* Jobber
* Housecall Pro
* Google Calendar
* Zapier / Webhooks

Microcopy:
"If you don't use any software, we can still book into a shared calendar and send job details by text/email."

### 8) Offer / Risk Reversal

Headline:
**Try it for 30 days. If it doesn't create value, pay $0.**

Offer list:

* Free discovery (we map your intake + booking rules)
* Free implementation (we build + integrate)
* Free usage for ~30 days
* If you don't want it after, you pay $0

CTA:
"Book a demo"

### 9) How it Works (7-day plan)

Headline:
**Live in 7 days. Done-for-you.**

Timeline steps:
Day 1: Intake script + call flows (your rules)
Day 2: Emergency routing + escalation
Day 3: Calendar/FSM integration
Day 4: Missed-call + estimate follow-up sequences
Day 5: Reviews + referral automation
Day 6: Test calls + tuning
Day 7: Go live

### 10) FAQ (include these exact questions)

* Does it sound robotic?
* What if it schedules the wrong thing?
* Can it handle emergencies?
* Do we need a new phone number?
* Will it work with ServiceTitan/Jobber/Housecall Pro?
* What about bilingual callers?
* Can I turn it off anytime?

Provide short, confident answers. No legalese.

### 11) Final CTA + Embedded Lead Form

Headline:
**Want to hear it handle your exact plumbing calls?**

Subhead:
"Book a demo and we'll show you the call flow, the follow-up engine, and what setup looks like for a small plumbing shop."

Form fields (required):

* Full name
* Company name
* Website (optional)
* Email
* Phone
* What software do you use? (dropdown: ServiceTitan, Jobber, Housecall Pro, Other, None)
* Message (optional)

Form behavior:

* On submit: show success state: "Got it. We'll reach out shortly."
* Send an email notification to: `LEADS_EMAIL_PLACEHOLDER`
* Store submissions locally (or in a simple DB) if easy, but email notification is must-have.

### 12) Footer

* "© Evios"
* "Privacy"
* "Terms"
* Contact email

---

## TECH REQUIREMENTS (FOR CURSOR)

* Build with Next.js + Tailwind
* Single page route `/`
* Smooth scroll to sections
* Buttons call `scrollIntoView`
* Form submission:

  * Use Next.js API route `/api/lead`
  * On POST: send email using SMTP or Resend/SendGrid (abstract behind env vars)
  * Environment variables:

    * `LEADS_TO_EMAIL`
    * `EMAIL_PROVIDER_API_KEY` or SMTP config
* Add basic spam prevention:

  * hidden honeypot field
  * rate limit per IP (lightweight)
* Add basic SEO:

  * Title: "Evios | AI Plumbing Receptionist That Books Jobs"
  * Meta description plumbing-focused
  * OpenGraph tags

---

## CONTENT ASSETS PLACEHOLDERS

* Audio files: put dummy mp3 paths `/public/demo/*.mp3`
* Transcripts: hardcode JSON array for now
* Integration logos: simple SVG or text badges

---

## FINAL INSTRUCTION TO CURSOR

"Generate the entire site with the above copy and structure. Don't invent testimonials or case studies. If you add any proof elements, label them as demos/examples."

---

If you want, paste your current domain + your preferred brand vibe (dark/clean vs bright/clean) and I'll tweak the copy to match, but this is ready to ship to Cursor right now.
