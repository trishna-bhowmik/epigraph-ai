"use client";

import { useDatasetEDA } from "@/hooks/useDatasetEDA";

type Props = {
  datasetId: string;
};

export default function DatasetEDA({
  datasetId,
}: Props) {
  const { data, isLoading } =
    useDatasetEDA(datasetId);

  if (isLoading) {
    return <p>Loading EDA...</p>;
  }

  if (!data) {
    return <p>No EDA available.</p>;
  }

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-3 gap-6">

        <Card
          title="Rows"
          value={data.rows}
        />

        <Card
          title="Columns"
          value={data.columns}
        />

        <Card
          title="Duplicate Rows"
          value={data.duplicate_rows}
        />

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-bold">
          Numeric Columns
        </h2>

        <div className="flex flex-wrap gap-2">
          {data.numeric_columns.map(
            (column: string) => (
              <span
                key={column}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
              >
                {column}
              </span>
            )
          )}
        </div>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-bold">
          Categorical Columns
        </h2>

        <div className="flex flex-wrap gap-2">
          {data.categorical_columns.map(
            (column: string) => (
              <span
                key={column}
                className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
              >
                {column}
              </span>
            )
          )}
        </div>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-bold">
          Column Summary
        </h2>

        <table className="min-w-full border">

          <thead>

            <tr>

              <th className="border px-4 py-2">
                Column
              </th>

              <th className="border px-4 py-2">
                Type
              </th>

              <th className="border px-4 py-2">
                Missing
              </th>

            </tr>

          </thead>

          <tbody>

            {data.column_summary.map(
              (column: any) => (
                <tr key={column.name}>

                  <td className="border px-4 py-2">
                    {column.name}
                  </td>

                  <td className="border px-4 py-2">
                    {column.dtype}
                  </td>

                  <td className="border px-4 py-2">
                    {column.missing}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <p className="text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}