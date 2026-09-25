import type { gsap } from "./gsap";

export type RevealKind = "up" | "left" | "fade" | "scale";

export const REVEAL_FROM: Record<RevealKind, gsap.TweenVars> = {
  up: { y: 56, opacity: 0, filter: "blur(8px)" },
  left: { x: -40, opacity: 0 },
  fade: { opacity: 0 },
  scale: { scale: 0.94, opacity: 0, y: 24 },
};

export const REVEAL_TO: Record<RevealKind, gsap.TweenVars> = {
  up: { y: 0, opacity: 1, filter: "blur(0px)" },
  left: { x: 0, opacity: 1 },
  fade: { opacity: 1 },
  scale: { scale: 1, opacity: 1, y: 0 },
};
