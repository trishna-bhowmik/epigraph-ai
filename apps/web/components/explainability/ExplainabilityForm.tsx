"use client";

import { useState } from "react";
import { TrainingRun } from "@/lib/api/training";

interface Props {
  trainingRuns: TrainingRun[];
  onExplain: (
    trainingRunId: string,
    nodeColumn: string,
    targetColumn: string,
    nodeIndex: number
  ) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export default function ExplainabilityForm({
  trainingRuns,
  onExplain,
  loading = false,
  error,
}: Props) {
  const [trainingRunId, setTrainingRunId] = useState("");
  const [nodeColumn, setNodeColumn] = useState("id");
  const [targetColumn, setTargetColumn] = useState("label");
  const [nodeIndex, setNodeIndex] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    void onExplain(
      trainingRunId,
      nodeColumn,
      targetColumn,
      nodeIndex
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur"
    >
      <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Model insights</p><h2 className="mt-1 text-xl font-semibold text-indigo-950">
        Generate Explanation
      </h2><p className="mt-1 text-sm text-slate-500">Use your dataset's node and label column names. Defaults are <code>id</code> and <code>label</code>.</p></div>

      {/* Training Run */}
      <div>
        <label className="mb-2 block font-medium">
          Training Run
        </label>

        <select
          value={trainingRunId}
          onChange={(e) =>
            setTrainingRunId(e.target.value)
          }
          className="w-full rounded-xl border border-indigo-200 bg-white p-3 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          required
        >
          <option value="">
            Select Training Run
          </option>

          {trainingRuns.map((run) => (
            <option
              key={run.id}
              value={run.id}
            >
              {run.model_name}
            </option>
          ))}
        </select>
      </div>

      {/* Node Column */}
      <div>
        <label className="mb-2 block font-medium">
          Node Column
        </label>

        <input
          value={nodeColumn}
          onChange={(e) =>
            setNodeColumn(e.target.value)
          }
          className="w-full rounded-xl border border-indigo-200 bg-white p-3 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          placeholder="Patient_ID"
          required
        />
      </div>

      {/* Target Column */}
      <div>
        <label className="mb-2 block font-medium">
          Target Column
        </label>

        <input
          value={targetColumn}
          onChange={(e) =>
            setTargetColumn(e.target.value)
          }
          className="w-full rounded-xl border border-indigo-200 bg-white p-3 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          placeholder="Disease"
          required
        />
      </div>

      {/* Node Index */}
      <div>
        <label className="mb-2 block font-medium">
          Node Index
        </label>

        <input
          type="number"
          value={nodeIndex}
          onChange={(e) =>
            setNodeIndex(Number(e.target.value))
          }
          min="0"
          className="w-full rounded-xl border border-indigo-200 bg-white p-3 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || trainingRuns.length === 0}
        className="rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Generating explanation..." : "Explain Prediction"}
      </button>
      {trainingRuns.length === 0 && <p className="text-sm text-amber-700">Train this graph before generating an explanation.</p>}
      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
    </form>
  );
}
