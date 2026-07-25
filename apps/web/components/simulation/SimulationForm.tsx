"use client";

import { useState } from "react";

interface Props {
  onRun: (
    initialInfected: number,
    beta: number,
    gamma: number,
    steps: number
  ) => void;
  loading?: boolean;
}

export default function SimulationForm({
  onRun,
  loading,
}: Props) {
  const [initialInfected, setInitialInfected] =
    useState(5);

  const [beta, setBeta] =
    useState(0.3);

  const [gamma, setGamma] =
    useState(0.1);

  const [steps, setSteps] =
    useState(30);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Disease Spread Simulation
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div>

          <label className="font-medium">
            Initial Infected Count
          </label>

          <input
            type="number"
            min={1}
            value={initialInfected}
            onChange={(e)=>
              setInitialInfected(
                Number(e.target.value)
              )
            }
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="font-medium">
            Transmission Rate (β)
          </label>

          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={beta}
            onChange={(e)=>
              setBeta(
                Number(e.target.value)
              )
            }
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="font-medium">
            Recovery Rate (γ)
          </label>

          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={gamma}
            onChange={(e)=>
              setGamma(
                Number(e.target.value)
              )
            }
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="font-medium">
            Simulation Steps
          </label>

          <input
            type="number"
            min={1}
            value={steps}
            onChange={(e)=>
              setSteps(
                Number(e.target.value)
              )
            }
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <button
        onClick={()=>
          onRun(
            initialInfected,
            beta,
            gamma,
            steps
          )
        }
        disabled={loading}
        className="mt-8 rounded-xl bg-blue-800 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Running Simulation..."
          : "Run Simulation"}
      </button>

    </div>
  );
}