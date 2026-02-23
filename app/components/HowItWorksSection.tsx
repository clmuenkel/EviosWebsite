"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type LiveStep = {
  title: string;
  summary: string;
  badge?: "FREE";
  bullets: ReactNode[];
};

const LIVE_STEPS: LiveStep[] = [
  {
    title: "Discovery Session",
    badge: "FREE",
    summary: "We learn your operation inside out - free, no obligation.",
    bullets: [
      "Walk us through every step of how jobs come in and get closed",
      "We pinpoint where revenue is leaking and rank fixes by impact",
      "You leave with a clear picture of what gets built - before a line of code is written",
      "Backed by data from plumbing contractors we have already helped",
    ],
  },
  {
    title: "We Build It",
    badge: "FREE",
    summary:
      "We build exactly what we scoped. You test every piece as it comes together.",
    bullets: [
      "No surprises - you approved the spec before we started",
      "Regular check-ins; you test in real conditions with your real data",
      "Plugs into ServiceTitan, Jobber, Housecall Pro, or whatever you run",
      <>
        You know <b className="text-brand-text">100% what you are paying for</b>{" "}
        before you pay a penny
      </>,
    ],
  },
  {
    title: "Go Live",
    summary: "Results from day one. If it is not a win, you owe nothing.",
    bullets: [
      <>
        <b className="text-brand-text">
          Immediate results - no ramp-up, no waiting period
        </b>
      </>,
      "Your workflow stays the same; the system runs in the background",
      "We host and maintain it - zero tech headaches",
      "Ongoing support included for the life of the engagement",
    ],
  },
] as const;

