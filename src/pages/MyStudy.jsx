import { TERMS, TERM_MAP } from '../data/terms';
import { CATEGORIES } from '../data/categories';
import { useStudy } from '../lib/studyContext';
import { Link, Card, ProgressBar, SectionTitle } from '../components/common';
import TermCard from '../components/TermCard';

export default function MyStudy() {
  const { learned, bookmarks, review, quizBest, quizCount, resetAll, clearReview } = useStudy();
  const learnedCount = TERMS.filter((t) => learned.includes(t.id)).length;
  const pct = Math.round((learnedCount / TERMS.length) * 100);
  const reviewTerms = review.map((id) => TERM_MAP[id]).filter(Boolean);
  const bookmarkTerms = bookmarks.map((id) => TERM_MAP[id]).filter(Boolean);

  return (
    <div className="space-y-7">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink">내 학습</h1>

      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 text-center">
          <p className="text-xs font-bold text-muted">이해한 용어</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-accent">{learnedCount}</p>
          <p className="text-[11px] text-muted">{pct}% 완료</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-xs font-bold text-muted">퀴즈 최고</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-ink">{quizBest ?? '–'}</p>
          <p className="text-[11px] text-muted">{quizCount}회 응시</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-xs font-bold text-muted">즐겨찾기</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-ink">{bookmarks.length}</p>
          <p className="text-[11px] text-muted">개</p>
        </Card>
      </div>

      <section>
        <SectionTitle>주제별 진도</SectionTitle>
        <Card className="divide-y divide-line">
          {CATEGORIES.map((c) => {
            const list = TERMS.filter((t) => t.category === c.id);
            const done = list.filter((t) => learned.includes(t.id)).length;
            return (
              <Link key={c.id} to={`/terms?c=${c.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-soft/60">
                <span className="text-xl" aria-hidden="true">
                  {c.icon}
                </span>
                <span className="w-28 shrink-0 text-sm font-bold text-ink">{c.name}</span>
                <ProgressBar value={done} max={list.length} className="flex-1" tone={done === list.length ? 'bg-aqua' : 'bg-accent-bg'} />
                <span className="w-10 text-right text-xs font-bold tabular-nums text-muted">
                  {done}/{list.length}
                </span>
              </Link>
            );
          })}
        </Card>
      </section>

      <section>
        <SectionTitle right={reviewTerms.length > 0 && <Link to="/quiz" className="text-sm font-bold text-accent">복습 퀴즈 →</Link>}>
          복습 필요 ({reviewTerms.length})
        </SectionTitle>
        {reviewTerms.length ? (
          <div className="space-y-2">
            {reviewTerms.map((t) => (
              <div key={t.id} className="relative">
                <TermCard term={t} />
                <button
                  type="button"
                  onClick={() => clearReview(t.id)}
                  className="absolute bottom-2.5 right-3 rounded-full bg-soft px-2.5 py-1 text-[11px] font-bold text-ink-2 hover:text-ink"
                >
                  이제 알아요
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-5 text-center text-sm text-ink-2">퀴즈에서 틀린 용어가 여기에 모여요.</p>
        )}
      </section>

      <section>
        <SectionTitle>즐겨찾기 ({bookmarkTerms.length})</SectionTitle>
        {bookmarkTerms.length ? (
          <div className="grid gap-2.5 md:grid-cols-2">
            {bookmarkTerms.map((t) => (
              <TermCard key={t.id} term={t} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-5 text-center text-sm text-ink-2">용어 화면에서 ☆ 를 누르면 여기에 모여요.</p>
        )}
      </section>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('이해한 용어, 즐겨찾기, 퀴즈 기록을 모두 지울까요?')) resetAll();
          }}
          className="text-xs font-bold text-muted underline-offset-2 hover:underline"
        >
          학습 기록 초기화
        </button>
        <p className="mt-1 text-[11px] text-muted">학습 기록은 이 기기의 브라우저에만 저장돼요.</p>
      </div>
    </div>
  );
}
