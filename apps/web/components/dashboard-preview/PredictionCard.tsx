"use client";

import {
  BrainCircuit,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

export default function PredictionCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 p-6 text-white">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-emerald-100">
              Latest AI Prediction
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              94.2%
            </h2>

            <p className="mt-2 text-sm text-emerald-100">
              Disease Spread Probability
            </p>

          </div>

          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">

            <BrainCircuit className="h-8 w-8" />

          </div>

        </div>

      </div>

      {/* Prediction Details */}

      <div className="space-y-5 p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ShieldAlert className="h-5 w-5 text-red-500" />

            <span className="font-medium text-slate-700">
              Risk Level
            </span>

          </div>

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
            HIGH
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-700">
            Confidence
          </span>

          <span className="font-bold text-slate-900">
            96%
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-700">
            Model
          </span>

          <span className="font-bold text-blue-600">
            GCN
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="font-medium text-slate-700">
            Last Training
          </span>

          <span className="text-slate-500">
            2 hours ago
          </span>

        </div>

        {/* Progress */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-600">
              Prediction Confidence
            </span>

            <span className="text-sm font-bold text-emerald-600">
              94%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700"
              style={{
                width: "94%",
              }}
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4">

          <TrendingUp className="h-5 w-5 text-emerald-600" />

          <p className="text-sm text-slate-700">
            Prediction confidence has improved by{" "}
            <span className="font-semibold text-emerald-700">
              +8%
            </span>{" "}
            compared to the previous model.
          </p>

        </div>

      </div>

    </div>
  );
}