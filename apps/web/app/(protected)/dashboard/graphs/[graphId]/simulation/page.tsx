"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  SimulationAPI,
  SimulationHistoryItem,
} from "@/lib/api/simulation";

export default function SimulationHistoryPage() {
  const params = useParams();

  const graphId = params.graphId as string;

  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<
    SimulationHistoryItem[]
  >([]);

  async function loadHistory() {
    try {
      setLoading(true);

      const res = await SimulationAPI.history(graphId);

      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(runId: string) {
    try {
      await SimulationAPI.deleteRun(runId);

      await loadHistory();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadHistory();
  }, [graphId]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        Loading simulations...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Simulation History
        </h1>

        <p className="text-muted-foreground mt-2">
          View, replay and manage all simulation runs
          for this graph.
        </p>

      </div>

      {history.length === 0 ? (

        <div className="rounded-xl border p-10 text-center text-muted-foreground">
          No simulations found.
        </div>

      ) : (

        <div className="grid gap-5">

          {history.map((run) => (

            <div
              key={run.id}
              className="rounded-xl border p-6 flex items-center justify-between"
            >

              <div className="space-y-2">

                <h2 className="text-xl font-semibold">
                  {run.model} Simulation
                </h2>

                <p>
                  <strong>β:</strong> {run.beta}
                </p>

                <p>
                  <strong>γ:</strong> {run.gamma}
                </p>

                <p>
                  <strong>Days:</strong> {run.days}
                </p>

                <p className="text-sm text-muted-foreground">
                  Created{" "}
                  {new Date(
                    run.created_at
                  ).toLocaleString()}
                </p>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/dashboard/graphs/${graphId}/simulation/${run.id}`}
                  className="rounded-lg bg-blue-800 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Replay
                </Link>

                <button
                  onClick={() => handleDelete(run.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
