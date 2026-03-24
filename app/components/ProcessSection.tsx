"use client";

import { useEffect, useRef, useState } from "react";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const s = (d: number) => `${d}s`;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-block-tight section-divider"
    >
      <div className="section-frame flex flex-col items-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          How we work
        </p>
        <h2 className="section-heading mt-4 text-center">
          Your tech team. No hire required.
        </h2>

        <div className="mt-10 flex w-full flex-col gap-[18px] md:flex-row">
          {/* ── Step 1: Map ── */}
          <div
            className={`hw-card ${visible ? "hw-visible" : ""}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="hw-visual">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#0b5394" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect className="hw-stroke" style={{ animationDelay: s(0.4) }} x="16" y="8" width="48" height="64" rx="6" pathLength="1" />
                <line className="hw-stroke" style={{ animationDelay: s(0.7) }} x1="28" y1="20" x2="52" y2="20" pathLength="1" />
                <line className="hw-stroke" style={{ animationDelay: s(0.85) }} x1="28" y1="32" x2="52" y2="32" pathLength="1" />
                <line className="hw-stroke" style={{ animationDelay: s(1.0) }} x1="28" y1="44" x2="44" y2="44" pathLength="1" />
                <polyline className="hw-stroke" style={{ animationDelay: s(1.15) }} points="30,56 36,62 50,48" pathLength="1" />
              </svg>
            </div>
            <div className="hw-text">
              <div className="hw-step-num">Step 01</div>
              <div className="hw-step-title">We map it — together</div>
              <div className="hw-step-desc">
                You tell us how your operation runs. We find the gaps side by side.
              </div>
            </div>
          </div>

          {/* ── Step 2: Build ── */}
          <div
            className={`hw-card ${visible ? "hw-visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="hw-visual">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#0b5394" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline className="hw-stroke" style={{ animationDelay: s(0.5) }} points="24,28 12,40 24,52" pathLength="1" />
                <polyline className="hw-stroke" style={{ animationDelay: s(0.7) }} points="56,28 68,40 56,52" pathLength="1" />
                <line className="hw-stroke" style={{ animationDelay: s(0.9) }} x1="46" y1="18" x2="34" y2="62" pathLength="1" />
              </svg>
            </div>
            <div className="hw-text">
              <div className="hw-step-num">Step 02</div>
              <div className="hw-step-title">We build it</div>
              <div className="hw-step-desc">
                Custom software shaped around your tools. Not off-the-shelf.
              </div>
            </div>
          </div>

          {/* ── Step 3: Run ── */}
          <div
            className={`hw-card ${visible ? "hw-visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="hw-visual">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#0b5394" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path className="hw-stroke" style={{ animationDelay: s(0.5) }} d="M40 8 C18 8, 8 24, 8 40 C8 56, 18 72, 40 72 C62 72, 72 56, 72 40 C72 24, 62 8, 40 8Z" pathLength="1" />
                <polyline className="hw-stroke" style={{ animationDelay: s(0.9) }} points="18,42 30,42 36,32 44,52 50,38 54,42 62,42" pathLength="1" />
              </svg>
            </div>
            <div className="hw-text">
              <div className="hw-step-num">Step 03</div>
              <div className="hw-step-title">We run it</div>
              <div className="hw-step-desc">
                Hosting, updates, support. When something breaks, you call us.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hw-card {
          flex: 1;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.05);
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease,
                      box-shadow 0.3s ease;
        }
        .hw-card.hw-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hw-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .hw-card.hw-visible:hover {
          transform: translateY(-3px);
        }

        .hw-visual {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8f5;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        /* Stroke draw-in */
        @keyframes hwDraw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .hw-stroke {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .hw-visible .hw-stroke {
          animation: hwDraw 0.7s ease forwards;
        }

        .hw-text {
          padding: 22px 22px 24px;
        }
        .hw-step-num {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0b5394;
          opacity: 0.7;
        }
        .hw-step-title {
          margin-top: 6px;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }
        .hw-step-desc {
          margin-top: 8px;
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
        }

        @media (prefers-reduced-motion: reduce) {
          .hw-card {
            opacity: 1;
            transform: none;
            transition: none !important;
          }
          .hw-stroke {
            stroke-dashoffset: 0;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
