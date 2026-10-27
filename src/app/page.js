import Hero from '@/app/components/landing/hero';
import GravityField from '@/app/components/interactions/gravityField';
import ServicesOverview from './components/landing/serviceReveal/servicesOverviewReveal';
import SelectedWork from './components/landing/selectedWork/selectedWork';

export default function Home() {
  return (
    <>
    <>
      {/* <GravityField /> */}

      <main className="relative z-10">
        <Hero />
        <ServicesOverview />
        <SelectedWork />
      </main>
    </>

    </>
  );
}
