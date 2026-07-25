"use client";

import {
  CheckCircle2,
} from "lucide-react";

interface ReportSectionsProps {
  sections: string[];
}

export default function ReportSections({
  sections,
}: ReportSectionsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Included Sections
      </h2>

      <p className="mt-2 text-slate-500">
        The following information will be included in the generated report.
      </p>

      <div className="mt-6 space-y-4">

        {sections.map((section) => (

          <div
            key={section}
            className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
          >

            <CheckCircle2 className="h-6 w-6 text-green-600" />

            <span className="font-medium">
              {section}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}