"use client";

import { useQuery } from "@tanstack/react-query";
import { ProjectsAPI } from "@/lib/api/projects";

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],

    queryFn: async () => {
      const response = await ProjectsAPI.getById(id);
      return response.data;
    },

    enabled: !!id,
  });
}