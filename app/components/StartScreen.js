"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const TitleScreenContext = createContext(null);

/** Lets any child (e.g. the navbar) jump back to the title screen. */
export function useTitleScreen() {
  return useContext(TitleScreenContext);
}

/**
 * Arcade-style title screen. Shows on page load, sits above everything
 * (below the CRT scanline/vignette layer so it reads as part of the monitor),
 * and waits for Enter / Space / tap before revealing the site.
 *
 * The site content is rendered underneath the whole time (keeps the
 * server-rendered page intact for SEO), but is inert while the boot screen is
 * up. When the game starts, children are remounted via a `key` change so all
 * the entrance animations (name decrypt, fade-ups) replay in view.
 */
export default function StartScreen({ brand, tagline, children }) {
  const [phase, setPhase] = useState("boot"); // "boot" | "leaving" | "game"
  const [runId, setRunId] = useState(0);
  const [banner, setBanner] = useState(false); // "WELCOME" banner
  const [bannerGone, setBannerGone] = useState(false);
  const startedRef = useRef(false);

  // Remember the scroll position so a refresh can land back where the user
  // was once the boot screen is dismissed, instead of always the top.
  useEffect(() => {
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    } catch {}
    const onScroll = () => {
      try {
        sessionStorage.setItem("fb:scroll", String(window.scrollY));
      } catch {}
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    // Restore the pre-refresh scroll position once the boot screen fades out
    // and the scroll lock lifts (phase becomes "game" at 500ms).
    let savedScroll = 0;
    try {
      savedScroll = Number(sessionStorage.getItem("fb:scroll") || 0);
      sessionStorage.removeItem("fb:scroll");
    } catch {}
    // Remount the site so its entrance animations replay on every start.
    setRunId((n) => n + 1);
    setBanner(true);
    setBannerGone(false);
    setPhase("leaving");
    if (savedScroll > 0) {
      setTimeout(() => window.scrollTo(0, savedScroll), 550);
    }
  }, []);

  const showTitle = useCallback(() => {
    // Exiting to the title screen is an explicit "start over" — drop the
    // saved scroll so the next start lands at the top.
    try {
      sessionStorage.removeItem("fb:scroll");
    } catch {}
    window.scrollTo(0, 0);
    startedRef.current = false;
    setPhase("boot");
  }, []);

  // The WELCOME banner holds over the reveal, then wipes away.
  useEffect(() => {
    if (!banner) return;
    const t1 = setTimeout(() => setBannerGone(true), 1600);
    const t2 = setTimeout(() => setBanner(false), 2150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [banner]);

  // Only intercept Enter/Space while the boot screen is actually up, and
  // never while the user is typing in a form field — otherwise every Space
  // and Enter keypress on the page would be eaten (broken text inputs).
  useEffect(() => {
    if (phase === "game") return; // boot screen gone — leave all keys alone
    const onKey = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const t = e.target;
      const isTyping =
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable);
      if (isTyping) return;
      e.preventDefault();
      start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start]);

  // Lock scroll while the boot screen is up so the page behind stays put.
  useEffect(() => {
    if (phase === "game") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const t = setTimeout(() => setPhase("game"), 500);
    return () => clearTimeout(t);
  }, [phase]);

  const booted = phase !== "game";

  return (
    <TitleScreenContext.Provider value={{ showTitle }}>
      {banner && (
        <div
          aria-hidden="true"
          className={`game-start-banner ${bannerGone ? "game-start-banner-leave" : ""}`}
        >
          <div className="game-start-banner-box">
            <p className="game-start-title">▶ WELCOME</p>
          </div>
        </div>
      )}

      {phase !== "game" && (
      <div
        onClick={start}
        role="presentation"
        aria-hidden
        className={`start-screen fixed inset-0 z-[900] flex flex-col items-center justify-center ${
          phase === "leaving" ? "start-screen-leave" : ""
        }`}
      >
        {/* HUD corner brackets */}
        {[
          'left-3 top-3 border-l-2 border-t-2',
          'right-3 top-3 border-r-2 border-t-2',
          'bottom-3 left-3 border-b-2 border-l-2',
          'bottom-3 right-3 border-b-2 border-r-2',
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`pointer-events-none absolute ${pos} h-5 w-5 border-[rgba(var(--accent-rgb),0.55)]`}
          />
        ))}

        <div className="relative flex flex-col items-center gap-7 px-6 text-center">
          <div className="boot-fade">
            <img
              src="/images/signature.png"
              alt={`${brand} signature`}
              className="h-auto w-[min(70vw,460px)]"
              style={{ filter: "drop-shadow(0 0 26px rgba(var(--accent-rgb), 0.35))" }}
            />
          </div>

          <div className="boot-fade-2 flex flex-col items-center gap-3">
            <p className="font-pixel text-[clamp(1rem,3.8vw,1.5rem)] tracking-[0.14em] text-[var(--text)]">
              David Nguyen
            </p>
            <p className="font-mono text-[clamp(0.85rem,2.6vw,1rem)] text-[var(--muted)]">
              {tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={start}
            autoFocus
            className="boot-fade-3 mt-2 cursor-pointer border-2 border-transparent px-6 py-3 transition-colors hover:border-[var(--accent2)] focus-visible:border-[var(--accent2)]"
          >
            <span className="blink font-pixel text-[clamp(0.75rem,2.8vw,1.1rem)] tracking-[0.18em] text-[var(--accent2)]">
              ▶ PRESS ENTER TO START
            </span>
            <span className="mt-3 block font-mono text-[0.7rem] tracking-[0.05em] text-[var(--muted)]">
              — OR TAP ANYWHERE —
            </span>
          </button>
        </div>

      </div>
      )}

      <div
        key={`run-${runId}`}
        inert={booted}
        aria-hidden={booted}
        className={booted ? "pointer-events-none select-none" : ""}
      >
        {children}
      </div>

      {/* No-JS fallback: without scripting the screen can't be dismissed. */}
      <noscript>
        <style>{`.start-screen { display: none !important; }`}</style>
      </noscript>
    </TitleScreenContext.Provider>
  );
}
