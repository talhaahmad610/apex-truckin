import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isRealValue(v: string | undefined): v is string {
  return Boolean(v) && !v!.startsWith("your_");
}

export const isSupabaseConfigured = isRealValue(url) && isRealValue(anonKey);
export const isSupabaseAdminConfigured = isSupabaseConfigured && isRealValue(serviceKey);

/** Browser client (anon key, RLS enforced). */
export function createBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(url!, anonKey!);
}

/** Server client using the anon key — public reads & RLS-permitted inserts. */
export function createServerSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(url!, anonKey!, { auth: { persistSession: false } });
}

/** Server-only admin client (service role) — bypasses RLS. Used by the CMS write API. */
export function createAdminSupabase(): SupabaseClient | null {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(url!, serviceKey!, { auth: { persistSession: false } });
}
