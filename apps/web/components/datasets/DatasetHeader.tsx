"use client";

import { Upload } from "lucide-react";

interface DatasetHeaderProps {
  onUpload?: () => void;
}

export default function DatasetHeader({
  onUpload,
}: DatasetHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Datasets
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Upload, organize and prepare datasets for graph construction,
          disease spread prediction and Graph Neural Network training.
        </p>

      </div>

      <button
        onClick={onUpload}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Upload size={18} />

        Upload Dataset
      </button>

    </div>
  );
}