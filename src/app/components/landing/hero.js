"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FluidCursor from "../interactions/fluidCursor";

gsap.registerPlugin(useGSAP);

/* ==========================================================================
   Webli Studio — Hero
   Entrance choreography is a single GSAP timeline run through useGSAP().

   Visibility model (no flash, no layout shift):
   - Animated elements carry `hero-anim`, which Tailwind renders as
     `opacity-0 motion-reduce:opacity-100`. They are hidden before GSAP runs
     and shown immediately for users who prefer reduced motion.
   - GSAP only animates opacity + transforms (no layout properties).
   - The <noscript> rule below reveals everything if JavaScript is disabled.
   ========================================================================== */

const DEFAULT_CONTENT = {
  eyebrow: "INDEPENDENT DIGITAL STUDIO · INDIA / WORLDWIDE",
  // Each inner array is one headline line. Use { em: "word" } for the serif accent.
  headline: [
    ["We build digital"],
    [{ em: "experiences" }, " that"],
    ["move businesses forward."],
  ],
  description:
    "We design and develop thoughtful websites for ambitious brands — combining strategy, distinctive design, and purposeful technology.",
  primaryCta: { label: "Start a project", href: "/#contact", icon: "↗" },
  secondaryCta: { label: "Explore our work", href: "/#work", icon: "↓" },
  detail: "DESIGN-LED. DEVELOPMENT-DRIVEN.",
};

const ANIM = "hero-anim opacity-0 motion-reduce:opacity-100";

/* -------------------------------------------------------------------------
   Signature element: offset website-preview panels (flat, bordered, cropped).
   Sizing uses container-query units (cqw) so type scales with the composition.
   Purely decorative -> hidden from assistive tech.
   The outer wrapper is animated by GSAP; hover motion lives on the inner
   element via CSS so the two transforms never conflict.
   ------------------------------------------------------------------------- */

