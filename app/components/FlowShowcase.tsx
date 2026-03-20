"use client";

import { useState } from "react";
import { BOOKING_URL } from "../lib/booking";

type ProblemCard = {
  title: string;
  icon: "phone" | "calendar" | "file-text" | "credit-card" | "star" | "spark";
  problem: string;
  fix: string;
  includeAudio?: boolean;
};

const CARDS: ProblemCard[] = [
  {
    title: "After-hours calls",
    icon: "phone",
    problem: "Jobs call in after 6PM and hit voicemail. Most of these leads are gone by morning.",
    fix: "We build instant reply + qualification flows that book the job while your team sleeps.",
    includeAudio: true,
  },
  {
    title: "Scheduling chaos",
    icon: "calendar",
    problem: "Bookings, reminders, and reschedules are all manual, so tech time gets wasted.",
    fix: "We create a scheduling engine that confirms windows and handles changes automatically.",
  },
  {
    title: "Quote follow-up",
    icon: "file-text",
    problem: "Quotes are sent but not chased consistently, so close rate drops.",
    fix: "We install an automatic follow-up sequence that stops as soon as the customer replies.",
  },
  {
    title: "Getting paid",
    icon: "credit-card",
    problem: "Invoices go out late and payments drag, slowing cash flow.",
    fix: "We trigger invoices and payment reminders the second a job is marked complete.",
  },
  {
    title: "Reviews & referrals",
    icon: "star",
    problem: "Great jobs happen, but review requests are forgotten.",
    fix: "We send review and referral asks at the right moment so reputation keeps compounding.",
  },
  {
    title: "Something else",
    icon: "spark",
    problem: "Your workflow has a gap not listed here, and generic tools do not fit.",
    fix: "We can build custom software around your exact process, even for niche edge cases.",
  },
];

function StageIcon({ icon }: { icon: ProblemCard["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    "aria-hidden": true,
  } as const;

  if (icon === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.66-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  }

  if (icon === "file-text") {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    );
  }

  if (icon === "credit-card") {
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M7 15h3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 2l2.8 5.8L21 9l-4.5 4.3L17.6 20 12 16.9 6.4 20l1.1-6.7L3 9l6.2-1.2z" />
    </svg>
  );
}

function MiniFlow({ card }: { card: ProblemCard }) {
  const chipClass =
    "inline-flex items-center gap-1 rounded-full bg-brand-accentLight/40 px-2 py-1 text-[11px] font-medium text-brand-accent";

  if (card.icon === "calendar") {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={chipClass}>Job booked</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Reminder sent</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Confirmed</span>
      </div>
    );
  }

  if (card.icon === "file-text") {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={chipClass}>Day 0: Quote sent</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Day 2: Auto follow-up</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Customer replies</span>
      </div>
    );
  }

  if (card.icon === "credit-card") {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={chipClass}>Job done</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Invoice fires</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Payment link</span>
        <span className="text-xs text-brand-muted">→</span>
        <span className={chipClass}>Paid</span>
      </div>
    );
  }

  if (card.icon === "star") {
    return (
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-black/[0.06] bg-brand-bg px-3 py-2 text-xs text-brand-muted">
          Please leave a review
        </div>
        <div className="rounded-lg border border-black/[0.06] bg-brand-bg px-3 py-2 text-xs text-brand-muted">
          Know someone? Refer us
        </div>
      </div>
    );
  }

  if (card.icon === "spark") {
    return (
      <div className="mt-4 rounded-lg border border-black/[0.06] bg-brand-bg px-3 py-3 text-xs text-brand-muted">
        <p className="italic">Tell us your bottleneck - we&apos;ll design the flow.</p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block font-semibold text-brand-accent hover:text-brand-accentDark"
        >
          Book free audit →
        </a>
      </div>
    );
  }

  return null;
}

export function FlowShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const selectedCard = openIndex === null ? null : CARDS[openIndex];

  return (
    <section id="solutions" className="section-block-tight section-divider overflow-hidden">
      <div className="section-frame">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
            What we build
          </p>
          <h2 className="section-heading mt-4">Real problems. Custom fixes.</h2>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {CARDS.map((card, index) => {
              const isOpen = openIndex === index;

              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                  aria-expanded={isOpen}
                  className={`h-24 rounded-2xl border bg-white px-2 py-2 text-left shadow-sm transition-all duration-200 sm:h-24 sm:px-3 sm:py-3 ${
                    isOpen
                      ? "scale-[1.03] border-brand-accent bg-brand-accentLight/30 shadow-md"
                      : "border-black/[0.06] hover:-translate-y-0.5 hover:border-brand-accent/25 hover:shadow-md"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accentLight/40 text-brand-accent sm:h-10 sm:w-10">
                      <StageIcon icon={card.icon} />
                    </span>
                    <span
                      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-xs ${
                        isOpen
                          ? "border-brand-accent/30 bg-white text-brand-accent"
                          : "border-black/[0.08] bg-white text-brand-muted"
                      }`}
                    >
                      {isOpen ? "ON" : "+"}
                    </span>
                  </span>
                  <span className="mt-1.5 block whitespace-normal break-words text-[11px] font-semibold leading-tight text-brand-text sm:mt-2 sm:text-sm md:text-base">
                    {card.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="mt-4 grid transition-[grid-template-rows,opacity] duration-300 ease-out"
            style={{
              gridTemplateRows: selectedCard ? "1fr" : "0fr",
              opacity: selectedCard ? 1 : 0,
            }}
          >
            <div className="overflow-hidden">
              <article className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm md:p-5">
                {selectedCard ? (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                          {selectedCard.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-brand-muted md:text-base">
                          {selectedCard.problem}
                        </p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-brand-text md:text-base">
                          {selectedCard.fix}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(null)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] text-brand-muted transition-colors hover:border-brand-accent/30 hover:text-brand-accent"
                        aria-label="Close details"
                      >
                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2]">
                          <path d="M2 2l10 10M12 2L2 12" />
                        </svg>
                      </button>
                    </div>

                    {selectedCard.includeAudio ? (
                      <div className="mt-4 rounded-xl border border-black/[0.06] bg-brand-bg p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                          Real scenario demo
                        </p>
                        <audio controls className="mt-2 w-full">
                          <source src="/demo/after-hours-missed-call.mp3" type="audio/mpeg" />
                          Your browser does not support audio playback.
                        </audio>
                        <div className="mt-3 rounded-lg border border-black/[0.06] bg-white p-2 text-xs text-brand-muted">
                          Missed call at 11:00 PM -&gt; instant text-back -&gt; customer books a slot.
                        </div>
                      </div>
                    ) : (
                      <MiniFlow card={selectedCard} />
                    )}
                  </>
                ) : null}
              </article>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
