import {
  Card,
  CardContent,
} from "@/components/ui/Card";
import { TrainingSummary } from "@/lib/api/training";

interface Props {
  summary: TrainingSummary;
}

export default function TrainingSummaryCards({
  summary,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <Card>
        <CardContent>

          <p className="text-sm text-slate-500">
            Total Runs
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {summary.total_runs}
          </h2>

        </CardContent>
      </Card>

      <Card>
        <CardContent>

          <p className="text-sm text-slate-500">
            Best Accuracy
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {(summary.best_accuracy * 100).toFixed(2)}%
          </h2>

        </CardContent>
      </Card>

      <Card>
        <CardContent>

          <p className="text-sm text-slate-500">
            Best Model
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {summary.best_model ?? "-"}
          </h2>

        </CardContent>
      </Card>

      <Card>
        <CardContent>

          <p className="text-sm text-slate-500">
            Latest Training
          </p>

          <h2 className="mt-2 text-sm font-medium">
            {summary.latest_training
              ? new Date(summary.latest_training).toLocaleString()
              : "-"}
          </h2>

        </CardContent>
      </Card>

    </div>
  );
}