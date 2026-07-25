"use client";

import { AlertTriangle } from "lucide-react";

interface DeleteDatasetDialogProps {
  open: boolean;
  datasetName: string;

  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteDatasetDialog({
  open,
  datasetName,
  onCancel,
  onDelete,
}: DeleteDatasetDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

          <AlertTriangle
            size={30}
            className="text-red-600"
          />

        </div>

        <h2 className="mt-6 text-center text-2xl font-bold">
          Delete Dataset?
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {datasetName}
          </span>
          ?
        </p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-300 py-3 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}