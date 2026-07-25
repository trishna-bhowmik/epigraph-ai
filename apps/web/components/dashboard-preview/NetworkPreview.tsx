"use client";

import {
  Circle,
  Network,
} from "lucide-react";

const nodes = [
  {
    id: 1,
    top: "12%",
    left: "48%",
    color: "bg-red-500",
    size: "h-5 w-5",
  },
  {
    id: 2,
    top: "30%",
    left: "25%",
    color: "bg-yellow-400",
    size: "h-4 w-4",
  },
  {
    id: 3,
    top: "28%",
    left: "72%",
    color: "bg-blue-500",
    size: "h-4 w-4",
  },
  {
    id: 4,
    top: "52%",
    left: "15%",
    color: "bg-green-500",
    size: "h-4 w-4",
  },
  {
    id: 5,
    top: "55%",
    left: "45%",
    color: "bg-cyan-500",
    size: "h-5 w-5",
  },
  {
    id: 6,
    top: "60%",
    left: "80%",
    color: "bg-purple-500",
    size: "h-4 w-4",
  },
  {
    id: 7,
    top: "78%",
    left: "35%",
    color: "bg-orange-400",
    size: "h-4 w-4",
  },
];

export default function NetworkPreview() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            Graph Network
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            Disease Spread Map
          </h3>

        </div>

        <div className="rounded-2xl bg-indigo-100 p-3">

          <Network className="h-6 w-6 text-indigo-600" />

        </div>

      </div>

      {/* Graph */}

      <div className="relative h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="50"
            y1="15"
            x2="25"
            y2="32"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />

          <line
            x1="50"
            y1="15"
            x2="72"
            y2="30"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />

          <line
            x1="25"
            y1="32"
            x2="15"
            y2="55"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />

          <line
            x1="25"
            y1="32"
            x2="45"
            y2="55"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />

          <line
            x1="72"
            y1="30"
            x2="45"
            y2="55"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />

          <line
            x1="72"
            y1="30"
            x2="80"
            y2="60"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />

          <line
            x1="45"
            y1="55"
            x2="35"
            y2="78"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute ${node.size} ${node.color} animate-pulse rounded-full shadow-lg ring-4 ring-white`}
            style={{
              top: node.top,
              left: node.left,
            }}
          />
        ))}

        <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 p-4 shadow">

          <p className="text-sm font-semibold text-slate-800">
            Live Network
          </p>

          <p className="mt-1 text-xs text-slate-500">
            540 Nodes • 3,210 Edges
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-red-50 p-3">

          <div className="flex items-center gap-2">

            <Circle
              className="h-3 w-3 fill-red-500 text-red-500"
            />

            <span className="text-xs text-slate-500">
              High
            </span>

          </div>

          <p className="mt-2 text-xl font-bold text-red-600">
            12
          </p>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-3">

          <div className="flex items-center gap-2">

            <Circle
              className="h-3 w-3 fill-yellow-400 text-yellow-400"
            />

            <span className="text-xs text-slate-500">
              Medium
            </span>

          </div>

          <p className="mt-2 text-xl font-bold text-yellow-600">
            34
          </p>

        </div>

        <div className="rounded-2xl bg-green-50 p-3">

          <div className="flex items-center gap-2">

            <Circle
              className="h-3 w-3 fill-green-500 text-green-500"
            />

            <span className="text-xs text-slate-500">
              Low
            </span>

          </div>

          <p className="mt-2 text-xl font-bold text-green-600">
            494
          </p>

        </div>

      </div>

    </div>
  );
}