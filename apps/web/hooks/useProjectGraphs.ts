import { useQuery } from "@tanstack/react-query";
import { GraphAPI } from "@/lib/api/graphs";

export function useProjectGraphs(projectId: string) {
  return useQuery({
    queryKey: ["project-graphs", projectId],

    queryFn: async () => {
      const response =
        await GraphAPI.getProjectGraphs(projectId);

      return response.data;
    },

    enabled: !!projectId,
  });
}