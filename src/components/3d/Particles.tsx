"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Ambient amber particles with depth (size, speed and alpha scale with z).
 * Canvas 2D — no WebGL. Pauses when off-screen or when the tab is hidden.
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

    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ps = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), z: Math.random(), p: Math.random() * Math.PI * 2 }));

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
        const r = 0.6 + depth * 1.8;
        const a = (0.15 + depth * 0.55) * (0.6 + 0.4 * Math.sin(t * 0.002 + p.p));
        const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, r * 4);
        g.addColorStop(0, `rgba(255,196,92,${a})`);
        g.addColorStop(1, "rgba(245,166,35,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
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
