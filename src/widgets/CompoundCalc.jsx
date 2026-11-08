import { useMemo, useRef, useState } from 'react';
import { C, linePath } from '../illustrations/colors';
import { T } from '../illustrations/kit';
import { wonKorean } from '../lib/format';
import { Slider, Stat, Note } from './ui';

function simulate({ initial, monthly, rate, years }) {
  const rm = (1 + rate / 100) ** (1 / 12) - 1;
  let value = initial;
  let principal = initial;
  const rows = [{ year: 0, value, principal }];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      value = value * (1 + rm) + monthly;
      principal += monthly;
    }
    rows.push({ year: y, value, principal });
  }
  return rows;
}

const W = 320;
const H = 180;
const PAD = { l: 8, r: 8, t: 14, b: 22 };

export default function CompoundCalc() {
  const [initial, setInitial] = useState(10_000_000);
  const [monthly, setMonthly] = useState(300_000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);

  const rows = useMemo(() => simulate({ initial, monthly, rate, years }), [initial, monthly, rate, years]);
  const last = rows[rows.length - 1];
  const maxV = Math.max(...rows.map((r) => r.value), 1);
  const X = (yr) => PAD.l + (yr / years) * (W - PAD.l - PAD.r);
  const Y = (v) => PAD.t + (1 - v / maxV) * (H - PAD.t - PAD.b);
  const valuePts = rows.map((r) => [X(r.year), Y(r.value)]);
  const princPts = rows.map((r) => [X(r.year), Y(r.principal)]);
  const area = `${linePath(valuePts)} L${X(years)},${Y(0)} L${X(0)},${Y(0)} Z`;
  const princArea = `${linePath(princPts)} L${X(years)},${Y(0)} L${X(0)},${Y(0)} Z`;

  const onMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const yr = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * years);
    setHover(Math.max(0, Math.min(years, yr)));
  };

  const h = hover != null ? rows[hover] : null;
  const ticks = years <= 10 ? [0, Math.round(years / 2), years] : [0, Math.round(years / 3), Math.round((2 * years) / 3), years];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label="처음 넣는 돈" value={initial} min={0} max={50_000_000} step={1_000_000} onChange={setInitial} format={wonKorean} />
        <Slider label="매달 적립" value={monthly} min={0} max={2_000_000} step={50_000} onChange={setMonthly} format={wonKorean} />
        <Slider label="연 수익률 (가정)" value={rate} min={1} max={15} step={0.5} onChange={setRate} format={(v) => `${v}%`} />
        <Slider label="기간" value={years} min={1} max={40} onChange={setYears} format={(v) => `${v}년`} />
      </div>

      <div className="relative rounded-2xl bg-soft p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full touch-pan-y"
          role="img"
          aria-label={`${years}년 뒤 예상 금액 ${wonKorean(last.value)}, 넣은 돈 ${wonKorean(last.principal)}`}
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <path d={area} fill={C.accent} fillOpacity={0.16} />
          <path d={princArea} fill={C.muted} fillOpacity={0.16} />
          <path d={linePath(princPts)} fill="none" stroke={C.muted} strokeWidth={2} />
          <path d={linePath(valuePts)} fill="none" stroke={C.accent} strokeWidth={2.6} />
          <line x1={PAD.l} x2={W - PAD.r} y1={Y(0)} y2={Y(0)} stroke={C.line} strokeWidth={1.5} />
          {ticks.map((t) => (
            <T key={t} x={X(t)} y={H - 9} size={9} color={C.muted} anchor={t === 0 ? 'start' : t === years ? 'end' : 'middle'}>
              {t === 0 ? '시작' : `${t}년`}
            </T>
          ))}
          {h && (
            <g>
              <line x1={X(h.year)} x2={X(h.year)} y1={PAD.t - 6} y2={Y(0)} stroke={C.ink2} strokeWidth={1} strokeDasharray="3 3" />
              <circle cx={X(h.year)} cy={Y(h.value)} r={4.5} fill={C.accentBg} stroke={C.card} strokeWidth={2} />
              <circle cx={X(h.year)} cy={Y(h.principal)} r={4} fill={C.muted} stroke={C.card} strokeWidth={2} />
            </g>
          )}
        </svg>
        {h && (
          <div
            className="pointer-events-none absolute top-2 rounded-lg bg-card px-2.5 py-1.5 text-xs shadow-md ring-1 ring-line"
            style={X(h.year) > W / 2 ? { left: 12 } : { right: 12 }}
          >
            <div className="font-extrabold text-ink">{h.year}년 뒤</div>
            <div className="text-accent">평가금액 {wonKorean(h.value)}</div>
            <div className="text-ink-2">넣은 돈 {wonKorean(h.principal)}</div>
          </div>
        )}
        <div className="mt-1 flex justify-center gap-4 text-xs font-semibold text-ink-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-accent" /> 복리로 불어난 금액
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-muted" /> 내가 넣은 돈
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="내가 넣은 돈" value={wonKorean(last.principal)} />
        <Stat label={`${years}년 뒤`} value={wonKorean(last.value)} tone="accent" />
        <Stat label="불어난 돈" value={wonKorean(last.value - last.principal)} tone="up" />
      </div>
      <Note>
        72의 법칙: 연 {rate}%면 약 <b>{(72 / rate).toFixed(1)}년</b>마다 돈이 2배가 돼요. 그래프를 누르거나 손가락으로 훑어 보면 해마다 금액을 볼 수 있어요.
        <br />
        <span className="text-xs opacity-80">※ 매년 같은 수익률이라고 가정한 계산이에요. 실제 주식 수익률은 해마다 오르내리고, 세금 · 수수료 · 물가는 빠져 있어요.</span>
      </Note>
    </div>
  );
}
