import {
  Database,
  FolderKanban,
  Network,
  Brain,
} from "lucide-react";

import type { DashboardOverview } from "@/lib/api/dashboard";

import StatsCard from "./StatsCard";

interface Props {
  overview: DashboardOverview;
}

export default function OverviewCards({
  overview,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Projects"
        value={overview.projects}
        icon={<FolderKanban />}
      />

      <StatsCard
        title="Datasets"
        value={overview.datasets}
        icon={<Database />}
      />

      <StatsCard
        title="Graphs"
        value={overview.graphs}
        icon={<Network />}
      />

      <StatsCard
        title="Training Runs"
        value={overview.training_runs}
        icon={<Brain />}
      />

    </div>
  );
}