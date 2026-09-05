'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';
import Decrypt from './Decrypt';
import { useTitleScreen } from './StartScreen';

// One entry per page section — label matches the on-page section title,
// id matches the section's DOM id.
const LINKS = [
  { id: 'home', label: 'Introduction' },
  { id: 'about', label: 'Foundations' },
  { id: 'experience', label: 'Career Log' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact Me' },
];

const DELAYS = { home: 200, about: 300, experience: 400, skills: 500, projects: 600, contact: 700 };

// Manual rAF-based smooth scroll. Native smooth scrolling (CSS
// `scroll-behavior` or `behavior: 'smooth'`) silently fails in some embedded
// Chromium views, so we animate the scroll ourselves for consistent behavior.
function smoothScrollTo(targetY, duration = 650) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;
  const start = performance.now();
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, Math.round(startY + diff * easeInOutCubic(t)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Retro button look — chunky pixel border with inset bevels. Active sections
// light up in yellow like a pressed game button.
const btnBase =
  'inline-flex items-center justify-center gap-1.5 font-pixel text-[0.55rem] lg:text-[0.6rem] uppercase tracking-[0.08em] no-underline cursor-pointer select-none border-2 border-[#000] px-2.5 py-2 transition-all duration-150';
const btnIdle =
  'bg-[var(--bg3)] text-[var(--muted)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.35)] hover:text-[var(--text)] hover:bg-[var(--bg2)] hover:brightness-125';
const btnActive =
  'bg-[var(--accent2)] text-[#0b0b1a] shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.25),inset_3px_3px_0_rgba(255,255,255,0.35),0_2px_0_#7a5c10] hover:brightness-110';

function RetroNavButton({ link, active, onNavigate, variant }) {
  const cls = variant === 'mobile' ? `${btnBase} w-full justify-start` : `${btnBase} w-full`;
  return (
    <a
      href={`#${link.id}`}
      onClick={(e) => onNavigate(e, link.id)}
      aria-current={active ? 'true' : undefined}
      className={`${cls} ${active ? btnActive : btnIdle}`}
    >
      <Decrypt text={link.label} animateOnMount delay={DELAYS[link.id]} />
    </a>
  );
}

export default function Navbar({ brand = "DavidNTD", resumeUrl = "/Resume/David Nguyen - Resume.pdf" }) {
  const [open, setOpen] = useState(false);
  const titleScreen = useTitleScreen();
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

  const showTitle = () => {
    setOpen(false);
    titleScreen?.showTitle?.();
  };

  const goToTop = () => {
    setOpen(false);
    smoothScrollTo(0);
  };

  // Only touch the scroll lock while the menu is actually open, so it
  // never clobbers the title screen's own lock when the menu is closed.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const syncNavbarHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          '--navbar-height',
          `${navRef.current.offsetHeight}px`
        );
      }
    };

    syncNavbarHeight();
    window.addEventListener('resize', syncNavbarHeight);
    return () => window.removeEventListener('resize', syncNavbarHeight);
  }, [open]);

  useEffect(() => {
    const getNavbarHeight = () => {
      if (navRef.current?.offsetHeight) {
        return navRef.current.offsetHeight;
      }
      const cssHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
      );
      return cssHeight || 72;
    };

    const handleScroll = () => {
      const navbarHeight = getNavbarHeight();
      const scrollPosition = window.scrollY + navbarHeight + 50;

      let currentSection = 'home';
      let minDistance = Infinity;

      for (const { id } of LINKS) {
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
            currentSection = id;
            break;
          }

          const distanceToTop = Math.abs(scrollPosition - offsetTop);
          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-height')
        .trim() || '4.5rem';
      const navH = Number.parseFloat(offset) * (offset.endsWith('rem') ? 16 : 1) || 72;
      const y = element.getBoundingClientRect().top + window.scrollY - navH - 12;
      smoothScrollTo(Math.max(0, y));
      setOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 bg-[rgba(13,13,15,0.85)] backdrop-blur-md border-b border-[var(--border)]"
    >
      {/* Left: signature logo — back to top of the page */}
      <div className="flex items-center justify-start min-w-0">
        <button
          type="button"
          onClick={goToTop}
          title="Back to top"
          aria-label="Back to top"
          className="inline-flex items-center py-1 ml-5 sm:ml-9 cursor-pointer bg-transparent border-none transition-opacity hover:opacity-85"
        >
          <img
            src="/images/signature.png"
            alt={brand}
            draggable={false}
            className="h-11 sm:h-14 w-auto select-none brightness-[1.6] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </button>
      </div>

      {/* Right: resume CTA + gear settings menu */}
      <div className="relative flex items-center justify-end gap-2 min-w-0">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-resume"
          title="Resume/CV"
        >
          <Decrypt text="Resume/CV" animateOnMount delay={800} />
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Open settings menu"
          aria-expanded={open}
          title="Menu"
          className="inline-flex items-center gap-2 px-3 py-2.5 cursor-pointer border-2 border-[#000] bg-[var(--bg3)] text-[var(--muted)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.35)] transition-all duration-150 hover:text-[var(--accent2)] hover:bg-[var(--bg2)] hover:brightness-125"
        >
          <Settings size={17} className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
          <span className="hidden sm:inline font-pixel text-[0.6rem] uppercase tracking-[0.1em]">
            Menu
          </span>
        </button>

        {/* Dropdown: section navigation + exit to title screen */}
        {open && (
          <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 max-h-[calc(100dvh-var(--navbar-height)-2rem)] overflow-y-auto bg-[rgba(13,13,15,0.97)] border-2 border-[#000] shadow-[inset_2px_2px_0_rgba(255,255,255,0.06),inset_-2px_-2px_0_rgba(0,0,0,0.4),0_16px_40px_rgba(0,0,0,0.5)] p-3 flex flex-col gap-1.5">
            {LINKS.map((link) => (
              <RetroNavButton
                key={link.id}
                link={link}
                active={activeSection === link.id}
                onNavigate={handleClick}
                variant="mobile"
              />
            ))}

            <div className="h-px bg-[var(--border)] my-1.5" />

            <button
              type="button"
              onClick={showTitle}
              className={`${btnBase} w-full text-[var(--danger)] hover:text-[#ffd7d9]`}
            >
              <Decrypt text="Exit to Title" animateOnMount delay={900} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
