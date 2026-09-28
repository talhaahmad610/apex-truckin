"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[15px] text-white placeholder:text-white/30 transition-colors duration-300 focus:border-amber/60 focus:bg-white/[0.05] focus:outline-none aria-[invalid=true]:border-red-400/70";

function Field({
  id,
  label,
  error,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
        {label}
        {optional && <span className="normal-case tracking-normal text-white/35">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ className, equipmentTypes }: { className?: string; equipmentTypes: string[] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { full_name: "", email: "", phone: "", equipment_type: "", message: "", company_website: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source_path: window.location.pathname }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      toast.success("Message received", { description: "A dispatcher will reach out within 1 business hour." });
      reset();
    } catch (err) {
      toast.error("Couldn't send your message", { description: `${(err as Error).message}. Call us any time instead.` });
    }
  };

  const aria = (name: keyof ContactFormValues) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `cf-${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("grid gap-5 sm:grid-cols-2", className)} aria-label="Contact Apex Truckin">
      <Field id="cf-full_name" label="Full name" error={errors.full_name?.message}>
        <input
          id="cf-full_name"
          autoComplete="name"
          placeholder="Marcus Johnson"
          className={field}
          suppressHydrationWarning
          {...aria("full_name")}
          {...register("full_name")}
        />
      </Field>
      <Field id="cf-email" label="Email" error={errors.email?.message}>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
          suppressHydrationWarning
          {...aria("email")}
          {...register("email")}
        />
      </Field>
      <Field id="cf-phone" label="Phone" optional error={errors.phone?.message}>
        <input
          id="cf-phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 555-0123"
          className={field}
          suppressHydrationWarning
          {...aria("phone")}
          {...register("phone")}
        />
      </Field>
      <Field id="cf-equipment_type" label="Equipment type" optional error={errors.equipment_type?.message}>
        <div className="relative">
          <select id="cf-equipment_type" className={cn(field, "appearance-none pr-12")} {...aria("equipment_type")} {...register("equipment_type")}>
            <option value="" className="bg-[#13151f]">Select equipment…</option>
            {equipmentTypes.map((e) => (
              <option key={e} value={e} className="bg-[#13151f]">
                {e}
              </option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-amber" strokeWidth="1.5">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </Field>
      <Field id="cf-message" label="Message" optional error={errors.message?.message} className="sm:col-span-2">
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Tell us about your truck, lanes and home-time goals…"
          className={cn(field, "resize-y")}
          suppressHydrationWarning
          {...aria("message")}
          {...register("message")}
        />
      </Field>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-company_website">Company website</label>
        <input id="cf-company_website" tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/45">
          By submitting you agree to our <Link href="/privacy" className="underline hover:text-amber">privacy policy</Link>. No spam, ever.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} icon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}>
          {isSubmitting ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
