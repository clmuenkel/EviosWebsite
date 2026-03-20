"use client";

import { scrollToId } from "../lib/scroll";
import { BOOKING_CTA_LABEL, BOOKING_URL } from "../lib/booking";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="hero-vignette" />
      <div className="hero-content">
        <p className="hero-eyebrow">
          Custom automation for home service businesses
        </p>
        <h1 className="hero-headline">
          Tell us what&apos;s broken.
          <br />
          We&apos;ll build the fix.
        </h1>
        <p className="hero-subtext">
          Free audit. Custom software built around your workflow.
        </p>
        <div className="hero-cta-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="hero-btn-primary"
          >
            {BOOKING_CTA_LABEL}
          </a>
          <button
            type="button"
            onClick={() => scrollToId("process")}
            className="hero-btn-secondary"
          >
            See how it works
          </button>
        </div>
        <p className="hero-verticals">
          HVAC / Plumbing / Electrical / Roofing / Landscaping
        </p>
      </div>

      <style jsx global>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 5;
          background: radial-gradient(
            ellipse 50% 45% at 50% 48%,
            rgba(250, 248, 245, 0.82) 0%,
            rgba(250, 248, 245, 0.25) 55%,
            rgba(250, 248, 245, 0) 100%
          );
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 720px;
          padding: 0 24px;
        }

        .hero-eyebrow {
          font-size: 12px;
          font-weight: 600;
          color: #0b5394;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
          opacity: 0;
          animation: heroFadeUp 0.6s ease 0.2s forwards;
        }

        .hero-headline {
          font-size: clamp(32px, 5.5vw, 64px);
          font-weight: 700;
          color: #1e293b;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 36px;
          text-wrap: balance;
          opacity: 0;
          animation: heroFadeUp 0.6s ease 0.35s forwards;
        }

        .hero-subtext {
          font-size: clamp(15px, 2vw, 18px);
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          animation: heroFadeUp 0.6s ease 0.5s forwards;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          opacity: 0;
          animation: heroFadeUp 0.6s ease 0.65s forwards;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          background: #0b5394;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(11, 83, 148, 0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          text-decoration: none;
        }
        .hero-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(11, 83, 148, 0.35);
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #0b5394;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 12px;
          border: 1.5px solid rgba(11, 83, 148, 0.2);
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
          text-decoration: none;
        }
        .hero-btn-secondary:hover {
          border-color: rgba(11, 83, 148, 0.4);
          background: rgba(11, 83, 148, 0.03);
        }

        .hero-verticals {
          margin-top: 32px;
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 0.04em;
          opacity: 0;
          animation: heroFadeUp 0.6s ease 0.8s forwards;
        }
      `}</style>
    </section>
  );
}
