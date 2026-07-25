"use client";

import { PlusCircle } from "lucide-react";

interface ProjectGraphsHeaderProps {
  onCreateGraph?: () => void;
}

export default function ProjectGraphsHeader({
  onCreateGraph,
}: ProjectGraphsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Graphs
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Browse, manage and analyze graph networks generated from your
          datasets. Open any graph to train models, run simulations and
          visualize disease spread.
        </p>
      </div>

      <button
        onClick={onCreateGraph}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <PlusCircle size={18} />

        Generate Graph
      </button>
    </div>
  );
}