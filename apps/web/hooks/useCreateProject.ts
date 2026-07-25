"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsAPI } from "@/lib/api/projects";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProjectsAPI.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}