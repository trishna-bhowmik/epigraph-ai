"use client";

import {
  Award,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";

interface TrainingMetricsProps {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  loss: number;
  trainingTime: number;
}

export default function TrainingMetrics({
  accuracy,
  precision,
  recall,
  f1,
  loss,
  trainingTime,
}: TrainingMetricsProps) {
  const metrics = [
    {
      title: "Accuracy",
      value: `${(accuracy * 100).toFixed(2)}%`,
      icon: TrendingUp,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Precision",
      value: `${(precision * 100).toFixed(2)}%`,
      icon: Target,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Recall",
      value: `${(recall * 100).toFixed(2)}%`,
      icon: Award,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "F1 Score",
      value: `${(f1 * 100).toFixed(2)}%`,
      icon: Award,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Loss",
      value: loss.toFixed(4),
      icon: TrendingUp,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Training Time",
      value: `${trainingTime.toFixed(2)} s`,
      icon: Timer,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
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

              <div
                className={`rounded-2xl p-3 ${metric.bg}`}
              >
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