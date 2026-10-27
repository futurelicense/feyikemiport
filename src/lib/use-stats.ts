import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import type { PageId } from "@/lib/site-data";
import {
  emptyStats,
  fetchSiteStats,
  registerPageView,
  registerVisit,
  trackEvent,
  type SiteStats,
  type TrackEvent,
} from "@/lib/stats";

export const statsQueryKey = ["site-stats"] as const;

// Cancel any read that started before the write landed, so a stale result can't win the race.
async function refreshStats(queryClient: QueryClient) {
  await queryClient.cancelQueries({ queryKey: statsQueryKey });
  await queryClient.invalidateQueries({ queryKey: statsQueryKey });
}

export function useSiteStats(): SiteStats {
  const { data } = useQuery({
    queryKey: statsQueryKey,
    queryFn: fetchSiteStats,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
  return data ?? emptyStats;
}

/** Registers the session visit once, from the root layout. */
export function useRegisterVisit() {
  const queryClient = useQueryClient();
  useEffect(() => {
    registerVisit()
      .then((counted) => {
        if (counted) return refreshStats(queryClient);
      })
      .catch(() => undefined);
  }, [queryClient]);
}

/** Registers a section view for the current page. */
export function usePageView(page: PageId) {
  const queryClient = useQueryClient();
  useEffect(() => {
    registerPageView(page)
      .then((counted) => {
        if (counted) return refreshStats(queryClient);
      })
      .catch(() => undefined);
  }, [page, queryClient]);
}

/** Optimistically bumps a download/view count, then reconciles with the server. */
export function useTrack() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: trackEvent,
    onMutate: async (event: TrackEvent) => {
      await queryClient.cancelQueries({ queryKey: statsQueryKey });
      const previous = queryClient.getQueryData<SiteStats>(statsQueryKey);
      queryClient.setQueryData<SiteStats>(statsQueryKey, (old = emptyStats) => {
        const field = event.kind === "download" ? "downloads" : "views";
        return { ...old, [field]: { ...old[field], [event.id]: (old[field][event.id] ?? 0) + 1 } };
      });
      return { previous };
    },
    onError: (_error, _event, context) => {
      if (context?.previous) queryClient.setQueryData(statsQueryKey, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: statsQueryKey }),
  });
  return mutate;
}
