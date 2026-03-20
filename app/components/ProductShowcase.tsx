"use client";

import { useEffect, useRef, useState } from "react";
import { PillarCards } from "./TransitionSection";

type DemoAction = "play" | "pause" | "restart";

type Feature = { icon: React.ReactNode; label: string; tag: string };

type VideoProduct = {
  kind: "video";
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
  videoSrc: string;
  frame: "phone";
  mediaPosition: "left" | "right";
};

type IframeProduct = {
  kind: "iframe";
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
  iframeSrc: string;
  messageType: string;
  iframeHeight: string;
  iframeTitle: string;
};

type ShowcaseItem = VideoProduct | IframeProduct;

/* ── Inline SVG icons (small, clean line-art) ── */
const iconClass = "h-4 w-4 shrink-0 text-brand-accent";

const Icons = {
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  fileScan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M16 14a2 2 0 0 0-2 2" /><path d="M20 14a2 2 0 0 1 2 2" />
      <path d="M16 22a2 2 0 0 1-2-2" /><path d="M20 22a2 2 0 0 0 2-2" />
    </svg>
  ),
  barChart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  messageCircle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  ),
  fileText: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  dollarSign: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="m22 2-11 11" />
    </svg>
  ),
};

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    kind: "iframe",
    id: "inventory",
    eyebrow: "Inventory Management",
    title: "Field to Back Office in One Voice Command",
    description:
      "Technicians order materials by voice from the job site. The system checks stock across trucks, warehouses, and suppliers — then generates POs and syncs everything automatically.",
    features: [
      { icon: Icons.mic, label: "Voice ordering", tag: "Hands-free from the field" },
      { icon: Icons.box, label: "Auto stock check", tag: "Truck + warehouse + supplier" },
      { icon: Icons.clipboard, label: "PO generation", tag: "Instant, zero paperwork" },
      { icon: Icons.refresh, label: "Real-time sync", tag: "QuickBooks & Housecall Pro" },
    ],
    iframeSrc: "/demos/inventory-demo.html",
    messageType: "inventory-demo-control",
    iframeHeight: "h-[460px] sm:h-[580px] md:h-[580px] lg:h-[540px]",
    iframeTitle: "Inventory management demo",
  },
  {
    kind: "iframe",
    id: "rfp",
    eyebrow: "RFP Pipeline",
    title: "Document to Signed Contract Without the Back and Forth",
    description:
      "Drop in an RFP and the system reads the full document, scores it, and lets you ask questions about any clause. Generate a ready-to-sign contract in one click.",
    features: [
      { icon: Icons.fileScan, label: "AI document scan", tag: "Full analysis in seconds" },
      { icon: Icons.barChart, label: "Bid/no-bid scoring", tag: "6-factor confidence score" },
      { icon: Icons.messageCircle, label: "AI Q&A", tag: "Ask about any clause" },
      { icon: Icons.fileText, label: "Contract generation", tag: "One-click from template" },
    ],
    iframeSrc: "/demos/rfp-demo.html",
    messageType: "rfp-demo-control",
    iframeHeight: "h-[640px] sm:h-[600px] md:h-[600px]",
    iframeTitle: "RFP pipeline demo",
  },
  {
    kind: "video",
    id: "quote",
    eyebrow: "Instant Quote App",
    title: "Turn photos into a polished quote in seconds",
    description:
      "Take one or more photos, add a quick voice note, and the app returns Good / Better / Best pricing using your real inventory costs. Send an accurate PDF to the customer with one click.",
    features: [
      { icon: Icons.camera, label: "Photo + voice intake", tag: "Snap, speak, done" },
      { icon: Icons.dollarSign, label: "Tiered pricing", tag: "Good / Better / Best" },
      { icon: Icons.send, label: "PDF output", tag: "One tap to send" },
    ],
    videoSrc: "/demos/instant-quote.mp4",
    frame: "phone",
    mediaPosition: "left",
  },
];

