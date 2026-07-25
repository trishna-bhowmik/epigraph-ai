"use client";

import { useParams } from "next/navigation";



import DatasetSummary from "@/components/datasets/DatasetSummary";
import DatasetPreview from "@/components/datasets/DatasetPreview";
import DatasetEDA from "@/components/datasets/DatasetEDA";
import GraphList from "@/components/graphs/GraphList";


export default function DatasetPage() {
  const params = useParams();

  const datasetId = params.datasetId as string;

  return (
  
      <div className="space-y-8">
        <DatasetSummary datasetId={datasetId} />

        <DatasetPreview datasetId={datasetId} />

        <DatasetEDA datasetId={datasetId} />

        <GraphList
            datasetId={datasetId}
        />
      </div>
  
  );
}