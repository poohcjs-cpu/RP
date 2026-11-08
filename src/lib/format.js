export function won(n) {
  return `${Math.round(n).toLocaleString('ko-KR')}원`;
}

/** 큰 금액을 '1억 2,300만 원' 처럼 */
export function wonKorean(n) {
  const v = Math.round(n);
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  const eok = Math.floor(a / 1e8);
  const man = Math.floor((a % 1e8) / 1e4);
  if (eok && man) return `${sign}${eok.toLocaleString()}억 ${man.toLocaleString()}만 원`;
  if (eok) return `${sign}${eok.toLocaleString()}억 원`;
  if (man) return `${sign}${man.toLocaleString()}만 원`;
  return `${sign}${a.toLocaleString()}원`;
}

export function signedPct(v, digits = 1) {
  const s = v > 0 ? '+' : v < 0 ? '−' : '';
  return `${s}${Math.abs(v).toFixed(digits)}%`;
}
