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
      "Answers inbound calls",
      "Qualifies (issue type, urgency, location)",
      "Emergency triage + escalation rules",
      "Books jobs or sends handoff to team",
      "Configured to your scripts, service area, and dispatch workflow",
      "Filters spam and robocalls",
    ],
  },
  {
    title: "Follow-up + Rough Estimator",
    subhead: "Missed-call rescue + estimate momentum",
    bullets: [
      "Missed-call text back within 60 seconds",
      "Sends rough estimate ranges based on your pricing rules",
      "Multi-touch follow-up for estimates (SMS/email/voicemail)",
      "Stops when customer says yes/no or requests removal",
      "Sends updates to your team",
    ],
  },
  {
    title: "Reviewer + Reputation",
    bullets: [
      "After job complete, sends review requests automatically",
      "Routes unhappy customers to private feedback",
      "If happy, pushes Google review",
      'Optional referral ask: "Know someone who needs help?"',
    ],
  },
];

export function Pillars() {
  return (
    <section className="section-block section-divider">
      <div className="section-frame">
        <h2 className="section-heading max-w-4xl">
          Everything you need to turn inbound demand into booked home service jobs.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="surface-card interactive-lift p-6"
            >
              <h3 className="text-xl font-semibold text-brand-text">
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
      </div>
    </section>
  );
}
