"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ==========================================================================
   GravityField
   Scroll-driven sphere field: float → drop → heart → release.

   CSS expectations (not in this file):
   .gravity-field { position: fixed; inset: 0; z-index: <below content>;
                    pointer-events: none; }
   .gravity-field canvas { display: block; }
   Optionally add `transition: background-color .6s` wherever you consume
   --gravity-bg so the stage changes blend instead of snapping.
   ========================================================================== */

const clamp = (v) => Math.max(0, Math.min(1, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;


const PALETTES = {
  blue: {
    background: "#080808",
    colors: ["#FFFFFF", "#D9D9D9", "#A3A3A3", "#737373", "#F5F5F5"],
  },
  lime: {
    background: "#080808",
    colors: ["#FFFFFF", "#D9D9D9", "#A3A3A3", "#737373", "#F5F5F5"],
  },
  pink: {
    background: "#080808",
    colors: ["#FFFFFF", "#D9D9D9", "#A3A3A3", "#737373", "#F5F5F5"],
  },
};


const STAGE_BACKGROUNDS = [
  PALETTES.blue.background,
  PALETTES.lime.background,
  PALETTES.pink.background,
];

export default function GravityField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const root = document.documentElement;

    // Reduced motion: no WebGL, just a calm static background.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      root.style.setProperty("--gravity-bg", STAGE_BACKGROUNDS[0]);
      return () => root.style.removeProperty("--gravity-bg");
    }

    // Let three create the context (WebGL2). No manual getContext, and no
    // forceContextLoss on cleanup, so React Strict Mode can re-mount safely.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "default",
      });
    } catch (error) {
      console.warn("WebGL unavailable. Gravity animation disabled.", error);
      return;
    }

    let frame = 0;
    let resizeFrame = 0;
    let disposed = false;
    let lastTime = 0;
    let currentStage = -1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);
    camera.updateMatrixWorld();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9caee8, 2));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(-6, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2);
    rimLight.position.set(8, 5, -6);
    scene.add(rimLight);

    let viewWidth = 10;
    let viewHeight = 6;

    const updateBounds = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      viewHeight =
        2 *
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
        camera.position.z;
      viewWidth = viewHeight * aspect;

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    updateBounds();

    // Precomputed colours: no allocations or string parsing per frame.
    const toColors = (list) => list.map((hex) => new THREE.Color(hex));
    const blueColors = toColors(PALETTES.blue.colors);
    const limeColors = toColors(PALETTES.lime.colors);
    const pinkColors = toColors(PALETTES.pink.colors);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const count = isMobile ? 42 : 72;
    const geometry = new THREE.SphereGeometry(1, 24, 24);
    const balls = [];

    // Spawn inside the visible area (narrow portrait screens included).
    const spreadX = Math.min(4.5, viewWidth * 0.42);
    const spreadY = Math.min(3.2, viewHeight * 0.42);

    for (let i = 0; i < count; i++) {
      const random = Math.random();
      const radius =
        random < 0.3
          ? 0.12 + Math.random() * 0.08
          : random < 0.8
            ? 0.2 + Math.random() * 0.1
            : 0.3 + Math.random() * 0.12;

      const base = PALETTES.blue.colors[i % 5];

      const material = new THREE.MeshPhysicalMaterial({
        color: base,
        roughness: Math.random() < 0.22 ? 0.12 : 0.38,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        emissive: base,
        emissiveIntensity: 0.035,
        transparent: true, // required for material.opacity to have any effect
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(radius);
      scene.add(mesh);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random();

      const ball = {
        mesh,
        material,
        radius,
        x: Math.cos(angle) * distance * spreadX,
        y: Math.sin(angle) * distance * spreadY,
        z: (Math.random() - 0.5) * 2,
        vx: (Math.random() - 0.5) * 0.015,
        vy: (Math.random() - 0.5) * 0.015,
        vz: 0,
        tx: 0,
        ty: 0,
        tz: 0,
        seed: Math.random() * 10,
      };

      mesh.position.set(ball.x, ball.y, ball.z);
      balls.push(ball);
    }

    // Rejection-sampled heart silhouette.
    // The curve spans x ≈ ±1.14 and y ≈ -1.0…1.24, so sample that box.
    const insideHeart = (x, y) => {
      const a = x * x + y * y - 1;
      return a * a * a - x * x * y * y * y <= 0;
    };

    let heartW = 0;
    let heartH = 0;

    const assignHeart = () => {
      const scale = Math.min(viewWidth * 0.26, viewHeight * 0.31);

      for (const ball of balls) {
        let x = 0;
        let y = 0;
        let attempts = 0;

        do {
          x = Math.random() * 2.4 - 1.2;
          y = Math.random() * 2.3 - 1.05;
          attempts++;
        } while (!insideHeart(x, y) && attempts < 100);

        ball.tx = x * scale;
        ball.ty = (y + 0.12) * scale - viewHeight * 0.02;
        ball.tz = (Math.random() - 0.5) * 0.3;
      }

      heartW = window.innerWidth;
      heartH = window.innerHeight;
    };

    assignHeart();

    /* ------------------------------------------------------------------
       Pointer
       ------------------------------------------------------------------ */
    const FAR = 100;
    const mouse = new THREE.Vector3(FAR, FAR, 0);
    const previousMouse = new THREE.Vector3(FAR, FAR, 0);
    const ndc = new THREE.Vector3();
    const direction = new THREE.Vector3();
    let hasPrevious = false;
    let mouseDown = false;
    let mouseSpeed = 0;

    const resetMouse = () => {
      mouse.set(FAR, FAR, 0);
      previousMouse.set(FAR, FAR, 0);
      hasPrevious = false;
      mouseSpeed = 0;
      mouseDown = false;
    };

    const updateMouse = (event) => {
      ndc.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );

      ndc.unproject(camera);
      direction.copy(ndc).sub(camera.position).normalize();
      const distance = -camera.position.z / direction.z;

      mouse.copy(camera.position).addScaledVector(direction, distance);

      // Avoid a false speed spike on the first event after a reset.
      if (!hasPrevious) {
        previousMouse.copy(mouse);
        hasPrevious = true;
      }

      mouseSpeed = Math.min(mouse.distanceTo(previousMouse), 3);
      previousMouse.copy(mouse);
    };

    const onPointerMove = (event) => updateMouse(event);

    const onDown = (event) => {
      mouseDown = true;
      updateMouse(event);
    };

    const onUp = (event) => {
      mouseDown = false;
      // A finger that lifted leaves nothing to repel from.
      if (event.pointerType === "touch") resetMouse();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", resetMouse, { passive: true });
    root.addEventListener("pointerleave", resetMouse, { passive: true });

    /* ------------------------------------------------------------------
       Scroll + resize
       ------------------------------------------------------------------ */
    const scroll = { progress: 0 };

    const onScroll = () => {
      scroll.progress = window.scrollY / Math.max(window.innerHeight, 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (disposed) return;
        updateBounds();

        // Only re-randomise the heart on a real layout change, not on the
        // small height shifts caused by mobile browser toolbars.
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w !== heartW || Math.abs(h - heartH) / heartH > 0.15) {
          assignHeart();
        }
      });
    };

    window.addEventListener("resize", onResize);

    /* ------------------------------------------------------------------
       Loop
       ------------------------------------------------------------------ */
    const color = new THREE.Color();

    const animate = (now) => {
      if (disposed) return;

      frame = requestAnimationFrame(animate);

      // Frame-rate independent stepping (no throttle: 60 Hz stays 60 fps).
      const dt = Math.min((now - (lastTime || now)) / 16.67, 2);
      lastTime = now;

      // The cursor's speed boost fades once the pointer stops moving.
      mouseSpeed *= Math.pow(0.9, dt);

      const p = scroll.progress;

      const hero = 1 - smooth(0.3, 0.8, p);
      const drop = smooth(0.4, 0.95, p) * (1 - smooth(1.25, 1.75, p));
      const heart = smooth(1.4, 2.05, p) * (1 - smooth(2.55, 3, p));
      const release = smooth(2.7, 3.45, p);

      const lime = smooth(0.55, 1.05, p);
      const pink = smooth(1.4, 1.95, p);

      const baseOpacity = 1 - smooth(0.3, 3.7, p) * 0.25;
      const pointerRadius = mouseDown ? 2.5 : 1.9;
      const pointerForce = mouseDown ? 0.11 : 0.07;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        // Slow, organic floating.
        b.vx += Math.sin(now * 0.0004 + b.seed) * 0.0007 * hero * dt;
        b.vy += Math.cos(now * 0.0005 + b.seed * 1.7) * 0.0007 * hero * dt;

        // Bring the spheres together during the hero.
        const attraction = hero * 0.0015;
        b.vx += -b.x * attraction * dt;
        b.vy += -b.y * attraction * dt;

        // Gravity drop and bouncy floor.
        if (drop > 0.001) {
          b.vy -= 0.009 * drop * dt;

          const floor = -viewHeight / 2 + b.radius;
          if (b.y < floor) {
            b.y = floor;
            if (b.vy < 0) b.vy *= -(0.3 + drop * 0.25);
            b.vx *= 0.97;
          }
        }

        // Pull the spheres into a heart.
        if (heart > 0.001) {
          const k = 0.045 * heart * dt;
          b.vx += (b.tx - b.x) * k;
          b.vy += (b.ty - b.y) * k;
          b.vz += (b.tz - b.z) * k;
        }

        // Rush toward the camera near the end.
        if (release > 0.001) {
          b.vz += 0.045 * release * dt;
          b.vx += b.x * 0.003 * release * dt;
          b.vy += b.y * 0.003 * release * dt;
        }

        // Cursor repulsion, boosted by fast movement and pointer down.
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dz = b.z - mouse.z;
        const distanceSq = dx * dx + dy * dy + dz * dz;

        if (
          distanceSq < pointerRadius * pointerRadius &&
          distanceSq > 0.0001
        ) {
          const distance = Math.sqrt(distanceSq);
          const strength =
            (1 - distance / pointerRadius) *
            pointerForce *
            (1 + mouseSpeed * 1.8);

          b.vx += (dx / distance) * strength * dt;
          b.vy += (dy / distance) * strength * dt;
        }

        const damping = lerp(0.965, 0.992, drop);
        b.vx *= Math.pow(damping, dt);
        b.vy *= Math.pow(damping, dt);
        b.vz *= Math.pow(0.985, dt);

        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.z += b.vz * dt;

        // Keep the field in view until the release sequence. Position is
        // clamped and velocity direction set explicitly, so a sphere can't
        // flip back and forth while outside the bounds.
        if (release < 0.5) {
          const xBound = viewWidth / 2 + b.radius;
          if (b.x < -xBound) {
            b.x = -xBound;
            b.vx = Math.abs(b.vx) * 0.65;
          } else if (b.x > xBound) {
            b.x = xBound;
            b.vx = -Math.abs(b.vx) * 0.65;
          }

          const top = viewHeight / 2 + b.radius;
          if (b.y > top) {
            b.y = top;
            b.vy = -Math.abs(b.vy) * 0.65;
          }
        }

        b.mesh.position.set(b.x, b.y, b.z);

        // Blue → lime → pink, using precomputed colours.
        const slot = i % 5;
        color.copy(blueColors[slot]).lerp(limeColors[slot], lime);
        color.lerp(pinkColors[slot], pink);

        b.material.color.copy(color);
        b.material.emissive.copy(color);

        b.mesh.scale.setScalar(b.radius * (1 - heart * 0.25));

        // Fade well before the camera (z = 11) so spheres don't pop out.
        b.material.opacity = Math.min(baseOpacity, 1 - smooth(5, 10, b.z));
      }

      renderer.render(scene, camera);

      // Page background follows the scroll stage; only touch the DOM when
      // the stage actually changes.
      const stage = p > 1.55 ? 2 : p > 0.7 ? 1 : 0;
      if (stage !== currentStage) {
        currentStage = stage;
        root.style.setProperty("--gravity-bg", STAGE_BACKGROUNDS[stage]);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", resetMouse);
      root.removeEventListener("pointerleave", resetMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      for (const b of balls) {
        scene.remove(b.mesh);
        b.material.dispose();
      }

      geometry.dispose();
      renderer.dispose();

      root.style.removeProperty("--gravity-bg");
    };
  }, []);

  return (
    <div className="gravity-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}