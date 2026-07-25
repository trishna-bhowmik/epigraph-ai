"use client";

import { useGraphAnalytics } from "@/hooks/useGraphAnalytics";
import DegreeDistributionChart from "./DegreeDistributionChart";
import TopDegreeNodes from "./TopDegreeNodes";
import CentralityTable from "./CentralityTable";

type Props = {
  graphId: string;
};

export default function GraphAnalytics({
  graphId,
}: Props) {
  const { data, isLoading } =
    useGraphAnalytics(graphId);

  if (isLoading) {
    return <p>Loading analytics...</p>;
  }

  if (!data) {
    return <p>No analytics available.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      <Card title="Nodes" value={data.nodes} />
      <Card title="Edges" value={data.edges} />
      <Card title="Density" value={data.density} />
      <Card
        title="Connected Components"
        value={data.connected_components}
      />
      <Card
        title="Average Degree"
        value={data.average_degree}
      />
      <Card
        title="Average Clustering"
        value={data.average_clustering}
      />

      <div className="grid gap-6 lg:grid-cols-2">

  <DegreeDistributionChart
    distribution={data.degree_distribution}
  />

  <TopDegreeNodes
    nodes={data.top_degree_nodes}
  />

</div>

<div className="grid gap-6 lg:grid-cols-2">

  <CentralityTable
    title="Degree Centrality"
    data={data.degree_centrality}
  />

  <CentralityTable
    title="Betweenness Centrality"
    data={data.betweenness_centrality}
  />

  <CentralityTable
    title="Closeness Centrality"
    data={data.closeness_centrality}
  />

  <CentralityTable
    title="Eigenvector Centrality"
    data={data.eigenvector_centrality}
  />

</div>
    </div>
    
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-slate-500">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}