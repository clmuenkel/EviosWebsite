"use client";

import type { CSSProperties } from "react";
import { BookCta } from "./BookCta";

const OFFER_ITEMS = [
  "Free discovery - we map your intake and booking rules.",
  "Free implementation - we build and integrate it for you.",
  "Live in 1 month with done-for-you setup.",
  "Free usage for ~30 days.",
  "If it is not a fit after, you pay $0.",
] as const;

const GUARANTEE_POINTS = [
  "Custom automation, not templated software.",
  "Built around your existing stack and team workflows.",
  "You validate the system before spending a dollar.",
] as const;

export function OfferSection() {
  return (
    <section id="offer" className="offer-section section-block section-divider">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Try For 30
        </p>
        <h2 className="section-heading mt-4">
          Live in 1 month. If it does not create value, you pay $0.
        </h2>

        <div className="offer-grid mt-8">
          <div className="offer-shell rounded-[20px] p-[1px]">
            <div className="offer-inner surface-card p-6">
              <ul className="space-y-3.5">
                {OFFER_ITEMS.map((item, index) => (
                  <li
                    key={item}
                    className="offer-item flex items-start gap-3 text-sm text-brand-muted"
                    style={{ "--offer-delay": `${index * 100}ms` } as CSSProperties}
                  >
                    <span className="offer-check mt-0.5" aria-hidden="true">
                      <svg viewBox="0 0 14 14">
                        <path d="M2 7.5L5.4 11L12 3.4" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="offer-cta-wrap mt-8">
                <BookCta />
              </div>
            </div>
          </div>

          <aside className="offer-side surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Why This Works
            </p>
            <h3 className="mt-3 text-xl font-semibold text-brand-text">
              You get a custom system with no upfront risk.
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-brand-muted">
              {GUARANTEE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-accent"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <style jsx global>{`
          .offer-section .offer-grid {
            display: grid;
            gap: 18px;
            grid-template-columns: 1fr;
          }

          .offer-section .offer-shell {
            background: linear-gradient(
              125deg,
              rgba(56, 189, 248, 0.5),
              rgba(59, 130, 246, 0.18),
              rgba(56, 189, 248, 0.4)
            );
            background-size: 200% 100%;
            animation: offerBorderShift 7s ease-in-out infinite;
          }

          .offer-section .offer-inner {
            position: relative;
            overflow: hidden;
            border-radius: 19px;
            background:
              radial-gradient(circle at 22% 0%, rgba(56, 189, 248, 0.16), transparent 46%),
              rgba(15, 23, 42, 0.82);
          }

          .offer-section .offer-inner::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: -36%;
            width: 30%;
            transform: skewX(-15deg);
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0)
            );
            animation: offerSweep 4.2s ease-in-out infinite;
            pointer-events: none;
          }

          .offer-section .offer-item {
            opacity: 0;
            transform: translateY(6px);
            animation: offerItemIn 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: var(--offer-delay, 0ms);
          }

          .offer-section .offer-check {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            border: 1px solid rgba(74, 222, 128, 0.4);
            background: rgba(22, 163, 74, 0.16);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .offer-section .offer-check svg {
            width: 11px;
            height: 11px;
            fill: none;
            stroke: rgba(74, 222, 128, 0.95);
            stroke-width: 2.1;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 20;
            stroke-dashoffset: 20;
            animation: offerCheckDraw 460ms ease-out forwards;
            animation-delay: calc(var(--offer-delay, 0ms) + 150ms);
          }

          .offer-section .offer-cta-wrap {
            border-radius: 14px;
            border: 1px solid rgba(56, 189, 248, 0.32);
            background: rgba(2, 6, 23, 0.45);
            padding: 12px;
            transition:
              transform 220ms ease,
              border-color 220ms ease,
              box-shadow 220ms ease;
          }

          .offer-section .offer-cta-wrap:hover {
            transform: translateY(-2px);
            border-color: rgba(56, 189, 248, 0.55);
            box-shadow: 0 16px 28px rgba(2, 6, 23, 0.35);
          }

          .offer-section .offer-side {
            border-color: rgba(148, 163, 184, 0.24);
            background:
              radial-gradient(circle at 18% 0%, rgba(56, 189, 248, 0.14), transparent 42%),
              rgba(15, 23, 42, 0.8);
          }

          @media (min-width: 960px) {
            .offer-section .offer-grid {
              grid-template-columns: 1.12fr 0.88fr;
              align-items: stretch;
            }
          }

          @keyframes offerBorderShift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes offerSweep {
            0%,
            75% {
              left: -36%;
              opacity: 0;
            }
            85% {
              opacity: 1;
            }
            100% {
              left: 130%;
              opacity: 0;
            }
          }

          @keyframes offerItemIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes offerCheckDraw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .offer-section * {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
