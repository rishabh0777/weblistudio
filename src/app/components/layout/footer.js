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
      className="webli-footer__icon"
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
    <footer className="webli-footer">
      {/* Decorative grid and grain are intentionally behind the content. */}
      <div className="webli-footer__grid" aria-hidden="true" />
      <div className="webli-footer__noise" aria-hidden="true" />

      <div className="webli-footer__inner">
        <section className="webli-footer__cta" aria-labelledby="footer-cta-title">
          <p className="webli-footer__eyebrow">
            HAVE A PROJECT IN MIND?
          </p>

          <h2 id="footer-cta-title" className="webli-footer__headline">
            Let&apos;s make
            <br />
            something <em>matter.</em>
          </h2>

          <div className="webli-footer__cta-bottom">
            <p className="webli-footer__description">
              Good ideas deserve thoughtful execution.
              <br className="webli-footer__desktop-break" />
              Tell us what you&apos;re building.
            </p>

            <Link href="/contact" className="webli-footer__contact-link">
              <span>Start a project</span>
              <span className="webli-footer__contact-icon">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </div>
        </section>

        <div className="webli-footer__navigation">
          <div className="webli-footer__brand">
  <Link
    href="/"
    className="webli-footer__logo"
    aria-label="Webli Studio home"
  >
    <span className="webli-footer__logo-mark">
      <LogoMark className="webli-footer__logo-svg" />
    </span>

    <span>Webli Studio</span>
  </Link>

  <p className="webli-footer__brand-copy">
    Independent digital studio.
    <br />
    Thoughtful design. Purposeful technology.
  </p>
</div>

          <div className="webli-footer__nav-group">
            <p className="webli-footer__label">EXPLORE</p>
            <nav aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.label} href={item.href} className="webli-footer__nav-link">
                  <span>{item.label}</span>
                  <ArrowIcon diagonal />
                </Link>
              ))}
            </nav>
          </div>

          <div className="webli-footer__nav-group">
            <p className="webli-footer__label">CONNECT</p>
            <a
              href="https://www.instagram.com/webli_studio/"
              target="_blank"
              rel="noreferrer"
              className="webli-footer__nav-link"
            >
              <span>Instagram</span>
              <ArrowIcon diagonal />
            </a>
            <Link href="/contact" className="webli-footer__nav-link">
              <span>Get in touch</span>
              <ArrowIcon diagonal />
            </Link>
          </div>
        </div>

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

        <div className="webli-footer__bottom">
          <div className="webli-footer__status">
            <span className="webli-footer__status-dot" />
            <span>AVAILABLE FOR SELECT PROJECTS</span>
          </div>

          <span className="webli-footer__copyright">
            © {new Date().getFullYear()} WEBLI STUDIO
          </span>

          <a href="#top" className="webli-footer__back-top">
            <span>BACK TO TOP</span>
            <span className="webli-footer__back-top-arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}