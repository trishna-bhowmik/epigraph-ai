"use client";

import Link from "next/link";
import {
  Network,
  CircleDot,
  Share2,
  Calendar,
  ArrowRight,
  Trash2,
} from "lucide-react";

interface ProjectGraphCardProps {
  projectId: string;

  graph: {
    id: string;
    name: string;
    datasetName: string;
    nodes: number;
    edges: number;
    createdAt: string;
  };

  onDelete: (graphId: string) => void;
}

export default function ProjectGraphCard({
  projectId,
  graph,
  onDelete,
}: ProjectGraphCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            {graph.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Dataset:{" "}
            <span className="font-medium text-slate-700">
              {graph.datasetName}
            </span>
          </p>

        </div>

        <div className="rounded-xl bg-blue-50 p-3">
          <Network
            size={24}
            className="text-blue-600"
          />
        </div>

      </div>

      {/* Statistics */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-500">

            <CircleDot size={16} />

            <span className="text-sm">
              Nodes
            </span>

          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {graph.nodes.toLocaleString()}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-500">

            <Share2 size={16} />

            <span className="text-sm">
              Edges
            </span>

          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {graph.edges.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Calendar size={15} />

          {graph.createdAt}

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => onDelete(graph.id)}
            className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
            title="Delete Graph"
          >
            <Trash2 size={18} />
          </button>

          <Link
            href={`/dashboard/projects/${projectId}/graphs/${graph.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Open

            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </div>
  );
}