import { api } from "@/lib/api/client";

/* ---------------------------------------
 * Request
 * ------------------------------------- */

export interface SimulationRequest {
  graph_id: string;
  beta: number;
  gamma: number;
  steps: number;
  initial_infected: number;
}

/* ---------------------------------------
 * Simulation Step
 * ------------------------------------- */

export interface SimulationStep {
  day: number;
  susceptible: number;
  infected: number;
  recovered: number;
}

/* ---------------------------------------
 * Statistics
 * ------------------------------------- */

export interface SimulationStatistics {
  population: number;
  peak_day: number;
  peak_infected: number;
  peak_percentage: number;
  total_recovered: number;
  remaining_susceptible: number;
  attack_rate: number;
  epidemic_duration: number;
}

/* ---------------------------------------
 * Run Response
 * ------------------------------------- */

export interface SimulationResponse {
  simulation_run_id: string;

  graph_id: string;
  graph_name: string;

  beta: number;
  gamma: number;

  history: SimulationStep[];

  statistics: SimulationStatistics;
}

/* ---------------------------------------
 * Simulation History
 * ------------------------------------- */

export interface SimulationHistoryItem {
  id: string;
  graph_id: string;
  training_run_id: string | null;

  model: string;

  beta: number;
  gamma: number;
  days: number;

  created_at: string;
}

/* ---------------------------------------
 * Stored Simulation
 * ------------------------------------- */

export interface SimulationRun {
  id: string;
  graph_id: string;
  training_run_id: string | null;

  model: string;

  beta: number;
  gamma: number;
  days: number;

  created_at: string;

  history: SimulationStep[];
}

/* ---------------------------------------
 * Summary
 * ------------------------------------- */

export interface SimulationSummary {
  graph_id: string;
  graph_name: string;

  nodes: number;
  edges: number;
  density: number;
  connected_components: number;
}

/* ---------------------------------------
 * API
 * ------------------------------------- */

export const SimulationAPI = {
  run(data: SimulationRequest) {
    return api.post<SimulationResponse>(
      "/simulation/run",
      data
    );
  },

  runDefault(graphId: string) {
    return api.post<SimulationResponse>(
      `/simulation/default/${graphId}`
    );
  },

  summary(graphId: string) {
    return api.get<SimulationSummary>(
      `/simulation/summary/${graphId}`
    );
  },

  history(graphId: string) {
    return api.get<SimulationHistoryItem[]>(
      `/simulation/history/${graphId}`
    );
  },

  getRun(runId: string) {
    return api.get<SimulationRun>(
      `/simulation/run/${runId}`
    );
  },

  deleteRun(runId: string) {
    return api.delete(
      `/simulation/run/${runId}`
    );
  },

  health() {
    return api.get("/simulation/health");
  },
};