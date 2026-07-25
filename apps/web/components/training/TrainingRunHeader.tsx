"use client";

import { TrainingRun } from "@/lib/api/training";

interface Props {
  run: TrainingRun;
  onBack: () => void;
}

export default function TrainingRunHeader({
  run,
  onBack,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <button
        onClick={onBack}
        className="mb-6 rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
      >
        ← Back
      </button>

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Training Run
          </h1>

          <p className="mt-2 text-slate-500">
            {run.model_name}
          </p>
        </div>

        <div className="text-right text-sm text-slate-500">

          <p>
            Created
          </p>

          <p className="font-medium text-slate-800">
            {new Date(run.created_at).toLocaleString()}
          </p>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">

        <div>
          <p className="text-sm text-slate-500">
            Epochs
          </p>

          <p className="text-xl font-semibold">
            {run.epochs}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Learning Rate
          </p>

          <p className="text-xl font-semibold">
            {run.learning_rate}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Training Time
          </p>

          <p className="text-xl font-semibold">
            {run.training_time.toFixed(2)} s
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Model
          </p>

          <p className="text-xl font-semibold">
            {run.model_name}
          </p>
        </div>

      </div>

    </div>
  );
}