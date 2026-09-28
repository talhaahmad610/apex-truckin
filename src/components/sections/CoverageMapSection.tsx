"use client";

import { useRef } from "react";
import type { SiteInfo } from "@/types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CITIES, ROUTES, SIDE_ROUTES, USA_PATH, USA_VIEWBOX, cityXY, routePath, type CityKey } from "@/lib/usa-map";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { GradientHeading } from "@/components/blocks/GradientHeading";
import { fillTokens } from "@/lib/tokens";
import { joinAnd } from "@/lib/utils";

// One `d` string per candidate route, computed once. Index 0 renders on the server (and again on
// the client's first paint, so hydration matches); a random index is then swapped in imperatively.
const routeDs = ROUTES.map((r) => routePath(r));
const sideDs = SIDE_ROUTES.map((r) => routePath(r, 0.08));
const cityKeys = Object.keys(CITIES) as CityKey[];

export function CoverageMapSection({
  n = "—",
  label = "Local broker network",
  heading = "Local brokers.",
  highlight = "Direct shippers.",
  intro,
  regions,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  intro?: string | null;
  regions: { name: string; states: string[] }[];
  site: SiteInfo;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const main = el.querySelector<SVGPathElement>("[data-main]");
      const truck = el.querySelector<SVGGElement>("[data-truck]");
      const tilt = el.querySelector<HTMLElement>("[data-tilt]");
      if (!main || !truck || !tilt) return;

      // Pick a random lane for this page load and swap it in before measuring the path — a direct
      // DOM write (like the truck-position updates below), not React state, so there's no reflow
      // from a second render and no hydration mismatch with the server-rendered default (index 0).
      const routeIdx = Math.floor(Math.random() * ROUTES.length);
      if (routeIdx !== 0) {
        const chosen = ROUTES[routeIdx]!;
        main.setAttribute("d", routeDs[routeIdx]!);
        el.querySelectorAll<SVGGElement>("[data-city]").forEach((g) => {
          const isMain = chosen.includes(g.dataset.city as CityKey);
          const circles = g.querySelectorAll<SVGCircleElement>("circle");
          circles[0]?.setAttribute("r", isMain ? "11" : "7");
          circles[1]?.setAttribute("r", isMain ? "4" : "3");
          circles[1]?.setAttribute("fill", isMain ? "#f5a623" : "#a0aec0");
        });
      }

      const len = main.getTotalLength();
      let lastP = -1;
      const placeTruck = (p: number, force = false) => {
        // Scrub fires onUpdate on every scroll tick; skip the two getPointAtLength lookups (and
        // the attribute write) when progress hasn't moved enough to change the rendered position.
        if (!force && Math.abs(p - lastP) < 0.0008) return;
        lastP = p;
        const at = Math.max(0.001, Math.min(len - 0.001, p * len));
        const pt = main.getPointAtLength(at);
        const ahead = main.getPointAtLength(Math.min(len, at + 2));
        const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
        truck.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle})`);
      };

      if (prefersReducedMotion()) {
        main.style.strokeDashoffset = "0";
        placeTruck(1);
        return;
      }

      main.style.strokeDasharray = `${len}`;
      main.style.strokeDashoffset = `${len}`;
      const state = { p: 0 };
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 45%", scrub: 0.8 },
      });
      tl.fromTo(tilt, { rotateX: 42, scale: 0.9 }, { rotateX: 16, scale: 1, ease: "none", duration: 1 }, 0).to(
        state,
        {
          p: 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            main.style.strokeDashoffset = `${len * (1 - state.p)}`;
            placeTruck(state.p);
          },
        },
        0,
      );
      placeTruck(0);
      gsap.from(el.querySelectorAll("[data-city]"), {
        scale: 0,
        transformOrigin: "center",
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <RevealWrapper as="section" id="coverage" className="relative overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-4">
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase leading-[0.88]"
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {intro && (
            <p data-reveal="up" className="mx-auto mt-5 max-w-xl text-muted">
              {fillTokens(intro, site)}
            </p>
          )}
        </div>

        <div ref={root} className="[perspective:1600px]">
          <div data-tilt className="relative mx-auto max-w-[1080px] origin-center [transform-style:preserve-3d]" style={{ transform: "rotateX(20deg)" }}>
            <div className="relative">
              {/* Static land mass (shadow blur + fill + dot texture) never changes after paint —
                  split into its own SVG so the truck/route updates below don't force the browser
                  to repaint this much larger, filter-heavy layer on every scroll tick. */}
              <svg viewBox={USA_VIEWBOX} className="h-auto w-full overflow-visible" aria-hidden>
                <defs>
                  <pattern id="map-dots" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="6" cy="6" r="1.1" fill="rgba(245,166,35,0.28)" />
                  </pattern>
                </defs>
                <path d={USA_PATH} fill="rgba(0,0,0,0.6)" transform="translate(0 18)" style={{ filter: "blur(10px)" }} />
                <path d={USA_PATH} fill="#10121b" stroke="rgba(245,166,35,0.35)" strokeWidth="1.2" />
                <path d={USA_PATH} fill="url(#map-dots)" />
              </svg>
              <svg
                viewBox={USA_VIEWBOX}
                className="absolute inset-0 h-full w-full overflow-visible"
                role="img"
                aria-labelledby="map-title map-desc"
              >
                <title id="map-title">{`${site.name} broker network map`}</title>
                <desc id="map-desc">{`A map of the contiguous United States showing an example dispatch lane connecting the ${joinAnd(regions.map((r) => r.name))} broker networks.`}</desc>
                <defs>
                  <linearGradient id="route-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#f5a623" />
                    <stop offset="1" stopColor="#e85d04" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {sideDs.map((d) => (
                  <path key={d} d={d} fill="none" stroke="rgba(245,166,35,0.22)" strokeWidth="1.2" strokeDasharray="4 6" />
                ))}
                <path d={routeDs[0]} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
                <path data-main d={routeDs[0]} fill="none" stroke="url(#route-grad)" strokeWidth="3.2" strokeLinecap="round" filter="url(#glow)" />
                {cityKeys.map((k) => {
                  const [x, y] = cityXY(k);
                  const main = ROUTES[0]!.includes(k);
                  return (
                    <g key={k} data-city={k}>
                      <circle cx={x} cy={y} r={main ? 11 : 7} fill="rgba(245,166,35,0.12)" />
                      <circle cx={x} cy={y} r={main ? 4 : 3} fill={main ? "#f5a623" : "#a0aec0"} />
                      <text x={x + 10} y={y - 10} fill="rgba(255,255,255,0.72)" fontSize="13" fontWeight="500" style={{ letterSpacing: "0.06em" }}>
                        {CITIES[k].name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
                <g data-truck>
                  <circle r="16" fill="rgba(245,166,35,0.25)" filter="url(#glow)" />
                  <g transform="translate(-11 -7)">
                    <rect x="0" y="1" width="14" height="11" rx="1.5" fill="#f5a623" />
                    <path d="M14 4 h4.5 l3.5 4 v4 h-8z" fill="#e85d04" />
                    <circle cx="4" cy="13" r="2" fill="#0a0a0f" stroke="#f5a623" strokeWidth="1" />
                    <circle cx="17" cy="13" r="2" fill="#0a0a0f" stroke="#f5a623" strokeWidth="1" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <dl data-stagger-group className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:mt-6 md:grid-cols-4">
          {regions.map((r) => (
            <div key={r.name} data-stagger className="flex flex-col-reverse bg-[#0d0e14] p-6 text-center md:p-8">
              <dt className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">{r.states.join(" · ")}</dt>
              <dd className="font-display text-3xl font-bold text-gradient md:text-4xl">{r.name}</dd>
            </div>
          ))}
        </dl>
      </div>
    </RevealWrapper>
  );
}
