"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { DatasetAPI } from "@/lib/api/datasets";

export function useDeleteDataset(
  projectId: string
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      datasetId: string
    ) =>
      DatasetAPI.delete(
        datasetId
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "datasets",
          projectId,
        ],
      });
    },
  });
}