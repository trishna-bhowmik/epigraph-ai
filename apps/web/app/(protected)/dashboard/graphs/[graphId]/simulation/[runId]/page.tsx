"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  SimulationAPI,
  SimulationRun,
} from "@/lib/api/simulation";

import SimulationStats from "@/components/simulation/SimulationStats";
import SimulationTimelineChart from "@/components/simulation/SimulationTimelineChart";
import SimulationTable from "@/components/simulation/SimulationTable";

export default function SimulationReplayPage() {
  const params = useParams();

  const runId = params.runId as string;

  const [loading, setLoading] = useState(true);
  const [simulation, setSimulation] =
    useState<SimulationRun | null>(null);

  useEffect(() => {
    loadSimulation();
  }, [runId]);

  async function loadSimulation() {
    try {
      setLoading(true);

      const res = await SimulationAPI.getRun(runId);

      setSimulation(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading simulation...
      </div>
    );
  }

  if (!simulation) {
    return (
      <div className="text-center py-10">
        Simulation not found.
      </div>
    );
  }

  const latest =
    simulation.history[simulation.history.length - 1];

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Simulation Replay
      </h1>

      <div className="rounded-lg border p-5">
        <p>
          <strong>Model:</strong> {simulation.model}
        </p>

        <p>
          <strong>β:</strong> {simulation.beta}
        </p>

        <p>
          <strong>γ:</strong> {simulation.gamma}
        </p>

        <p>
          <strong>Days:</strong> {simulation.days}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(simulation.created_at).toLocaleString()}
        </p>
      </div>

      <SimulationStats
        susceptible={latest?.susceptible ?? 0}
        infected={latest?.infected ?? 0}
        recovered={latest?.recovered ?? 0}
        reproductionNumber={
          simulation.beta / simulation.gamma
        }
      />

      <SimulationTimelineChart
        history={simulation.history.map((item) => ({
          step: item.day,
          susceptible: item.susceptible,
          infected: item.infected,
          recovered: item.recovered,
        }))}
      />

      <SimulationTable
        history={simulation.history}
      />

    </div>
  );
}