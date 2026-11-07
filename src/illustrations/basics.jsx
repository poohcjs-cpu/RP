import { C } from './colors';
import { Svg, T, Pill, Arrow, Coin, Person, Building, Box, Share, Check, Cross, Pizza } from './kit';

function Stock() {
  return (
    <Svg label="회사를 피자에 비유하면 주식은 피자 한 조각">
      <Pizza
        cx={100}
        cy={96}
        r={66}
        slices={8}
        pop={{ 1: 16 }}
        colors={{ 1: { fill: C.accentSoft, stroke: C.accent } }}
      />
      <T x={100} y={182} size={12} color={C.ink2} weight={700}>
        회사 = 피자 한 판 (8조각)
      </T>
      <Pill x={196} y={30} text="주식 1주 = 한 조각" color={C.accentBg} />
      <Arrow x1={184} y1={72} x2={228} y2={96} color={C.accent} />
      <Person x={262} y={160} s={1.4} color={C.accent} />
      <T x={262} y={176} size={12} weight={700}>
        나 = 주주
      </T>
      <T x={262} y={192} size={10.5} color={C.ink2}>
        회사의 1/8 주인
      </T>
    </Svg>
  );
}

function Shareholder() {
  const people = [
    { x: 46, c: C.accent },
    { x: 108, c: C.aqua },
    { x: 212, c: C.orange },
    { x: 274, c: C.gold },
  ];
  return (
    <Svg label="주주는 회사의 공동 주인으로 투표권과 배당을 받을 권리가 있다">
      {people.map((p) => (
        <line key={p.x} x1={p.x} y1={140} x2={160} y2={112} stroke={C.line} strokeWidth={1.5} strokeDasharray="4 4" />
      ))}
      <Pill x={160} y={26} text="회사" color={C.accentBg} />
      <Building x={135} y={40} w={50} h={72} color={C.accent} />
      {people.map((p) => (
        <Person key={p.x} x={p.x} y={186} s={0.95} color={p.c} />
      ))}
      {/* 투표함 */}
      <g>
        <rect x={28} y={46} width={44} height={32} rx={4} fill={C.card} stroke={C.ink2} strokeWidth={1.6} />
        <rect x={42} y={45} width={16} height={3} rx={1.5} fill={C.ink2} />
        <rect x={44} y={30} width={12} height={16} rx={1.5} fill={C.card} stroke={C.accent} strokeWidth={1.6} />
        <path d="M47,38 l2.5,2.5 l4,-5" stroke={C.accent} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <T x={50} y={92} size={11} weight={700}>
          투표권
        </T>
      </g>
      {/* 배당 */}
      <g>
        <Coin cx={260} cy={56} r={11} />
        <Coin cx={280} cy={48} r={11} />
        <T x={270} y={92} size={11} weight={700}>
          배당
        </T>
      </g>
    </Svg>
  );
}

function Listing() {
  return (
    <Svg label="비상장 회사가 심사를 통과해 거래소에 상장되면 누구나 거래할 수 있다">
      {/* 동네 가게 */}
      <path d="M20,96 L60,68 L100,96 Z" fill={C.aqua} />
      <rect x={26} y={96} width={68} height={54} rx={3} fill={C.aquaSoft} stroke={C.aqua} strokeWidth={1.6} />
      <rect x={52} y={118} width={16} height={32} rx={2} fill={C.aqua} />
      <T x={60} y={166} size={12} weight={700}>
        비상장 회사
      </T>
      <T x={60} y={183} size={10} color={C.ink2}>
        아는 사람끼리만 거래
      </T>
      {/* 심사 */}
      <Pill x={138} y={96} text="상장 심사" color={C.goldSoft} textColor={C.goldInk} size={10.5} />
      <Arrow x1={110} y1={118} x2={166} y2={118} color={C.ink2} />
      <Check x={138} y={140} s={0.9} />
      {/* 거래소 */}
      <path d="M176,72 L240,40 L304,72 Z" fill={C.accent} />
      <T x={240} y={61} size={11} color="#fff" weight={800}>
        거래소
      </T>
      {[190, 213, 236, 259, 282].map((x) => (
        <rect key={x} x={x} y={76} width={10} height={58} rx={2} fill={C.accentSoft} stroke={C.accent} strokeWidth={1.2} />
      ))}
      <rect x={178} y={134} width={124} height={8} rx={2} fill={C.accent} />
      {[192, 218, 262, 288].map((x, i) => (
        <Person key={x} x={x} y={196} s={0.55} color={[C.orange, C.aqua, C.gold, C.ink2][i]} face={false} />
      ))}
      <T x={240} y={157} size={10} color={C.ink2}>
        누구나 사고팔 수 있어요
      </T>
    </Svg>
  );
}