function TimelineEmotionIcon({
  stepIndex,
  active,
  celebrationKey,
}: {
  stepIndex: number;
  active: boolean;
  celebrationKey: number;
}) {
  if (stepIndex === 0) {
    return (
      <span className={`timeline-icon timeline-icon-discovery ${active ? "is-active" : ""}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="5.5" />
          <path d="M15.2 15.2L20 20" />
          <circle className="scan-dot" cx="14.8" cy="8.2" r="1.2" />
        </svg>
      </span>
    );
  }

  if (stepIndex === 1) {
    return (
      <span className={`timeline-icon timeline-icon-build ${active ? "is-active" : ""}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 4l1.2 1.8 2.1-.2.6 2 2 1-1 1.9 1 1.9-2 1-.6 2-2.1-.2L13 18l-1.9-1-2.1.2-.6-2-2-1 1-1.9-1-1.9 2-1 .6-2 2.1.2L13 4z" />
          <circle cx="13" cy="11" r="2.1" />
          <path d="M4 20l5.2-5.2" />
          <path d="M3.5 16.5l2 2" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`timeline-icon timeline-icon-live ${active ? "is-active" : ""}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4c3 2.5 4.6 6.1 4.5 10.2L12 19l-4.5-4.8C7.4 10.1 9 6.5 12 4z" />
        <path d="M12 10.3v4.3" />
        <path d="M10.2 14h3.6" />
      </svg>
      <span key={`burst-${celebrationKey}`} className="live-burst" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </span>
  );
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const active = LIVE_STEPS[activeStep];
  const progressRatio = activeStep / (LIVE_STEPS.length - 1);
  const timelineProgressStyle = {
    "--progress-x": `${progressRatio * 100}%`,
    "--progress-y": `${progressRatio * 100}%`,
  } as CSSProperties;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (index === 2) {
      setCelebrationKey((current) => current + 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-block section-divider"
    >
      <div className="section-frame how-timeline" data-visible={isVisible}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Not the usual agency playbook
        </p>
        <h2 className="section-heading mt-4">
          Live in 1 month - or you do not pay a dime.
        </h2>
        <p className="section-copy max-w-3xl">
          Most vendors sell you a contract before you have seen a thing. We flip
          that. You see exactly what we build, test it yourself, and only pay
          when you love it.
        </p>

        <div className="timeline-shell mt-10">
          <ol className="timeline-track" style={timelineProgressStyle}>
            <span className="timeline-line" aria-hidden="true" />
            <span className="timeline-progress" aria-hidden="true" />
            {LIVE_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isComplete = index < activeStep;
              return (
                <li
                  key={step.title}
                  className={`timeline-node-wrap ${isActive ? "is-active" : ""} ${
                    isComplete ? "is-complete" : ""
                  }`}
                  style={{ "--node-delay": `${index * 140}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    className="timeline-node"
                    onClick={() => handleStepClick(index)}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="timeline-node-dot">
                      <span className="timeline-node-number">{index + 1}</span>
                      <TimelineEmotionIcon
                        stepIndex={index}
                        active={isActive}
                        celebrationKey={celebrationKey}
                      />
                    </span>
                    <span className="timeline-node-label">
                      {step.title}
                      {step.badge ? (
                        <span className="timeline-node-badge">{step.badge}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div key={active.title} className="timeline-panel surface-card mt-6 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-brand-text">{active.title}</h3>
              {active.badge ? (
                <span className="rounded-full border border-brand-accent/40 bg-brand-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-accent">
                  {active.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {active.summary}
            </p>
            <ul className="timeline-panel-list mt-4 space-y-3 rounded-md border border-white/10 bg-brand-bg px-5 py-4 text-sm leading-relaxed text-brand-muted">
              {active.bullets.map((bullet, bulletIndex) => (
                <li
                  key={`${active.title}-${bulletIndex}`}
                  className="timeline-bullet-item"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-accent"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <style jsx global>{`
          .how-timeline .timeline-shell {
            position: relative;
          }

          .how-timeline .timeline-track {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 14px;
            position: relative;
          }

          .how-timeline .timeline-line,
          .how-timeline .timeline-progress {
            position: absolute;
            left: 19px;
            top: 26px;
            width: 2px;
            height: calc(100% - 52px);
            border-radius: 999px;
            pointer-events: none;
          }

          .how-timeline .timeline-line {
            background: rgba(148, 163, 184, 0.35);
          }

          .how-timeline .timeline-progress {
            background: linear-gradient(180deg, #38bdf8 0%, #3b82f6 100%);
            height: calc((100% - 52px) * var(--progress-y, 0%));
            transition: height 360ms ease;
            box-shadow: 0 0 16px rgba(59, 130, 246, 0.45);
          }

          .how-timeline .timeline-node-wrap {
            opacity: 0;
            transform: translateY(10px);
          }

          .how-timeline[data-visible="true"] .timeline-node-wrap {
            animation: timelineNodeIn 460ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: var(--node-delay, 0ms);
          }

          .how-timeline .timeline-node {
            border: 0;
            padding: 0;
            background: none;
            color: inherit;
            width: 100%;
            text-align: left;
            display: grid;
            grid-template-columns: 40px minmax(0, 1fr);
            align-items: center;
            gap: 14px;
            cursor: pointer;
          }

          .how-timeline .timeline-node-dot {
            width: 40px;
            height: 40px;
            border-radius: 999px;
            border: 1px solid rgba(148, 163, 184, 0.4);
            background: rgba(15, 23, 42, 0.82);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition:
              border-color 240ms ease,
              box-shadow 240ms ease,
              transform 240ms ease;
          }

          .how-timeline .timeline-node-number {
            font-size: 12px;
            font-weight: 700;
            color: rgba(226, 232, 240, 0.95);
            transition: opacity 220ms ease;
          }

          .how-timeline .timeline-icon {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.92);
            transition:
              opacity 240ms ease,
              transform 240ms ease;
          }

          .how-timeline .timeline-icon svg {
            width: 22px;
            height: 22px;
            fill: none;
            stroke: #dbeafe;
            stroke-width: 1.8;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .how-timeline .timeline-icon-live svg {
            fill: rgba(14, 165, 233, 0.2);
          }

          .how-timeline .timeline-node-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 15px;
            font-weight: 600;
            color: rgba(226, 232, 240, 0.85);
            transition: color 220ms ease;
            flex-wrap: wrap;
          }

          .how-timeline .timeline-node-badge {
            border-radius: 999px;
            border: 1px solid rgba(59, 130, 246, 0.38);
            background: rgba(59, 130, 246, 0.12);
            padding: 2px 8px;
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #93c5fd;
          }

          .how-timeline .timeline-node-wrap.is-active .timeline-node-dot,
          .how-timeline .timeline-node:hover .timeline-node-dot {
            border-color: rgba(59, 130, 246, 0.7);
            box-shadow:
              0 0 0 1px rgba(59, 130, 246, 0.42),
              0 0 20px rgba(59, 130, 246, 0.36);
            transform: translateY(-1px);
          }

          .how-timeline .timeline-node-wrap.is-active .timeline-node-label {
            color: rgba(241, 245, 249, 0.98);
          }

          .how-timeline .timeline-node-wrap.is-active .timeline-node-number {
            opacity: 0;
          }

          .how-timeline .timeline-node-wrap.is-active .timeline-icon {
            opacity: 1;
            transform: scale(1);
          }

          .how-timeline .timeline-panel {
            animation: timelinePanelIn 320ms ease-out;
          }

          .how-timeline .timeline-panel-list {
            margin: 0;
          }

          .how-timeline .timeline-bullet-item {
            width: 100%;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            border: 0;
            background: none;
            color: inherit;
            padding: 0;
            text-align: left;
            cursor: default;
          }

          .how-timeline .timeline-icon-discovery.is-active svg {
            animation: discoverySearch 1.8s ease-in-out infinite;
          }

          .how-timeline .timeline-icon-discovery.is-active .scan-dot {
            fill: #38bdf8;
            stroke: none;
            animation: discoveryPulse 1.8s ease-in-out infinite;
          }

          .how-timeline .timeline-icon-build.is-active svg {
            animation: buildTinker 1.35s cubic-bezier(0.16, 1, 0.3, 1) infinite;
            transform-origin: 50% 50%;
          }

          .how-timeline .timeline-icon-live.is-active svg {
            animation: liveLift 1.4s ease-in-out infinite;
            transform-origin: 50% 55%;
          }

          .how-timeline .live-burst {
            position: absolute;
            inset: -8px;
            pointer-events: none;
          }

          .how-timeline .live-burst i {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 2px;
            height: 8px;
            border-radius: 999px;
            transform-origin: center -10px;
            background: linear-gradient(180deg, #7dd3fc 0%, #60a5fa 100%);
            animation: liveBurst 680ms ease-out 1 both;
          }

          .how-timeline .live-burst i:nth-child(1) {
            transform: rotate(0deg) translate(-50%, -50%);
          }
          .how-timeline .live-burst i:nth-child(2) {
            transform: rotate(60deg) translate(-50%, -50%);
          }
          .how-timeline .live-burst i:nth-child(3) {
            transform: rotate(120deg) translate(-50%, -50%);
          }
          .how-timeline .live-burst i:nth-child(4) {
            transform: rotate(180deg) translate(-50%, -50%);
          }
          .how-timeline .live-burst i:nth-child(5) {
            transform: rotate(240deg) translate(-50%, -50%);
          }
          .how-timeline .live-burst i:nth-child(6) {
            transform: rotate(300deg) translate(-50%, -50%);
          }

          @media (min-width: 768px) {
            .how-timeline .timeline-track {
              flex-direction: row;
              justify-content: space-between;
              align-items: start;
              gap: 18px;
            }

            .how-timeline .timeline-line,
            .how-timeline .timeline-progress {
              left: 10%;
              width: 80%;
              top: 19px;
              height: 2px;
            }

            .how-timeline .timeline-progress {
              width: calc(80% * var(--progress-x, 0%));
              transition: width 360ms ease;
            }

            .how-timeline .timeline-node-wrap {
              flex: 1;
              min-width: 0;
            }

            .how-timeline .timeline-node {
              grid-template-columns: 1fr;
              justify-items: center;
              gap: 10px;
              text-align: center;
            }

            .how-timeline .timeline-node-label {
              justify-content: center;
            }
          }

          @keyframes timelineNodeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes timelinePanelIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes discoverySearch {
            0%,
            100% {
              transform: translate(-1px, 0) rotate(-8deg);
            }
            50% {
              transform: translate(1px, 1px) rotate(8deg);
            }
          }

          @keyframes discoveryPulse {
            0%,
            100% {
              opacity: 0.6;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          @keyframes buildTinker {
            0%,
            100% {
              transform: rotate(0deg);
            }
            35% {
              transform: rotate(-14deg);
            }
            70% {
              transform: rotate(14deg);
            }
          }

          @keyframes liveLift {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2px);
            }
          }

          @keyframes liveBurst {
            0% {
              opacity: 0;
              scale: 0.2;
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              scale: 1;
              translate: 0 -14px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .how-timeline .timeline-node-wrap,
            .how-timeline .timeline-panel,
            .how-timeline .timeline-icon svg,
            .how-timeline .timeline-icon-discovery .scan-dot,
            .how-timeline .live-burst i {
              animation: none !important;
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
