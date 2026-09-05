'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MousePointer2 } from 'lucide-react';
import Decrypt from './Decrypt';
import Reveal from './Reveal';
import { Section } from './SectionTitle';

// @sync-start groups
export const DEFAULT_GROUPS = [
  {
    "label": "Languages & data",
    "skills": [
      {
        "name": "C",
        "icon": "/icons/C.svg",
        "level": "Intermediate"
      },
      {
        "name": "C++",
        "icon": "/icons/CPP.svg",
        "level": "Basic"
      },
      {
        "name": "C#",
        "icon": "/icons/CSharp.svg",
        "level": "Intermediate"
      },
      {
        "name": "Java",
        "icon": "/icons/Java.svg",
        "level": "Basic"
      },
      {
        "name": "Python",
        "icon": "/icons/Python.svg",
        "level": "Proficient"
      },
      {
        "name": "HTML",
        "icon": "/icons/HTML.svg",
        "level": "Proficient"
      },
      {
        "name": "CSS",
        "icon": "/icons/CSS.svg",
        "level": "Proficient"
      },
      {
        "name": "JavaScript",
        "icon": "/icons/JavaScript.svg",
        "level": "Proficient"
      },
      {
        "name": "TypeScript",
        "icon": "/icons/TypeScript.svg",
        "level": "Intermediate"
      },
      {
        "name": "PostgreSQL",
        "icon": "/icons/PostgreSQL.svg",
        "level": "Intermediate"
      }
    ]
  },
  {
    "label": "Frameworks",
    "skills": [
      {
        "name": "React",
        "icon": "/icons/React.svg",
        "level": "Proficient"
      },
      {
        "name": "Next.js",
        "icon": "/icons/NextJS.svg",
        "level": "Proficient"
      },
      {
        "name": "Node.js",
        "icon": "/icons/NodeJS.svg",
        "level": "Intermediate"
      },
      {
        "name": "Tailwind CSS",
        "icon": "/icons/TailwindCSS.svg",
        "level": "Proficient"
      },
      {
        "name": "Arduino",
        "icon": "/icons/Arduino.svg",
        "level": "Intermediate"
      }
    ]
  },
  {
    "label": "Tools & platforms",
    "skills": [
      {
        "name": "Git",
        "icon": "/icons/Git.svg",
        "level": "Intermediate"
      },
      {
        "name": "Vercel",
        "icon": "/icons/Vercel.svg",
        "level": "Intermediate"
      },
      {
        "name": "Framer",
        "icon": "/icons/Framer.svg",
        "level": "Intermediate"
      },
      {
        "name": "Supabase",
        "icon": "/icons/Supabase.svg",
        "level": "Intermediate"
      },
      {
        "name": "PlatformIO",
        "icon": "/icons/PlatformIO.svg",
        "level": "Intermediate"
      },
      {
        "name": "ESP32",
        "icon": "/icons/Espressif32.svg",
        "level": "Intermediate"
      }
    ]
  }
];
// @sync-end

const PROFICIENCY = {
  Basic: {
    fill: 33,
    barClass: 'bg-[var(--muted)]',
    badgeClass: 'text-[var(--muted)] border-[var(--muted)]/40 bg-[var(--muted)]/10',
  },
  Intermediate: {
    fill: 66,
    barClass: 'bg-[var(--accent2)]',
    badgeClass: 'text-[var(--accent2)] border-[rgba(var(--accent2-rgb),0.45)] bg-[rgba(var(--accent2-rgb),0.1)]',
  },
  Proficient: {
    fill: 100,
    barClass: 'bg-[var(--accent)]',
    badgeClass: 'text-[var(--accent)] border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]',
  },
};

const HEADER_CARD_CLASS =
  'rounded-lg px-3 py-2.5 min-h-[2.875rem] h-full border';

export function HintCard() {
  return (
    <div
      className={`${HEADER_CARD_CLASS} flex items-center gap-2 text-xs sm:text-[0.8rem] text-[var(--muted)] border-dashed border-[var(--border)] bg-[var(--bg3)] w-full lg:w-auto lg:max-w-fit`}
    >
      <MousePointer2 size={16} className="text-[var(--accent2)] shrink-0 animate-pulse" />
      <span className="md:hidden">
        <Decrypt text="Tap any icon for name & proficiency" />
      </span>
      <span className="hidden md:inline">
        <Decrypt text="Hover any icon for name & proficiency" />
      </span>
    </div>
  );
}

