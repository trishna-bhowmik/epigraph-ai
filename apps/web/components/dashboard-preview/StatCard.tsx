import {
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: LucideIcon;
}

export default function StatCard({
  title,
  value,
  trend,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Background Glow */}

      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

        </div>

        {Icon && (
          <div className="rounded-2xl bg-blue-50 p-3 transition-colors group-hover:bg-blue-100">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        )}

      </div>

      {/* Footer */}

      {trend && (
        <div className="relative mt-6 flex items-center gap-2">

          <div className="flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

            <ArrowUpRight className="mr-1 h-4 w-4" />

            {trend}

          </div>

          <span className="text-sm text-slate-500">
            vs last month
          </span>

        </div>
      )}

    </div>
  );
}