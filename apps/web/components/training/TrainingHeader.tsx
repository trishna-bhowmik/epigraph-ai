"use client";

interface TrainingHeaderProps {
  onBack: () => void;
}

export default function TrainingHeader({
  onBack,
}: TrainingHeaderProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Model Training
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Train Graph Neural Network models and manage previous runs.
          </p>
        </div>

        <button
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-5 py-2 font-medium transition hover:bg-slate-100"
        >
          ← Back
        </button>

      </div>

    </div>
  );
}