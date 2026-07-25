"use client";

import {
  FileText,
} from "lucide-react";

interface ReportPreviewProps {
  project: string;
  dataset: string;
}

export default function ReportPreview({
  project,
  dataset,
}: ReportPreviewProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold">
          Report Preview
        </h2>

      </div>

      <div className="p-10">

        <div className="mx-auto max-w-3xl rounded-xl border bg-white p-10 shadow">

          <div className="flex items-center gap-4">

            <FileText className="h-12 w-12 text-blue-600" />

            <div>

              <h1 className="text-3xl font-bold">
                EpiGraph AI Report
              </h1>

              <p className="text-slate-500">
                Disease Spread Prediction Platform
              </p>

            </div>

          </div>

          <hr className="my-8" />

          <div className="space-y-4">

            <p>

              <strong>Project:</strong>{" "}
              {project}

            </p>

            <p>

              <strong>Dataset:</strong>{" "}
              {dataset}

            </p>

            <p>

              <strong>Contents</strong>

            </p>

            <ul className="ml-6 list-disc space-y-2 text-slate-600">

              <li>Dataset Summary</li>

              <li>Graph Analytics</li>

              <li>Training Results</li>

              <li>Prediction Results</li>

              <li>Simulation Results</li>

              <li>Explainability</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}