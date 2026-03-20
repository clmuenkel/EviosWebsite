"use client";

import { useEffect, useRef } from "react";
import { BOOKING_URL, BOOKING_CTA_LABEL } from "../lib/booking";

/**
 * Collect every setTimeout id so we can cancel between loops and on unmount.
 */
let pendingTimers: ReturnType<typeof setTimeout>[] = [];

function schedule(fn: () => void, ms: number) {
  pendingTimers.push(setTimeout(fn, ms));
}

function clearTimers() {
  pendingTimers.forEach((id) => clearTimeout(id));
  pendingTimers = [];
}

/* ────────────────────────────────────────────
   ANIM 1 — Discovery Session (map)
   ──────────────────────────────────────────── */
const WORKFLOW = [
  { text: "Customer calls\nfront desk", bg: "#f0fdf4", x: 4, y: 6, w: 56, cursor: "client" as const, delay: 400, isProblem: false },
  { text: "Receptionist writes\non notepad", bg: "#fef9c3", x: 66, y: 6, w: 58, cursor: "client" as const, delay: 800, isProblem: false },
  { text: "PM texts tech\nthe address", bg: "#fef9c3", x: 130, y: 6, w: 52, cursor: "client" as const, delay: 1200, isProblem: false },
  { text: "Tech drives to\nsupplier for parts", bg: "#fee2e2", x: 4, y: 55, w: 60, cursor: "evios" as const, delay: 1600, isProblem: true },
  { text: "Hand-writes\ninvoice on site", bg: "#fee2e2", x: 70, y: 55, w: 54, cursor: "evios" as const, delay: 2000, isProblem: true },
  { text: "No follow-up\nafter job", bg: "#fee2e2", x: 130, y: 55, w: 52, cursor: "client" as const, delay: 2400, isProblem: true },
];

const ARROWS = [
  { text: "→", x: 58, y: 14, delay: 1000 },
  { text: "→", x: 123, y: 14, delay: 1400 },
  { text: "↓", x: 30, y: 40, delay: 1800 },
  { text: "→", x: 62, y: 63, delay: 2200 },
  { text: "→", x: 123, y: 63, delay: 2600 },
] as const;

function runMapAnim(canvas: HTMLElement) {
  canvas.innerHTML = "";

  const cursorSvg = (color: string) =>
    `<svg viewBox="0 0 12 16" fill="none"><path d="M1 1L1 11.5L3.5 9L6.5 15L8 14L5 8.5L8.5 8L1 1Z" fill="${color}" stroke="white" stroke-width="0.8"/></svg>`;

  const curE = document.createElement("div");
  curE.className = "hw-map-cursor";
  curE.innerHTML = cursorSvg("#0b5394");
  curE.style.left = "60px";
  curE.style.top = "70px";
  canvas.appendChild(curE);

  const curC = document.createElement("div");
  curC.className = "hw-map-cursor";
  curC.innerHTML = cursorSvg("#f59e0b");
  curC.style.left = "140px";
  curC.style.top = "30px";
  canvas.appendChild(curC);

  schedule(() => { curE.style.opacity = "1"; }, 200);
  schedule(() => { curC.style.opacity = "1"; }, 350);

  ARROWS.forEach((a) => {
    const el = document.createElement("div");
    el.className = "hw-map-arrow";
    el.textContent = a.text;
    el.style.left = a.x + "px";
    el.style.top = a.y + "px";
    canvas.appendChild(el);
    schedule(() => { el.style.opacity = "0.4"; }, a.delay);
  });

  WORKFLOW.forEach((item) => {
    const el = document.createElement("div");
    el.className = "hw-map-step";
    el.style.background = item.bg;
    el.style.left = item.x + "px";
    el.style.top = item.y + "px";
    el.style.width = item.w + "px";
    el.innerHTML = item.text.replace("\n", "<br>");
    canvas.appendChild(el);

    const cur = item.cursor === "evios" ? curE : curC;
    schedule(() => {
      cur.style.left = item.x + item.w / 2 + "px";
      cur.style.top = item.y + 8 + "px";
    }, item.delay - 200);

    schedule(() => { el.classList.add("visible"); }, item.delay);

    if (item.isProblem) {
      schedule(() => { el.classList.add("problem"); }, 3000);
    }
  });

  // Cursor labels
  schedule(() => {
    const makeLabel = (text: string, color: string, bg: string, side: "left" | "right") => {
      const l = document.createElement("div");
      l.style.cssText = `position:absolute;bottom:6px;${side}:8px;font-size:6px;font-weight:700;color:${color};background:${bg};padding:2px 6px;border-radius:4px;opacity:0;transition:opacity 0.3s;`;
      l.textContent = text;
      canvas.appendChild(l);
      schedule(() => { l.style.opacity = "1"; }, 100);
    };
    makeLabel("\u{1f535} Evios", "#0b5394", "#eff6ff", "left");
    makeLabel("\u{1f7e0} Your team", "#d97706", "#fffbeb", "right");
  }, 500);
}

