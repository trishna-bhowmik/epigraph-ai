"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isAxiosError } from "axios";

import {
  TrainingAPI,
  TrainingRun,
} from "@/lib/api/training";

import {
  ExplainabilityAPI,
  ExplainResponse,
} from "@/lib/api/explainability";

import ExplainabilityForm from "@/components/explainability/ExplainabilityForm";
import ExplanationSummary from "@/components/explainability/ExplanationSummary";
import FeatureImportanceChart from "@/components/explainability/FeatureImportanceChart";
import EdgeImportanceTable from "@/components/explainability/EdgeImportanceTable";

export default function ExplainabilityPage() {
  const params = useParams();

  const graphId = params.graphId as string;

  const [trainingRuns, setTrainingRuns] = useState<
    TrainingRun[]
  >([]);

  const [explanation, setExplanation] =
    useState<ExplainResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTrainingRuns();
  }, []);

  async function loadTrainingRuns() {
    try {
      const res =
        await TrainingAPI.getGraphRuns(graphId);

      setTrainingRuns(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleExplain(
    trainingRunId: string,
    nodeColumn: string,
    targetColumn: string,
    nodeIndex: number
  ): Promise<void> {
    try {
      setLoading(true);
      setError("");
      const res =
        await ExplainabilityAPI.explain({
          training_run_id: trainingRunId,
          graph_id: graphId,
          node_column: nodeColumn,
          target_column: targetColumn,
          node_index: nodeIndex,
        });

      setExplanation(res.data);
    } catch (err) {
      console.error(err);
      setError(
        isAxiosError(err) && typeof err.response?.data?.detail === "string"
          ? err.response.data.detail
          : "Unable to generate an explanation. Check the selected model and dataset columns."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Model transparency</p><h1 className="mt-2 text-3xl font-bold text-indigo-950">Explainability</h1><p className="mt-2 text-slate-600">Understand which features and graph connections influenced an individual prediction.</p></div>

      <ExplainabilityForm
        trainingRuns={trainingRuns}
        onExplain={handleExplain}
        loading={loading}
        error={error}
      />

      {explanation && (
  <>
    <ExplanationSummary explanation={explanation} />

    <FeatureImportanceChart explanation={explanation} />

    <EdgeImportanceTable explanation={explanation} />
  </>
)}

    </div>
  );
}
