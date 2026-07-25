"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface GraphViewerProps {
  htmlFile: string | null;
  loading?: boolean;
}

export default function GraphViewer({
  htmlFile,
  loading = false,
}: GraphViewerProps) {
  if (loading) {
    console.log("htmlFile:", htmlFile);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interactive Graph</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex h-[650px] items-center justify-center rounded-xl border bg-slate-50">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="mt-4 text-slate-500">
                Generating graph visualization...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!htmlFile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interactive Graph</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex h-[650px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
            <svg
              className="mb-5 h-16 w-16 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m6 2v-4m-9 4h12M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>

            <h2 className="text-xl font-semibold">
              Visualization not generated
            </h2>

            <p className="mt-2 text-slate-500">
              Click the Visualize button to generate the interactive network.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Graph</CardTitle>
      </CardHeader>

      <CardContent>
        <iframe
          src={htmlFile}
          title="Graph Visualization"
          className="h-[700px] w-full rounded-xl border"
        />
      </CardContent>
    </Card>
  );
}