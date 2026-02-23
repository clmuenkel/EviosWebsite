# Phase 4: Demo Section

**Goal:** Demo section with three labeled simulated demo calls: audio players, collapsible transcripts, and "What happens next" panel. All clearly labeled as simulated/demo.

**Context:** Design brief §6. Audio: dummy paths `/public/demo/*.mp3`. Transcripts: hardcoded (e.g. JSON array). Lead email: zad@evioshq.com (not used in this phase).

---

## Prerequisites

- Phase 1–3 done. Section `#demo` exists and is scroll target for "Hear a demo call".

---

## Tasks

- [ ] **Demo section** (id `demo`):
  - Headline: **Hear how it sounds (demo calls).**
  - Subtext: "These are **simulated demo calls** showing the experience and flow."
- [ ] **Three audio players** with titles:
  1. "Emergency leak call (triage + dispatch)"
  2. "Routine water heater quote request (qualification + booking)"
  3. "After-hours missed call (text-back + scheduling)"
- [ ] Use `<audio>` or a simple player; `src` can point to placeholder paths under `/demo/` (e.g. `demo/emergency-leak.mp3`) — create empty or silent mp3s or use placeholder until real files exist.
- [ ] **Under each player:** collapsible transcript (accordion). Hardcode transcript text in component or a small JSON array (e.g. `demoTranscripts`).
- [ ] **"What happens next" panel** showing:
  - Internal summary message (example line)
  - Customer confirmation text message (example line)
  - Booking notification (example line)
- [ ] Label as demo/simulated in UI so no confusion with real results (design brief: ethical proof).
- [ ] Responsive: players and accordions usable on mobile.

---

## Copy (verbatim)

**Headline:** Hear how it sounds (demo calls).

**Subtext:** These are **simulated demo calls** showing the experience and flow.

**Player titles:**
1. Emergency leak call (triage + dispatch)
2. Routine water heater quote request (qualification + booking)
3. After-hours missed call (text-back + scheduling)

**What happens next:** Include example lines for (1) internal summary, (2) customer confirmation text, (3) booking notification. Short placeholder text is fine; can refine in content pass.

---

## How to test

1. Scroll to "Hear a demo call" → lands on this section; headline and subtext visible.
2. Three players with correct titles; play/pause works (or shows placeholder if no file).
3. Each player has an accordion; expand/collapse shows transcript content.
4. "What happens next" panel shows the three example items.
5. Wording indicates "simulated" / "demo" where appropriate.
6. Mobile: layout works; no horizontal scroll.
