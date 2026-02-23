"use client";

import { useEffect, useRef, useState } from "react";

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
          When your team is in the field, the phone cannot ring twice.
        </h2>
        <p className="section-copy text-pretty">
          Most home service teams miss leads because crews cannot answer mid-job,
          after-hours goes to voicemail, and follow-up breaks down. Evios keeps
          response and booking consistent while your team stays focused on
          delivery.
        </p>

        <div className="mt-8 grid grid-cols-1">
          <article
            className={`pain-card-shell ${isVisible ? "is-visible" : ""}`}
          >
            <div className="pain-card-inner p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="pain-icon-wrap" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.66-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-brand-text">
                  Answer fast, qualify clearly, route correctly.
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Every inbound call and web lead is captured, qualified, and
                routed with your exact rules so the right jobs get booked fast.
              </p>
            </div>
          </article>
        </div>
      </div>

      <style jsx>{`
        .pain-card-shell {
          border-radius: 16px;
          padding: 1px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
          opacity: 0;
          transform: translateY(18px);
          transition: transform 260ms ease, box-shadow 260ms ease;
        }

        .pain-card-shell.is-visible {
          animation: cardReveal 560ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pain-card-inner {
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #111b2d;
          box-shadow: 0 12px 28px rgba(2, 6, 23, 0.28);
        }

        .pain-card-shell:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 34px rgba(2, 6, 23, 0.42);
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

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pain-card-shell {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
