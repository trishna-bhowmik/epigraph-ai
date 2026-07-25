"use client";

import { useQuery } from "@tanstack/react-query";
import { DatasetAPI } from "@/lib/api/datasets";

export function useDatasetEDA(
  datasetId: string
) {
  return useQuery({
    queryKey: [
      "dataset-eda",
      datasetId,
    ],

    queryFn: async () => {
      const response =
        await DatasetAPI.eda(datasetId);

      return response.data;
    },

    enabled: !!datasetId,
  });
}