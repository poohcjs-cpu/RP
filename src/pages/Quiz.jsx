import { useState } from 'react';
import { TERMS } from '../data/terms';
import { CATEGORIES } from '../data/categories';
import { makeQuiz } from '../lib/quiz';
import { useStudy } from '../lib/studyContext';
import { Link, Card, Illustration, ProgressBar } from '../components/common';

function Setup({ onStart }) {
  const { bookmarks, review, quizBest } = useStudy();
  const [scope, setScope] = useState('all');
  const [count, setCount] = useState(10);

  const scopes = [
    { id: 'all', label: '전체 용어', n: TERMS.length },
    { id: 'review', label: '복습 필요', n: review.length },
    { id: 'bookmarks', label: '즐겨찾기', n: bookmarks.length },
    ...CATEGORIES.map((c) => ({ id: c.id, label: `${c.icon} ${c.name}`, n: TERMS.filter((t) => t.category === c.id).length })),
  ];
  const pool = poolFor(scope, bookmarks, review);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">용어 퀴즈</h1>
        <p className="mt-1 text-sm text-ink-2">
          설명 보고 용어 맞히기 · 용어 보고 뜻 고르기 · O/X 세 가지 유형이 섞여 나와요.
          {quizBest != null && <span className="ml-1 font-bold text-accent">최고 점수 {quizBest}점</span>}
        </p>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-extrabold text-ink">어떤 용어로 풀까요?</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {scopes.map((s) => {
            const active = scope === s.id;
            const disabled = s.n === 0;
            return (
              <button
                key={s.id}
                type="button"
                disabled={disabled}
                onClick={() => setScope(s.id)}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition disabled:opacity-40 ${
                  active ? 'border-accent bg-accent-soft text-accent' : 'border-line bg-card text-ink-2 hover:text-ink'
                }`}
              >
                {s.label}
                <span className="ml-1 text-xs font-semibold text-muted">{s.n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-extrabold text-ink">문제 수</h2>
        <div className="flex gap-2">
          {[5, 10, 15].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              aria-pressed={count === n}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-extrabold ${count === n ? 'border-accent bg-accent-soft text-accent' : 'border-line bg-card text-ink-2'}`}
            >
              {n}문제
            </button>
          ))}
        </div>
        {pool.length < count && pool.length > 0 && <p className="mt-1.5 text-xs text-muted">이 범위에는 용어가 {pool.length}개라 {pool.length}문제만 나와요.</p>}
      </section>

      <button
        type="button"
        disabled={!pool.length}
        onClick={() => onStart(pool, count)}
        className="w-full rounded-2xl bg-accent-bg py-3.5 text-base font-extrabold text-white shadow-sm transition active:scale-[0.99] disabled:opacity-40"
      >
        퀴즈 시작
      </button>
    </div>
  );
}

function poolFor(scope, bookmarks, review) {
  if (scope === 'all') return TERMS;
  if (scope === 'review') return TERMS.filter((t) => review.includes(t.id));
  if (scope === 'bookmarks') return TERMS.filter((t) => bookmarks.includes(t.id));
  return TERMS.filter((t) => t.category === scope);
}

const TYPE_LABEL = { def: '설명에 맞는 용어는?', term: '이 용어의 뜻은?', ox: 'O일까, X일까?' };