function KospiKosdaq() {
  return (
    <Svg label="코스피는 대기업 중심, 코스닥은 기술·성장 기업 중심 시장">
      <Box x={8} y={12} w={148} h={178} fill={C.accentSoft} stroke="none" r={14} />
      <Box x={164} y={12} w={148} h={178} fill={C.aquaSoft} stroke="none" r={14} />
      <Pill x={82} y={32} text="코스피 KOSPI" color={C.accentBg} />
      <Pill x={238} y={32} text="코스닥 KOSDAQ" color={C.aqua} />
      {/* 큰 빌딩들 */}
      <Building x={26} y={70} w={34} h={80} color={C.accent} />
      <Building x={64} y={52} w={40} h={98} color={C.accent} />
      <Building x={108} y={82} w={32} h={68} color={C.accent} />
      <line x1={20} y1={150} x2={146} y2={150} stroke={C.accent} strokeWidth={2} />
      <T x={82} y={168} size={11.5} weight={700}>
        대표 대기업 중심
      </T>
      {/* 성장 계단 + 새싹 */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={186 + i * 26} y={130 - i * 18} width={20} height={20 + i * 18} rx={3} fill={C.aqua} fillOpacity={0.45 + i * 0.15} />
      ))}
      <path d="M274,76 Q274,64 274,58" stroke={C.aquaInk} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M274,64 Q262,54 256,60 Q264,70 274,64 Z" fill={C.aqua} />
      <path d="M274,60 Q286,48 294,54 Q286,66 274,60 Z" fill={C.aqua} />
      <Arrow x1={184} y1={104} x2={238} y2={66} color={C.aquaInk} dashed />
      <line x1={176} y1={150} x2={302} y2={150} stroke={C.aqua} strokeWidth={2} />
      <T x={238} y={168} size={11.5} weight={700}>
        기술 · 성장 기업 중심
      </T>
    </Svg>
  );
}

function IndexIll() {
  const vals = [3, -1, 2, 1, -2, 4, 1, -1, 2, 0.5, -0.5, 3];
  return (
    <Svg label="여러 종목의 등락을 평균 낸 숫자가 주가지수">
      {vals.map((v, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 14 + col * 38;
        const y = 30 + row * 38;
        const up = v > 0;
        return (
          <g key={i}>
            <rect x={x} y={y} width={34} height={30} rx={6} fill={up ? C.upSoft : C.downSoft} />
            <T x={x + 17} y={y + 15} size={10} weight={800} color={up ? C.upInk : C.downInk}>
              {up ? '▲' : '▼'}
              {Math.abs(v)}%
            </T>
          </g>
        );
      })}
      <T x={89} y={158} size={11} color={C.ink2} weight={600}>
        종목마다 제각각
      </T>
      <Arrow x1={170} y1={92} x2={204} y2={92} color={C.ink2} />
      <T x={187} y={76} size={9.5} color={C.muted}>
        평균
      </T>
      {/* 온도계 */}
      <rect x={224} y={30} width={22} height={118} rx={11} fill={C.soft} stroke={C.line} strokeWidth={1.5} />
      <rect x={230} y={72} width={10} height={86} rx={5} fill={C.up} />
      <circle cx={235} cy={160} r={17} fill={C.up} />
      {[48, 64, 80, 96, 112, 128].map((y) => (
        <line key={y} x1={246} y1={y} x2={252} y2={y} stroke={C.line} strokeWidth={1.5} />
      ))}
      <T x={286} y={72} size={16} weight={800} color={C.upInk}>
        +1.2%
      </T>
      <T x={286} y={92} size={10} color={C.ink2}>
        오늘 지수
      </T>
      <T x={270} y={190} size={11} weight={700}>
        지수 = 시장 체온계
      </T>
    </Svg>
  );
}

