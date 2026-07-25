"use client";

import { Users } from "lucide-react";

interface NeighborImportance {
  node: string;
  score: number;
}

interface NeighborImportanceTableProps {
  neighbors: NeighborImportance[];
}

export default function NeighborImportanceTable({
  neighbors,
}: NeighborImportanceTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Important Neighbors
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Neighbor influence on prediction
          </p>

        </div>

        <div className="rounded-2xl bg-blue-100 p-3">

          <Users className="h-6 w-6 text-blue-600" />

        </div>

      </div>

      {/* Empty */}

      {neighbors.length === 0 && (
        <div className="p-10 text-center text-slate-500">
          No explanation available.
        </div>
      )}

      {/* Table */}

      {neighbors.length > 0 && (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Neighbor Node
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Influence Score
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Contribution
                </th>

              </tr>

            </thead>

            <tbody>

              {neighbors.map((neighbor) => (

                <tr
                  key={neighbor.node}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {neighbor.node}
                  </td>

                  <td className="px-6 py-4">

                    {neighbor.score.toFixed(3)}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="h-3 w-40 rounded-full bg-slate-200">

                        <div
                          className="h-full rounded-full bg-blue-800"
                          style={{
                            width: `${neighbor.score * 100}%`,
                          }}
                        />

                      </div>

                      <span className="font-medium">

                        {(neighbor.score * 100).toFixed(1)}%

                      </span>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}