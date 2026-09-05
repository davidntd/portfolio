import Decrypt from "./Decrypt";
import { PanelCard, PanelLabel, Chip } from "./PanelCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// @sync-start profile
export const DEFAULT_PROFILE = {
  "brand": "DavidNTD",
  "displayName": "David Nguyen",
  "intro": "Frontend-Focused Full-Stack Developer\nBuilding modern web applications with Next.js and React, with a growing focus on backend development, AI, and embedded systems.\n",
  "location": "Calgary, AB, Canada",
  "phone": "+1 (403) 827-2659",
  "email": "davidnguyen107206@gmail.com",
  "github": "https://github.com/davidntd",
  "linkedin": "http://www.linkedin.com/in/davidntd",
  "resumeUrl": "/Resume/David-Nguyen-ResumeCV.docx.pdf",
  "profileImage": "/profile/profile.jpg",
  "status": "open to work/opportunities in IT and software"
};
// @sync-end

// @sync-start about
export const DEFAULT_ABOUT = {
  "paragraphs": [
    "Hello, my name is Thai Duong Nguyen, commonly known as David. I'm a Software Development graduate from SAIT and a full-stack developer specializing in frontend development. I began programming in high school with Python and Lua, then expanded into robotics with Arduino and C++, and now build modern web applications using React, Next.js, Supabase, and PostgreSQL.",
    "I’m proficient in Python, C, HTML/CSS, and JavaScript, with working knowledge of TypeScript, C#, and SQL/PostgreSQL, plus basic C++ and Java. I’m also exploring ESP32 systems and how software, hardware, automation, and AI can work together, with a long-term goal of building intelligent systems inspired by JARVIS from Iron Man.",
    "Outside of technology, I enjoy playing piano and chess, and exploring history and astronomy. I value both independent work and collaboration, and I’m always eager to learn, build, and take on new challenges. I’m open to opportunities in software development, IT, and related technical fields."
  ],
  "strengths": [
    "Teamwork",
    "Technical communication",
    "Mentorship",
    "Problem-solving",
    "Analytical thinking"
  ],
  "languages": [
    "English",
    "Vietnamese"
  ]
};
// @sync-end

const fieldLabelClass =
  "font-pixel text-[0.6rem] uppercase tracking-[0.1em] text-[var(--muted)] shrink-0";

// Shared beveled row design for every info field (Name/Role/Status/Strengths/Languages).
const infoRowClass =
  "px-3 py-2 border-2 border-[#000] bg-[var(--bg3)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.35)]";

function InfoRow({ label, children }) {
  return (
    <div className={infoRowClass}>
      <Decrypt text={label} className={fieldLabelClass} />
      <div className="min-w-0 mt-1.5">{children}</div>
    </div>
  );
}

function ProfileCard({ profile: { displayName, intro, status, profileImage }, strengths = [], languages = [] }) {
  const [role = ""] = intro.split("\n").map((s) => s.trim()).filter(Boolean);

  return (
    <PanelCard className="p-2.5">
      <PanelLabel>Profile</PanelLabel>

      {/* Portrait — centered */}
      <div className="flex justify-center mb-4">
        <div className="h-36 w-36 sm:h-44 sm:w-44 border-2 border-[#000] bg-[var(--bg3)] p-1.5 shadow-[inset_2px_2px_0_rgba(255,255,255,0.15),inset_-2px_-2px_0_rgba(0,0,0,0.35)]">
          <div className="h-full w-full overflow-hidden border border-[#000]">
            <img src={profileImage} alt={displayName} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Info fields — every row shares the same beveled design */}
      <div className="space-y-2">
        <InfoRow label="Name:">
          <Chip>{displayName}</Chip>
        </InfoRow>
        <InfoRow label="Role:">
          <Chip>{role}</Chip>
        </InfoRow>
        <InfoRow label="Status:">
          <Chip style={{ color: 'var(--hp)' }}>{status}</Chip>
        </InfoRow>
        <InfoRow label="Strengths:">
          <div className="flex flex-wrap gap-1.5">
            {strengths.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </InfoRow>
        <InfoRow label="Languages:">
          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <Chip key={lang}>{lang}</Chip>
            ))}
          </div>
        </InfoRow>
      </div>
    </PanelCard>
  );
}

function AboutCard({ about: { paragraphs } }) {
  return (
    <div className="h-full min-w-0">
      <PanelCard className="p-2.5 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center gap-4">
          <PanelLabel>About Me</PanelLabel>
          {paragraphs.map((text, idx) => (
            <div
              key={idx}
              className="group relative pl-3 border-l-2 border-[var(--border)] transition-colors duration-300 hover:border-[var(--accent2)]"
            >
              <Decrypt text={text} as="p" className="text-white leading-[1.75] text-[1.25rem] sm:text-[1.3rem]" />
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

/**
 * Intro — the opening slide of the page: the "Introduction" title, the player
 * profile card (portrait, Name/Role/Status, Strengths/Languages) and the
 * About Me card, on top of the page-wide cosmic background.
 */
export default function Intro({ profile = DEFAULT_PROFILE, about = DEFAULT_ABOUT }) {
  return (
    <div
      id="home"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 relative overflow-hidden"
    >
      <div className="max-w-[1152px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 items-stretch">
          {/* Left column: Introduction title + player profile */}
          <div className="flex flex-col gap-3 min-w-0">
            <Reveal>
              <SectionTitle compact>Introduction</SectionTitle>
            </Reveal>
            <Reveal delay={140}>
              <ProfileCard
                profile={profile}
                strengths={about.strengths}
                languages={about.languages}
              />
            </Reveal>
          </div>
          <Reveal delay={220} className="h-full min-w-0">
            <AboutCard about={about} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
