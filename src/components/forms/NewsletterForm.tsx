"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/schemas";

export function NewsletterForm({ label }: { label: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterFormValues) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source_path: window.location.pathname }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Subscription failed");
      toast.success("You're on the list", { description: data.message ?? "Weekly lane intel, straight to your inbox." });
      reset();
    } catch (err) {
      toast.error("Couldn't subscribe", { description: (err as Error).message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="mb-3 block text-[11px] font-medium uppercase tracking-[0.22em] text-amber">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 focus-within:border-amber/50">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@yourcompany.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:outline-none"
          suppressHydrationWarning
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Subscribe to newsletter"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-grad text-bg transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className="mt-2 pl-4 text-xs text-red-400">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
