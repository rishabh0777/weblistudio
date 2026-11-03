"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ==========================================================================
   Webli Studio — Contact reveal (client wrapper)

   Mirrors the Hero's entrance model:
   - Animated elements carry `contact-anim`, which Tailwind renders as
     `opacity-0 motion-reduce:opacity-100` (hidden before GSAP runs, shown
     immediately for reduced motion). The <noscript> rule reveals everything
     when JavaScript is disabled.
   - The H1 is deliberately NOT hidden: it is the main text on the page and
     stays visible from first paint.
   - GSAP animates opacity + transforms only.
   ========================================================================== */

export default function ContactReveal({ children, className }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
          .fromTo(
            "[data-contact='eyebrow']",
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
          )
          .fromTo(
            "[data-contact='rule']",
            { scaleX: 0, transformOrigin: "left center", opacity: 1 },
            { scaleX: 1, duration: 1.3, ease: "power2.inOut" },
            "<0.1"
          )
          .fromTo(
            "[data-contact='paragraph']",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=0.9"
          )
          .fromTo(
            "[data-contact='cta']",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            "-=0.6"
          )
          .fromTo(
            "[data-contact='form']",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
            "-=0.7"
          )
          .fromTo(
            "[data-contact='intro']",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            "-=0.7"
          )
          .fromTo(
            "[data-contact='detail']",
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.3"
          );
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={className}>
      {/* No-JS fallback: reveal everything if scripts are disabled. */}
      <noscript>
        <style>{`.contact-anim{opacity:1!important}`}</style>
      </noscript>
      {children}
    </div>
  );
}