"use client";

import {
  Activity,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface Props {
  susceptible: number;
  infected: number;
  recovered: number;
  reproductionNumber: number;
}

export default function SimulationStats({
  susceptible,
  infected,
  recovered,
  reproductionNumber,
}: Props) {

  const cards = [

    {
      title: "Healthy",
      value: susceptible,
      color: "text-green-600",
      bg: "bg-green-100",
      icon: ShieldCheck,
    },

    {
      title: "Infected",
      value: infected,
      color: "text-red-600",
      bg: "bg-red-100",
      icon: Activity,
    },

    {
      title: "Recovered",
      value: recovered,
      color: "text-blue-600",
      bg: "bg-blue-100",
      icon: HeartPulse,
    },

    {
      title: "R₀",
      value: reproductionNumber.toFixed(2),
      color: "text-purple-600",
      bg: "bg-purple-100",
      icon: TrendingUp,
    },

  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">

                  {card.title}

                </p>

                <h2 className="mt-3 text-3xl font-bold">

                  {card.value}

                </h2>

              </div>

              <div
                className={`rounded-2xl p-3 ${card.bg}`}
              >

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