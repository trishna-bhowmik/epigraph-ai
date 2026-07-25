"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import type { DashboardCharts } from "@/lib/api/dashboard";

interface Props {
  charts: DashboardCharts;
}

export default function DashboardChartsSection({
  charts,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Training Accuracy */}

      <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur">

        <h2 className="mb-5 text-xl font-semibold text-indigo-950">
          Training Accuracy
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart
            data={charts.accuracies}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#0f766e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Graph Nodes */}

      <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur">

        <h2 className="mb-5 text-xl font-semibold text-indigo-950">
          Graph Sizes
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={charts.graphs}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#4f46e5"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Projects */}

      <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur lg:col-span-2">

        <h2 className="mb-5 text-xl font-semibold text-indigo-950">
          Project Timeline
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart
            data={charts.projects}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Line
              dataKey="value"
              stroke="#14b8a6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}
