"use client";

interface CentralityItem {
  node: string;
  score: number;
}

interface Props {
  title: string;
  data: CentralityItem[];
}

export default function CentralityChart({
  title,
  data,
}: Props) {
  const entries = [...data]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const max =
    entries.length > 0
      ? Math.max(...entries.map((e) => e.score), 1)
      : 1;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        {title}
      </h2>

      <div className="space-y-4">
        {entries.map((item) => (
  <div key={item.node}>
    <div className="mb-1 flex justify-between text-sm">
      <span>{item.node}</span>
      <span>{item.score.toFixed(3)}</span>
    </div>

    <div className="h-3 rounded bg-slate-200">
      <div
        className="h-3 rounded bg-blue-800"
        style={{
          width: `${(item.score / max) * 100}%`,
        }}
      />
    </div>
  </div>
))}
      </div>
    </div>
  );
}