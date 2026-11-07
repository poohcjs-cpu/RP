import { useCallback, useEffect, useMemo, useState } from 'react';
import { StudyContext } from './studyContext';

const KEY = 'stock-terms-study-v1';
const EMPTY = { learned: [], bookmarks: [], review: [], quizBest: null, quizCount: 0 };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

const toggleIn = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

export function StudyProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // 저장 공간이 없거나 사생활 보호 모드인 경우 무시
    }
  }, [state]);

  const toggleLearned = useCallback((id) => setState((s) => ({ ...s, learned: toggleIn(s.learned, id) })), []);
  const toggleBookmark = useCallback((id) => setState((s) => ({ ...s, bookmarks: toggleIn(s.bookmarks, id) })), []);
  const markLearned = useCallback(
    (id) => setState((s) => (s.learned.includes(id) ? s : { ...s, learned: [...s.learned, id] })),
    [],
  );
  const recordQuiz = useCallback(
    ({ score, total, wrongIds, rightIds }) =>
      setState((s) => {
        const pct = Math.round((score / total) * 100);
        const review = [...new Set([...s.review.filter((id) => !rightIds.includes(id)), ...wrongIds])];
        return {
          ...s,
          review,
          quizCount: s.quizCount + 1,
          quizBest: s.quizBest == null ? pct : Math.max(s.quizBest, pct),
        };
      }),
    [],
  );
  const clearReview = useCallback((id) => setState((s) => ({ ...s, review: s.review.filter((x) => x !== id) })), []);
  const resetAll = useCallback(() => setState(EMPTY), []);

  const value = useMemo(
    () => ({ ...state, toggleLearned, toggleBookmark, markLearned, recordQuiz, clearReview, resetAll }),
    [state, toggleLearned, toggleBookmark, markLearned, recordQuiz, clearReview, resetAll],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}
