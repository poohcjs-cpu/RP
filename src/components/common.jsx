import { ILLUSTRATIONS } from '../illustrations';
import { LEVELS, CATEGORY_MAP } from '../data/categories';
import { href } from '../lib/router';

export function Link({ to, className, children, ...rest }) {
  return (
    <a href={href(to)} className={className} {...rest}>
      {children}
    </a>
  );
}

export function Illustration({ id, className = '' }) {
  const Comp = ILLUSTRATIONS[id];
  if (!Comp) return <div className={`grid aspect-[8/5] place-items-center text-sm text-muted ${className}`}>그림 준비 중</div>;
  return (
    <div className={className}>
      <Comp />
    </div>
  );
}

export function LevelBadge({ level, className = '' }) {
  const l = LEVELS[level];
  if (!l) return null;
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${l.className} ${className}`}>{l.label}</span>;
}

export function CategoryBadge({ id }) {
  const c = CATEGORY_MAP[id];
  if (!c) return null;
  return (
    <Link to={`/terms?c=${id}`} className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-0.5 text-xs font-bold text-ink-2 hover:text-ink">
      <span aria-hidden="true">{c.icon}</span>
      {c.name}
    </Link>
  );
}

export function ProgressBar({ value, max, className = '', tone = 'bg-accent-bg' }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-soft ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <div className={`h-full rounded-full transition-all duration-500 ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Card({ className = '', children, ...rest }) {
  return (
    <div className={`rounded-2xl border border-line bg-card ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, right }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-2">
      <h2 className="text-lg font-extrabold tracking-tight text-ink">{children}</h2>
      {right}
    </div>
  );
}

export function StarIcon({ filled, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.7l-5.3 2.8 1.1-5.9-4.4-4.1 6-.8z"
        fill={filled ? 'var(--c-gold)' : 'none'}
        stroke={filled ? 'var(--c-gold)' : 'currentColor'}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
