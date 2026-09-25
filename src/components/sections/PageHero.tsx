import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DepthLayers } from "@/components/3d/DepthLayers";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumbs,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  const rise = "animate-[page-in_1s_cubic-bezier(0.32,0.72,0,1)_both]";
  return (
    <section className={cn("relative isolate flex min-h-[78dvh] items-end overflow-hidden pb-20 pt-40 md:pb-28", className)}>
      <JsonLd data={breadcrumbLd(crumbs)} />
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,15,0.95)_10%,rgba(10,10,15,0.6)_60%,rgba(10,10,15,0.4)_100%)]" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-bg to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,#1a1f35_0%,#0a0a0f_60%)]">
          <DepthLayers />
        </div>
      )}
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
        <nav aria-label="Breadcrumb" className={cn(rise, "mb-8")}>
          <ol className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/50">
            <li>
              <Link href="/" className="hover:text-amber">Home</Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-amber">{c.name}</span>
                ) : (
                  <Link href={c.path} className="hover:text-amber">{c.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className={cn(rise, "mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-amber")} style={{ animationDelay: "0.08s" }}>
          {eyebrow}
        </p>
        <h1
          className={cn(rise, "max-w-5xl font-display text-[clamp(3rem,8.5vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.005em] text-balance")}
          style={{ animationDelay: "0.16s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className={cn(rise, "mt-7 max-w-2xl text-lg leading-relaxed text-white/75")} style={{ animationDelay: "0.26s" }}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className={cn(rise, "mt-10")} style={{ animationDelay: "0.36s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
