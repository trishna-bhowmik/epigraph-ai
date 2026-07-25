"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExplainabilityAPI, ExplanationHistoryItem } from "@/lib/api/explainability";

export default function ExplainabilityHistoryPage() {
  const { graphId } = useParams<{ graphId: string }>();
  const [runs, setRuns] = useState<ExplanationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    ExplainabilityAPI.history(graphId)
      .then((response) => setRuns(response.data))
      .catch((reason) => {
        console.error(reason);
        setError("Unable to load explainability history. Apply the latest database migration, then try again.");
      })
      .finally(() => setLoading(false));
  }, [graphId]);

  if (loading) return <div className="p-6">Loading explainability history...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Explainability History</h1>
        <p className="mt-2 text-slate-500">Previously generated explanations for this graph.</p>
      </div>
      {runs.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-slate-500">No explanations have been generated yet.</div>
      ) : runs.map((run) => (
        <article key={run.id} className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Node {run.node_index}</h2>
              <p className="text-sm text-slate-500">{new Date(run.created_at).toLocaleString()} · {run.model}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Prediction {run.prediction} · {(run.confidence * 100).toFixed(1)}%</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">{run.feature_importance.length} feature scores and {run.edge_importance.length} edge scores saved.</p>
        </article>
      ))}
      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
    </div>
  );
}
