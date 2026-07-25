import Container from "../layout/Container";
import Section from "../layout/Section";

import PredictionCard from "./PredictionCard";
import NetworkPreview from "./NetworkPreview";
import StatCard from "./StatCard";
import TrendChart from "./TrendChart";

export default function DashboardPreview() {
  return (
    <Section>
      <Container>

        <div className="mb-16 text-center">

          <p className="font-semibold text-blue-600">
            DASHBOARD
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Powerful Analytics
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Everything you need for AI-powered epidemiological analysis.
          </p>

        </div>

        <div className="grid gap-6">

          <div className="grid gap-6 md:grid-cols-4">

            <StatCard
              title="Datasets"
              value="120+"
            />

            <StatCard
              title="Predictions"
              value="25K"
            />

            <StatCard
              title="Regions"
              value="50+"
            />

            <StatCard
              title="Models"
              value="8"
            />

          </div>

          <TrendChart />

          <NetworkPreview />

          <PredictionCard />

        </div>

      </Container>
    </Section>
  );
}