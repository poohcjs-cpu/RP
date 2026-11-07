import { C } from './colors';
import { Svg, T, Pill, Arrow, Coin, Box, Share, HLine } from './kit';

function CoinStack({ cx, base, n, rx = 24 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const cy = base - i * 8;
        return (
          <g key={i}>
            <rect x={cx - rx} y={cy - 4} width={rx * 2} height={8} fill={C.gold} />
            <ellipse cx={cx} cy={cy + 4} rx={rx} ry={6} fill={C.gold} />
            <ellipse cx={cx} cy={cy - 4} rx={rx} ry={6} fill={C.gold} stroke={C.card} strokeWidth={1.2} />
          </g>
        );
      })}
    </g>
  );
}

function Eps() {
  return (
    <Svg label="1년 순이익을 주식 수로 나누면 1주당 순이익(EPS)">
      <CoinStack cx={56} base={140} n={7} />
      <T x={56} y={164} size={12} weight={800}>
        순이익
      </T>
      <T x={56} y={181} size={10.5} color={C.ink2}>
        100억 원
      </T>
      <T x={108} y={110} size={26} color={C.muted} weight={300}>
        ÷
      </T>
      {Array.from({ length: 9 }, (_, i) => (
        <Share key={i} x={130 + (i % 3) * 24} y={66 + Math.floor(i / 3) * 26} w={19} h={23} color={C.accent} />
      ))}
      <T x={164} y={164} size={12} weight={800}>
        주식 수
      </T>
      <T x={164} y={181} size={10.5} color={C.ink2}>
        1,000만 주
      </T>
      <T x={218} y={110} size={24} color={C.muted} weight={300}>
        =
      </T>
      <Share x={240} y={78} w={38} h={48} color={C.accent} />
      <Coin cx={278} cy={78} r={14} />
      <Pill x={264} y={146} text="EPS" color={C.accentBg} />
      <T x={264} y={170} size={11.5} weight={800}>
        1주당 1,000원
      </T>
      <T x={264} y={186} size={9.5} color={C.ink2}>
        1주가 1년에 번 돈
      </T>
    </Svg>
  );
}

function Per() {
  const base = 160;
  return (
    <Svg label="1년에 1,000만 원 버는 가게를 1억 원에 사면 10년 만에 본전, PER 10">
      {/* 가게 */}
      <path d="M14,96 L50,70 L86,96 Z" fill={C.orange} />
      <rect x={20} y={96} width={60} height={50} rx={3} fill={C.orangeSoft} stroke={C.orange} strokeWidth={1.5} />
      <rect x={42} y={116} width={16} height={30} rx={2} fill={C.orange} />
      <Pill x={50} y={52} text="가격 1억" color={C.goldSoft} textColor={C.goldInk} size={10.5} />
      <T x={50} y={164} size={10} weight={700}>
        1년에 1,000만 원
      </T>
      <T x={50} y={179} size={10} color={C.ink2}>
        버는 가게
      </T>
      {/* 해마다 쌓이는 이익 */}
      <HLine x1={102} x2={306} y={base - 110} color={C.goldInk} />
      <T x={306} y={base - 122} size={10} weight={700} color={C.goldInk} anchor="end">
        본전 1억
      </T>
      {Array.from({ length: 10 }, (_, i) => {
        const h = (i + 1) * 11;
        const x = 108 + i * 19.5;
        return (
          <g key={i}>
            <rect x={x} y={base - h} width={14} height={h} rx={3} fill={i === 9 ? C.accentBg : C.accent} fillOpacity={i === 9 ? 1 : 0.35} />
            <T x={x + 7} y={base + 10} size={9} color={C.ink2}>
              {i + 1}
            </T>
          </g>
        );
      })}
      <T x={110} y={36} size={9.5} color={C.muted} anchor="start">
        쌓인 이익
      </T>
      <Pill x={206} y={188} text="PER 10 = 10년이면 본전" color={C.accentBg} size={10.5} />
    </Svg>
  );
}

function Bps() {
  const base = 150;
  const k = 0.11; // 1억당 px
  const bar = (x, v, fill, stroke, top) => <rect x={x} y={top ?? base - v * k} width={46} height={v * k} rx={4} fill={fill} stroke={stroke} strokeWidth={1.5} />;
  return (
    <Svg label="자산에서 부채를 빼면 순자산, 이를 주식 수로 나누면 BPS">
      {bar(16, 1000, C.aquaSoft, C.aqua)}
      <T x={39} y={164} size={11} weight={800}>
        자산
      </T>
      <T x={39} y={180} size={10} color={C.ink2}>
        1,000억
      </T>
      <T x={78} y={112} size={22} color={C.muted}>
        −
      </T>
      {bar(94, 400, C.orangeSoft, C.orange)}
      <T x={117} y={164} size={11} weight={800}>
        부채
      </T>
      <T x={117} y={180} size={10} color={C.ink2}>
        400억
      </T>
      <T x={156} y={112} size={22} color={C.muted}>
        =
      </T>
      {bar(172, 600, C.accentSoft, C.accent)}
      <T x={195} y={164} size={11} weight={800}>
        순자산
      </T>
      <T x={195} y={180} size={10} color={C.ink2}>
        600억
      </T>
      <T x={268} y={70} size={10.5} weight={700} color={C.ink2}>
        ÷ 주식 1,000만 주
      </T>
      <Arrow x1={268} y1={84} x2={268} y2={110} color={C.ink2} />
      <Pill x={268} y={126} text="BPS 6,000원" color={C.accentBg} size={11} />
      <T x={268} y={150} size={9.5} color={C.ink2}>
        1주당 순자산
      </T>
    </Svg>
  );
}

