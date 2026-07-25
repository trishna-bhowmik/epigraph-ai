"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  PredictionAPI,
  PredictionRun,
} from "@/lib/api/prediction";

export default function PredictionRunPage() {
  const { runId } = useParams<{ runId: string }>();
  const [run, setRun] =
    useState<PredictionRun | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function load() {
      try {
        const response =
          await PredictionAPI.getRun(
            runId
          );

        setRun(response.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [runId]);

  const filtered =
    useMemo(() => {

      if (!run) return [];

      return run.predictions.filter(
        (item) =>
          item.node_index
            .toString()
            .includes(search)
      );

    }, [run, search]);

  if (loading)
    return (
      <div className="p-6">
        Loading...
      </div>
    );

  if (!run)
    return (
      <div className="p-6">
        Prediction not found.
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="text-3xl font-bold">
        Prediction Details
      </h1>

      <p className="text-gray-500 mt-1">
        Prediction Run
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="rounded-xl border p-5">

          <p className="text-sm text-gray-500">
            Nodes
          </p>

          <h2 className="text-2xl font-bold">
            {run.total_nodes}
          </h2>

        </div>

        <div className="rounded-xl border p-5">

          <p className="text-sm text-gray-500">
            Average Confidence
          </p>

          <h2 className="text-2xl font-bold">
            {(run.average_confidence * 100).toFixed(2)}%
          </h2>

        </div>

        <div className="rounded-xl border p-5">

          <p className="text-sm text-gray-500">
            Created
          </p>

          <h2 className="text-lg font-semibold">
            {new Date(
              run.created_at
            ).toLocaleString()}
          </h2>

        </div>

      </div>

      <div className="mt-8">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search node..."
          className="w-full rounded-lg border px-4 py-2"
        />

      </div>

      <div className="mt-6 overflow-auto rounded-xl border">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Node
              </th>

              <th className="p-3 text-left">
                Class
              </th>

              <th className="p-3 text-left">
                Confidence
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.node_index}
                className="border-t"
              >

                <td className="p-3">
                  {item.node_index}
                </td>

                <td className="p-3">
                  {item.predicted_class}
                </td>

                <td className="p-3">
                  {(item.confidence * 100).toFixed(2)}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
