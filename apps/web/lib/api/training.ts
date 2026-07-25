import { api } from "@/lib/api/client";

export interface TrainRequest {
  graph_id: string;
  node_column: string;
  target_column: string;
  model_name: "GCN" | "GraphSAGE" | "GAT";
  hidden_dim: number;
  learning_rate: number;
  epochs: number;
}

export interface EpochHistory {
  epoch: number;
  loss: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  learning_rate: number;
}

export interface TrainingRun {
  id: string;
  graph_id: string;

  model_name: string;

  epochs: number;
  learning_rate: number;

  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  loss: number;

  training_time: number;

  checkpoint: string | null;

  created_at: string;
}

export interface TrainingMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  loss: number;
}

export interface TrainingRunResponse {
  training_run: TrainingRun;
  history: EpochHistory[];
  metrics: TrainingMetrics;
}

export interface TrainingSummary {
  total_runs: number;
  best_accuracy: number;
  best_model: string | null;
  latest_training: string | null;
}

export const TrainingAPI = {
  train(data: TrainRequest) {
    return api.post<TrainingRunResponse>(
      "/training/train",
      data
    );
  },

  getRun(runId: string) {
    return api.get<TrainingRunResponse>(
      `/training/${runId}`
    );
  },

  getGraphRuns(graphId: string) {
    return api.get<TrainingRun[]>(
      `/training/graph/${graphId}`
    );
  },

  getSummary(graphId: string) {
    return api.get<TrainingSummary>(
      `/training/graph/${graphId}/summary`
    );
  },

  delete(runId: string) {
    return api.delete(
      `/training/${runId}`
    );
  },
};