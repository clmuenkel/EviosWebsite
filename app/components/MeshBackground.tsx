"use client";

import { useEffect, useRef } from "react";

/* ── constants ─────────────────────────────────────────────── */
const PARTICLE_COUNT = 75;
const ICON_COUNT = 16;
const CONNECTION_DIST = 155;
const MOUSE_RADIUS = 140;
const MOUSE_FORCE = 0.6;

type RGB = { r: number; g: number; b: number };
const BLUE: RGB = { r: 11, g: 83, b: 148 };
const LIGHT_BLUE: RGB = { r: 160, g: 195, b: 235 };
const WARM_RED: RGB = { r: 220, g: 80, b: 60 };

/* ── icon drawing functions ────────────────────────────────── */
type IconDrawer = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  a: number,
) => void;

const iconDrawers: IconDrawer[] = [
  // 0 — Phone (thinner strokes)
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.roundRect(-5, -7, 10, 14, 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 4, 1, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  },
  // 1 — Wrench
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.3; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-5, 5); ctx.lineTo(3, -3); ctx.stroke();
    ctx.beginPath(); ctx.arc(4.5, -4.5, 2.5, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  },
  // 2 — Dollar
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.font = "bold 13px Inter"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("$", 0, 0);
    ctx.restore();
  },
  // 3 — Calendar
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.roundRect(-6, -5, 12, 11, 1.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6, -1); ctx.lineTo(6, -1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-3, -7); ctx.lineTo(-3, -4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, -7); ctx.lineTo(3, -4); ctx.stroke();
    ctx.restore();
  },
  // 4 — Clipboard (wider, proportional clip)
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.roundRect(-6, -6, 12, 13, 1.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(4, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, 3); ctx.lineTo(2, 3); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-3, -8, 6, 3, 1); ctx.stroke();
    ctx.restore();
  },
  // 5 — Truck
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2; ctx.lineCap = "round";
    ctx.beginPath(); ctx.roundRect(-7, -4, 9, 7, 1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, -1); ctx.lineTo(5, -1); ctx.lineTo(7, 1); ctx.lineTo(7, 3); ctx.lineTo(2, 3); ctx.stroke();
    ctx.beginPath(); ctx.arc(-3, 4.5, 1.5, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(5, 4.5, 1.5, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  },
  // 6 — Receipt / invoice (wider body + lines)
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-6, -7); ctx.lineTo(-6, 6); ctx.lineTo(-3.5, 4.5); ctx.lineTo(-1, 6); ctx.lineTo(1, 4.5); ctx.lineTo(3.5, 6); ctx.lineTo(6, 4.5); ctx.lineTo(6, -7); ctx.closePath();
    ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-3.5, -3); ctx.lineTo(3.5, -3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-3.5, 0); ctx.lineTo(3.5, 0); ctx.stroke();
    ctx.restore();
  },
  // 7 — Person
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(0, -4, 3, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5, 6); ctx.quadraticCurveTo(-5, 0, 0, 0);
    ctx.quadraticCurveTo(5, 0, 5, 6); ctx.stroke();
    ctx.restore();
  },
  // 8 — Gear
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(ang) * 4, Math.sin(ang) * 4);
      ctx.lineTo(Math.cos(ang) * 6, Math.sin(ang) * 6);
      ctx.stroke();
    }
    ctx.restore();
  },
  // 9 — Lightning bolt
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},0.3)`;
    ctx.lineWidth = 1.2; ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(1, -7); ctx.lineTo(-3, 0); ctx.lineTo(0, 0); ctx.lineTo(-1, 7); ctx.lineTo(3, 0); ctx.lineTo(0, 0); ctx.closePath();
    ctx.stroke(); ctx.fill();
    ctx.restore();
  },
  // 10 — Star / review
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.1; ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const ang = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const r = 6;
      if (i === 0) ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
      else ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
    }
    ctx.closePath(); ctx.stroke();
    ctx.restore();
  },
  // 11 — Chat bubble
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.roundRect(-6, -5, 12, 9, 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-2, 4); ctx.lineTo(0, 7); ctx.lineTo(2, 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-3, -1); ctx.lineTo(3, -1); ctx.stroke();
    ctx.restore();
  },
  // 12 — House
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(-7, -1); ctx.lineTo(-5, -1); ctx.lineTo(-5, 6); ctx.lineTo(5, 6); ctx.lineTo(5, -1); ctx.lineTo(7, -1); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-2, 1, 4, 5, 0.5); ctx.stroke();
    ctx.restore();
  },
  // 13 — Clock
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2; ctx.lineCap = "round";
    ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -3.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(3, 1); ctx.stroke();
    ctx.restore();
  },
  // 14 — Map pin
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(0, -3, 4, Math.PI, 0); ctx.lineTo(0, 7); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -3, 1.5, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  },
  // 15 — Shield / checkmark
  (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`;
    ctx.lineWidth = 1.2; ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(-6, -4); ctx.lineTo(-6, 1); ctx.quadraticCurveTo(-6, 7, 0, 8); ctx.quadraticCurveTo(6, 7, 6, 1); ctx.lineTo(6, -4); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-2.5, 0); ctx.lineTo(-0.5, 2.5); ctx.lineTo(3, -2); ctx.stroke();
    ctx.restore();
  },
];

