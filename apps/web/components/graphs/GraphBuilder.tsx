"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { GraphAPI } from "@/lib/api/graphs";
import { useDatasetPreview } from "@/hooks/useDatasetPreview";
import { Network, Database, ArrowRight, Loader2 } from "lucide-react";

export default function GraphBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const datasetId = searchParams.get("dataset") ?? "";

  const {
    data: preview,
    isLoading: previewLoading,
    error: previewError,
  } = useDatasetPreview(datasetId);

  const columns = useMemo(() => {
    return preview?.columns ?? [];
  }, [preview]);

  const [graphName, setGraphName] = useState("");
  const [sourceColumn, setSourceColumn] = useState("");
  const [targetColumn, setTargetColumn] = useState("");
  const [weightColumn, setWeightColumn] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    graphName.trim() !== "" &&
    sourceColumn !== "" &&
    targetColumn !== "" &&
    !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setError("");

      const response = await GraphAPI.create(datasetId, {
  name: graphName,
  source_column: sourceColumn,
  target_column: targetColumn,
  weight_column: weightColumn || undefined,
});

const graph = response.data;

router.push(
  `/dashboard/projects/${graph.dataset_id}/graphs/${graph.id}`
);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Failed to generate graph."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!datasetId) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-red-500 font-medium">
            Dataset ID not found.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (previewLoading) {
    return (
      <Card>
        <CardContent className="flex h-72 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    );
  }

  if (previewError) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-red-500">
            Failed to load dataset preview.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      <div className="lg:col-span-2">

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-600" />
              Build Knowledge Graph
            </CardTitle>

            <CardDescription>
              Convert your dataset into a graph by selecting the
              source and target columns.
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-6">

            <Input
              label="Graph Name"
              placeholder="Disease Contact Network"
              value={graphName}
              onChange={(e) => setGraphName(e.target.value)}
            />

            <div>

              <h3 className="mb-3 font-semibold text-slate-800">
                Dataset Columns
              </h3>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

                {columns.map((column: string) => (
                  <div
                    key={column}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                  >
                    {column}
                  </div>
                ))}

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <Select
                label="Source Column"
                value={sourceColumn}
                options={columns}
                placeholder="Choose source"
                onChange={setSourceColumn}
              />

              <Select
                label="Target Column"
                value={targetColumn}
                options={columns}
                placeholder="Choose target"
                onChange={setTargetColumn}
              />

            </div>

            <Select
              label="Weight Column (Optional)"
              value={weightColumn}
              options={columns}
              placeholder="None"
              onChange={setWeightColumn}
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building Graph...
                </>
              ) : (
                <>
                  <Network className="mr-2 h-4 w-4" />
                  Generate Graph
                </>
              )}
            </Button>

          </CardContent>

        </Card>

      </div>

      <div>

        <Card>

          <CardHeader>

            <CardTitle>
              Live Summary
            </CardTitle>

            <CardDescription>
              Review your graph configuration before generating.
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-5">

            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs uppercase text-slate-500">
                  Dataset
                </p>
                <p className="font-medium">
                  {datasetId}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">
                Graph Name
              </p>

              <p className="mt-1 font-medium">
                {graphName || "-"}
              </p>
            </div>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Source
                </p>

                <p className="font-medium">
                  {sourceColumn || "-"}
                </p>

              </div>

              <ArrowRight className="text-slate-400" />

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Target
                </p>

                <p className="font-medium">
                  {targetColumn || "-"}
                </p>

              </div>

            </div>
                        <div>

              <p className="text-xs uppercase text-slate-500">
                Weight
              </p>

              <p className="mt-1 font-medium">
                {weightColumn || "None"}
              </p>

            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

              <h4 className="font-semibold text-blue-900">
                Graph Preview
              </h4>

              <p className="mt-2 text-sm text-blue-700">
                {sourceColumn && targetColumn
                  ? `A graph will be created using "${sourceColumn}" as the source node and "${targetColumn}" as the target node.${
                      weightColumn
                        ? ` Edge weights will come from "${weightColumn}".`
                        : ""
                    }`
                  : "Select source and target columns to preview your graph."}
              </p>

            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 p-4">

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Available Columns
                </span>

                <span className="font-semibold">
                  {columns.length}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Source Selected
                </span>

                <span className="font-semibold">
                  {sourceColumn ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Target Selected
                </span>

                <span className="font-semibold">
                  {targetColumn ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Weight Applied
                </span>

                <span className="font-semibold">
                  {weightColumn ? "Yes" : "No"}
                </span>
              </div>

            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  <Network className="mr-2 h-4 w-4" />
                  Generate Graph
                </>
              )}
            </Button>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}