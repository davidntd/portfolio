import Decrypt from "./Decrypt";
import Reveal from "./Reveal";

/**
 * Big pixel-font section heading with the yellow underline bar, used for the
 * hero's Introduction and every main section title. Left-aligned (self-start)
 * so it never centers inside a column.
 */
export default function SectionTitle({ children, compact = false }) {
  return (
    <div role="heading" aria-level="2" className="flex flex-col gap-3">
      <Decrypt
        text={children}
        as="p"
        className={`font-pixel tracking-[0.1em] text-[var(--text)] uppercase self-start ${
          compact ? 'text-[clamp(1.05rem,2.4vw,1.75rem)]' : 'text-[clamp(1.5rem,4.2vw,2.3rem)]'
        }`}
      />
      <span
        aria-hidden="true"
        className={`h-1 bg-[var(--accent2)] shadow-[0_0_14px_rgba(255,204,51,0.45)] ${
          compact ? 'w-16' : 'w-24'
        }`}
      />
    </div>
  );
}

/**
 * Standard page-section shell: the padded <section> with its centered
 * container and title. An optional `header` renders to the right of the
 * title on the same row (used by Tech Stack for the hint + legend cards).
 * The title and header pop in with a stepped reveal on scroll.
 */
export function Section({ id, title, header, children }) {
  return (
    <section id={id} className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-[1152px] mx-auto w-full flex flex-col gap-6 lg:gap-8 overflow-visible">
        {header ? (
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <Reveal className="min-w-0">
              <SectionTitle>{title}</SectionTitle>
            </Reveal>
            <Reveal delay={120} className="min-w-0">
              {header}
            </Reveal>
          </div>
        ) : (
          <Reveal className="min-w-0">
            <SectionTitle>{title}</SectionTitle>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
