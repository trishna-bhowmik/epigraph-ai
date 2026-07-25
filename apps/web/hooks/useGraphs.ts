"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphAPI } from "@/lib/api/graphs";

export function useGraphs(
  datasetId: string
) {
  return useQuery({
    queryKey: [
      "graphs",
      datasetId,
    ],

    queryFn: async () => {
      const response =
        await GraphAPI.getAll(
          datasetId
        );

      return response.data;
    },

    enabled: !!datasetId,
  });
}