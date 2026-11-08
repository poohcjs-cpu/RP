// 그림에서 쓰는 색 (index.css 의 CSS 변수를 참조 → 다크 모드 자동 대응)
export const C = {
  bg: 'var(--c-bg)',
  card: 'var(--c-card)',
  ink: 'var(--c-ink)',
  ink2: 'var(--c-ink-2)',
  muted: 'var(--c-muted)',
  line: 'var(--c-line)',
  soft: 'var(--c-soft)',
  up: 'var(--c-up)',
  upInk: 'var(--c-up-ink)',
  upSoft: 'var(--c-up-soft)',
  down: 'var(--c-down)',
  downInk: 'var(--c-down-ink)',
  downSoft: 'var(--c-down-soft)',
  accent: 'var(--c-accent)',
  accentBg: 'var(--c-accent-bg)',
  accentSoft: 'var(--c-accent-soft)',
  gold: 'var(--c-gold)',
  goldInk: 'var(--c-gold-ink)',
  goldSoft: 'var(--c-gold-soft)',
  aqua: 'var(--c-aqua)',
  aquaInk: 'var(--c-aqua-ink)',
  aquaSoft: 'var(--c-aqua-soft)',
  orange: 'var(--c-orange)',
  orangeSoft: 'var(--c-orange-soft)',
};

/** 대략적인 글자 폭 추정 (한글 ≈ 1em, 영문 · 숫자 ≈ 0.6em) */
export function textWidth(text, size) {
  let w = 0;
  for (const ch of String(text)) {
    if (/[ㄱ-힝]/.test(ch)) w += size * 0.98;
    else if (ch === ' ') w += size * 0.3;
    else if (/[.,·:]/.test(ch)) w += size * 0.32;
    else if (/[A-Z%₩]/.test(ch)) w += size * 0.68;
    else w += size * 0.58;
  }
  return w;
}

/** 피자 조각 path. 각도는 12시 방향 0°, 시계 방향 */
export function slicePath(cx, cy, r, a0, a1) {
  const rad = (a) => ((a - 90) * Math.PI) / 180;
  const x0 = cx + r * Math.cos(rad(a0));
  const y0 = cy + r * Math.sin(rad(a0));
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
}

/** 점 배열 → 부드럽지 않은 꺾은선 path */
export function linePath(points) {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

/** 점 배열 → 부드러운 곡선 path (Catmull-Rom → Bezier) */
export function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

/** 결정적 의사난수 (그림이 매번 똑같이 그려지도록) */
export function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
