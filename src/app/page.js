import Hero from "@/app/components/landing/hero";
import ServicesOverview from "./components/services/servicesOverviewReveal";
import SelectedWork from "./components/landing/selectedWork/selectedWork";
import AboutOverview from "./components/landing/aboutOverview/aboutOverview";
import WaterRippleQuote from "./components/interactions/waterRippleQuote";
import PageCta from "./components/layout/footer/pageCTA";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <SelectedWork />
      <AboutOverview />
      <WaterRippleQuote />
      <PageCta
        eyebrow="HAVE A PROJECT IN MIND?"
        title="Let's make something"
        highlightText="matter."
        description="Good ideas deserve thoughtful execution. Tell us what you're building."
      />
    </>
  );
}