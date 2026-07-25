"use client";

interface GraphHeaderProps {
  title: string;
  createdAt: string;

  visualizing?: boolean;

  onBack: () => void;
  onVisualize: () => void;
  onSimulation: () => void;
  onTrain: () => void;
  onPredict: () => void;
  onExplain: () => void;
  onDelete: () => void;
  onPredictionHistory: () => void;
  onSimulationHistory: () => void;
  onExplainabilityHistory: () => void;
}

export default function GraphHeader({
  title,
  createdAt,
  visualizing = false,
  onBack,
  onVisualize,
  onSimulation,
  onTrain,
  onPredict,
  onExplain,
  onDelete,
  onPredictionHistory,
  onSimulationHistory,
  onExplainabilityHistory,
}: GraphHeaderProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Created on {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* Back */}
          <button
            onClick={onBack}
            className="rounded-xl border border-slate-300 px-5 py-2 font-medium transition hover:bg-slate-100"
          >
            ← Back
          </button>

          {/* Visualize */}
          <button
            onClick={onVisualize}
            disabled={visualizing}
            className="rounded-xl bg-blue-800 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {visualizing ? "Generating..." : "Visualize"}
          </button>

          <button
    onClick={onSimulation}
    className="rounded-xl bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
>
    🦠 Simulation
</button>

          {/* Train */}
          <button
            onClick={onTrain}
            className="rounded-xl bg-emerald-600 px-5 py-2 font-medium text-white transition hover:bg-emerald-700"
          >
            🚀 Train
          </button>

          {/* Prediction */}
          <button
            onClick={onPredict}
            className="rounded-xl bg-purple-600 px-5 py-2 font-medium text-white transition hover:bg-purple-700"
          >
            🔮 Prediction
          </button>

          {/* Explainability */}
          <button
            onClick={onExplain}
            className="rounded-xl bg-amber-500 px-5 py-2 font-medium text-white transition hover:bg-amber-600"
          >
            🔍 Explainability
          </button>

          <button
            onClick={onPredictionHistory}
            className="rounded-xl border border-purple-200 px-4 py-2 font-medium text-purple-700 transition hover:bg-purple-50"
          >
            Prediction history
          </button>

          <button
            onClick={onSimulationHistory}
            className="rounded-xl border border-cyan-200 px-4 py-2 font-medium text-cyan-700 transition hover:bg-cyan-50"
          >
            Simulation history
          </button>

          <button
            onClick={onExplainabilityHistory}
            className="rounded-xl border border-amber-200 px-4 py-2 font-medium text-amber-700 transition hover:bg-amber-50"
          >
            Explainability history
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Delete Graph
          </button>

          

        </div>
      </div>
    </div>
  );
}
