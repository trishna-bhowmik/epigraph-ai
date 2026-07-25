"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import DatasetCard from "./DatasetCard";
import { Dataset, DatasetAPI } from "@/lib/api/datasets";

type Props = {
  datasets: Dataset[];
  projectId: string;
  onPreview: (id: string) => void;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

export default function DatasetList({
  datasets,
  projectId,
  onPreview,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dataset?"
    );

    if (!confirmed) return;

    try {
      await DatasetAPI.delete(id);

      queryClient.invalidateQueries({
        queryKey: ["datasets", projectId],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete dataset.");
    }
  };

  const handleCreateGraph = (datasetId: string) => {
    router.push(
      `/dashboard/projects/${projectId}/graphs/create?dataset=${datasetId}`
    );
  };

  if (datasets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">
        No datasets found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {datasets.map((dataset) => (
        <DatasetCard
          key={dataset.id}
          dataset={{
            id: dataset.id,
            name: dataset.original_name,
            rows: dataset.rows,
            columns: dataset.columns,
            size: formatBytes(dataset.file_size),
            uploadedAt: new Date(
              dataset.created_at
            ).toLocaleDateString(),
            status: dataset.status,
          }}
          onPreview={onPreview}
          onCreateGraph={handleCreateGraph}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}