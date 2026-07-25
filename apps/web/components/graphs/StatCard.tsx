"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          {value}
        </h2>

      </CardContent>
    </Card>
  );
}