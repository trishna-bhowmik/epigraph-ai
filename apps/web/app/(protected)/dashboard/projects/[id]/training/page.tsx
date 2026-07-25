"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProjectNavigation from "@/components/projects/ProjectNavigation";
import { GraphAPI, ProjectGraph } from "@/lib/api/graphs";

export default function TrainingPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [graphs, setGraphs] = useState<ProjectGraph[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GraphAPI.getProjectGraphs(projectId)
      .then((response) => setGraphs(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  return (
    <div className="space-y-8">
      <ProjectNavigation projectId={projectId} />
      <section className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Model training</p>
        <h1 className="mt-2 text-3xl font-bold text-indigo-950">Train a graph neural network</h1>
        <p className="mt-2 text-slate-600">Choose a graph to configure a GCN, GraphSAGE, or GAT model and review its saved runs.</p>

        {loading ? <p className="mt-8 text-slate-500">Loading graphs...</p> : graphs.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-indigo-50 p-5 text-slate-600">Create a graph first to start training.</p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {graphs.map((graph) => (
              <article key={graph.id} className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-indigo-950">{graph.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{graph.nodes} nodes · {graph.edges} edges</p>
                <Link href={`/dashboard/projects/${projectId}/graphs/${graph.id}/training`} className="mt-5 inline-flex rounded-xl bg-indigo-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700">Open training workspace</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
