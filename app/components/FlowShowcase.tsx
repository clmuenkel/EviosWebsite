"use client";

import { useEffect, useRef, useState } from "react";

type DetailBullet = {
  key: string;
  detail: string;
};

type ShowcaseStage = {
  name:
    | "GET FOUND"
    | "ANSWER FAST"
    | "BOOK & REMIND"
    | "QUOTE & CLOSE"
    | "GET PAID"
    | "GROW & REPEAT";
  product: string;
  icon: "users" | "phone" | "calendar" | "file-text" | "credit-card" | "star";
  headline: string;
  problem: string;
  problemBullets: DetailBullet[];
  solution: string;
  solutionBullets: DetailBullet[];
  tags: string[];
  phoneLines: string[];
};

const STAGES: ShowcaseStage[] = [
  {
    name: "GET FOUND",
    product: "Referral Engine",
    icon: "users",
    headline: "Turn completed jobs into new referrals.",
    problem: "Referrals stay random when asks are manual or forgotten.",
    problemBullets: [
      {
        key: "Current state",
        detail: "No trigger means referrals happen inconsistently.",
      },
      {
        key: "Leak",
        detail: "Post-job goodwill fades fast without follow-up.",
      },
      {
        key: "Result",
        detail: "You pay for leads that could be referrals.",
      },
    ],
    solution: "An automated referral flow runs after every completed job.",
    solutionBullets: [
      {
        key: "Trigger",
        detail: "Job marked complete waits 30 days.",
      },
      {
        key: "Action",
        detail: "Send one-tap referral ask.",
      },
      {
        key: "If booked",
        detail: "Credit payout and alert owner automatically.",
      },
      {
        key: "Stop condition",
        detail: "Flow ends after conversion or expiry.",
      },
    ],
    tags: ["Referral Engine", "Marketing Automation"],
    phoneLines: [
      "Thanks again for trusting us with your service request.",
      "Do you know someone else who needs help?",
      "Tap here to share. We handle the rest.",
    ],
  },
  {
    name: "ANSWER FAST",
    product: "AI Receptionist",
    icon: "phone",
    headline: "Answer every call and qualify emergencies instantly.",
    problem: "Missed urgent calls become lost jobs fast.",
    problemBullets: [
      {
        key: "After-hours",
        detail: "Emergency calls hit voicemail.",
      },
      {
        key: "Delay",
        detail: "Leads book the first responder.",
      },
      {
        key: "Chaos",
        detail: "Unqualified calls waste dispatch time.",
      },
    ],
    solution: "AI answers, qualifies, routes, and logs outcomes instantly.",
    solutionBullets: [
      {
        key: "Trigger",
        detail: "Inbound call rings.",
      },
      {
        key: "Qualify",
        detail: "Capture issue, urgency, and location.",
      },
      {
        key: "Route",
        detail: "Emergencies get priority. Standard jobs get next slots.",
      },
      {
        key: "Write-back",
        detail: "Write outcome to CRM, calendar, and SMS.",
      },
    ],
    tags: ["AI Receptionist", "Speed-to-Lead"],
    phoneLines: [
      "Evios answering for your home service team.",
      "Is there water actively leaking right now?",
      "Closest slot confirmed. Confirmation text sent.",
    ],
  },
  {
    name: "BOOK & REMIND",
    product: "Smart Scheduling",
    icon: "calendar",
    headline: "Reduce no-shows with smart booking and reminder automation.",
    problem: "No-shows burn technician hours and fuel.",
    problemBullets: [
      {
        key: "Mismatch",
        detail: "Teams and customers remember different windows.",
      },
      {
        key: "No-shows",
        detail: "Tech arrives and no one is home.",
      },
      {
        key: "Manual",
        detail: "Office staff chase confirmations manually.",
      },
    ],
    solution: "Self-booking and reminders cut avoidable empty trips.",
    solutionBullets: [
      {
        key: "Trigger",
        detail: "Booking created by phone or web.",
      },
      {
        key: "Reminders",
        detail: "Send 24h, 2h, and on-my-way texts.",
      },
      {
        key: "Reschedule",
        detail: "Customer texts RESCHEDULE to pick a new slot.",
      },
      {
        key: "Fallback",
        detail: "If unconfirmed, AI calls to verify.",
      },
    ],
    tags: ["Online Booking", "Auto-Reminders"],
    phoneLines: [
      "Your service appointment is booked for Tuesday at 9:00 AM.",
      "Need a change? Reply RESCHEDULE.",
      "On-my-way text sent to your customer.",
    ],
  },
  {
    name: "QUOTE & CLOSE",
    product: "Quote Follow-Up",
    icon: "file-text",
    headline: "Close more pending quotes with persistent, polite follow-up.",
    problem: "Quotes die when follow-up depends on memory.",
    problemBullets: [
      {
        key: "Reality",
        detail: "Most teams stop after one or two touches.",
      },
      {
        key: "No system",
        detail: "Unstructured follow-up loses leads.",
      },
      {
        key: "Outcome",
        detail: "Competitors win by following up faster.",
      },
    ],
    solution: "A clear sequence follows every quote and stops on response.",
    solutionBullets: [
      {
        key: "Trigger",
        detail: "Quote status becomes sent.",
      },
      {
        key: "Sequence",
        detail: "Day 2, Day 5, Day 10 sequence.",
      },
      {
        key: "Stop condition",
        detail: "Stop when customer replies or books.",
      },
      {
        key: "Escalation",
        detail: "Idle high-value quotes alert owner.",
      },
    ],
    tags: ["Quote Follow-Up", "CRM Integration"],
    phoneLines: [
      "Quick follow-up on your pipe replacement quote.",
      "Need help choosing an option?",
      "Reply YES to lock your install date.",
    ],
  },
  {
    name: "GET PAID",
    product: "Payment System",
    icon: "credit-card",
    headline: "Collect faster with invoice automation and payment reminders.",
    problem: "Payment delays hurt cash flow and increase admin work.",
    problemBullets: [
      {
        key: "Leak",
        detail: "Invoices are delayed or missed.",
      },
      {
        key: "Friction",
        detail: "No easy pay-now option at completion.",
      },
      {
        key: "Delay",
        detail: "Payments arrive later than expected.",
      },
    ],
    solution: "Completion triggers invoice, payment link, and reminders.",
    solutionBullets: [
      {
        key: "Trigger",
        detail: "Job is marked complete.",
      },
      {
        key: "Action",
        detail: "Send invoice with one-tap payment link.",
      },
      {
        key: "If unpaid",
        detail: "Run reminder cadence Day 2, 5, 10.",
      },
      {
        key: "Optional",
        detail: "Offer financing on larger tickets.",
      },
    ],
    tags: ["On-My-Way Texts", "Payment Links"],
    phoneLines: [
      "Your invoice is ready right now.",
      "Pay securely with one tap.",
      "Automated reminders stop when paid.",
    ],
  },
  {
    name: "GROW & REPEAT",
    product: "Review Booster",
    icon: "star",
    headline: "Grow reputation with smart review routing and recovery loops.",
    problem: "Reviews rarely happen without prompts.",
    problemBullets: [
      {
        key: "Bias",
        detail: "Unhappy customers leave public reviews first.",
      },
      {
        key: "Trust",
        detail: "New customers choose stronger social proof.",
      },
    ],
    solution: "Private rating first routes happy and unhappy paths correctly.",
    solutionBullets: [
      {
        key: "Trigger",
        detail: "Job completes, then waits one to two hours.",
      },
      {
        key: "If 4-5 stars",
        detail: "Send one-tap Google review link.",
      },
      {
        key: "If 1-3 stars",
        detail: "Capture private feedback and alert owner.",
      },
      {
        key: "Tracking",
        detail: "Log each request and outcome.",
      },
    ],
    tags: ["Review Requests", "Retention Campaigns"],
    phoneLines: [
      "How was your service visit today?",
      "Happy? Leave a quick public review.",
      "Need a fix? We can resolve it today.",
    ],
  },
];

