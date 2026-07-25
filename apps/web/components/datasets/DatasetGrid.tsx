"use client";

import DatasetCard from "./DatasetCard";

interface Dataset {
  id: string;
  name: string;
  rows: number;
  columns: number;
  size: string;
  uploadedAt: string;
  status: "ready" | "processing" | "failed";
}

interface DatasetGridProps {
  datasets: Dataset[];
}

export default function DatasetGrid({
  datasets,
}: DatasetGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {datasets.map((dataset) => (
        <DatasetCard
          key={dataset.id}
          dataset={dataset}
          onPreview={(id) => console.log("Preview", id)}
          onCreateGraph={(id) => console.log("Create Graph", id)}
          onDelete={(id) => console.log("Delete", id)}
        />
      ))}

    </div>
  );
}