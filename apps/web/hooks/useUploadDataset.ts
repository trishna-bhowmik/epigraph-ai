"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { DatasetAPI } from "@/lib/api/datasets";

export function useUploadDataset(
  projectId: string
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      DatasetAPI.upload(
        projectId,
        file
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