"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "../lib/scroll";

const NAV_ITEMS = [
  { id: "how-it-works", label: "How it works" },
  { id: "demo", label: "Demo" },
  { id: "integrations", label: "Integrations" },
  { id: "offer", label: "Offer" },
  { id: "faq", label: "FAQ" },
] as const;

const CTA_ITEMS = [
  { id: "contact", label: "Book a demo", primary: true },
  { id: "demo", label: "Hear a demo call", primary: false },
] as const;

function HeaderLink({
  label,
  targetId,
  onClick,
}: {
  label: string;
  targetId: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-text"
      onClick={() => {
        scrollToId(targetId);
        onClick?.();
      }}
    >
      {label}
    </button>
  );
}

function HeaderCta({
  label,
  targetId,
  primary,
  onClick,
}: {
  label: string;
  targetId: string;
  primary: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToId(targetId);
        onClick?.();
      }}
      className={
        primary
          ? "rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accentDark"
          : "rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-brand-text transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent hover:text-white"
      }
    >
      {label}
    </button>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold uppercase tracking-[0.18em] text-brand-text"
        >
          evios
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <HeaderLink key={item.id} label={item.label} targetId={item.id} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {CTA_ITEMS.map((item) => (
            <HeaderCta
              key={item.label}
              label={item.label}
              targetId={item.id}
              primary={item.primary}
            />
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-brand-text md:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute inset-x-3 top-16 z-50 rounded-xl border border-white/10 bg-brand-surface px-5 py-6 shadow-xl md:hidden">
            <div className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <HeaderLink
                  key={item.id}
                  label={item.label}
                  targetId={item.id}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {CTA_ITEMS.map((item) => (
                <HeaderCta
                  key={item.label}
                  label={item.label}
                  targetId={item.id}
                  primary={item.primary}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
