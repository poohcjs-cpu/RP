const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

/** '시가총액' → 'ㅅㄱㅊㅇ' */
export function toChosung(str) {
  let out = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code >= 0 && code <= 11171) out += CHO[Math.floor(code / 588)];
    else out += ch;
  }
  return out;
}

const isChosungOnly = (s) => /^[ㄱ-ㅎ\s]+$/.test(s);
const norm = (s) => s.toLowerCase().replace(/[\s·()]/g, '');

/** 용어 검색: 이름 · 영문 · 별칭 · 한 줄 정의, 초성 검색 지원. 점수가 높은 순으로 반환 */
export function searchTerms(terms, query) {
  const q = norm(query.trim());
  if (!q) return [];
  const cho = isChosungOnly(query.trim());
  const scored = [];
  for (const t of terms) {
    const name = norm(t.term);
    // 영문은 단어 앞부분만 비교 ('per' 로 'Upper' 가 걸리지 않도록)
    const enWords = t.en.toLowerCase().split(/[^a-z0-9/&+-]+/).filter(Boolean);
    const names = [name, ...t.keywords.map(norm)];
    const enHit = enWords.some((w) => w.startsWith(q));
    let score = 0;
    if (cho) {
      const qc = q.replace(/\s/g, '');
      if (toChosung(name).startsWith(qc)) score = 90;
      else if (names.some((n) => toChosung(n).includes(qc))) score = 60;
    } else if (name === q) score = 100;
    else if (name.startsWith(q)) score = 90;
    else if (name.includes(q)) score = 80;
    else if (names.some((n) => n.includes(q)) || enHit) score = 70;
    else if (norm(t.summary).includes(q)) score = 40;
    else if (norm(t.analogy).includes(q) || t.points.some((p) => norm(p).includes(q))) score = 20;
    if (score) scored.push({ t, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.t);
}
