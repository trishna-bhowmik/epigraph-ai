"use client";

import {
  FileText,
  Calendar,
} from "lucide-react";

interface Props {
  project: string;
  dataset: string;
  generatedAt: string;
}

export default function ReportCard({
  project,
  dataset,
  generatedAt,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500">
            AI Report
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Disease Spread Report
          </h2>

        </div>

        <div className="rounded-2xl bg-blue-100 p-4">

          <FileText className="h-8 w-8 text-blue-600"/>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">

          <span className="text-slate-500">

            Project

          </span>

          <span className="font-semibold">

            {project}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">

            Dataset

          </span>

          <span className="font-semibold">

            {dataset}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">

            Generated

          </span>

          <div className="flex items-center gap-2">

            <Calendar
              size={16}
            />

            <span className="font-semibold">

              {generatedAt}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}