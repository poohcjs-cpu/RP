import { C, linePath, smoothPath } from './colors';
import { Svg, T, Pill, Arrow, Box, Check, Cross, HLine, Egg, Basket } from './kit';

function ReturnRate() {
  const base = 150;
  const k = 1.1;
  return (
    <Svg label="100만 원이 50% 떨어져 50만 원이 되면, 다시 100만 원이 되려면 100% 올라야 한다">
      <rect x={30} y={base - 100 * k} width={52} height={100 * k} rx={5} fill={C.accentBg} />
      <T x={56} y={base - 100 * k - 10} size={11} weight={800}>
        100만 원
      </T>
      <T x={56} y={166} size={10.5} weight={700}>
        처음
      </T>
      <Arrow x1={92} y1={60} x2={126} y2={100} color={C.downInk} width={2.2} />
      <Pill x={106} y={52} text="−50%" color={C.down} size={11} />
      <rect x={134} y={base - 50 * k} width={52} height={50 * k} rx={5} fill={C.down} />
      <T x={160} y={base - 50 * k - 10} size={11} weight={800}>
        50만 원
      </T>
      <T x={160} y={166} size={10.5} weight={700}>
        손실 후
      </T>
      <Arrow x1={196} y1={104} x2={226} y2={72} color={C.upInk} width={2.2} />
      <Pill x={208} y={46} text="+100% 필요!" color={C.up} size={11} />
      <rect x={238} y={base - 50 * k} width={52} height={50 * k} rx={5} fill={C.down} fillOpacity={0.55} />
      <rect x={238} y={base - 100 * k} width={52} height={50 * k} rx={5} fill={C.up} fillOpacity={0.85} />
      <T x={264} y={base - 75 * k} size={10} weight={800} color="#fff">
        +50만
      </T>
      <T x={264} y={base - 100 * k - 10} size={11} weight={800}>
        100만 원
      </T>
      <T x={264} y={166} size={10.5} weight={700}>
        회복
      </T>
      <line x1={18} y1={base} x2={302} y2={base} stroke={C.line} strokeWidth={1.5} />
      <T x={160} y={188} size={10} color={C.ink2}>
        +50%만 오르면 75만 원 → 아직 원금이 아니에요
      </T>
    </Svg>
  );
}

function Diversification() {
  return (
    <Svg label="달걀을 한 바구니에 담으면 한 번에 다 깨지고, 나눠 담으면 일부만 깨진다">
      <Box x={8} y={8} w={146} h={184} fill={C.soft} stroke="none" r={12} />
      <Box x={166} y={8} w={146} h={184} fill={C.soft} stroke="none" r={12} />
      <T x={81} y={26} size={12} weight={800}>
        한 바구니에 몽땅
      </T>
      <Basket cx={74} y={96} w={66} h={34} rotate={-28} />
      {[
        [42, 152],
        [66, 160],
        [92, 156],
        [116, 150],
        [56, 138],
      ].map(([x, y], i) => (
        <Egg key={i} cx={x} cy={y} s={0.9} cracked />
      ))}
      <Cross x={128} y={60} s={1} color={C.down} />
      <T x={81} y={182} size={10} color={C.ink2}>
        떨어뜨리면 전부 깨짐
      </T>
      <T x={239} y={26} size={12} weight={800}>
        여러 바구니에 나눠
      </T>
      {[196, 239, 282].map((cx, i) => (
        <g key={cx}>
          {i === 0 ? (
            <g>
              <Basket cx={cx} y={110} w={36} h={20} rotate={-30} />
              <Egg cx={cx + 4} cy={150} s={0.75} cracked />
            </g>
          ) : (
            <g>
              <Basket cx={cx} y={100} w={36} h={22} />
              <Egg cx={cx - 7} cy={98} s={0.75} />
              <Egg cx={cx + 7} cy={100} s={0.75} />
            </g>
          )}
        </g>
      ))}
      <Check x={290} y={60} s={1} />
      <T x={239} y={182} size={10} color={C.ink2}>
        하나 떨어져도 나머진 무사
      </T>
    </Svg>
  );
}

