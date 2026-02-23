"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

type PainIcon = "phone" | "calendar" | "message";

const PAIN_CARDS = [
  {
    title: "Answer + qualify",
    icon: "phone" as PainIcon,
    body: "Name, address, issue, urgency, availability, budget range if needed.",
  },
  {
    title: "Schedule + route",
    icon: "calendar" as PainIcon,
    body: "Books into your calendar or sends to dispatch with all details.",
  },
  {
    title: "Follow-up + close",
    icon: "message" as PainIcon,
    body: "Automated touches for missed calls and estimates.",
  },
] as const;

function PainIconGlyph({ icon }: { icon: PainIcon }) {
  if (icon === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="icon-phone h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.66-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path className="icon-check" d="m8 14 2.2 2.2L16 10.6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle className="icon-send-dot" cx="18" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PainOutcome() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-block section-divider overflow-hidden">
      <div className="section-frame">
        <h2 className="section-heading max-w-3xl">
          When you're under a sink, the phone can't ring twice.
        </h2>
        <p className="section-copy text-pretty">
          Most small plumbing shops miss leads because techs can't answer
          mid-job, after-hours goes to voicemail, and estimates die in
          follow-up. Evios handles the front door so you can stay on the tools.
        </p>

        <div className={`pain-pipeline mt-10 hidden md:block ${isVisible ? "is-visible" : ""}`}>
          <span className="pain-pipeline-track" />
          <span className="pain-pipeline-node pain-pipeline-node-1" />
          <span className="pain-pipeline-node pain-pipeline-node-2" />
          <span className="pain-pipeline-particle" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PAIN_CARDS.map((card, index) => (
            <div
              key={card.title}
              className={`pain-card-reveal ${isVisible ? "is-visible" : ""}`}
              style={{ "--delay": `${300 + index * 400}ms` } as CSSProperties}
            >
              <article className="pain-card-shell">
                <div className="pain-card-inner p-6">
                  <div className="flex items-center gap-3">
                    <span className="pain-icon-wrap">
                      <PainIconGlyph icon={card.icon} />
                    </span>
                    <h3 className="text-lg font-semibold text-brand-text">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {card.body}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pain-pipeline {
          position: relative;
          height: 18px;
        }

        .pain-pipeline-track {
          position: absolute;
          top: 8px;
          left: 3%;
          right: 3%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(59, 130, 246, 0.14),
            rgba(59, 130, 246, 0.5),
            rgba(59, 130, 246, 0.14)
          );
          transform: scaleX(0);
          transform-origin: left;
        }

        .pain-pipeline-node {
          position: absolute;
          top: 2px;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1px solid rgba(59, 130, 246, 0.6);
          background: #0f172a;
          opacity: 0;
        }

        .pain-pipeline-node-1 {
          left: 33%;
          transform: translateX(-50%);
        }

        .pain-pipeline-node-2 {
          left: 66%;
          transform: translateX(-50%);
        }

        .pain-pipeline-particle {
          position: absolute;
          top: 4px;
          left: 3%;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #38bdf8;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.9);
          opacity: 0;
        }

        .pain-pipeline.is-visible .pain-pipeline-track {
          animation: lineDraw 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pain-pipeline.is-visible .pain-pipeline-particle {
          animation: particleTravel 2s ease-out 250ms forwards;
        }

        .pain-pipeline.is-visible .pain-pipeline-node-1 {
          animation: nodeAppear 300ms ease-out 900ms forwards;
        }

        .pain-pipeline.is-visible .pain-pipeline-node-2 {
          animation: nodeAppear 300ms ease-out 1300ms forwards;
        }

        .pain-card-reveal {
          opacity: 0;
          transform: translateY(24px) scale(0.97);
        }

        .pain-card-reveal.is-visible {
          animation: cardReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--delay);
        }

        .pain-card-shell {
          position: relative;
          border-radius: 16px;
          padding: 1px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition:
            transform 260ms ease,
            box-shadow 260ms ease,
            animation-duration 260ms ease;
        }

        .pain-card-shell::before {
          content: "";
          position: absolute;
          inset: -140%;
          background: conic-gradient(
            from 0deg,
            rgba(59, 130, 246, 0.9) 0deg,
            rgba(59, 130, 246, 0) 120deg,
            rgba(14, 165, 233, 0.9) 240deg,
            rgba(14, 165, 233, 0) 360deg
          );
          animation: borderSpin 4s linear infinite;
          pointer-events: none;
        }

        .pain-card-inner {
          position: relative;
          z-index: 1;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #111b2d;
          height: 100%;
          box-shadow: 0 12px 28px rgba(2, 6, 23, 0.28);
        }

        .pain-card-shell:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 34px rgba(2, 6, 23, 0.42);
        }

        .pain-card-shell:hover::before {
          animation-duration: 2s;
        }

        .pain-icon-wrap {
          display: flex;
          height: 36px;
          width: 36px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
        }

        .pain-card-reveal.is-visible .pain-icon-wrap {
          animation: iconPop 500ms ease-out both;
          animation-delay: calc(var(--delay) + 120ms);
        }

        .pain-card-shell:hover .icon-phone {
          animation: phoneShake 0.4s ease-in-out;
        }

        .icon-check {
          stroke-dasharray: 16;
          stroke-dashoffset: 16;
        }

        .pain-card-shell:hover .icon-check {
          animation: checkDraw 0.5s ease-out forwards;
        }

        .pain-card-shell:hover .icon-send-dot {
          animation: sendSlide 0.4s ease-out;
        }

        @keyframes lineDraw {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes particleTravel {
          0% {
            left: 3%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 97%;
            opacity: 0;
          }
        }

        @keyframes nodeAppear {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.7);
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes borderSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes iconPop {
          0% {
            transform: scale(0.85);
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          60% {
            transform: scale(1.06);
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        @keyframes phoneShake {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(8deg);
          }
          75% {
            transform: rotate(-6deg);
          }
        }

        @keyframes checkDraw {
          from {
            stroke-dashoffset: 16;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes sendSlide {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          80% {
            transform: translateX(4px);
            opacity: 0.85;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pain-pipeline-track,
          .pain-pipeline-node,
          .pain-pipeline-particle,
          .pain-card-reveal,
          .pain-card-shell,
          .pain-icon-wrap,
          .icon-phone,
          .icon-check,
          .icon-send-dot {
            animation: none !important;
            transition: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
