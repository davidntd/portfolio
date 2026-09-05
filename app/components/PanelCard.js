import { forwardRef } from 'react';
import Decrypt from './Decrypt';

export const PanelCard = forwardRef(function PanelCard({ children, className = '', hover = true }, ref) {
  return (
    <div
      ref={ref}
      className={`relative bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 ${
        hover
          ? 'hover:border-[rgba(var(--accent-rgb),0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:-translate-y-0.5'
          : ''
      } ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent2)]" />
      {children}
    </div>
  );
});

export function PanelLabel({ children }) {
  return (
    <p className="font-pixel text-[0.9rem] uppercase tracking-[0.08em] text-[var(--muted)] mb-2.5">
      <Decrypt text={children} />
    </p>
  );
}

const BADGE_VARIANTS = {
  default: 'text-[var(--text)] border-[var(--border)] bg-[var(--bg3)]',
  accent: 'text-[var(--accent)] border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]',
  yellow: 'text-[var(--accent2)] border-[rgba(var(--accent2-rgb),0.45)] bg-[rgba(var(--accent2-rgb),0.1)]',
  muted: 'text-[var(--muted)] border-[var(--muted)]/40 bg-[var(--muted)]/10',
};

export function MetaBadge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex font-pixel text-[0.55rem] uppercase tracking-wide px-2 py-1 border max-w-full ${BADGE_VARIANTS[variant]} ${className}`}
    >
      <Decrypt text={children} />
    </span>
  );
}

export function Chip({ children, className = '', style }) {
  return (
    <span
      style={style}
      className={`font-pixel pixel-border text-[0.65rem] px-2 py-1 bg-[var(--bg3)] text-[var(--text)] transition-colors duration-200 hover:border-[var(--accent2)] hover:text-[var(--accent2)] ${className}`}
    >
      {typeof children === 'string' ? <Decrypt text={children} /> : children}
    </span>
  );
}

export function GpaDisplay({ value, max = 4.0 }) {
  const pct = Math.min(100, (value / max) * 100);
  const blocks = 20;
  const filled = Math.round((pct / 100) * blocks);
  return (
    <div className="border-2 border-[#000] bg-[var(--bg3)] p-2.5 shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.3)]">
      <div className="flex items-end justify-between gap-3 mb-2.5">
        <div>
          <Decrypt
            text="GPA"
            as="p"
            className="font-pixel text-[0.55rem] uppercase tracking-[0.1em] text-[var(--muted)] mb-1"
          />
          <p className="text-2xl text-white leading-none">
            <Decrypt text={String(value)} />
            <span className="text-sm text-[var(--muted)]"> / {max.toFixed(1)}</span>
          </p>
        </div>
        <Decrypt
          text={`${Math.round(pct)}%`}
          as="span"
          className="font-pixel text-[0.55rem] uppercase tracking-wide px-2 py-1 border-2 border-[#000] text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.12)]"
        />
      </div>
      <div className="flex gap-[2px] h-3 bg-[var(--card)] border border-[#000] p-[2px] overflow-hidden">
        {Array.from({ length: blocks }).map((_, i) => (
          <span
            key={i}
            className={`flex-1 ${i < filled ? 'bg-[var(--hp)]' : 'bg-[#0b0b1a]'}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5 px-0.5">
        {['0.0', '2.0', '3.0', '4.0'].map((v) => (
          <Decrypt key={v} text={v} className="text-[0.6rem] text-[var(--muted)]" />
        ))}
      </div>
    </div>
  );
}
