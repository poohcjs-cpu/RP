import { C, linePath } from './colors';
import { Svg, T, Pill, Arrow, Coin, Person, Building, Box, Share, Check, Cross, Pizza } from './kit';

function Disclosure() {
  const people = [
    [208, 82, C.accent],
    [268, 82, C.aqua],
    [208, 150, C.orange],
    [268, 150, C.gold],
  ];
  return (
    <Svg label="공시는 회사의 중요한 소식을 모든 투자자에게 동시에 알리는 공식 게시판">
      <rect x={16} y={22} width={124} height={130} rx={10} fill={C.soft} stroke={C.line} strokeWidth={1.5} />
      <circle cx={78} cy={30} r={5} fill={C.up} />
      <rect x={32} y={44} width={92} height={94} rx={6} fill={C.card} stroke={C.line} strokeWidth={1.2} />
      <T x={78} y={60} size={11} weight={800} color={C.accent}>
        [공시] 실적 발표
      </T>
      {[78, 92, 106, 120].map((y, i) => (
        <line key={y} x1={42} x2={i === 3 ? 92 : 114} y1={y} y2={y} stroke={C.line} strokeWidth={3} strokeLinecap="round" />
      ))}
      <T x={78} y={168} size={11} weight={800}>
        DART 전자공시
      </T>
      <T x={78} y={184} size={9.5} color={C.ink2}>
        누구나 무료로 확인
      </T>
      {people.map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <Arrow x1={146} y1={88} x2={x - 18} y2={y - 22} color={C.line} width={1.5} head={6} />
          <Person x={x} y={y} s={0.75} color={c} />
        </g>
      ))}
      <Pill x={238} y={178} text="모두에게 동시에" color={C.accentBg} size={10.5} />
    </Svg>
  );
}

function RightsOffering() {
  const mine = { fill: C.accentSoft, stroke: C.accent };
  const fresh = { fill: C.orangeSoft, stroke: C.orange };
  return (
    <Svg label="유상증자로 새 주식이 생기면 회사에 돈이 들어오지만 내 지분 비중은 작아진다">
      <Pizza cx={72} cy={92} r={52} slices={8} colors={{ 0: mine }} toppings={false} />
      <T x={72} y={164} size={11} weight={800}>
        내 지분 1/8
      </T>
      <T x={72} y={180} size={10} color={C.ink2}>
        12.5%
      </T>
      <Pill x={160} y={56} text="새 주식 발행" color={C.orange} size={10} />
      <Arrow x1={136} y1={84} x2={182} y2={84} color={C.ink2} />
      <Coin cx={160} cy={106} r={10} />
      <T x={160} y={126} size={9.5} color={C.ink2}>
        회사엔 돈 유입
      </T>
      <Pizza cx={248} cy={92} r={52} slices={10} colors={{ 0: mine, 8: fresh, 9: fresh }} toppings={false} />
      <T x={248} y={164} size={11} weight={800}>
        내 지분 1/10
      </T>
      <T x={248} y={180} size={10} color={C.ink2}>
        10% (희석)
      </T>
      <T x={160} y={194} size={9.5} color={C.muted}>
        보라 = 내 조각 · 주황 = 새로 판 조각
      </T>
    </Svg>
  );
}

function BonusIssue() {
  const mine = { fill: C.accentSoft, stroke: C.accent };
  return (
    <Svg label="무상증자는 피자 크기는 그대로 두고 조각만 더 잘게 자르는 것">
      <Pizza cx={72} cy={88} r={54} slices={4} colors={{ 0: mine }} toppings={false} />
      <T x={72} y={160} size={11} weight={800}>
        1주 × 10,000원
      </T>
      <Arrow x1={138} y1={88} x2={182} y2={88} color={C.ink2} />
      <T x={160} y={72} size={9.5} color={C.ink2}>
        1주당 1주 무상
      </T>
      <Pizza cx={248} cy={88} r={54} slices={8} colors={{ 0: mine, 1: mine }} toppings={false} />
      <T x={248} y={160} size={11} weight={800}>
        2주 × 5,000원
      </T>
      <Box x={60} y={172} w={200} h={24} fill={C.soft} stroke="none" r={8} />
      <T x={160} y={184} size={10.5} weight={700}>
        조각 수만 늘고 내 몫(25%)은 그대로
      </T>
    </Svg>
  );
}

function StockSplit() {
  return (
    <Svg label="액면분할: 100만 원짜리 1주가 10만 원짜리 10주로 바뀌어도 총액은 같다">
      <Share x={26} y={34} w={72} h={94} color={C.accent} />
      <T x={62} y={110} size={11} weight={800} color={C.accent}>
        1주
      </T>
      <T x={62} y={146} size={11.5} weight={800}>
        100만 원
      </T>
      <Arrow x1={112} y1={82} x2={150} y2={82} color={C.ink2} />
      <T x={131} y={66} size={10} weight={700} color={C.ink2}>
        1:10
      </T>
      {Array.from({ length: 10 }, (_, i) => (
        <Share key={i} x={162 + (i % 5) * 28} y={46 + Math.floor(i / 5) * 40} w={22} h={30} color={C.accent} />
      ))}
      <T x={232} y={146} size={11.5} weight={800}>
        10주 × 10만 원
      </T>
      <Pill x={160} y={178} text="총액 100만 원 그대로 · 사기만 쉬워짐" color={C.accentBg} size={10.5} />
    </Svg>
  );
}