function MarketCap() {
  const row = (y, name, price, n, cap, barW) => (
    <g>
      <T x={22} y={y + 22} size={13} weight={800}>
        {name}
      </T>
      {/* 가격표 */}
      <path
        d={`M46,${y + 10} h52 a4,4 0 0 1 4,4 v16 a4,4 0 0 1 -4,4 h-52 l-8,-12 z`}
        fill={C.goldSoft}
        stroke={C.gold}
        strokeWidth={1.5}
      />
      <circle cx={47} cy={y + 22} r={2.5} fill={C.gold} />
      <T x={74} y={y + 22} size={10.5} weight={700} color={C.goldInk}>
        {price}
      </T>
      <T x={116} y={y + 22} size={16} color={C.muted}>
        ×
      </T>
      <g>
        {Array.from({ length: n }, (_, i) => (
          <rect
            key={i}
            x={130 + (i % 6) * 11}
            y={y + 6 + Math.floor(i / 6) * 11}
            width={8}
            height={8}
            rx={1.5}
            fill={C.accent}
            fillOpacity={0.75}
          />
        ))}
      </g>
      <T x={208} y={y + 22} size={16} color={C.muted}>
        =
      </T>
      <rect x={220} y={y + 10} width={barW} height={24} rx={4} fill={C.accentBg} />
      <T x={barW > 60 ? 220 + barW / 2 : 226 + barW} y={y + 22} size={11} weight={800} color={barW > 60 ? '#fff' : C.ink} anchor={barW > 60 ? 'middle' : 'start'}>
        {cap}
      </T>
    </g>
  );
  return (
    <Svg label="시가총액은 주가 곱하기 주식 수. 주가가 낮아도 회사가 더 클 수 있다">
      <T x={74} y={16} size={10} color={C.muted}>
        주가
      </T>
      <T x={163} y={16} size={10} color={C.muted}>
        주식 수
      </T>
      <T x={260} y={16} size={10} color={C.muted}>
        시가총액
      </T>
      {row(28, 'A사', '1만 원', 18, '1조 원', 84)}
      <T x={163} y={77} size={9.5} color={C.ink2}>
        1억 주
      </T>
      {row(100, 'B사', '10만 원', 1, '5천억', 42)}
      <T x={163} y={146} size={9.5} color={C.ink2}>
        500만 주
      </T>
      <Box x={14} y={160} w={292} h={32} fill={C.soft} stroke="none" r={10} />
      <T x={160} y={176} size={11} weight={700}>
        주가가 10배 비싼 B사가 오히려 더 작은 회사!
      </T>
    </Svg>
  );
}

function BallotIcon({ x, y }) {
  return (
    <g>
      <rect x={x - 11} y={y - 6} width={22} height={16} rx={3} fill={C.card} stroke={C.ink2} strokeWidth={1.4} />
      <rect x={x - 5} y={y - 14} width={10} height={12} rx={1.5} fill={C.card} stroke={C.ink2} strokeWidth={1.4} />
    </g>
  );
}

function CommonPreferred() {
  const card = (x, title, sub, color, soft, rows) => (
    <g>
      <rect x={x} y={20} width={140} height={164} rx={12} fill={C.card} stroke={color} strokeWidth={1.8} />
      <path d={`M${x},32 a12,12 0 0 1 12,-12 h116 a12,12 0 0 1 12,12 v22 h-140 z`} fill={soft} />
      <T x={x + 70} y={37} size={14} weight={800} color={color}>
        {title}
      </T>
      <T x={x + 70} y={66} size={9.5} color={C.muted}>
        {sub}
      </T>
      {rows.map((r, i) => (
        <g key={i}>
          {r.icon(x + 26, 100 + i * 44)}
          <T x={x + 48} y={100 + i * 44} size={11.5} weight={700} anchor="start">
            {r.text}
          </T>
          {r.ok ? <Check x={x + 120} y={100 + i * 44} s={0.85} /> : <Cross x={x + 120} y={100 + i * 44} s={0.85} />}
        </g>
      ))}
    </g>
  );
  return (
    <Svg label="보통주는 투표권과 배당, 우선주는 투표권 대신 배당을 더 받는다">
      {card(12, '보통주', '종목 이름 그대로 (○○전자)', C.accent, C.accentSoft, [
        { icon: (x, y) => <BallotIcon x={x} y={y} />, text: '투표권', ok: true },
        { icon: (x, y) => <Coin cx={x} cy={y} r={9} />, text: '배당 기본', ok: true },
      ])}
      {card(168, '우선주', '이름 뒤에 "우" (○○전자우)', C.goldInk, C.goldSoft, [
        { icon: (x, y) => <BallotIcon x={x} y={y} />, text: '투표권', ok: false },
        {
          icon: (x, y) => (
            <g>
              <Coin cx={x - 4} cy={y} r={8} />
              <Coin cx={x + 6} cy={y - 4} r={8} />
            </g>
          ),
          text: '배당 더 많이',
          ok: true,
        },
      ])}
    </Svg>
  );
}

