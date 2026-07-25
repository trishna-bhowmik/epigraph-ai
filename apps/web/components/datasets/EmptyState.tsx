"use client";

import { FolderOpen, Upload } from "lucide-react";

interface EmptyStateProps {
  onUpload: () => void;
}

export default function EmptyState({
  onUpload,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

        <FolderOpen
          className="text-blue-600"
          size={34}
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No datasets uploaded
      </h2>

      <p className="mt-3 text-slate-500">
        Upload your first dataset to begin graph construction.
      </p>

      <button
        onClick={onUpload}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-800 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Upload size={18} />
        Upload Dataset
      </button>

    </div>
  );
}