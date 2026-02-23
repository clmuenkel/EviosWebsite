"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

type DemoIcon = "leak" | "quote" | "afterHours";

type DemoItem = {
  title: string;
  situation: string;
  audioSrc: string;
  icon: DemoIcon;
  outcomes: [string, string, string];
};

const DEMO_ITEMS: DemoItem[] = [
  {
    title: "After-Hours Missed",
    situation:
      "11 PM missed call. No voicemail. Most plumbers lose this job. Not you.",
    audioSrc: "/demo/after-hours-missed-call.mp3",
    icon: "afterHours",
    outcomes: ["Instant text-back", "Slot selected", "Booking confirmed"],
  },
  {
    title: "Emergency Leak",
    situation:
      "Kitchen pipe burst. Water spreading fast. The homeowner calls in a panic at 9 PM.",
    audioSrc: "/demo/emergency-leak.mp3",
    icon: "leak",
    outcomes: ["Triage complete", "Tech dispatched", "Confirmation sent"],
  },
  {
    title: "Quote Request",
    situation:
      "Homeowner wants a water heater replacement quote. Needs it before the weekend.",
    audioSrc: "/demo/water-heater-quote.mp3",
    icon: "quote",
    outcomes: ["Qualified lead", "Quote visit booked", "Details texted"],
  },
];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function DemoScene({ icon }: { icon: DemoIcon }) {
  if (icon === "leak") {
    return (
      <svg viewBox="0 0 280 220" className="demo-scene-svg" aria-hidden="true">
        <rect x="36" y="52" width="208" height="132" rx="16" className="scene-card" />
        <path d="M136 84 C124 102 122 112 136 122 C150 112 148 102 136 84 Z" className="leak-drop" />
        <circle cx="136" cy="138" r="14" className="leak-ripple leak-ripple-1" />
        <rect x="84" y="98" width="44" height="72" rx="10" className="scene-phone" />
      </svg>
    );
  }

  if (icon === "quote") {
    return (
      <svg viewBox="0 0 280 220" className="demo-scene-svg" aria-hidden="true">
        <rect x="40" y="48" width="200" height="136" rx="16" className="scene-card" />
        <rect x="72" y="74" width="92" height="120" rx="10" className="quote-sheet" />
        <line x1="84" y1="102" x2="150" y2="102" className="quote-line" />
        <line x1="84" y1="118" x2="150" y2="118" className="quote-line" />
        <line x1="84" y1="134" x2="130" y2="134" className="quote-line" />
        <text x="116" y="92" className="quote-dollar">
          $
        </text>
        <rect x="170" y="84" width="56" height="44" rx="8" className="quote-calendar" />
        <line x1="170" y1="98" x2="226" y2="98" className="quote-line" />
        <path d="M180 146 L194 160 L218 136" className="quote-check" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 220" className="demo-scene-svg" aria-hidden="true">
      <rect x="36" y="52" width="208" height="132" rx="16" className="scene-card" />
      <circle cx="78" cy="84" r="18" className="night-moon" />
      <circle cx="86" cy="78" r="18" className="night-cutout" />
      <circle cx="118" cy="74" r="2.4" className="night-star star-1" />
      <circle cx="138" cy="66" r="2.4" className="night-star star-2" />
      <circle cx="152" cy="84" r="2.4" className="night-star star-3" />
      <rect x="86" y="102" width="42" height="70" rx="10" className="scene-phone" />
      <path d="M148 112 L164 128 M164 112 L148 128" className="night-missed" />
      <rect x="146" y="134" width="74" height="36" rx="12" className="night-bubble" />
      <circle cx="168" cy="152" r="3" className="typing-dot dot-1" />
      <circle cx="182" cy="152" r="3" className="typing-dot dot-2" />
      <circle cx="196" cy="152" r="3" className="typing-dot dot-3" />
    </svg>
  );
}

export function DemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeItem = DEMO_ITEMS[activeIndex];

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [activeIndex]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
      setIsPlaying(true);
      return;
    }
    audio.pause();
    setIsPlaying(false);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="demo" className="section-block section-divider demo-showcase">
      <div className="section-frame">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
          Hear It In Action
        </p>
        <h2 className="section-heading mt-4">
          Real scenarios. Real results. Press play.
        </h2>

        <div className="demo-tab-row mt-8">
          {DEMO_ITEMS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`demo-tab ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              {item.title}
            </button>
          ))}
        </div>

        <article key={activeItem.title} className="demo-hero surface-card mt-6 p-5 sm:p-6">
          <div className="demo-hero-grid">
            <div className="demo-scene-wrap">
              <DemoScene icon={activeItem.icon} />
            </div>

            <div className="demo-content">
              <p className="demo-kicker">Situation</p>
              <h3 className="text-xl font-semibold text-brand-text">{activeItem.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                {activeItem.situation}
              </p>

              <div className="demo-player mt-5">
                <audio
                  key={activeItem.audioSrc}
                  ref={audioRef}
                  preload="metadata"
                  onLoadedMetadata={(event) =>
                    setDuration(event.currentTarget.duration || 0)
                  }
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src={activeItem.audioSrc} type="audio/mpeg" />
                </audio>

                <button
                  type="button"
                  className="player-toggle"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Pause demo call" : "Play demo call"}
                >
                  {isPlaying ? (
                    <svg className="player-icon player-icon-pause" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="6.5" y="5" width="4.5" height="14" rx="1.2" />
                      <rect x="13" y="5" width="4.5" height="14" rx="1.2" />
                    </svg>
                  ) : (
                    <svg className="player-icon player-icon-play" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5.5L18 12L8 18.5Z" />
                    </svg>
                  )}
                </button>

                <div className="player-track-wrap">
                  <p className="player-label">
                    {isPlaying ? "Playing demo call" : "Play demo call"}
                  </p>
                  <div className="player-track-fill" style={{ width: `${progress}%` }} />
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="player-range"
                    aria-label="Audio progress"
                  />
                  <div className="player-time">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              <div className="demo-outcomes mt-5">
                {activeItem.outcomes.map((outcome, index) => (
                  <div
                    key={outcome}
                    className="outcome-chip"
                    style={{ "--chip-delay": `${index * 130}ms` } as React.CSSProperties}
                  >
                    <span className="outcome-check" aria-hidden="true">
                      <svg viewBox="0 0 14 14">
                        <path d="M2 7.5L5.4 11L12 3.4" />
                      </svg>
                    </span>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      <style jsx global>{`
        .demo-showcase .demo-tab-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .demo-showcase .demo-tab {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(15, 23, 42, 0.6);
          color: rgba(226, 232, 240, 0.78);
          padding: 9px 14px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 220ms ease;
        }

        .demo-showcase .demo-tab.is-active {
          border-color: rgba(56, 189, 248, 0.5);
          color: #e2e8f0;
          box-shadow: inset 0 -2px 0 rgba(56, 189, 248, 0.9);
        }

        .demo-showcase .demo-hero {
          animation: demoHeroIn 320ms ease-out;
        }

        .demo-showcase .demo-hero-grid {
          display: grid;
          gap: 18px;
          grid-template-columns: 1fr;
        }

        .demo-showcase .demo-scene-wrap {
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background:
            radial-gradient(circle at 20% 12%, rgba(14, 165, 233, 0.16), transparent 44%),
            linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(10, 15, 30, 0.75) 100%);
          padding: 10px;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .demo-showcase .demo-scene-svg {
          width: 100%;
          height: auto;
          max-width: 280px;
        }

        .demo-showcase .scene-card {
          fill: rgba(15, 23, 42, 0.68);
          stroke: rgba(148, 163, 184, 0.35);
        }

        .demo-showcase .scene-phone {
          fill: rgba(30, 41, 59, 0.9);
          stroke: rgba(148, 163, 184, 0.55);
        }

        .demo-showcase .leak-drop {
          fill: rgba(56, 189, 248, 0.95);
          animation: leakDrop 1.8s ease-in-out infinite;
          transform-origin: 136px 84px;
        }

        .demo-showcase .leak-ripple {
          fill: none;
          stroke: rgba(56, 189, 248, 0.7);
          stroke-width: 2;
          transform-origin: 136px 138px;
          animation: leakRipple 1.8s ease-out infinite;
        }

        .demo-showcase .quote-sheet,
        .demo-showcase .quote-calendar {
          fill: rgba(15, 23, 42, 0.72);
          stroke: rgba(148, 163, 184, 0.5);
        }

        .demo-showcase .quote-line {
          stroke: rgba(148, 163, 184, 0.7);
          stroke-width: 2;
          stroke-linecap: round;
        }

        .demo-showcase .quote-dollar {
          fill: rgba(56, 189, 248, 0.95);
          font-size: 18px;
          font-weight: 700;
          text-anchor: middle;
        }

        .demo-showcase .quote-check {
          fill: none;
          stroke: rgba(74, 222, 128, 0.9);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: quoteCheck 1.5s ease-out infinite;
        }

        .demo-showcase .night-moon {
          fill: rgba(253, 224, 71, 0.9);
          animation: moonGlow 1.9s ease-in-out infinite;
        }

        .demo-showcase .night-cutout {
          fill: rgba(15, 23, 42, 0.84);
        }

        .demo-showcase .night-star {
          fill: rgba(191, 219, 254, 0.9);
          animation: starBlink 1.7s ease-in-out infinite;
        }

        .demo-showcase .night-star.star-2 {
          animation-delay: 0.35s;
        }

        .demo-showcase .night-star.star-3 {
          animation-delay: 0.7s;
        }

        .demo-showcase .night-missed {
          stroke: rgba(248, 113, 113, 0.95);
          stroke-width: 2.5;
          stroke-linecap: round;
          animation: missedBlink 1.5s ease-in-out infinite;
        }

        .demo-showcase .night-bubble {
          fill: rgba(30, 41, 59, 0.92);
          stroke: rgba(148, 163, 184, 0.5);
        }

        .demo-showcase .typing-dot {
          fill: rgba(125, 211, 252, 0.9);
          animation: typingDots 1.1s ease-in-out infinite;
        }

        .demo-showcase .typing-dot.dot-2 {
          animation-delay: 0.2s;
        }

        .demo-showcase .typing-dot.dot-3 {
          animation-delay: 0.4s;
        }

        .demo-showcase .demo-kicker {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          color: #38bdf8;
        }

        .demo-showcase .demo-player {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .demo-showcase .player-toggle {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.9);
          background: linear-gradient(180deg, #38bdf8 0%, #2563eb 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 1px rgba(224, 242, 254, 0.24) inset,
            0 0 20px rgba(56, 189, 248, 0.38),
            0 12px 20px rgba(2, 6, 23, 0.34);
          animation: playerPulse 1.8s ease-in-out infinite;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .demo-showcase .player-toggle:hover {
          transform: translateY(-1px) scale(1.03);
          box-shadow:
            0 0 0 1px rgba(224, 242, 254, 0.3) inset,
            0 0 24px rgba(56, 189, 248, 0.5),
            0 16px 24px rgba(2, 6, 23, 0.4);
        }

        .demo-showcase .player-toggle:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 3px rgba(56, 189, 248, 0.35),
            0 0 24px rgba(56, 189, 248, 0.45),
            0 14px 22px rgba(2, 6, 23, 0.4);
        }

        .demo-showcase .player-icon {
          width: 24px;
          height: 24px;
          fill: #ffffff;
        }

        .demo-showcase .player-icon-play {
          margin-left: 2px;
        }

        .demo-showcase .player-track-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .demo-showcase .player-label {
          margin: 0 0 6px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(226, 232, 240, 0.95);
          letter-spacing: 0.02em;
        }

        .demo-showcase .player-track-wrap::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 30px;
          height: 4px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.25);
        }

        .demo-showcase .player-track-fill {
          position: absolute;
          left: 0;
          top: 30px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, #38bdf8, #3b82f6);
          pointer-events: none;
        }

        .demo-showcase .player-range {
          width: 100%;
          margin: 0;
          background: transparent;
          appearance: none;
          height: 42px;
          position: relative;
          z-index: 2;
        }

        .demo-showcase .player-range::-webkit-slider-thumb {
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #e0f2fe;
          border: 1px solid rgba(56, 189, 248, 0.85);
        }

        .demo-showcase .player-range::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #e0f2fe;
          border: 1px solid rgba(56, 189, 248, 0.85);
        }

        .demo-showcase .player-time {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(148, 163, 184, 0.9);
          margin-top: -2px;
        }

        .demo-showcase .demo-outcomes {
          display: grid;
          gap: 10px;
          grid-template-columns: 1fr;
        }

        .demo-showcase .outcome-chip {
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(15, 23, 42, 0.66);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(226, 232, 240, 0.92);
          opacity: 0;
          transform: translateY(6px);
          animation: chipIn 350ms ease-out forwards;
          animation-delay: var(--chip-delay, 0ms);
        }

        .demo-showcase .outcome-check {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 1px solid rgba(74, 222, 128, 0.45);
          background: rgba(22, 163, 74, 0.15);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .demo-showcase .outcome-check svg {
          width: 11px;
          height: 11px;
          fill: none;
          stroke: rgba(74, 222, 128, 0.95);
          stroke-width: 2.1;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: checkDraw 450ms ease-out forwards;
          animation-delay: calc(var(--chip-delay, 0ms) + 110ms);
        }

        @media (min-width: 768px) {
          .demo-showcase .demo-hero-grid {
            grid-template-columns: minmax(240px, 0.95fr) minmax(0, 1.05fr);
            gap: 22px;
            align-items: center;
          }

          .demo-showcase .demo-outcomes {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @keyframes demoHeroIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes playerPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 1px rgba(224, 242, 254, 0.24) inset,
              0 0 20px rgba(56, 189, 248, 0.38),
              0 12px 20px rgba(2, 6, 23, 0.34);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(224, 242, 254, 0.28) inset,
              0 0 26px rgba(56, 189, 248, 0.55),
              0 14px 22px rgba(2, 6, 23, 0.38);
          }
        }

        @keyframes leakDrop {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @keyframes leakRipple {
          0% {
            opacity: 0.8;
            transform: scale(0.5);
          }
          100% {
            opacity: 0;
            transform: scale(1.25);
          }
        }

        @keyframes quoteCheck {
          0% {
            stroke-dashoffset: 48;
          }
          35% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes moonGlow {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes starBlink {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes missedBlink {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes typingDots {
          0%,
          100% {
            opacity: 0.35;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }

        @keyframes chipIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .demo-showcase * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
