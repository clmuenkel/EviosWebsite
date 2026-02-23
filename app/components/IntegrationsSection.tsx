"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type IntegrationItem = {
  name: string;
  color: string;
  slug: string;
  logoSrc?: string;
  position: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomRight";
};

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "ServiceTitan",
    color: "#df5828",
    slug: "servicetitan",
    logoSrc: "/integrations/servicetitan.png",
    position: "topLeft",
  },
  {
    name: "Jobber",
    color: "#4caf50",
    slug: "jobber",
    logoSrc: "/integrations/jobber.png",
    position: "topCenter",
  },
  {
    name: "Housecall Pro",
    color: "#0075ff",
    slug: "housecall-pro",
    logoSrc: "/integrations/housecall-pro.png",
    position: "topRight",
  },
  {
    name: "Google Calendar",
    color: "#4285f4",
    slug: "google-calendar",
    logoSrc: "/integrations/google-calendar.png",
    position: "bottomLeft",
  },
  { name: "Zapier / Webhooks", color: "#ff4a00", slug: "zapier", position: "bottomRight" },
];

const CONNECTOR_POINTS: Record<string, { x: number; y: number; delay: string }> = {
  servicetitan: { x: 10, y: 16, delay: "0.1s" },
  jobber: { x: 50, y: 16, delay: "0.45s" },
  "housecall-pro": { x: 90, y: 16, delay: "0.8s" },
  "google-calendar": { x: 30, y: 84, delay: "1.15s" },
  zapier: { x: 70, y: 84, delay: "1.5s" },
};

