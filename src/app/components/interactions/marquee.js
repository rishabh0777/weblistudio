"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Marquee() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 22,
        repeat: -1,
        ease: "none",
        force3D: true,
      });
    },
    { scope: sectionRef }
  );

  const items = [
    "⚡ Fast MERN development",
    "🎨 Clean UI/UX",
    "🌀 GSAP animations",
    "📱 Mobile-perfect builds",
    "🔁 API integrations",
    "🔒 Auth + Admin Panel",
    "🚀 Startup-ready",
    "💡 Custom features",
    "🌐 SEO optimized",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-3 sm:py-4"
    >
      <div
        ref={trackRef}
        className="flex gap-10 whitespace-nowrap will-change-transform"
      >
        <div className="flex items-center gap-5 text-sm font-medium text-white">
          {items.map((item) => (
            <span key={item} className="opacity-90">
              {item}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-5 text-sm font-medium text-white"
          aria-hidden="true"
        >
          {items.map((item) => (
            <span key={`duplicate-${item}`} className="opacity-90">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
    </section>
  );
}