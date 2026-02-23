"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToId } from "../lib/scroll";
import { BOOKING_CTA_LABEL, BOOKING_URL } from "../lib/booking";

const CHECKLIST_ITEMS = [
  "Missed call covered",
  "Follow-up covered",
  "On-site quoting covered",
  "Reviews covered",
] as const;

function HeroPhoneAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    CHECKLIST_ITEMS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), (i + 1) * 1500));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hero-phone-wrap mx-auto w-full max-w-[290px] sm:max-w-[340px] md:ml-auto"
    >
      <div className="hero-phone-scene">
        <span className="hero-ambient-glow" />

        <div className="hero-phone-perspective">
          <div className="hero-phone-float">
            <div className="hero-phone-shell">
              <span className="hero-phone-btn left hero-phone-btn-silent" />
              <span className="hero-phone-btn left hero-phone-btn-vol-up" />
              <span className="hero-phone-btn left hero-phone-btn-vol-down" />
              <span className="hero-phone-btn right hero-phone-btn-power" />

              <div className="hero-phone-screen">
                <span className="hero-screen-reflection" />

                <div className="hero-island">
                  <span className="hero-island-camera" />
                </div>

                <div className="hero-checklist">
                  <p className="hero-checklist-title">Automation Checklist</p>
                  {CHECKLIST_ITEMS.map((item, index) => (
                    <div
                      key={item}
                      className={`hero-checklist-item${index < visibleCount ? " is-visible" : ""}`}
                    >
                      <span className="hero-check-icon" aria-hidden="true">
                        <svg viewBox="0 0 14 14">
                          <path d="M2 7.5L5.4 11L12 3.4" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <span className="hero-home-indicator" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="section-block relative overflow-hidden pb-14 pt-24 sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/15 blur-3xl" />

      <div className="section-frame relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="order-1">
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-brand-text sm:text-4xl lg:text-5xl xl:text-6xl">
            Every gap in your business, automated.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-brand-muted sm:text-lg">
            Calls, follow-up, quoting, and reviews run automatically while your team is in the field.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-md bg-gradient-to-r from-brand-accent to-brand-accentDark px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              {BOOKING_CTA_LABEL}
            </a>
            <button
              type="button"
              onClick={() => scrollToId("demo")}
              className="w-full rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-brand-text transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent hover:text-white sm:w-auto"
            >
              Hear a demo call
            </button>
          </div>

          <p className="mt-5 text-sm text-brand-muted/90">
            No contract to start. Keep your current phone system.
          </p>
        </div>

        <div className="order-2 flex justify-center md:justify-end">
          <HeroPhoneAnimation />
        </div>
      </div>

      <style jsx global>{`
        .hero-phone-scene {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1.15;
        }

        .hero-ambient-glow {
          position: absolute;
          inset: 30% 18% 15%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.26), rgba(59, 130, 246, 0));
          filter: blur(22px);
          animation: ambientPulse 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-phone-perspective {
          perspective: 1200px;
          width: min(100%, 260px);
          position: relative;
          z-index: 2;
        }

        .hero-phone-float {
          width: 100%;
          position: relative;
          animation: phoneFloat 3.6s ease-in-out infinite;
          will-change: transform;
        }

        .hero-phone-shell {
          position: relative;
          border-radius: 44px;
          padding: 6px;
          background:
            linear-gradient(165deg, #30394a 0%, #1d2738 45%, #11192a 100%),
            linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 14px 28px rgba(2, 6, 23, 0.36),
            0 30px 56px rgba(2, 6, 23, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          animation: phoneTilt 6s ease-in-out infinite;
          transform-origin: center center;
          overflow: visible;
        }

        .hero-phone-btn {
          position: absolute;
          width: 3px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(226, 232, 240, 0.8), rgba(71, 85, 105, 0.75));
          z-index: 5;
        }

        .hero-phone-btn.left {
          left: -3px;
        }

        .hero-phone-btn.right {
          right: -3px;
        }

        .hero-phone-btn-silent {
          top: 68px;
          height: 13px;
        }

        .hero-phone-btn-vol-up {
          top: 93px;
          height: 31px;
        }

        .hero-phone-btn-vol-down {
          top: 133px;
          height: 31px;
        }

        .hero-phone-btn-power {
          top: 113px;
          height: 48px;
        }

        .hero-phone-screen {
          border-radius: 38px;
          border: 1px solid rgba(148, 163, 184, 0.26);
          background:
            radial-gradient(circle at 20% -10%, rgba(59, 130, 246, 0.18), transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.15), transparent 40%),
            linear-gradient(180deg, #0c1220 0%, #0f172a 45%, #111827 100%);
          color: #f8fafc;
          padding: 10px 10px 14px;
          position: relative;
          overflow: hidden;
          min-height: 510px;
          display: flex;
          flex-direction: column;
        }

        .hero-screen-reflection {
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

        .hero-island {
          width: 90px;
          height: 26px;
          border-radius: 999px;
          margin: 0 auto 16px;
          background: rgba(2, 6, 23, 0.96);
          position: relative;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 1px 3px rgba(2, 6, 23, 0.5);
        }

        .hero-island-camera {
          position: absolute;
          right: 11px;
          top: 11px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(71, 85, 105, 0.95);
          box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8);
        }

        .hero-checklist {
          margin: 8px 0 14px;
          display: grid;
          gap: 14px;
          flex: 1;
          align-content: center;
        }

        .hero-checklist-title {
          margin: 0 0 6px;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(191, 219, 254, 0.8);
          font-weight: 700;
          text-align: center;
        }

        .hero-checklist-item {
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.24);
          background: rgba(15, 23, 42, 0.66);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 14px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(226, 232, 240, 0.95);
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          transition:
            opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 600ms ease,
            background-color 600ms ease;
        }

        .hero-checklist-item.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          border-color: rgba(74, 222, 128, 0.35);
          background: rgba(10, 25, 14, 0.58);
        }

        .hero-check-icon {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1px solid rgba(74, 222, 128, 0.35);
          background: rgba(22, 163, 74, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 400ms ease;
        }

        .hero-checklist-item.is-visible .hero-check-icon {
          border-color: rgba(74, 222, 128, 0.65);
          background: rgba(22, 163, 74, 0.24);
        }

        .hero-check-icon svg {
          width: 13px;
          height: 13px;
          fill: none;
          stroke: rgba(74, 222, 128, 0.95);
          stroke-width: 2.1;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .hero-home-indicator {
          display: block;
          width: 120px;
          height: 4px;
          margin: 0 auto;
          border-radius: 999px;
          background: rgba(248, 250, 252, 0.7);
        }


        @keyframes ambientPulse {
          0%,
          100% {
            opacity: 0.65;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes phoneFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes phoneTilt {
          0% {
            transform: rotateX(2deg) rotateY(-3deg);
          }
          50% {
            transform: rotateX(3deg) rotateY(3deg);
          }
          100% {
            transform: rotateX(2deg) rotateY(-3deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-phone-float,
          .hero-phone-shell,
          .hero-ambient-glow {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
