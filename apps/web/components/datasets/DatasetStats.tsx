"use client";

import {
  Database,
  HardDrive,
  Table,
  CheckCircle2,
} from "lucide-react";

interface DatasetStatsProps {
  totalDatasets: number;
  totalRows: number;
  totalStorage: string;
  readyDatasets: number;
}

export default function DatasetStats({
  totalDatasets,
  totalRows,
  totalStorage,
  readyDatasets,
}: DatasetStatsProps) {
  const cards = [
    {
      title: "Datasets",
      value: totalDatasets,
      icon: Database,
      color: "text-blue-600",
    },
    {
      title: "Rows",
      value: totalRows.toLocaleString(),
      icon: Table,
      color: "text-indigo-600",
    },
    {
      title: "Storage",
      value: totalStorage,
      icon: HardDrive,
      color: "text-amber-600",
    },
    {
      title: "Ready",
      value: readyDatasets,
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </h2>

              </div>

              <div className="rounded-xl bg-slate-100 p-3">
                <Icon
                  size={26}
                  className={card.color}
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}