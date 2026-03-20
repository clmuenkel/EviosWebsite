"use client";

import { useEffect, useRef } from "react";

const PILLARS = [
  {
    id: "inventory",
    label: "Inventory & Procurement",
    line: "Materials ordered by text, tracked by memory. One missed PO stalls the entire job.",
    logos: ["QuickBooks", "Suppliers", "Housecall Pro"],
  },
  {
    id: "quoting",
    label: "Quoting & Proposals",
    line: "An RFP hits the inbox. By the time the bid goes out, the contract\u2019s already gone.",
    logos: ["PDF / Docs", "ServiceTitan", "Templates"],
  },
  {
    id: "growth",
    label: "Customer Growth",
    line: "The job wraps, the customer disappears. Your best revenue source sits untouched.",
    logos: ["CRM", "Google Calendar", "Jobber"],
  },
] as const;

/**
 * We collect every setTimeout id so we can cancel them all
 * between loops and on unmount — prevents overlapping animations.
 */
let pendingTimers: ReturnType<typeof setTimeout>[] = [];

function scheduleTimer(fn: () => void, ms: number) {
  pendingTimers.push(setTimeout(fn, ms));
}

function clearAllTimers() {
  pendingTimers.forEach((id) => clearTimeout(id));
  pendingTimers = [];
}

/* ─── Inventory animation ─── */
function runInventoryAnim(container: HTMLElement) {
  const bubblesEl = container.querySelector<HTMLElement>("[data-inv-bubbles]");
  const dashRows = container.querySelector<HTMLElement>("[data-inv-rows]");
  const arrow = container.querySelector<HTMLElement>("[data-inv-arrow]");
  if (!bubblesEl || !dashRows || !arrow) return;

  // Reset
  bubblesEl.innerHTML = "";
  dashRows.innerHTML = "";
  arrow.style.animation = "none";
  // Force reflow so the browser registers the reset before we re-apply
  void arrow.offsetWidth;
  arrow.style.opacity = "0";

  const bubbles = [
    { text: "\u{1f527} Need 3 copper fittings", delay: 400 },
    { text: "\u{1f4e6} 2 ball valves, 1\u201d PVC", delay: 1200 },
  ];

  const rows = [
    { label: "Copper fittings", stock: "3 left", fill: "25%", color: "#f59e0b" },
    { label: "Ball valves", stock: "0 left", fill: "0%", color: "#ef4444" },
    { label: "PVC 1\u201d", stock: "12 left", fill: "80%", color: "#22c55e" },
  ];

  // Chat bubbles appear
  bubbles.forEach((b) => {
    scheduleTimer(() => {
      const div = document.createElement("div");
      div.className = "ts-inv-bubble";
      div.textContent = b.text;
      div.style.animation = "tsInvBubbleIn 0.4s ease forwards";
      bubblesEl.appendChild(div);
    }, b.delay);
  });

  // Arrow slides in
  scheduleTimer(() => {
    arrow.style.animation = "tsInvArrowIn 0.3s ease forwards";
  }, 1800);

  // Dashboard rows populate
  rows.forEach((r, i) => {
    scheduleTimer(() => {
      const row = document.createElement("div");
      row.className = "ts-inv-row";
      row.style.animation = "tsInvRowIn 0.3s ease forwards";
      row.innerHTML = `
        <span>${r.label}</span>
        <span style="font-weight:600;color:${r.color};font-size:6px;">${r.stock}</span>
      `;

      const bar = document.createElement("div");
      bar.className = "ts-inv-row";
      bar.style.animation = "tsInvRowIn 0.3s ease forwards";
      bar.innerHTML = `
        <div class="ts-inv-row-bar">
          <div class="ts-inv-row-fill" style="background:${r.color};animation:tsInvBarFill 0.6s ease 0.2s forwards;--fill:${r.fill};"></div>
        </div>
      `;

      dashRows.appendChild(row);
      dashRows.appendChild(bar);
    }, 2000 + i * 300);
  });

  // PO Generated badge
  scheduleTimer(() => {
    const po = document.createElement("div");
    po.className = "ts-inv-po";
    po.textContent = "\u2713 PO #4821 Generated";
    po.style.animation = "tsInvPoIn 0.4s cubic-bezier(.22,.68,.35,1.0) forwards";
    dashRows.appendChild(po);
  }, 3200);
}

