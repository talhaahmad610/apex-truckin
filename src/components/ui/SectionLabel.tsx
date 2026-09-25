import { cn } from "@/lib/utils";

export function SectionLabel({ n, label, className }: { n?: string; label: string; className?: string }) {
  return (
    <p
      data-reveal="left"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-amber/[0.04] px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.24em] text-amber",
        className,
      )}
    >
      {n && <span className="text-ink/90">{n}</span>}
      {n && <span aria-hidden className="h-px w-4 bg-amber/50" />}
      <span>{label}</span>
    </p>
  );
}

export function SectionHeading({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag
      data-reveal="up"
      className={cn(
        "font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92] tracking-[-0.005em] text-balance",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
