"use client";

import { useEffect, useState } from "react";

import { DashboardAPI } from "@/lib/api/dashboard";
import type {
  DashboardOverview,
  RecentProject,
  RecentTraining as RecentTrainingType,
  DashboardCharts,
} from "@/lib/api/dashboard";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewCards from "@/components/dashboard/OverviewCards";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentTraining from "@/components/dashboard/RecentTraining";
import DashboardChartsSection from "@/components/dashboard/DashboardCharts";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [projects, setProjects] = useState<RecentProject[]>([]);
const [training, setTraining] = useState<RecentTrainingType[]>([]);
  const [charts, setCharts] = useState<DashboardCharts | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          overviewData,
          projectData,
          trainingData,
          chartData,
        ] = await Promise.all([
          DashboardAPI.overview(),
          DashboardAPI.projects(),
          DashboardAPI.training(),
          DashboardAPI.charts(),
        ]);

        setOverview(overviewData);
        setProjects(projectData);
        setTraining(trainingData);
        setCharts(chartData);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <DashboardHeader />

      {overview && (
        <OverviewCards overview={overview} />
      )}

      <QuickActions />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <RecentProjects
          projects={projects}
        />

        <RecentTraining
          training={training}
        />

      </div>

      {charts && (
        <DashboardChartsSection
          charts={charts}
        />
      )}

    </div>
  );
}