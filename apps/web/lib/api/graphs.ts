import { api } from "./client";

export interface Graph {
  id: string;
  dataset_id: string;
  name: string;
  graph_file: string;
  html_file: string | null;
  nodes: number;
  edges: number;
  created_at: string;
}

export interface CentralityItem {
  node: string;
  score: number;
}

export interface GraphAnalytics {
  nodes: number;
  edges: number;
  density: number;
  connected_components: number;
  average_degree: number;
  average_clustering: number;

  degree_centrality: CentralityItem[];
  betweenness_centrality: CentralityItem[];
  closeness_centrality: CentralityItem[];
  eigenvector_centrality: CentralityItem[];
}

export interface ProjectGraph {
  id: string;
  name: string;

  dataset_id: string;
  dataset_name: string;

  nodes: number;
  edges: number;

  created_at: string;
}

export const GraphAPI = {
  create: (datasetId: string, data: any) =>
    api.post(`/datasets/${datasetId}/graphs`, data),

  getAll: (datasetId: string) =>
    api.get<Graph[]>(
      `/datasets/${datasetId}/graphs`
    ),

  getOne: (graphId: string) =>
    api.get<Graph>(
      `/graphs/${graphId}`
    ),

  visualize: (graphId: string) =>
    api.post(
      `/graphs/${graphId}/visualize`
    ),

  analytics: (graphId: string) =>
    api.get<GraphAnalytics>(
      `/graphs/${graphId}/analytics`
    ),

  delete: (graphId: string) =>
    api.delete(
      `/graphs/${graphId}`
    ),

    getProjectGraphs: (projectId: string) =>
  api.get<ProjectGraph[]>(
    `/graphs/project/${projectId}`
  ),
};