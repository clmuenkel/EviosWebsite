"use client";

const TRUST_CHIPS = [
  {
    label: "Custom build + integration",
    detail:
      "We build automations around your stack, including ServiceTitan, Jobber, and Housecall Pro.",
  },
  {
    label: "After-hours + overflow",
    detail:
      "Calls outside business hours and high-volume windows are handled automatically, so leads are not missed.",
  },
  {
    label: "Emergency routing",
    detail:
      "Urgent requests are flagged and routed to your on-call team immediately.",
  },
  {
    label: "Call summaries + transcripts",
    detail:
      "Each call is captured and summarized so your team can follow up with full context.",
  },
  {
    label: "Live in 1 month",
    detail:
      "From discovery to launch in about four weeks with done-for-you implementation and setup.",
  },
] as const;

export function TrustBar() {
  return (
    <section className="border-t border-transparent px-6 pb-12 pt-8 sm:px-10">
      <div className="section-frame flex flex-wrap items-start justify-center gap-4">
        {TRUST_CHIPS.map((chip) => (
          <span
            key={chip.label}
            className="trust-chip group relative w-full max-w-[360px] cursor-default overflow-hidden rounded-[28px] bg-white/[0.03] px-5 py-3 text-left text-sm font-medium leading-relaxed text-brand-muted transition-all duration-300 hover:bg-blue-500/12 hover:text-brand-text sm:w-auto sm:min-w-[270px]"
          >
            <span className="relative z-10 block text-base font-semibold tracking-tight text-brand-text">
              {chip.label}
            </span>
            <span className="relative z-10 mt-1 block max-h-0 overflow-hidden text-xs leading-relaxed text-brand-muted opacity-0 transition-all duration-300 ease-out group-hover:max-h-20 group-hover:opacity-100 group-hover:pt-2 group-focus-within:max-h-20 group-focus-within:opacity-100 group-focus-within:pt-2">
              {chip.detail}
            </span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .trust-chip::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 180ms ease;
        }

        .trust-chip:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
