"use client";

import { PredictionResponse } from "@/lib/api/prediction";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  prediction: PredictionResponse;
}

export default function PredictionChart({ prediction }: Props) {
  const data = Object.entries(prediction.class_distribution).map(
    ([label, value]) => ({
      class: `Class ${label}`,
      count: value,
    })
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Class Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#dbeafe" strokeDasharray="3 3" />

            <XAxis dataKey="class" stroke="#64748b" />

            <YAxis stroke="#64748b" />

            <Tooltip />

            <Bar dataKey="count" fill="#0f766e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
