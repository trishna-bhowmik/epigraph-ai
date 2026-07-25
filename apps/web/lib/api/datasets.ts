import { api } from "./client";

export interface Dataset {
  id: string;
  project_id: string;

  original_name: string;
  stored_name: string;

  mime_type: string;
  extension: string;

  file_size: number;

  rows: number;
  columns: number;

  status: "ready" | "processing" | "failed";

  created_at: string;
  updated_at: string;
}

export interface DatasetPreview {
  columns: string[];
  rows: Record<string, any>[];
}

export interface ColumnSummary {
  name: string;
  dtype: string;
  missing: number;
}

export interface DatasetEDA {
  rows: number;
  columns: number;
  duplicate_rows: number;

  numeric_columns: string[];
  categorical_columns: string[];

  column_summary: ColumnSummary[];

  statistics: Record<string, any>;
}

export const DatasetAPI = {
  upload(projectId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<Dataset>(
      `/projects/${projectId}/datasets`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  getAll(projectId: string) {
    return api.get<Dataset[]>(
      `/projects/${projectId}/datasets`
    );
  },

  getOne(datasetId: string) {
    return api.get<Dataset>(
      `/datasets/${datasetId}`
    );
  },

  preview(datasetId: string) {
    return api.get<DatasetPreview>(
      `/datasets/${datasetId}/preview`
    );
  },

  eda(datasetId: string) {
    return api.get<DatasetEDA>(
      `/datasets/${datasetId}/eda`
    );
  },

  delete(datasetId: string) {
    return api.delete(
      `/datasets/${datasetId}`
    );
  },
};