"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface TrainingHistory {
  epoch: number;
  loss: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

interface Props {
  history: TrainingHistory[];
}

export default function TrainingHistoryChart({
  history,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Training History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Model performance across training epochs
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={420}
      >
        <LineChart data={history}>

          <CartesianGrid
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="epoch"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            name="Accuracy"
          />

          <Line
            type="monotone"
            dataKey="loss"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            name="Loss"
          />

          <Line
            type="monotone"
            dataKey="precision"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Precision"
          />

          <Line
            type="monotone"
            dataKey="recall"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            name="Recall"
          />

          <Line
            type="monotone"
            dataKey="f1"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={false}
            name="F1 Score"
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}