function AvgPrice() {
  const y = (p) => 100 - (p - 9000) / 25;
  const path = smoothPath([
    [20, y(10200)],
    [60, y(10000)],
    [100, y(9300)],
    [140, y(8600)],
    [180, y(8000)],
    [220, y(8500)],
    [260, y(9200)],
    [300, y(9500)],
  ]);
  return (
    <Svg label="1만 원에 10주, 8천 원에 10주를 사면 평균단가는 9천 원">
      <path d={path} fill="none" stroke={C.ink2} strokeWidth={2.2} />
      <HLine x1={14} x2={306} y={y(9000)} color={C.accent} width={2} />
      <Pill x={262} y={y(9000) + 18} text="평균단가 9,000원" color={C.accentBg} size={10.5} />
      <circle cx={60} cy={y(10000)} r={7} fill={C.up} />
      <T x={60} y={y(10000) - 30} size={10.5} weight={800} color={C.upInk}>
        1차 매수
      </T>
      <T x={60} y={y(10000) - 15} size={10} color={C.ink2}>
        10주 × 10,000원
      </T>
      <circle cx={180} cy={y(8000)} r={7} fill={C.up} />
      <T x={104} y={y(8000) + 2} size={10.5} weight={800} color={C.upInk}>
        2차 매수 (물타기)
      </T>
      <T x={104} y={y(8000) + 17} size={10} color={C.ink2}>
        10주 × 8,000원
      </T>
      <circle cx={300} cy={y(9500)} r={4.5} fill={C.ink2} />
      <T x={300} y={y(9500) - 14} size={9.5} weight={700} anchor="end" color={C.ink2}>
        지금 9,500원 → 수익 중
      </T>
      <Box x={14} y={170} w={292} h={24} fill={C.soft} stroke="none" r={8} />
      <T x={160} y={182} size={10} weight={600} color={C.ink2}>
        (10만 + 8만) ÷ 20주 = 9,000원
      </T>
    </Svg>
  );
}

function StopLoss() {
  const buy = 104;
  const tp = 44;
  const sl = 140;
  const upPath = smoothPath([
    [26, buy],
    [60, 96],
    [90, 104],
    [130, 76],
    [160, 64],
    [196, tp],
  ]);
  const downPath = smoothPath([
    [26, buy],
    [56, 112],
    [80, 106],
    [118, 128],
    [150, sl],
  ]);
  return (
    <Svg label="미리 정한 익절 라인(+20%)에 닿으면 이익 확정, 손절 라인(−10%)에 닿으면 손실을 끊는다">
      <HLine x1={14} x2={226} y={tp} color={C.up} dashed={false} width={2} />
      <HLine x1={14} x2={226} y={buy} color={C.muted} />
      <HLine x1={14} x2={226} y={sl} color={C.down} dashed={false} width={2} />
      <path d={upPath} fill="none" stroke={C.up} strokeWidth={2.4} strokeLinecap="round" />
      <path d={downPath} fill="none" stroke={C.down} strokeWidth={2.4} strokeLinecap="round" strokeDasharray="6 4" />
      <circle cx={26} cy={buy} r={5} fill={C.ink2} />
      <T x={30} y={buy + 14} size={9.5} color={C.ink2} anchor="start">
        매수
      </T>
      <circle cx={196} cy={tp} r={6} fill={C.up} />
      <circle cx={150} cy={sl} r={6} fill={C.down} />
      <T x={236} y={tp - 8} size={11.5} weight={800} color={C.upInk} anchor="start">
        익절 라인
      </T>
      <T x={236} y={tp + 8} size={9.5} color={C.ink2} anchor="start">
        +20%면 팔기
      </T>
      <T x={236} y={buy} size={9.5} color={C.ink2} anchor="start">
        산 가격
      </T>
      <T x={236} y={sl - 8} size={11.5} weight={800} color={C.downInk} anchor="start">
        손절 라인
      </T>
      <T x={236} y={sl + 8} size={9.5} color={C.ink2} anchor="start">
        −10%면 팔기
      </T>
      <Box x={14} y={164} w={292} h={28} fill={C.soft} stroke="none" r={8} />
      <T x={160} y={178} size={10.5} weight={700}>
        사기 전에 미리 정하고, 닿으면 원칙대로!
      </T>
    </Svg>
  );
}

