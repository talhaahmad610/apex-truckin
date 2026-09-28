/**
 * Icon choices offered on "steps" and hero "chips" fields. Plain data only (no React) — Payload
 * config runs in the Node config-loading context, not the browser. The matching React components
 * live in src/components/blocks/icons.ts and must have exactly the same keys as this list.
 */
export const ICON_OPTIONS = [
  { label: "Phone", value: "phone-call" },
  { label: "Search", value: "search" },
  { label: "Handshake", value: "handshake" },
  { label: "Truck", value: "truck" },
  { label: "Document check", value: "file-check" },
  { label: "Map pin", value: "map-pinned" },
  { label: "Dollar sign", value: "dollar-sign" },
  { label: "Clipboard check", value: "clipboard-check" },
  { label: "Clock", value: "clock-3" },
  { label: "Route", value: "route" },
  { label: "Network", value: "network" },
  { label: "Shield check", value: "shield-check" },
] as const;

export type IconKey = (typeof ICON_OPTIONS)[number]["value"];
