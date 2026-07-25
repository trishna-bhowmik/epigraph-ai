"use client";

import { ExplainResponse } from "@/lib/api/explainability";

interface Props {
  explanation: ExplainResponse;
}

export default function ExplanationSummary({
  explanation,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

      <div className="rounded-2xl border border-indigo-100 bg-white/80 p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Model
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {explanation.model}
        </h2>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-white/80 p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Node
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {explanation.node_index}
        </h2>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-white/80 p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Prediction
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {explanation.prediction}
        </h2>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-white/80 p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Confidence
        </p>

        <h2 className="mt-2 text-2xl font-bold text-teal-700">
          {(explanation.confidence * 100).toFixed(2)}%
        </h2>
      </div>

    </div>
  );
}
