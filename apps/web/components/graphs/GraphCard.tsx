"use client";

type Props = {
  graph: any;
};

export default function GraphCard({
  graph,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        {graph.name}
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-4">

        <div>

          <p className="text-sm text-slate-500">
            Nodes
          </p>

          <p className="text-xl font-bold">
            {graph.nodes}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Edges
          </p>

          <p className="text-xl font-bold">
            {graph.edges}
          </p>

        </div>

      </div>

    </div>
  );
}