export function LegendCard() {
  const barTrackClass =
    'w-14 shrink-0 h-1 rounded-full bg-[var(--card)] overflow-hidden border border-[var(--border)]';

  return (
    <div
      className={`${HEADER_CARD_CLASS} flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-[0.8rem] border-[var(--border)] bg-[var(--bg3)] w-full lg:w-auto lg:max-w-fit`}
    >
      {Object.entries(PROFICIENCY).map(([label, style]) => (
        <div key={label} className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded border whitespace-nowrap ${style.badgeClass}`}>
            <Decrypt text={label} />
          </span>
          <div className={barTrackClass}>
            <div className={`h-full rounded-full ${style.barClass}`} style={{ width: `${style.fill}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsBlock({ groups = [] }) {
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    if (!activeSkill) return;

    const handlePointerDown = (e) => {
      if (!e.target.closest('[data-skill-badge]')) {
        setActiveSkill(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeSkill]);

  return (
    <div className="w-full overflow-visible">
      <div data-skills-card className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 pt-3.5 overflow-x-clip">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 overflow-visible">
          {groups.map((group, groupIdx) => (
            <Reveal
              key={group.label}
              delay={groupIdx * 130}
              className="min-w-0 lg:px-4 lg:border-l lg:border-[var(--border)] first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0"
            >
              <Decrypt
                text={group.label}
                as="p"
                className="mb-3 text-center w-full font-pixel text-[0.6rem] text-[var(--muted)] tracking-[0.08em] uppercase"
              />
              <div className="grid grid-cols-5 gap-x-1.5 sm:gap-x-2 gap-y-3">
                {group.skills.map((s, skillIdx) => (
                  <SkillBadge
                    key={s.name}
                    skill={s}
                    revealDelay={skillIdx * 40}
                    isActive={activeSkill === s.name}
                    onActivate={() => setActiveSkill((current) => (current === s.name ? null : s.name))}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ skill, revealDelay = 0, isActive = false, onActivate }) {
  const prof = PROFICIENCY[skill.level] || PROFICIENCY.Intermediate;
  const tipRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  // Only saved /icons SVGs are shown here — never fetch an external CDN URL.
  const isLocalIcon = typeof skill.icon === "string" && skill.icon.startsWith("/icons/");

  // Tooltips for badges in the edge columns can poke past the card edge /
  // viewport and get clipped (the card clips horizontally). Clamp the
  // tooltip so it stays fully on screen — on mobile when tapped, on desktop
  // while hovered. Re-clamp on scroll/resize while it's visible.
  useLayoutEffect(() => {
    const el = tipRef.current;
    if (!el) return;
    const visible = isActive || hovered;
    if (!visible) {
      el.style.translate = '';
      return;
    }
    const apply = () => {
      // Compute the un-clamped position from the badge center + tooltip width
      // instead of measuring the tooltip — the tooltip's 300ms fade/translate
      // transition makes getBoundingClientRect read mid-animation values.
      const badge = el.parentElement;
      const bc = badge.getBoundingClientRect();
      const center = bc.left + bc.width / 2;
      const w = el.offsetWidth;
      const rLeft = center - w / 2;
      const rRight = center + w / 2;
      const margin = 16;
      // The card clips horizontally (overflow-x-clip), so clamp against its
      // edges — the viewport margin alone is not enough when the card is
      // inset from the window edge.
      const card = el.closest('[data-skills-card]');
      const cr = card ? card.getBoundingClientRect() : null;
      const leftEdge = cr ? cr.left : 0;
      const rightEdge = cr ? cr.right : window.innerWidth;
      let shift = 0;
      if (rRight > rightEdge - margin) shift = rightEdge - margin - rRight;
      if (rLeft < leftEdge + margin) shift = Math.max(shift, leftEdge + margin - rLeft);
      el.style.translate = shift ? `calc(-50% + ${shift}px) 0` : '';
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, [isActive, hovered]);

  return (      <div
        data-skill-badge
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group/skill relative justify-self-center w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] ${
        isActive ? 'z-50' : 'z-0'
      } hover:z-50 focus-within:z-50`}
    >
      <Decrypt delay={revealDelay} className="w-full h-full">
        <button
          type="button"
          onClick={() => {
            if (window.matchMedia('(max-width: 767px)').matches) {
              onActivate();
            }
          }}
          aria-expanded={isActive}
          className={`skill-badge relative w-full h-full border-2 border-[#000] bg-[var(--bg3)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--accent2)] hover:bg-[rgba(var(--accent2-rgb),0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] max-md:active:border-[var(--accent2)] max-md:active:bg-[rgba(var(--accent2-rgb),0.08)] ${
            isActive
              ? 'max-md:border-[var(--accent2)] max-md:bg-[rgba(var(--accent2-rgb),0.08)] max-md:-translate-y-1'
              : ''
          }`}
          aria-label={`${skill.name}, ${skill.level}`}
        >
          {isLocalIcon ? (
            <img
              src={skill.icon}
              alt=""
              width={30}
              height={30}
              className={`object-contain transition-transform duration-300 group-hover/skill:scale-110 ${
                isActive ? 'max-md:scale-110' : ''
              }`}
            />
          ) : (
            <span className="font-pixel text-sm leading-none text-[var(--text)]">
              {String(skill.name ?? "").slice(0, 1)}
            </span>
          )}
        </button>
      </Decrypt>

      <div
        ref={tipRef}
        className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 min-w-[190px] w-max max-w-[240px] transition-all duration-300 pointer-events-none md:opacity-0 md:translate-y-1 md:group-hover/skill:opacity-100 md:group-hover/skill:translate-y-0 md:group-focus-within/skill:opacity-100 md:group-focus-within/skill:translate-y-0 ${
          isActive ? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:translate-y-1'
        }`}
        role="tooltip"
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45 bg-[#121218] border-l border-t border-[var(--border)]" />
        <div className="relative rounded-lg border border-[var(--border)] bg-[#121218] px-3 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent opacity-80" />
          <p className="text-sm text-white font-medium mb-2 text-center leading-snug">
            <Decrypt text={skill.name} />
          </p>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Decrypt text="Proficiency" className="text-xs text-[var(--muted)] shrink-0" />
            <span className={`text-xs uppercase tracking-wide px-2 py-0.5 rounded border whitespace-nowrap ${prof.badgeClass}`}>
              <Decrypt text={skill.level} />
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg3)] overflow-hidden border border-[var(--border)]">
            <div className={`h-full rounded-full ${prof.barClass}`} style={{ width: `${prof.fill}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Tech — the Tech Stack section title with the hover hint + proficiency
 * legend, followed by the three skill columns.
 */
export default function Tech({ groups = DEFAULT_GROUPS }) {
  return (
    <Section
      id="skills"
      title="Tech Stack"
      header={
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <HintCard />
          <LegendCard />
        </div>
      }
    >
      <SkillsBlock groups={groups} />
    </Section>
  );
}
