const stats = [
  {
    value: "120+",
    label: "Datasets",
  },
  {
    value: "8",
    label: "AI Models",
  },
  {
    value: "50+",
    label: "Regions",
  },
  {
    value: "<2 min",
    label: "Analysis",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-3xl font-bold text-blue-600">
            {stat.value}
          </h3>

          <p className="mt-2 text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}