"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  TrainingAPI,
  TrainModelRequest,
} from "@/lib/api/training";

/* ========================================
   Train Model
======================================== */

export function useTrainModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: TrainModelRequest
    ) => TrainingAPI.train(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "training-runs",
          variables.graph_id,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}

/* ========================================
   Training Runs
======================================== */

export function useTrainingRuns(
  graphId: string
) {
  return useQuery({
    queryKey: [
      "training-runs",
      graphId,
    ],

    queryFn: async () => {
      const response =
        await TrainingAPI.getGraphRuns(
          graphId
        );

      return response.data;
    },

    enabled: !!graphId,
  });
}

/* ========================================
   Single Training Run
======================================== */

export function useTrainingRun(
  runId: string
) {
  return useQuery({
    queryKey: [
      "training-run",
      runId,
    ],

    queryFn: async () => {
      const response =
        await TrainingAPI.getRun(runId);

      return response.data;
    },

    enabled: !!runId,
  });
}

/* ========================================
   Training History
======================================== */

export function useTrainingHistory(
  runId: string
) {
  return useQuery({
    queryKey: [
      "training-history",
      runId,
    ],

    queryFn: async () => {
      const response =
        await TrainingAPI.getHistory(
          runId
        );

      return response.data;
    },

    enabled: !!runId,
  });
}