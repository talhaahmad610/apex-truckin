"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface FlightLeg {
  desktop: string;
  mobile: string;
  poster: string;
  posterMobile: string;
  duration: number;
}

interface FlightScrubProps {
  legs: FlightLeg[];
  beats: { id: string; label: string; content: ReactNode }[];
  /** Rendered behind the beats when no footage is available (or behind posters while loading). */
  fallback?: ReactNode;
  /** Scroll distance per beat, in viewport heights. */
  vhPerBeat?: number;
  className?: string;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const SEAM = 0.14; // fraction of a leg spent crossfading into the next

/**
 * Scroll-scrubbed "camera flight". Scroll position drives `currentTime` on a chain of
 * pre-rendered clips (loaded as Blobs so seeking is instant), crossfading at seams,
 * while copy "beats" pin and advance over a sticky stage. No WebGL.
 */
export function FlightScrub({ legs, beats, fallback, vhPerBeat = 110, className }: FlightScrubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lastSeekAtRefs = useRef<number[]>([]);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [ready, setReady] = useState<boolean[]>(() => legs.map(() => false));
  const [mode, setMode] = useState<"video" | "poster">("video");

  // Decide playback mode + load clips as blobs, sequentially (leg 1 first = fastest first paint).
  // Legs 2+ don't start fetching until leg 1 has actually decoded a frame (or a short timeout
  // elapses), so the first leg never has to share bandwidth with the rest of the chain during
  // the critical initial-paint window.
  useEffect(() => {
    if (!legs.length) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion() || conn?.saveData) {
      setMode("poster");
      return;
    }
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const ctrl = new AbortController();
    const urls: string[] = [];

    (async () => {
      for (let i = 0; i < legs.length; i++) {
        if (ctrl.signal.aborted) return;
        const leg = legs[i]!;
        try {
          const res = await fetch(mobile ? leg.mobile : leg.desktop, { signal: ctrl.signal });
          if (!res.ok) throw new Error(String(res.status));
          const url = URL.createObjectURL(await res.blob());
          urls.push(url);
          const v = videoRefs.current[i];
          if (!v) continue;
          const loaded = new Promise<void>((resolve) => {
            v.addEventListener(
              "loadeddata",
              () => {
                setReady((r) => r.map((x, j) => (j === i ? true : x)));
                resolve();
              },
              { once: true },
            );
          });
          v.src = url;
          v.load();
          if (i === 0) {
            // Give the hero leg a head start before the rest of the chain competes for bandwidth.
            await Promise.race([loaded, new Promise((resolve) => window.setTimeout(resolve, 2500))]);
          }
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
          console.warn("[FlightScrub] leg failed to load, keeping poster", i, err);
        }
      }
    })();

    return () => {
      ctrl.abort();
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [legs]);

  // Scroll → progress → video time, layer crossfades, beat overlays.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let target = 0;
    let current = 0;
    let raf = 0;
    let active = false;
    const nLegs = legs.length;
    const nBeats = beats.length;

    const render = (p: number) => {
      // Legs
      if (nLegs) {
        const seg = Math.min(p * nLegs, nLegs - 1e-4);
        const idx = Math.floor(seg);
        const local = seg - idx;
        for (let i = 0; i < nLegs; i++) {
          const layer = layerRefs.current[i];
          if (!layer) continue;
          let o = 0;
          if (i < idx) o = 1; // stacked below; keeps a painted base under the active leg
          if (i === idx) o = 1;
          if (i === idx + 1) o = smooth((local - (1 - SEAM)) / SEAM);
          if (i === 0) o = 1;
          layer.style.opacity = String(o);
          layer.style.visibility = o > 0 && i >= idx - 1 ? "visible" : "hidden";
          const v = videoRefs.current[i];
          if (!v || mode !== "video" || v.readyState < 2) continue;
          const dur = v.duration || legs[i]!.duration;
          let t = -1;
          if (i === idx) t = local * dur;
          else if (i === idx + 1 && o > 0) t = (local - (1 - SEAM)) * 0.25 * dur;
          else if (i < idx) t = dur - 0.05;
          // Throttled by elapsed time, not just by distance: mobile hardware video
          // decoders can't service seeks anywhere near as fast as desktop can. Firing
          // a `currentTime` write on nearly every animation frame (the old distance-only
          // guard was 1/90s-precision, i.e. ~continuous) outruns a phone's decoder during
          // a fast scroll — each new seek interrupts the last before it resolves, so the
          // video paints black for the whole gesture instead of freezing on a frame.
          // Capping actual seeks to ~14/s keeps the decoder able to keep up.
          const now = performance.now();
          const lastSeekAt = lastSeekAtRefs.current[i] ?? 0;
          if (t >= 0 && !v.seeking && Math.abs(v.currentTime - t) > 1 / 90 && now - lastSeekAt >= 70) {
            v.currentTime = Math.min(t, dur - 0.05);
            lastSeekAtRefs.current[i] = now;
          }
        }
      }
      // Beats
      for (let j = 0; j < nBeats; j++) {
        const el = beatRefs.current[j];
        if (!el) continue;
        const local = p * nBeats - j;
        const fadeIn = j === 0 ? 1 : smooth((local + 0.05) / 0.25);
        const fadeOut = j === nBeats - 1 ? 1 : 1 - smooth((local - 0.7) / 0.22);
        const o = Math.min(fadeIn, fadeOut);
        const y = (1 - fadeIn) * 60 - (1 - fadeOut) * 60;
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${(0.97 + o * 0.03).toFixed(4)})`;
        el.style.visibility = o < 0.02 ? "hidden" : "visible";
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
        const dot = dotRefs.current[j];
        if (dot) dot.dataset.active = String(Math.floor(Math.min(p * nBeats, nBeats - 1e-4)) === j);
      }
      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
      section.style.setProperty("--flight-p", p.toFixed(4));
    };

    const loop = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) current = target;
      render(current);
      raf = active && current !== target ? requestAnimationFrame(loop) : 0;
    };

    // Progress is computed directly from scroll position on every scroll event, rather than
    // via ScrollTrigger's start/end abstraction. The section is a plain CSS `position: sticky`
    // stage (not GSAP `pin: true`), which naturally starts unsticking once scroll reaches
    // (sectionHeight - viewportHeight) — well before the section's true end. Mapping progress
    // across the full section height left the final ~1 viewport of scroll "dead": the stage
    // would slide off-screen mid-animation, painting nothing (the section's own empty box)
    // until the true bottom — a black gap.
    //
    // Deliberately NOT `-section.getBoundingClientRect().top`: for a sticky element that's
    // rect.top stays clamped at its stuck offset (0) for the entire stuck phase — it only
    // starts changing during the brief unstick tail — so it doesn't track scroll position
    // linearly the way it would for a normally-flowing element. `window.scrollY` against the
    // section's own layout position does, and needs nothing rendering-mode-specific to read
    // correctly. document.documentElement.clientHeight (not window.innerHeight): some mobile
    // browser/emulation contexts report a "layout viewport" innerHeight larger than the
    // actual visual viewport CSS `dvh`/`sticky` render against; clientHeight matches it.
    const computeProgress = () => {
      const vh = document.documentElement.clientHeight;
      const total = section.offsetHeight - vh;
      if (total <= 0) return 1;
      return Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / total));
    };
    const onScroll = () => {
      target = computeProgress();
      active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(section);
    target = current = computeProgress();
    render(current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [legs, beats.length, mode, ready]);

  return (
    <section
      ref={sectionRef}
      aria-label="Apex Truckin — the journey"
      className={cn("relative", className)}
      style={{ height: `${beats.length * vhPerBeat}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Stage */}
        <div className="absolute inset-0">
          {fallback && <div className="absolute inset-0">{fallback}</div>}
          {legs.map((leg, i) => (
            <div
              key={leg.desktop}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-[opacity]"
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={leg.posterMobile} />
                <img
                  src={leg.poster}
                  alt=""
                  aria-hidden
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
              {mode === "video" && (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  muted
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  aria-hidden
                  tabIndex={-1}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                    ready[i] ? "opacity-100" : "opacity-0",
                  )}
                />
              )}
            </div>
          ))}
          {/* Cinematic grade + legibility scrims */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,15,0.75)_100%)]" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/80 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/10 to-transparent" />
        </div>

        {/* Beats */}
        <div className="relative z-10 h-full">
          {beats.map((b, j) => (
            <div
              key={b.id}
              ref={(el) => {
                beatRefs.current[j] = el;
              }}
              className="absolute inset-0 flex will-change-transform"
              style={{ opacity: j === 0 ? 1 : 0, visibility: j === 0 ? "visible" : "hidden" }}
            >
              {b.content}
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div aria-hidden className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-4 md:flex">
          <div className="flex flex-col gap-5">
            {beats.map((b, j) => (
              <span
                key={b.id}
                ref={(el) => {
                  dotRefs.current[j] = el;
                }}
                data-active={j === 0}
                className="group/dot flex items-center justify-end gap-3 text-[10px] uppercase tracking-[0.24em] text-white/35 transition-colors duration-500 data-[active=true]:text-amber"
              >
                <span className="opacity-0 transition-opacity duration-500 group-data-[active=true]/dot:opacity-100">{b.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
            ))}
          </div>
          <div className="relative h-40 w-px overflow-hidden bg-white/10">
            <div ref={barRef} className="absolute inset-0 origin-top bg-grad" style={{ transform: "scaleY(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
