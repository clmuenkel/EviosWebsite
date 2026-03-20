"use client";

import Image from "next/image";

type IntegrationItem = {
  name: string;
  colorHex: string;
  key: string;
  logoSrc?: string;
};

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "ServiceTitan",
    colorHex: "#df5828",
    key: "servicetitan",
    logoSrc: "/integrations/servicetitan.png",
  },
  {
    name: "QuickBooks",
    colorHex: "#2CA01C",
    key: "quickbooks",
  },
  {
    name: "Housecall Pro",
    colorHex: "#0075ff",
    key: "housecall-pro",
    logoSrc: "/integrations/housecall-pro.png",
  },
  {
    name: "Google Calendar",
    colorHex: "#4285f4",
    key: "google-calendar",
    logoSrc: "/integrations/google-calendar.png",
  },
  { name: "Any other app", colorHex: "#64748b", key: "any-app" },
];

/** Inline SVG logos for items without a .png */
function InlineLogo({ k, size }: { k: string; size: number }) {
  if (k === "quickbooks") {
    // Official QuickBooks green circle + stylised path
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="20" fill="#2CA01C" />
        <path
          d="M12.5 13.5C10.57 13.5 9 15.07 9 17v6c0 1.93 1.57 3.5 3.5 3.5H14v-2h-1.5c-.83 0-1.5-.67-1.5-1.5v-6c0-.83.67-1.5 1.5-1.5H16v9.5a2.5 2.5 0 005 0V13.5h-2v12a.5.5 0 01-1 0V13.5h-5.5z"
          fill="#fff"
        />
        <path
          d="M27.5 26.5c1.93 0 3.5-1.57 3.5-3.5v-6c0-1.93-1.57-3.5-3.5-3.5H26v2h1.5c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5H24v-9.5a2.5 2.5 0 00-5 0V26.5h2v-12a.5.5 0 011 0V26.5h5.5z"
          fill="#fff"
        />
      </svg>
    );
  }

  // "Any other app" — plug / link icon
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#f1f5f9" />
      <path
        d="M22 14l-1.41 1.41L23.17 18H14v2h9.17l-2.58 2.59L22 24l5-5-5-5z"
        fill="#64748b"
      />
      <path
        d="M12 18v4h2v-4h-2z"
        fill="#64748b"
      />
    </svg>
  );
}

export function IntegrationsSection() {
  return (
    <section id="integrations" className="section-block-tight section-divider alt-surface">
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

        <div className="relative mt-10">
          <div className="space-y-4 md:hidden">
            <div className="hub-pulse rounded-2xl border border-brand-accent/20 bg-white p-4 text-center shadow-sm">
              <Image
                src="/evios-logo-header.png?v=2"
                alt="Evios"
                width={96}
                height={30}
                className="mx-auto h-7 w-auto"
              />
              <p className="mt-2 text-xs text-brand-muted">Custom automation layer in your stack.</p>
            </div>

            <div className="flex justify-center py-2">
              <div className="flow-line h-8 w-[3px] rounded-full" />
            </div>

            <div>
              <div className="flex flex-wrap justify-center gap-2">
                {INTEGRATIONS.map((integration) => (
                  <article key={`mobile-${integration.key}`} className="inline-flex items-center gap-2 px-1 py-1 text-xs text-brand-text">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full">
                      {integration.logoSrc ? (
                        <Image
                          src={integration.logoSrc}
                          alt={`${integration.name} logo`}
                          width={18}
                          height={18}
                          className={`h-[18px] w-[18px] object-contain ${
                            ["servicetitan", "housecall-pro"].includes(integration.key)
                              ? "rounded-md"
                              : ""
                          }`}
                        />
                      ) : (
                        <InlineLogo k={integration.key} size={18} />
                      )}
                    </span>
                    <span className="font-medium">{integration.name}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex justify-between gap-6">
              {INTEGRATIONS.map((integration) => (
                <article key={integration.key} className="flex-1 py-2 text-center transition-transform duration-200 hover:-translate-y-0.5">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
                    {integration.logoSrc ? (
                      <Image
                        src={integration.logoSrc}
                        alt={`${integration.name} logo`}
                        width={40}
                        height={40}
                        className={`h-9 w-9 object-contain ${
                          ["servicetitan", "housecall-pro"].includes(integration.key)
                            ? "rounded-lg"
                            : ""
                        }`}
                      />
                    ) : (
                      <InlineLogo k={integration.key} size={36} />
                    )}
                  </div>
                  <p className="mt-2 text-center text-sm font-medium text-brand-text">{integration.name}</p>
                </article>
              ))}
            </div>

            <div className="relative mx-8 mt-4">
              <div className="flow-line h-[3px] w-full rounded-full" />
              <div className="absolute -top-[4px] left-0 flex h-[10px] w-full justify-between px-[10%]">
                {INTEGRATIONS.map((integration) => (
                  <span key={`junction-${integration.key}`} className="h-[10px] w-[10px] rounded-full bg-brand-accent/30" />
                ))}
              </div>
              <span className="bridge-dot-left" />
              <span className="bridge-dot-left delay-2" />
              <span className="bridge-dot-right" />
              <span className="bridge-dot-right delay-2" />
              <div className="flow-line mx-auto h-10 w-[3px] rounded-full" />
            </div>

            <div className="mx-auto mt-2 max-w-[260px]">
              <div className="hub-pulse rounded-2xl border border-brand-accent/20 bg-white p-5 text-center shadow-sm">
                <Image
                  src="/evios-logo-header.png?v=2"
                  alt="Evios"
                  width={96}
                  height={30}
                  className="mx-auto h-7 w-auto"
                />
                <p className="mt-2 text-xs text-brand-muted">Custom automation layer in your stack.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-brand-muted">
          No software yet? We deploy with a shared calendar and team notifications.
        </p>
      </div>

    </section>
  );
}
