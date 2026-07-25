"use client";

type Props = {
  nodes: {
    node: string;
    degree: number;
  }[];
};

export default function TopDegreeNodes({
  nodes,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Top Degree Nodes
      </h2>

      <table className="min-w-full">

        <thead>

          <tr>

            <th className="pb-3 text-left">
              Node
            </th>

            <th className="pb-3 text-right">
              Degree
            </th>

          </tr>

        </thead>

        <tbody>

          {nodes.map((node) => (
            <tr
              key={node.node}
              className="border-t"
            >
              <td className="py-3">
                {node.node}
              </td>

              <td className="py-3 text-right font-semibold">
                {node.degree}
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}