"use client";

import { BookCta } from "./BookCta";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section-block-tight section-divider alt-surface">
      <div className="section-frame">
        <div className="contact-cta surface-card mx-auto max-w-4xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
            Get Started
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl">
            Ready to find out what&apos;s costing you?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
            Book a free audit. We&apos;ll map your biggest gaps in 30 minutes.
          </p>
          <div className="mt-8 flex justify-center">
            <BookCta />
          </div>
        </div>

        <style jsx global>{`
          .contact-section .contact-cta {
            background: #fff;
            border: 1px solid rgba(15, 23, 42, 0.06);
            box-shadow: 0 10px 24px rgba(2, 6, 23, 0.08);
          }

          @media (prefers-reduced-motion: reduce) {
            .contact-section * {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