/* ────────────────────────────────────────────
   ANIM 2 — Build products
   ──────────────────────────────────────────── */
const PRODUCTS = [
  {
    icon: "\u{1f3a4}", name: "Inventory Manager",
    rows: [
      { type: "text", val: "Voice → stock check" },
      { type: "bar", w: "80%", color: "#22c55e" },
      { type: "text", val: "Auto PO generation" },
      { type: "bar", w: "60%", color: "#0b5394" },
      { type: "text", val: "QuickBooks sync" },
    ],
    delay: 400,
  },
  {
    icon: "\u{1f4c4}", name: "RFP Pipeline",
    rows: [
      { type: "text", val: "Doc analysis" },
      { type: "bar", w: "90%", color: "#8b5cf6" },
      { type: "text", val: "Bid / no-bid score" },
      { type: "bar", w: "70%", color: "#0b5394" },
      { type: "text", val: "Contract generator" },
    ],
    delay: 800,
  },
  {
    icon: "\u{1f4f8}", name: "Instant Quote",
    rows: [
      { type: "text", val: "Photo + voice intake" },
      { type: "bar", w: "85%", color: "#f59e0b" },
      { type: "text", val: "Good / Better / Best" },
      { type: "bar", w: "75%", color: "#0b5394" },
      { type: "text", val: "One-click PDF" },
    ],
    delay: 1200,
  },
] as const;

function runBuildAnim(area: HTMLElement) {
  area.innerHTML = "";

  PRODUCTS.forEach((p, pi) => {
    const card = document.createElement("div");
    card.className = "hw-build-product";

    let rowsHTML = "";
    p.rows.forEach((r, ri) => {
      const id = `hw-br-${pi}-${ri}`;
      if (r.type === "text") {
        rowsHTML += `<div class="hw-build-mock-row" id="${id}"><span class="hw-build-mock-text">${r.val}</span></div>`;
      } else {
        rowsHTML += `<div class="hw-build-mock-row" id="${id}"><div class="hw-build-mock-bar" style="width:${r.w};background:${r.color};opacity:0.5;"></div></div>`;
      }
    });

    card.innerHTML = `
      <div class="hw-build-product-header">
        <span class="hw-build-product-icon">${p.icon}</span>
        <span class="hw-build-product-name">${p.name}</span>
      </div>
      <div class="hw-build-product-body">${rowsHTML}</div>
    `;
    area.appendChild(card);

    schedule(() => { card.classList.add("placed"); }, p.delay);

    p.rows.forEach((_, ri) => {
      schedule(() => {
        document.getElementById(`hw-br-${pi}-${ri}`)?.classList.add("show");
      }, p.delay + 300 + ri * 150);
    });

    schedule(() => { card.classList.add("glow"); }, 2800);
  });
}

/* ────────────────────────────────────────────
   ANIM 3 — Monitoring / Run
   ──────────────────────────────────────────── */
