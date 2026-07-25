import Container from "../layout/Container";
import Section from "../layout/Section";
import FeatureCard from "./FeatureCard";

import { FEATURES } from "@/lib/features";

export default function Features() {
  return (
    <Section id="features">
      <Container>

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="font-semibold tracking-[0.18em] text-teal-700">
            FEATURES
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Everything You Need
            <br />
            In One Platform
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            From dataset upload to AI-powered prediction,
            EpiGraph AI provides an end-to-end workflow for
            epidemiological analysis.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </Container>
    </Section>
  );
}
