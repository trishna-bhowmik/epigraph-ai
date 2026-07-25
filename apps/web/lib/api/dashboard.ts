import { api } from "./client";

export interface DashboardOverview {
  projects: number;
  datasets: number;
  graphs: number;
  training_runs: number;
}

export interface RecentProject {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface RecentTraining {
  id: string;
  model_name: string;
  accuracy: number;
  loss: number;
  created_at: string;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface DashboardCharts {
  projects: ChartPoint[];
  graphs: ChartPoint[];
  accuracies: ChartPoint[];
}

export const DashboardAPI = {
  overview: async () => {
    const { data } = await api.get<DashboardOverview>("/dashboard/overview");
    return data;
  },

  projects: async () => {
    const { data } = await api.get<RecentProject[]>("/dashboard/projects");
    return data;
  },

  training: async () => {
    const { data } = await api.get<RecentTraining[]>("/dashboard/training");
    return data;
  },

  charts: async () => {
    const { data } = await api.get<DashboardCharts>("/dashboard/charts");
    return data;
  },
};