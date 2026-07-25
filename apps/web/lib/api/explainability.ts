import { api } from "@/lib/api/client";

export interface ExplainRequest {
  training_run_id: string;
  graph_id: string;
  node_column: string;
  target_column: string;
  node_index: number;
}

export interface FeatureImportance {
  feature_index: number;
  importance: number;
}

export interface EdgeImportance {
  source: number;
  target: number;
  importance: number;
}

export interface ExplainResponse {
  graph_id: string;
  training_run_id: string;
  model: string;
  node_index: number;
  prediction: number;
  confidence: number;

  feature_importance: FeatureImportance[];

  edge_importance: EdgeImportance[];
}

export interface ExplainSummary {
  training_run_id: string;
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

export interface ExplanationHistoryItem extends ExplainResponse {
  id: string;
  created_at: string;
}

export const ExplainabilityAPI = {
  explain(data: ExplainRequest) {
    return api.post<ExplainResponse>(
      "/explainability/explain",
      data
    );
  },

  summary(trainingRunId: string) {
    return api.get<ExplainSummary>(
      `/explainability/summary/${trainingRunId}`
    );
  },

  history(graphId: string) {
    return api.get<ExplanationHistoryItem[]>(
      `/explainability/history/${graphId}`
    );
  },

  health() {
    return api.get("/explainability/health");
  },
};
