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

type Props = {
  distribution: Record<string, number>;
};

export default function DegreeDistributionChart({
  distribution,
}: Props) {
  const chartData = Object.entries(
    distribution
  ).map(([degree, count]) => ({
    degree,
    count,
  }));

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Degree Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="degree" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}