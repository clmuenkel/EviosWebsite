"use client";

import { scrollToId } from "../lib/scroll";
import { BOOKING_CTA_LABEL, BOOKING_URL } from "../lib/booking";

const HERO_BULLETS = [
  "Intake + booking built to your dispatch rules",
  "Automated follow-up + rough estimates that close jobs",
  "Review + reputation automation after every completed job",
] as const;

function HeroPhoneAnimation() {
  return (
    <div
      aria-hidden="true"
      className="hero-phone-wrap mx-auto w-full max-w-[290px] sm:max-w-[340px] md:ml-auto"
    >
      <div className="hero-phone-scene">
        <span className="hero-ring-wave hero-ring-wave-1" />
        <span className="hero-ring-wave hero-ring-wave-2" />
        <span className="hero-ring-wave hero-ring-wave-3" />
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

                <div className="hero-lock-content">
                  <p className="hero-lock-time">9:41</p>
                  <p className="hero-lock-date">Sunday, February 22</p>
                </div>

                <div className="hero-notification hero-notification-main">
                  <span className="hero-notif-icon missed">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 2v6h6" />
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.66-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="hero-notif-copy">
                    <strong>Missed Call</strong>
                    <small>(555) 014-2239</small>
                  </span>
                  <span className="hero-notif-time">just now</span>
                </div>

                <div className="hero-notification hero-notification-sub">
                  <span className="hero-notif-icon auto" />
                  <span className="hero-notif-copy">
                    <strong>Evios</strong>
                    <small>Auto text sent to lead</small>
                  </span>
                </div>

                <p className="hero-swipe-label">Swipe up to open</p>
                <span className="hero-home-indicator" />
              </div>
            </div>
          </div>
        </div>

        <span className="hero-missed-pill">MISSED</span>
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
            Stop losing jobs to missed calls.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-brand-muted sm:text-lg">
            Evios partners with home service contractors to build and integrate
            custom automation into your existing tools — intake + scheduling,
            automated follow-up, rough estimates, and review/reputation flows.
            Live in 1 month. Free for 30 days. If it's not a win, you pay $0.
          </p>

          <ul className="mt-10 max-w-xl space-y-4 text-left text-sm text-brand-text sm:text-base">
            {HERO_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-accent"
                />
                <span className="font-medium">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
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

        .hero-ring-wave {
          position: absolute;
          inset: 6%;
          border-radius: 999px;
          border: 1px solid rgba(59, 130, 246, 0.24);
          transform: scale(0.72);
          opacity: 0;
          animation: ringPulse 2.4s ease-out infinite;
          pointer-events: none;
        }

        .hero-ring-wave-2 {
          animation-delay: 0.25s;
        }

        .hero-ring-wave-3 {
          animation-delay: 0.5s;
        }

        .hero-ambient-glow {
          position: absolute;
          inset: 28% 18% 14%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.32), rgba(59, 130, 246, 0));
          filter: blur(24px);
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
            linear-gradient(165deg, #2f3544 0%, #1a2233 45%, #0f1320 100%),
            linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0));
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 20px 40px rgba(2, 6, 23, 0.45),
            0 42px 90px rgba(2, 6, 23, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.24);
          animation: phoneTilt 6s ease-in-out infinite, phoneShake 3s cubic-bezier(0.22, 1, 0.36, 1) infinite;
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

        .hero-lock-content {
          text-align: center;
          margin-bottom: 18px;
        }

        .hero-lock-time {
          margin: 0;
          font-size: 42px;
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.04em;
          color: rgba(248, 250, 252, 0.97);
        }

        .hero-lock-date {
          margin: 6px 0 0;
          font-size: 13px;
          color: rgba(248, 250, 252, 0.78);
        }

        .hero-notification {
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 9px;
          padding: 9px 10px;
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.2);
        }

        .hero-notification-main {
          animation: notifInMain 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .hero-notification-sub {
          margin-top: 8px;
          grid-template-columns: auto 1fr;
          animation: notifInSub 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .hero-notif-icon {
          width: 24px;
          height: 24px;
          border-radius: 16px;
          display: grid;
          place-items: center;
        }

        .hero-notif-icon.missed {
          background: rgba(239, 68, 68, 0.22);
          color: rgba(254, 226, 226, 0.95);
        }

        .hero-notif-icon.missed svg {
          width: 13px;
          height: 13px;
        }

        .hero-notif-icon.auto {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
        }

        .hero-notif-copy {
          min-width: 0;
          display: grid;
          gap: 1px;
        }

        .hero-notif-copy strong {
          font-size: 13px;
          line-height: 1.2;
          color: rgba(248, 250, 252, 0.95);
        }

        .hero-notif-copy small {
          font-size: 12px;
          color: rgba(248, 250, 252, 0.62);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hero-notif-time {
          align-self: start;
          font-size: 11px;
          color: rgba(248, 250, 252, 0.5);
        }

        .hero-swipe-label {
          margin: 16px 0 8px;
          text-align: center;
          font-size: 11px;
          color: rgba(248, 250, 252, 0.56);
        }

        .hero-home-indicator {
          display: block;
          width: 120px;
          height: 4px;
          margin: 0 auto;
          border-radius: 999px;
          background: rgba(248, 250, 252, 0.7);
        }

        .hero-missed-pill {
          position: absolute;
          top: 5%;
          right: 3%;
          z-index: 6;
          border-radius: 999px;
          border: 1px solid rgba(248, 113, 113, 0.48);
          background: rgba(239, 68, 68, 0.24);
          color: #fee2e2;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          animation: badgePulse 2.4s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0% {
            transform: scale(0.72);
            opacity: 0;
          }
          20% {
            opacity: 0.45;
          }
          100% {
            transform: scale(1.34);
            opacity: 0;
          }
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

        @keyframes phoneShake {
          0%,
          70%,
          100% {
            transform: rotate(0deg);
          }
          74% {
            transform: rotate(-2.8deg) translateX(-1px);
          }
          78% {
            transform: rotate(2.6deg) translateX(1px);
          }
          82% {
            transform: rotate(-2.1deg) translateX(-1px);
          }
          86% {
            transform: rotate(1.8deg) translateX(1px);
          }
          90% {
            transform: rotate(-1.2deg);
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

        @keyframes notifInMain {
          0%,
          12% {
            opacity: 0;
            transform: translateY(-12px);
          }
          25%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes notifInSub {
          0%,
          20% {
            opacity: 0;
            transform: translateY(-10px);
          }
          36%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes badgePulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.42);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ring-wave,
          .hero-phone-float,
          .hero-phone-shell,
          .hero-missed-pill,
          .hero-notification-main,
          .hero-notification-sub,
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