/* ── Particle ──────────────────────────────────────────────── */
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  isIcon: boolean;
  iconIdx: number;
  isAccent: boolean;
  iconScale: number;
  rotation: number;
  brightTimer: number;

  constructor(isIcon: boolean, iconIdx: number, W: number, H: number) {
    this.isIcon = isIcon;
    this.iconIdx = iconIdx;
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.08;
    this.vy = (Math.random() - 0.5) * 0.08;
    this.radius = isIcon ? 3 : Math.random() * 2 + 1.5;
    this.baseAlpha = isIcon
      ? Math.random() * 0.1 + 0.12
      : Math.random() * 0.1 + 0.07;
    this.alpha = this.baseAlpha;
    this.isAccent = Math.random() > 0.35;
    this.iconScale = 0.9 + Math.random() * 0.3;
    this.rotation = (Math.random() - 0.5) * 0.3;
    this.brightTimer = 0;
  }

  update(mouseX: number, mouseY: number, W: number, H: number) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      this.vx += (dx / dist) * force;
      this.vy += (dy / dist) * force;
    }

    this.vx *= 0.995;
    this.vy *= 0.995;

    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed < 0.06) {
      this.vx += (Math.random() - 0.5) * 0.03;
      this.vy += (Math.random() - 0.5) * 0.03;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -30) this.x = W + 30;
    if (this.x > W + 30) this.x = -30;
    if (this.y < -30) this.y = H + 30;
    if (this.y > H + 30) this.y = -30;

    this.alpha =
      this.baseAlpha + Math.sin(Date.now() * 0.0008 + this.x * 0.008) * 0.05;

    if (this.brightTimer > 0) {
      this.brightTimer -= 0.02;
      this.alpha = Math.min(this.baseAlpha + this.brightTimer * 0.3, 0.5);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.isIcon) {
      const drawer = iconDrawers[this.iconIdx % iconDrawers.length];
      drawer(ctx, this.x, this.y, this.iconScale, this.alpha);
    } else {
      const c = this.isAccent ? BLUE : LIGHT_BLUE;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${this.alpha})`;
      ctx.fill();

      if (this.radius > 2.2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${this.alpha * 0.1})`;
        ctx.fill();
      }
    }
  }
}

/* ── Pulse ─────────────────────────────────────────────────── */
class Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  alive: boolean;

  constructor(fromIdx: number, toIdx: number) {
    this.fromIdx = fromIdx;
    this.toIdx = toIdx;
    this.progress = 0;
    this.speed = 1.0 + Math.random() * 0.6;
    this.alive = true;
  }

  update(particles: Particle[]) {
    const from = particles[this.fromIdx];
    const to = particles[this.toIdx];
    if (!from || !to) {
      this.alive = false;
      return;
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.progress += this.speed / dist;
    if (this.progress >= 1) {
      this.alive = false;
      to.brightTimer = 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, particles: Particle[]) {
    const from = particles[this.fromIdx];
    const to = particles[this.toIdx];
    if (!from || !to) return;

    const x = from.x + (to.x - from.x) * this.progress;
    const y = from.y + (to.y - from.y) * this.progress;
    const p = this.progress;

    const r = Math.round(WARM_RED.r + (BLUE.r - WARM_RED.r) * p);
    const g = Math.round(WARM_RED.g + (BLUE.g - WARM_RED.g) * p);
    const b = Math.round(WARM_RED.b + (BLUE.b - WARM_RED.b) * p);

    const fadeAlpha = 0.3 * (1 - Math.pow(Math.abs(p - 0.5) * 2, 2));

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, fadeAlpha * 0.15)})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, fadeAlpha)})`;
    ctx.fill();

    const tx = from.x + (to.x - from.x) * Math.max(0, this.progress - 0.06);
    const ty = from.y + (to.y - from.y) * Math.max(0, this.progress - 0.06);
    ctx.beginPath();
    ctx.arc(tx, ty, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, fadeAlpha * 0.4)})`;
    ctx.fill();
  }
}

/* ── Component ─────────────────────────────────────────────── */
export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let lastPulseTime = 0;
    let animId = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      particles = [];
      pulses = [];

      for (let i = 0; i < ICON_COUNT; i++) {
        particles.push(new Particle(true, i, W, H));
      }
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(false, 0, W, H));
      }
    }

    function getConnections() {
      const conns: { i: number; j: number; dist: number }[] = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            conns.push({ i, j, dist });
          }
        }
      }
      return conns;
    }

    function drawFrame(time: number) {
      ctx!.clearRect(0, 0, W, H);

      particles.forEach((p) => p.update(mouseX, mouseY, W, H));

      const conns = getConnections();

      conns.forEach((c) => {
        const opacity = (1 - c.dist / CONNECTION_DIST) * 0.06;
        ctx!.beginPath();
        ctx!.moveTo(particles[c.i].x, particles[c.i].y);
        ctx!.lineTo(particles[c.j].x, particles[c.j].y);
        ctx!.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${opacity})`;
        ctx!.lineWidth = 0.7;
        ctx!.stroke();
      });

      particles.filter((p) => !p.isIcon).forEach((p) => p.draw(ctx!));
      particles.filter((p) => p.isIcon).forEach((p) => p.draw(ctx!));

      if (time - lastPulseTime > 800 + Math.random() * 600) {
        if (conns.length > 0) {
          const c = conns[Math.floor(Math.random() * conns.length)];
          const dir = Math.random() > 0.5;
          pulses.push(new Pulse(dir ? c.i : c.j, dir ? c.j : c.i));
        }
        lastPulseTime = time;
      }

      pulses.forEach((p) => {
        p.update(particles);
        p.draw(ctx!, particles);
      });
      pulses = pulses.filter((p) => p.alive);

      animId = requestAnimationFrame(drawFrame);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onResize = () => {
      resize();
      particles.forEach((p) => {
        if (p.x > W) p.x = Math.random() * W;
        if (p.y > H) p.y = Math.random() * H;
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    init();
    animId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
