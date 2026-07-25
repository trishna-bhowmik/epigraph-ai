"use client";

import { useMemo, useState } from "react";
import { PredictionResponse } from "@/lib/api/prediction";

interface Props {
  prediction: PredictionResponse;
}

export default function PredictionTable({ prediction }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return prediction.predictions.filter((item) =>
      item.node_index.toString().includes(search)
    );
  }, [prediction, search]);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Prediction Results
        </h2>

        <input
          type="text"
          placeholder="Search node..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="border px-4 py-3 text-left">
                Node
              </th>

              <th className="border px-4 py-3 text-left">
                Predicted Class
              </th>

              <th className="border px-4 py-3 text-left">
                Confidence
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.node_index}
                className="hover:bg-slate-50"
              >
                <td className="border px-4 py-3">
                  {item.node_index}
                </td>

                <td className="border px-4 py-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {item.predicted_class}
                  </span>
                </td>

                <td className="border px-4 py-3">
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