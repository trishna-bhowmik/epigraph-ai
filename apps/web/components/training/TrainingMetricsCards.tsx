"use client";

import { Card, CardContent } from "@/components/ui/Card";

import { TrainingMetrics } from "@/lib/api/training";

interface Props {
  metrics: TrainingMetrics;
}

export default function TrainingMetricsCards({
  metrics,
}: Props) {
  const cards = [
    {
      title: "Accuracy",
      value: `${(metrics.accuracy * 100).toFixed(2)}%`,
    },
    {
      title: "Precision",
      value: `${(metrics.precision * 100).toFixed(2)}%`,
    },
    {
      title: "Recall",
      value: `${(metrics.recall * 100).toFixed(2)}%`,
    },
    {
      title: "F1 Score",
      value: `${(metrics.f1 * 100).toFixed(2)}%`,
    },
    {
      title: "Loss",
      value: metrics.loss.toFixed(4),
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-5">

      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">

            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {card.value}
            </h2>

          </CardContent>
        </Card>
      ))}

    </div>
  );
}