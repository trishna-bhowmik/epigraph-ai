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

import { Card, CardContent } from "@/components/ui/Card";

import { EpochHistory } from "@/lib/api/training";

interface Props {
  history: EpochHistory[];
}

export default function AccuracyChart({
  history,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Accuracy per Epoch
        </h2>

        <div className="h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="epoch" />

              <YAxis
                domain={[0, 1]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="accuracy"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}