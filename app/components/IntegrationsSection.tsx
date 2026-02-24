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
    name: "Jobber",
    colorHex: "#4caf50",
    key: "jobber",
    logoSrc: "/integrations/jobber.png",
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
  { name: "Zapier / Webhooks", colorHex: "#ff4a00", key: "zapier" },
];

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
                            ["servicetitan", "jobber", "housecall-pro"].includes(integration.key)
                              ? "rounded-md"
                              : ""
                          }`}
                        />
                      ) : (
                        <span
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold"
                          style={{ backgroundColor: `${integration.colorHex}18`, color: integration.colorHex }}
                        >
                          {integration.name[0]}
                        </span>
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
                          ["servicetitan", "jobber", "housecall-pro"].includes(integration.key)
                            ? "rounded-lg"
                            : ""
                        }`}
                      />
                    ) : (
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold"
                        style={{ backgroundColor: `${integration.colorHex}18`, color: integration.colorHex }}
                      >
                        {integration.name[0]}
                      </span>
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
