"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SPRITE_BUCKETS = 12;

/**
 * Ambient amber particles with depth (size, speed and alpha scale with z).
 * Canvas 2D — no WebGL. Pauses when off-screen or when the tab is hidden.
 *
 * Each particle's radius is fixed by its (constant) depth, so instead of calling
 * `createRadialGradient` per particle, per frame (up to ~4,200 allocations/sec at
 * 70 particles/60fps), we pre-render one soft-glow sprite per depth bucket once and
 * `drawImage` it each frame, modulating brightness with the cheap `globalAlpha` state
 * set — same visual result, no per-frame gradient allocation/GC churn.
 */
export function Particles({ count = 70, className }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = window.innerWidth < 768 ? Math.round(count * 0.5) : count;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const sprites = Array.from({ length: SPRITE_BUCKETS }, (_, i) => {
      const depth = (i + 0.5) / SPRITE_BUCKETS;
      const r = 0.6 + depth * 1.8;
      const d = Math.max(2, Math.ceil(r * 8 * dpr));
      const sprite = document.createElement("canvas");
      sprite.width = d;
      sprite.height = d;
      const sctx = sprite.getContext("2d");
      if (sctx) {
        const g = sctx.createRadialGradient(d / 2, d / 2, 0, d / 2, d / 2, (r * 4) * dpr);
        g.addColorStop(0, "rgba(255,196,92,1)");
        g.addColorStop(1, "rgba(245,166,35,0)");
        sctx.fillStyle = g;
        sctx.beginPath();
        sctx.arc(d / 2, d / 2, (r * 4) * dpr, 0, Math.PI * 2);
        sctx.fill();
      }
      return sprite;
    });

    let w = 0, h = 0, raf = 0, visible = true;
    const ps = Array.from({ length: n }, () => {
      const z = Math.random();
      const depth = 0.3 + z * 0.7;
      const r = 0.6 + depth * 1.8;
      return {
        x: Math.random(),
        y: Math.random(),
        z,
        p: Math.random() * Math.PI * 2,
        r,
        bucket: Math.min(SPRITE_BUCKETS - 1, Math.floor(depth * SPRITE_BUCKETS)),
      };
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const depth = 0.3 + p.z * 0.7;
        p.y -= 0.00018 * depth * 3;
        p.x += Math.sin(t * 0.0003 + p.p) * 0.00008;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        const a = (0.15 + depth * 0.55) * (0.6 + 0.4 * Math.sin(t * 0.002 + p.p));
        const size = p.r * 8;
        ctx.globalAlpha = a;
        ctx.drawImage(sprites[p.bucket]!, p.x * w - size / 2, p.y * h - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting) && !document.hidden;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });

    resize();
    draw(0);
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
