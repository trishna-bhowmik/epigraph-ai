import { PredictionResponse } from "@/lib/api/prediction";

interface Props {
  prediction: PredictionResponse;
}

export default function PredictionSummary({ prediction }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

      <div className="rounded-xl border bg-white p-5">
        <p className="text-sm text-slate-500">Model</p>
        <h2 className="mt-2 text-2xl font-bold">
          {prediction.model}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <p className="text-sm text-slate-500">Nodes</p>
        <h2 className="mt-2 text-2xl font-bold">
          {prediction.total_nodes}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Average Confidence
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {(prediction.average_confidence * 100).toFixed(2)}%
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Classes
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {Object.keys(
            prediction.class_distribution
          ).length}
        </h2>
      </div>

    </div>
  );
}