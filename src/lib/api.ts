import "server-only";
import type { Testimonial } from "@/types";
import { createServerSupabase } from "./supabase";
import { SEED_TESTIMONIALS } from "./seed-data";

// Blog posts now come from the CMS (src/lib/cms.ts). Testimonials move there in the next phase.

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = createServerSupabase();
  if (sb) {
    const { data, error } = await sb
      .from("testimonials")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (!error && data) return data as Testimonial[];
    console.error("[api] getTestimonials failed, using seed data:", error?.message);
  }
  return SEED_TESTIMONIALS;
}
