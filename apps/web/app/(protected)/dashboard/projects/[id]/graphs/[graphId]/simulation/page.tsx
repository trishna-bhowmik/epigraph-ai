"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  SimulationAPI,
  SimulationResponse,
} from "@/lib/api/simulation";


import SimulationForm from "@/components/simulation/SimulationForm";
import SimulationStats from "@/components/simulation/SimulationStats";
import SimulationTimelineChart from "@/components/simulation/SimulationTimelineChart";
import SimulationTable from "@/components/simulation/SimulationTable";
import SimulationSummary from "@/components/simulation/SimulationSummary";

export default function SimulationPage() {

  const params = useParams();

  const graphId = params.graphId as string;

  const [loading, setLoading] = useState(false);

  const [simulation, setSimulation] =
    useState<SimulationResponse | null>(null);



  async function handleRun(
  initialInfected: number,
  beta: number,
  gamma: number,
  steps: number
) {
    try {

      setLoading(true);

      const res =
        await SimulationAPI.run({

          graph_id: graphId,

          beta,

          gamma,

          steps,

          initial_infected: initialInfected

        });

      setSimulation(res.data);
   

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }



  

  return (

    <div className="space-y-8">

      <h1 className="text-3xl font-bold">

        Disease Spread Simulation

      </h1>

      <SimulationForm
        onRun={handleRun}
        loading={loading}
      />

      {simulation && (
    <SimulationSummary
        statistics={simulation.statistics}
    />
)}

      {simulation && (

        <>

          <SimulationStats

            susceptible={
              simulation.history.at(-1)
                ?.susceptible ?? 0
            }

            infected={
              simulation.history.at(-1)
                ?.infected ?? 0
            }

            recovered={
              simulation.history.at(-1)
                ?.recovered ?? 0
            }

            reproductionNumber={
              simulation.beta /
              simulation.gamma
            }

          />

          <SimulationTimelineChart

            history={simulation.history.map(
              (item) => ({

                step: item.day,

                susceptible:
                  item.susceptible,

                infected:
                  item.infected,

                recovered:
                  item.recovered,

              })
            )}

          />

          <SimulationTable
  history={simulation.history}
/>

        </>

      )}

    </div>




  );

}