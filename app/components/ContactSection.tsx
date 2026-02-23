"use client";

import { BookCta } from "./BookCta";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section-block section-divider">
      <div className="section-frame">
        <div className="contact-cta surface-card mx-auto max-w-4xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
            Get Started
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            Book your intro meeting.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
            We review your current process, find the biggest gaps, and map a
            custom automation plan around your business.
          </p>
          <div className="mt-8 flex justify-center">
            <BookCta />
          </div>
        </div>

        <style jsx global>{`
          .contact-section .contact-cta {
            background:
              radial-gradient(circle at 50% -20%, rgba(56, 189, 248, 0.16), transparent 55%),
              linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.82));
            border: 1px solid rgba(148, 163, 184, 0.3);
            box-shadow: 0 24px 70px rgba(2, 6, 23, 0.45);
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
