
import Link from "next/link";
import AboutOverviewReveal from "./aboutOverviewReveal";

const principles = [
  {
    number: "01",
    title: "Think beyond the brief.",
    description:
      "We understand your business, your audience, and the purpose behind every digital decision.",
  },
  {
    number: "02",
    title: "Make every detail matter.",
    description:
      "Distinctive typography, considered layouts, and purposeful interactions give your brand its own character.",
  },
  {
    number: "03",
    title: "Build for the real world.",
    description:
      "Responsive interfaces, accessible experiences, and performance-conscious development create a stronger online presence.",
  },
];

// Reuse the Webli Studio SVG mark from your header.
function WebliMark() {
  return (
    <svg
      viewBox="164 372 1649 1349"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute -right-8 -top-12 h-auto w-[clamp(16rem,42vw,38rem)] translate-x-[12%] -translate-y-[8%] text-white/[0.035]"
    >
      <path d="m 1061.0914,1714.5407 c -2.324,-1.1504 -5.1433,-3.5766 -6.265,-5.3916 -1.6596,-2.6853 -5.1956,-24.1102 -18.9857,-115.0355 -9.3204,-61.4545 -17.0845,-111.8738 -17.2535,-112.0428 -0.8623,-0.8623 -43.73912,-11.9602 -194.77022,-50.4127 -91.025,-23.1749 -169.79218,-43.4445 -175.03819,-45.0435 -14.37677,-4.3821 -26.70194,-13.0961 -34.33066,-24.2721 -1.95547,-2.8647 -103.09689,-221.2086 -224.75871,-485.20859 -172.83751,-375.0486 -221.29829,-481.0494 -221.63775,-484.79983 -0.59077,-6.52695 2.80573,-11.78634 9.1849,-14.22256 l 4.52811,-1.7293 182.27615,46.63109 c 100.25188,25.6471 184.34589,47.2618 186.87558,48.0327 6.46575,1.9704 14.38686,6.1353 20.6227,10.8434 12.61023,9.5208 4.85706,-6.3772 140.49134,288.0802 68.6977,149.1404 135.5362,294.23389 148.53,322.42999 12.99381,28.1962 23.91245,50.9212 24.26365,50.5 0.35119,-0.4211 20.55261,-68.2657 44.89202,-150.76569 24.33942,-82.5 45.45666,-152.4647 46.92716,-155.4771 7.3501,-15.0568 26.84732,-26.1496 43.53982,-24.7717 3.9185,0.3235 41.1675,10.8796 103.1339,29.2274 53.35,15.7965 97.1487,28.8623 97.3305,29.0351 0.1818,0.1727 -2.4281,3.7854 -5.7997,8.0282 -35.5437,44.728 -65.5279,118.8935 -79.4254,196.45809 -4.6427,25.9116 -9.3563,70.6097 -8.4511,80.1395 l 0.3457,3.6395 37.0092,-35.6395 c 191.1119,-184.03869 559.4171,-538.05889 561.4145,-539.63949 1.9703,-1.5591 4.0365,-2 9.3736,-2 6.7134,0 6.9195,0.079 10.6261,4.0522 2.1718,2.3283 4.0491,5.519 4.4128,7.5 0.3482,1.8963 13.7203,89.6228 29.7159,194.9478 26.0213,171.3404 29.0354,192.4474 28.6311,200.5 -0.5075,10.1084 -3.252,18.86509 -8.806,28.09619 -2.6032,4.3266 -65.4869,65.3583 -274.3772,266.2962 -149.05,143.3758 -310.7333,298.9162 -359.2961,345.6454 -52.9948,50.9937 -89.777,85.6514 -92,86.686 -4.8953,2.2782 -7.832,2.2062 -12.9295,-0.317 z" />
    </svg>
  );
}

