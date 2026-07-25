"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PredictionForm from "@/components/prediction/PredictionForm";
import  PredictionSummary  from "@/components/prediction/PredictionSummary";
import PredictionChart from "@/components/prediction/PredictionChart";
import PredictionTable from "@/components/prediction/PredictionTable";
import ExportCSVButton from "@/components/prediction/ExportCSVButton";

import {
  PredictionAPI,
  PredictionResponse,
} from "@/lib/api/prediction";

import {
  TrainingAPI,
  TrainingRun,
} from "@/lib/api/training";

export default function PredictionPage() {
  const params = useParams();

  const graphId = params.graphId as string;

  const [trainingRuns, setTrainingRuns] = useState<TrainingRun[]>([]);
  const [prediction, setPrediction] =
    useState<PredictionResponse | null>(null);

  useEffect(() => {
    if (graphId) {
      loadTrainingRuns();
    }
  }, [graphId]);

  async function loadTrainingRuns() {
    try {
      const res = await TrainingAPI.getGraphRuns(graphId);

      setTrainingRuns(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePredict(
    trainingRunId: string,
    nodeColumn: string,
    targetColumn: string
  ) {
    try {
      const res = await PredictionAPI.predict({
        training_run_id: trainingRunId,
        graph_id: graphId,
        node_column: nodeColumn,
        target_column: targetColumn,
      });

      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    }
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Prediction
        </h1>

        <p className="mt-2 text-slate-500">
          Predict disease spread using a trained GNN model.
        </p>
      </div>

      <PredictionForm
        trainingRuns={trainingRuns}
        onPredict={handlePredict}
      />

      {prediction && (
  <>
    <PredictionSummary prediction={prediction} />

    <PredictionChart prediction={prediction} />

    <div className="flex justify-end">
      <ExportCSVButton prediction={prediction} />
    </div>

    <PredictionTable prediction={prediction} />
  </>
)}

    </div>
  );
}