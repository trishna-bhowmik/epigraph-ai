"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProjectNavigation from "@/components/projects/ProjectNavigation";
import { GraphAPI, ProjectGraph } from "@/lib/api/graphs";

export default function SimulationPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [graphs, setGraphs] = useState<ProjectGraph[]>([]);

  useEffect(() => {
    GraphAPI.getProjectGraphs(projectId).then((response) => setGraphs(response.data)).catch(console.error);
  }, [projectId]);

  return (
    <div className="space-y-8">
      <ProjectNavigation projectId={projectId} />
      <section className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Simulation history</p>
        <h1 className="mt-2 text-3xl font-bold text-indigo-950">Choose a graph to view simulations</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {graphs.map((graph) => <article key={graph.id} className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"><h2 className="font-semibold text-indigo-950">{graph.name}</h2><p className="mt-1 text-sm text-slate-500">{graph.nodes} nodes · {graph.edges} edges</p><div className="mt-5 flex gap-3"><Link href={`/dashboard/graphs/${graph.id}/simulation`} className="rounded-xl bg-indigo-950 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">View history</Link><Link href={`/dashboard/projects/${projectId}/graphs/${graph.id}/simulation`} className="rounded-xl border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">New simulation</Link></div></article>)}
        </div>
        {graphs.length === 0 && <p className="mt-8 rounded-2xl bg-indigo-50 p-5 text-slate-600">Create a graph first to run simulations.</p>}
      </section>
    </div>
  );
}