export default function AboutOverview() {
  return (
    <AboutOverviewReveal
      id="about-overview"
      aria-labelledby="about-overview-heading"
      className="section-spacing relative overflow-clip bg-[#080808] text-[#f5f5f5]"
    >
      <div className="container-site">
        {/* Section introduction */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#262626] pb-5 sm:flex-row sm:items-center">
          <p
            data-about="eyebrow"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#929292] md:text-xs"
          >
            A little about us · Webli Studio
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#929292]">
            Independent digital studio / India · Worldwide
          </p>
        </div>

        {/* Editorial heading */}
        <div className="about-overview__hero grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-32">
          <div className="lg:col-span-9">
            <h2
              id="about-overview-heading"
              className="max-w-6xl text-balance text-[clamp(3rem,8.5vw,8.5rem)] font-medium leading-[0.91] tracking-[-0.075em]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  data-about="title-line"
                  className="block"
                >
                  Independent by nature.
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  data-about="title-line"
                  className="block"
                >
                  <span className="font-editorial font-normal italic tracking-[-0.045em]">
                    Intentional
                  </span>{" "}
                  by design.
                </span>
              </span>
            </h2>
          </div>

          <div
            data-about="intro"
            className="relative lg:col-span-3 lg:pb-2"
          >
            <span className="mb-5 block font-mono text-[10px] tracking-[0.16em] text-[#929292]">
              [ THE STUDIO ]
            </span>

            <p className="text-sm leading-7 text-[#b0b0b0] md:text-base">
              Webli Studio is an independent web design and development
              studio from India, creating thoughtful digital experiences
              for ambitious businesses.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#929292]">
              We combine strategy, distinctive design, and modern
              technology to help brands communicate clearly and grow
              online.
            </p>

            <Link
              href="/about"
              className="group mt-6 inline-flex min-h-11 items-center gap-4 border-b border-[#454545] pb-2 text-sm transition-colors duration-300 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Discover our approach
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* Studio manifesto with SVG watermark */}
        <div
          data-about="manifesto"
          className="relative isolate overflow-hidden border border-[#262626] bg-[#0b0b0b] p-6 sm:p-10 lg:p-14"
        >
          <WebliMark />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#929292] lg:col-span-3">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-[#f5f5f5] align-middle" />
              What we believe
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <p className="max-w-4xl text-[clamp(2rem,5vw,5rem)] font-medium leading-[1.05] tracking-[-0.055em]">
                Good digital work is never just about how it looks.
                <span className="font-editorial font-normal italic">
                  {" "}
                  It is about what it makes possible.
                </span>
              </p>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#262626] pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#929292] sm:gap-x-10">
                <span>Design with purpose</span>
                <span>Develop with precision</span>
                <span>Build for people</span>
              </div>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="grid gap-12 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p
              data-about="principles-label"
              className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#929292]"
            >
              The way we work / 001—003
            </p>

            <h3
              data-about="principles-heading"
              className="max-w-xl text-balance text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.065em]"
            >
              Thoughtful in process.
              <span className="block font-editorial font-normal italic tracking-[-0.035em]">
                Purposeful in execution.
              </span>
            </h3>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#929292]">
              From the first conversation to the final interaction,
              every decision should serve a reason and move your
              business in the right direction.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-b border-[#262626]">
              {principles.map((principle) => (
                <li
                  key={principle.number}
                  data-about="principle"
                  className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-4 border-t border-[#262626] py-7 md:py-9"
                >
                  <span className="pt-1 font-mono text-[10px] tracking-wider text-[#777]">
                    {principle.number}
                  </span>

                  <div>
                    <h4 className="text-lg font-medium tracking-[-0.035em] transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-2xl">
                      {principle.title}
                    </h4>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-[#929292]">
                      {principle.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-[#777] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                  >
                    ↗
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Closing line */}
        <div
          data-about="closing"
          className="mt-16 flex flex-col justify-between gap-4 border-t border-[#262626] pt-5 sm:mt-24 sm:flex-row sm:items-center"
        >
          <p className="font-mono text-[9px] uppercase leading-6 tracking-[0.14em] text-[#777]">
            Small details. Clear thinking. Better digital experiences.
          </p>

          <Link
            href="/about"
            className="group inline-flex min-h-11 items-center gap-3 text-sm"
          >
            More about Webli Studio
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </AboutOverviewReveal>
  );
}
