"use client";

import { useState } from "react";
import { TrainingRun } from "@/lib/api/training";

interface Props {
  trainingRuns: TrainingRun[];
  onPredict: (
    trainingRunId: string,
    nodeColumn: string,
    targetColumn: string
  ) => void;
}

export default function PredictionForm({
  trainingRuns,
  onPredict,
}: Props) {
  const [trainingRunId, setTrainingRunId] = useState("");
  const [nodeColumn, setNodeColumn] = useState("");
  const [targetColumn, setTargetColumn] = useState("");

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Prediction Configuration
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Training Run
          </label>

          <select
            value={trainingRunId}
            onChange={(e) => setTrainingRunId(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Training Run
            </option>

            {trainingRuns.map((run) => (
              <option key={run.id} value={run.id}>
                {run.model_name} • {new Date(run.created_at).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Node Column
          </label>

          <input
            value={nodeColumn}
            onChange={(e) => setNodeColumn(e.target.value)}
            placeholder="Patient_ID"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Target Column
          </label>

          <input
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            placeholder="Disease"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          onClick={() =>
            onPredict(
              trainingRunId,
              nodeColumn,
              targetColumn
            )
          }
          className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Predict
        </button>

      </div>

    </div>
  );
}