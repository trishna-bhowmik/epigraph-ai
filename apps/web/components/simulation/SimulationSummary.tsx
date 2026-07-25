"use client";

import { Users, Activity, CalendarDays, TrendingUp } from "lucide-react";
import { SimulationStatistics } from "@/lib/api/simulation";

interface Props {
  statistics: SimulationStatistics;
}

export default function SimulationSummary({
  statistics,
}: Props) {
  const cards = [
    {
      title: "Population",
      value: statistics.population,
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Peak Infected",
      value: statistics.peak_infected,
      icon: Activity,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Peak Day",
      value: statistics.peak_day,
      icon: CalendarDays,
      bg: "bg-amber-100",
      color: "text-amber-600",
    },
    {
      title: "Peak %",
      value: `${statistics.peak_percentage}%`,
      icon: TrendingUp,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Recovered",
      value: statistics.total_recovered,
      icon: Activity,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Attack Rate",
      value: `${statistics.attack_rate}%`,
      icon: TrendingUp,
      bg: "bg-pink-100",
      color: "text-pink-600",
    },
    {
      title: "Remaining Susceptible",
      value: statistics.remaining_susceptible,
      icon: Users,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },
    {
      title: "Duration",
      value: `${statistics.epidemic_duration} Days`,
      icon: CalendarDays,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div className={`${card.bg} rounded-2xl p-3`}>
                <Icon
                  className={`h-6 w-6 ${card.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}