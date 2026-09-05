"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Retro scroll-reveal. Content starts hidden and pops in with chunky pixel
 * steps (CSS `steps()` timing) the moment it scrolls into view, so sections
 * materialize like a classic game scene. `delay` staggers sibling cards —
 * each waits its turn like sprites drawing in one by one.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`retro-reveal ${shown ? "retro-reveal-shown" : ""} ${className}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
