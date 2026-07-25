"use client";

import { useGraphs } from "@/hooks/useGraphs";
import GraphCard from "./GraphCard";

type Props = {
  datasetId: string;
};

export default function GraphList({
  datasetId,
}: Props) {
  const {
    data,
    isLoading,
  } = useGraphs(datasetId);

  if (isLoading) {
    return <p>Loading graphs...</p>;
  }

  if (!data?.length) {
    return (
      <p>
        No graphs created yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {data.map((graph: any) => (
        <GraphCard
          key={graph.id}
          graph={graph}
        />
      ))}
    </div>
  );
}