function Panel({ className = "", children }) {
  return (
    <div
      data-hero="panel"
      className={`${ANIM} group absolute ${className}`}
    >
      <div className="absolute inset-0 flex flex-col overflow-hidden border border-border bg-surface transition-[transform,border-color] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-muted/60">
        {/* browser bar */}
        <div className="flex shrink-0 items-center gap-[1cqw] border-b border-border px-[2.4cqw] py-[1.7cqw]">
          <span className="h-[1cqw] w-[1cqw] rounded-full bg-border" />
          <span className="h-[1cqw] w-[1cqw] rounded-full bg-border" />
          <span className="ml-[1.5cqw] h-[1cqw] w-[14cqw] bg-border" />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function Bar({ className = "" }) {
  return <span className={`block h-[0.9cqw] bg-border ${className}`} />;
}

function Showcase() {
  return (
    <div
      aria-hidden="true"
      className="@container relative aspect-[5/4] w-full max-w-[40rem] md:aspect-[6/5] lg:ml-auto"
    >
      {/* A — restaurant */}
      <Panel className="left-0 top-[9%] z-10 aspect-[4/5] w-[52%]">
        <div className="flex h-full flex-col justify-between p-[3.2cqw]">
          <div>
            <span className="mb-[2.4cqw] block h-[0.9cqw] w-[9cqw] bg-muted/50" />
            <p className="font-serif text-[length:9.5cqw] italic leading-[0.9] tracking-[-0.02em] text-foreground">
              Osteria
            </p>
          </div>
          <div className="space-y-[2.2cqw]">
            {[17, 22, 14, 19].map((w, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-t border-border pt-[2.2cqw]"
              >
                <Bar className={`w-[24cqw] ${i === 0 ? "bg-muted/60" : ""}`} />
                <span
                  className="block h-[0.9cqw] bg-border"
                  style={{ width: `${w}cqw` }}
                />
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* B — editorial */}
      <Panel className="right-0 top-0 z-20 aspect-[4/5] w-[44%]">
        <div className="flex h-full flex-col justify-between p-[3cqw]">
          <p className="font-serif text-[length:6.6cqw] leading-[0.92] tracking-[-0.01em] text-foreground">
            The Quiet
            <br />
            <span className="italic">Issue</span>
          </p>
          <div className="grid grid-cols-2 gap-[2.4cqw] border-t border-border pt-[2.4cqw]">
            {[0, 1].map((c) => (
              <div key={c} className="space-y-[1.5cqw]">
                {[100, 88, 94, 70, 82, 55].map((w, i) => (
                  <span
                    key={i}
                    className="block h-[0.8cqw] bg-border"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* C — commerce (tablet and up) */}
      <Panel className="bottom-0 left-[24%] z-30 hidden aspect-[16/10] w-[56%] md:block">
        <div className="flex h-full flex-col p-[2.6cqw]">
          <p className="mb-[2cqw] text-[length:3.4cqw] font-semibold leading-none tracking-[-0.03em] text-foreground">
            Autumn Edit
          </p>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-[2cqw]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex min-h-0 flex-col gap-[1.4cqw]">
                <span className="block min-h-0 flex-1 border border-border bg-foreground/[0.06]" />
                <Bar className="w-[80%]" />
                <Bar className="w-[40%] bg-muted/50" />
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export default function Hero({ content } = {}) {
  const c = { ...DEFAULT_CONTENT, ...content };

  // Root (scope) + single-element refs. Groups (lines, CTAs, panels) are
  // targeted with scoped data-hero selectors, which useGSAP resolves inside
  // `scope`, so nothing outside this component can be matched.
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const ruleRef = useRef(null);
  const descriptionRef = useRef(null);
  const detailRef = useRef(null);

  useGSAP(
    () => {
      // Only animate when motion is allowed. For reduced motion nothing runs:
      // the `motion-reduce:opacity-100` utility already shows the content.
      // matchMedia created inside useGSAP is reverted with the context, and
      // it re-evaluates if the user changes the OS setting while on the page.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
        });

        tl
          // 1. Eyebrow + rule
          .fromTo(
            eyebrowRef.current,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
          )
          .fromTo(
            ruleRef.current,
            { scaleX: 0, transformOrigin: "left center", opacity: 1 },
            { scaleX: 1, duration: 1.3, ease: "power2.inOut" },
            "<0.1"
          )
          // 2. Headline lines
          .fromTo(
            "[data-hero='line']",
            { yPercent: 40, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 },
            "-=0.9"
          )
          // 3. Description
          .fromTo(
            descriptionRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=0.55"
          )
          // 4. CTAs
          .fromTo(
            "[data-hero='cta']",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            "-=0.6"
          )
          // 5. Website-preview panels, one after another
          .fromTo(
            "[data-hero='panel']",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.18 },
            "-=0.5"
          )
          // 6. Editorial detail, last
          .fromTo(
            detailRef.current,
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.3"
          );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col overflow-x-clip"
    >
        <FluidCursor />
      {/* No-JS fallback: reveal everything if scripts are disabled. */}
      <noscript>
        <style>{`.hero-anim{opacity:1!important}`}</style>
      </noscript>

      <div className="container-site flex flex-1 flex-col pb-6 pt-28 md:pb-8 md:pt-36">
        {/* Eyebrow + animated rule */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p
            ref={eyebrowRef}
            className={`${ANIM} font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted sm:whitespace-nowrap md:text-xs`}
          >
            {c.eyebrow}
          </p>
          <span
            ref={ruleRef}
            aria-hidden="true"
            className={`${ANIM} h-px w-full bg-border sm:w-auto sm:flex-1`}
          />
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,9.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          {c.headline.map((line, i) => (
            <span key={i}>
              <span data-hero="line" className={`${ANIM} block`}>
                {line.map((part, j) =>
                  typeof part === "string" ? (
                    part
                  ) : (
                    <em
                      key={j}
                      className="font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]"
                    >
                      {part.em}
                    </em>
                  )
                )}
              </span>{" "}
            </span>
          ))}
        </h1>

        {/* Copy + CTAs  |  Showcase */}
        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p
              ref={descriptionRef}
              className={`${ANIM} max-w-[30rem] text-pretty text-base leading-relaxed text-muted md:text-lg`}
            >
              {c.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                data-hero="cta"
                href={c.primaryCta.href}
                className={`${ANIM} group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground`}
              >
                {c.primaryCta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  {c.primaryCta.icon}
                </span>
              </Link>

              <Link
                data-hero="cta"
                href={c.secondaryCta.href}
                className={`${ANIM} group inline-flex min-h-12 items-center gap-3 text-sm font-medium text-foreground`}
              >
                <span className="border-b border-border pb-0.5 transition-colors duration-300 group-hover:border-foreground">
                  {c.secondaryCta.label}
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  {c.secondaryCta.icon}
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Showcase />
          </div>
        </div>

        {/* Detail line */}
        <div className="mt-auto pt-16 md:pt-20">
          <p
            ref={detailRef}
            className={`${ANIM} border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted`}
          >
            {c.detail}
          </p>
        </div>
      </div>
    </section>
  );
}