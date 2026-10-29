
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutOverviewReveal({
  children,
  id,
  className,
  "aria-labelledby": labelledBy,
}) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const select = (name) =>
          root.querySelectorAll(`[data-about="${name}"]`);

        // Editorial heading reveal
        const hero = root.querySelector(".about-overview__hero");
        const titleLines = select("title-line");

        if (hero && titleLines.length) {
          gsap.fromTo(
            titleLines,
            {
              yPercent: 110,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 1.15,
              stagger: 0.16,
              ease: "power4.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: hero,
                start: "top 78%",
                once: true,
              },
            }
          );
        }

        // Intro copy
        gsap.from(select("intro"), {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: hero || root,
            start: "top 68%",
            once: true,
          },
        });

        // Studio manifesto
        const manifesto = select("manifesto");

        if (manifesto.length) {
          gsap.from(manifesto, {
            y: 32,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: manifesto[0],
              start: "top 82%",
              once: true,
            },
          });
        }

        // Principles heading and list
        const principlesHeading = select("principles-heading");
        const principlesLabel = select("principles-label");
        const principleRows = select("principle");

        const principlesSection =
          principlesHeading[0]?.parentElement?.parentElement;

        if (principlesSection) {
          gsap.from([...principlesLabel, ...principlesHeading], {
            y: 24,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: principlesSection,
              start: "top 78%",
              once: true,
            },
          });

          if (principleRows.length) {
            gsap.from(principleRows, {
              y: 22,
              autoAlpha: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: principlesSection,
                start: "top 70%",
                once: true,
              },
            });
          }
        }

        // Closing signature
        const closing = select("closing");

        if (closing.length) {
          gsap.from(closing, {
            y: 16,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: closing[0],
              start: "top 95%",
              once: true,
            },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id={id}
      aria-labelledby={labelledBy}
      className={className}
    >
      {children}
    </section>
  );
}
