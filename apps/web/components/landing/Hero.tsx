import Container from "../layout/Container";
import Section from "../layout/Section";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-teal-50/30">
      <Container>
        <div className="mx-auto max-w-5xl text-center">

          <HeroBadge />

          <h1 className="mt-8 text-5xl font-extrabold leading-[1.04] tracking-tight text-indigo-950 md:text-7xl">
            Predict Disease Spread
            <br />
            Before It Happens
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Upload epidemiological datasets, construct graph networks,
            analyze transmission patterns, and generate explainable AI
            predictions from a single intelligent platform.
          </p>

          <HeroButtons />

          <HeroStats />

          <HeroIllustration />

        </div>
      </Container>
    </Section>
  );
}
