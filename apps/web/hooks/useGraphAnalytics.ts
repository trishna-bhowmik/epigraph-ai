"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphAPI } from "@/lib/api/graphs";

export function useGraphAnalytics(
  graphId: string
) {
  return useQuery({
    queryKey: [
      "graph-analytics",
      graphId,
    ],

    queryFn: async () => {
      const response =
        await GraphAPI.analytics(
          graphId
        );

      return response.data;
    },

    enabled: !!graphId,
  });
}