function FeatureChip({ icon, label, tag }: Feature) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-brand-surface2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
      <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-brand-text sm:gap-2 sm:text-sm">
        {icon}
        {label}
      </span>
      <span className="min-w-0 truncate text-[11px] font-medium text-brand-muted sm:text-xs">
        {tag}
      </span>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[190px] sm:w-[220px] md:w-[240px]">
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-[#1e1e1e] bg-[#1e1e1e] shadow-xl">
        <div className="absolute left-1/2 top-0 z-10 h-[22px] w-[35%] -translate-x-1/2 rounded-b-2xl bg-[#1e1e1e]" />
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}

function PlaybackControls({
  isPlaying,
  onStart,
  onStop,
  onRestart,
}: {
  isPlaying: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart: () => void;
}) {
  const buttonBase =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all sm:gap-2 sm:px-4 sm:py-2 sm:text-sm";

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="rounded-full bg-brand-surface2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
        Demo controls
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onStart}
          className={`${buttonBase} ${
            isPlaying
              ? "border-brand-accent bg-brand-accent text-white shadow-md"
              : "border-brand-accent/20 bg-white text-brand-accent hover:border-brand-accent/50 hover:bg-brand-accentLight/40"
          }`}
          aria-label="Start demo playback"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M8 6v12l10-6z" />
          </svg>
          Start
        </button>
        <button
          type="button"
          onClick={onStop}
          className={`${buttonBase} ${
            !isPlaying
              ? "border-brand-text/80 bg-brand-text text-white shadow-md"
              : "border-brand-text/15 bg-white text-brand-text hover:border-brand-text/35 hover:bg-brand-surface2"
          }`}
          aria-label="Stop demo playback"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M7 7h10v10H7z" />
          </svg>
          Stop
        </button>
        <button
          type="button"
          onClick={onRestart}
          className={`${buttonBase} border-brand-text/15 bg-white text-brand-text hover:border-brand-text/35 hover:bg-brand-surface2`}
          aria-label="Restart demo playback"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 105.64-11.36L1 10" />
          </svg>
          Restart
        </button>
      </div>
    </div>
  );
}

const IFRAME_ITEMS = SHOWCASE_ITEMS.filter(
  (item): item is IframeProduct => item.kind === "iframe",
);

