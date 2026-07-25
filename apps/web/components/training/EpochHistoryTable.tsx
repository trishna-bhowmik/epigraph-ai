"use client";

import { EpochHistory } from "@/lib/api/training";

interface Props {
  history: EpochHistory[];
}

export default function EpochHistoryTable({
  history,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Epoch History
        </h2>
      </div>

      <div className="max-h-[500px] overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Epoch
              </th>

              <th className="px-4 py-3 text-left">
                Loss
              </th>

              <th className="px-4 py-3 text-left">
                Accuracy
              </th>

              <th className="px-4 py-3 text-left">
                Precision
              </th>

              <th className="px-4 py-3 text-left">
                Recall
              </th>

              <th className="px-4 py-3 text-left">
                F1
              </th>

              <th className="px-4 py-3 text-left">
                Learning Rate
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((epoch) => (
              <tr
                key={epoch.epoch}
                className="border-b"
              >
                <td className="px-4 py-3">
                  {epoch.epoch}
                </td>

                <td className="px-4 py-3">
                  {epoch.loss.toFixed(4)}
                </td>

                <td className="px-4 py-3">
                  {(epoch.accuracy * 100).toFixed(2)}%
                </td>

                <td className="px-4 py-3">
                  {(epoch.precision * 100).toFixed(2)}%
                </td>

                <td className="px-4 py-3">
                  {(epoch.recall * 100).toFixed(2)}%
                </td>

                <td className="px-4 py-3">
                  {(epoch.f1 * 100).toFixed(2)}%
                </td>

                <td className="px-4 py-3">
                  {epoch.learning_rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}