function Question({ q, index, total, onAnswer, onNext, answer }) {
  const answered = answer != null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ProgressBar value={index + (answered ? 1 : 0)} max={total} className="flex-1" />
        <span className="text-xs font-bold tabular-nums text-muted">
          {index + 1} / {total}
        </span>
      </div>

      <Card className="p-4">
        <p className="text-xs font-extrabold text-accent">{TYPE_LABEL[q.type]}</p>
        {q.type === 'term' ? (
          <>
            <p className="mt-2 text-2xl font-extrabold text-ink">{q.prompt}</p>
            <div className="mt-3 rounded-xl bg-soft p-2">
              <Illustration id={q.term.id} className="mx-auto max-w-sm" />
            </div>
          </>
        ) : (
          <p className="mt-2 text-[17px] font-bold leading-relaxed text-ink">{q.prompt}</p>
        )}
      </Card>

      <div className={q.type === 'ox' ? 'flex gap-2' : 'space-y-2'}>
        {q.options.map((o, i) => {
          let cls = 'border-line bg-card text-ink hover:border-accent';
          if (answered) {
            if (o.correct) cls = 'border-aqua bg-aqua-soft text-ink';
            else if (answer === i) cls = 'border-orange bg-orange-soft text-ink';
            else cls = 'border-line bg-card text-muted';
          }
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => onAnswer(i)}
              className={`w-full rounded-2xl border-2 text-left transition ${cls} ${
                q.type === 'ox' ? 'py-4 text-center text-3xl font-black' : 'flex items-start gap-2.5 px-4 py-3 text-[15px] font-bold leading-relaxed'
              }`}
            >
              {q.type !== 'ox' && <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-soft text-[11px] font-extrabold text-ink-2">{i + 1}</span>}
              <span className="flex-1">{o.label}</span>
              {answered && o.correct && q.type !== 'ox' && <span className="shrink-0 text-aqua-ink">✓</span>}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {answered && (
          <div className="animate-pop space-y-3">
            <div className="rounded-2xl bg-soft p-4">
              <p className="text-base font-extrabold text-ink">{q.options[answer].correct ? '정답이에요! 🎉' : '아쉬워요, 다시 기억해 둬요 💪'}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{q.explain}</p>
            </div>
            <button type="button" onClick={onNext} className="w-full rounded-2xl bg-accent-bg py-3.5 text-base font-extrabold text-white shadow-sm active:scale-[0.99]">
              {index + 1 < total ? '다음 문제' : '결과 보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Result({ questions, answers, onRetry, onRetryWrong, onHome }) {
  const score = questions.filter((q, i) => q.options[answers[i]]?.correct).length;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const msg = pct === 100 ? '완벽해요! 주식 용어 마스터 🏆' : pct >= 70 ? '훌륭해요! 조금만 더 다지면 완벽해요 👏' : pct >= 40 ? '좋은 출발이에요. 틀린 용어를 다시 보면 금방 늘어요 🌱' : '괜찮아요! 그림부터 천천히 다시 봐요 📚';
  const wrong = questions.filter((q, i) => !q.options[answers[i]]?.correct);
  return (
    <div className="space-y-5">
      <Card className="p-6 text-center">
        <p className="text-sm font-bold text-muted">내 점수</p>
        <p className="mt-1 text-5xl font-black tabular-nums text-accent">
          {score}
          <span className="text-2xl text-muted"> / {total}</span>
        </p>
        <p className="mt-3 text-[15px] font-bold text-ink">{msg}</p>
      </Card>

      {wrong.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-extrabold text-ink">다시 볼 용어 ({wrong.length})</h2>
          <p className="mb-2 text-xs text-muted">틀린 용어는 &apos;내 학습 → 복습 필요&apos;에도 모아 둘게요.</p>
          <div className="space-y-2">
            {wrong.map((q) => (
              <Link key={q.term.id} to={`/t/${q.term.id}`} className="flex items-center gap-3 rounded-xl border border-line bg-card p-3 hover:border-accent/50">
                <span className="w-20 shrink-0 overflow-hidden rounded-lg bg-soft p-0.5" aria-hidden="true">
                  <Illustration id={q.term.id} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-ink">{q.term.term}</span>
                  <span className="block truncate text-xs text-ink-2">{q.term.summary}</span>
                </span>
                <span className="text-sm font-bold text-accent">보기 →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        {wrong.length > 0 && (
          <button type="button" onClick={onRetryWrong} className="rounded-2xl bg-accent-bg py-3 text-sm font-extrabold text-white">
            틀린 것만 다시 풀기
          </button>
        )}
        <button type="button" onClick={onRetry} className="rounded-2xl border border-line bg-card py-3 text-sm font-extrabold text-ink">
          새 문제로 다시
        </button>
        <button type="button" onClick={onHome} className="rounded-2xl border border-line bg-card py-3 text-sm font-extrabold text-ink-2">
          범위 바꾸기
        </button>
      </div>
    </div>
  );
}

export default function Quiz() {
  const { recordQuiz } = useStudy();
  const [state, setState] = useState(null); // { pool, count, questions, index, answers, done }

  const start = (pool, count) => setState({ pool, count, questions: makeQuiz(pool, TERMS, count), index: 0, answers: {}, done: false });

  if (!state) return <Setup onStart={start} />;

  const { questions, index, answers, done } = state;

  if (done) {
    return (
      <Result
        questions={questions}
        answers={answers}
        onRetry={() => start(state.pool, state.count)}
        onRetryWrong={() => {
          const wrongTerms = questions.filter((q, i) => !q.options[answers[i]]?.correct).map((q) => q.term);
          start(wrongTerms, wrongTerms.length);
        }}
        onHome={() => setState(null)}
      />
    );
  }

  const q = questions[index];
  return (
    <Question
      key={index}
      q={q}
      index={index}
      total={questions.length}
      answer={answers[index]}
      onAnswer={(i) => setState((s) => ({ ...s, answers: { ...s.answers, [s.index]: i } }))}
      onNext={() => {
        if (index + 1 < questions.length) {
          setState((s) => ({ ...s, index: s.index + 1 }));
          window.scrollTo({ top: 0 });
          return;
        }
        const right = questions.filter((qq, i) => qq.options[answers[i]]?.correct);
        const wrong = questions.filter((qq, i) => !qq.options[answers[i]]?.correct);
        recordQuiz({ score: right.length, total: questions.length, rightIds: right.map((x) => x.term.id), wrongIds: wrong.map((x) => x.term.id) });
        setState((s) => ({ ...s, done: true }));
        window.scrollTo({ top: 0 });
      }}
    />
  );
}
