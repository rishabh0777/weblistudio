 "use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./selectedWork.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROJECTS = [
  {
    title: "Launch Haus",
    category: "Business Development  · Marketing Agency",
    description: "A clean, modern website for a business development and marketing agency.",
    image: "/works/launchHaus.png",
    alt: "Screenshot of the Launch Haus website",
    href: "https://www.launchhaus.in/",
  },
  {
    title: "Rishabh Srivastava (Founder's Portfolio)",
    category: "Portfolio · Personal Branding",
    description: "A portfolio website for a founder and entrepreneur.",
    image: "/works/rishabhsrivastava.png",
    alt: "Screenshot of the Rishabh Srivastava portfolio website",
    href: "https://rishabhsrivastava.vercel.app/",
  },
  {
    title: "Xvital Now",
    category: "Healthcare · Nutritition · Lifestyle",
    description: "Personalized nutrition and lifestyle recommendations for a healthier life.",
    image: "/works/xvital.png",
    alt: "Xvitalhealthcare and nutrition application project preview",
    href: "https://www.xvital.in/",
  },
  
  {
    title: "Spice Saga",
    category: "Food · Website Design",
    description: "An editorial, flavour-forward website for a food brand.",
    image: null,
    alt: "Spice Saga food website project preview",
    href: null,
  },
];

const pad = (n) => String(n).padStart(2, "0");

function ProjectCard({
  project,
  index,
  total,
}) {
  const content = (
    <>
      <div className="selected-work__media">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 66vw, 84vw"
            className="selected-work__image"
          />
        ) : (
          <div className="selected-work__fallback" aria-hidden="true">
            <span className="selected-work__fallback-index">{pad(index + 1)}</span>
            <span className="selected-work__fallback-title">{project.title}</span>
            <span className="selected-work__fallback-caption">WEBLI STUDIO / SELECTED WORK</span>
          </div>
        )}
      </div>

      <div className="selected-work__meta">
        <span>{pad(index + 1)} / {pad(total)}</span>
        <span>{project.category}</span>
      </div>

      <div className="selected-work__title-row">
        <h3 className="selected-work__title">{project.title}</h3>
        <span className="selected-work__arrow" aria-hidden="true">↗</span>
      </div>
      <p className="selected-work__description">{project.description}</p>
    </>
  );

  return (
    <article className="selected-work__card" data-work="card">
      {project.href ? (
        <Link
          href={project.href}
          className="selected-work__card-inner"
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel={project.href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={`View ${project.title} project`}
        >
          {content}
        </Link>
      ) : (
        <div className="selected-work__card-inner">{content}</div>
      )}
    </article>
  );
}

export default function SelectedWork() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const [state, setState] = useState({
    canPrev: false,
    canNext: true,
    active: 0,
  });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const first = track.querySelector("[data-work='card']");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first ? first.getBoundingClientRect().width + gap : track.clientWidth;
    const canPrev = track.scrollLeft > 4;
    const canNext = track.scrollLeft + track.clientWidth < track.scrollWidth - 4;
    const active = Math.min(
      PROJECTS.length - 1,
      Math.max(0, Math.round(track.scrollLeft / Math.max(step, 1))),
    );

    setState((previous) =>
      previous.canPrev === canPrev &&
      previous.canNext === canNext &&
      previous.active === active
        ? previous
        : { canPrev, canNext, active },
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(track);
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      track.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const first = track.querySelector("[data-work='card']");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first ? first.getBoundingClientRect().width + gap : track.clientWidth;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({
      left: direction * step,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = root.querySelectorAll(
        "[data-work='eyebrow'], [data-work='heading'], [data-work='intro'], [data-work='card'], [data-work='footer']",
      );

      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="selected-work"
      ref={rootRef}
      className="section-spacing selected-work"
      aria-labelledby="selected-work-heading"
    >
      <div className="container-site selected-work__container">
        <div className="selected-work__header">
          <div className="selected-work__header-main">
            <p className="selected-work__eyebrow" data-work="eyebrow">
              SELECTED WORK · 2025—2026
            </p>
            <h2
              id="selected-work-heading"
              className="selected-work__heading"
              data-work="heading"
            >
              <span className="selected-work__line">Thoughtful work.</span>
              <span className="selected-work__line">
                <em className="selected-work__accent">Meaningful impact.</em>
              </span>
            </h2>
          </div>

          <div className="selected-work__header-side" data-work="intro">
            <p className="selected-work__intro">
              A selection of digital experiences crafted with purpose, precision,
              and an understanding of the businesses behind them.
            </p>
            <Link href="/work" className="selected-work__text-link">
              <span>Explore all work</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="selected-work__controls">
          <span className="selected-work__counter" aria-live="polite">
            {pad(state.active + 1)} / {pad(PROJECTS.length)}
          </span>
          <div className="selected-work__buttons">
            <button
              type="button"
              className="selected-work__control"
              onClick={() => scrollByCard(-1)}
              disabled={!state.canPrev}
              aria-label="Previous project"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="selected-work__control"
              onClick={() => scrollByCard(1)}
              disabled={!state.canNext}
              aria-label="Next project"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="selected-work__track"
          role="region"
          aria-label="Selected projects, scroll horizontally"
          tabIndex={0}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              total={PROJECTS.length}
            />
          ))}
        </div>

        <div className="selected-work__footer" data-work="footer">
          <p className="selected-work__closing">
            GOOD WORK STARTS WITH A GOOD CONVERSATION.
          </p>
          <Link href="/work" className="selected-work__text-link">
            <span>View all projects</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
