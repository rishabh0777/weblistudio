"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ==========================================================================
   Webli Studio — Navbar
   - Fixed, opaque header (no scroll listeners, no layout shift). The Hero
     already reserves more top padding than the header height (4rem mobile,
     4.5rem desktop), so nothing is covered.
   - One useGSAP() call: a short entrance timeline plus a paused mobile-menu
     timeline that is played / reversed from React state.
   - Reduced motion: entrance is skipped (the `motion-reduce:opacity-100`
     utility shows everything) and the menu opens/closes with no movement.
   ========================================================================== */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const CTA = { label: "Let’s talk", href: "/contact", icon: "↗" };
const DETAIL = "DESIGN-LED. DEVELOPMENT-DRIVEN.";

// Hidden until GSAP reveals it; shown immediately under reduced motion.
const ANIM = "nav-anim opacity-0 motion-reduce:opacity-100";

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Webli Studio mark — path data taken from the supplied transparent.svg,
   with the viewBox cropped to the mark's bounds and fill set to currentColor
   so it follows the text colour on the dark background. */
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

export default function Header({
  links = NAV_LINKS,
  cta = CTA,
  showWordmark = true,
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const menuTlRef = useRef(null);
  const openRef = useRef(false);

  /* ---------------------------------------------------------------------
     GSAP: entrance + mobile menu timeline.
     matchMedia receives the root element as its scope so the data-attribute
     selectors below can only match elements inside this component.
     --------------------------------------------------------------------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia(rootRef.current);

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduce } = context.conditions;
          const t = (seconds) => (reduce ? 0.01 : seconds);

          // Mobile menu: panel fades in, then items rise in with a stagger.
          const menuTl = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.out" },
          });

          menuTl
            .to(panelRef.current, {
              autoAlpha: 1,
              duration: t(0.4),
              ease: "power2.out",
            })
            .fromTo(
              "[data-menu='item']",
              { y: reduce ? 0 : 24, opacity: reduce ? 1 : 0 },
              {
                y: 0,
                opacity: 1,
                duration: t(0.7),
                stagger: reduce ? 0 : 0.07,
              },
              reduce ? "<" : "-=0.2"
            );

          menuTlRef.current = menuTl;
          // If the preference flips while the menu is open, keep it open.
          if (openRef.current) menuTl.progress(1);

          // Entrance: logo → links → CTA / toggle.
          if (!reduce) {
            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .fromTo(
                logoRef.current,
                { y: -10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 }
              )
              .fromTo(
                "[data-nav='link']",
                { y: -8, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
                "-=0.4"
              )
              .fromTo(
                "[data-nav='cta']",
                { y: -8, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                "-=0.3"
              );
          }

          return () => {
            if (menuTlRef.current === menuTl) menuTlRef.current = null;
          };
        }
      );
    },
    { scope: rootRef }
  );

  /* Drive the menu timeline from state. */
  useEffect(() => {
    openRef.current = open;
    const tl = menuTlRef.current;
    if (!tl) return;

    if (open) {
      tl.timeScale(1).play();
    } else if (tl.progress() > 0) {
      tl.timeScale(1.6).reverse();
    }
  }, [open]);

  /* While open: lock background scroll, handle Escape, keep Tab inside the
     toggle + menu links. Everything is undone in the cleanup. */
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbar =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = [
        toggleRef.current,
        ...(panelRef.current?.querySelectorAll("a[href]") ?? []),
      ].filter(Boolean);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* Close on route change, and if the viewport grows to desktop width. */
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpen(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div ref={rootRef}>
      {/* No-JS fallback: reveal the header if scripts are disabled. */}
      <noscript>
        <style>{`.nav-anim{opacity:1!important}`}</style>
      </noscript>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
        <div className="container-site grid h-16 grid-cols-[1fr_auto] items-center md:h-[4.5rem] md:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <div ref={logoRef} className={`${ANIM} justify-self-start`}>
            <Link
              href="/"
              aria-label="Webli Studio — home"
              className="group inline-flex min-h-12 items-center gap-3 text-foreground"
            >
              <LogoMark className="aspect-[1649/1349] h-7 w-auto transition-colors duration-300 group-hover:text-muted" />
              {showWordmark && (
                <span className="text-[15px] font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-muted">
                  Webli Studio
                </span>
              )}
            </Link>
          </div>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10 lg:gap-12">
              {links.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} data-nav="link" className={ANIM}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex min-h-10 items-center text-sm font-medium transition-colors duration-300 hover:text-foreground after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-500 after:ease-out ${
                        active
                          ? "text-foreground after:scale-x-100"
                          : "text-muted after:scale-x-0 hover:after:scale-x-100"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="mr-1.5 font-mono text-[10px] text-muted"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden justify-self-end md:block">
            <Link
              data-nav="cta"
              href={cta.href}
              className={`${ANIM} group inline-flex min-h-10 items-center gap-2.5 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background`}
            >
              {cta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                {cta.icon}
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            data-nav="cta"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`${ANIM} -mr-2 inline-flex min-h-12 min-w-16 items-center justify-end justify-self-end px-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground md:hidden`}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile panel — sits under the header so the toggle stays reachable. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        className="invisible fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background pt-16 opacity-0 md:hidden"
      >
        <div className="container-site flex flex-1 flex-col justify-between gap-12 pb-8 pt-8">
          <nav aria-label="Mobile">
            <ul className="border-t border-border">
              {links.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li
                    key={link.href}
                    data-menu="item"
                    className="border-b border-border"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-16 items-baseline gap-5 py-5 text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="w-6 shrink-0 font-mono text-xs text-muted"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[length:clamp(2.5rem,13vw,4.25rem)] leading-none ${
                          active
                            ? "font-serif font-normal italic tracking-[-0.02em]"
                            : "font-semibold tracking-[-0.045em]"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <div data-menu="item">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background"
              >
                {cta.label}
                <span aria-hidden="true">{cta.icon}</span>
              </Link>
            </div>
            <p
              data-menu="item"
              className="mt-8 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
            >
              {DETAIL}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}