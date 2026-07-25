import {
  Brain,
  Trophy,
} from "lucide-react";

import type {
  RecentTraining,
} from "@/lib/api/dashboard";

interface Props {
  training: RecentTraining[];
}

export default function RecentTraining({
  training,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Training Runs
      </h2>

      <div className="space-y-4">

        {training.length === 0 && (
          <p className="text-gray-500">
            No training runs yet.
          </p>
        )}

        {training.map((run) => (

          <div
            key={run.id}
            className="rounded-xl border p-4"
          >

            <div className="mb-3 flex items-center gap-2">

              <Brain
                className="text-blue-600"
                size={18}
              />

              <span className="font-semibold">
                {run.model_name}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-lg bg-gray-100 p-3">

                <div className="flex items-center gap-2">

                  <Trophy
                    size={16}
                    className="text-green-600"
                  />

                  <span className="text-sm">
                    Accuracy
                  </span>

                </div>

                <p className="mt-2 text-xl font-bold">

                  {(run.accuracy * 100).toFixed(2)}%

                </p>

              </div>

              <div className="rounded-lg bg-gray-100 p-3">

                <span className="text-sm">
                  Loss
                </span>

                <p className="mt-2 text-xl font-bold">
                  {run.loss.toFixed(4)}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}