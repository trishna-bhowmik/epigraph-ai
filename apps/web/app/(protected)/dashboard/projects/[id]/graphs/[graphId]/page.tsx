"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Graph,
  GraphAnalytics,
  GraphAPI,
} from "@/lib/api/graphs";

import StatCard from "@/components/graphs/StatCard";
import CentralityChart from "@/components/graphs/CentralityChart";
import GraphViewer from "@/components/graphs/GraphViewer";
import GraphHeader from "@/components/graphs/GraphHeader";

export default function GraphDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const graphId = params.graphId as string;
  const projectId = params.id as string;


  const [graph, setGraph] = useState<Graph | null>(null);
  const [analytics, setAnalytics] =
    useState<GraphAnalytics | null>(null);

  const [loading, setLoading] = useState(true);

  const [visualizing, setVisualizing] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      // Fetch graph
      const graphRes =
        await GraphAPI.getOne(graphId);

      setGraph(graphRes.data);

      // Fetch analytics
      const analyticsRes =
        await GraphAPI.analytics(graphId);

      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleVisualize() {
    try {
      setVisualizing(true);

      await GraphAPI.visualize(graphId);

      await loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setVisualizing(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this graph?")) return;

    try {
      await GraphAPI.delete(graphId);

      router.back();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading graph...
      </div>
    );
  }

  if (!graph) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Graph not found.
      </div>
    );
  }

  console.log("Graph object:", graph);
console.log("HTML file:", graph.html_file);

  return (
    <div className="space-y-8 p-8">

 <GraphHeader
  title={graph.name}
  createdAt={graph.created_at}
  visualizing={visualizing}
  onBack={() => router.back()}
  onVisualize={handleVisualize}
  onSimulation={() =>
    router.push(
        `/dashboard/projects/${projectId}/graphs/${graphId}/simulation`
    )
}
  onTrain={() =>
    router.push(
      `/dashboard/projects/${projectId}/graphs/${graphId}/training`
    )
  }
  onPredict={() =>
    router.push(
      `/dashboard/projects/${projectId}/graphs/${graphId}/prediction`
    )
  }
  onExplain={() =>
    router.push(
      `/dashboard/projects/${projectId}/graphs/${graphId}/explainability`
    )
  }
  onDelete={handleDelete}
  onPredictionHistory={() =>
    router.push(`/dashboard/graphs/${graphId}/predictions`)
  }
  onSimulationHistory={() =>
    router.push(`/dashboard/graphs/${graphId}/simulation`)
  }
  onExplainabilityHistory={() =>
    router.push(`/dashboard/graphs/${graphId}/explainability-history`)
  }
/>

      {analytics && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">

          <StatCard
            title="Nodes"
            value={analytics.nodes}
          />

          <StatCard
            title="Edges"
            value={analytics.edges}
          />

          <StatCard
            title="Density"
            value={analytics.density.toFixed(4)}
          />

          <StatCard
            title="Components"
            value={analytics.connected_components}
          />

          <StatCard
            title="Avg Degree"
            value={analytics.average_degree.toFixed(2)}
          />

          <StatCard
            title="Clustering"
            value={analytics.average_clustering.toFixed(4)}
          />

        </div>
      )}

      <GraphViewer
        htmlFile={graph.html_file}
        loading={visualizing}
      />

      {analytics && (
        <div className="grid gap-6 lg:grid-cols-2">

          <CentralityChart
    title="Degree Centrality"
    data={analytics.degree_centrality}
/>

<CentralityChart
    title="Betweenness Centrality"
    data={analytics.betweenness_centrality}
/>

<CentralityChart
    title="Closeness Centrality"
    data={analytics.closeness_centrality}
/>

<CentralityChart
    title="Eigenvector Centrality"
    data={analytics.eigenvector_centrality}
/>

        </div>
      )}

    

    </div>
  );
}
