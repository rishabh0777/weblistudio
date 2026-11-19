"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);



export default function ServicesReveal({ children }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            once: true,
          },
        });

        const from = (selector, vars, position) =>
          tl.from(
            selector,
            { opacity: 0, clearProps: "opacity,transform", ...vars },
            position
          );

        from("[data-services='eyebrow']", { y: 10, duration: 0.8 });
        from("[data-services='heading']", { y: 24, duration: 1 }, "-=0.55");
        from("[data-services='paragraph']", { y: 16, duration: 0.9 }, "-=0.65");
        from(
          "[data-services='row']",
          { y: 18, duration: 0.9, stagger: 0.1 },
          "-=0.6"
        );
        from("[data-services='cta']", { y: 12, duration: 0.8 }, "-=0.4");
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="container-site">
      {children}
    </div>
  );
}