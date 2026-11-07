import { C } from './colors';
import { Svg, T, Pill, Box } from './kit';

function Income() {
  const base = 160;
  const k = 1.24;
  const bars = [
    { name: '매출액', from: 0, to: 100, fill: C.accentBg, v: '100' },
    { name: '원가', from: 40, to: 100, fill: C.soft, v: '−60', cost: true },
    { name: '판관비', from: 15, to: 40, fill: C.soft, v: '−25', cost: true },
    { name: '영업이익', from: 0, to: 15, fill: C.aqua, v: '15' },
    { name: '이자·세금', from: 10, to: 15, fill: C.soft, v: '−5', cost: true },
    { name: '순이익', from: 0, to: 10, fill: C.gold, v: '10' },
  ];
  const x = (i) => 34 + i * 51;
  return (
    <Svg label="매출액에서 원가와 판관비를 빼면 영업이익, 이자와 세금까지 빼면 순이익">
      {bars.map((b, i) => {
        const top = base - b.to * k;
        const h = (b.to - b.from) * k;
        return (
          <g key={b.name}>
            {i > 0 && (
              <line
                x1={x(i - 1) + 17}
                x2={x(i) - 17}
                y1={base - (bars[i - 1].cost ? bars[i - 1].from : bars[i - 1].to) * k}
                y2={base - (bars[i - 1].cost ? bars[i - 1].from : bars[i - 1].to) * k}
                stroke={C.muted}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}
            <rect
              x={x(i) - 17}
              y={top}
              width={34}
              height={Math.max(h, 2)}
              rx={3}
              fill={b.fill}
              stroke={b.cost ? C.muted : 'none'}
              strokeWidth={1.2}
              strokeDasharray={b.cost ? '3 2' : undefined}
            />
            <T x={x(i)} y={top - 9} size={10.5} weight={800} color={b.cost ? C.muted : C.ink}>
              {b.v}
            </T>
            <T x={x(i)} y={176} size={10} weight={b.cost ? 500 : 800} color={b.cost ? C.ink2 : C.ink}>
              {b.name}
            </T>
          </g>
        );
      })}
      <line x1={12} y1={base} x2={308} y2={base} stroke={C.line} strokeWidth={1.5} />
      <T x={160} y={193} size={9.5} color={C.muted}>
        붕어빵 가게 100만 원 매출 예시 (단위: 만 원)
      </T>
    </Svg>
  );
}

function BalanceSheet() {
  return (
    <Svg label="자산 5억은 부채 3억과 자본 2억을 더한 것과 같다">
      <T x={76} y={14} size={10.5} weight={700} color={C.ink2}>
        가진 것
      </T>
      <T x={246} y={14} size={10.5} weight={700} color={C.ink2}>
        어디서 난 돈?
      </T>
      <rect x={28} y={28} width={96} height={150} rx={10} fill={C.aquaSoft} stroke={C.aqua} strokeWidth={2} />
      {/* 집 아이콘 */}
      <path d="M52,84 L76,62 L100,84 Z" fill={C.aqua} />
      <rect x={58} y={84} width={36} height={28} rx={2} fill={C.aqua} />
      <rect x={71} y={96} width={10} height={16} rx={1} fill={C.aquaSoft} />
      <T x={76} y={136} size={14} weight={800} color={C.aquaInk}>
        자산
      </T>
      <T x={76} y={156} size={13} weight={700}>
        5억
      </T>
      <T x={160} y={104} size={26} color={C.muted}>
        =
      </T>
      <rect x={198} y={28} width={96} height={88} rx={10} fill={C.orangeSoft} stroke={C.orange} strokeWidth={2} />
      <T x={246} y={60} size={13} weight={800} color={C.orange}>
        부채
      </T>
      <T x={246} y={77} size={10} color={C.ink2}>
        빌린 돈 (대출)
      </T>
      <T x={246} y={96} size={13} weight={700}>
        3억
      </T>
      <rect x={198} y={120} width={96} height={58} rx={10} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
      <T x={246} y={136} size={13} weight={800} color={C.accent}>
        자본
      </T>
      <T x={246} y={151} size={10} color={C.ink2}>
        원래 내 돈
      </T>
      <T x={246} y={168} size={13} weight={700}>
        2억
      </T>
      <T x={160} y={194} size={10} color={C.ink2}>
        자산 = 부채 + 자본
      </T>
    </Svg>
  );
}

function arcPath(cx, cy, r, aDeg0, aDeg1) {
  const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(aDeg0);
  const [x1, y1] = p(aDeg1);
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
}

function DebtRatio() {
  const cx = 160;
  const cy = 142;
  const r = 92;
  const ang = (pct) => 180 - (pct / 300) * 180;
  const zones = [
    { a: 0, b: 100, c: C.aqua, label: '안정적', lp: 50 },
    { a: 100, b: 200, c: C.gold, label: '보통', lp: 150 },
    { a: 200, b: 300, c: C.orange, label: '주의', lp: 250 },
  ];
  const needle = ang(150);
  const nx = cx + 70 * Math.cos((needle * Math.PI) / 180);
  const ny = cy - 70 * Math.sin((needle * Math.PI) / 180);
  return (
    <Svg label="부채 3억 나누기 자본 2억은 부채비율 150%">
      {zones.map((z) => {
        const la = (ang(z.lp) * Math.PI) / 180;
        return (
          <g key={z.label}>
            <path d={arcPath(cx, cy, r, ang(z.a) - 1, ang(z.b) + 1)} fill="none" stroke={z.c} strokeWidth={18} />
            <T
              x={cx + (r + 16) * Math.cos(la)}
              y={cy - (r + 16) * Math.sin(la)}
              size={10.5}
              weight={700}
              color={C.ink2}
              anchor={z.lp < 100 ? 'end' : z.lp > 200 ? 'start' : 'middle'}
            >
              {z.label}
            </T>
          </g>
        );
      })}
      {[0, 100, 200, 300].map((p) => {
        const a = (ang(p) * Math.PI) / 180;
        return (
          <T key={p} x={cx + (r - 26) * Math.cos(a)} y={cy - (r - 26) * Math.sin(a)} size={9} color={C.muted}>
            {p}%
          </T>
        );
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={7} fill={C.ink} />
      <Box x={92} y={156} w={136} h={38} fill={C.soft} stroke="none" r={10} />
      <T x={160} y={168} size={12.5} weight={800}>
        부채비율 150%
      </T>
      <T x={160} y={184} size={9.5} color={C.ink2}>
        부채 3억 ÷ 자본 2억
      </T>
    </Svg>
  );
}

function Earnings() {
  const base = 140;
  const panel = (cx, expect, actual, good) => (
    <g>
      <rect x={cx - 38} y={base - expect} width={30} height={expect} rx={4} fill="none" stroke={C.muted} strokeWidth={1.8} strokeDasharray="4 3" />
      <rect x={cx + 6} y={base - actual} width={30} height={actual} rx={4} fill={good ? C.up : C.down} />
      <T x={cx - 23} y={base + 12} size={10} color={C.ink2}>
        예상
      </T>
      <T x={cx + 21} y={base + 12} size={10} weight={700}>
        실제
      </T>
      <Pill x={cx} y={172} text={good ? '어닝 서프라이즈' : '어닝 쇼크'} color={good ? C.up : C.down} size={11} />
      <T x={cx} y={192} size={10} color={C.ink2}>
        {good ? '예상보다 좋음 → 주가 ↑' : '예상보다 나쁨 → 주가 ↓'}
      </T>
    </g>
  );
  return (
    <Svg label="실제 실적이 시장 예상보다 좋으면 어닝 서프라이즈, 나쁘면 어닝 쇼크">
      <T x={160} y={16} size={10.5} color={C.ink2} weight={600}>
        주가는 &quot;예상 대비&quot; 성적에 반응해요
      </T>
      {panel(82, 80, 108, true)}
      {panel(238, 80, 52, false)}
      <line x1={14} y1={base} x2={306} y2={base} stroke={C.line} strokeWidth={1.5} />
    </Svg>
  );
}

export const financeIllustrations = {
  income: Income,
  'balance-sheet': BalanceSheet,
  'debt-ratio': DebtRatio,
  earnings: Earnings,
};
