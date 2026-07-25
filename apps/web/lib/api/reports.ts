import { api } from "./client";

export interface ReportResponse {
  graph_id: string;
  report_name: string;
  report_path: string;
  generated_at: string;
}

export interface ReportListItem {
  report_name: string;
  report_path: string;
  generated_at: string;
}

export const ReportsAPI = {
  list() {
    return api.get<ReportListItem[]>("/reports/");
  },
  generate(graphId: string) {
    return api.post<ReportResponse>(`/reports/generate/${graphId}`);
  },

  downloadUrl(reportPath: string) {
    const baseUrl = (api.defaults.baseURL ?? "http://localhost:8000").replace(/\/$/, "");
    return `${baseUrl}/${reportPath.replace(/^\//, "")}`;
  },
};
