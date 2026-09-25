import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode | false;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const base =
  "group relative inline-flex select-none items-center justify-center gap-3 rounded-full font-semibold uppercase tracking-[0.08em] transition-[transform,background-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "shimmer-border bg-grad text-[#0a0a0f] shadow-[0_10px_40px_-10px_rgba(245,166,35,0.55)] hover:shadow-[0_18px_60px_-12px_rgba(245,166,35,0.75)]",
  ghost: "bg-white/[0.04] text-ink ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-amber/40",
  outline: "text-ink ring-1 ring-amber/40 hover:bg-amber/10",
};

const sizes: Record<Size, string> = {
  md: "h-12 pl-6 pr-1.5 text-[12px]",
  lg: "h-14 pl-7 pr-2 text-[13px]",
};

function Inner({ children, icon, variant, size }: { children: ReactNode; icon: ReactNode | false; variant: Variant; size: Size }) {
  return (
    <>
      <span className={cn(icon === false && (size === "lg" ? "pr-5" : "pr-4.5"))}>{children}</span>
      {icon !== false && (
        <span
          aria-hidden
          className={cn(
            "flex items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            size === "lg" ? "h-10 w-10" : "h-9 w-9",
            variant === "primary" ? "bg-[#0a0a0f]/15" : "bg-white/10",
          )}
        >
          {icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />}
        </span>
      )}
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", icon, className, children, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);
  if (typeof props.href === "string") {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof BaseProps>;
    return (
      <Link href={href} className={cls} {...linkRest}>
        <Inner icon={icon ?? undefined} variant={variant} size={size}>{children}</Inner>
      </Link>
    );
  }
  const btnRest = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button type={btnRest.type ?? "button"} className={cls} {...btnRest}>
      <Inner icon={icon ?? undefined} variant={variant} size={size}>{children}</Inner>
    </button>
  );
}
