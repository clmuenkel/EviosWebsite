"use client";

type ProcessCard = {
  title: string;
  badge: string;
  copy: string;
  bullets: string[];
  icon: "audit" | "build";
};

const PROCESS_CARDS: ProcessCard[] = [
  {
    title: "We audit your business",
    badge: "FREE",
    copy: "We walk through how your jobs come in, where you're losing time and money, and map a plan.",
    bullets: [
      "Takes about 30 minutes on a call",
      "You get a clear plan of what we'd build",
      "No commitment, no charge",
    ],
    icon: "audit",
  },
  {
    title: "We build it and you test it",
    badge: "FREE BUILD + 1 MONTH TEST",
    copy:
      "We build your custom software for free, then you run it in your real business for a full month at no cost.",
    bullets: [
      "Built around your current tools",
      "After the month, we discuss pricing only if you want to keep it",
      "Keep it only if it works for your team",
    ],
    icon: "build",
  },
];

function CardIcon({ icon }: { icon: ProcessCard["icon"] }) {
  if (icon === "audit") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-7.5 7.5L7 17l.2-3.2z" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="section-block-tight section-divider alt-surface">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">How we work</p>
        <h2 className="section-heading mt-4">Two steps. Zero risk.</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {PROCESS_CARDS.map((card) => (
            <article
              key={card.title}
              className="process-card group rounded-3xl border border-black/[0.04] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/20 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accentLight text-brand-accent">
                  <CardIcon icon={card.icon} />
                </span>
                <span className="rounded-full bg-brand-accentLight px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-brand-accent">
                  {card.badge}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-brand-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">{card.copy}</p>

              <ul className="process-details mt-4 grid gap-2 text-sm text-brand-muted">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-xl bg-brand-bg px-3 py-2">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process-details {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition:
            max-height 300ms ease,
            opacity 250ms ease;
        }

        .process-card:hover .process-details,
        .process-card:focus-within .process-details {
          max-height: 12rem;
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .process-details {
            transition: none;
            max-height: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
