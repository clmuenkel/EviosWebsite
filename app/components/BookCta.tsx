"use client";

import { scrollToId } from "../lib/scroll";

export function BookCta() {
  return (
    <button
      type="button"
      onClick={() => scrollToId("contact")}
      className="rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accentDark"
    >
      Book a demo
    </button>
  );
}
