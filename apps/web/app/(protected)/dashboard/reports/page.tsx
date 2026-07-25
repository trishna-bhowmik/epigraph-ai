"use client";

import { useEffect, useState } from "react";
import { FileText, FolderOpen, RefreshCw } from "lucide-react";
import { ReportsAPI, ReportListItem } from "@/lib/api/reports";

export default function ReportsLibraryPage() {
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    setLoading(true);
    try {
      const response = await ReportsAPI.list();
      setReports(response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadReports(); }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-2 lg:p-4">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-teal-800 p-8 text-white shadow-2xl shadow-indigo-950/20">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">Report library</p><h1 className="mt-2 text-3xl font-bold">Your generated analyses</h1><p className="mt-3 max-w-2xl text-indigo-100">Open, download, and revisit every PDF report generated across your projects.</p></div>
          <button onClick={loadReports} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />Refresh</button>
        </div>
      </section>

      {loading ? <p className="p-6 text-slate-500">Loading reports...</p> : reports.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-indigo-200 bg-white/70 p-12 text-center"><FolderOpen className="mx-auto text-teal-600" size={38} /><h2 className="mt-4 text-xl font-semibold text-indigo-950">No reports yet</h2><p className="mt-2 text-slate-600">Generate a PDF from a project’s Reports tab and it will appear here.</p></section>
      ) : <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{reports.map((report) => <a key={report.report_path} href={ReportsAPI.downloadUrl(report.report_path)} target="_blank" rel="noreferrer" className="group rounded-3xl border border-indigo-100 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-indigo-950/10"><div className="flex items-start justify-between"><div className="rounded-2xl bg-teal-100 p-3 text-teal-700"><FileText size={24} /></div><span className="text-xs font-medium text-slate-400">PDF</span></div><h2 className="mt-5 break-all font-semibold text-indigo-950 group-hover:text-teal-700">{report.report_name}</h2><p className="mt-2 text-sm text-slate-500">Generated {new Date(report.generated_at).toLocaleString()}</p><p className="mt-5 text-sm font-semibold text-teal-700">Open report →</p></a>)}</section>}
    </div>
  );
}
