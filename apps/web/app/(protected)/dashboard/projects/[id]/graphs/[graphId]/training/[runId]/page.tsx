"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  TrainingAPI,
  TrainingRunResponse,
} from "@/lib/api/training";

import TrainingRunHeader from "@/components/training/TrainingRunHeader";
import TrainingMetricsCards from "@/components/training/TrainingMetricsCards";
import LossChart from "@/components/training/LossChart";
import AccuracyChart from "@/components/training/AccuracyChart";
import EpochHistoryTable from "@/components/training/EpochHistoryTable";

export default function TrainingRunPage() {
  const router = useRouter();
  const params = useParams();

  const runId = params.runId as string;

  const [loading, setLoading] = useState(true);

  const [run, setRun] =
    useState<TrainingRunResponse | null>(null);

  useEffect(() => {
    loadRun();
  }, [runId]);

  async function loadRun() {
    try {
      setLoading(true);

      const res =
        await TrainingAPI.getRun(runId);

      setRun(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading training run...
      </div>
    );
  }

  if (!run) {
    return (
      <div className="py-20 text-center">
        Training run not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <TrainingRunHeader
        run={run.training_run}
        onBack={() => router.back()}
      />

      <TrainingMetricsCards
        metrics={run.metrics}
      />

      <LossChart
        history={run.history}
      />

      <AccuracyChart
        history={run.history}
      />

      <EpochHistoryTable
        history={run.history}
      /> 

   

    </div>
  );
}