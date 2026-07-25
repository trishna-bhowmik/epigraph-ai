import Container from "../layout/Container";
import Section from "../layout/Section";

const guides = [
  ["01", "Create a project", "Group datasets, graphs, models, and reports in one workspace."],
  ["02", "Build a graph", "Convert your epidemiological dataset into a connected network."],
  ["03", "Train and analyze", "Train a GNN, inspect predictions, and export a complete report."],
];

export default function Docs() {
  return (
    <Section id="docs" className="bg-white/70">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Getting started</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-indigo-950 md:text-5xl">A focused workflow for every analysis.</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">Move from raw disease data to interpretable graph-AI results without losing track of your project history.</p>
          </div>
          <ol className="space-y-4">
            {guides.map(([number, title, description]) => (
              <li key={number} className="flex gap-5 rounded-3xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-950 text-sm font-bold text-teal-200">{number}</span>
                <div><h3 className="font-semibold text-indigo-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
