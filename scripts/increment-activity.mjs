#!/usr/bin/env node

/**
 * Adds download and view counts in Supabase, spread at random across tracked items.
 * Default: 2 downloads + 2 views per run (each capped at 10).
 *
 *   node scripts/increment-activity.mjs
 *   DOWNLOADS=3 VIEWS=1 node scripts/increment-activity.mjs
 *
 * Needs SUPABASE_URL and SUPABASE_SECRET_KEY (service role / sb_secret_ key).
 * Keep that key in GitHub Actions secrets or a local .env — never in VITE_* vars.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(resolve(process.cwd(), ".env"));

const count = (name) => {
  const n = Number(process.env[name] ?? 2);
  return Number.isFinite(n) ? Math.min(Math.max(Math.trunc(n), 0), 10) : 2;
};
const DOWNLOADS = count("DOWNLOADS");
const VIEWS = count("VIEWS");

const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(
  /\/+$/,
  "",
);
const supabaseKey = process.env.SUPABASE_SECRET_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing SUPABASE_URL and SUPABASE_SECRET_KEY. Add them as GitHub Actions secrets (Settings → Secrets and variables → Actions).",
  );
  process.exit(1);
}

const headers = { apikey: supabaseKey, "Content-Type": "application/json" };
// New sb_secret_ keys are not JWTs; Bearer auth can 401. Legacy service_role JWTs need it.
if (supabaseKey.startsWith("eyJ")) headers.Authorization = `Bearer ${supabaseKey}`;

const response = await fetch(`${supabaseUrl}/rest/v1/rpc/bump_activity_counts`, {
  method: "POST",
  headers,
  body: JSON.stringify({ p_downloads: DOWNLOADS, p_views: VIEWS }),
});

if (!response.ok) {
  console.error(`Activity increment failed (${response.status}): ${await response.text()}`);
  console.error(
    "If the function is missing, run supabase/bootstrap.sql in the Supabase SQL editor.",
  );
  process.exit(1);
}

const [row] = await response.json();
console.log(`Added ${row?.downloads_added ?? 0} download(s) and ${row?.views_added ?? 0} view(s).`);
