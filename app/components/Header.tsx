"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BOOKING_CTA_LABEL, BOOKING_URL } from "../lib/booking";
import { scrollToId } from "../lib/scroll";

const NAV_ITEMS = [
  { id: "process", label: "How it works" },
  { id: "products", label: "What we build" },
  { id: "integrations", label: "Integrations" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

const CTA_ITEMS = [
  { label: BOOKING_CTA_LABEL, primary: true, href: BOOKING_URL, id: undefined },
  { label: "See how it works", primary: false, id: "process", href: undefined },
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
      className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-accent"
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
  href,
  primary,
  onClick,
}: {
  label: string;
  targetId?: string;
  href?: string;
  primary: boolean;
  onClick?: () => void;
}) {
  const className = primary
    ? "rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-accentDark"
    : "rounded-md border border-brand-accent/20 px-4 py-2 text-sm font-semibold text-brand-accent transition-colors duration-200 hover:border-brand-accent/35 hover:bg-brand-accent/5";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (targetId) {
          scrollToId(targetId);
        }
        onClick?.();
      }}
      className={className}
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center"
        >
          <Image
            src="/evios-logo-header.png?v=2"
            alt="Evios"
            width={100}
            height={32}
            className="h-8 w-auto"
            priority
          />
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
              href={item.href}
              primary={item.primary}
            />
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/[0.08] text-brand-text md:hidden"
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
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute inset-x-3 top-16 z-50 rounded-xl border border-black/[0.08] bg-white px-5 py-6 shadow-lg md:hidden">
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
                  href={item.href}
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
