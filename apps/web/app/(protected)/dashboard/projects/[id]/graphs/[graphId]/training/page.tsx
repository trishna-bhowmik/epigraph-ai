"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  TrainingAPI,
  TrainingRun,
  TrainingSummary,
} from "@/lib/api/training";

import {
  Graph,
  GraphAPI,
} from "@/lib/api/graphs";

import TrainingHeader from "@/components/training/TrainingHeader";
import TrainingSummaryCards from "@/components/training/TrainingSummaryCards";
import TrainingForm from "@/components/training/TrainingForm";
import TrainingRunsTable from "@/components/training/TrainingRunsTable";

export default function TrainingDashboardPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = params.id as string;
  const graphId = params.graphId as string;

  const [graph, setGraph] = useState<Graph | null>(null);
  const [summary, setSummary] =
    useState<TrainingSummary | null>(null);
  const [runs, setRuns] =
    useState<TrainingRun[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTraining();
  }, [graphId]);

  async function fetchTraining() {
    try {
      setLoading(true);

      const [
        graphRes,
        summaryRes,
        runsRes,
      ] = await Promise.all([
        GraphAPI.getOne(graphId),
        TrainingAPI.getSummary(graphId),
        TrainingAPI.getGraphRuns(graphId),
      ]);

      setGraph(graphRes.data);
      setSummary(summaryRes.data);
      setRuns(runsRes.data);
    } catch (error) {
      console.error("Failed to load training data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteRun(runId: string) {
    try {
      await TrainingAPI.delete(runId);
      fetchTraining();
    } catch (error) {
      console.error("Failed to delete run:", error);
    }
  }

  return (
    <div className="space-y-8">
      <TrainingHeader
        onBack={() => router.back()}
      />

      {summary && (
        <TrainingSummaryCards
          summary={summary}
        />
      )}

      {graph && (
        <TrainingForm
          graphId={graphId}
          datasetId={graph.dataset_id}
          onSuccess={fetchTraining}
        />
      )}

      <TrainingRunsTable
        loading={loading}
        runs={runs}
        projectId={projectId}
        graphId={graphId}
        onDelete={deleteRun}
      />
    </div>
  );
}
