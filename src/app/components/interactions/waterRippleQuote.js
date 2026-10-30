"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Tunables                                                           */
/* ------------------------------------------------------------------ */
const MAX_RIPPLES = 40; // simultaneous ripples (uniform array size)
const LIFETIME = 3.4; // seconds a ripple lives
const SPACING = 0.05; // distance between ripples along the cursor path
const MAX_PER_EVENT = 2; // cap per pointer event (keeps fast swipes smooth)

const vertexShader = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

#define COUNT ${MAX_RIPPLES}
#define LIFE ${LIFETIME.toFixed(2)}

uniform vec2 resolution;
uniform vec4 ripples[COUNT]; // x, y, age (s), strength

const float K = 85.0;      // wave number  (higher = tighter rings)
const float SPEED = 0.30;  // ring expansion speed
const float AMP = 0.0065;  // overall wave height

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float aspect = resolution.x / resolution.y;

  // Analytic surface gradient (sum of all ripples)
  vec2 grad = vec2(0.0);

  for (int i = 0; i < COUNT; i++) {
    vec4 rp = ripples[i];
    float age = rp.z;
    float strength = rp.w;

    if (strength <= 0.0 || age <= 0.0 || age >= LIFE) continue;

    vec2 delta = (uv - rp.xy) * vec2(aspect, 1.0);
    float r = max(length(delta), 0.0001);

    // Wave packet: sharp leading crest, longer trailing tail that
    // widens over time (dispersion) like a real water ring.
    float d = r - age * SPEED;
    float w1 = 0.022 + 0.030 * age;
    float w2 = 0.060 + 0.110 * age;

    if (d > w1 * 4.0 || d < -w2 * 4.0) continue;

    float w = d > 0.0 ? w1 : w2;
    float env = exp(-(d * d) / (w * w));
    float phase = K * d;

    // d/dr of  env * cos(K d)
    float dEnv = env * (-2.0 * d / (w * w));
    float slope = -K * sin(phase) * env + cos(phase) * dEnv;

    float fade = exp(-age * 1.5)
               * smoothstep(0.0, 0.12, age)
               * (1.0 - smoothstep(LIFE - 0.7, LIFE, age));

    float spread = inversesqrt(1.0 + r * 9.0);

    grad += (delta / r) * slope * AMP * strength * fade * spread;
  }

  // Surface normal + lighting (light only shows on tilted water,
  // flat water stays exactly #000000)
  vec3 n = normalize(vec3(-grad, 1.0));
  vec3 L = normalize(vec3(-0.45, 0.65, 0.62));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));

  float lit = max(dot(n, L) - L.z, 0.0);
  float spec = pow(max(dot(n, H), 0.0), 140.0);

  float intensity = lit * 0.6 + spec * 1.1;
  intensity = 1.0 - exp(-intensity * 1.8); // soft highlight roll-off

  vec3 color = vec3(0.86, 0.93, 1.0) * intensity;

  // Dither to avoid banding in the dark gradients
  float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  color += dither * smoothstep(0.0, 0.02, intensity);

  gl_FragColor = vec4(max(color, 0.0), 1.0);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

  if (!vertex || !fragment) return null;

  const program = gl.createProgram();

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function WaterRippleQuote() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
    });

    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 1);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
      ]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "position");

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution");
    const rippleUniform = gl.getUniformLocation(program, "ripples[0]");

    const ripples = [];
    const data = new Float32Array(MAX_RIPPLES * 4);

    let frame = null;
    let visible = true;
    let destroyed = false;
    let touchActive = false;

    // pointer path tracking
    let last = null; // { x, y } in 0..1 canvas space
    let lastMoveTime = 0;
    let carry = 0; // distance travelled since the last spawned ripple

    /* ---------------- render loop (only runs while needed) ---------------- */

    const render = (now) => {
      frame = null;
      if (destroyed) return;

      data.fill(0);

      let index = 0;

      for (const ripple of ripples) {
        const age = (now - ripple.time) / 1000;

        if (age >= LIFETIME) continue;

        const offset = index * 4;

        data[offset] = ripple.x;
        data[offset + 1] = ripple.y;
        data[offset + 2] = age; // negative age = delayed ripple, shader skips it
        data[offset + 3] = ripple.strength;

        index++;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform4fv(rippleUniform, data);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      for (let i = ripples.length - 1; i >= 0; i--) {
        if ((now - ripples[i].time) / 1000 >= LIFETIME) {
          ripples.splice(i, 1);
        }
      }

      // keep animating only while there is something to animate
      if (visible && ripples.length > 0) {
        frame = requestAnimationFrame(render);
      }
    };

    const ensureLoop = () => {
      if (frame === null && visible && !destroyed) {
        frame = requestAnimationFrame(render);
      }
    };

    /* ---------------------------- ripple helpers ---------------------------- */

    const addRipple = (x, y, strength = 1, delay = 0) => {
      ripples.push({
        x,
        y,
        time: performance.now() + delay,
        strength,
      });

      if (ripples.length > MAX_RIPPLES) ripples.shift();

      ensureLoop();
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);

      ensureLoop(); // resizing clears the canvas, redraw it
    };

    const toCanvasSpace = (event) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
        aspect: rect.width / rect.height,
      };
    };

    /* ----------------------------- pointer events ---------------------------- */

    const pointerMove = (event) => {
      if (event.pointerType === "touch" && !touchActive) return;

      const { x, y, aspect } = toCanvasSpace(event);
      const now = performance.now();

      if (!last) {
        addRipple(x, y, 0.5);
        last = { x, y };
        lastMoveTime = now;
        carry = 0;
        return;
      }

      const dx = (x - last.x) * aspect;
      const dy = y - last.y;
      const segment = Math.hypot(dx, dy);

      if (segment === 0) return;

      const dt = Math.max((now - lastMoveTime) / 1000, 0.001);
      const speed = segment / dt;

      // faster cursor = slightly stronger ripple
      const strength = Math.min(0.28 + speed * 0.1, 0.7);

      // place ripples evenly along the path, not just at event positions
      let travelled = SPACING - carry;
      let spawned = 0;
      const points = [];

      while (travelled <= segment) {
        const t = travelled / segment;

        points.push({
          x: last.x + (x - last.x) * t,
          y: last.y + (y - last.y) * t,
        });

        travelled += SPACING;
      }

      carry = segment - (travelled - SPACING);

      // on very fast swipes keep only the newest points
      for (const point of points.slice(-MAX_PER_EVENT)) {
        addRipple(point.x, point.y, strength);
        spawned++;
      }

      last = { x, y };
      lastMoveTime = now;

      return spawned;
    };

    const pointerDown = (event) => {
      if (event.pointerType === "touch") touchActive = true;

      const { x, y } = toCanvasSpace(event);

      // a drop: strong first ring + a smaller delayed second ring
      addRipple(x, y, 1.5);
      addRipple(x, y, 0.55, 140);

      last = { x, y };
      lastMoveTime = performance.now();
      carry = 0;
    };

    const pointerUp = (event) => {
      if (event.pointerType === "touch") {
        touchActive = false;
        last = null;
      }
    };

    const pointerLeave = () => {
      last = null;
    };

    /* -------------------------------- observers ------------------------------- */

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        ensureLoop();
      } else if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    });

    intersectionObserver.observe(section);

    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("pointerleave", pointerLeave);

    resize();

    return () => {
      destroyed = true;

      if (frame !== null) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("pointerleave", pointerLeave);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      // Do NOT call WEBGL_lose_context.loseContext() here: React Strict Mode
      // re-runs this effect on the same canvas and would get a lost context.
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="A thought on creativity"
      className="relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#000000] py-24 md:min-h-[520px] md:py-28"
    >
      {/* Interactive water surface */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full touch-pan-y"
      />

      {/* Quote */}
      <div className="container-site pointer-events-none relative z-10">
        <div className="mx-auto max-w-[1050px] text-center">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#929292] md:text-xs">
            A DIFFERENT WAY OF THINKING
          </p>

          <h2 className="text-balance text-[clamp(2.5rem,7.2vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#f5f5f5]">
            Creativity is not about
            <br className="hidden md:block" />
            <span className="font-editorial font-normal italic">
              thinking differently.
            </span>
            <br />
            It&apos;s about making
            <br className="hidden md:block" />
            the impossible
            <span className="font-editorial font-normal italic">
              {" "}feel real.
            </span>
          </h2>

          <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.16em] text-[#929292]">
            MOVE YOUR CURSOR · CREATE YOUR OWN WAVES
          </p>
        </div>
      </div>
    </section>
  );
}