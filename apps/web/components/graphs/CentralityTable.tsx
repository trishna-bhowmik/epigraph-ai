"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface Props {
  title: string;
  data: Record<string, number>;
}

export default function CentralityTable({
  title,
  data,
}: Props) {
  const rows = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <Card>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>

        {rows.length === 0 ? (
          <p className="text-sm text-slate-500">
            No data available.
          </p>
        ) : (
          <div className="space-y-3">

            {rows.map(([node, value], index) => (
              <div
                key={node}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {index + 1}
                  </span>

                  <span className="font-medium">
                    {node}
                  </span>
                </div>

                <span className="font-semibold text-blue-700">
                  {value.toFixed(4)}
                </span>
              </div>
            ))}

          </div>
        )}

      </CardContent>

    </Card>
  );
}