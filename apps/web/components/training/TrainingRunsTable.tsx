"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/Button";

import { TrainingRun } from "@/lib/api/training";

interface Props {
  runs: TrainingRun[];
  loading: boolean;
  graphId: string;
  projectId: string;
  onDelete: (id: string) => void;
}

export default function TrainingRunsTable({
  runs,
  loading,
  graphId,
  projectId,
  onDelete,
}: Props) {

  if (loading) {
    return <p>Loading...</p>;
  }

  if (runs.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">

        <h2 className="text-xl font-semibold">
          No Training Runs
        </h2>

        <p className="mt-2 text-muted-foreground">
          Train your first Graph Neural Network.
        </p>

      </div>
    );
  }

  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Model</TableHead>

          <TableHead>Accuracy</TableHead>

          <TableHead>Loss</TableHead>

          <TableHead>Epochs</TableHead>

          <TableHead>Created</TableHead>

          <TableHead></TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {runs.map((run) => (

          <TableRow key={run.id}>

            <TableCell>{run.model_name}</TableCell>

            <TableCell>
              {(run.accuracy * 100).toFixed(2)}%
            </TableCell>

            <TableCell>
              {run.loss.toFixed(4)}
            </TableCell>

            <TableCell>{run.epochs}</TableCell>

            <TableCell>
              {new Date(run.created_at).toLocaleDateString()}
            </TableCell>

            <TableCell className="flex gap-2">

              <Link
  href={`/dashboard/projects/${projectId}/graphs/${graphId}/training/${run.id}`}
>
  <Button variant="outline">
    View
  </Button>
</Link>

              <Button
                variant="destructive"
                onClick={() => onDelete(run.id)}
              >
                Delete
              </Button>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>
  );
}