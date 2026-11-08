import { C, linePath } from './colors';
import { Svg, T, Pill, Arrow, Coin, Person, Box, Share, Check, Candle, HLine } from './kit';

function BuySell() {
  return (
    <Svg label="매수는 사는 것, 매도는 파는 것. 가격이 맞으면 주식과 돈이 교환된다">
      <Pill x={160} y={22} text="10,000원에 합의!" color={C.accentBg} />
      <Pill x={58} y={70} text="살게요!" color={C.upSoft} textColor={C.upInk} />
      <Pill x={262} y={70} text="팔게요!" color={C.downSoft} textColor={C.downInk} />
      <Person x={58} y={150} s={1.35} color={C.up} />
      <Person x={262} y={150} s={1.35} color={C.down} />
      <Pill x={58} y={170} text="매수 · 사는 사람" color={C.up} size={10.5} />
      <Pill x={262} y={170} text="매도 · 파는 사람" color={C.down} size={10.5} />
      {/* 주식: 파는 사람 → 사는 사람 */}
      <Arrow x1={220} y1={100} x2={104} y2={100} color={C.ink2} />
      <Share x={150} y={74} w={20} h={24} color={C.accent} />
      <T x={196} y={88} size={10} color={C.ink2}>
        주식
      </T>
      {/* 돈: 사는 사람 → 파는 사람 */}
      <Arrow x1={104} y1={130} x2={220} y2={130} color={C.goldInk} />
      <Coin cx={160} cy={130} r={10} />
      <T x={124} y={144} size={10} color={C.ink2}>
        돈
      </T>
      <T x={160} y={192} size={10.5} color={C.ink2}>
        누군가 사면, 반드시 누군가는 팔아요
      </T>
    </Svg>
  );
}

const ASKS = [
  [70500, 320],
  [70400, 540],
  [70300, 210],
  [70200, 760],
  [70100, 430],
];
const BIDS = [
  [70000, 610],
  [69900, 380],
  [69800, 820],
  [69700, 260],
  [69600, 470],
];

function OrderBook() {
  const rowH = 15;
  const top = 26;
  const maxQ = 820;
  return (
    <Svg label="호가창: 위쪽은 팔려는 주문(매도호가), 아래쪽은 사려는 주문(매수호가)">
      <T x={70} y={14} size={10.5} weight={800} color={C.downInk}>
        매도 잔량 (팔려는 주문)
      </T>
      {ASKS.map(([p, q], i) => {
        const y = top + i * rowH;
        const w = (q / maxQ) * 90;
        return (
          <g key={p}>
            <rect x={120 - w} y={y + 2} width={w} height={rowH - 4} rx={2} fill={C.down} fillOpacity={0.75} />
            <T x={116 - w} y={y + rowH / 2} size={9} color={C.ink2} anchor="end">
              {q}
            </T>
            <rect x={124} y={y + 1} width={72} height={rowH - 2} rx={2} fill={C.downSoft} />
            <T x={160} y={y + rowH / 2} size={10} weight={i === 4 ? 800 : 600} color={C.downInk}>
              {p.toLocaleString()}
            </T>
          </g>
        );
      })}
      {BIDS.map(([p, q], i) => {
        const y = top + (i + 5) * rowH + 4;
        const w = (q / maxQ) * 90;
        return (
          <g key={p}>
            <rect x={124} y={y + 1} width={72} height={rowH - 2} rx={2} fill={C.upSoft} />
            <T x={160} y={y + rowH / 2} size={10} weight={i === 0 ? 800 : 600} color={C.upInk}>
              {p.toLocaleString()}
            </T>
            <rect x={200} y={y + 2} width={w} height={rowH - 4} rx={2} fill={C.up} fillOpacity={0.75} />
            <T x={204 + w} y={y + rowH / 2} size={9} color={C.ink2} anchor="start">
              {q}
            </T>
          </g>
        );
      })}
      <line x1={124} y1={top + 5 * rowH + 2} x2={196} y2={top + 5 * rowH + 2} stroke={C.ink2} strokeWidth={1} />
      {/* 설명 */}
      <Arrow x1={238} y1={top + 4.5 * rowH - 18} x2={200} y2={top + 4.5 * rowH} color={C.downInk} width={1.5} head={6} />
      <T x={262} y={top + 4.5 * rowH - 28} size={9.5} weight={700} color={C.downInk}>
        가장 싸게 팔려는 값
      </T>
      <Arrow x1={82} y1={top + 5.5 * rowH + 22} x2={120} y2={top + 5.5 * rowH + 4} color={C.upInk} width={1.5} head={6} />
      <T x={62} y={top + 5.5 * rowH + 32} size={9.5} weight={700} color={C.upInk}>
        가장 비싸게 사려는 값
      </T>
      <T x={250} y={192} size={10.5} weight={800} color={C.upInk}>
        매수 잔량 (사려는 주문)
      </T>
    </Svg>
  );
}

