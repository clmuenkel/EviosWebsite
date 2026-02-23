"use client";

import type { CSSProperties } from "react";

const OFFER_ITEMS = [
  "Free discovery to map your workflow.",
  "Free implementation and integration.",
  "Live in about 1 month.",
  "Use it free for ~30 days.",
  "No fit? You pay $0.",
] as const;

const GUARANTEE_POINTS = [
  "Custom automation, not cookie-cutter software.",
  "Built around your current tools and workflow.",
  "You validate first, then decide to pay.",
] as const;

export function OfferSection() {
  return (
    <section id="offer" className="offer-section section-block-tight section-divider">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Try For 30
        </p>
        <h2 className="section-heading mt-4">
          Live in 1 month. No value, no bill.
        </h2>

        <div className="offer-grid mt-8">
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
          </div>

          <aside className="offer-side p-6">
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

          .offer-section .offer-inner {
            background:
              radial-gradient(circle at 22% 0%, rgba(56, 189, 248, 0.14), transparent 46%),
              rgba(15, 23, 42, 0.72);
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

          .offer-section .offer-side {
            background:
              radial-gradient(circle at 18% 0%, rgba(56, 189, 248, 0.12), transparent 42%),
              rgba(15, 23, 42, 0.56);
            border-radius: 16px;
          }

          @media (min-width: 960px) {
            .offer-section .offer-grid {
              grid-template-columns: 1.12fr 0.88fr;
              align-items: stretch;
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
