"use client";

import {
  BrainCircuit,
  ShieldAlert,
  Clock3,
  CheckCircle2,
} from "lucide-react";

interface PredictionResultProps {
  node: string;
  predictedClass: number;
  confidence: number;
  probability: number;
  model: string;
  inferenceTime: number;
}

export default function PredictionResultCard({
  node,
  predictedClass,
  confidence,
  probability,
  model,
  inferenceTime,
}: PredictionResultProps) {

  const risk =
    probability >= 0.75
      ? "HIGH"
      : probability >= 0.40
      ? "MEDIUM"
      : "LOW";

  const riskColor =
    risk === "HIGH"
      ? "bg-red-100 text-red-600"
      : risk === "MEDIUM"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 p-6 text-white">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-blue-100">
              Prediction Result
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {(confidence * 100).toFixed(2)}%
            </h2>

            <p className="mt-2 text-blue-100">
              Confidence Score
            </p>

          </div>

          <div className="rounded-2xl bg-white/20 p-4">

            <BrainCircuit
              className="h-10 w-10"
            />

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-600">
            Node
          </span>

          <span className="font-bold text-slate-900">
            {node}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-600">
            Predicted Class
          </span>

          <span className="font-bold text-slate-900">
            {predictedClass}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-600">
            Model
          </span>

          <span className="font-bold text-blue-600">
            {model}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-600">
            Risk
          </span>

          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${riskColor}`}
          >
            {risk}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-600">
            Inference Time
          </span>

          <div className="flex items-center gap-2">

            <Clock3 className="h-4 w-4 text-slate-500" />

            <span className="font-semibold">
              {inferenceTime.toFixed(3)} s
            </span>

          </div>

        </div>

        {/* Confidence */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm text-slate-500">
              Prediction Confidence
            </span>

            <span className="font-semibold">

              {(confidence * 100).toFixed(1)}%

            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
              style={{
                width: `${confidence * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Probability */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm text-slate-500">
              Disease Spread Probability
            </span>

            <span className="font-semibold">

              {(probability * 100).toFixed(1)}%

            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
              style={{
                width: `${probability * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">

          <CheckCircle2 className="h-5 w-5 text-green-600" />

          <p className="text-sm text-slate-700">

            Prediction completed successfully.

          </p>

        </div>

      </div>

    </div>
  );
}