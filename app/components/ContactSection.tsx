"use client";

import { BookCta } from "./BookCta";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section-block section-divider">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Get Started
        </p>
        <h2 className="section-heading mt-4">
          Ready to build automation around your exact pain points?
        </h2>
        <p className="section-copy max-w-3xl">
          We will walk your current process, identify where revenue and time are
          leaking, and map a custom system for your home service business.
        </p>

        <div className="contact-shell mt-8 rounded-[22px] p-[1px]">
          <div className="contact-cta surface-card flex flex-col items-start gap-4 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-brand-muted">
              Skip the long form. Click below and pick a time that works.
            </p>
            <BookCta />
          </div>
        </div>

        <style jsx global>{`
          .contact-section .contact-shell {
            background: linear-gradient(
              130deg,
              rgba(56, 189, 248, 0.5),
              rgba(59, 130, 246, 0.18),
              rgba(56, 189, 248, 0.4)
            );
            background-size: 200% 100%;
            animation: contactShellShift 7s ease-in-out infinite;
          }

          .contact-section .contact-cta {
            border-radius: 21px;
            background:
              radial-gradient(circle at 24% 0%, rgba(56, 189, 248, 0.14), transparent 44%),
              rgba(15, 23, 42, 0.84);
          }

          @keyframes contactShellShift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
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
