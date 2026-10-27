import { isLive } from "@/lib/supabase";
import { useSiteStats } from "@/lib/use-stats";

const fmt = (n: number) => n.toLocaleString("en-US");

/** Site-wide views, visits & downloads, fed by the Supabase counters (or this browser in demo mode). */
export function Engagement() {
  const stats = useSiteStats();
  const downloads = stats.downloads["handbook-sample"] ?? 0;
  const previews = stats.views["handbook-preview"] ?? 0;
  const linkViews =
    (stats.views["handbook-amazon"] ?? 0) +
    (stats.views["google-scholar"] ?? 0) +
    (stats.views["press-references"] ?? 0);

  return (
    <section className="container engagement" aria-labelledby="engagement-title">
      <div className="engagement-head">
        <div>
          <div className="eyebrow">Portfolio engagement</div>
          <h2 id="engagement-title">Views, visits &amp; downloads</h2>
          <p>Explore the reach of this portfolio and the handbook resource.</p>
        </div>
        <span className={`metrics-live${isLive ? " on" : ""}`}>
          {isLive ? "Live · site-wide totals" : "Demo mode · this browser only"}
        </span>
      </div>
      <div className="metric-grid">
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            ◉
          </span>
          <div className="metric-label">Page views</div>
          <div className="metric-number">{fmt(stats.pageViews)}</div>
          <div className="metric-sub">Pages opened across the portfolio</div>
        </article>
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            ♙
          </span>
          <div className="metric-label">Visits</div>
          <div className="metric-number">{fmt(stats.totalVisits)}</div>
          <div className="metric-sub">
            {fmt(stats.uniqueVisitors)} unique visitors · {fmt(stats.monthlyVisits)} this month
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            ↓
          </span>
          <div className="metric-label">Free sample downloads</div>
          <div className="metric-number">{fmt(downloads)}</div>
          <div className="metric-sub">Mental Health First Aid handbook sample</div>
        </article>
      </div>
      <div className="metric-disclaimer">
        {isLive ? (
          <>
            <strong>Live activity.</strong> Totals are shared across all visitors and refresh every
            minute. A visit is one browsing session; the download count reflects clicks, not
            verified completed transfers.
          </>
        ) : (
          <>
            <strong>Demo mode.</strong> Supabase is not connected yet, so these counts are stored in
            your own browser only.
          </>
        )}
        <div className="sitewide-note">
          Handbook preview opens: <b>{fmt(previews)}</b> · Publication link views:{" "}
          <b>{fmt(linkViews)}</b>
        </div>
      </div>
    </section>
  );
}
