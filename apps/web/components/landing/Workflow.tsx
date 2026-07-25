import Container from "../layout/Container";
import Section from "../layout/Section";
import WorkflowCard from "./WorkflowCard";

import { WORKFLOW } from "@/lib/workflow";

export default function Workflow() {
  return (
    <Section id="workflow" className="bg-indigo-950 text-white">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.18em] text-teal-300">
            Workflow
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            How EpiGraph AI Works
          </h2>

          <p className="mt-6 text-lg text-indigo-200">
            From raw epidemiological data to explainable predictions in a
            streamlined AI pipeline.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {WORKFLOW.map((step, index) => (
            <WorkflowCard
              key={step.title}
              {...step}
              isLast={index === WORKFLOW.length - 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
