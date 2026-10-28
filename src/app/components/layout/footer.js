
import Link from "next/link";
import "./footer.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5 shrink-0"
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M7 7h10v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function LogoMark({ className = "" }) {
  return (
    <svg
      viewBox="164 372 1649 1349"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="m 1061.0914,1714.5407 c -2.324,-1.1504 -5.1433,-3.5766 -6.265,-5.3916 -1.6596,-2.6853 -5.1956,-24.1102 -18.9857,-115.0355 -9.3204,-61.4545 -17.0845,-111.8738 -17.2535,-112.0428 -0.8623,-0.8623 -43.73912,-11.9602 -194.77022,-50.4127 -91.025,-23.1749 -169.79218,-43.4445 -175.03819,-45.0435 -14.37677,-4.3821 -26.70194,-13.0961 -34.33066,-24.2721 -1.95547,-2.8647 -103.09689,-221.2086 -224.75871,-485.20859 -172.83751,-375.0486 -221.29829,-481.0494 -221.63775,-484.79983 -0.59077,-6.52695 2.80573,-11.78634 9.1849,-14.22256 l 4.52811,-1.7293 182.27615,46.63109 c 100.25188,25.6471 184.34589,47.2618 186.87558,48.0327 6.46575,1.9704 14.38686,6.1353 20.6227,10.8434 12.61023,9.5208 4.85706,-6.3772 140.49134,288.0802 68.6977,149.1404 135.5362,294.23389 148.53,322.42999 12.99381,28.1962 23.91245,50.9212 24.26365,50.5 0.35119,-0.4211 20.55261,-68.2657 44.89202,-150.76569 24.33942,-82.5 45.45666,-152.4647 46.92716,-155.4771 7.3501,-15.0568 26.84732,-26.1496 43.53982,-24.7717 3.9185,0.3235 41.1675,10.8796 103.1339,29.2274 53.35,15.7965 97.1487,28.8623 97.3305,29.0351 0.1818,0.1727 -2.4281,3.7854 -5.7997,8.0282 -35.5437,44.728 -65.5279,118.8935 -79.4254,196.45809 -4.6427,25.9116 -9.3563,70.6097 -8.4511,80.1395 l 0.3457,3.6395 37.0092,-35.6395 c 191.1119,-184.03869 559.4171,-538.05889 561.4145,-539.63949 1.9703,-1.5591 4.0365,-2 9.3736,-2 6.7134,0 6.9195,0.079 10.6261,4.0522 2.1718,2.3283 4.0491,5.519 4.4128,7.5 0.3482,1.8963 13.7203,89.6228 29.7159,194.9478 26.0213,171.3404 29.0354,192.4474 28.6311,200.5 -0.5075,10.1084 -3.252,18.86509 -8.806,28.09619 -2.6032,4.3266 -65.4869,65.3583 -274.3772,266.2962 -149.05,143.3758 -310.7333,298.9162 -359.2961,345.6454 -52.9948,50.9937 -89.777,85.6514 -92,86.686 -4.8953,2.2782 -7.832,2.2062 -12.9295,-0.317 z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="webli-footer relative isolate overflow-hidden bg-[#080808] text-[#f5f5f5]"
    >
      <div
        className="webli-footer__grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-5 sm:px-[5vw]">
        {/* Call to action */}
        <section
          className="border-b border-[#262626] py-[5.5rem] sm:py-[8vw] lg:py-28"
          aria-labelledby="footer-cta-title"
        >
          <p className="m-0 font-mono text-[9px] font-semibold leading-[1.7] tracking-[0.22em] text-[#929292]">
            HAVE A PROJECT IN MIND?
          </p>

          <h2
            id="footer-cta-title"
            className="mt-7 mb-0 max-w-[1100px] text-[clamp(3.2rem,9.3vw,8.6rem)] font-semibold leading-[0.86] tracking-[-0.075em] [text-wrap:balance]"
          >
            Let&apos;s make
            <br />
            something <em className="webli-footer__headline-em">matter.</em>
          </h2>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 sm:mt-12">
            <p className="m-0 max-w-[360px] text-xs leading-[1.8] text-[#929292]">
              Good ideas deserve thoughtful execution.
              <br className="hidden sm:block" />
              Tell us what you&apos;re building.
            </p>

            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center justify-between gap-8 rounded-full border border-[#f5f5f5] bg-[#f5f5f5] py-1.5 pr-1.5 pl-[18px] text-[11px] font-semibold text-[#080808] no-underline transition-colors duration-300 hover:bg-transparent hover:text-[#f5f5f5]"
            >
              <span>Start a project</span>

              <span className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-full bg-[#080808] text-[#f5f5f5] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#f5f5f5] group-hover:text-[#080808]">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </div>
        </section>

        {/* Brand and navigation */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 py-10 sm:grid-cols-[minmax(0,2fr)_minmax(100px,0.8fr)_minmax(100px,0.8fr)] sm:gap-10 sm:py-16 lg:gap-20">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              aria-label="Webli Studio home"
              className="group inline-flex items-center gap-2.5 text-xs font-semibold text-[#f5f5f5] no-underline"
            >
              <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-[#262626] text-[#f5f5f5] transition-colors duration-300 group-hover:border-[#f5f5f5] group-hover:text-[#929292]">
                <LogoMark className="h-[19px] w-[19px]" />
              </span>
              <span>Webli Studio</span>
            </Link>

            <p className="mt-[18px] mb-0 text-[10px] leading-[1.9] text-[#929292]">
              Independent digital studio.
              <br />
              Thoughtful design. Purposeful technology.
            </p>
          </div>

          <div>
            <p className="mb-5 font-mono text-[9px] font-semibold tracking-[0.22em] text-[#929292]">
              EXPLORE
            </p>

            <nav aria-label="Footer navigation" className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group mb-[13px] inline-flex w-fit items-center gap-2 text-[11px] leading-[1.5] text-[#a6a6a6] no-underline transition-colors duration-300 hover:text-[#f5f5f5]"
                >
                  <span>{item.label}</span>
                  <span className="webli-footer__nav-arrow">
                    <ArrowIcon diagonal />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col">
            <p className="mb-5 font-mono text-[9px] font-semibold tracking-[0.22em] text-[#929292]">
              CONNECT
            </p>

            <a
              href="https://www.instagram.com/webli_studio/"
              target="_blank"
              rel="noreferrer"
              className="group mb-[13px] inline-flex w-fit items-center gap-2 text-[11px] leading-[1.5] text-[#a6a6a6] no-underline transition-colors duration-300 hover:text-[#f5f5f5]"
            >
              <span>Instagram</span>
              <span className="webli-footer__nav-arrow">
                <ArrowIcon diagonal />
              </span>
            </a>

            <Link
              href="/contact"
              className="group mb-[13px] inline-flex w-fit items-center gap-2 text-[11px] leading-[1.5] text-[#a6a6a6] no-underline transition-colors duration-300 hover:text-[#f5f5f5]"
            >
              <span>Get in touch</span>
              <span className="webli-footer__nav-arrow">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </div>
        </div>

        {/* Decorative marquee */}
        <div className="webli-footer__marquee" aria-hidden="true">
          <div className="webli-footer__marquee-track">
            <span>WEBLI STUDIO</span>
            <span className="webli-footer__marquee-mark">✳</span>
            <span>BUILT WITH PURPOSE</span>
            <span className="webli-footer__marquee-mark">✳</span>
            <span>WEBLI STUDIO</span>
            <span className="webli-footer__marquee-mark">✳</span>
            <span>BUILT WITH PURPOSE</span>
            <span className="webli-footer__marquee-mark">✳</span>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="grid min-h-[68px] grid-cols-2 items-center gap-4 py-5 sm:grid-cols-[1fr_auto_1fr] sm:py-0">
          <div className="webli-footer__status col-span-2 sm:col-span-1">
            <span className="webli-footer__status-dot" />
            <span>AVAILABLE FOR SELECT PROJECTS</span>
          </div>

          <span className="text-[8px] font-medium tracking-[0.1em] text-[#777]">
            © {new Date().getFullYear()} WEBLI STUDIO
          </span>

          <a
            href="#top"
            className="inline-flex items-center justify-self-end gap-2.5 whitespace-nowrap text-[8px] font-medium tracking-[0.1em] text-[#b4b4b4] no-underline transition-colors duration-300 hover:text-[#f5f5f5]"
          >
            <span>BACK TO TOP</span>
            <span className="webli-footer__back-top-arrow" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
