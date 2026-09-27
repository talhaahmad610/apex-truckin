import { ChevronDown, Clock3, Network, Route } from "lucide-react";
import { FlightScrub, type FlightLeg } from "@/components/3d/FlightScrub";
import { CssTruck } from "@/components/3d/CssTruck";
import { DepthLayers } from "@/components/3d/DepthLayers";
import { Button } from "@/components/ui/Button";
import { LiveDot } from "@/components/ui/Card";
import { getSiteSettings } from "@/lib/cms";
import manifest from "@/lib/flight-manifest.json";

const legs = manifest.legs as FlightLeg[];

const rise = (i: number) => ({ animationDelay: `${0.15 + i * 0.1}s` });
const riseCls = "animate-[page-in_1s_cubic-bezier(0.32,0.72,0,1)_both]";

function BeatShell({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div
      className={`mx-auto flex h-full w-full max-w-[1320px] flex-col justify-end px-4 pb-24 pt-32 sm:px-8 md:justify-center md:pb-0 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {children}
    </div>
  );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/85">
      <span className="text-amber">{icon}</span>
      {children}
    </span>
  );
}

const buildBeats = (subTagline: string) => [
  {
    id: "hero",
    label: "Apex",
    content: (
      <BeatShell>
        <p className={`${riseCls} mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-black/40 px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.24em] text-white/85`} style={rise(0)}>
          <LiveDot /> Dispatch desk live · 24/7
        </p>
        <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.01em]">
          <span className={`${riseCls} block text-[clamp(4.25rem,15vw,13rem)]`} style={rise(1)}>
            Apex <span className="text-gradient">Truckin</span>
          </span>
          <span className={`${riseCls} mt-3 block text-[clamp(1.6rem,4.2vw,3.5rem)] font-semibold tracking-[0.02em] text-white/90`} style={rise(2)}>
            Built to haul. Built to win.
          </span>
        </h1>
        <p className={`${riseCls} mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg`} style={rise(3)}>
          {subTagline} Higher-paying freight, fewer empty miles, and a dispatcher who picks up at 2 AM.
        </p>
        <div className={`${riseCls} mt-9 flex flex-wrap gap-3`} style={rise(4)}>
          <Button href="/contact" size="lg">Start Dispatching</Button>
          <Button href="/services" size="lg" variant="ghost" icon={false}>
            View Services
          </Button>
        </div>
        <div className={`${riseCls} mt-14 hidden items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-white/50 md:flex`} style={rise(6)}>
          <span className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
            <span className="h-2 w-px animate-bounce bg-amber" />
          </span>
          Scroll to ride along <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.25} />
        </div>
      </BeatShell>
    ),
  },
  {
    id: "always-on",
    label: "24/7",
    content: (
      <BeatShell>
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-amber">While you drive</p>
        <h2 className="max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.88]">
          We&apos;re already booking <span className="text-gradient">your next load.</span>
        </h2>
        <p className="mt-6 max-w-lg text-white/75 md:text-lg">
          Your dispatcher plans loops, not one-offs — the backhaul is lined up before you deliver.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Chip icon={<Clock3 className="h-3.5 w-3.5" strokeWidth={1.5} />}>Avg. booked in &lt; 4 hrs</Chip>
          <Chip icon={<Route className="h-3.5 w-3.5" strokeWidth={1.5} />}>&lt; 10% deadhead</Chip>
        </div>
      </BeatShell>
    ),
  },
  {
    id: "network",
    label: "Network",
    content: (
      <BeatShell>
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-amber">Coast to coast</p>
        <h2 className="max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.88]">
          1,200+ brokers. <span className="text-gradient">One phone call.</span>
        </h2>
        <p className="mt-6 max-w-lg text-white/75 md:text-lg">
          Private broker relationships and every major load board — working your lanes across all 48 states.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Chip icon={<Network className="h-3.5 w-3.5" strokeWidth={1.5} />}>DAT · Truckstop · Private network</Chip>
        </div>
      </BeatShell>
    ),
  },
  {
    id: "win",
    label: "Win",
    content: (
      <BeatShell>
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-amber">Your truck. Your rules.</p>
        <h2 className="max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.88]">
          More miles. <span className="text-gradient">Better money.</span>
        </h2>
        <p className="mt-6 max-w-lg text-white/75 md:text-lg">
          No forced dispatch. No contracts. You approve every load — we do the grinding.
        </p>
        <div className="mt-9">
          <Button href="/contact" size="lg">Get My Free Lane Review</Button>
        </div>
      </BeatShell>
    ),
  },
];

/** Stylized CSS 3D scene used when no pre-rendered footage is installed. */
function FallbackStage() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#1a1f35_0%,#0a0a0f_65%)]">
      <DepthLayers />
      <div
        className="absolute inset-0"
        style={
          {
            "--ry": "calc(var(--flight-p, 0) * 70deg)",
            "--tx": "calc(var(--flight-p, 0) * -18vw)",
          } as React.CSSProperties
        }
      >
        <CssTruck
          className="absolute left-[58%] top-[56%] h-0 w-0 [--truck-scale:0.62] sm:[--truck-scale:0.8] lg:[--truck-scale:1.05] max-md:left-1/2 max-md:top-[34%]"
        />
      </div>
    </div>
  );
}

export async function HeroSection() {
  const site = await getSiteSettings();
  return <FlightScrub legs={legs} beats={buildBeats(site.subTagline)} fallback={legs.length ? undefined : <FallbackStage />} />;
}
