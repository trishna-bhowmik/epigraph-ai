"use client";

interface SimulationDay {
  day: number;
  susceptible: number;
  infected: number;
  recovered: number;
}

interface Props {
  history: SimulationDay[];
}

export default function SimulationTable({
  history,
}: Props) {

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold">

          Simulation History

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Disease spread statistics over time

        </p>

      </div>

      {history.length === 0 && (

        <div className="p-12 text-center text-slate-500">

          No simulation history available.

        </div>

      )}

      {history.length > 0 && (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Day
                </th>

                <th className="px-6 py-4 text-left text-green-600">
                  Susceptible
                </th>

                <th className="px-6 py-4 text-left text-red-600">
                  Infected
                </th>

                <th className="px-6 py-4 text-left text-blue-600">
                  Recovered
                </th>

                <th className="px-6 py-4 text-left">
                  Population
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((item)=>{

                const total =
                  item.susceptible +
                  item.infected +
                  item.recovered;

                return(

                  <tr
                    key={item.day}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {item.day}
                    </td>

                    <td className="px-6 py-4 text-green-600">
                      {item.susceptible}
                    </td>

                    <td className="px-6 py-4 text-red-600">
                      {item.infected}
                    </td>

                    <td className="px-6 py-4 text-blue-600">
                      {item.recovered}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {total}
                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}