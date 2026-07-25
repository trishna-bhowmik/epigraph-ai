"use client";

import {
  FileText,
  Eye,
  Trash2,
  Network,
  Calendar,
  Database,
  Table2,
} from "lucide-react";

interface DatasetCardProps {
  dataset: {
    id: string;
    name: string;
    rows: number;
    columns: number;
    size: string;
    uploadedAt: string;
    status: "ready" | "processing" | "failed";
  };

  onPreview(id: string): void;
  onCreateGraph(id: string): void;
  onDelete(id: string): void;
}

export default function DatasetCard({
  dataset,
  onPreview,
  onCreateGraph,
  onDelete,
}: DatasetCardProps) {
  const badgeColor = {
    ready: "bg-emerald-100 text-emerald-700",
    processing: "bg-amber-100 text-amber-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">
            <FileText
              className="text-blue-600"
              size={22}
            />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {dataset.name}
            </h3>

            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeColor[dataset.status]}`}
            >
              {dataset.status.toUpperCase()}
            </span>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">
            <Table2 size={16} />
            Rows
          </div>

          <span className="font-medium">
            {dataset.rows.toLocaleString()}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">
            <Database size={16} />
            Columns
          </div>

          <span className="font-medium">
            {dataset.columns}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-slate-500">
            Size
          </span>

          <span className="font-medium">
            {dataset.size}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={16} />
            Uploaded
          </div>

          <span className="font-medium">
            {dataset.uploadedAt}
          </span>

        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-slate-200" />

      {/* Actions */}

      <div className="grid grid-cols-3 gap-2">

        <button
  onClick={() => onPreview(dataset.id)}
  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 transition hover:bg-slate-100"
>
  <Eye size={16} />
  Preview
</button>

        <button
  onClick={() => onCreateGraph(dataset.id)}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-800 py-2 text-white transition hover:bg-blue-700"
>
  <Network size={16} />
  Graph
</button>

        <button
          onClick={() => onDelete(dataset.id)}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2 text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}