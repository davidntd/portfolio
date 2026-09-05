"use client";

import { useEffect, useRef } from "react";

const C = {
  spaceTop: "#05060f",
  spaceMid: "#0a0d24",
  spaceBottom: "#191238",
  line: "rgba(160,190,255,",
  cyan: "#35c3ff",
  cyanRGB: "53,195,255",
  yellow: "#ffd64d",
  yellowRGB: "255,214,77",
};

/**
 * Full-page retro space backdrop, painted on a fixed canvas behind the page:
 *  - a constellation of drifting star "nodes" connected by faint lines,
 *  - the robot, spaceship and chess images drifting across space (the robot
 *    and spaceship occasionally emit musical notes that float away),
 *  - several pixel planets, nebulae and the occasional shooting star.
 */
export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;
    let stars = [];
    let sprites = [];
    let notes = [];
    let planets = [];
    let shooting = null;

    // Sprites drift across space, slowly rotating left or right. The robot
    // and spaceship are the note emitters; the chess piece is smaller.
    const images = {
      robot: null,
      spaceship: null,
      chess: null,
    };
    for (const key of Object.keys(images)) {
      const img = new Image();
      img.src = `/images/${key}.png`;
      images[key] = img;
    }

    const rnd = (a, b) => a + Math.random() * (b - a);

    // Wrap an object around the screen edges based on its velocity.
    function wrap(o, m) {
      if (o.vx > 0 && o.x > W + m) o.x = -m;
      if (o.vx < 0 && o.x < -m) o.x = W + m;
      if (o.vy > 0 && o.y > H + m) o.y = -m;
      if (o.vy < 0 && o.y < -m) o.y = H + m;
    }

    // ── Stars: nearly stationary nodes (blue/yellow) with sparse connections ──
    function makeStars() {
      stars = [];
      for (let i = 0; i < 55; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: rnd(-0.04, 0.04),
          vy: rnd(-0.04, 0.04),
          r: Math.random() < 0.6 ? 3 : 4,
          color: Math.random() < 0.5 ? C.cyan : C.yellow,
          base: rnd(0.35, 0.75),
          speed: rnd(0.6, 1.6),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ── Sprites: robot, spaceship and chess images flowing through space ──
    // `w` is the on-screen draw width in px; the chess piece is deliberately
    // smaller than the robot and the spaceship.
    function makeSprites() {
      sprites = [
        // robots
        { key: "robot", x: W * 0.2, y: H * 0.6, vx: 0.45, vy: 0.2, w: 110, phase: 0, spin: -0.15, phase0: 0, notes: true },
        { key: "robot", x: W * 0.78, y: H * 0.25, vx: -0.35, vy: 0.24, w: 88, phase: 1.7, spin: 0.12, phase0: 1.2, notes: false },
        // spaceships
        { key: "spaceship", x: -170, y: H * 0.3, vx: 1.0, vy: 0.22, w: 150, phase: 0, spin: 0.08, phase0: 0, notes: true },
        { key: "spaceship", x: W + 170, y: H * 0.52, vx: -0.8, vy: -0.18, w: 120, phase: 1.2, spin: -0.1, phase0: Math.PI / 2, notes: false },
        { key: "spaceship", x: W * 0.7, y: H + 160, vx: -0.25, vy: -0.9, w: 110, phase: 2.1, spin: 0.06, phase0: Math.PI, notes: false },
        // chess — smaller than the robot and spaceship
        { key: "chess", x: W * 0.45, y: H * 0.85, vx: 0.3, vy: -0.25, w: 70, phase: 3.1, spin: -0.2, phase0: 2.4, notes: false },
        { key: "chess", x: W * 0.12, y: H * 0.42, vx: 0.2, vy: 0.3, w: 56, phase: 0.8, spin: 0.25, phase0: 1.0, notes: false },
      ];
      for (const s of sprites) {
        s.noteTimer = rnd(0.4, 1.4);
      }
    }

    // ── Pixel planets (low-res offscreen upscaled chunky) ──
    // The sprite is bigger than the planet body so a ring always fits fully
    // inside it and never gets clipped at the planet's edge.
    const SPRITE = 72;
    const BODY_R = 21;

    function makePlanet(opts) {
      const S = SPRITE;
      const cx = S / 2;
      const cy = S / 2;
      const off = document.createElement("canvas");
      off.width = S;
      off.height = S;
      const octx = off.getContext("2d");

      // back half of the ring sits behind the body
      if (opts.ring) {
        octx.strokeStyle = opts.ring;
        octx.lineWidth = 3;
        octx.beginPath();
        octx.ellipse(cx, cy + 2, BODY_R + 3, 11, -0.3, Math.PI, Math.PI * 2);
        octx.stroke();
      }

      const g = octx.createRadialGradient(cx - 6, cy - 9, 3, cx, cy, BODY_R);
      g.addColorStop(0, opts.light);
      g.addColorStop(0.55, opts.mid);
      g.addColorStop(1, opts.dark);
      octx.fillStyle = g;
      octx.beginPath();
      octx.arc(cx, cy, BODY_R, 0, Math.PI * 2);
      octx.fill();

      octx.fillStyle = opts.spot;
      for (const [sx, sy, sr] of opts.spots || []) {
        octx.beginPath();
        octx.arc(sx, sy, sr, 0, Math.PI * 2);
        octx.fill();
      }

      octx.fillStyle = "rgba(255,255,255,0.08)";
      octx.beginPath();
      octx.arc(cx - 9, cy - 11, 6, 0, Math.PI * 2);
      octx.fill();

      // front half of the ring sits over the body
      if (opts.ring) {
        octx.beginPath();
        octx.ellipse(cx, cy + 2, BODY_R + 3, 11, -0.3, 0, Math.PI);
        octx.stroke();
      }

      // on-screen draw size for the whole sprite (body diameter = opts.size)
      const draw = Math.round((opts.size * S) / (2 * BODY_R));
      return { cv: off, fx: opts.fx, fy: opts.fy, size: opts.size, draw };
    }

    function makePlanets() {
      planets = [
        // big ringed purple gas giant (top right)
        makePlanet({
          fx: 0.84, fy: 0.06, size: 168,
          light: "#8a6fe8", mid: "#5440a8", dark: "#221a5c",
          ring: "rgba(255,214,77,0.55)",
          spot: "rgba(10,8,30,0.4)",
          spots: [[27, 27, 4], [40, 38, 3], [32, 45, 2.2]],
        }),
        // teal ocean world (bottom left)
        makePlanet({
          fx: 0.05, fy: 0.78, size: 112,
          light: "#5fd4c2", mid: "#2a8f9e", dark: "#123c5e",
          ring: null,
          spot: "rgba(8,24,48,0.35)",
          spots: [[26, 30, 5], [39, 40, 4], [31, 45, 3], [44, 26, 2.5]],
        }),
        // fiery rocky planet with a thin ring (top left)
        makePlanet({
          fx: 0.08, fy: 0.14, size: 88,
          light: "#ff9a5c", mid: "#e0553a", dark: "#7a1e2e",
          ring: "rgba(169,226,255,0.4)",
          spot: "rgba(40,8,16,0.35)",
          spots: [[34, 28, 3], [42, 40, 2]],
        }),
        // small cratered moon (bottom right)
        makePlanet({
          fx: 0.74, fy: 0.86, size: 62,
          light: "#d8d4e8", mid: "#8f8aa8", dark: "#4a4666",
          ring: null,
          spot: "rgba(20,18,40,0.35)",
          spots: [[28, 28, 3.5], [39, 36, 2.5], [33, 42, 2], [44, 27, 1.8]],
        }),
      ];
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
      makeSprites();
      // Anchor each planet near its fraction, but clamp so the full sprite
      // (including any ring) always stays fully on screen.
      const M = 16;
      for (const p of planets) {
        p.x = Math.round(Math.min(Math.max(p.fx * W, M), Math.max(W - p.draw - M, M)));
        p.y = Math.round(Math.min(Math.max(p.fy * H, M), Math.max(H - p.draw - M, M)));
      }
    }

    function drawNebula(x, y, color) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 280);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - 280, y - 280, 560, 560);
    }

    // ── Sprites ──
    // A drifting image sprite with a gentle bob, slow rotation and a soft
    // glow so it pops against the dark space behind it.
    function drawSprite(s) {
      const img = images[s.key];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const ar = img.naturalHeight / img.naturalWidth;
      const w = s.w;
      const h = Math.round(w * ar);
      s.h = h;
      const bob = Math.sin(t * 1.2 + s.phase) * 3;
      const cx = s.x + Math.sin(t * 0.5 + s.phase) * 4;
      const cy = s.y + bob;
      const rot = s.spin * t + s.phase0;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      // soft halo behind the sprite
      const glowR = w * 0.95;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
      g.addColorStop(0, "rgba(255,255,255,0.09)");
      g.addColorStop(0.4, "rgba(120,160,255,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(-glowR, -glowR, glowR * 2, glowR * 2);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();
    }

    // Pixel eighth note (♪): flag, stem, filled head.
    const noteSprite = ({ px, color }) => {
      // flag
      px(5, 0, 2, 2, color);
      px(5, 2, 1, 1, color);
      // stem
      px(4, 1, 1, 7, color);
      // head (filled oval)
      px(2, 7, 4, 1, color);
      px(1, 8, 5, 2, color);
      px(2, 10, 4, 1, color);
    };

    function drawNote(n) {
      const s = n.size;
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.rot);
      ctx.globalAlpha = n.alpha;
      const px = (gx, gy, w, h, c) => {
        ctx.fillStyle = c;
        ctx.fillRect(Math.round((gx - 3.5) * s), Math.round((gy - 5.5) * s), Math.ceil(w * s), Math.ceil(h * s));
      };
      noteSprite({ px, color: n.color });
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // Emit 1–2 musical notes from the top of a note-emitting sprite.
    function emitNotes(s) {
      const h = s.h || 80;
      const n = Math.random() < 0.5 ? 1 : 2;
      for (let i = 0; i < n; i++) {
        notes.push({
          x: s.x + (Math.random() - 0.5) * s.w * 0.6,
          y: s.y - h * 0.55 - 8,
          vx: (Math.random() - 0.5) * 0.7,
          vy: -0.55 - Math.random() * 0.7,
          vr: (Math.random() - 0.5) * 0.2,
          t: 0,
          life: 2.4 + Math.random() * 1.4,
          baseSize: 2.2 + Math.random() * 1.4,
          alpha: 1,
          color: Math.random() < 0.55 ? C.yellow : C.cyan,
        });
      }
    }

    function frame() {
      t += 0.016;

      // sky gradient
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, C.spaceTop);
      g.addColorStop(0.55, C.spaceMid);
      g.addColorStop(1, C.spaceBottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // nebulae
      drawNebula(W * 0.22, H * 0.28, "rgba(41,173,255,0.08)");
      drawNebula(W * 0.78, H * 0.72, "rgba(255,214,77,0.05)");
      drawNebula(W * 0.5, H * 0.5, "rgba(176,90,255,0.06)");

      // constellation lines — sparse, so each star reads on its own
      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 80 * 80) {
            const alpha = (1 - Math.sqrt(d2) / 80) * 0.15;
            ctx.strokeStyle = `${C.line}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // star nodes (blue + yellow) with a strong pulsing glow
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        wrap(s, 30);
        const a = s.base * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        const core = Math.max(0.2, Math.min(1, a));
        const x = Math.round(s.x);
        const y = Math.round(s.y);
        const rgb = s.color === C.yellow ? C.yellowRGB : C.cyanRGB;
        const glowR = s.r * 5.5;

        // soft halo that pulses with the twinkle (dimmer)
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grad.addColorStop(0, `rgba(${rgb},${(core * 0.6).toFixed(3)})`);
        grad.addColorStop(0.35, `rgba(${rgb},${(core * 0.22).toFixed(3)})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.fillRect(x - glowR, y - glowR, glowR * 2, glowR * 2);

        // bright core + glint
        ctx.fillStyle = s.color;
        ctx.fillRect(x - 2, y - 2, s.r, s.r);
        if (s.r > 3) {
          ctx.fillRect(x - 3, y, 6, 1);
          ctx.fillRect(x, y - 3, 1, 6);
        }
      }

      // planets
      ctx.imageSmoothingEnabled = false;
      for (const p of planets) {
        ctx.drawImage(p.cv, p.x, p.y, p.draw, p.draw);
      }

      // shooting star
      if (!shooting && Math.random() < 0.003) {
        shooting = {
          x: rnd(W * 0.2, W * 0.8),
          y: rnd(0, H * 0.3),
          vx: rnd(5, 8),
          vy: rnd(2.5, 4.5),
          life: 1,
        };
      }
      if (shooting) {
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.02;
        ctx.strokeStyle = `rgba(235,232,255,${Math.max(0, shooting.life)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.vx * 7, shooting.y - shooting.vy * 7);
        ctx.stroke();
        if (shooting.life <= 0 || shooting.x > W + 100 || shooting.y > H + 100) shooting = null;
      }

      // sprites — robot, spaceship and chess drifting through space
      for (const s of sprites) {
        s.x += s.vx;
        s.y += s.vy;
        wrap(s, 200);
        if (s.notes) {
          s.noteTimer -= 0.016;
          if (s.noteTimer <= 0) {
            s.noteTimer = 0.9 + Math.random() * 1.1;
            emitNotes(s);
          }
        }
        drawSprite(s);
      }

      // musical notes — float up and fade out
      for (const n of notes) {
        n.t += 0.016;
        n.x += n.vx + Math.sin(n.t * 3 + n.x) * 0.08;
        n.y += n.vy;
        n.vy -= 0.012; // gentle acceleration upward
        n.rot += n.vr;
        const k = Math.max(0, 1 - n.t / n.life);
        n.alpha = k;
        n.size = n.baseSize * (0.55 + 0.45 * k);
      }
      notes = notes.filter((n) => n.t < n.life);
      for (const n of notes) drawNote(n);

      raf = requestAnimationFrame(frame);
    }
    makePlanets();
    resize();
    frame();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
