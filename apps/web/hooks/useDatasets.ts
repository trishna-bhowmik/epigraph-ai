"use client";

import { useQuery } from "@tanstack/react-query";

import { DatasetAPI } from "@/lib/api/datasets";

export function useDatasets(
  projectId: string
) {
  return useQuery({
    queryKey: [
      "datasets",
      projectId,
    ],

    queryFn: async () => {
      const response =
        await DatasetAPI.getAll(projectId);

      return response.data;
    },

    enabled: !!projectId,
  });
}