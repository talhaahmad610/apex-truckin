"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Perspective hover tilt with a moving glare highlight. Transform-only. */
export function TiltCard({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  // Cached on pointerenter/resize instead of read on every pointermove — getBoundingClientRect
  // forces layout, and mousemove can fire far more often than a card's position ever changes.
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const onResize = () => {
      rectRef.current = null;
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = rectRef.current ?? (rectRef.current = el.getBoundingClientRect());
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:1100px]">
      <div
        ref={ref}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          "group/tilt relative h-full [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
          className,
        )}
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), rgba(245,166,35,0.12), transparent 45%)" }}
        />
      </div>
    </div>
  );
}
