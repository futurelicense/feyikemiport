import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/** True when shared Supabase counters are configured; otherwise counters are browser-local. */
export const isLive = Boolean(url && key);

// New sb_publishable_ keys are opaque, not JWTs — sending them as Bearer auth can 401.
function supabaseFetch(apiKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if (!apiKey.startsWith("eyJ") && headers.get("Authorization") === `Bearer ${apiKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", apiKey);
    return fetch(input, { ...init, headers });
  };
}

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (!url || !key) throw new Error("Supabase is not configured");
  client ??= createClient(url, key, {
    global: { fetch: supabaseFetch(key) },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
