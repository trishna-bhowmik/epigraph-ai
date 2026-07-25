"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  PredictionAPI,
  PredictionHistoryItem,
} from "@/lib/api/prediction";

export default function PredictionHistoryPage() {
  const { graphId } = useParams<{ graphId: string }>();
  const [runs, setRuns] = useState<
    PredictionHistoryItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  async function loadHistory() {
    try {
      const response =
        await PredictionAPI.history(
          graphId
        );

      setRuns(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load prediction history. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function deleteRun(id: string) {
    if (
      !confirm(
        "Delete this prediction?"
      )
    )
      return;

    await PredictionAPI.deleteRun(id);

    loadHistory();
  }

  if (loading)
    return (
      <div className="p-6">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Prediction History
        </h1>

        <p className="text-gray-500">
          Previous prediction runs for
          this graph.
        </p>

      </div>

      {runs.length === 0 && (
        <div className="rounded-xl border p-8 text-center">
          No prediction history found.
        </div>
      )}

      {error && <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="space-y-4">

        {runs.map((run) => (

          <div
            key={run.id}
            className="rounded-xl border p-5 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold text-lg">
                  Prediction Run
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(
                    run.created_at
                  ).toLocaleString()}
                </p>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {(run.average_confidence * 100).toFixed(2)}%
              </span>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">

              <div>

                <p className="text-gray-500 text-sm">
                  Nodes
                </p>

                <p className="font-semibold">
                  {run.total_nodes}
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  Training Run
                </p>

                <p className="font-mono text-xs">
                  {run.training_run_id}
                </p>

              </div>

            </div>

            <div className="mt-5 flex gap-3">

              <Link
                href={`/dashboard/graphs/${graphId}/predictions/${run.id}`}
                className="rounded-lg bg-blue-800 px-4 py-2 text-white"
              >
                View
              </Link>

              <button
                onClick={() =>
                  deleteRun(run.id)
                }
                className="rounded-lg border px-4 py-2"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
