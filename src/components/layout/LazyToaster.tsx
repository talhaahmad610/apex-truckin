"use client";

import dynamic from "next/dynamic";

// Renders nothing until the first toast fires — no reason to pull sonner into the initial
// bundle. `ssr: false` requires a Client Component boundary, hence this tiny wrapper.
export const LazyToaster = dynamic(() => import("sonner").then((m) => m.Toaster), { ssr: false });
