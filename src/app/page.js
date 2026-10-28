import Hero from "@/app/components/landing/hero";
import ServicesOverview from "./components/landing/serviceReveal/servicesOverviewReveal";
import SelectedWork from "./components/landing/selectedWork/selectedWork";

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
    </>
  );
}