function Compound() {
  const X = (t) => 36 + (t / 30) * 250;
  const Y = (v) => 168 - (v / 800) * 150;
  const comp = Array.from({ length: 31 }, (_, t) => [X(t), Y(100 * 1.07 ** t)]);
  const simple = Array.from({ length: 31 }, (_, t) => [X(t), Y(100 + 7 * t)]);
  const area = `${linePath(comp)} L${X(30)},${Y(0)} L${X(0)},${Y(0)} Z`;
  return (
    <Svg label="연 7%로 30년 투자하면 단리는 310, 복리는 약 761로 커진다 (원금 100)">
      <path d={area} fill={C.accent} fillOpacity={0.1} />
      <path d={linePath(simple)} fill="none" stroke={C.muted} strokeWidth={2.2} strokeDasharray="5 4" />
      <path d={linePath(comp)} fill="none" stroke={C.accent} strokeWidth={2.8} />
      {[
        [10, 4],
        [20, 7],
        [30, 11],
      ].map(([t, r]) => (
        <circle key={t} cx={X(t)} cy={Y(100 * 1.07 ** t) - r - 2} r={r} fill={C.card} stroke={C.accent} strokeWidth={1.8} />
      ))}
      <line x1={X(0)} y1={Y(0)} x2={X(30)} y2={Y(0)} stroke={C.line} strokeWidth={1.5} />
      {[0, 10, 20, 30].map((t) => (
        <T key={t} x={X(t)} y={Y(0) + 12} size={9.5} color={C.ink2}>
          {t === 0 ? '시작' : `${t}년`}
        </T>
      ))}
      <T x={X(26)} y={Y(761) + 2} size={11} weight={800} color={C.accent} anchor="end">
        복리 761
      </T>
      <T x={X(30) - 4} y={Y(310) - 12} size={10.5} weight={700} color={C.ink2} anchor="end">
        단리 310
      </T>
      <T x={X(0)} y={Y(100) - 12} size={9.5} color={C.ink2} anchor="start">
        원금 100
      </T>
      <T x={160} y={194} size={9.5} color={C.muted}>
        연 7% 가정 · 눈덩이처럼 갈수록 빨리 커져요
      </T>
    </Svg>
  );
}

function Leverage() {
  const zero = 108;
  const k = 2.4;
  const groups = [
    { cx: 196, label: '주가 +10%', vals: [10, 20] },
    { cx: 272, label: '주가 −10%', vals: [-10, -20] },
  ];
  return (
    <Svg label="2배 레버리지는 주가 10% 변동에 내 돈 기준 20%씩 벌거나 잃는다">
      {/* 지렛대 */}
      <line x1={18} y1={96} x2={136} y2={136} stroke={C.ink2} strokeWidth={5} strokeLinecap="round" />
      <path d="M58,110 L44,140 L72,140 Z" fill={C.muted} />
      <line x1={22} y1={141} x2={136} y2={141} stroke={C.line} strokeWidth={2} />
      <rect x={14} y={58} width={46} height={34} rx={8} fill={C.accentSoft} stroke={C.accent} strokeWidth={1.8} transform="rotate(18.7 37 92)" />
      <T x={37} y={76} size={9.5} weight={800} color={C.accent}>
        200만
      </T>
      <rect x={110} y={110} width={28} height={22} rx={5} fill={C.gold} transform="rotate(18.7 124 132)" />
      <T x={104} y={158} size={9.5} weight={700} color={C.ink2}>
        내 돈 100만
      </T>
      <T x={76} y={176} size={10.5} weight={800}>
        빌린 돈으로 크게
      </T>
      <T x={76} y={192} size={9.5} color={C.ink2}>
        이익도 손실도 2배
      </T>
      {/* 막대 */}
      <line x1={156} y1={zero} x2={308} y2={zero} stroke={C.line} strokeWidth={1.5} />
      {groups.map((g) => (
        <g key={g.label}>
          {g.vals.map((v, i) => {
            const h = Math.abs(v) * k;
            const x = g.cx - 26 + i * 28;
            const up = v > 0;
            return (
              <g key={i}>
                <rect x={x} y={up ? zero - h : zero} width={24} height={h} rx={3} fill={up ? C.up : C.down} fillOpacity={i === 0 ? 0.5 : 1} />
                <T x={x + 12} y={up ? zero - h - 9 : zero + h + 10} size={10} weight={800} color={up ? C.upInk : C.downInk}>
                  {up ? '+' : '−'}
                  {Math.abs(v)}%
                </T>
                <T x={x + 12} y={up ? zero + 10 : zero - 10} size={9} color={C.ink2}>
                  {i === 0 ? '1배' : '2배'}
                </T>
              </g>
            );
          })}
          <T x={g.cx} y={182} size={10.5} weight={800}>
            {g.label}
          </T>
        </g>
      ))}
      <T x={232} y={18} size={10} color={C.muted}>
        내 돈 기준 수익률
      </T>
    </Svg>
  );
}

export const strategyIllustrations = {
  'return-rate': ReturnRate,
  diversification: Diversification,
  'avg-price': AvgPrice,
  'stop-loss': StopLoss,
  compound: Compound,
  leverage: Leverage,
};
