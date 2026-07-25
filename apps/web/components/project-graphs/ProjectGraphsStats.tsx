"use client";

import {
  Network,
  CircleDot,
  Share2,
  Activity,
} from "lucide-react";

interface ProjectGraphsStatsProps {
  totalGraphs: number;
  totalNodes: number;
  totalEdges: number;
  averageNodes: number;
}

export default function ProjectGraphsStats({
  totalGraphs,
  totalNodes,
  totalEdges,
  averageNodes,
}: ProjectGraphsStatsProps) {
  const cards = [
    {
      title: "Graphs",
      value: totalGraphs,
      icon: Network,
      color: "text-blue-600",
    },
    {
      title: "Nodes",
      value: totalNodes.toLocaleString(),
      icon: CircleDot,
      color: "text-indigo-600",
    },
    {
      title: "Edges",
      value: totalEdges.toLocaleString(),
      icon: Share2,
      color: "text-emerald-600",
    },
    {
      title: "Avg Nodes / Graph",
      value: averageNodes.toFixed(1),
      icon: Activity,
      color: "text-amber-600",
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