import { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-950">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-teal-100 p-3 text-teal-700">
          {icon}
        </div>

      </div>

    </div>
  );
}
