"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { useProject } from "@/hooks/useProject";
import { useDatasets } from "@/hooks/useDatasets";
import { useDatasetPreview } from "@/hooks/useDatasetPreview";

import DatasetHeader from "@/components/datasets/DatasetHeader";
import DatasetStats from "@/components/datasets/DatasetStats";
import DatasetToolbar from "@/components/datasets/DatasetToolbar";
import DatasetUpload from "@/components/datasets/DatasetUpload";
import DatasetList from "@/components/datasets/DatasetList";
import DatasetPreviewModal from "@/components/datasets/DatasetPreviewModal";
import ProjectNavigation from "@/components/projects/ProjectNavigation";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;

  // Toolbar state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filter, setFilter] = useState("all");

  // Preview state
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  // Queries
  const {
    data: project,
    isLoading: projectLoading,
  } = useProject(projectId);

  const {
    data: datasets,
    isLoading: datasetsLoading,
  } = useDatasets(projectId);

 const {
  data: preview,
  isLoading: previewLoading,
} = useDatasetPreview(
  selectedDataset ?? ""
);

  if (projectLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Project not found.
      </div>
    );
  }

  const totalDatasets = datasets?.length ?? 0;

  const totalRows =
    datasets?.reduce((sum, d) => sum + d.rows, 0) ?? 0;

  const totalStorageBytes =
    datasets?.reduce(
      (sum, d) => sum + d.file_size,
      0
    ) ?? 0;

  const totalStorage =
    totalStorageBytes < 1024 * 1024
      ? `${(totalStorageBytes / 1024).toFixed(2)} KB`
      : `${(totalStorageBytes / (1024 * 1024)).toFixed(2)} MB`;

  const readyDatasets =
    datasets?.filter((d) => d.status === "ready").length ?? 0;

  const filteredDatasets = (datasets ?? [])
    .filter((dataset) => {
      const matchesSearch = dataset.original_name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || dataset.status === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sort) {
        case "name":
          return a.original_name.localeCompare(
            b.original_name
          );

        case "size":
          return b.file_size - a.file_size;

        case "oldest":
          return (
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
          );

        default:
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          );
      }
    });

    const selectedDatasetInfo = datasets?.find(
  (d) => d.id === selectedDataset
);

  return (
    <>
      <div className="space-y-8">

        <DatasetHeader />

<ProjectNavigation
  projectId={projectId}
/>

        <DatasetStats
          totalDatasets={totalDatasets}
          totalRows={totalRows}
          totalStorage={totalStorage}
          readyDatasets={readyDatasets}
        />

        <DatasetToolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          filter={filter}
          onFilterChange={setFilter}
        />

        <DatasetUpload projectId={projectId} />

        {datasetsLoading ? (
          <div className="rounded-xl border p-8 text-center">
            Loading datasets...
          </div>
        ) : (
          <DatasetList
  projectId={projectId}
  datasets={filteredDatasets}
  onPreview={setSelectedDataset}
/>
        )}

      </div>

     {selectedDataset &&
  preview &&
  selectedDatasetInfo && (
    <DatasetPreviewModal
      open={true}
      onClose={() => setSelectedDataset(null)}
      title={selectedDatasetInfo.original_name}
      fileSize={
        selectedDatasetInfo.file_size < 1024 * 1024
          ? `${(
              selectedDatasetInfo.file_size / 1024
            ).toFixed(2)} KB`
          : `${(
              selectedDatasetInfo.file_size /
              (1024 * 1024)
            ).toFixed(2)} MB`
      }
      uploadedAt={new Date(
        selectedDatasetInfo.created_at
      ).toLocaleDateString()}
      columns={preview.columns}
      rows={preview.rows}
    />
)}
    </>
  );
}