function StageIcon({ icon }: { icon: ShowcaseStage["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    "aria-hidden": true,
  } as const;

  if (icon === "users") {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="3" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a3 3 0 0 1 0 5.75" />
      </svg>
    );
  }

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
      <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9 12 2" />
    </svg>
  );
}

function PhoneStageDemo({ stage }: { stage: ShowcaseStage }) {
  return (
    <div className="phone-wrap">
      <span className="phone-ambient-glow" />
      <div className="phone-body">
        <span className="phone-btn left phone-btn-silent" />
        <span className="phone-btn left phone-btn-vol-up" />
        <span className="phone-btn left phone-btn-vol-down" />
        <span className="phone-btn right phone-btn-power" />

        <div key={`demo-${stage.name}`} className="phone-screen">
          <span className="phone-reflection" />

          <div className="demo-topbar">
            <span>9:41</span>
            <div className="status-pack">
              <span className="status-signal">
                <em />
                <em />
                <em />
                <em />
              </span>
              <span className="status-wifi">
                <em />
                <em />
                <em />
              </span>
              <span className="status-battery">
                <em />
              </span>
            </div>
          </div>
          <div className="phone-island">
            <span />
          </div>

          <div className="demo-title">{stage.product}</div>

          {stage.icon === "users" ? (
            <div className="demo demo-referral">
              <div className="demo-card" style={{ animationDelay: "0.1s" }}>
                <div className="demo-row">
                  <b>Trigger</b>
                  <span className="pill">Job Complete</span>
                </div>
                <div className="demo-sub">Wait 30 days, then send referral ask</div>
              </div>
              <div className="demo-chat">
                <div className="bubble out" style={{ animationDelay: "0.35s" }}>
                  Thanks again for choosing ABC Home Services.
                </div>
                <div className="bubble out" style={{ animationDelay: "0.6s" }}>
                  Know anyone who needs help? Get $50 per referral.
                </div>
                <div className="bubble in" style={{ animationDelay: "0.95s" }}>
                  My neighbor Mike needs help this week.
                </div>
              </div>
              <div className="demo-card ok" style={{ animationDelay: "1.25s" }}>
                <div className="demo-row">
                  <b>Status</b>
                  <span className="pill green">Booked</span>
                </div>
                <div className="demo-sub">Referral credited, payout queued</div>
              </div>
            </div>
          ) : null}

          {stage.icon === "phone" ? (
            <div className="demo demo-call">
              <div className="call-card" style={{ animationDelay: "0.1s" }}>
                <div className="call-head">
                  <div className="avatar" />
                  <div>
                    <div className="call-name">Incoming Call</div>
                    <div className="call-muted">Burst pipe - after hours</div>
                  </div>
                  <span className="pill blue">Answered</span>
                </div>
                <div className="wave">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="demo-grid">
                <div className="mini" style={{ animationDelay: "0.35s" }}>
                  <b>Service Area</b>
                  <span className="pill green">In-range</span>
                </div>
                <div className="mini" style={{ animationDelay: "0.45s" }}>
                  <b>Urgency</b>
                  <span className="pill amber">Emergency</span>
                </div>
                <div className="mini" style={{ animationDelay: "0.55s" }}>
                  <b>Booked</b>
                  <span className="pill green">Tue 2:00</span>
                </div>
                <div className="mini" style={{ animationDelay: "0.65s" }}>
                  <b>Logged</b>
                  <span className="pill">CRM</span>
                </div>
              </div>
              <div className="demo-card ok" style={{ animationDelay: "0.9s" }}>
                <div className="demo-row">
                  <b>SMS Sent</b>
                  <span className="pill green">Confirmed</span>
                </div>
                <div className="demo-sub">Confirmation and address check sent</div>
              </div>
            </div>
          ) : null}

          {stage.icon === "calendar" ? (
            <div className="demo demo-schedule">
              <div className="calendar" style={{ animationDelay: "0.1s" }}>
                <div className="cal-head">
                  <b>Tuesday</b>
                  <span className="pill">2 jobs</span>
                </div>
                <div className="cal-row">
                  <span>10:00</span>
                  <div className="event">Drain cleanout</div>
                </div>
                <div className="cal-row">
                  <span>2:00</span>
                  <div className="event blue">Leak repair (booked)</div>
                </div>
                <div className="cal-row">
                  <span>5:00</span>
                  <div className="event ghost">Buffer</div>
                </div>
              </div>
              <div className="demo-card" style={{ animationDelay: "0.35s" }}>
                <div className="demo-row">
                  <b>Reminder cadence</b>
                  <span className="pill">24h - 2h - OTW</span>
                </div>
                <div className="demo-sub">No confirmation, AI call to verify</div>
              </div>
              <div className="demo-card ok" style={{ animationDelay: "0.6s" }}>
                <div className="demo-row">
                  <b>Text command</b>
                  <span className="pill green">RESCHEDULE</span>
                </div>
                <div className="demo-sub">Customer selects new slot automatically</div>
              </div>
            </div>
          ) : null}

          {stage.icon === "file-text" ? (
            <div className="demo demo-quote">
              <div className="pipeline" style={{ animationDelay: "0.1s" }}>
                <div className="lane">
                  <b>Sent</b>
                  <div className="chip">Pipe replacement - $2,400</div>
                </div>
                <div className="lane">
                  <b>Follow-ups</b>
                  <div className="step-line">Day 2: Any questions on the repair scope?</div>
                  <div className="step-line">Day 5: Want us to hold your install slot?</div>
                  <div className="step-line">Day 10: Should we close this quote?</div>
                </div>
              </div>
              <div className="demo-card ok" style={{ animationDelay: "0.55s" }}>
                <div className="demo-row">
                  <b>Stop condition</b>
                  <span className="pill green">Reply received</span>
                </div>
                <div className="demo-sub">Sequence halts instantly, status updated</div>
              </div>
              <div className="demo-card" style={{ animationDelay: "0.8s" }}>
                <div className="demo-row">
                  <b>Escalation</b>
                  <span className="pill amber">$2k+</span>
                </div>
                <div className="demo-sub">Idle 10 days, notify owner to call</div>
              </div>
            </div>
          ) : null}

          {stage.icon === "credit-card" ? (
            <div className="demo demo-pay">
              <div className="invoice" style={{ animationDelay: "0.1s" }}>
                <div className="inv-head">
                  <b>Invoice</b>
                  <span className="pill blue">#1048</span>
                </div>
                <div className="inv-line">
                  <span>Leak repair</span>
                  <b>$450</b>
                </div>
                <div className="inv-line muted">
                  <span>Due</span>
                  <b>Today</b>
                </div>
                <button className="pay-btn" type="button">
                  Tap to pay (Apple Pay)
                </button>
              </div>
              <div className="demo-card ok" style={{ animationDelay: "0.55s" }}>
                <div className="demo-row">
                  <b>Status</b>
                  <span className="pill green">Paid</span>
                </div>
                <div className="demo-sub">Receipt sent, books updated</div>
              </div>
              <div className="demo-card" style={{ animationDelay: "0.85s" }}>
                <div className="demo-row">
                  <b>If unpaid</b>
                  <span className="pill">Auto-remind</span>
                </div>
                <div className="demo-sub">Day 2 / Day 5 / Day 10 cadence</div>
              </div>
            </div>
          ) : null}

          {stage.icon === "star" ? (
            <div className="demo demo-review">
              <div className="rate" style={{ animationDelay: "0.1s" }}>
                <b>How'd we do?</b>
                <div className="stars">
                  <span className="s on" />
                  <span className="s on" />
                  <span className="s on" />
                  <span className="s on" />
                  <span className="s on" />
                </div>
                <div className="demo-sub">Private rating first</div>
              </div>
              <div className="demo-card ok" style={{ animationDelay: "0.45s" }}>
                <div className="demo-row">
                  <b>If 4-5 stars</b>
                  <span className="pill green">Google link</span>
                </div>
                <div className="demo-sub">One tap, review posted</div>
              </div>
              <div className="demo-card" style={{ animationDelay: "0.75s" }}>
                <div className="demo-row">
                  <b>If 1-3 stars</b>
                  <span className="pill amber">Owner alert</span>
                </div>
                <div className="demo-sub">Collect private feedback before public review</div>
              </div>
            </div>
          ) : null}

          <p className="phone-lines">
            {stage.phoneLines[0]}
            <br />
            {stage.phoneLines[1]}
            <br />
            {stage.phoneLines[2]}
          </p>
          <span className="phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}

export function FlowShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const active = STAGES[activeIndex];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="flow-showcase section-block section-divider overflow-hidden"
    >
      <div className="section-frame soft-fade-in" data-visible={isVisible}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
            Custom System In Motion
          </p>
          <h2 className="section-heading mt-4">
            One custom-built automation stack from first contact to repeat revenue.
          </h2>
          <p className="section-copy mx-auto">
            Every stage is designed to plug into your existing environment —
            voice intake, follow-up, quoting, payments, and review loops working
            together as one system.
          </p>
        </div>

        <div className="flow-line mt-10 h-[3px] rounded-full" />

        <div className="stage-strip mt-8 pb-3">
          <div className="stage-connector-wrap hidden md:block" aria-hidden="true">
            <span className="stage-connector-line" />
            {STAGES.slice(0, -1).map((stage, index) => {
              const connected =
                hoveredIndex === index || hoveredIndex === index + 1 || activeIndex === index || activeIndex === index + 1;
              return (
                <span
                  key={`${stage.name}-connector`}
                  className={`stage-connector-segment ${connected ? "is-on" : ""}`}
                  style={{ left: `${((index + 0.5) / STAGES.length) * 100}%` }}
                />
              );
            })}
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-center gap-4">
            {STAGES.map((stage, index) => {
              const activeNode = index === activeIndex;
              const nearHovered =
                hoveredIndex !== null &&
                (index === hoveredIndex || index === hoveredIndex - 1 || index === hoveredIndex + 1);

              return (
                <button
                  key={stage.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`stage-node flex h-full min-h-[116px] w-40 flex-col items-center justify-start gap-2 rounded-2xl border p-3 text-center sm:w-44 ${
                    activeNode
                      ? "stage-node-active border-blue-400/60 bg-gradient-to-b from-blue-500/20 to-blue-600/10 shadow-[0_0_0_1px_rgba(59,130,246,0.45)]"
                      : "border-white/[0.08] bg-brand-surface hover:scale-[1.04] hover:border-blue-300/30"
                  } ${nearHovered ? "stage-node-near" : ""} ${hoveredIndex === index ? "stage-node-hover" : ""}`}
                  style={{ animationDelay: `${index * 90}ms` }}
                  aria-pressed={activeNode}
                >
                  <span
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border text-brand-accent ${
                      activeNode
                        ? "border-blue-300/70 bg-blue-500/30"
                        : "border-brand-accent/50 bg-brand-bg"
                    }`}
                  >
                    <StageIcon icon={stage.icon} />
                  </span>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-text">
                    {stage.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div key={active.name} className="stage-fade mt-10">
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-2xl bg-white/[0.02] p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-brand-accent/60 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                  {active.name}
                </span>
                <span className="text-sm font-medium text-brand-muted">
                  {active.product}
                </span>
              </div>

              <h3 className="mt-4 text-balance text-2xl font-semibold leading-snug text-brand-text sm:text-[1.75rem]">
                {active.headline}
              </h3>

              <div className="mt-5 space-y-3">
                <div className="problem-card rounded-lg border border-white/10 bg-brand-bg px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-300">
                    The Problem
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {active.problem}
                  </p>
                  <dl className="mt-3 space-y-2">
                    {active.problemBullets.map((item) => (
                      <div key={`${item.key}-${item.detail}`}>
                        <dt className="inline text-sm font-semibold text-brand-text">
                          {item.key}:{" "}
                        </dt>
                        <dd className="inline text-sm leading-relaxed text-brand-muted">
                          {item.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="solution-card rounded-lg border border-brand-accent/40 bg-brand-accent/10 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                    The Solution
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text">
                    {active.solution}
                  </p>
                  <dl className="mt-3 space-y-2">
                    {active.solutionBullets.map((item) => (
                      <div key={`${item.key}-${item.detail}`}>
                        <dt className="inline text-sm font-semibold text-brand-text">
                          {item.key}:{" "}
                        </dt>
                        <dd className="inline text-sm leading-relaxed text-brand-text/90">
                          {item.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/15 bg-brand-bg px-4 py-2 text-xs text-brand-muted break-words"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>

            <aside className="rounded-2xl bg-transparent p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-center">
                <PhoneStageDemo stage={active} />
              </div>
            </aside>
          </div>
        </div>

      </div>
      <style jsx global>{`
        .stage-fade {
          animation: fadeStage 260ms ease-out;
        }

        .stage-strip {
          position: relative;
        }

        .stage-connector-wrap {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 0;
        }

        .stage-connector-line {
          display: block;
          height: 3px;
          margin: 0 7%;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.22);
        }

        .stage-connector-segment {
          position: absolute;
          top: 50%;
          width: 18%;
          height: 3px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: rgba(59, 130, 246, 0.14);
          transition: box-shadow 220ms ease, background-color 220ms ease;
        }

        .stage-connector-segment.is-on {
          background: rgba(59, 130, 246, 0.42);
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.35);
        }

        .stage-strip::before {
          content: "";
          position: absolute;
          inset: -12px -16px;
          border-radius: 18px;
          background: radial-gradient(
            70% 80% at 50% 0%,
            rgba(59, 130, 246, 0.16),
            rgba(59, 130, 246, 0) 70%
          );
          pointer-events: none;
        }

        .stage-node {
          position: relative;
          transform: translateY(10px);
          opacity: 0;
          animation: nodeIn 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease;
          z-index: 1;
        }

        .stage-node:hover {
          box-shadow: 0 10px 28px rgba(2, 6, 23, 0.35);
        }

        .stage-node-near {
          border-color: rgba(59, 130, 246, 0.32);
          box-shadow: 0 6px 18px rgba(2, 6, 23, 0.28);
        }

        .stage-node-hover {
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.35), 0 14px 28px rgba(2, 6, 23, 0.4);
        }

        .stage-node-active::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 12px;
          border: 1px solid rgba(59, 130, 246, 0.4);
          animation: nodePulse 1.8s ease-in-out infinite;
          pointer-events: none;
        }

        .problem-card,
        .solution-card {
          position: relative;
          overflow: hidden;
          border-color: rgba(255, 255, 255, 0.08);
        }

        .problem-card::after,
        .solution-card::after {
          content: "";
          position: absolute;
          left: -40%;
          top: 0;
          height: 100%;
          width: 35%;
          transform: skewX(-16deg);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0)
          );
          animation: sweep 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .solution-card::after {
          animation-delay: 0.5s;
        }

        @keyframes fadeStage {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes nodeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes nodePulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }

        @keyframes sweep {
          0%,
          35% {
            left: -45%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          85%,
          100% {
            left: 120%;
            opacity: 0;
          }
        }

        .phone-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .phone-ambient-glow {
          position: absolute;
          inset: 28% 16% 10%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.28), rgba(59, 130, 246, 0));
          filter: blur(22px);
          pointer-events: none;
        }

        .phone-body {
          width: min(100%, 274px);
          border-radius: 44px;
          padding: 6px;
          background:
            linear-gradient(165deg, #2f3544 0%, #1a2233 45%, #0f1320 100%),
            linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0));
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 20px 40px rgba(2, 6, 23, 0.45),
            0 42px 90px rgba(2, 6, 23, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.24);
          position: relative;
          overflow: visible;
        }

        .phone-btn {
          position: absolute;
          width: 3px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(226, 232, 240, 0.8), rgba(71, 85, 105, 0.75));
          z-index: 4;
        }

        .phone-btn.left {
          left: -3px;
        }

        .phone-btn.right {
          right: -3px;
        }

        .phone-btn-silent {
          top: 68px;
          height: 13px;
        }

        .phone-btn-vol-up {
          top: 93px;
          height: 31px;
        }

        .phone-btn-vol-down {
          top: 133px;
          height: 31px;
        }

        .phone-btn-power {
          top: 113px;
          height: 48px;
        }

        .phone-island {
          position: absolute;
          top: 12px;
          left: 50%;
          width: 90px;
          height: 26px;
          border-radius: 999px;
          transform: translateX(-50%);
          background: rgba(2, 6, 23, 0.96);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 1px 3px rgba(2, 6, 23, 0.5);
          z-index: 2;
        }

        .phone-island span {
          position: absolute;
          right: 11px;
          top: 11px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(71, 85, 105, 0.95);
          box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8);
        }

        .phone-screen {
          border-radius: 38px;
          border: 1px solid rgba(148, 163, 184, 0.26);
          background:
            radial-gradient(circle at 20% -10%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.08), transparent 40%),
            linear-gradient(180deg, #fcfdff 0%, #f8fafc 50%, #f1f5f9 100%);
          color: #0f172a;
          height: 530px;
          padding: 44px 10px 14px;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .phone-screen::-webkit-scrollbar {
          display: none;
        }

        .phone-reflection {
          position: absolute;
          inset: -12% auto -35% -35%;
          width: 60%;
          transform: rotate(15deg);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0)
          );
          pointer-events: none;
        }

        .status-pack {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .status-signal {
          display: flex;
          align-items: end;
          gap: 2px;
        }

        .status-signal em {
          width: 2px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          font-style: normal;
        }

        .status-signal em:nth-child(1) {
          height: 4px;
        }

        .status-signal em:nth-child(2) {
          height: 6px;
        }

        .status-signal em:nth-child(3) {
          height: 8px;
        }

        .status-signal em:nth-child(4) {
          height: 10px;
        }

        .status-wifi {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .status-wifi em {
          width: 6px;
          height: 6px;
          border: 1px solid rgba(15, 23, 42, 0.75);
          border-color: rgba(15, 23, 42, 0.75) transparent transparent transparent;
          border-radius: 50%;
          transform: rotate(45deg);
          font-style: normal;
        }

        .status-wifi em:nth-child(2) {
          width: 4px;
          height: 4px;
        }

        .status-wifi em:nth-child(3) {
          width: 2px;
          height: 2px;
        }

        .status-battery {
          width: 16px;
          height: 8px;
          border-radius: 2px;
          border: 1px solid rgba(15, 23, 42, 0.75);
          padding: 1px;
          position: relative;
        }

        .status-battery::after {
          content: "";
          position: absolute;
          right: -3px;
          top: 2px;
          width: 2px;
          height: 4px;
          border-radius: 1px;
          background: rgba(15, 23, 42, 0.75);
        }

        .status-battery em {
          display: block;
          width: 78%;
          height: 100%;
          border-radius: 1px;
          background: rgba(15, 23, 42, 0.85);
          font-style: normal;
        }

        .phone-home-indicator {
          display: block;
          width: 120px;
          height: 4px;
          margin: 8px auto 0;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.45);
        }

        .phone-lines {
          margin-top: 10px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.24);
          background: rgba(255, 255, 255, 0.7);
          padding: 8px 10px;
          font-size: 11px;
          line-height: 1.45;
          color: rgba(51, 65, 85, 0.9);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }

        .demo {
          display: grid;
          gap: 8px;
        }

        .demo-topbar {
          position: absolute;
          top: 12px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: rgba(15, 23, 42, 0.9);
          font-weight: 700;
        }

        .dots {
          width: 34px;
          height: 6px;
          border-radius: 999px;
          background: rgba(30, 41, 59, 0.2);
        }

        .demo-title {
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.01em;
          color: rgba(15, 23, 42, 0.94);
          margin-bottom: 8px;
          padding-left: 2px;
        }

        .demo-card,
        .bubble,
        .call-card,
        .mini,
        .calendar,
        .pipeline,
        .invoice,
        .rate {
          opacity: 0;
          transform: translateY(4px);
          animation: demoUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .demo-card {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.24);
          border-radius: 14px;
          padding: 10px 12px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }

        .demo-card.ok {
          border-color: rgba(16, 185, 129, 0.28);
          background: rgba(240, 253, 244, 0.86);
        }

        .demo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 12px;
          flex-wrap: wrap;
        }

        .demo-row b {
          color: rgba(15, 23, 42, 0.92);
          font-weight: 600;
        }

        .demo-sub {
          margin-top: 4px;
          font-size: 11.5px;
          color: rgba(71, 85, 105, 0.9);
          line-height: 1.35;
        }

        .pill {
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(248, 250, 252, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.24);
          color: rgba(51, 65, 85, 0.96);
          white-space: nowrap;
          font-weight: 600;
          max-width: 100%;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }

        .pill.blue {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.12);
          color: #2563eb;
        }

        .pill.green {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
        }

        .pill.amber {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.12);
          color: #d97706;
        }

        .demo-chat {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bubble {
          max-width: 85%;
          padding: 9px 12px;
          border-radius: 16px;
          font-size: 12px;
          line-height: 1.4;
        }

        .bubble.out {
          align-self: flex-end;
          background: #007aff;
          color: #fff;
          border-bottom-right-radius: 5px;
        }

        .bubble.in {
          align-self: flex-start;
          background: #e5e5ea;
          border: 1px solid rgba(148, 163, 184, 0.28);
          color: #111827;
          border-bottom-left-radius: 5px;
        }

        .call-card,
        .calendar,
        .invoice,
        .rate,
        .lane {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 14px;
          padding: 10px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }

        .call-head {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .call-name {
          font-size: 12px;
          font-weight: 700;
          color: rgba(15, 23, 42, 0.95);
        }

        .call-muted {
          font-size: 11px;
          color: rgba(71, 85, 105, 0.85);
          margin-top: 2px;
        }

        .wave {
          margin-top: 10px;
          height: 20px;
          display: flex;
          gap: 5px;
          align-items: flex-end;
        }

        .wave span {
          width: 5px;
          height: 6px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.9);
          animation: wave 1.2s ease-in-out infinite;
          opacity: 0.7;
        }

        .wave span:nth-child(2) {
          animation-delay: 0.1s;
        }
        .wave span:nth-child(3) {
          animation-delay: 0.2s;
        }
        .wave span:nth-child(4) {
          animation-delay: 0.3s;
        }
        .wave span:nth-child(5) {
          animation-delay: 0.4s;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .mini {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 12px;
          padding: 9px;
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }

        .mini b {
          font-size: 11px;
          display: block;
          margin-bottom: 5px;
          color: rgba(15, 23, 42, 0.9);
        }

        .cal-head,
        .inv-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .cal-row {
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 6px 0;
          border-top: 1px solid rgba(148, 163, 184, 0.24);
        }

        .cal-row:first-of-type {
          border-top: none;
        }

        .cal-row > span {
          width: 42px;
          font-size: 11px;
          color: rgba(100, 116, 139, 0.9);
          flex-shrink: 0;
        }

        .event {
          flex: 1;
          font-size: 11px;
          padding: 6px 8px;
          border-radius: 10px;
          background: rgba(248, 250, 252, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.26);
          color: rgba(30, 41, 59, 0.96);
        }

        .event.blue {
          background: rgba(59, 130, 246, 0.12);
          border-color: rgba(59, 130, 246, 0.25);
          color: #2563eb;
        }

        .event.ghost {
          opacity: 0.5;
        }

        .pipeline {
          display: grid;
          gap: 8px;
          background: transparent;
          border: none;
          padding: 0;
          box-shadow: none;
        }

        .lane b {
          font-size: 11.5px;
          display: block;
          margin-bottom: 7px;
        }

        .chip {
          font-size: 11px;
          padding: 7px 9px;
          border-radius: 10px;
          background: rgba(219, 234, 254, 0.9);
          border: 1px solid rgba(96, 165, 250, 0.35);
          color: #1d4ed8;
          display: inline-block;
        }

        .step-line {
          font-size: 11px;
          color: rgba(51, 65, 85, 0.9);
          padding: 6px 0;
          border-top: 1px solid rgba(148, 163, 184, 0.24);
        }

        .step-line:first-of-type {
          border-top: none;
          padding-top: 0;
        }

        .inv-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-top: 1px solid rgba(148, 163, 184, 0.24);
          font-size: 11.5px;
          color: rgba(30, 41, 59, 0.9);
          gap: 8px;
        }

        .inv-line span {
          overflow-wrap: anywhere;
        }

        @media (min-width: 768px) {
          .phone-body {
            width: min(100%, 292px);
          }
        }

        .inv-line:first-of-type {
          border-top: none;
        }

        .inv-line.muted {
          color: rgba(30, 41, 59, 0.6);
        }

        .pay-btn {
          width: 100%;
          margin-top: 8px;
          padding: 9px 10px;
          border-radius: 999px;
          border: 1px solid rgba(147, 197, 253, 0.35);
          background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
          color: #fff;
          font-weight: 700;
          font-size: 11.5px;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.38);
        }

        .stars {
          display: flex;
          gap: 5px;
          margin-top: 8px;
        }

        .s {
          width: 14px;
          height: 14px;
          background: rgba(148, 163, 184, 0.3);
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            67% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            33% 57%,
            2% 35%,
            39% 35%
          );
        }

        .s.on {
          background: #f59e0b;
        }

        @keyframes demoUp {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave {
          0%,
          100% {
            height: 6px;
            opacity: 0.5;
          }
          50% {
            height: 18px;
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-node,
          .problem-card::after,
          .solution-card::after,
          .stage-node-active::after {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
