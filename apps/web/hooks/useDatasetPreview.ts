"use client";

import { useQuery } from "@tanstack/react-query";
import {
  DatasetAPI,
  DatasetPreview,
} from "@/lib/api/datasets";

export function useDatasetPreview(datasetId: string) {
  return useQuery<DatasetPreview>({
    queryKey: ["dataset-preview", datasetId],

    queryFn: async () => {
      const response = await DatasetAPI.preview(datasetId);
      return response.data;
    },

    enabled: !!datasetId,
  });
}