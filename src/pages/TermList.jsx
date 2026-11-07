import { useMemo } from 'react';
import { CATEGORIES, CATEGORY_MAP } from '../data/categories';
import { TERMS } from '../data/terms';
import { searchTerms } from '../lib/search';
import { useStudy } from '../lib/studyContext';
import { navigate } from '../lib/router';
import SearchBox from '../components/SearchBox';
import TermCard from '../components/TermCard';

function buildPath(c, q) {
  const p = new URLSearchParams();
  if (c) p.set('c', c);
  if (q) p.set('q', q);
  const s = p.toString();
  return s ? `/terms?${s}` : '/terms';
}

export default function TermList({ query }) {
  const { bookmarks } = useStudy();
  const c = query.c ?? '';
  const q = query.q ?? '';

  const list = useMemo(() => {
    if (q.trim()) {
      const found = searchTerms(TERMS, q);
      return c === 'bookmarks' ? found.filter((t) => bookmarks.includes(t.id)) : c ? found.filter((t) => t.category === c) : found;
    }
    if (c === 'bookmarks') return TERMS.filter((t) => bookmarks.includes(t.id));
    if (c) return TERMS.filter((t) => t.category === c);
    return TERMS;
  }, [c, q, bookmarks]);

  const cat = CATEGORY_MAP[c];
  // 타이핑할 때마다 방문 기록이 쌓이지 않도록 주소만 바꿔치기
  const setQ = (v) => {
    window.history.replaceState(null, '', `#${buildPath(c, v)}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const chips = [{ id: '', name: '전체', icon: '' }, { id: 'bookmarks', name: '즐겨찾기', icon: '⭐' }, ...CATEGORIES];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          {cat ? (
            <>
              <span aria-hidden="true">{cat.icon}</span> {cat.name}
            </>
          ) : c === 'bookmarks' ? (
            '⭐ 즐겨찾기'
          ) : (
            '용어사전'
          )}
        </h1>
        <p className="mt-1 text-sm text-ink-2">{cat ? cat.desc : '그림을 눌러 자세한 설명을 볼 수 있어요.'}</p>
      </div>

      <SearchBox value={q} onChange={setQ} />

      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
        <div className="flex w-max gap-1.5 pb-1">
          {chips.map((ch) => {
            const active = ch.id === c;
            return (
              <button
                key={ch.id || 'all'}
                type="button"
                onClick={() => navigate(buildPath(ch.id, q))}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold transition ${
                  active ? 'bg-ink text-bg' : 'border border-line bg-card text-ink-2 hover:text-ink'
                }`}
              >
                {ch.icon && <span aria-hidden="true">{ch.icon} </span>}
                {ch.name}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs font-semibold text-muted" aria-live="polite">
        {q.trim() ? `"${q}" 검색 결과 ` : ''}
        {list.length}개
      </p>

      {list.length ? (
        <div className="grid gap-2.5 md:grid-cols-2">
          {list.map((t) => (
            <TermCard key={t.id} term={t} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-ink-2">
          {c === 'bookmarks' && !q ? (
            <>
              아직 즐겨찾기한 용어가 없어요.
              <br />
              용어 화면에서 ☆ 를 눌러 모아 보세요.
            </>
          ) : (
            <>
              찾는 용어가 없어요. 다른 말로 검색해 보세요.
              <br />
              <span className="text-muted">초성 검색도 돼요 (예: ㅂㄷ → 배당)</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
