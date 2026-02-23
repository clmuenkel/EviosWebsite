"use client";

import { BOOKING_CTA_LABEL, BOOKING_URL } from "../lib/booking";

export function BookCta() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noreferrer"
      className="rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accentDark"
    >
      {BOOKING_CTA_LABEL}
    </a>
  );
}
