import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Workflow from "@/components/landing/Workflow";
import Docs from "@/components/landing/Docs";
import DashboardPreview from "@/components/dashboard-preview/DashboardPreview";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <Docs />
        <DashboardPreview />
      </main>
    </>
  );
}