function Bubble({ x, y, w, text, tail = 'left' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={28} rx={14} fill={C.card} stroke={C.line} strokeWidth={1.5} />
      {tail === 'left' && <path d={`M${x + 4},${y + 18} l-10,8 l14,-2 z`} fill={C.card} stroke={C.line} strokeWidth={1.5} strokeLinejoin="round" />}
      <rect x={x + 2} y={y + 14} width={14} height={12} fill={C.card} />
      <T x={x + w / 2} y={y + 14} size={11} weight={700}>
        {text}
      </T>
    </g>
  );
}

function MarketLimit() {
  return (
    <Svg label="지정가는 정한 가격까지 기다리고, 시장가는 지금 있는 가격으로 즉시 체결">
      <Box x={8} y={8} w={304} h={88} fill={C.soft} stroke="none" r={12} />
      <Box x={8} y={104} w={304} h={88} fill={C.soft} stroke="none" r={12} />
      {/* 지정가 */}
      <Pill x={44} y={24} text="지정가" color={C.accentBg} />
      <Person x={44} y={90} s={0.9} color={C.accent} />
      <Bubble x={84} y={36} w={124} text="9,900원에만 살래요" />
      <circle cx={250} cy={46} r={16} fill={C.card} stroke={C.ink2} strokeWidth={2} />
      <line x1={250} y1={46} x2={250} y2={36} stroke={C.ink2} strokeWidth={2} strokeLinecap="round" />
      <line x1={250} y1={46} x2={258} y2={50} stroke={C.ink2} strokeWidth={2} strokeLinecap="round" />
      <T x={250} y={78} size={10} weight={700} color={C.ink2}>
        올 때까지 대기
      </T>
      <T x={86} y={80} size={9.5} color={C.muted} anchor="start">
        가격 보장 O · 체결 보장 X
      </T>
      {/* 시장가 */}
      <Pill x={44} y={120} text="시장가" color={C.orange} />
      <Person x={44} y={186} s={0.9} color={C.orange} />
      <Bubble x={84} y={132} w={124} text="지금 바로 주세요!" />
      <path d="M254,126 L240,150 L250,150 L244,170 L262,142 L251,142 L258,126 Z" fill={C.gold} stroke={C.goldInk} strokeWidth={1} strokeLinejoin="round" />
      <T x={250} y={180} size={10} weight={700} color={C.ink2}>
        즉시 체결
      </T>
      <T x={86} y={176} size={9.5} color={C.muted} anchor="start">
        체결 보장 O · 가격 보장 X
      </T>
    </Svg>
  );
}

