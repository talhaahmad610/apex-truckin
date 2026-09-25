/**
 * Route transition: opacity-only fade between pages. Pure CSS so the first paint never
 * waits on hydration (keeps LCP fast); re-runs on every navigation because templates
 * remount per route.
 *
 * Deliberately opacity-only, no transform: a `transform`-animating ancestor stays a
 * containing block for `position: fixed` descendants for as long as the animation
 * exists — including the held end state with `fill-mode: both`. Since this wrapper
 * sits above every page's content, a transform here would silently break any
 * `position: fixed` (including GSAP ScrollTrigger `pin: true`) anywhere on the page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.6s_cubic-bezier(0.32,0.72,0,1)_both]">{children}</div>;
}