function Flame({ x, y }) {
  return (
    <g>
      <path d={`M${x},${y - 34} C${x + 22},${y - 14} ${x + 20},${y + 4} ${x},${y + 8} C${x - 20},${y + 4} ${x - 22},${y - 12} ${x - 6},${y - 24} C${x - 6},${y - 14} ${x - 2},${y - 10} ${x},${y - 34} Z`} fill={C.orange} />
      <path d={`M${x},${y - 14} C${x + 10},${y - 4} ${x + 8},${y + 4} ${x},${y + 6} C${x - 8},${y + 4} ${x - 9},${y - 2} ${x},${y - 14} Z`} fill={C.gold} />
    </g>
  );
}

function Buyback() {
  return (
    <Svg label="회사가 자기 주식을 사들여 소각하면 남은 주식 1주의 몫이 커진다">
      {Array.from({ length: 10 }, (_, i) => {
        const burned = i >= 8;
        return <Share key={i} x={14 + i * 30} y={16} w={22} h={28} color={burned ? C.orange : C.accent} />;
      })}
      <T x={130} y={58} size={10} color={C.ink2}>
        주식 10주
      </T>
      <Arrow x1={268} y1={50} x2={240} y2={86} color={C.orange} width={1.8} head={6} />
      <Building x={196} y={86} w={44} h={52} color={C.accent} />
      <T x={218} y={150} size={9.5} color={C.ink2}>
        회사가 매입
      </T>
      <Arrow x1={246} y1={112} x2={266} y2={112} color={C.orange} width={1.8} head={6} />
      <Flame x={288} y={122} />
      <T x={288} y={150} size={10.5} weight={800} color={C.orange}>
        소각
      </T>
      <Box x={14} y={82} w={164} h={70} fill={C.soft} stroke="none" r={12} />
      <T x={96} y={100} size={11} weight={700}>
        이익 1억 원을 나누면
      </T>
      <T x={96} y={120} size={11} color={C.ink2}>
        10주일 때 1주당 1,000만
      </T>
      <T x={96} y={138} size={11.5} weight={800} color={C.accent}>
        8주일 때 1주당 1,250만 ↑
      </T>
      <Pill x={160} y={180} text="남은 주식 1주의 몫이 커져요" color={C.accentBg} size={10.5} />
    </Svg>
  );
}

function ExDividend() {
  const days = [
    { x: 14, d: '수', t: '여기까지 사면', ok: true, c: C.aqua },
    { x: 118, d: '목 · 배당락일', t: '이날부터 사면', ok: false, c: C.orange },
    { x: 222, d: '금 · 기준일', t: '주주명부 확정', c: C.accent },
  ];
  return (
    <Svg label="배당기준일 2영업일 전까지 사야 배당을 받고, 배당락일에는 배당만큼 주가가 낮아져 시작한다">
      {days.map((d, i) => (
        <g key={d.d}>
          <rect x={d.x} y={10} width={84} height={84} rx={10} fill={C.card} stroke={d.c} strokeWidth={2} />
          <path d={`M${d.x},22 a12,12 0 0 1 12,-12 h60 a12,12 0 0 1 12,12 v8 h-84 z`} fill={d.c} />
          <T x={d.x + 42} y={21} size={10.5} weight={800} color="#fff">
            {d.d}
          </T>
          <T x={d.x + 42} y={48} size={10} color={C.ink2}>
            {d.t}
          </T>
          {i < 2 ? (
            <g>
              {d.ok ? <Check x={d.x + 24} y={72} s={0.8} /> : <Cross x={d.x + 24} y={72} s={0.8} color={C.orange} />}
              <T x={d.x + 38} y={72} size={10.5} weight={800} anchor="start">
                {d.ok ? '배당 O' : '배당 X'}
              </T>
            </g>
          ) : (
            <g>
              <rect x={d.x + 30} y={60} width={24} height={26} rx={3} fill={C.accentSoft} stroke={C.accent} strokeWidth={1.4} />
              <line x1={d.x + 35} y1={68} x2={d.x + 49} y2={68} stroke={C.accent} strokeWidth={1.4} />
              <line x1={d.x + 35} y1={75} x2={d.x + 46} y2={75} stroke={C.accent} strokeWidth={1.4} />
            </g>
          )}
        </g>
      ))}
      {/* 주가 */}
      <path d={linePath([[20, 132], [56, 128], [98, 130]])} fill="none" stroke={C.ink2} strokeWidth={2.4} strokeLinecap="round" />
      <path d={linePath([[130, 154], [170, 150], [210, 156], [300, 152]])} fill="none" stroke={C.ink2} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={98} y1={130} x2={130} y2={154} stroke={C.ink2} strokeWidth={1.5} strokeDasharray="3 3" />
      <Arrow x1={114} y1={118} x2={114} y2={146} color={C.downInk} width={1.8} head={6} />
      <T x={176} y={132} size={10} weight={700} color={C.downInk}>
        배당금만큼 낮아진 채 출발
      </T>
      <T x={160} y={184} size={9.5} color={C.muted}>
        결제가 D+2라서 기준일보다 2영업일 먼저 사야 해요
      </T>
    </Svg>
  );
}

export const eventsIllustrations = {
  disclosure: Disclosure,
  'rights-offering': RightsOffering,
  'bonus-issue': BonusIssue,
  'stock-split': StockSplit,
  buyback: Buyback,
  'ex-dividend': ExDividend,
};
