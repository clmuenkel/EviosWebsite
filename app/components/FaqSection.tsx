"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What exactly does Evios build?",
    answer:
      "We build custom automation around your pain points, from call intake and scheduling to quoting, follow-up, reviews, and referral loops.",
  },
  {
    question: "How is this different from buying software off the shelf?",
    answer:
      "Off-the-shelf tools force your team to adapt. We design and implement a custom system around your existing workflow and business rules.",
  },
  {
    question: "What tools do you integrate with?",
    answer:
      "We integrate with your current stack, including ServiceTitan, Jobber, Housecall Pro, Google Calendar, Zapier, and custom webhook/API workflows.",
  },
  {
    question: "How long until it is live?",
    answer:
      "Most systems go live in about four weeks, including discovery, build, testing, and launch.",
  },
  {
    question: "Do we need to replace our current phone system or software?",
    answer:
      "No. We build around what you already use and layer automation into your current operations.",
  },
  {
    question: "What kinds of home service businesses do you work with?",
    answer:
      "We support teams across HVAC, plumbing, electrical, roofing, landscaping, cleaning, and other local home service categories.",
  },
];

export function FaqSection() {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({ 0: true });

  return (
    <section id="faq" className="faq-section section-block-tight section-divider">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Common Questions
        </p>
        <h2 className="section-heading mt-4">FAQ</h2>
        <p className="section-copy">
          Click any question to expand. You can open multiple answers as you compare details.
        </p>

        <div className="mt-8 space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const expanded = Boolean(openMap[index]);

            return (
              <article
                key={item.question}
                className={`faq-item surface-card ${expanded ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-trigger flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpenMap((current) => ({ ...current, [index]: !current[index] }))}
                >
                  <span className="pr-2 text-sm font-semibold leading-relaxed text-brand-text sm:text-base">
                    {item.question}
                  </span>
                  <span className="faq-icon text-brand-muted" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </span>
                </button>

                <div
                  className="faq-answer-grid grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0.55 }}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-black/[0.06] px-5 py-4 text-sm leading-relaxed text-brand-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <style jsx global>{`
          .faq-section .faq-item {
            position: relative;
            overflow: hidden;
            border-color: rgba(15, 23, 42, 0.06);
            background: #fff;
            transition:
              background-color 220ms ease,
              border-color 220ms ease,
              box-shadow 220ms ease;
          }

          .faq-section .faq-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #0b5394;
            opacity: 0;
            pointer-events: none;
            transition: opacity 220ms ease;
          }

          .faq-section .faq-item:hover {
            border-color: rgba(11, 83, 148, 0.24);
            background: rgba(11, 83, 148, 0.04);
            box-shadow: 0 8px 18px rgba(2, 6, 23, 0.08);
          }

          .faq-section .faq-item.is-open::before {
            opacity: 1;
          }

          .faq-section .faq-trigger {
            min-height: 72px;
          }

          .faq-section .faq-icon {
            width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            border: 1px solid rgba(15, 23, 42, 0.1);
            background: #fff;
            flex-shrink: 0;
            transition:
              transform 220ms ease,
              border-color 220ms ease,
              background-color 220ms ease;
          }

          .faq-section .faq-icon svg {
            width: 12px;
            height: 12px;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.8;
            stroke-linecap: round;
          }

          .faq-section .faq-item.is-open .faq-icon {
            transform: rotate(45deg);
            border-color: rgba(11, 83, 148, 0.28);
            background: rgba(11, 83, 148, 0.07);
            color: #0b5394;
          }

          @media (prefers-reduced-motion: reduce) {
            .faq-section * {
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
