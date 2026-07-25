"use client";

import {
  Activity,
  TrendingUp,
} from "lucide-react";

export default function TrendChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            Training Accuracy
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            94.8%
          </h3>

        </div>

        <div className="rounded-2xl bg-emerald-100 p-3">

          <TrendingUp className="h-6 w-6 text-emerald-600" />

        </div>

      </div>

      {/* Fake Chart */}

      <div className="relative flex h-56 items-end justify-between gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-sky-50 to-white p-5">

        {[18, 30, 28, 45, 50, 65, 72, 78, 88, 94].map(
          (height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 hover:scale-105"
              style={{
                height: `${height}%`,
              }}
            />
          )
        )}

        <div className="absolute bottom-3 left-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow">

          <Activity className="h-4 w-4 text-blue-600" />

          <span className="text-xs font-medium text-slate-700">
            Accuracy improving every epoch
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between text-sm">

        <div>

          <p className="text-slate-500">
            Best Model
          </p>

          <p className="font-semibold text-slate-900">
            GCN
          </p>

        </div>

        <div className="text-right">

          <p className="text-slate-500">
            Epochs
          </p>

          <p className="font-semibold text-slate-900">
            200
          </p>

        </div>

      </div>

    </div>
  );
}