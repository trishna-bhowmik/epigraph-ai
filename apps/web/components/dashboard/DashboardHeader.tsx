import { Sparkles } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-teal-800 p-8 text-white shadow-2xl shadow-indigo-950/20">

      <div className="flex items-center gap-3">

        <Sparkles size={32} />

        <div>

          <h1 className="text-3xl font-bold">
            EpiGraph AI Dashboard
          </h1>

          <p className="mt-2 text-indigo-100">
            Monitor projects, datasets, graphs and GNN training from one place.
          </p>

        </div>

      </div>

    </div>
  );
}
