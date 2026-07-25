"use client";

import { useQuery } from "@tanstack/react-query";

import {
  DashboardAPI,
} from "@/lib/api/dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: [
      "dashboard",
    ],

    queryFn: async () => {
      const response =
        await DashboardAPI.getStats();

      return response.data;
    },
  });
}