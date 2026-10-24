
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroParticles() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: true });

      if (!canvas || !ctx) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const root = rootRef.current;
      const particles = [];
      const pointer = { x: -1000, y: -1000 };
      let width = 0;
      let height = 0;
      let dpr = 1;
      let raf = 0;
      let lastTime = 0;
      let disposed = false;

      const random = (min, max) =>
        Math.random() * (max - min) + min;

      const createParticle = (index, total) => {
        const fromLeft = Math.random() > 0.5;
        const radius = random(1.2, 3.2);

        return {
          x: fromLeft ? random(-30, 0) : random(width, width + 30),
          y: random(-height * 0.15, height * 0.35),
          vx: fromLeft ? random(0.15, 0.8) : random(-0.8, -0.15),
          vy: random(0.1, 0.5),
          radius,
          alpha: random(0.45, 0.9),
          delay: index * random(15, 38),
          elapsed: 0,
          settled: false,
          targetX: width * (0.08 + (index / Math.max(total, 1)) * 0.84)
            + random(-35, 35),
          targetY: height * random(0.76, 0.97),
          wobble: random(0, Math.PI * 2),
          seed: random(0.5, 1.5),
        };
      };

      const resize = () => {
        const rect = root.getBoundingClientRect();

        width = rect.width;
        height = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = reducedMotion
          ? 0
          : Math.min(48, Math.max(24, Math.round(width / 24)));

        particles.length = 0;

        for (let i = 0; i < count; i++) {
          particles.push(createParticle(i, count));
        }

        // With reduced motion, draw a few quiet, static particles.
        if (reducedMotion) {
          for (let i = 0; i < 18; i++) {
            const p = createParticle(i, 18);
            p.x = p.targetX;
            p.y = p.targetY;
            p.settled = true;
            particles.push(p);
          }
        }
      };

      const draw = (time) => {
        if (disposed) return;

        const dt = Math.min((time - (lastTime || time)) / 16.67, 2);
        lastTime = time;

        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
          if (!p.settled) {
            p.elapsed += dt;

            if (p.elapsed < p.delay / 16.67) continue;

            p.vy += 0.018 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            if (p.y >= p.targetY) {
              p.y = p.targetY;
              p.settled = true;
              p.vx = 0;
              p.vy = 0;
            }
          }

          let dx = 0;
          let dy = 0;
          const mx = p.x - pointer.x;
          const my = p.y - pointer.y;
          const distance = Math.hypot(mx, my);

          // Gentle mouse repulsion, not an aggressive particle explosion.
          if (distance < 95 && distance > 0.01) {
            const force = ((95 - distance) / 95) * 0.75;
            dx = (mx / distance) * force;
            dy = (my / distance) * force;
          }

          const breathe = p.settled && !reducedMotion
            ? Math.sin(time * 0.0007 * p.seed + p.wobble) * 0.7
            : 0;

          ctx.beginPath();
          ctx.arc(
            p.x + dx,
            p.y + dy + breathe,
            p.radius,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = `rgba(245, 245, 245, ${p.alpha})`;
          ctx.fill();
        }

        if (!reducedMotion) {
          raf = requestAnimationFrame(draw);
        }
      };

      const onPointerMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
      };

      const onPointerLeave = () => {
        pointer.x = -1000;
        pointer.y = -1000;
      };

      resize();

      if (reducedMotion) {
        draw(0);
      } else {
        raf = requestAnimationFrame(draw);

        gsap.fromTo(
          canvas,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      window.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      root.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("resize", resize);

      return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointerMove);
        root.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("resize", resize);
      };
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
