"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

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
      "Urgent issues like leaks, no water, and sewer backups are flagged and routed to your on-call team immediately.",
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [glowVisible, setGlowVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setGlowVisible(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const updateGlimmerPosition = (event: MouseEvent<HTMLSpanElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty("--mx", `${x}px`);
    target.style.setProperty("--my", `${y}px`);
  };

  const retriggerShimmer = (event: MouseEvent<HTMLSpanElement>) => {
    const target = event.currentTarget;
    target.classList.remove("trust-chip-shimmer");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.classList.add("trust-chip-shimmer");
      });
    });
  };

  return (
    <section ref={sectionRef} className="border-t border-white/10 px-6 pb-12 pt-8 sm:px-10">
      <div className="section-frame flex flex-wrap items-start justify-center gap-4">
        {TRUST_CHIPS.map((chip, index) => (
          <span
            key={chip.label}
            className={`trust-chip group relative w-full max-w-[360px] cursor-default overflow-hidden rounded-[28px] border border-white/15 bg-brand-surface px-5 py-3 text-left text-sm font-medium leading-relaxed text-brand-muted transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-text sm:w-auto sm:min-w-[270px] ${
              glowVisible ? "trust-chip-glow trust-chip-shimmer" : ""
            }`}
            style={{ animationDelay: `${index * 0.12}s` }}
            onMouseMove={updateGlimmerPosition}
            onMouseEnter={retriggerShimmer}
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
        .trust-chip {
          --mx: 50%;
          --my: 50%;
        }

        .trust-chip::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            180px circle at var(--mx) var(--my),
            rgba(56, 189, 248, 0.24),
            rgba(56, 189, 248, 0)
          );
          opacity: 0;
          transition: opacity 180ms ease-out;
          pointer-events: none;
        }

        .trust-chip:hover::after {
          opacity: 1;
        }

        .trust-chip::before {
          content: "";
          position: absolute;
          inset: -120% auto -120% -40%;
          width: 38%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0)
          );
          transform: rotate(12deg);
          opacity: 0;
          pointer-events: none;
        }

        .trust-chip-shimmer::before {
          animation: trustChipShimmer 0.72s ease-out 1 both;
        }

        .trust-chip-glow {
          animation: trustChipGlow 0.6s ease-out both;
        }

        @keyframes trustChipShimmer {
          0% {
            transform: translateX(-220%) rotate(12deg);
            opacity: 0;
          }
          30% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(380%) rotate(12deg);
            opacity: 0;
          }
        }

        @keyframes trustChipGlow {
          0% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          40% {
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          }
          100% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </section>
  );
}
