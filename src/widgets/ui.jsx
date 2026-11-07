export function Slider({ label, value, min, max, step = 1, onChange, format = (v) => v, hint }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-semibold text-ink-2">{label}</span>
        <span className="font-bold tabular-nums text-ink">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 h-6"
      />
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </label>
  );
}

export function Segmented({ options, value, onChange, size = 'md' }) {
  return (
    <div className="inline-flex rounded-xl bg-soft p-1" role="group">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`rounded-lg font-bold transition ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'} ${
              active ? `bg-card shadow-sm ${o.activeClass ?? 'text-ink'}` : 'text-muted hover:text-ink-2'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Stat({ label, value, tone = 'ink', sub }) {
  const toneClass =
    {
      up: 'text-up-ink',
      down: 'text-down-ink',
      accent: 'text-accent',
      ink: 'text-ink',
      muted: 'text-muted',
    }[tone] ?? 'text-ink';
  return (
    <div className="rounded-xl bg-soft px-3 py-2.5">
      <div className="text-xs font-semibold text-muted">{label}</div>
      <div className={`mt-0.5 text-lg font-extrabold tabular-nums leading-tight ${toneClass}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-2">{sub}</div>}
    </div>
  );
}

export function Note({ children, tone = 'soft' }) {
  const cls =
    {
      soft: 'bg-soft text-ink-2',
      up: 'bg-up-soft text-up-ink',
      down: 'bg-down-soft text-down-ink',
      accent: 'bg-accent-soft text-accent',
      gold: 'bg-gold-soft text-gold-ink',
    }[tone] ?? 'bg-soft text-ink-2';
  return <p className={`rounded-xl px-3 py-2.5 text-sm leading-relaxed ${cls}`}>{children}</p>;
}

export function PresetButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-ink-2 transition hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
