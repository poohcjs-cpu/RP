import { Suspense, useState } from 'react';
import { TERM_MAP, termsByCategory } from '../data/terms';
import { CATEGORY_MAP } from '../data/categories';
import { WIDGETS } from '../widgets';
import { useStudy } from '../lib/studyContext';
import { Link, Card, Illustration, LevelBadge, CategoryBadge, StarIcon, CheckIcon } from '../components/common';

function OXCheck({ term }) {
  const [pick, setPick] = useState(null);
  const { ox } = term;
  const answered = pick !== null;
  const correct = pick === ox.a;
  const btn = (val, label) => {
    const chosen = pick === val;
    const isAnswer = ox.a === val;
    let cls = 'border-line bg-card text-ink hover:border-accent';
    if (answered && isAnswer) cls = 'border-aqua bg-aqua-soft text-aqua-ink';
    else if (answered && chosen) cls = 'border-orange bg-orange-soft text-ink';
    else if (answered) cls = 'border-line bg-card text-muted';
    return (
      <button
        type="button"
        disabled={answered}
        onClick={() => setPick(val)}
        className={`flex-1 rounded-2xl border-2 py-3 text-3xl font-black transition ${cls}`}
        aria-label={label === 'O' ? '맞다 (O)' : '틀리다 (X)'}
      >
        {label}
      </button>
    );
  };
  return (
    <Card className="p-4">
      <h2 className="text-sm font-extrabold text-accent">O / X 로 확인해 보기</h2>
      <p className="mt-2 text-[15px] font-bold leading-relaxed text-ink">{ox.q}</p>
      <div className="mt-3 flex gap-2">
        {btn(true, 'O')}
        {btn(false, 'X')}
      </div>
      <div aria-live="polite">
        {answered && (
          <div className="mt-3 animate-pop">
            <p className={`text-sm font-extrabold ${correct ? 'text-aqua-ink' : 'text-ink'}`}>
              {correct ? '정답이에요! 🎉' : `아쉬워요. 정답은 ${ox.a ? 'O' : 'X'}예요.`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">{ox.why}</p>
            <button type="button" onClick={() => setPick(null)} className="mt-2 text-xs font-bold text-muted underline-offset-2 hover:underline">
              다시 풀기
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

function Box({ title, icon, tone, children }) {
  const cls =
    {
      accent: 'bg-accent-soft',
      gold: 'bg-gold-soft',
      orange: 'bg-orange-soft',
      soft: 'bg-soft',
    }[tone] ?? 'bg-soft';
  return (
    <section className={`rounded-2xl p-4 ${cls}`}>
      <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
        <span aria-hidden="true">{icon}</span>
        {title}
      </h2>
      <div className="mt-1.5 text-[15px] leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export default function TermDetail({ id }) {
  const term = TERM_MAP[id];
  const { learned, bookmarks, toggleLearned, toggleBookmark } = useStudy();

  if (!term) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-bold text-ink">용어를 찾을 수 없어요.</p>
        <Link to="/terms" className="mt-3 inline-block font-bold text-accent">
          용어사전으로 →
        </Link>
      </div>
    );
  }

  const isLearned = learned.includes(term.id);
  const isBookmarked = bookmarks.includes(term.id);
  const siblings = termsByCategory(term.category);
  const idx = siblings.findIndex((t) => t.id === term.id);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];
  const widget = term.widget ? WIDGETS[term.widget] : null;
  const cat = CATEGORY_MAP[term.category];

  return (
    <article className="space-y-4" key={term.id}>
      <Link to={`/terms?c=${term.category}`} className="inline-flex items-center gap-1 text-sm font-bold text-ink-2 hover:text-ink">
        ← {cat.name}
      </Link>

      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <CategoryBadge id={term.category} />
          <LevelBadge level={term.level} />
        </div>
        <div className="flex items-start gap-2">
          <h1 className="flex-1 text-[28px] font-extrabold leading-tight tracking-tight text-ink">{term.term}</h1>
          <button
            type="button"
            onClick={() => toggleBookmark(term.id)}
            className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-card ${isBookmarked ? '' : 'text-muted hover:text-ink'}`}
            aria-pressed={isBookmarked}
            aria-label={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기'}
          >
            <StarIcon filled={isBookmarked} className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm font-semibold text-muted">{term.en}</p>
        <p className="text-[17px] font-bold leading-relaxed text-ink">{term.summary}</p>
      </header>

      <Card className="overflow-hidden p-3 sm:p-5">
        <Illustration id={term.id} className="mx-auto max-w-xl" />
      </Card>

      <Box title="쉽게 비유하면" icon="💡" tone="accent">
        {term.analogy}
      </Box>

      {term.formula && (
        <section className="rounded-2xl border border-line bg-card p-4">
          <h2 className="text-sm font-extrabold text-ink">계산식</h2>
          <p className="mt-1.5 rounded-xl bg-soft px-3 py-2.5 text-[15px] font-bold leading-relaxed text-accent">{term.formula}</p>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-card p-4">
        <h2 className="text-sm font-extrabold text-ink">핵심 포인트</h2>
        <ul className="mt-2 space-y-2.5">
          {term.points.map((p, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-extrabold text-accent">{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {term.example && (
        <Box title="숫자로 보면" icon="🧮" tone="gold">
          {term.example}
        </Box>
      )}

      {term.caution && (
        <Box title="주의하세요" icon="⚠️" tone="orange">
          {term.caution}
        </Box>
      )}

      {widget && (
        <Card className="p-4">
          <h2 className="mb-3 flex items-center gap-1.5 text-base font-extrabold text-ink">
            <span aria-hidden="true">🕹️</span> 직접 해보기 · {widget.title}
          </h2>
          <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-soft" />}>
            <widget.Component />
          </Suspense>
        </Card>
      )}

      <OXCheck term={term} key={`ox-${term.id}`} />

      {term.related.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-extrabold text-ink">함께 알면 좋은 용어</h2>
          <div className="flex flex-wrap gap-1.5">
            {term.related.map((rid) => (
              <Link key={rid} to={`/t/${rid}`} className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-bold text-ink-2 hover:border-accent hover:text-accent">
                {TERM_MAP[rid]?.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => toggleLearned(term.id)}
        aria-pressed={isLearned}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-extrabold transition active:scale-[0.99] ${
          isLearned ? 'bg-aqua-soft text-aqua-ink ring-1 ring-aqua' : 'bg-accent-bg text-white shadow-sm'
        }`}
      >
        {isLearned ? (
          <>
            <CheckIcon className="h-5 w-5" /> 이해했어요 (다시 누르면 취소)
          </>
        ) : (
          '이해했어요!'
        )}
      </button>

      <nav className="grid grid-cols-2 gap-2" aria-label="같은 주제의 이전 · 다음 용어">
        {prev ? (
          <Link to={`/t/${prev.id}`} className="rounded-2xl border border-line bg-card p-3 hover:border-accent/50">
            <span className="block text-xs font-bold text-muted">← 이전</span>
            <span className="mt-0.5 block truncate text-sm font-extrabold text-ink">{prev.term}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/t/${next.id}`} className="rounded-2xl border border-line bg-card p-3 text-right hover:border-accent/50">
            <span className="block text-xs font-bold text-muted">다음 →</span>
            <span className="mt-0.5 block truncate text-sm font-extrabold text-ink">{next.term}</span>
          </Link>
        ) : (
          <Link to="/quiz" className="rounded-2xl border border-line bg-card p-3 text-right hover:border-accent/50">
            <span className="block text-xs font-bold text-muted">다 봤다면 →</span>
            <span className="mt-0.5 block truncate text-sm font-extrabold text-accent">퀴즈로 확인하기</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
