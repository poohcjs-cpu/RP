import { CATEGORIES, STARTER_PATH } from '../data/categories';
import { TERMS, TERM_MAP } from '../data/terms';
import { useStudy } from '../lib/studyContext';
import { navigate } from '../lib/router';
import SearchBox from '../components/SearchBox';
import { Link, Card, Illustration, ProgressBar, SectionTitle, CheckIcon } from '../components/common';

function todayTerm() {
  const d = new Date();
  const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  // 같은 날엔 같은 용어, 날마다 골고루 바뀌도록 소수를 곱해 섞음
  return TERMS[(day * 37) % TERMS.length];
}

export default function Home() {
  const { learned } = useStudy();
  const today = todayTerm();
  const nextStarter = STARTER_PATH.find((id) => !learned.includes(id));
  const nextAny = nextStarter ?? TERMS.find((t) => !learned.includes(t.id))?.id;
  const learnedCount = TERMS.filter((t) => learned.includes(t.id)).length;

  return (
    <div className="space-y-8">
      {/* 인사 */}
      <section className="space-y-4">
        <div>
          <p className="text-sm font-bold text-accent">그림과 비유로 배우는</p>
          <h1 className="mt-1 text-[26px] font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
            어려운 주식 용어,
            <br />
            한눈에 이해해요
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
            {TERMS.length}개 핵심 용어를 그림 한 장, 비유 한 줄, 직접 만져보는 계산기로 풀어 드려요.
          </p>
        </div>
        <SearchBox onSubmit={(q) => navigate(`/terms?q=${encodeURIComponent(q)}`)} />
      </section>

      {/* 진행 상황 */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-muted">나의 학습</p>
            <p className="mt-0.5 text-lg font-extrabold text-ink">
              {learnedCount} <span className="text-sm font-bold text-muted">/ {TERMS.length} 용어 이해</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/quiz" className="rounded-xl border border-line px-3 py-2 text-sm font-bold text-ink-2 hover:text-ink">
              퀴즈
            </Link>
            {nextAny && (
              <Link to={`/t/${nextAny}`} className="rounded-xl bg-accent-bg px-3.5 py-2 text-sm font-extrabold text-white shadow-sm hover:opacity-95">
                {learnedCount ? '이어서 배우기' : '첫 용어 보기'}
              </Link>
            )}
          </div>
        </div>
        <ProgressBar value={learnedCount} max={TERMS.length} className="mt-3" />
      </Card>

      {/* 오늘의 용어 */}
      <section>
        <SectionTitle>오늘의 용어</SectionTitle>
        <Link to={`/t/${today.id}`} className="block overflow-hidden rounded-2xl border border-line bg-card transition hover:border-accent/50 hover:shadow-md">
          <div className="bg-soft/60 px-4 pt-4 pb-2">
            <Illustration id={today.id} className="mx-auto max-w-md" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-extrabold text-ink">{today.term}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{today.summary}</p>
            <p className="mt-3 text-sm font-bold text-accent">자세히 보기 →</p>
          </div>
        </Link>
      </section>

      {/* 추천 순서 */}
      <section>
        <SectionTitle right={<span className="text-xs font-semibold text-muted">처음이라면 이 순서로</span>}>입문 코스 10단계</SectionTitle>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {STARTER_PATH.map((id, i) => {
            const t = TERM_MAP[id];
            const done = learned.includes(id);
            const isNext = id === nextStarter;
            return (
              <li key={id} className="min-w-0">
                <Link
                  to={`/t/${id}`}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition hover:border-accent/50 ${
                    isNext ? 'border-accent bg-accent-soft' : 'border-line bg-card'
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                      done ? 'bg-aqua text-white' : isNext ? 'bg-accent-bg text-white' : 'bg-soft text-ink-2'
                    }`}
                  >
                    {done ? <CheckIcon /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold text-ink">{t.term}</span>
                    <span className="block truncate text-xs text-ink-2">{t.summary}</span>
                  </span>
                  {isNext && <span className="shrink-0 text-xs font-bold text-accent">다음</span>}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 카테고리 */}
      <section>
        <SectionTitle right={<Link to="/terms" className="text-sm font-bold text-accent">전체 보기</Link>}>주제별로 둘러보기</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {CATEGORIES.map((c) => {
            const list = TERMS.filter((t) => t.category === c.id);
            const done = list.filter((t) => learned.includes(t.id)).length;
            return (
              <Link key={c.id} to={`/terms?c=${c.id}`} className="flex flex-col rounded-2xl border border-line bg-card p-3.5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
                <span className="text-2xl" aria-hidden="true">
                  {c.icon}
                </span>
                <span className="mt-2 text-[15px] font-extrabold text-ink">{c.name}</span>
                <span className="mt-0.5 flex-1 text-xs leading-relaxed text-ink-2">{c.desc}</span>
                <span className="mt-2.5 flex items-center gap-2">
                  <ProgressBar value={done} max={list.length} className="h-1.5 flex-1" tone="bg-aqua" />
                  <span className="text-[11px] font-bold tabular-nums text-muted">
                    {done}/{list.length}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 색깔 팁 */}
      <Card className="p-4">
        <h2 className="text-[15px] font-extrabold text-ink">알고 보면 더 쉬운 색깔 규칙</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-up-soft p-3">
            <p className="font-extrabold text-up-ink">빨강 = 상승 · 매수</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-2">가격이 오르거나, 사는 쪽이에요.</p>
          </div>
          <div className="rounded-xl bg-down-soft p-3">
            <p className="font-extrabold text-down-ink">파랑 = 하락 · 매도</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-2">가격이 내리거나, 파는 쪽이에요.</p>
          </div>
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-muted">
          한국 증권사 앱의 관례예요. 미국 등 해외에서는 초록 = 상승, 빨강 = 하락으로 반대니까 해외 주식 볼 때 헷갈리지 마세요!
        </p>
      </Card>
    </div>
  );
}
