import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Memory Trainer — Web (React)
 * - 설정 화면과 훈련 화면 분리
 * - "훈련 글자 수 = 시퀀스 길이" 고정
 * - 표시 시간 후 특정 위치를 '?' 로 마스킹
 * - 제출 시 모달로 결과 표시, 마지막에 총점 모달
 * - 중복 허용(random.choices) 방식으로 시퀀스 생성
 *
 * 사용법(빠른 시작)
 * 1) Vite로 React 앱 생성: npm create vite@latest memory-trainer-web -- --template react
 * 2) 위 프로젝트의 src/App.jsx 내용을 전부 이 코드로 교체
 * 3) npm install && npm run dev
 */

function Modal({ open, onClose, children, title, primaryLabel = "확인" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-[min(92vw,560px)] p-6">
        {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
        <div className="text-base mb-6">{children}</div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl shadow hover:shadow-md transition border border-gray-300"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function parseSyllables(input) {
  return Array.from(
    new Set(
      (input || "")
        .replace(/\n/g, " ")
        .replace(/,/g, " ")
        .split(/\s+/)
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

function randomChoices(arr, k) {
  const out = [];
  for (let i = 0; i < k; i++) {
    out.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return out;
}

export default function App() {
  const [view, setView] = useState("config"); // config | train

  // 설정 값
  const [syllablesText, setSyllablesText] = useState("가 나 다 라 마 바 사 아 자 차");
  const [seqLength, setSeqLength] = useState(4);
  const [displayTime, setDisplayTime] = useState(1.5);
  const [totalQuestions, setTotalQuestions] = useState(10);

  // 검증 에러
  const [error, setError] = useState("");

  // 훈련 상태
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [seq, setSeq] = useState([]); // 현재 시퀀스
  const [correctIdx, setCorrectIdx] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [masked, setMasked] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);

  // 제출/결과 모달
  const [resultOpen, setResultOpen] = useState(false);
  const [resultMsg, setResultMsg] = useState("");

  const inputRef = useRef(null);
  const showTimerRef = useRef(null);

  const syllables = useMemo(() => parseSyllables(syllablesText), [syllablesText]);

  // 화면 전환 시 타이머 정리
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, []);

  function startTraining() {
    setError("");
    try {
      if (syllables.length < 3) throw new Error("훈련 글자는 최소 3개 이상 입력해 주세요.");
      if (!Number.isFinite(seqLength) || seqLength <= 0) throw new Error("시퀀스 길이는 1 이상이어야 합니다.");
      if (seqLength > syllables.length) throw new Error("시퀀스 길이가 입력한 글자 개수보다 많습니다.");
      if (!Number.isFinite(displayTime) || displayTime <= 0) throw new Error("표시 시간은 0보다 커야 합니다.");
      if (!Number.isFinite(totalQuestions) || totalQuestions <= 0) throw new Error("문항 수는 1 이상이어야 합니다.");
    } catch (e) {
      setError(e.message);
      return;
    }
    setCurrentQ(0);
    setCorrectCount(0);
    setView("train");
    requestAnimationFrame(() => {
      nextRound(0, 0);
    });
  }

  function nextRound(q = currentQ, corr = correctCount) {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);

    if (q >= totalQuestions) {
      setFinalOpen(true);
      return;
    }

    const newSeq = randomChoices(syllables, seqLength);
    const idx = Math.floor(Math.random() * seqLength);
    const answer = newSeq[idx];

    setSeq(newSeq);
    setCorrectIdx(idx);
    setCorrectAnswer(answer);
    setMasked(false);

    // 표시 시간 뒤 마스킹
    showTimerRef.current = setTimeout(() => {
      setMasked(true);
      // 입력 포커스
      setTimeout(() => inputRef.current?.focus(), 10);
    }, Math.max(1, Math.floor(displayTime * 1000)));
  }

  function handleSubmit(e) {
    e?.preventDefault?.();
    if (!masked) return; // 아직 입력 단계 아님
    const user = inputRef.current?.value?.trim() ?? "";
    const isCorrect = user === correctAnswer;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setResultMsg(`정답! (${correctAnswer})`);
    } else {
      setResultMsg(`오답… 정답은 '${correctAnswer}'`);
    }
    setCurrentQ((q) => q + 1);
    setResultOpen(true);
  }

  function closeResultAndContinue() {
    setResultOpen(false);
    inputRef.current && (inputRef.current.value = "");
    nextRound(currentQ + 0, correctCount + 0); // 최신 state 기준으로 내부에서 검사
  }

  function closeFinalToConfig() {
    setFinalOpen(false);
    setView("config");
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <header className="max-w-5xl mx-auto px-6 pt-8">
        <h1 className="text-3xl font-bold">무의미 글자 훈련 — 웹</h1>
        <p className="text-sm text-gray-600 mt-1">설정 화면과 훈련 화면을 분리한 브라우저 버전</p>
      </header>

      {view === "config" && (
        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-lg font-medium">훈련 글자 (공백/쉼표 구분)</label>
              <textarea
                className="w-full h-28 rounded-2xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={syllablesText}
                onChange={(e) => setSyllablesText(e.target.value)}
              />
              <p className="text-sm text-gray-500">예: 가 나 다 라 마 바 사 아 자 차</p>
            </div>
            <div className="grid grid-cols-2 gap-4 content-start">
              <div className="space-y-2">
                <label className="block text-lg font-medium">시퀀스 길이</label>
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-2xl border border-gray-300 p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={seqLength}
                  onChange={(e) => setSeqLength(parseInt(e.target.value || "0", 10))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-medium">표시 시간(초)</label>
                <input
                  type="number"
                  step="0.1"
                  min={0.1}
                  className="w-full rounded-2xl border border-gray-300 p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={displayTime}
                  onChange={(e) => setDisplayTime(parseFloat(e.target.value || "0"))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-medium">문항 수</label>
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-2xl border border-gray-300 p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(parseInt(e.target.value || "0", 10))}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-sm">⚠️ {error}</div>
          )}

          <div className="mt-8">
            <button
              onClick={startTraining}
              className="px-6 py-3 rounded-2xl text-lg font-semibold bg-indigo-600 text-white shadow hover:shadow-md active:scale-[0.99]"
            >
              훈련 시작
            </button>
          </div>
        </main>
      )}

      {view === "train" && (
        <main className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-medium">
              진행: {currentQ} / {totalQuestions} <span className="text-gray-400">|</span> 정답: {correctCount}
            </div>
            <button
              onClick={() => setView("config")}
              className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow"
            >
              설정으로
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-5xl sm:text-6xl font-bold tracking-wide select-none">
              {masked && correctIdx != null
                ? seq.map((s, i) => (i === correctIdx ? "?" : s)).join(" ")
                : (seq.join(" ") || "")}
            </div>

            <form onSubmit={handleSubmit} className="mt-10 flex items-center gap-3">
              <label className="text-lg">정답 입력:</label>
              <input
                ref={inputRef}
                disabled={!masked}
                className="w-40 text-center text-3xl rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
                placeholder=""
                maxLength={8}
              />
              <button
                disabled={!masked}
                type="submit"
                className="px-5 py-2 rounded-2xl text-lg font-semibold bg-indigo-600 text-white shadow hover:shadow-md disabled:opacity-50"
              >
                제출
              </button>
            </form>
          </div>
        </main>
      )}

      {/* 결과 모달 */}
      <Modal open={resultOpen} onClose={closeResultAndContinue} title="결과" primaryLabel="다음">
        <p className="text-lg">{resultMsg}</p>
      </Modal>

      {/* 최종 결과 모달 */}
      <Modal open={finalOpen} onClose={closeFinalToConfig} title="훈련 종료" primaryLabel="설정으로">
        <p className="text-lg">
          총 {totalQuestions}문항 중 {correctCount}문항 정답 (정답률 {((correctCount / Math.max(1,totalQuestions)) * 100).toFixed(1)}%)
        </p>
      </Modal>
    </div>
  );
}
