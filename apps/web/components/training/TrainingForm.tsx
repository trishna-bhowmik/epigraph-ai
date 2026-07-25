"use client";

import { useEffect, useState } from "react";

import { TrainingAPI } from "@/lib/api/training";
import { DatasetAPI } from "@/lib/api/datasets";

interface Props {
  graphId: string;
  datasetId: string;
  onSuccess: () => void;
}

export default function TrainingForm({
  graphId,
  datasetId,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [columns, setColumns] = useState<string[]>([]);

  const [model, setModel] = useState<
    "GCN" | "GraphSAGE" | "GAT"
  >("GCN");

  const [nodeColumn, setNodeColumn] =
    useState("");

  const [targetColumn, setTargetColumn] =
    useState("");

  const [epochs, setEpochs] = useState(200);

  const [hiddenDim, setHiddenDim] =
    useState(64);

  const [learningRate, setLearningRate] =
    useState(0.001);

  useEffect(() => {
    async function loadColumns() {
      try {
        const res = await DatasetAPI.preview(
          datasetId
        );

        setColumns(res.data.columns);

        if (res.data.columns.length > 0) {
  setNodeColumn(res.data.columns[0]!);
}

if (res.data.columns.length > 1) {
  setTargetColumn(res.data.columns[1]!);
}
      } catch (err) {
        console.error(err);
      }
    }

    loadColumns();
  }, [datasetId]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await TrainingAPI.train({
        graph_id: graphId,
        node_column: nodeColumn,
        target_column: targetColumn,
        model_name: model,
        hidden_dim: hiddenDim,
        learning_rate: learningRate,
        epochs,
      });

      alert("Training completed successfully.");

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Training failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-semibold text-slate-900">
        Train New Model
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Model */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Model
          </label>

          <select
            value={model}
            onChange={(e) =>
              setModel(
                e.target.value as
                  | "GCN"
                  | "GraphSAGE"
                  | "GAT"
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          >
            <option value="GCN">
              GCN
            </option>

            <option value="GraphSAGE">
              GraphSAGE
            </option>

            <option value="GAT">
              GAT
            </option>
          </select>
        </div>

        {/* Epochs */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Epochs
          </label>

          <input
            type="number"
            value={epochs}
            onChange={(e) =>
              setEpochs(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* Hidden Dimension */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Hidden Dimension
          </label>

          <input
            type="number"
            value={hiddenDim}
            onChange={(e) =>
              setHiddenDim(
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* Learning Rate */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Learning Rate
          </label>

          <input
            type="number"
            step="0.0001"
            value={learningRate}
            onChange={(e) =>
              setLearningRate(
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* Node Column */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Node Column
          </label>

          <select
            value={nodeColumn}
            onChange={(e) =>
              setNodeColumn(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          >
            {columns.map((column) => (
              <option
                key={column}
                value={column}
              >
                {column}
              </option>
            ))}
          </select>
        </div>

        {/* Target Column */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Target Column
          </label>

          <select
            value={targetColumn}
            onChange={(e) =>
              setTargetColumn(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          >
            {columns.map((column) => (
              <option
                key={column}
                value={column}
              >
                {column}
              </option>
            ))}
          </select>
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-800 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading
          ? "Training Model..."
          : "Start Training"}
      </button>
    </form>
  );
}