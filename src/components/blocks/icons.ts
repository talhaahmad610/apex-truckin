import { ClipboardCheck, Clock3, DollarSign, FileCheck, Handshake, MapPinned, Network, PhoneCall, Route, Search, ShieldCheck, Truck } from "lucide-react";
import type { IconKey } from "@/payload/blocks/iconOptions";

/** Keys must exactly match src/payload/blocks/iconOptions.ts. */
export const ICONS: Record<IconKey, typeof PhoneCall> = {
  "phone-call": PhoneCall,
  search: Search,
  handshake: Handshake,
  truck: Truck,
  "file-check": FileCheck,
  "map-pinned": MapPinned,
  "dollar-sign": DollarSign,
  "clipboard-check": ClipboardCheck,
  "clock-3": Clock3,
  route: Route,
  network: Network,
  "shield-check": ShieldCheck,
};
