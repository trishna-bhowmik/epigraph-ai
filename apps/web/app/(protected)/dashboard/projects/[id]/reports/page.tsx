"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FileText, LoaderCircle } from "lucide-react";
import { isAxiosError } from "axios";

import ProjectNavigation from "@/components/projects/ProjectNavigation";
import ReportPreview from "@/components/reports/ReportPreview";
import ReportSections from "@/components/reports/ReportSections";
import { GraphAPI, ProjectGraph } from "@/lib/api/graphs";
import { ProjectsAPI, Project } from "@/lib/api/projects";
import { ReportsAPI, ReportResponse } from "@/lib/api/reports";

const sections = ["Executive summary", "Dataset and graph analytics", "Training and prediction results", "Simulation summary", "Explainability insights"];

export default function ProjectReportsPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [graphs, setGraphs] = useState<ProjectGraph[]>([]);
  const [selectedGraphId, setSelectedGraphId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([ProjectsAPI.getById(projectId), GraphAPI.getProjectGraphs(projectId)])
      .then(([projectResponse, graphsResponse]) => {
        setProject(projectResponse.data);
        setGraphs(graphsResponse.data);
        setSelectedGraphId(graphsResponse.data[0]?.id ?? "");
      })
      .catch(() => setError("Unable to load this project’s graphs."));
  }, [projectId]);

  async function generateReport() {
    if (!selectedGraphId) return;
    const reportWindow = window.open("", "_blank");
    setGenerating(true);
    setError("");
    try {
      const response = await ReportsAPI.generate(selectedGraphId);
      setReport(response.data);
      const downloadUrl = ReportsAPI.downloadUrl(response.data.report_path);
      if (reportWindow) {
        reportWindow.location.assign(downloadUrl);
      }
    } catch (error) {
      reportWindow?.close();
      const detail = isAxiosError(error)
        ? error.response?.data?.detail
        : undefined;
      setError(
        typeof detail === "string"
          ? detail
          : "Report generation failed. Check that the selected graph has a trained model and try again."
      );
    } finally {
      setGenerating(false);
    }
  }

  const selectedGraph = graphs.find((graph) => graph.id === selectedGraphId);

  return (
    <div className="space-y-8">
      <ProjectNavigation projectId={projectId} />
      <section className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Project reports</p><h1 className="mt-2 text-3xl font-bold text-indigo-950">Generate an AI analysis report</h1><p className="mt-2 max-w-2xl text-slate-600">Compile the selected graph’s data, model metrics, predictions, simulation, and explainability results into a PDF.</p></div><div className="rounded-2xl bg-teal-100 p-4 text-teal-700"><FileText size={30} /></div></div>
        <div className="mt-8 grid gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 md:grid-cols-[1fr_auto] md:items-end"><label className="grid gap-2 text-sm font-semibold text-indigo-950">Graph to report on<select value={selectedGraphId} onChange={(event) => setSelectedGraphId(event.target.value)} className="rounded-xl border border-indigo-200 bg-white px-4 py-3 font-normal outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100">{graphs.length === 0 && <option value="">No graphs available</option>}{graphs.map((graph) => <option key={graph.id} value={graph.id}>{graph.name} — {graph.nodes} nodes</option>)}</select></label><button onClick={generateReport} disabled={!selectedGraphId || generating} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-950 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/15 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50">{generating && <LoaderCircle size={18} className="animate-spin" />}{generating ? "Generating PDF..." : "Generate & download"}</button></div>
        {error && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
        {report && <div className="mt-4 rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800">{report.report_name} generated. <a href={ReportsAPI.downloadUrl(report.report_path)} target="_blank" rel="noreferrer" className="font-semibold underline">Open or download the PDF</a>.</div>}
      </section>
      <div className="grid gap-8 xl:grid-cols-2"><ReportPreview project={project?.name ?? "Project"} dataset={selectedGraph?.dataset_name ?? "Selected graph dataset"} /><ReportSections sections={sections} /></div>
    </div>
  );
}
