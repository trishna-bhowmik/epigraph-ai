"use client";

import { ExplainResponse } from "@/lib/api/explainability";

interface Props {
  explanation: ExplainResponse;
}

export default function EdgeImportanceTable({
  explanation,
}: Props) {

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Most Influential Edges
      </h2>

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="border px-4 py-3">
              Source
            </th>

            <th className="border px-4 py-3">
              Target
            </th>

            <th className="border px-4 py-3">
              Importance
            </th>

          </tr>

        </thead>

        <tbody>

          {explanation.edge_importance
            .slice(0, 20)
            .map((edge, index) => (

              <tr key={index}>

                <td className="border px-4 py-3">
                  {edge.source}
                </td>

                <td className="border px-4 py-3">
                  {edge.target}
                </td>

                <td className="border px-4 py-3">
                  {edge.importance.toFixed(4)}
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}