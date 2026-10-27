# Feyikemi Akinyelure — Portfolio

TanStack Start + React Query port of `Feyikemi_Portfolio_Multipage`, with site-wide
activity counters (the same mechanism as the Adeola portfolio) stored in Supabase.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npx vite preview
```

Without Supabase env vars the site runs in **demo mode**: counters work but live only in
the current browser (the badge says "Demo mode · this browser only").

## Connect Supabase

1. Supabase → SQL editor → run `supabase/bootstrap.sql` (safe to re-run).
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`
   (Settings → API; publishable/anon key only). Set the same two vars on the host (Vercel etc.).
3. Optional hourly bump (+2 downloads, +2 views): add GitHub Actions secrets `SUPABASE_URL` and
   `SUPABASE_SECRET_KEY` (service role / `sb_secret_` key). See `.github/workflows/increment-activity.yml`.

## What is counted (each event adds exactly 1)

| Counter | Trigger | RPC |
| --- | --- | --- |
| Visits (total / monthly / unique) | first page load per browser session | `register_visit` |
| Page views | navigating to a different page (refresh doesn't count) | `register_page_view` |
| Downloads: `handbook-sample` | "Download free sample" click | `register_download` |
| Views: `handbook-preview` | "Flip through sample" opens | `register_view` |
| Views: `handbook-amazon`, `google-scholar`, `press-references` | outbound publication link clicks | `register_view` |

Tables are read-only to the public; writes only go through `SECURITY DEFINER` functions that
accept known ids. Adding a tracked item = add its id in `src/lib/site-data.ts` **and** in the SQL
allow-lists, then re-run `bootstrap.sql`.
