"use client";

import { useQueryClient } from "@tanstack/react-query";

import { GraphAPI, ProjectGraph } from "@/lib/api/graphs";
import ProjectGraphCard from "./ProjectGraphCard";

interface Props {
  projectId: string;
  graphs: ProjectGraph[];
}

export default function ProjectGraphsList({
  projectId,
  graphs,
}: Props) {
  const queryClient = useQueryClient();

  const handleDelete = async (graphId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this graph?"
    );

    if (!confirmed) return;

    try {
      await GraphAPI.delete(graphId);

      queryClient.invalidateQueries({
        queryKey: ["project-graphs", projectId],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete graph.");
    }
  };

  if (graphs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No Graphs Found
        </h3>

        <p className="mt-2 text-slate-500">
          Generate your first graph from one of the uploaded datasets.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {graphs.map((graph) => (
        <ProjectGraphCard
          key={graph.id}
          projectId={projectId}
          graph={{
            id: graph.id,
            name: graph.name,
            datasetName: graph.dataset_name,
            nodes: graph.nodes,
            edges: graph.edges,
            createdAt: new Date(
              graph.created_at
            ).toLocaleDateString(),
          }}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}