/* ─── Quoting animation ─── */
function runQuotingAnim(container: HTMLElement) {
  const scene = container.querySelector<HTMLElement>("[data-rfp-scene]");
  if (!scene) return;

  // Full innerHTML replace = fresh elements = CSS animations restart from 0
  scene.innerHTML = `
    <div class="ts-rfp-doc">
      <div class="ts-rfp-doc-header">RFP Document</div>
      <div class="ts-rfp-doc-lines">
        <div class="ts-rfp-doc-line" style="width:85%"></div>
        <div class="ts-rfp-doc-line" style="width:70%"></div>
        <div class="ts-rfp-doc-line" style="width:90%"></div>
        <div class="ts-rfp-doc-line" style="width:55%"></div>
        <div class="ts-rfp-doc-line" style="width:75%"></div>
        <div class="ts-rfp-doc-line" style="width:60%"></div>
      </div>
    </div>
    <div class="ts-rfp-clock">
      <div class="ts-rfp-clock-hand"></div>
      <div class="ts-rfp-clock-dot"></div>
    </div>
    <div class="ts-rfp-stamp">LOST</div>
  `;
}

/* ─── Growth animation ─── */
function runGrowthAnim(container: HTMLElement) {
  const scene = container.querySelector<HTMLElement>("[data-growth-scene]");
  if (!scene) return;

  const customers = [
    { name: "Job #1", delay: 300 },
    { name: "Job #2", delay: 600 },
    { name: "Job #3", delay: 900 },
    { name: "Job #4", delay: 1200 },
  ];

  scene.innerHTML = "";

  customers.forEach((c, i) => {
    const wrap = document.createElement("div");
    wrap.className = "ts-growth-customer";

    wrap.innerHTML = `
      <div class="ts-growth-avatar" data-ga="${i}">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <div class="ts-growth-check" data-gck="${i}">
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>
      <div class="ts-growth-label">${c.name}</div>
    `;
    scene.appendChild(wrap);

    if (i < customers.length - 1) {
      const conn = document.createElement("div");
      conn.className = "ts-growth-connector";
      scene.appendChild(conn);
    }

    // Green check appears
    scheduleTimer(() => {
      const check = scene.querySelector<HTMLElement>(`[data-gck="${i}"]`);
      if (check) {
        check.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        check.style.opacity = "1";
        check.style.transform = "scale(1)";
      }
    }, c.delay + 600);

    // Customer fades to "lost" state
    scheduleTimer(() => {
      const avatar = scene.querySelector<HTMLElement>(`[data-ga="${i}"]`);
      const check = scene.querySelector<HTMLElement>(`[data-gck="${i}"]`);
      if (avatar) {
        avatar.style.borderColor = "#fecaca";
        avatar.style.background = "#fef2f2";
        const svg = avatar.querySelector("svg");
        if (svg) svg.style.stroke = "#d1d5db";
      }
      if (check) {
        check.style.opacity = "0";
        check.style.transform = "scale(0.5)";
      }

      // "gone" text floats up
      const ghost = document.createElement("div");
      ghost.className = "ts-growth-ghost";
      ghost.textContent = "gone";
      ghost.style.cssText = `
        position: absolute;
        left: ${wrap.offsetLeft + 10}px;
        top: ${wrap.offsetTop - 2}px;
        font-size: 7px;
        color: #f87171;
        font-weight: 600;
        opacity: 0;
        animation: tsGhostUp 1s ease forwards;
      `;
      scene.appendChild(ghost);
    }, c.delay + 2200);
  });
}

