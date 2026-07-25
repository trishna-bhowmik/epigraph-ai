"use client";

import { useDatasetPreview } from "@/hooks/useDatasetPreview";

type Props = {
  datasetId: string;
};

export default function DatasetPreview({
  datasetId,
}: Props) {
  const { data, isLoading } =
    useDatasetPreview(datasetId);

  if (isLoading) {
    return <p>Loading preview...</p>;
  }

  if (!data) {
    return (
      <p>No preview available.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-semibold">
        Dataset Preview
      </h2>

      <table className="min-w-full border">
        <thead>
          <tr>
            {data.columns.map(
              (column: string) => (
                <th
                  key={column}
                  className="border bg-slate-100 px-4 py-2 text-left"
                >
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {data.rows.map(
            (
              row: any,
              index: number
            ) => (
              <tr key={index}>
                {data.columns.map(
                  (
                    column: string
                  ) => (
                    <td
                      key={column}
                      className="border px-4 py-2"
                    >
                      {
                        row[column]
                      }
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}