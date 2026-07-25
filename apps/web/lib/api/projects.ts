import { api } from "./client";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
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

export const ProjectsAPI = {
  getAll() {
    return api.get<Project[]>("/projects");
  },

  getById(id: string) {
    return api.get<Project>(`/projects/${id}`);
  },

  create(data: CreateProjectRequest) {
    return api.post<Project>("/projects", data);
  },

  update(id: string, data: CreateProjectRequest) {
    return api.put<Project>(`/projects/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/projects/${id}`);
  },

  // Get all graphs belonging to a project
  getGraphs(projectId: string) {
    return api.get<ProjectGraph[]>(
      `/projects/${projectId}/graphs`
    );
  },
};