"use client";

import {
  Download,
} from "lucide-react";

interface DownloadReportProps {
  loading?: boolean;
  onDownload: () => void;
}

export default function DownloadReport({
  loading,
  onDownload,
}: DownloadReportProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Export Report
      </h2>

      <p className="mt-2 text-slate-500">
        Download a professional PDF report containing all analytics and AI results.
      </p>

      <button
        onClick={onDownload}
        disabled={loading}
        className="mt-8 flex items-center gap-3 rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >

        <Download size={20} />

        {loading
          ? "Generating Report..."
          : "Download PDF Report"}

      </button>

    </div>
  );
}