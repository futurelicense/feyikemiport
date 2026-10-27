import { downloadIds, pages, viewIds, type DownloadId, type PageId } from "@/lib/site-data";
import { getSupabase, isLive } from "@/lib/supabase";

export type SiteStats = {
  totalVisits: number;
  monthlyVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  downloads: Record<string, number>;
  views: Record<string, number>;
};

export type TrackEvent = { kind: "download"; id: DownloadId } | { kind: "view"; id: string };

export const emptyStats: SiteStats = {
  totalVisits: 0,
  monthlyVisits: 0,
  uniqueVisitors: 0,
  pageViews: 0,
  downloads: {},
  views: {},
};

const VISIT_SESSION_KEY = "fa_portfolio_visit_session";
const VISITOR_KEY = "fa_portfolio_visitor_id";
const LAST_PAGE_KEY = "fa_portfolio_last_page";
const LOCAL_STATS_KEY = "fa_portfolio_demo_stats";

export const sum = (counts: Record<string, number>) =>
  Object.values(counts).reduce((total, n) => total + n, 0);

// Storage can throw (private mode, blocked site data); counting must never break the page.
function storageGet(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

function storageSet(storage: () => Storage, key: string, value: string) {
  try {
    storage().setItem(key, value);
  } catch {
    /* ignore */
  }
}

const session = () => window.sessionStorage;
const local = () => window.localStorage;

/* ── Demo mode: counters kept in this browser only ─────────────────────────── */

function readLocal(): SiteStats {
  const raw = storageGet(local, LOCAL_STATS_KEY);
  if (!raw) return structuredClone(emptyStats);
  try {
    return { ...structuredClone(emptyStats), ...(JSON.parse(raw) as Partial<SiteStats>) };
  } catch {
    return structuredClone(emptyStats);
  }
}

function updateLocal(mutate: (stats: SiteStats) => void) {
  const stats = readLocal();
  mutate(stats);
  storageSet(local, LOCAL_STATS_KEY, JSON.stringify(stats));
}

/* ── Reads ─────────────────────────────────────────────────────────────────── */

export async function fetchSiteStats(): Promise<SiteStats> {
  if (!isLive) return typeof window === "undefined" ? emptyStats : readLocal();

  const supabase = getSupabase();
  const [site, dl, vw] = await Promise.all([
    supabase
      .from("site_stats")
      .select("total_visits, monthly_visits, unique_visitors, page_views")
      .eq("id", "global")
      .maybeSingle(),
    supabase.from("resource_downloads").select("resource_id, download_count"),
    supabase.from("content_views").select("content_id, view_count"),
  ]);
  if (site.error) throw site.error;
  if (dl.error) throw dl.error;
  if (vw.error) throw vw.error;

  return {
    totalVisits: Number(site.data?.total_visits ?? 0),
    monthlyVisits: Number(site.data?.monthly_visits ?? 0),
    uniqueVisitors: Number(site.data?.unique_visitors ?? 0),
    pageViews: Number(site.data?.page_views ?? 0),
    downloads: Object.fromEntries(
      (dl.data ?? []).map((row) => [row.resource_id, Number(row.download_count ?? 0)]),
    ),
    views: Object.fromEntries(
      (vw.data ?? []).map((row) => [row.content_id, Number(row.view_count ?? 0)]),
    ),
  };
}

/* ── Writes (each adds exactly 1) ──────────────────────────────────────────── */

/** Counts one visit per browser session; the first ever visit also counts as a unique visitor. */
export async function registerVisit(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (storageGet(session, VISIT_SESSION_KEY)) return false;
  storageSet(session, VISIT_SESSION_KEY, "1");

  const isNewVisitor = !storageGet(local, VISITOR_KEY);
  if (isNewVisitor) storageSet(local, VISITOR_KEY, crypto.randomUUID());

  if (!isLive) {
    updateLocal((s) => {
      s.totalVisits += 1;
      s.monthlyVisits += 1;
      if (isNewVisitor) s.uniqueVisitors += 1;
    });
    return true;
  }

  const { error } = await getSupabase().rpc("register_visit", { is_new_visitor: isNewVisitor });
  if (error) throw error;
  return true;
}

/** Counts a section view when the visitor moves to a different page (refreshes don't count). */
export async function registerPageView(page: PageId): Promise<boolean> {
  if (typeof window === "undefined" || !pages.includes(page)) return false;
  if (storageGet(session, LAST_PAGE_KEY) === page) return false;
  storageSet(session, LAST_PAGE_KEY, page);

  if (!isLive) {
    updateLocal((s) => {
      s.pageViews += 1;
    });
    return true;
  }

  const { error } = await getSupabase().rpc("register_page_view", { p_page: page });
  if (error) throw error;
  return true;
}

export async function trackEvent(event: TrackEvent): Promise<void> {
  if (event.kind === "download" && !downloadIds.includes(event.id)) throw new Error("Unknown file");
  if (event.kind === "view" && !viewIds.includes(event.id)) throw new Error("Unknown item");

  if (!isLive) {
    updateLocal((s) => {
      const bucket = event.kind === "download" ? s.downloads : s.views;
      bucket[event.id] = (bucket[event.id] ?? 0) + 1;
    });
    return;
  }

  const { error } =
    event.kind === "download"
      ? await getSupabase().rpc("register_download", { p_resource_id: event.id })
      : await getSupabase().rpc("register_view", { p_content_id: event.id });
  if (error) throw error;
}