const SERVICES = [
  { icon: "\u{1f4e6}", name: "QuickBooks Sync", uptime: "99.9%", fill: 97, color: "#22c55e" },
  { icon: "\u{1f3e0}", name: "Housecall Pro Link", uptime: "99.8%", fill: 95, color: "#22c55e" },
  { icon: "\u2b50", name: "Review Automation", uptime: "99.9%", fill: 98, color: "#22c55e" },
  { icon: "\u{1f4b0}", name: "Quote Engine", uptime: "99.7%", fill: 94, color: "#22c55e" },
  { icon: "\u{1f4c5}", name: "ServiceTitan Sync", uptime: "99.9%", fill: 97, color: "#22c55e" },
] as const;

function runRunAnim(rows: HTMLElement, bubble: HTMLElement) {
  rows.innerHTML = "";
  bubble.classList.remove("show");

  SERVICES.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "hw-run-row";
    row.innerHTML = `
      <div class="hw-run-dot" id="hw-rd-${i}" style="background:${s.color};"></div>
      <span class="hw-run-icon">${s.icon}</span>
      <span class="hw-run-name">${s.name}</span>
      <div class="hw-run-bar-track">
        <div class="hw-run-bar-fill" id="hw-rf-${i}" style="background:${s.color};"></div>
      </div>
      <span class="hw-run-status" id="hw-rs-${i}" style="color:${s.color};">${s.uptime}</span>
    `;
    rows.appendChild(row);

    schedule(() => { row.classList.add("show"); }, 300 + i * 150);
    schedule(() => {
      const fill = document.getElementById(`hw-rf-${i}`);
      if (fill) fill.style.width = s.fill + "%";
    }, 500 + i * 150);
  });

  // QuickBooks goes amber
  schedule(() => {
    const dot = document.getElementById("hw-rd-0");
    const fill = document.getElementById("hw-rf-0");
    const status = document.getElementById("hw-rs-0");
    if (dot && fill && status) {
      dot.style.background = "#f59e0b";
      dot.style.animation = "hwLivePulse 0.5s ease infinite";
      fill.style.background = "#f59e0b";
      fill.style.width = "45%";
      status.style.color = "#f59e0b";
      status.textContent = "Sync delayed";
    }
  }, 2400);

  schedule(() => { bubble.classList.add("show"); }, 3000);

  // Fix — back to green
  schedule(() => {
    const dot = document.getElementById("hw-rd-0");
    const fill = document.getElementById("hw-rf-0");
    const status = document.getElementById("hw-rs-0");
    if (dot && fill && status) {
      dot.style.background = "#22c55e";
      dot.style.animation = "hwLivePulse 1.5s ease-in-out infinite";
      fill.style.background = "#22c55e";
      fill.style.width = "97%";
      status.style.color = "#22c55e";
      status.textContent = "99.9%";
    }
  }, 3800);

  schedule(() => { bubble.classList.remove("show"); }, 4400);
}

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    function runAll() {
      if (!node) return;
      clearTimers();

      const mapCanvas = node.querySelector<HTMLElement>("[data-hw-map]");
      const buildArea = node.querySelector<HTMLElement>("[data-hw-build]");
      const runRows = node.querySelector<HTMLElement>("[data-hw-run-rows]");
      const runBubble = node.querySelector<HTMLElement>("[data-hw-run-bubble]");

      if (mapCanvas) runMapAnim(mapCanvas);
      if (buildArea) runBuildAnim(buildArea);
      if (runRows && runBubble) runRunAnim(runRows, runBubble);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAll();
          intervalRef.current = setInterval(runAll, 6000);
        } else {
          clearTimers();
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
      clearTimers();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* ── Shared ── */
        .hw-anim-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fafbfc, #f5f7fa);
        }
        .hw-anim-container {
          width: 100%;
          height: 210px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .hw-board {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 88%;
          height: 175px;
          background: #fff;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          overflow: hidden;
        }
        .hw-board-header {
          height: 20px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 3px;
        }
        .hw-board-header-accent {
          height: 20px;
          background: #0b5394;
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 4px;
        }
        .hw-hdr-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .hw-hdr-text {
          font-size: 6px;
          font-weight: 600;
          margin-left: 4px;
        }

        /* ── Map (Anim 1) ── */
        .hw-map-canvas {
          position: relative;
          height: 150px;
          padding: 8px;
        }
        .hw-map-step {
          position: absolute;
          border-radius: 6px;
          padding: 5px 7px;
          font-size: 6.5px;
          font-weight: 500;
          color: #1e293b;
          line-height: 1.35;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          opacity: 0;
          transform: scale(0.8) translateY(4px);
          transition: opacity 0.35s ease, transform 0.35s ease, border 0.3s ease, box-shadow 0.3s ease;
          border: 1.5px solid transparent;
        }
        .hw-map-step.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .hw-map-step.problem {
          border-color: #fca5a5 !important;
          box-shadow: 0 0 0 3px rgba(252,165,165,0.15), 0 1px 3px rgba(0,0,0,0.06) !important;
        }
        .hw-map-arrow {
          position: absolute;
          color: #94a3b8;
          font-size: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hw-map-cursor {
          position: absolute;
          width: 12px;
          height: 16px;
          z-index: 5;
          opacity: 0;
          transition: left 0.5s cubic-bezier(.25,.46,.45,.94), top 0.5s cubic-bezier(.25,.46,.45,.94), opacity 0.3s ease;
        }
        .hw-map-cursor svg { width: 12px; height: 16px; }

        /* ── Build (Anim 2) ── */
        .hw-build-area {
          position: relative;
          height: 160px;
          padding: 10px;
          display: flex;
          gap: 7px;
        }
        .hw-build-product {
          flex: 1;
          border-radius: 8px;
          border: 1.5px dashed #d1d5db;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          transform: translateY(14px) scale(0.92);
          transition: all 0.5s cubic-bezier(.22,.68,.35,1.0);
        }
        .hw-build-product.placed {
          opacity: 1;
          transform: translateY(0) scale(1);
          border-style: solid;
          border-color: #e2e8f0;
          background: #fafcff;
        }
        .hw-build-product.glow {
          border-color: #c9daf8;
          background: #f0f7ff;
          box-shadow: 0 0 0 2px rgba(11,83,148,0.06);
        }
        .hw-build-product-header {
          padding: 5px 6px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hw-build-product-icon { font-size: 10px; }
        .hw-build-product-name {
          font-size: 6px;
          font-weight: 700;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .hw-build-product-body {
          flex: 1;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .hw-build-mock-row {
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hw-build-mock-row.show { opacity: 1; }
        .hw-build-mock-bar {
          height: 4px;
          border-radius: 2px;
          background: #e2e8f0;
        }
        .hw-build-mock-text {
          font-size: 5.5px;
          color: #64748b;
          font-weight: 500;
        }

        /* ── Run (Anim 3) ── */
        @keyframes hwLivePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .hw-run-panel {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 88%;
          background: #fff;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .hw-run-hdr {
          height: 22px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }
        .hw-run-hdr-title {
          font-size: 7px;
          font-weight: 700;
          color: #1e293b;
        }
        .hw-run-hdr-live {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 6px;
          font-weight: 600;
          color: #22c55e;
        }
        .hw-run-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          animation: hwLivePulse 1.5s ease-in-out infinite;
        }
        .hw-run-rows {
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hw-run-row {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .hw-run-row.show {
          opacity: 1;
          transform: translateX(0);
        }
        .hw-run-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.3s ease;
        }
        .hw-run-icon {
          font-size: 9px;
          flex-shrink: 0;
          width: 14px;
          text-align: center;
        }
        .hw-run-name {
          font-size: 6.5px;
          font-weight: 600;
          color: #1e293b;
          width: 72px;
          white-space: nowrap;
        }
        .hw-run-bar-track {
          flex: 1;
          height: 4px;
          background: #f1f5f9;
          border-radius: 3px;
          overflow: hidden;
        }
        .hw-run-bar-fill {
          height: 100%;
          border-radius: 3px;
          width: 0%;
          transition: width 0.8s ease, background 0.3s ease;
        }
        .hw-run-status {
          font-size: 6px;
          font-weight: 700;
          width: 28px;
          text-align: right;
          transition: color 0.3s ease;
        }
        .hw-run-support-bubble {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: #0b5394;
          color: #fff;
          font-size: 6px;
          font-weight: 600;
          padding: 5px 9px;
          border-radius: 8px 8px 3px 8px;
          opacity: 0;
          transform: translateY(6px) scale(0.8);
          box-shadow: 0 2px 8px rgba(11,83,148,0.3);
          transition: opacity 0.3s ease, transform 0.3s ease;
          white-space: nowrap;
        }
        .hw-run-support-bubble.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="process"
        className="section-block-tight section-divider"
      >
        <div className="section-frame flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
            How we work
          </p>
          <h2 className="section-heading mt-4 text-center">
            Your tech team. No hire required.
          </h2>

          <div className="mt-10 flex w-full flex-col gap-[18px] md:flex-row">
            {/* ── Pillar 1: Map ── */}
            <div className="flex-1 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg">
              <div className="hw-anim-container">
                <div className="hw-anim-bg" />
                <div className="hw-board">
                  <div className="hw-board-header">
                    <div className="hw-hdr-dot" style={{ background: "#f87171" }} />
                    <div className="hw-hdr-dot" style={{ background: "#fbbf24" }} />
                    <div className="hw-hdr-dot" style={{ background: "#34d399" }} />
                    <span className="hw-hdr-text" style={{ color: "#64748b" }}>
                      Discovery session
                    </span>
                  </div>
                  <div className="hw-map-canvas" data-hw-map />
                </div>
              </div>
              <div className="p-[22px] pb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-accent opacity-70">
                  Step 01
                </div>
                <div className="mt-1.5 text-lg font-bold text-brand-text">
                  We map it — together
                </div>
                <div className="mt-2 text-sm leading-relaxed text-brand-muted">
                  You tell us how your operation runs. We find the gaps side by side.
                </div>
              </div>
            </div>

            {/* ── Pillar 2: Build ── */}
            <div className="flex-1 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg">
              <div className="hw-anim-container">
                <div className="hw-anim-bg" />
                <div className="hw-board">
                  <div className="hw-board-header-accent">
                    <div className="hw-hdr-dot" style={{ background: "rgba(255,255,255,0.35)" }} />
                    <div className="hw-hdr-dot" style={{ background: "rgba(255,255,255,0.35)" }} />
                    <div className="hw-hdr-dot" style={{ background: "rgba(255,255,255,0.35)" }} />
                    <span className="hw-hdr-text" style={{ color: "rgba(255,255,255,0.85)" }}>
                      Your custom software
                    </span>
                  </div>
                  <div className="hw-build-area" data-hw-build />
                </div>
              </div>
              <div className="p-[22px] pb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-accent opacity-70">
                  Step 02
                </div>
                <div className="mt-1.5 text-lg font-bold text-brand-text">
                  We build it
                </div>
                <div className="mt-2 text-sm leading-relaxed text-brand-muted">
                  Custom software shaped around your tools. Not off-the-shelf.
                </div>
              </div>
            </div>

            {/* ── Pillar 3: Run ── */}
            <div className="flex-1 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg">
              <div className="hw-anim-container">
                <div className="hw-anim-bg" />
                <div className="hw-run-panel">
                  <div className="hw-run-hdr">
                    <span className="hw-run-hdr-title">Evios — System Monitor</span>
                    <span className="hw-run-hdr-live">
                      <span className="hw-run-live-dot" /> Live
                    </span>
                  </div>
                  <div className="hw-run-rows" data-hw-run-rows />
                  <div className="hw-run-support-bubble" data-hw-run-bubble>
                    💬 QuickBooks sync fixed — pushed live
                  </div>
                </div>
              </div>
              <div className="p-[22px] pb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-accent opacity-70">
                  Step 03
                </div>
                <div className="mt-1.5 text-lg font-bold text-brand-text">
                  We run it
                </div>
                <div className="mt-2 text-sm leading-relaxed text-brand-muted">
                  Hosting, updates, support. When something breaks, you call us.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
