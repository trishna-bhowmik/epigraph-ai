"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  history: {
    epoch: number;
    accuracy: number;
    loss: number;
  }[];
}

export default function TrainingChart({
  history,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Training Accuracy
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={history}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="epoch"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}