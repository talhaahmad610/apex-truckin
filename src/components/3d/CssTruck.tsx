"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cn } from "@/lib/utils";

/* ───────────────────────── CSS 3D primitives ─────────────────────────
   A Box is a zero-size anchor at the box's center; its six faces are absolutely
   positioned and pushed out with translateZ. Everything lives in one
   preserve-3d scene, so real depth sorting is done by the browser compositor. */

type FaceName = "front" | "back" | "left" | "right" | "top" | "bottom";

interface BoxProps {
  w: number;
  h: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  faces: Partial<Record<FaceName, string>>;
  children?: Partial<Record<FaceName, ReactNode>>;
}

function Box({ w, h, d, x = 0, y = 0, z = 0, faces, children }: BoxProps) {
  const spec: Record<FaceName, { fw: number; fh: number; t: string }> = {
    front: { fw: w, fh: h, t: `translateZ(${d / 2}px)` },
    back: { fw: w, fh: h, t: `rotateY(180deg) translateZ(${d / 2}px)` },
    right: { fw: d, fh: h, t: `rotateY(90deg) translateZ(${w / 2}px)` },
    left: { fw: d, fh: h, t: `rotateY(-90deg) translateZ(${w / 2}px)` },
    top: { fw: w, fh: d, t: `rotateX(90deg) translateZ(${h / 2}px)` },
    bottom: { fw: w, fh: d, t: `rotateX(-90deg) translateZ(${h / 2}px)` },
  };
  return (
    <div className="absolute left-0 top-0 [transform-style:preserve-3d]" style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}>
      {(Object.keys(spec) as FaceName[]).map((f) =>
        faces[f] ? (
          <div
            key={f}
            className="absolute [backface-visibility:hidden]"
            style={{
              width: spec[f].fw,
              height: spec[f].fh,
              left: -spec[f].fw / 2,
              top: -spec[f].fh / 2,
              transform: spec[f].t,
              background: faces[f],
            }}
          >
            {children?.[f]}
          </div>
        ) : null,
      )}
    </div>
  );
}

