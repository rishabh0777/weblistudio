"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ==========================================================================
   Webli Studio — About page reveal (client wrapper)

   Same visibility model as ServicesReveal:
   - Server-rendered content is fully visible by default. Nothing is hidden
     in CSS, so the page reads correctly with JS disabled, if GSAP fails, and
     for crawlers.
   - Elements tagged `data-reveal` are hidden only by GSAP, only when motion
     is allowed, and only for the one-time entrance (`once: true`); inline
     styles are cleared afterwards.
   - The hero is deliberately NOT tagged, so the H1 and intro are visible
     from first paint.
   - Opacity + transform only; no layout properties.
   ========================================================================== */

export default function AboutReveal({ children, className }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}