function Execution() {
  return (
    <Svg label="사는 가격과 파는 가격이 맞으면 퍼즐처럼 맞물려 체결된다">
      <path d="M20,20 H120 V35 a10,10 0 0 1 0,20 V70 H20 Z" fill={C.upSoft} stroke={C.up} strokeWidth={2} strokeLinejoin="round" />
      <T x={68} y={36} size={13} weight={800} color={C.upInk}>
        사요
      </T>
      <T x={68} y={55} size={11} weight={600}>
        10,000원
      </T>
      <path d="M200,20 H300 V70 H200 V55 a10,10 0 0 0 0,-20 Z" fill={C.downSoft} stroke={C.down} strokeWidth={2} strokeLinejoin="round" />
      <T x={254} y={36} size={13} weight={800} color={C.downInk}>
        팔아요
      </T>
      <T x={254} y={55} size={11} weight={600}>
        10,000원
      </T>
      <Arrow x1={136} y1={45} x2={156} y2={45} color={C.ink2} />
      <Arrow x1={186} y1={45} x2={166} y2={45} color={C.ink2} />
      <T x={160} y={90} size={10.5} color={C.ink2}>
        가격이 딱 맞으면…
      </T>
      <path d="M60,108 H160 V123 a10,10 0 0 1 0,20 V158 H60 Z" fill={C.upSoft} stroke={C.up} strokeWidth={2} strokeLinejoin="round" />
      <path d="M160,108 H260 V158 H160 V143 a10,10 0 0 0 0,-20 Z" fill={C.downSoft} stroke={C.down} strokeWidth={2} strokeLinejoin="round" />
      <T x={108} y={133} size={11} weight={700} color={C.upInk}>
        매수
      </T>
      <T x={214} y={133} size={11} weight={700} color={C.downInk}>
        매도
      </T>
      {[
        [160, 100, 160, 92],
        [146, 103, 140, 96],
        [174, 103, 180, 96],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      <Pill x={160} y={180} text="체결!" color={C.accentBg} size={12} />
      <Check x={200} y={180} s={0.85} />
    </Svg>
  );
}

function Settlement() {
  const days = [
    { x: 16, day: '월', d: 'D', title: '매도 체결', desc: '주문이 성사됨', c: C.accent },
    { x: 124, day: '화', d: 'D+1', title: '처리 중', desc: '돈과 주식 정산', c: C.muted },
    { x: 232, day: '수', d: 'D+2', title: '현금 입금', desc: '이제 출금 가능!', c: C.aqua },
  ];
  return (
    <Svg label="주식을 판 날(D)로부터 2영업일 뒤(D+2)에 돈이 들어와 출금할 수 있다">
      {days.map((d, i) => (
        <g key={d.d}>
          <rect x={d.x} y={22} width={72} height={96} rx={10} fill={C.card} stroke={d.c} strokeWidth={2} />
          <path d={`M${d.x},34 a12,12 0 0 1 12,-12 h48 a12,12 0 0 1 12,12 v8 h-72 z`} fill={d.c} />
          <T x={d.x + 36} y={33} size={11} weight={800} color="#fff">
            {d.day}요일
          </T>
          <T x={d.x + 36} y={72} size={20} weight={800} color={d.c}>
            {d.d}
          </T>
          {i === 0 && <Share x={d.x + 52} y={88} w={14} h={18} color={C.accent} />}
          {i === 2 && <Coin cx={d.x + 58} cy={98} r={9} />}
          {i === 1 && (
            <g>
              {[0, 1, 2].map((k) => (
                <circle key={k} cx={d.x + 26 + k * 10} cy={100} r={2.6} fill={C.muted} />
              ))}
            </g>
          )}
          <T x={d.x + 36} y={140} size={12} weight={800}>
            {d.title}
          </T>
          <T x={d.x + 36} y={157} size={10} color={C.ink2}>
            {d.desc}
          </T>
        </g>
      ))}
      <Arrow x1={92} y1={70} x2={120} y2={70} color={C.line} width={2.5} />
      <Arrow x1={200} y1={70} x2={228} y2={70} color={C.line} width={2.5} />
      <Box x={16} y={170} w={288} h={24} fill={C.soft} stroke="none" r={8} />
      <T x={160} y={182} size={10.5} weight={600} color={C.ink2}>
        주말 · 공휴일은 빼고 세요 (금 → 다음 주 화)
      </T>
    </Svg>
  );
}

function PriceLimit() {
  const y = (p) => 100 - ((p - 10000) / 3000) * 70;
  const path = linePath([
    [130, y(10000)],
    [146, y(10400)],
    [160, y(10100)],
    [176, y(11000)],
    [192, y(10700)],
    [208, y(11800)],
    [222, y(11500)],
    [238, y(12600)],
    [252, y(13000)],
    [300, y(13000)],
  ]);
  return (
    <Svg label="전날 종가 기준 위로 30%(상한가), 아래로 30%(하한가)까지만 움직일 수 있다">
      <rect x={124} y={y(13000)} width={184} height={y(7000) - y(13000)} fill={C.soft} />
      <HLine x1={124} x2={308} y={y(13000)} color={C.up} dashed={false} width={2.5} />
      <HLine x1={124} x2={308} y={y(7000)} color={C.down} dashed={false} width={2.5} />
      <HLine x1={124} x2={308} y={y(10000)} color={C.muted} />
      <T x={12} y={y(13000) - 8} size={12} weight={800} color={C.upInk} anchor="start">
        상한가 +30%
      </T>
      <T x={12} y={y(13000) + 9} size={10.5} color={C.ink2} anchor="start">
        13,000원
      </T>
      <T x={12} y={y(10000) - 8} size={11} weight={700} color={C.ink2} anchor="start">
        전날 종가
      </T>
      <T x={12} y={y(10000) + 9} size={10.5} color={C.ink2} anchor="start">
        10,000원
      </T>
      <T x={12} y={y(7000) - 8} size={12} weight={800} color={C.downInk} anchor="start">
        하한가 −30%
      </T>
      <T x={12} y={y(7000) + 9} size={10.5} color={C.ink2} anchor="start">
        7,000원
      </T>
      <path d={path} fill="none" stroke={C.up} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={252} cy={y(13000)} r={4.5} fill={C.up} />
      <T x={276} y={y(13000) + 16} size={9.5} weight={700} color={C.upInk}>
        더는 못 올라요
      </T>
      <T x={216} y={y(7000) - 12} size={9.5} color={C.muted}>
        오늘 움직일 수 있는 범위
      </T>
    </Svg>
  );
}

function Ohlc() {
  const pts = [
    [24, 110],
    [40, 96],
    [56, 72],
    [72, 40],
    [90, 74],
    [108, 118],
    [128, 160],
    [146, 134],
    [164, 104],
    [186, 80],
  ];
  return (
    <Svg label="하루 주가 흐름에서 시가, 고가, 저가, 종가 네 값을 뽑아 캔들 하나로 그린다">
      <path d={linePath(pts)} fill="none" stroke={C.ink2} strokeWidth={2} strokeLinejoin="round" />
      {[
        [24, 110, '시가', 0, 16, C.ink],
        [72, 40, '고가', 0, -13, C.upInk],
        [128, 160, '저가', 0, 15, C.downInk],
        [186, 80, '종가', 0, -14, C.ink],
      ].map(([x, yy, label, dx, dy, col]) => (
        <g key={label}>
          <circle cx={x} cy={yy} r={5} fill={C.card} stroke={col} strokeWidth={2.5} />
          <T x={x + dx} y={yy + dy} size={11} weight={800} color={col}>
            {label}
          </T>
        </g>
      ))}
      <T x={104} y={192} size={10.5} color={C.ink2}>
        09:00 → 15:30 하루 동안의 가격
      </T>
      <Arrow x1={204} y1={100} x2={234} y2={100} color={C.ink2} />
      <Candle x={258} open={110} close={80} high={40} low={160} w={26} />
      {[
        [40, '고가'],
        [80, '종가'],
        [110, '시가'],
        [160, '저가'],
      ].map(([yy, label]) => (
        <g key={label}>
          <line x1={274} y1={yy} x2={282} y2={yy} stroke={C.muted} strokeWidth={1.2} />
          <T x={286} y={yy} size={10.5} weight={700} anchor="start">
            {label}
          </T>
        </g>
      ))}
      <T x={262} y={182} size={10.5} weight={700}>
        캔들 하나로 요약
      </T>
    </Svg>
  );
}

function TradingHours() {
  return (
    <Svg label="08:30~09:00과 15:20~15:30은 동시호가, 09:00~15:20은 실시간 체결">
      <Pill x={52} y={34} text="시가 결정" color={C.goldSoft} textColor={C.goldInk} size={10} />
      <Arrow x1={88} y1={46} x2={88} y2={70} color={C.goldInk} width={1.5} head={6} />
      <Pill x={276} y={34} text="종가 결정" color={C.goldSoft} textColor={C.goldInk} size={10} />
      <Arrow x1={300} y1={46} x2={300} y2={70} color={C.goldInk} width={1.5} head={6} />
      <rect x={16} y={76} width={70} height={46} rx={8} fill={C.goldSoft} stroke={C.gold} strokeWidth={1.5} />
      <rect x={90} y={76} width={150} height={46} rx={8} fill={C.accentSoft} stroke={C.accent} strokeWidth={1.5} />
      <rect x={244} y={76} width={60} height={46} rx={8} fill={C.goldSoft} stroke={C.gold} strokeWidth={1.5} />
      <T x={51} y={92} size={10.5} weight={800} color={C.goldInk}>
        동시호가
      </T>
      <T x={51} y={108} size={9} color={C.ink2}>
        주문 모으기
      </T>
      <T x={165} y={92} size={11} weight={800} color={C.accent}>
        정규장 (접속매매)
      </T>
      <T x={165} y={108} size={9.5} color={C.ink2}>
        주문 들어오는 대로 실시간 체결
      </T>
      <T x={274} y={92} size={10.5} weight={800} color={C.goldInk}>
        동시호가
      </T>
      <T x={274} y={108} size={9} color={C.ink2}>
        주문 모으기
      </T>
      {[
        [16, '08:30', 'start'],
        [88, '09:00', 'middle'],
        [242, '15:20', 'middle'],
        [304, '15:30', 'end'],
      ].map(([x, t, a]) => (
        <T key={t} x={x} y={134} size={10} weight={700} color={C.ink2} anchor={a}>
          {t}
        </T>
      ))}
      <Box x={16} y={152} w={288} h={40} fill={C.soft} stroke="none" r={10} />
      <T x={160} y={166} size={12.5} weight={800}>
        정규장 오전 9:00 ~ 오후 3:30
      </T>
      <T x={160} y={182} size={9.5} color={C.muted}>
        그림 속 칸 크기는 실제 시간 비율과 달라요
      </T>
    </Svg>
  );
}

function Volume() {
  const prices = [120, 116, 118, 114, 117, 115, 113, 82, 74, 78, 70, 72];
  const vols = [18, 14, 16, 12, 15, 13, 14, 62, 44, 30, 34, 26];
  const x = (i) => 32 + i * 24;
  return (
    <Svg label="거래량이 갑자기 늘면서 주가가 크게 움직인 모습">
      <T x={14} y={20} size={10.5} weight={700} color={C.ink2} anchor="start">
        주가
      </T>
      <path d={linePath(prices.map((p, i) => [x(i), p - 40]))} fill="none" stroke={C.ink2} strokeWidth={2} strokeLinejoin="round" />
      {prices.map((p, i) => (
        <circle key={i} cx={x(i)} cy={p - 40} r={2.5} fill={C.ink2} />
      ))}
      <line x1={14} y1={112} x2={306} y2={112} stroke={C.line} strokeWidth={1.5} />
      <T x={14} y={124} size={10.5} weight={700} color={C.ink2} anchor="start">
        거래량
      </T>
      {vols.map((v, i) => {
        const up = i === 0 ? true : prices[i] <= prices[i - 1];
        return <rect key={i} x={x(i) - 8} y={186 - v} width={16} height={v} rx={2} fill={up ? C.up : C.down} fillOpacity={i === 7 ? 1 : 0.55} />;
      })}
      <line x1={14} y1={186} x2={306} y2={186} stroke={C.line} strokeWidth={1.5} />
      <Pill x={x(7)} y={112} text="거래량 급증!" color={C.accentBg} size={10} />
      <T x={306} y={20} size={9.5} weight={700} color={C.upInk} anchor="end">
        관심 폭발 → 크게 상승
      </T>
    </Svg>
  );
}

export const tradingIllustrations = {
  'buy-sell': BuySell,
  'order-book': OrderBook,
  'market-limit': MarketLimit,
  execution: Execution,
  settlement: Settlement,
  'price-limit': PriceLimit,
  ohlc: Ohlc,
  'trading-hours': TradingHours,
  volume: Volume,
};
