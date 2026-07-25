import { api } from "@/lib/api/client";

/* -------------------------------------------------------
 * Prediction Request
 * ----------------------------------------------------- */

export interface PredictionRequest {
  training_run_id: string;
  graph_id: string;
  node_column: string;
  target_column: string;
}

/* -------------------------------------------------------
 * Prediction Response
 * ----------------------------------------------------- */

export interface PredictionItem {
  node_index: number;
  predicted_class: number;
  confidence: number;
  probabilities: number[];
}

export interface PredictionResponse {
  prediction_run_id: string;
  graph_id: string;
  training_run_id: string;
  model: string;
  total_nodes: number;
  average_confidence: number;
  class_distribution: Record<number, number>;
  predictions: PredictionItem[];
}

/* -------------------------------------------------------
 * Prediction Summary
 * ----------------------------------------------------- */

export interface PredictionSummary {
  graph_id: string;
  model: string;
  total_nodes: number;
  average_confidence: number;
  class_distribution: Record<number, number>;
}

/* -------------------------------------------------------
 * Prediction History
 * ----------------------------------------------------- */

export interface PredictionHistoryItem {
  id: string;
  training_run_id: string;
  total_nodes: number;
  average_confidence: number;
  created_at: string;
}

/* -------------------------------------------------------
 * Stored Prediction
 * ----------------------------------------------------- */

export interface StoredPredictionItem {
  node_index: number;
  predicted_class: number;
  confidence: number;
}

/* -------------------------------------------------------
 * Prediction Run Details
 * ----------------------------------------------------- */

export interface PredictionRun {
  id: string;
  graph_id: string;
  training_run_id: string;
  total_nodes: number;
  average_confidence: number;
  created_at: string;
  predictions: StoredPredictionItem[];
}

/* -------------------------------------------------------
 * Prediction API
 * ----------------------------------------------------- */

export const PredictionAPI = {
  // ----------------------------------
  // Predict using selected model
  // ----------------------------------

  predict(data: PredictionRequest) {
    return api.post<PredictionResponse>(
      "/predictions/predict",
      data
    );
  },

  // ----------------------------------
  // Predict using latest model
  // ----------------------------------

  predictLatest(
    graphId: string,
    nodeColumn: string,
    targetColumn: string
  ) {
    return api.post<PredictionResponse>(
      `/predictions/latest?graph_id=${graphId}&node_column=${nodeColumn}&target_column=${targetColumn}`
    );
  },

  // ----------------------------------
  // Prediction Summary
  // ----------------------------------

  summary(graphId: string) {
    return api.get<PredictionSummary>(
      `/predictions/summary/${graphId}`
    );
  },

  // ----------------------------------
  // Prediction History
  // ----------------------------------

  history(graphId: string) {
    return api.get<PredictionHistoryItem[]>(
      `/predictions/history/${graphId}`
    );
  },

  // ----------------------------------
  // Get Prediction Run
  // ----------------------------------

  getRun(runId: string) {
    return api.get<PredictionRun>(
      `/predictions/run/${runId}`
    );
  },

  // ----------------------------------
  // Delete Prediction Run
  // ----------------------------------

  deleteRun(runId: string) {
    return api.delete(
      `/predictions/run/${runId}`
    );
  },
};