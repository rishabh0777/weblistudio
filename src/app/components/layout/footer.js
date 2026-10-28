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
            <Link href="/" className="webli-footer__logo" aria-label="Webli Studio home">
              <span className="webli-footer__logo-mark" aria-hidden="true">W.</span>
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