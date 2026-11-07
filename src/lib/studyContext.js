import { createContext, useContext } from 'react';

export const StudyContext = createContext(null);

/** 학습 기록 (이해한 용어 · 즐겨찾기 · 복습 필요 · 퀴즈 최고 점수) */
export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error('useStudy must be used inside <StudyProvider>');
  return ctx;
}
