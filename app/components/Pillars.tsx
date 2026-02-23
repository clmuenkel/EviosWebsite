"use client";

import { BookCta } from "./BookCta";

type Pillar = {
  title: string;
  subhead?: string;
  bullets: string[];
};

const PILLARS: Pillar[] = [
  {
    title: "AI Voice Intake (24/7)",
    bullets: [
      "Answers inbound calls around the clock",
      "Qualifies issue, urgency, and location fast",
      "Routes emergencies with on-call escalation",
      "Books jobs or hands off cleanly",
    ],
  },
  {
    title: "Follow-up + Rough Estimator",
    subhead: "Missed-call rescue + estimate momentum",
    bullets: [
      "Texts missed calls back in under 60 seconds",
      "Sends rough estimate ranges from your pricing",
      "Runs SMS and email follow-up automatically",
      "Stops when customer replies yes or no",
    ],
  },
  {
    title: "Reviewer + Reputation",
    bullets: [
      "Sends review requests after each completed job",
      "Routes unhappy customers to private recovery",
      "Sends happy customers to Google review",
      "Optionally asks for referrals from happy customers",
    ],
  },
];

export function Pillars() {
  return (
    <section className="section-block-tight section-divider">
      <div className="section-frame">
        <h2 className="section-heading max-w-4xl">
          Everything you need to turn inbound demand into booked home service jobs.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="pillar-card interactive-lift relative overflow-hidden rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold text-brand-text">
                {pillar.title}
              </h3>
              {pillar.subhead ? (
                <p className="mt-2 text-sm font-medium text-brand-muted">
                  {pillar.subhead}
                </p>
              ) : null}
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-muted">
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block h-2 w-2 rounded-full bg-brand-accent"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <BookCta />
        </div>

        <style jsx global>{`
          .pillar-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.02);
          }

          .pillar-card::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 2px;
            background: linear-gradient(90deg, rgba(96, 165, 250, 0), rgba(96, 165, 250, 0.8), rgba(96, 165, 250, 0));
            opacity: 0;
            transition: opacity 220ms ease;
          }

          .pillar-card:hover::before {
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
}