export function ProductShowcase() {
  const [inViewMap, setInViewMap] = useState<Record<string, boolean>>({});
  const [isPausedByUserMap, setIsPausedByUserMap] = useState<Record<string, boolean>>({});
  const [iframePlaying, setIframePlaying] = useState<Record<string, boolean>>({});
  const [iframeReady, setIframeReady] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const postIframeCommand = (itemId: string, messageType: string, action: DemoAction) => {
    iframeRefs.current[itemId]?.contentWindow?.postMessage(
      { type: messageType, action },
      "*",
    );
  };

  const handleStart = (itemId: string) => {
    setIsPausedByUserMap((current) => ({ ...current, [itemId]: false }));

    const item = SHOWCASE_ITEMS.find((i) => i.id === itemId);
    if (item?.kind === "iframe") {
      if (iframeReady[itemId] && inViewMap[itemId]) {
        postIframeCommand(itemId, item.messageType, "play");
        setIframePlaying((prev) => ({ ...prev, [itemId]: true }));
      }
      return;
    }

    const videoEl = videoRefs.current[itemId];
    if (videoEl && inViewMap[itemId]) {
      videoEl.play().catch(() => {});
    }
  };

  const handleStop = (itemId: string) => {
    setIsPausedByUserMap((current) => ({ ...current, [itemId]: true }));

    const item = SHOWCASE_ITEMS.find((i) => i.id === itemId);
    if (item?.kind === "iframe") {
      postIframeCommand(itemId, item.messageType, "pause");
      setIframePlaying((prev) => ({ ...prev, [itemId]: false }));
      return;
    }

    const videoEl = videoRefs.current[itemId];
    videoEl?.pause();
  };

  const handleRestart = (itemId: string) => {
    setIsPausedByUserMap((current) => ({ ...current, [itemId]: false }));

    const item = SHOWCASE_ITEMS.find((i) => i.id === itemId);
    if (item?.kind === "iframe") {
      postIframeCommand(itemId, item.messageType, "restart");
      setIframePlaying((prev) => ({ ...prev, [itemId]: true }));
      return;
    }

    const videoEl = videoRefs.current[itemId];
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {});
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setInViewMap((current) => {
          const next = { ...current };
          let hasChanges = false;

          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.showcaseId;
            if (!id) return;
            if (next[id] === entry.isIntersecting) return;
            next[id] = entry.isIntersecting;
            hasChanges = true;
          });

          return hasChanges ? next : current;
        });
      },
      { threshold: 0.35 },
    );

    Object.values(rowRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  // Pause video when scrolled out of view (no auto-play)
  useEffect(() => {
    SHOWCASE_ITEMS.forEach((item) => {
      if (item.kind !== "video") return;
      const videoEl = videoRefs.current[item.id];
      if (!videoEl) return;

      if (!inViewMap[item.id]) {
        videoEl.pause();
      }
    });
  }, [inViewMap]);

  // Pause iframes when scrolled out of view (no auto-play)
  useEffect(() => {
    IFRAME_ITEMS.forEach((item) => {
      if (!iframeReady[item.id]) return;

      if (!inViewMap[item.id]) {
        postIframeCommand(item.id, item.messageType, "pause");
        setIframePlaying((prev) => ({ ...prev, [item.id]: false }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewMap, iframeReady]);

  return (
    <section id="products" className="section-block section-divider">
      <div className="section-frame">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          What we automate
        </p>
        <h2 className="section-heading text-center">
          The back-office gaps that cost you money
        </h2>
        <p className="section-copy mx-auto text-center">
          Most field-service revenue leaks happen in three places. We build custom software that closes each one.
        </p>

        <div className="mt-10">
          <PillarCards />
        </div>

        <div className="mt-12 space-y-6 md:space-y-8">
          {SHOWCASE_ITEMS.map((item) => {
            const isVisible = !!inViewMap[item.id];
            const isMediaRight = item.kind === "video" && item.mediaPosition === "right";

            return (
              <article
                key={item.id}
                ref={(node) => {
                  rowRefs.current[item.id] = node;
                }}
                data-showcase-id={item.id}
                data-visible={isVisible ? "true" : "false"}
                className="soft-fade-in rounded-3xl border border-black/[0.06] bg-white p-4 shadow-sm sm:p-5"
              >
                {item.kind === "iframe" ? (
                  <div className="space-y-3">
                    <div className="mx-auto max-w-3xl text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
                        {item.description}
                      </p>
                      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {item.features.map((f) => (
                          <FeatureChip key={f.label} {...f} />
                        ))}
                      </div>
                      <div className="mt-6">
                        <PlaybackControls
                          isPlaying={!!iframePlaying[item.id]}
                          onStart={() => handleStart(item.id)}
                          onStop={() => handleStop(item.id)}
                          onRestart={() => handleRestart(item.id)}
                        />
                      </div>
                    </div>

                    <div className={`relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-2xl ${item.iframeHeight}`}>
                      <iframe
                        ref={(el) => {
                          iframeRefs.current[item.id] = el;
                        }}
                        src={item.iframeSrc}
                        title={item.iframeTitle}
                        loading="lazy"
                        allow="autoplay"
                        onLoad={() =>
                          setIframeReady((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
                    <div className={isMediaRight ? "order-2" : "order-1"}>
                      <div className="flex flex-col items-center gap-4">
                        <PhoneFrame>
                          <div className="relative h-full w-full">
                            <video
                              ref={(el) => {
                                videoRefs.current[item.id] = el;
                              }}
                              src={`${item.videoSrc}#t=2`}
                              loop
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </PhoneFrame>
                        <PlaybackControls
                          isPlaying={!!inViewMap[item.id] && !isPausedByUserMap[item.id]}
                          onStart={() => handleStart(item.id)}
                          onStop={() => handleStop(item.id)}
                          onRestart={() => handleRestart(item.id)}
                        />
                      </div>
                    </div>

                    <div className={`text-center md:text-left ${isMediaRight ? "order-1" : "order-2"}`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-muted sm:text-base md:mx-0 md:max-w-none">
                        {item.description}
                      </p>
                      <div className="mt-5 grid grid-cols-1 gap-2.5">
                        {item.features.map((f) => (
                          <FeatureChip key={f.label} {...f} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
