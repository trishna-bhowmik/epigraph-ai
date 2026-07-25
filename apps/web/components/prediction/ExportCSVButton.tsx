"use client";

import { saveAs } from "file-saver";
import { PredictionResponse } from "@/lib/api/prediction";

interface Props {
  prediction: PredictionResponse;
}

export default function ExportCSVButton({ prediction }: Props) {
  function exportCSV() {
    const headers = [
      "Node",
      "Predicted Class",
      "Confidence (%)",
    ];

    const rows = prediction.predictions.map((item) => [
      item.node_index,
      item.predicted_class,
      (item.confidence * 100).toFixed(2),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "prediction_results.csv");
  }

  return (
    <button
      onClick={exportCSV}
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
    >
      Export CSV
    </button>
  );
}