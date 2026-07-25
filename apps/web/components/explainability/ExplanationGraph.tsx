"use client";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  important?: boolean;
  target?: boolean;
}

interface GraphEdge {
  source: string;
  target: string;
  important?: boolean;
}

interface ExplanationGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export default function ExplanationGraph({
  nodes,
  edges,
}: ExplanationGraphProps) {

  const findNode = (id: string) =>
    nodes.find((node) => node.id === id);

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Explanation Graph
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Important nodes and edges highlighted by GNNExplainer.
        </p>

      </div>

      <div className="relative h-[600px] rounded-2xl border bg-slate-50">

        {/* Edges */}

        <svg
          className="absolute inset-0 h-full w-full"
        >

          {edges.map((edge, index) => {

            const source = findNode(
              edge.source
            );

            const target = findNode(
              edge.target
            );

            if (!source || !target)
              return null;

            return (

              <line
                key={index}
                x1={`${source.x}%`}
                y1={`${source.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={
                  edge.important
                    ? "#ef4444"
                    : "#94a3b8"
                }
                strokeWidth={
                  edge.important
                    ? 4
                    : 2
                }
              />

            );

          })}

        </svg>

        {/* Nodes */}

        {nodes.map((node) => {

          let color =
            "bg-slate-400";

          if (node.important) {
            color =
              "bg-blue-800";
          }

          if (node.target) {
            color =
              "bg-green-600";
          }

          return (

            <div
              key={node.id}
              className={`absolute flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg transition-all hover:scale-110 ${color}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform:
                  "translate(-50%, -50%)",
              }}
            >
              {node.id}
            </div>

          );

        })}

      </div>

      {/* Legend */}

      <div className="mt-8 flex flex-wrap gap-8">

        <div className="flex items-center gap-3">

          <div className="h-4 w-4 rounded-full bg-green-600" />

          <span>Target Node</span>

        </div>

        <div className="flex items-center gap-3">

          <div className="h-4 w-4 rounded-full bg-blue-800" />

          <span>Important Node</span>

        </div>

        <div className="flex items-center gap-3">

          <div className="h-4 w-4 rounded-full bg-slate-400" />

          <span>Other Node</span>

        </div>

        <div className="flex items-center gap-3">

          <div className="h-1 w-10 bg-red-500" />

          <span>Important Edge</span>

        </div>

      </div>

    </div>

  );

}