"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { PredictionItem } from "@/lib/api/prediction";

interface Props {
  predictions: PredictionItem[];
}

export default function RiskDistributionChart({
  predictions,
}: Props) {

  let high = 0;
  let medium = 0;
  let low = 0;

  predictions.forEach((prediction) => {

    if (prediction.confidence >= 0.75) {
      high++;
    } else if (prediction.confidence >= 0.40) {
      medium++;
    } else {
      low++;
    }

  });

  const data = [
    {
      name: "High Risk",
      value: high,
      color: "#4f46e5",
    },
    {
      name: "Medium Risk",
      value: medium,
      color: "#0f766e",
    },
    {
      name: "Low Risk",
      value: low,
      color: "#93c5fd",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Risk Distribution
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Distribution of predicted disease spread risk.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={380}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >

            {data.map((entry) => (

              <Cell
                key={entry.name}
                fill={entry.color}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}