function Pbr() {
  const base = 146;
  const groups = [
    { x: 58, p: 30, label: 'PBR 0.5', note: '재산보다 싸게' },
    { x: 160, p: 60, label: 'PBR 1', note: '재산만큼' },
    { x: 262, p: 120, label: 'PBR 2', note: '재산보다 비싸게' },
  ];
  return (
    <Svg label="주가가 1주당 순자산보다 낮으면 PBR 1 미만, 같으면 1, 높으면 1 초과">
      <rect x={66} y={8} width={12} height={12} rx={3} fill={C.aqua} />
      <T x={82} y={14} size={10} anchor="start" weight={600}>
        1주당 순자산 (BPS)
      </T>
      <rect x={198} y={8} width={12} height={12} rx={3} fill={C.accentBg} />
      <T x={214} y={14} size={10} anchor="start" weight={600}>
        주가
      </T>
      {groups.map((g) => (
        <g key={g.label}>
          <rect x={g.x - 30} y={base - 60} width={26} height={60} rx={4} fill={C.aqua} />
          <rect x={g.x + 4} y={base - g.p} width={26} height={g.p} rx={4} fill={C.accentBg} />
          <T x={g.x} y={164} size={12} weight={800}>
            {g.label}
          </T>
          <T x={g.x} y={181} size={10} color={C.ink2}>
            {g.note}
          </T>
        </g>
      ))}
      <line x1={14} y1={base} x2={306} y2={base} stroke={C.line} strokeWidth={1.5} />
    </Svg>
  );
}

function Stall({ cx }) {
  return (
    <g>
      <line x1={cx - 30} y1={70} x2={cx - 30} y2={130} stroke={C.ink2} strokeWidth={2} />
      <line x1={cx + 30} y1={70} x2={cx + 30} y2={130} stroke={C.ink2} strokeWidth={2} />
      <path
        d={`M${cx - 40},70 L${cx + 40},70 L${cx + 36},56 L${cx - 36},56 Z`}
        fill={C.orange}
      />
      {[-30, -10, 10, 30].map((d) => (
        <path key={d} d={`M${cx + d - 10},70 q10,12 20,0`} fill={C.orange} />
      ))}
      <rect x={cx - 38} y={100} width={76} height={32} rx={4} fill={C.aquaSoft} stroke={C.aqua} strokeWidth={1.5} />
    </g>
  );
}

function Roe() {
  return (
    <Svg label="같은 자본 1억으로 1,000만 원을 벌면 ROE 10%, 2,000만 원을 벌면 ROE 20%">
      <T x={160} y={14} size={10.5} color={C.ink2} weight={600}>
        같은 내 돈 1억 원으로 1년 장사하면?
      </T>
      <Stall cx={80} />
      <Coin cx={80} cy={38} r={12} />
      <T x={80} y={116} size={10.5} weight={700}>
        A 가게
      </T>
      <T x={80} y={150} size={10.5} color={C.ink2}>
        순이익 1,000만 원
      </T>
      <Pill x={80} y={176} text="ROE 10%" color={C.soft} textColor={C.ink} size={12} />
      <Stall cx={240} />
      <Coin cx={228} cy={38} r={12} />
      <Coin cx={252} cy={38} r={12} />
      <T x={240} y={116} size={10.5} weight={700}>
        B 가게
      </T>
      <T x={240} y={150} size={10.5} color={C.ink2}>
        순이익 2,000만 원
      </T>
      <Pill x={240} y={176} text="ROE 20% · 실력 ↑" color={C.accentBg} size={12} />
    </Svg>
  );
}

function DividendYield() {
  const cx = 254;
  const cy = 92;
  const r = 44;
  const frac = 0.04;
  const a = 2 * Math.PI * frac;
  const x1 = cx + r * Math.sin(a);
  const y1 = cy - r * Math.cos(a);
  return (
    <Svg label="주가 5만 원짜리 주식이 1년에 배당 2,000원을 주면 배당수익률 4%">
      <Share x={28} y={40} w={64} h={82} color={C.accent} />
      <Pill x={60} y={142} text="주가 50,000원" color={C.goldSoft} textColor={C.goldInk} size={10.5} />
      <Arrow x1={104} y1={82} x2={150} y2={82} color={C.goldInk} />
      <T x={127} y={66} size={9.5} color={C.ink2}>
        1년 동안
      </T>
      <Coin cx={174} cy={82} r={16} />
      <T x={174} y={112} size={10.5} weight={700}>
        배당 2,000원
      </T>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.soft} strokeWidth={16} />
      <path d={`M${cx},${cy - r} A${r},${r} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)}`} fill="none" stroke={C.gold} strokeWidth={16} />
      <T x={cx} y={cy - 4} size={20} weight={800} color={C.goldInk}>
        4%
      </T>
      <T x={cx} y={cy + 15} size={9} color={C.ink2}>
        2,000 ÷ 50,000
      </T>
      <T x={cx} y={156} size={11.5} weight={800}>
        배당수익률
      </T>
      <T x={160} y={186} size={10} color={C.ink2}>
        들고만 있어도 받는 현금 수익률 (월세 수익률과 비슷)
      </T>
    </Svg>
  );
}

export const valueIllustrations = {
  eps: Eps,
  per: Per,
  bps: Bps,
  pbr: Pbr,
  roe: Roe,
  'dividend-yield': DividendYield,
};
