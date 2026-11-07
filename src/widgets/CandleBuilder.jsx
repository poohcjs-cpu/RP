import { useState } from 'react';
import { C } from '../illustrations/colors';
import { Candle, T } from '../illustrations/kit';
import { won, signedPct } from '../lib/format';
import { Slider, Note, PresetButton } from './ui';

const MIN = 8000;
const MAX = 12000;

const PRESETS = [
  { name: '장대양봉', o: 9200, h: 11300, l: 9100, c: 11200 },
  { name: '장대음봉', o: 11200, h: 11300, l: 8900, c: 9000 },
  { name: '긴 윗꼬리', o: 9800, h: 11800, l: 9700, c: 10000 },
  { name: '긴 아랫꼬리', o: 10300, h: 10400, l: 8400, c: 10200 },
  { name: '도지(십자)', o: 10000, h: 10900, l: 9100, c: 10000 },
];

function describe({ o, h, l, c }) {
  const body = Math.abs(c - o);
  const range = h - l;
  const upper = h - Math.max(o, c);
  const lower = Math.min(o, c) - l;
  const isUp = c > o;
  const kind = c === o ? '도지' : isUp ? '양봉' : '음봉';
  if (range === 0) return { kind, text: '하루 종일 가격이 한 번도 움직이지 않았어요.' };
  if (body / range <= 0.1)
    return {
      kind: '도지 (십자형)',
      text: `시가와 종가가 거의 같아요. 장중엔 ${won(l)}~${won(h)} 사이를 오갔지만, 사려는 힘과 팔려는 힘이 팽팽하게 맞서 제자리에서 끝났어요.`,
    };
  if (upper > body * 1.5 && upper > lower)
    return {
      kind: `윗꼬리가 긴 ${kind}`,
      text: `장중에 ${won(h)}까지 올랐지만 팔려는 힘(매도 압력)에 밀려 ${won(c)}로 내려와 끝났어요. 위쪽에서 팔려는 사람이 많다는 신호로 봐요.`,
    };
  if (lower > body * 1.5 && lower > upper)
    return {
      kind: `아랫꼬리가 긴 ${kind}`,
      text: `장중에 ${won(l)}까지 떨어졌지만 사려는 힘(매수세)이 들어와 ${won(c)}까지 다시 올라왔어요. 아래쪽에서 받쳐주는 힘이 있다는 신호로 봐요.`,
    };
  if (body / range >= 0.8)
    return {
      kind: isUp ? '장대양봉' : '장대음봉',
      text: isUp
        ? '시작부터 끝까지 강하게 올랐어요. 꼬리가 짧아 하루 종일 사려는 힘이 우세했던 날이에요.'
        : '시작부터 끝까지 강하게 내렸어요. 꼬리가 짧아 하루 종일 팔려는 힘이 우세했던 날이에요.',
    };
  return {
    kind,
    text: isUp
      ? `시가 ${won(o)}보다 높은 ${won(c)}에 끝났어요. 몸통이 빨간색이에요.`
      : `시가 ${won(o)}보다 낮은 ${won(c)}에 끝났어요. 몸통이 파란색이에요.`,
  };
}

/** 라벨이 겹치지 않게 최소 간격만큼 벌림. 입력: [라벨, y] (위→아래 순) */
function spread(items, gap) {
  const out = items.map(([l, yy]) => [l, yy, yy]);
  for (let i = 1; i < out.length; i++) {
    if (out[i][1] - out[i - 1][1] < gap) out[i][1] = out[i - 1][1] + gap;
  }
  const overflow = out[out.length - 1][1] - 192;
  if (overflow > 0) {
    out[out.length - 1][1] -= overflow;
    for (let i = out.length - 2; i >= 0; i--) {
      if (out[i + 1][1] - out[i][1] < gap) out[i][1] = out[i + 1][1] - gap;
    }
  }
  return out;
}

export default function CandleBuilder() {
  const [v, setV] = useState({ o: 10000, h: 10900, l: 9700, c: 10600 });

  const set = (key) => (val) =>
    setV((p) => {
      const n = { ...p, [key]: val };
      if (key === 'o' || key === 'c') {
        n.h = Math.max(n.h, n.o, n.c);
        n.l = Math.min(n.l, n.o, n.c);
      }
      if (key === 'h') n.h = Math.max(val, n.o, n.c);
      if (key === 'l') n.l = Math.min(val, n.o, n.c);
      return n;
    });

  const y = (p) => 14 + ((MAX - p) / (MAX - MIN)) * 172;
  const info = describe(v);
  const chg = ((v.c - v.o) / v.o) * 100;
  const up = v.c > v.o;
  const down = v.c < v.o;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[200px_1fr] sm:items-center">
        <div className="mx-auto w-full max-w-[220px] rounded-2xl bg-soft p-2">
          <svg viewBox="0 0 200 200" className="block h-auto w-full" role="img" aria-label="내가 만든 캔들">
            {[9000, 10000, 11000].map((p) => (
              <g key={p}>
                <line x1={10} x2={190} y1={y(p)} y2={y(p)} stroke={C.line} strokeWidth={1} strokeDasharray="3 4" />
                <T x={12} y={y(p) - 7} size={9} color={C.muted} anchor="start">
                  {p.toLocaleString()}
                </T>
              </g>
            ))}
            <Candle x={92} open={y(v.o)} close={y(v.c)} high={y(v.h)} low={y(v.l)} w={40} color={!up && !down ? C.ink2 : undefined} />
            {spread(
              [
                ['고가', y(v.h)],
                [up ? '종가' : '시가', y(Math.max(v.o, v.c))],
                [up ? '시가' : '종가', y(Math.min(v.o, v.c))],
                ['저가', y(v.l)],
              ],
              12,
            ).map(([label, yy, real]) => (
              <g key={label}>
                <line x1={114} x2={120} y1={real} y2={yy} stroke={C.muted} strokeWidth={1} />
                <T x={122} y={yy} size={10} weight={700} anchor="start" color={C.ink2}>
                  {label}
                </T>
              </g>
            ))}
          </svg>
        </div>
        <div className="space-y-3">
          <Slider label="시가 (처음 가격)" value={v.o} min={MIN} max={MAX} step={100} onChange={set('o')} format={won} />
          <Slider label="종가 (마지막 가격)" value={v.c} min={MIN} max={MAX} step={100} onChange={set('c')} format={won} />
          <Slider label="고가 (가장 높은 가격)" value={v.h} min={MIN} max={MAX} step={100} onChange={set('h')} format={won} />
          <Slider label="저가 (가장 낮은 가격)" value={v.l} min={MIN} max={MAX} step={100} onChange={set('l')} format={won} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <PresetButton key={p.name} onClick={() => setV({ o: p.o, h: p.h, l: p.l, c: p.c })}>
            {p.name}
          </PresetButton>
        ))}
      </div>
      <div aria-live="polite">
        <Note tone={up ? 'up' : down ? 'down' : 'soft'}>
          <strong className="font-extrabold">
            {info.kind} · 시가 대비 {signedPct(chg)}
          </strong>
          <br />
          {info.text}
        </Note>
      </div>
    </div>
  );
}
