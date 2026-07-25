"use client";

import { useEffect, useState } from "react";

interface NodeState {
  id: string;
  status: "susceptible" | "infected" | "recovered";
  x: number;
  y: number;
}

interface Props {
  timeline: NodeState[][];
  interval?: number;
}

export default function NetworkSimulation({
  timeline,
  interval = 1000,
}: Props) {

  const [step, setStep] = useState(0);

  useEffect(() => {

    if (timeline.length === 0) return;

    const timer = setInterval(() => {

      setStep((current) => {

        if (current >= timeline.length - 1) {
          return 0;
        }

        return current + 1;

      });

    }, interval);

    return () => clearInterval(timer);

  }, [timeline, interval]);

  const nodes = timeline[step] ?? [];

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Network Simulation

          </h2>

          <p className="text-sm text-slate-500">

            Disease spread animation

          </p>

        </div>

        <div className="rounded-xl bg-blue-100 px-4 py-2 text-blue-700 font-semibold">

          Step {step + 1}

        </div>

      </div>

      <div className="relative h-[500px] rounded-2xl border bg-slate-50">

        {nodes.map((node) => {

          let color =
            "bg-green-500";

          if (
            node.status === "infected"
          ) {

            color =
              "bg-red-500";

          }

          if (
            node.status === "recovered"
          ) {

            color =
              "bg-blue-500";

          }

          return (

            <div
              key={node.id}
              title={node.id}
              className={`absolute h-5 w-5 rounded-full transition-all duration-700 ${color}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            />

          );

        })}

      </div>

      <div className="mt-6 flex gap-8">

        <div className="flex items-center gap-2">

          <div className="h-4 w-4 rounded-full bg-green-500"/>

          Healthy

        </div>

        <div className="flex items-center gap-2">

          <div className="h-4 w-4 rounded-full bg-red-500"/>

          Infected

        </div>

        <div className="flex items-center gap-2">

          <div className="h-4 w-4 rounded-full bg-blue-500"/>

          Recovered

        </div>

      </div>

    </div>

  );

}