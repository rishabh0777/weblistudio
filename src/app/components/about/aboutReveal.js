"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);



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