"use client";

import { FormEvent, useState } from "react";

type SoftwareOption =
  | "ServiceTitan"
  | "Jobber"
  | "Housecall Pro"
  | "Other"
  | "None";

type LeadPayload = {
  fullName: string;
  companyName: string;
  website: string;
  email: string;
  phone: string;
  software: SoftwareOption;
  message: string;
  website_url: string;
};

const INITIAL_FORM: LeadPayload = {
  fullName: "",
  companyName: "",
  website: "",
  email: "",
  phone: "",
  software: "ServiceTitan",
  message: "",
  website_url: "",
};

const SOFTWARE_OPTIONS: SoftwareOption[] = [
  "ServiceTitan",
  "Jobber",
  "Housecall Pro",
  "Other",
  "None",
];

export function ContactSection() {
  const [form, setForm] = useState<LeadPayload>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H3",location:"ContactSection.tsx:onSubmit:start",message:"Contact submit started",data:{hasName:Boolean(form.fullName?.trim()),hasCompany:Boolean(form.companyName?.trim()),hasEmail:Boolean(form.email?.trim()),hasPhone:Boolean(form.phone?.trim()),software:form.software,honeypotLength:(form.website_url||"").length},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // #region agent log
      fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H1",location:"ContactSection.tsx:onSubmit:response",message:"Contact submit got response",data:{status:response.status,ok:response.ok},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      if (response.ok) {
        setSuccess(true);
        setForm(INITIAL_FORM);
        return;
      }

      if (response.status === 429) {
        setError("Too many requests right now. Please try again shortly.");
        return;
      }

      setError("Something went wrong. Please try again.");
    } catch {
      // #region agent log
      fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H5",location:"ContactSection.tsx:onSubmit:catch",message:"Contact submit fetch threw error",data:{type:"network-or-runtime"},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section section-block section-divider">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Want More Jobs?
        </p>
        <h2 className="section-heading mt-4">
          Want to see how we can help you book more plumbing jobs?
        </h2>
        <p className="section-copy">
          Book a demo and we will walk your exact call flow, follow-up engine,
          and setup path so you can see how this lands in your business.
        </p>

        {success ? (
          <div className="mt-8 rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300 shadow-[0_0_0_1px_rgba(34,197,94,0.25)]">
            Got it. We'll reach out shortly.
          </div>
        ) : null}

        <div className="contact-shell mt-8 rounded-[22px] p-[1px]">
          <form onSubmit={onSubmit} className="contact-form surface-card space-y-4 p-6 sm:p-8">
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={form.website_url}
              onChange={(event) =>
                setForm((current) => ({ ...current, website_url: event.target.value }))
              }
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
                Full name
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, fullName: event.target.value }))
                  }
                  className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
                />
              </label>

              <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
                Company name
                <input
                  required
                  type="text"
                  value={form.companyName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, companyName: event.target.value }))
                  }
                  className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
                />
              </label>

              <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
                Website (optional)
                <input
                  type="url"
                  value={form.website}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, website: event.target.value }))
                  }
                  className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
                />
              </label>

              <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
                />
              </label>

              <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
                Phone
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
                />
              </label>

              <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
                What software do you use?
                <select
                  required
                  value={form.software}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      software: event.target.value as SoftwareOption,
                    }))
                  }
                  className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
                >
                  {SOFTWARE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field-label flex flex-col gap-2 text-sm text-brand-muted">
              Message (optional)
              <textarea
                rows={4}
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                className="field-input rounded-lg border border-white/15 bg-brand-bg px-3 py-2.5 text-brand-text outline-none"
              />
            </label>

            {error ? (
              <p className="rounded-md border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="submit-btn mt-6 rounded-md bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white"
            >
              {submitting ? "Sending..." : "Book a demo"}
            </button>
          </form>
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

          .contact-section .contact-form {
            border-radius: 21px;
            background:
              radial-gradient(circle at 24% 0%, rgba(56, 189, 248, 0.14), transparent 44%),
              rgba(15, 23, 42, 0.84);
          }

          .contact-section .field-label {
            font-size: 12.5px;
            letter-spacing: 0.01em;
          }

          .contact-section .field-input {
            min-height: 44px;
            transition:
              border-color 180ms ease,
              box-shadow 180ms ease,
              transform 180ms ease;
          }

          .contact-section .field-input:hover {
            border-color: rgba(148, 163, 184, 0.4);
          }

          .contact-section .field-input:focus {
            border-color: rgba(56, 189, 248, 0.75);
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
            transform: translateY(-1px);
          }

          .contact-section .submit-btn {
            position: relative;
            overflow: hidden;
            transition:
              transform 220ms ease,
              box-shadow 220ms ease,
              background-color 220ms ease;
          }

          .contact-section .submit-btn::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: -40%;
            width: 34%;
            transform: skewX(-16deg);
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.35),
              rgba(255, 255, 255, 0)
            );
            opacity: 0;
          }

          .contact-section .submit-btn:hover {
            transform: translateY(-2px);
            background-color: #2563eb;
            box-shadow: 0 14px 24px rgba(2, 6, 23, 0.36);
          }

          .contact-section .submit-btn:hover::before {
            animation: submitSweep 580ms ease-out 1;
          }

          .contact-section .submit-btn:focus-visible {
            outline: none;
            box-shadow:
              0 0 0 3px rgba(56, 189, 248, 0.28),
              0 14px 24px rgba(2, 6, 23, 0.36);
          }

          .contact-section .submit-btn:disabled {
            cursor: not-allowed;
            opacity: 0.72;
            transform: none;
            box-shadow: none;
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

          @keyframes submitSweep {
            0% {
              left: -40%;
              opacity: 0;
            }
            35% {
              opacity: 1;
            }
            100% {
              left: 130%;
              opacity: 0;
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
