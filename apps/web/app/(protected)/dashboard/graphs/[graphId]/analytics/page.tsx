"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { GraphAnalytics, GraphAPI } from "@/lib/api/graphs";
import {
  PredictionAPI,
  PredictionHistoryItem,
} from "@/lib/api/prediction";
import {
  SimulationAPI,
  SimulationHistoryItem,
} from "@/lib/api/simulation";

export default function AnalyticsPage() {
  const params = useParams();

  const graphId = params.graphId as string;

  const [loading, setLoading] = useState(true);

  const [graph, setGraph] =
    useState<GraphAnalytics | null>(null);

  const [predictions, setPredictions] =
    useState<PredictionHistoryItem[]>([]);

  const [simulations, setSimulations] =
    useState<SimulationHistoryItem[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [graphId]);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const [
        graphRes,
        predictionRes,
        simulationRes,
      ] = await Promise.all([
        GraphAPI.analytics(graphId),
        PredictionAPI.history(graphId),
        SimulationAPI.history(graphId),
      ]);

      setGraph(graphRes.data);
      setPredictions(predictionRes.data);
      setSimulations(simulationRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Overview of graph, prediction and
          simulation statistics.
        </p>

      </div>

      {/* Graph Overview */}

      <section className="space-y-4">

        <h2 className="text-xl font-semibold">
          Graph Overview
        </h2>

        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">

          <AnalyticsCard
            title="Nodes"
            value={graph?.nodes ?? 0}
          />

          <AnalyticsCard
            title="Edges"
            value={graph?.edges ?? 0}
          />

          <AnalyticsCard
            title="Density"
            value={
              graph
                ? graph.density.toFixed(4)
                : "--"
            }
          />

          <AnalyticsCard
            title="Components"
            value={
              graph?.connected_components ?? 0
            }
          />

          <AnalyticsCard
            title="Avg Degree"
            value={
              graph
                ? graph.average_degree.toFixed(2)
                : "--"
            }
          />

          <AnalyticsCard
            title="Avg Clustering"
            value={
              graph
                ? graph.average_clustering.toFixed(
                    3
                  )
                : "--"
            }
          />

        </div>

      </section>

      {/* Prediction */}

      <section className="space-y-4">

        <h2 className="text-xl font-semibold">
          Prediction Analytics
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

     <AnalyticsCard
  title="Prediction Runs"
  value={predictions.length}
/>

<AnalyticsCard
  title="Avg Confidence"
  value={
    predictions.length
      ? `${(predictions[0]!.average_confidence * 100).toFixed(2)}%`
      : "--"
  }
/>

<AnalyticsCard
  title="Latest Prediction"
  value={
    predictions.length
      ? new Date(predictions[0]!.created_at).toLocaleDateString()
      : "--"
  }
/>

        </div>

      </section>

      {/* Simulation */}

      <section className="space-y-4">

        <h2 className="text-xl font-semibold">
          Simulation Analytics
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <AnalyticsCard
            title="Simulation Runs"
            value={simulations.length}
          />

          <AnalyticsCard
            title="Latest Model"
            value={simulations[0]?.model ?? "--"}
          />

       <AnalyticsCard
  title="Latest Simulation"
  value={
    simulations.at(0)?.created_at
      ? new Date(
          simulations.at(0)!.created_at
        ).toLocaleDateString()
      : "--"
  }
/>

        </div>

      </section>

      {/* Top Degree Centrality */}

      {graph &&
        graph.degree_centrality.length > 0 && (

          <section className="space-y-4">

            <h2 className="text-xl font-semibold">
              Top Degree Centrality
            </h2>

            <div className="rounded-xl border">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="p-3 text-left">
                      Node
                    </th>

                    <th className="p-3 text-left">
                      Score
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {graph.degree_centrality
                    .slice(0, 10)
                    .map((item) => (

                      <tr
                        key={item.node}
                        className="border-b"
                      >

                        <td className="p-3">
                          {item.node}
                        </td>

                        <td className="p-3">
                          {item.score.toFixed(4)}
                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          </section>

        )}

    </div>
  );
}

function AnalyticsCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}