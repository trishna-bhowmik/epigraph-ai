"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ExplainResponse } from "@/lib/api/explainability";

interface Props {
  explanation: ExplainResponse;
}

export default function FeatureImportanceChart({
  explanation,
}: Props) {

  const data = explanation.feature_importance.map(
    (item) => ({
      feature: `F${item.feature_index}`,
      importance: Number(
        item.importance.toFixed(4)
      ),
    })
  );

  return (
    <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur">

      <h2 className="mb-5 text-xl font-semibold text-indigo-950">
        Feature Importance
      </h2>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid stroke="#dbeafe" strokeDasharray="3 3" />

            <XAxis dataKey="feature" stroke="#64748b" />

            <YAxis stroke="#64748b" />

            <Tooltip />

            <Bar dataKey="importance" fill="#4f46e5" radius={[8, 8, 0, 0]} />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