/** A wheel = three stacked discs (tire depth) with a spinning hub on the outer disc. */
function Wheel({ x, y, z, r = 30, outward = 1 }: { x: number; y: number; z: number; r?: number; outward?: 1 | -1 }) {
  return (
    <div className="absolute left-0 top-0 [transform-style:preserve-3d]" style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}>
      {[0, 7, 14].map((dz, i) => (
        <div
          key={dz}
          className="absolute rounded-full"
          style={{
            width: r * 2,
            height: r * 2,
            left: -r,
            top: -r,
            transform: `translateZ(${dz * outward}px)`,
            background:
              i === 2
                ? "radial-gradient(circle, #1b1d26 0 38%, #0b0c10 39% 100%)"
                : "radial-gradient(circle, #111218 0 60%, #07070a 61%)",
            boxShadow: i === 2 ? "inset 0 0 0 3px rgba(255,255,255,0.06)" : undefined,
          }}
        >
          {i === 2 && (
            <div className="absolute inset-[22%] animate-spin-slow rounded-full" style={{ animationDirection: outward === 1 ? "normal" : "reverse" }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #c9ced8 0 8deg, #3a3f4c 8deg 60deg, #c9ced8 60deg 68deg, #3a3f4c 68deg 120deg, #c9ced8 120deg 128deg, #3a3f4c 128deg 180deg, #c9ced8 180deg 188deg, #3a3f4c 188deg 240deg, #c9ced8 240deg 248deg, #3a3f4c 248deg 300deg, #c9ced8 300deg 308deg, #3a3f4c 308deg 360deg)",
                }}
              />
              <div className="absolute inset-[34%] rounded-full bg-[#d7dbe3] shadow-[0_0_0_2px_#6b7280]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const chrome = "linear-gradient(180deg, #e8ebf0 0%, #9aa1ad 38%, #4a505c 62%, #c3c8d1 100%)";
const trailerSide =
  "linear-gradient(180deg, #2a2e3b 0%, #1c1f29 55%, #12141b 100%)";
const cabSide = "linear-gradient(160deg, #f5a623 0%, #e85d04 70%, #9a3d02 100%)";

export function CssTruck({ className, style, interactive = true }: { className?: string; style?: CSSProperties; interactive?: boolean }) {
  const ref = useMouseParallax<HTMLDivElement>(interactive ? 1 : 0);

  // Truck dimensions (px, pre-scale). Length along X, height Y (down is +), depth Z.
  const D = 120; // width of the rig
  const trailer = { w: 470, h: 150, x: -120, y: -95 };
  const cab = { w: 128, h: 150, x: 205, y: -95 };
  const hood = { w: 70, h: 78, x: 302, y: -59 };

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none relative [perspective:1400px]", className)}
      style={{ "--mx": 0, "--my": 0, ...style } as CSSProperties}
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
        style={{
          transform:
            "translate3d(var(--tx, 0px), var(--ty, 0px), 0) scale(var(--truck-scale, 1)) rotateX(calc(-14deg + var(--my) * 5deg)) rotateY(calc(-32deg + var(--mx) * 12deg + var(--ry, 0deg)))",
          transition: "transform 0.1s linear",
        }}
      >
        {/* Road plane with moving lane lines */}
        <div
          className="absolute [transform-style:preserve-3d]"
          style={{ transform: "translate3d(0, 30px, 0) rotateX(90deg)" }}
        >
          {/* Cross-tie layer held static (background-position for it was constant "0 0" before too) */}
          <div
            className="absolute left-[-900px] top-[-450px] h-[900px] w-[1800px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
            style={{ background: "repeating-linear-gradient(0deg, rgba(245,166,35,0.18) 0 1px, transparent 1px 90px)" }}
          />
          {/* Lane-line layer: same -90px/cycle shift as the old background-position keyframe,
              done as a `transform` (composited) instead — the box is far larger than the masked
              viewing area, so translating the whole element by one tile period is indistinguishable
              from shifting its background. */}
          <div
            className="absolute left-[-900px] top-[-450px] h-[900px] w-[1800px] [animation:road-move-fx_1.2s_linear_infinite] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
            style={{ background: "repeating-linear-gradient(90deg, rgba(245,166,35,0.55) 0 2px, transparent 2px 90px)" }}
          />
          {/* contact shadow */}
          <div className="absolute left-[-300px] top-[-90px] h-[180px] w-[640px] rounded-[50%] bg-black/70 blur-2xl" />
        </div>

        {/* Trailer */}
        <Box
          w={trailer.w}
          h={trailer.h}
          d={D}
          x={trailer.x}
          y={trailer.y}
          faces={{
            front: trailerSide,
            back: trailerSide,
            top: "linear-gradient(90deg, #3a3f4e, #2b2f3b)",
            left: "linear-gradient(180deg, #232733, #15171e)",
            right: "linear-gradient(180deg, #1c1f29, #101117)",
            bottom: "#08090c",
          }}
        >
          {{
            front: (
              <div className="absolute inset-0">
                <div className="absolute inset-x-4 top-3 h-px bg-white/20" />
                <div className="absolute bottom-3 left-4 right-4 h-[3px] bg-[repeating-linear-gradient(90deg,#f5a623_0_18px,#fff_18px_36px)] opacity-80" />
                <div className="absolute left-8 top-1/2 -translate-y-1/2 font-display text-[44px] font-bold uppercase leading-none tracking-wide text-white/90">
                  APEX<span className="text-gradient">.</span>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right text-[10px] uppercase tracking-[0.3em] text-amber/80">
                  Built to haul
                </div>
              </div>
            ),
            back: (
              <div className="absolute inset-0">
                <div className="absolute bottom-3 left-4 right-4 h-[3px] bg-[repeating-linear-gradient(90deg,#f5a623_0_18px,#fff_18px_36px)] opacity-60" />
              </div>
            ),
            left: (
              <div className="absolute inset-0 grid grid-cols-2 gap-1 p-2">
                <div className="rounded-sm border border-white/10" />
                <div className="rounded-sm border border-white/10" />
                <div className="absolute bottom-2 left-2 h-2 w-3 rounded-sm bg-red-500 shadow-[0_0_14px_4px_rgba(239,68,68,0.7)]" />
                <div className="absolute bottom-2 right-2 h-2 w-3 rounded-sm bg-red-500 shadow-[0_0_14px_4px_rgba(239,68,68,0.7)]" />
              </div>
            ),
          }}
        </Box>

        {/* Chassis rail */}
        <Box
          w={560}
          h={14}
          d={D - 30}
          x={40}
          y={-12}
          faces={{ front: "#15171d", back: "#15171d", top: "#1d2028", bottom: "#050507", right: "#15171d", left: "#15171d" }}
        />

        {/* Cab */}
        <Box
          w={cab.w}
          h={cab.h}
          d={D}
          x={cab.x}
          y={cab.y}
          faces={{
            front: cabSide,
            back: cabSide,
            top: "linear-gradient(90deg, #f7b547, #f08a1c)",
            left: "#161820",
            right: "linear-gradient(180deg, #c24c03, #7a2f01)",
          }}
        >
          {{
            front: (
              <div className="absolute inset-0">
                <div className="absolute right-3 top-4 h-[46px] w-[58px] rounded-[4px_14px_4px_4px] bg-[linear-gradient(135deg,#9fc3ff55,#0c1220_60%)] ring-1 ring-black/40" />
                <div className="absolute left-3 top-5 h-[80px] w-[42px] rounded-sm ring-1 ring-black/25" />
                <div className="absolute bottom-6 left-0 right-0 h-[6px]" style={{ background: chrome }} />
              </div>
            ),
            back: (
              <div className="absolute inset-0">
                <div className="absolute left-3 top-4 h-[46px] w-[58px] rounded-[14px_4px_4px_4px] bg-[linear-gradient(225deg,#9fc3ff55,#0c1220_60%)] ring-1 ring-black/40" />
                <div className="absolute bottom-6 left-0 right-0 h-[6px]" style={{ background: chrome }} />
              </div>
            ),
            right: (
              <div className="absolute inset-0">
                <div className="absolute inset-x-3 top-4 h-[46px] rounded-md bg-[linear-gradient(180deg,#a8c7ff66,#0b1120_70%)] ring-1 ring-black/40" />
              </div>
            ),
          }}
        </Box>

        {/* Hood + grille + headlights */}
        <Box
          w={hood.w}
          h={hood.h}
          d={D - 6}
          x={hood.x}
          y={hood.y}
          faces={{
            front: cabSide,
            back: cabSide,
            top: "linear-gradient(90deg, #f29a2e, #e0730d)",
            right: chrome,
          }}
        >
          {{
            right: (
              <div className="absolute inset-0">
                <div className="absolute inset-x-5 top-2 bottom-4 bg-[repeating-linear-gradient(0deg,#2c313b_0_3px,#a4abb7_3px_6px)] rounded-sm" />
                <div className="absolute left-1 top-3 h-4 w-4 rounded-full bg-amber-100 shadow-[0_0_30px_14px_rgba(245,166,35,0.85)]" />
                <div className="absolute right-1 top-3 h-4 w-4 rounded-full bg-amber-100 shadow-[0_0_30px_14px_rgba(245,166,35,0.85)]" />
              </div>
            ),
          }}
        </Box>

        {/* Headlight beams (volumetric planes) */}
        {[-40, 40].map((z) => (
          <div
            key={z}
            className="absolute left-0 top-0 h-[70px] w-[420px] origin-left [mask-image:linear-gradient(90deg,#000,transparent)]"
            style={{
              transform: `translate3d(338px, -80px, ${z}px) rotateX(90deg)`,
              background: "radial-gradient(ellipse at left, rgba(245,166,35,0.45), transparent 70%)",
            }}
          />
        ))}

        {/* Chrome stacks */}
        <Box w={10} h={90} d={10} x={196} y={-190} faces={{ front: chrome, back: chrome, left: chrome, right: chrome, top: "#999" }} />

        {/* Wheels — both sides */}
        {[-300, -250, 120, 170, 310].map((wx) =>
          ([1, -1] as const).map((side) => (
            <Wheel key={`${wx}${side}`} x={wx} y={-6} z={side * (D / 2 - 4)} outward={side} r={wx === 310 ? 29 : 31} />
          )),
        )}
      </div>

      <style>{`@keyframes road-move-fx { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-90px, 0, 0); } }`}</style>
    </div>
  );
}