export function PillarCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    function runAll() {
      if (!node) return;
      clearAllTimers();

      const cards = node.querySelectorAll<HTMLElement>("[data-pillar]");
      cards.forEach((card) => {
        const id = card.dataset.pillar;
        if (id === "inventory") runInventoryAnim(card);
        if (id === "quoting") runQuotingAnim(card);
        if (id === "growth") runGrowthAnim(card);
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAll();
          intervalRef.current = setInterval(runAll, 5500);
        } else {
          clearAllTimers();
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearAllTimers();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes tsCardIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tsInvBubbleIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tsInvRowIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tsInvBarFill {
          from { width: 0%; }
          to { width: var(--fill); }
        }
        @keyframes tsInvPoIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes tsInvArrowIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes tsRfpDocIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tsRfpClockIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes tsRfpClockSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(540deg); }
        }
        @keyframes tsRfpStampIn {
          from { opacity: 0; transform: translate(-50%, -50%) rotate(-12deg) scale(1.3); }
          to { opacity: 1; transform: translate(-50%, -50%) rotate(-12deg) scale(1); }
        }
        @keyframes tsGhostUp {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-18px); }
        }

        .ts-anim-container {
          width: 100%;
          height: 190px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .ts-inv-phone {
          position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
          width: 80px; height: 148px; background: #fff; border-radius: 14px;
          border: 1.5px solid #d1d5db; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;
        }
        .ts-inv-phone-header {
          background: #0b5394; height: 22px; display: flex; align-items: center;
          justify-content: center; font-size: 7px; color: #fff; font-weight: 600; letter-spacing: 0.05em;
        }
        .ts-inv-phone-body { padding: 6px; display: flex; flex-direction: column; gap: 5px; }
        .ts-inv-bubble {
          background: #e8f0fe; border-radius: 8px 8px 8px 3px; padding: 5px 7px;
          font-size: 6.5px; color: #1e293b; line-height: 1.4; opacity: 0; transform: translateY(6px);
        }
        .ts-inv-arrow {
          position: absolute; left: 102px; top: 50%; transform: translateY(-50%);
          display: flex; align-items: center; gap: 0; opacity: 0;
        }
        .ts-inv-arrow-line { width: 18px; height: 2px; background: #0b5394; border-radius: 1px; }
        .ts-inv-arrow svg { width: 8px; height: 8px; fill: #0b5394; margin-left: -1px; }
        .ts-inv-dashboard {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          width: 130px; height: 130px; background: #fff; border-radius: 10px;
          border: 1.5px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;
        }
        .ts-inv-dash-header {
          background: #f8fafc; border-bottom: 1px solid #e2e8f0;
          padding: 5px 8px; font-size: 7px; font-weight: 600; color: #1e293b;
        }
        .ts-inv-dash-body { padding: 6px 8px; display: flex; flex-direction: column; gap: 5px; }
        .ts-inv-row {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 6.5px; color: #64748b; opacity: 0;
        }
        .ts-inv-row-bar { width: 40px; height: 5px; background: #e2e8f0; border-radius: 3px; overflow: hidden; position: relative; }
        .ts-inv-row-fill { height: 100%; border-radius: 3px; width: 0%; }
        .ts-inv-po {
          margin-top: 4px; background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 6px;
          padding: 4px 6px; font-size: 6px; font-weight: 600; color: #166534; text-align: center;
          opacity: 0; transform: scale(0.8);
        }
        .ts-rfp-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .ts-rfp-doc {
          width: 80px; height: 105px; background: #fff; border-radius: 8px;
          border: 1.5px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          position: relative; overflow: hidden; animation: tsRfpDocIn 0.6s ease 0.3s forwards;
          opacity: 0; transform: translateY(-20px);
        }
        .ts-rfp-doc-header {
          background: #0b5394; height: 18px; display: flex; align-items: center;
          padding: 0 6px; font-size: 6px; color: #fff; font-weight: 600;
        }
        .ts-rfp-doc-lines { padding: 7px 6px; display: flex; flex-direction: column; gap: 4px; }
        .ts-rfp-doc-line { height: 3px; background: #e2e8f0; border-radius: 2px; }
        .ts-rfp-clock {
          position: absolute; right: 50px; top: 30px; width: 52px; height: 52px;
          border-radius: 50%; border: 2px solid #e2e8f0; background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06); opacity: 0;
          animation: tsRfpClockIn 0.4s ease 1s forwards;
        }
        .ts-rfp-clock-hand {
          position: absolute; bottom: 50%; left: 50%; width: 1.5px; height: 18px;
          background: #0b5394; border-radius: 1px; transform-origin: bottom center;
          animation: tsRfpClockSpin 2s linear 1.2s forwards; transform: rotate(0deg);
        }
        .ts-rfp-clock-dot {
          position: absolute; top: 50%; left: 50%; width: 4px; height: 4px;
          background: #0b5394; border-radius: 50%; transform: translate(-50%, -50%);
        }
        .ts-rfp-stamp {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%) rotate(-12deg) scale(0.6);
          font-size: 18px; font-weight: 800; color: #dc2626;
          border: 3px solid #dc2626; border-radius: 8px; padding: 4px 12px;
          letter-spacing: 0.1em; text-transform: uppercase; opacity: 0;
          animation: tsRfpStampIn 0.3s cubic-bezier(.22,.68,.35,1.0) 3.2s forwards;
        }
        .ts-growth-scene {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; gap: 10px; padding: 0 20px;
        }
        .ts-growth-customer { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .ts-growth-avatar {
          width: 36px; height: 36px; border-radius: 50%; border: 2px solid #e2e8f0;
          background: #fff; display: flex; align-items: center; justify-content: center;
          position: relative; transition: all 0.6s ease;
        }
        .ts-growth-avatar svg { width: 16px; height: 16px; stroke: #94a3b8; fill: none; stroke-width: 1.5; transition: stroke 0.4s ease; }
        .ts-growth-label { font-size: 6.5px; color: #64748b; font-weight: 500; }
        .ts-growth-check {
          position: absolute; bottom: -2px; right: -2px; width: 14px; height: 14px;
          border-radius: 50%; background: #22c55e; display: flex; align-items: center;
          justify-content: center; opacity: 0; transform: scale(0.5);
        }
        .ts-growth-check svg { width: 8px; height: 8px; stroke: #fff; stroke-width: 2.5; }
        .ts-growth-connector { width: 18px; height: 2px; background: #e2e8f0; border-radius: 1px; flex-shrink: 0; opacity: 0.5; }
        .ts-growth-ghost { font-size: 7px; color: #f87171; font-weight: 600; opacity: 0; }
      `}</style>

      <div ref={containerRef} className="flex w-full flex-col gap-[18px] md:flex-row">
        {PILLARS.map((p, i) => (
          <div
            key={p.id}
            data-pillar={p.id}
            className="flex-1 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white shadow-sm"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              animation: `tsCardIn 0.5s cubic-bezier(.22,.68,.35,1.0) ${0.15 + i * 0.12}s forwards`,
            }}
          >
            <div className="ts-anim-container">
              {p.id === "inventory" && (
                <>
                  <div className="ts-inv-phone">
                    <div className="ts-inv-phone-header">FIELD TECH</div>
                    <div className="ts-inv-phone-body" data-inv-bubbles />
                  </div>
                  <div className="ts-inv-arrow" data-inv-arrow>
                    <div className="ts-inv-arrow-line" />
                    <svg viewBox="0 0 8 10">
                      <polygon points="8,5 0,0 0,10" />
                    </svg>
                  </div>
                  <div className="ts-inv-dashboard">
                    <div className="ts-inv-dash-header">Stock Dashboard</div>
                    <div className="ts-inv-dash-body" data-inv-rows />
                  </div>
                </>
              )}
              {p.id === "quoting" && (
                <div className="ts-rfp-scene" data-rfp-scene />
              )}
              {p.id === "growth" && (
                <div className="ts-growth-scene" data-growth-scene />
              )}
            </div>

            <div className="p-[22px] pb-5">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                {p.label}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-brand-muted">
                {p.line}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.logos.map((logo) => (
                  <span
                    key={logo}
                    className="whitespace-nowrap rounded-full border border-black/[0.05] bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-brand-muted"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
