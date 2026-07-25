"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useProject } from "@/hooks/useProject";
import { useProjectGraphs } from "@/hooks/useProjectGraphs";

import ProjectGraphsHeader from "@/components/project-graphs/ProjectGraphsHeader";
import ProjectGraphsStats from "@/components/project-graphs/ProjectGraphsStats";
import ProjectGraphsToolbar from "@/components/project-graphs/ProjectGraphsToolbar";
import ProjectGraphsList from "@/components/project-graphs/ProjectGraphsList";

export default function ProjectGraphsPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const { data: project, isLoading: projectLoading } =
    useProject(projectId);

  const {
    data: graphs,
    isLoading: graphsLoading,
  } = useProjectGraphs(projectId);

  if (projectLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Project not found.
      </div>
    );
  }

  const filteredGraphs = useMemo(() => {
    return (graphs ?? [])
      .filter((graph) =>
        graph.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        switch (sort) {
          case "name":
            return a.name.localeCompare(b.name);

          case "nodes":
            return b.nodes - a.nodes;

          case "edges":
            return b.edges - a.edges;

          case "oldest":
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );

          default:
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
        }
      });
  }, [graphs, search, sort]);

  const totalGraphs = graphs?.length ?? 0;

  const totalNodes =
    graphs?.reduce(
      (sum, graph) => sum + graph.nodes,
      0
    ) ?? 0;

  const totalEdges =
    graphs?.reduce(
      (sum, graph) => sum + graph.edges,
      0
    ) ?? 0;

  const averageNodes =
    totalGraphs === 0
      ? 0
      : totalNodes / totalGraphs;

  return (
    <div className="space-y-8">

      <ProjectGraphsHeader
        onCreateGraph={() =>
          router.push(
            `/dashboard/projects/${projectId}`
          )
        }
      />

      <ProjectGraphsStats
        totalGraphs={totalGraphs}
        totalNodes={totalNodes}
        totalEdges={totalEdges}
        averageNodes={averageNodes}
      />

      <ProjectGraphsToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      {graphsLoading ? (
        <div className="rounded-2xl border bg-white p-12 text-center">
          Loading graphs...
        </div>
      ) : (
        <ProjectGraphsList
          projectId={projectId}
          graphs={filteredGraphs}
        />
      )}

    </div>
  );
}