export function IntegrationsSection() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.22 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="integrations"
      className="integrations-showcase section-block-tight section-divider"
      data-visible={isVisible}
    >
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Zero Migration
        </p>
        <h2 className="section-heading mt-4">Keep your stack. We plug right in.</h2>
        <p className="section-copy">
          We build custom automations around your current tools, then integrate
          intake, follow-up, estimates, and review workflows directly into how
          your team already operates.
        </p>

        <div className="integration-map mt-10">
          <div className="connector-layer" aria-hidden="true">
            <svg
              className="connector-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {INTEGRATIONS.map((integration) => {
                const point = CONNECTOR_POINTS[integration.slug];
                const isActive = hoveredSlug === integration.slug;
                return (
                  <g key={`${integration.slug}-connector`}>
                    <line
                      x1={point.x}
                      y1={point.y}
                      x2={50}
                      y2={50}
                      className={`connector-line ${isActive ? "is-active" : ""}`}
                    />
                    <line
                      x1={point.x}
                      y1={point.y}
                      x2={50}
                      y2={50}
                      className={`connector-flow ${isActive ? "is-active" : ""}`}
                      style={{ "--flow-delay": point.delay } as CSSProperties}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="integration-grid">
            <div className="integration-hub surface-card">
              <span className="hub-glow" aria-hidden="true" />
              <span className="hub-chip">Evios</span>
              <p className="hub-copy">Custom automation layer inside your existing stack.</p>
            </div>

            {INTEGRATIONS.map((integration, index) => (
              <article
                key={integration.slug}
                className={`integration-node surface-card node-${integration.position}`}
                style={{ "--node-delay": `${index * 110}ms` } as CSSProperties}
                onMouseEnter={() => setHoveredSlug(integration.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(integration.slug)}
                onBlur={() => setHoveredSlug(null)}
                tabIndex={0}
              >
                <div className="logo-spot" style={{ "--logo-color": integration.color } as CSSProperties}>
                  {/* Swap with <Image src={`/integrations/${integration.slug}.svg`} ... /> */}
                  {integration.logoSrc ? (
                    <Image
                      src={integration.logoSrc}
                      alt={`${integration.name} logo`}
                      width={40}
                      height={40}
                      className="integration-logo-img"
                    />
                  ) : (
                    <span>{integration.name[0]}</span>
                  )}
                </div>
                <p className="integration-name">{integration.name}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-brand-muted">
          No software yet? We deploy with a shared calendar and team notifications.
        </p>
      </div>

      <style jsx global>{`
        .integrations-showcase .integration-map {
          position: relative;
        }

        .integrations-showcase .integration-grid {
          position: relative;
          display: grid;
          gap: 10px;
          grid-template-columns: 1fr;
          z-index: 2;
        }

        .integrations-showcase .integration-hub,
        .integrations-showcase .integration-node {
          opacity: 0;
          transform: translateY(10px) scale(0.98);
        }

        .integrations-showcase[data-visible="true"] .integration-hub,
        .integrations-showcase[data-visible="true"] .integration-node {
          animation: integrationIn 460ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .integrations-showcase .integration-hub {
          text-align: center;
          padding: 18px 16px;
          position: relative;
          overflow: hidden;
          animation-delay: 80ms;
          border-color: rgba(56, 189, 248, 0.32);
          background:
            radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.3), transparent 58%),
            rgba(15, 23, 42, 0.78);
          backdrop-filter: blur(10px);
        }

        .integrations-showcase .hub-glow {
          position: absolute;
          inset: -30% 16%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.45), rgba(56, 189, 248, 0));
          filter: blur(14px);
          animation: hubPulse 3.2s ease-in-out infinite;
          pointer-events: none;
        }

        .integrations-showcase .hub-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.38);
          background: rgba(56, 189, 248, 0.12);
          padding: 6px 14px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 11px;
          font-weight: 700;
          color: #e0f2fe;
          position: relative;
          z-index: 1;
        }

        .integrations-showcase .hub-copy {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(226, 232, 240, 0.86);
          position: relative;
          z-index: 1;
        }

        .integrations-showcase .integration-node {
          position: relative;
          overflow: hidden;
          padding: 14px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-color: rgba(148, 163, 184, 0.24);
          background: rgba(15, 23, 42, 0.78);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease;
          animation-delay: var(--node-delay, 0ms);
          cursor: pointer;
        }

        .integrations-showcase .integration-node:hover {
          transform: translateY(-2px);
          border-color: rgba(56, 189, 248, 0.45);
          background: rgba(56, 189, 248, 0.12);
          box-shadow: 0 12px 22px rgba(2, 6, 23, 0.3);
        }

        .integrations-showcase .integration-node:focus-visible {
          outline: none;
          transform: translateY(-2px);
          border-color: rgba(56, 189, 248, 0.45);
          box-shadow:
            0 0 0 1px rgba(56, 189, 248, 0.45),
            0 12px 22px rgba(2, 6, 23, 0.3);
        }

        .integrations-showcase .logo-spot {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid color-mix(in srgb, var(--logo-color) 45%, #ffffff 10%);
          background: color-mix(in srgb, var(--logo-color) 16%, #0f172a 84%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .integrations-showcase .logo-spot span {
          font-size: 20px;
          font-weight: 700;
          color: color-mix(in srgb, var(--logo-color) 72%, #ffffff 28%);
          line-height: 1;
        }

        .integrations-showcase .integration-logo-img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 8px;
        }

        .integrations-showcase .integration-name {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: rgba(241, 245, 249, 0.96);
        }

        .integrations-showcase .connector-layer {
          display: none;
        }

        @media (max-width: 767px) {
          .integrations-showcase .integration-map {
            padding-left: 14px;
          }

          .integrations-showcase .integration-map::before {
            content: "";
            position: absolute;
            top: 8px;
            bottom: 8px;
            left: 2px;
            width: 2px;
            border-radius: 999px;
            background: rgba(56, 189, 248, 0.25);
          }
        }

        @media (min-width: 768px) {
          .integrations-showcase .integration-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            grid-template-rows: auto auto auto;
            gap: 12px;
            min-height: 420px;
          }

          .integrations-showcase .integration-hub {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 130px;
          }

          .integrations-showcase .integration-node {
            flex-direction: column;
            text-align: center;
            justify-content: center;
            min-height: 118px;
            padding: 14px 10px;
          }

          .integrations-showcase .node-topLeft {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
          }
          .integrations-showcase .node-topCenter {
            grid-column: 3 / 4;
            grid-row: 1 / 2;
          }
          .integrations-showcase .node-topRight {
            grid-column: 5 / 6;
            grid-row: 1 / 2;
          }
          .integrations-showcase .node-bottomLeft {
            grid-column: 2 / 3;
            grid-row: 3 / 4;
          }
          .integrations-showcase .node-bottomRight {
            grid-column: 4 / 5;
            grid-row: 3 / 4;
          }

          .integrations-showcase .connector-layer {
            display: block;
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
          }

          .integrations-showcase .connector-svg {
            width: 100%;
            height: 100%;
            overflow: visible;
          }

          .integrations-showcase .connector-line {
            stroke: rgba(56, 189, 248, 0.22);
            stroke-width: 0.35;
            transition: stroke 220ms ease;
          }

          .integrations-showcase .connector-line.is-active {
            stroke: rgba(56, 189, 248, 0.56);
          }

          .integrations-showcase .connector-flow {
            stroke: rgba(125, 211, 252, 0.9);
            stroke-width: 0.5;
            stroke-linecap: round;
            stroke-dasharray: 3 8;
            animation: dashFlow 2.4s linear infinite;
            animation-delay: var(--flow-delay, 0s);
            opacity: 0.78;
          }

          .integrations-showcase .connector-flow.is-active {
            stroke-width: 0.62;
            opacity: 1;
          }
        }

        @keyframes integrationIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes hubPulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }

        @keyframes dashFlow {
          from {
            stroke-dashoffset: 44;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .integrations-showcase * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
