
"use client";

import { useEffect, useRef } from "react";

export default function FluidCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches || !finePointer.matches) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTime = 0;
    let active = true;

    const points = [];
    const MAX_POINTS = 32;
    const LIFETIME = 650;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;

      const now = performance.now();
      const previous = points[points.length - 1];

      if (previous) {
        const distance = Math.hypot(
          event.clientX - previous.x,
          event.clientY - previous.y
        );

        const steps = Math.min(Math.ceil(distance / 7), 12);

        for (let i = 1; i <= steps; i++) {
          const t = i / steps;

          points.push({
            x: previous.x + (event.clientX - previous.x) * t,
            y: previous.y + (event.clientY - previous.y) * t,
            time: now,
            size: 1,
          });
        }
      } else {
        points.push({
          x: event.clientX,
          y: event.clientY,
          time: now,
          size: 1,
        });
      }

      while (points.length > MAX_POINTS) points.shift();
    };

    const draw = (time) => {
      if (!active) return;

      rafId = requestAnimationFrame(draw);

      // Limit drawing to approximately 40 FPS.
      if (time - lastTime < 25) return;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const now = performance.now();

      while (
        points.length &&
        now - points[0].time > LIFETIME
      ) {
        points.shift();
      }

      if (points.length < 2) return;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Soft, wide liquid body.
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];

        const age = (now - b.time) / LIFETIME;
        const fade = Math.max(0, 1 - age);
        const progress = i / points.length;

        const thickness = (2 + progress * 15) * fade;
        const opacity = 0.09 + progress * 0.22;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255,255,255,${opacity * fade})`;
        ctx.lineWidth = thickness;
        ctx.shadowColor = "rgba(255,255,255,0.35)";
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      // Bright, tapered inner ribbon.
      ctx.shadowBlur = 0;

      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];

        const progress = i / points.length;
        const age = (now - b.time) / LIFETIME;
        const fade = Math.max(0, 1 - age);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255,255,255,${
          0.08 + progress * 0.42
        } * ${fade})`;
        ctx.lineWidth = Math.max(0.5, progress * 3.5 * fade);
        ctx.stroke();
      }

      ctx.restore();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });

    rafId = requestAnimationFrame(draw);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      points.length = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fluid-cursor-canvas"
    />
  );
}
