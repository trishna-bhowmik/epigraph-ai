"use client";

import { useQuery } from "@tanstack/react-query";
import { ProjectsAPI } from "@/lib/api/projects";

export function useProjects() {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await ProjectsAPI.getAll();
      return response.data;
    },
  });

  return {
    ...query,

    projects: query.data ?? [],

    projectCount: query.data?.length ?? 0,
  };
}