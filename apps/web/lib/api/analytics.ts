import { GraphAPI } from "@/lib/api/graphs";
import { PredictionAPI } from "@/lib/api/prediction";
import { SimulationAPI } from "@/lib/api/simulation";

export const AnalyticsAPI = {

  graph(graphId: string) {
    return GraphAPI.analytics(graphId);
  },

  predictions(graphId: string) {
    return PredictionAPI.history(graphId);
  },

  simulations(graphId: string) {
    return SimulationAPI.history(graphId);
  },

};