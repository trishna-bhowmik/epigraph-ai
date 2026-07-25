"use client";

import { useQuery } from "@tanstack/react-query";

import { TrainingAPI } from "@/lib/api/training";

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
                await TrainingAPI.getHistory(runId);

            return response.data;
        },

        enabled: !!runId,

    });

}