function Etf() {
  const items = [
    { x: 196, y: 70, c: C.accent, t: 'A' },
    { x: 222, y: 62, c: C.aqua, t: 'B' },
    { x: 248, y: 66, c: C.orange, t: 'C' },
    { x: 272, y: 72, c: C.gold, t: 'D' },
    { x: 210, y: 84, c: C.down, t: 'E' },
    { x: 236, y: 82, c: C.up, t: 'F' },
    { x: 260, y: 86, c: C.ink2, t: 'G' },
  ];
  return (
    <Svg label="ETF는 여러 종목을 한 바구니에 담아 한 번에 사는 상품">
      {[
        [26, 40, C.accent, 'A'],
        [62, 40, C.aqua, 'B'],
        [98, 40, C.orange, 'C'],
        [26, 78, C.gold, 'D'],
        [62, 78, C.down, 'E'],
        [98, 78, C.up, 'F'],
      ].map(([x, y, c, t]) => (
        <g key={t}>
          <rect x={x} y={y} width={28} height={30} rx={5} fill={c} fillOpacity={0.9} />
          <T x={x + 14} y={y + 15} size={12} weight={800} color="#fff">
            {t}
          </T>
        </g>
      ))}
      <T x={76} y={130} size={11} weight={700}>
        하나씩 사려면?
      </T>
      <T x={76} y={146} size={10} color={C.ink2}>
        시간도 돈도 많이 들어요
      </T>
      <Arrow x1={140} y1={92} x2={172} y2={92} color={C.ink2} />
      {/* 바구니 */}
      {items.map((it) => (
        <g key={it.t}>
          <circle cx={it.x} cy={it.y} r={12} fill={it.c} />
          <T x={it.x} y={it.y} size={10} weight={800} color="#fff">
            {it.t}
          </T>
        </g>
      ))}
      <path d="M182,92 L292,92 L278,148 L196,148 Z" fill={C.goldSoft} stroke={C.gold} strokeWidth={2.2} strokeLinejoin="round" />
      <line x1={186} y1={110} x2={288} y2={110} stroke={C.gold} strokeWidth={1.4} />
      <line x1={190} y1={129} x2={284} y2={129} stroke={C.gold} strokeWidth={1.4} />
      <Pill x={237} y={30} text="ETF 1주" color={C.accentBg} size={12} />
      <T x={237} y={168} size={11.5} weight={700}>
        한 번에 여러 종목!
      </T>
      <T x={237} y={185} size={10} color={C.ink2}>
        주식처럼 실시간 거래
      </T>
    </Svg>
  );
}

function Dividend() {
  return (
    <Svg label="회사가 번 이익을 주식 수에 비례해 주주에게 나눠주는 것이 배당">
      {/* 돈나무 */}
      <rect x={76} y={110} width={16} height={64} rx={4} fill={C.orange} fillOpacity={0.8} />
      <circle cx={84} cy={78} r={56} fill={C.aqua} fillOpacity={0.85} />
      <circle cx={52} cy={92} r={30} fill={C.aqua} />
      <circle cx={118} cy={92} r={28} fill={C.aqua} />
      {[
        [60, 60],
        [98, 50],
        [84, 88],
        [118, 80],
        [48, 98],
      ].map(([x, y]) => (
        <Coin key={`${x}-${y}`} cx={x} cy={y} r={10} />
      ))}
      <line x1={30} y1={174} x2={140} y2={174} stroke={C.line} strokeWidth={2} />
      <T x={84} y={190} size={11} weight={700}>
        회사의 이익
      </T>
      <Arrow x1={150} y1={84} x2={190} y2={84} color={C.goldInk} />
      <T x={170} y={68} size={9.5} color={C.ink2}>
        나눠주기
      </T>
      {/* 주주 */}
      <Coin cx={226} cy={90} r={9} />
      <Person x={226} y={162} s={1} color={C.accent} />
      <Pill x={226} y={180} text="10주" color={C.soft} textColor={C.ink} size={10} />
      <Coin cx={274} cy={92} r={9} />
      <Coin cx={288} cy={82} r={9} />
      <Coin cx={274} cy={72} r={9} />
      <Person x={282} y={162} s={1} color={C.orange} />
      <Pill x={282} y={180} text="30주" color={C.soft} textColor={C.ink} size={10} />
      <T x={254} y={40} size={10} color={C.ink2}>
        가진 주식 수만큼
      </T>
    </Svg>
  );
}

export const basicsIllustrations = {
  stock: Stock,
  shareholder: Shareholder,
  listing: Listing,
  'kospi-kosdaq': KospiKosdaq,
  index: IndexIll,
  'market-cap': MarketCap,
  'common-preferred': CommonPreferred,
  etf: Etf,
  dividend: Dividend,
};
