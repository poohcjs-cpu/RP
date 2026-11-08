/** 퀴즈 문제 만들기 (순수 함수) */

export function shuffle(arr, rnd = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 오답 보기: 같은 카테고리 우선, 모자라면 전체에서 */
function distractors(term, all, n, rnd) {
  const same = shuffle(all.filter((t) => t.id !== term.id && t.category === term.category), rnd);
  const other = shuffle(all.filter((t) => t.id !== term.id && t.category !== term.category), rnd);
  return [...same, ...other].slice(0, n);
}

/**
 * @param pool  출제할 용어 목록
 * @param all   보기로 쓸 전체 용어 목록
 * @param count 문제 수
 * @returns [{ type: 'def'|'term'|'ox', term, prompt, options: [{label, correct}] , explain }]
 */
export function makeQuiz(pool, all, count, rnd = Math.random) {
  const picked = shuffle(pool, rnd).slice(0, Math.min(count, pool.length));
  const types = ['def', 'term', 'ox'];
  return picked.map((term, i) => {
    const type = types[(i + Math.floor(rnd() * 3)) % 3];
    if (type === 'ox') {
      return {
        type,
        term,
        prompt: term.ox.q,
        options: [
          { label: 'O', correct: term.ox.a === true },
          { label: 'X', correct: term.ox.a === false },
        ],
        explain: term.ox.why,
      };
    }
    const wrong = distractors(term, all, 3, rnd);
    if (type === 'def') {
      return {
        type,
        term,
        prompt: term.summary,
        options: shuffle([{ label: term.term, correct: true }, ...wrong.map((w) => ({ label: w.term, correct: false }))], rnd),
        explain: `정답은 "${term.term}". ${term.analogy}`,
      };
    }
    return {
      type,
      term,
      prompt: term.term,
      options: shuffle([{ label: term.summary, correct: true }, ...wrong.map((w) => ({ label: w.summary, correct: false }))], rnd),
      explain: term.analogy,
    };
  });
}
