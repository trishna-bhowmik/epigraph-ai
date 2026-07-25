"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HistoryPoint {
  epoch: number;
  loss: number;
}

interface Props {
  history: HistoryPoint[];
}

export default function TrainingLossChart({
  history,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Training Loss
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Loss decreases as the model learns.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={history}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="epoch" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="loss"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            name="Loss"
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}