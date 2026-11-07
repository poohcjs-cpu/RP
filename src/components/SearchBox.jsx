import { useState } from 'react';

export default function SearchBox({ value, onChange, onSubmit, autoFocus = false, placeholder = '용어 검색 (예: PER, 배당, ㅅㄱㅊㅇ)' }) {
  const [inner, setInner] = useState(value ?? '');
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const set = (s) => {
    if (!controlled) setInner(s);
    onChange?.(s);
  };
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(v);
      }}
      className="relative"
    >
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={v}
        onChange={(e) => set(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="용어 검색"
        enterKeyHint="search"
        className="w-full rounded-2xl border border-line bg-card py-3 pl-11 pr-10 text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 [&::-webkit-search-cancel-button]:hidden"
      />
      {v && (
        <button
          type="button"
          onClick={() => set('')}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink"
          aria-label="검색어 지우기"
        >
          ✕
        </button>
      )}
    </form>
  );
}
