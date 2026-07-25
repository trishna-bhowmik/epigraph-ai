"use client";

import { useSearchParams } from "next/navigation";

export default function PredictionResultPage() {
  const searchParams = useSearchParams();

  const model = searchParams.get("model");
  const nodes = searchParams.get("nodes");
  const confidence = searchParams.get("confidence");

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Prediction Results
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Model</p>
          <p className="mt-2 text-2xl font-bold">{model}</p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Total Nodes</p>
          <p className="mt-2 text-2xl font-bold">{nodes}</p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Average Confidence</p>
          <p className="mt-2 text-2xl font-bold">
            {confidence}%
          </p>
        </div>

      </div>

    </div>
  );
}