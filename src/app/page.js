import Hero from '@/app/components/landing/hero';
import GravityField from '@/app/components/interactions/gravityField';
import Marquee from './components/interactions/marquee';

export default function Home() {
  return (
    <>
    <>
      <GravityField />

      <main className="relative z-10">
        <Hero />
        <Marquee />
      </main>
    </>

    </>
  );
}
