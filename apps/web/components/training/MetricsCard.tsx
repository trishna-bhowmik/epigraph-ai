"use client";

import {
  Award,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";

interface MetricsCardProps {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  loss: number;
  trainingTime: number;
}

export default function MetricsCard({
  accuracy,
  precision,
  recall,
  f1,
  loss,
  trainingTime,
}: MetricsCardProps) {
  const metrics = [
    {
      title: "Accuracy",
      value: `${(accuracy * 100).toFixed(2)}%`,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Precision",
      value: `${(precision * 100).toFixed(2)}%`,
      icon: Target,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Recall",
      value: `${(recall * 100).toFixed(2)}%`,
      icon: Award,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "F1 Score",
      value: `${(f1 * 100).toFixed(2)}%`,
      icon: Award,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Loss",
      value: loss.toFixed(4),
      icon: TrendingUp,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Training Time",
      value: `${trainingTime.toFixed(2)} s`,
      icon: Timer,
      color: "text-cyan-600",
      bg: "bg-cyan-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {metric.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {metric.value}
                </h2>
              </div>

              <div className={`rounded-2xl p-3 ${metric.bg}`}>
                <Icon
                  className={`h-6 w-6 ${metric.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}