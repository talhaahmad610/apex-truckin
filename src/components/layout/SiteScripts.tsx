import Script from "next/script";
import type { HeadNode } from "@/types";

/**
 * Renders the admin-pasted <head>/body-end scripts parsed by src/lib/head-html.ts. `next/script`
 * with `strategy="afterInteractive"` only preloads during SSR and injects the real tag after
 * hydration, so where this component sits in the tree doesn't matter for scripts; <meta>/<link>
 * are hoisted into <head> by React regardless of where they're rendered. See SiteDocument.tsx for
 * placement (head nodes near the top of <body>, body-end nodes at the very end).
 */
export function SiteScripts({ nodes }: { nodes: HeadNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.kind) {
          case "script":
            return n.src ? (
              <Script key={n.id} id={n.id} src={n.src} strategy="afterInteractive" {...n.attrs} />
            ) : (
              <Script key={n.id} id={n.id} strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: n.inline ?? "" }} {...n.attrs} />
            );
          case "element":
            if (n.tag === "style") return <style key={i} {...n.attrs} dangerouslySetInnerHTML={{ __html: n.text ?? "" }} />;
            if (n.tag === "meta") return <meta key={i} {...n.attrs} />;
            return <link key={i} {...n.attrs} />;
          case "noscript":
            return <noscript key={i} dangerouslySetInnerHTML={{ __html: n.html }} />;
          case "raw":
            return <div key={i} dangerouslySetInnerHTML={{ __html: n.html }} />;
          default:
            return null;
        }
      })}
    </>
  );
}
