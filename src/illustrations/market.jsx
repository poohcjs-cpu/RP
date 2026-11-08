import { C, linePath } from './colors';
import { Svg, T, Pill, Arrow, Building, Box, Share, Check, HLine, Coin } from './kit';

function BullBear() {
  return (
    <Svg label="황소는 뿔을 위로 치켜올려 강세장, 곰은 앞발을 아래로 내려찍어 약세장">
      {/* 황소 */}
      <path d="M52,84 Q30,74 28,44" stroke={C.gold} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M100,84 Q122,74 124,44" stroke={C.gold} strokeWidth={8} fill="none" strokeLinecap="round" />
      <ellipse cx={42} cy={96} rx={12} ry={7} fill={C.up} transform="rotate(-20 42 96)" />
      <ellipse cx={110} cy={96} rx={12} ry={7} fill={C.up} transform="rotate(20 110 96)" />
      <ellipse cx={76} cy={104} rx={32} ry={34} fill={C.up} />
      <ellipse cx={76} cy={126} rx={22} ry={13} fill={C.upSoft} />
      <circle cx={68} cy={126} r={3} fill={C.up} />
      <circle cx={84} cy={126} r={3} fill={C.up} />
      <circle cx={64} cy={98} r={3.5} fill="#fff" />
      <circle cx={88} cy={98} r={3.5} fill="#fff" />
      <Arrow x1={138} y1={150} x2={146} y2={42} color={C.up} width={4} head={12} />
      <Pill x={76} y={164} text="강세장 · Bull" color={C.up} size={11.5} />
      <T x={76} y={186} size={10} color={C.ink2}>
        뿔을 아래 → 위로 치켜올림
      </T>
      {/* 곰 */}
      <circle cx={222} cy={74} r={12} fill={C.down} />
      <circle cx={274} cy={74} r={12} fill={C.down} />
      <circle cx={222} cy={74} r={6} fill={C.downSoft} />
      <circle cx={274} cy={74} r={6} fill={C.downSoft} />
      <circle cx={248} cy={104} r={34} fill={C.down} />
      <ellipse cx={248} cy={120} rx={16} ry={12} fill={C.downSoft} />
      <ellipse cx={248} cy={114} rx={5.5} ry={4} fill={C.ink} />
      <circle cx={236} cy={98} r={3.5} fill="#fff" />
      <circle cx={260} cy={98} r={3.5} fill="#fff" />
      <Arrow x1={182} y1={42} x2={174} y2={150} color={C.down} width={4} head={12} />
      <Pill x={248} y={164} text="약세장 · Bear" color={C.down} size={11.5} />
      <T x={248} y={186} size={10} color={C.ink2}>
        앞발을 위 → 아래로 내려찍음
      </T>
    </Svg>
  );
}

function Volatility() {
  const calm = Array.from({ length: 41 }, (_, i) => [20 + i * 7, 52 + Math.sin(i * 0.8) * 5 + Math.sin(i * 2.1) * 2]);
  const wild = Array.from({ length: 41 }, (_, i) => [20 + i * 7, 158 + Math.sin(i * 0.7) * 17 + Math.sin(i * 1.9) * 11 + Math.cos(i * 3.3) * 4]);
  return (
    <Svg label="변동성이 작으면 잔잔하게, 크면 크게 출렁인다">
      <Box x={8} y={8} w={304} h={86} fill={C.soft} stroke="none" r={12} />
      <rect x={20} y={43} width={280} height={18} fill={C.aqua} fillOpacity={0.15} />
      <path d={linePath(calm)} fill="none" stroke={C.aquaInk} strokeWidth={2.2} strokeLinejoin="round" />
      <T x={20} y={22} size={11.5} weight={800} anchor="start" color={C.aquaInk}>
        변동성 작음
      </T>
      <T x={300} y={22} size={10} color={C.ink2} anchor="end">
        잔잔한 호수
      </T>
      <Box x={8} y={102} w={304} h={90} fill={C.soft} stroke="none" r={12} />
      <rect x={20} y={126} width={280} height={64} fill={C.orange} fillOpacity={0.12} />
      <path d={linePath(wild)} fill="none" stroke={C.orange} strokeWidth={2.2} strokeLinejoin="round" />
      <T x={20} y={118} size={11.5} weight={800} anchor="start" color={C.orange}>
        변동성 큼
      </T>
      <T x={300} y={118} size={10} color={C.ink2} anchor="end">
        파도치는 바다
      </T>
    </Svg>
  );
}

function PauseIcon({ x, y, c = C.gold }) {
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill={c} />
      <rect x={x - 4} y={y - 5} width={3} height={10} rx={1} fill="#fff" />
      <rect x={x + 1} y={y - 5} width={3} height={10} rx={1} fill="#fff" />
    </g>
  );
}

function CircuitBreaker() {
  const lv = { 0: 34, 8: 86, 15: 128, 20: 164 };
  const path = linePath([
    [16, lv[0]],
    [40, 44],
    [58, 52],
    [76, 70],
    [96, lv[8]],
    [124, lv[8]],
    [140, 104],
    [160, lv[15]],
    [186, lv[15]],
    [204, lv[20]],
  ]);
  const rows = [
    { y: lv[8], t: '1단계 (−8%)', d: '20분간 거래 멈춤', c: C.gold },
    { y: lv[15], t: '2단계 (−15%)', d: '20분간 거래 멈춤', c: C.orange },
    { y: lv[20], t: '3단계 (−20%)', d: '그날 장 종료', c: C.down },
  ];
  return (
    <Svg label="지수가 8%, 15%, 20% 떨어지면 단계별로 거래를 멈추는 서킷브레이커">
      <HLine x1={14} x2={210} y={lv[0]} color={C.muted} />
      <T x={16} y={20} size={10} color={C.ink2} anchor="start" weight={600}>
        전날 지수 (0%)
      </T>
      {rows.map((r) => (
        <g key={r.t}>
          <HLine x1={14} x2={210} y={r.y} color={r.c} dashed width={1.5} />
          <T x={220} y={r.y - 8} size={11} weight={800} anchor="start" color={C.ink}>
            {r.t}
          </T>
          <T x={220} y={r.y + 8} size={9.5} anchor="start" color={C.ink2}>
            {r.d}
          </T>
        </g>
      ))}
      <path d={path} fill="none" stroke={C.down} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
      <PauseIcon x={110} y={lv[8] - 16} c={C.gold} />
      <PauseIcon x={173} y={lv[15] - 16} c={C.orange} />
      <rect x={196} y={lv[20] - 8} width={16} height={16} rx={3} fill={C.down} />
      <T x={16} y={190} size={10} color={C.muted} anchor="start">
        공포를 식히는 비상 브레이크
      </T>
    </Svg>
  );
}

function Sidecar() {
  const base = 104;
  const upper = 58;
  const lower = 150;
  const pts = [
    [24, base],
    [44, 98],
    [62, 106],
    [82, 92],
    [100, 96],
    [118, 80],
    [134, 72],
    [150, upper - 2],
    [160, 50],
    [176, 52],
  ];
  return (
    <Svg label="선물 가격이 5% 넘게 움직이면 프로그램 매매만 5분 멈추는 사이드카">
      <T x={16} y={16} size={10} weight={700} color={C.ink2} anchor="start">
        코스피200 선물 가격
      </T>
      <HLine x1={14} x2={196} y={upper} color={C.up} />
      <HLine x1={14} x2={196} y={base} color={C.muted} />
      <HLine x1={14} x2={196} y={lower} color={C.down} />
      <T x={16} y={upper - 9} size={9.5} weight={700} color={C.upInk} anchor="start">
        +5%
      </T>
      <T x={16} y={lower + 10} size={9.5} weight={700} color={C.downInk} anchor="start">
        −5%
      </T>
      <path d={linePath(pts)} fill="none" stroke={C.ink2} strokeWidth={2.4} strokeLinejoin="round" />
      <circle cx={151} cy={upper} r={5} fill={C.accentBg} />
      <Pill x={128} y={30} text="1분 지속 → 발동" color={C.accentBg} size={10} />
      {/* 로봇 */}
      <line x1={262} y1={68} x2={262} y2={80} stroke={C.accent} strokeWidth={2} />
      <circle cx={262} cy={65} r={4} fill={C.accent} />
      <rect x={236} y={80} width={52} height={42} rx={9} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
      <circle cx={252} cy={98} r={4.5} fill={C.accent} />
      <circle cx={272} cy={98} r={4.5} fill={C.accent} />
      <line x1={252} y1={112} x2={272} y2={112} stroke={C.accent} strokeWidth={2} strokeLinecap="round" />
      <rect x={244} y={124} width={36} height={22} rx={5} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
      <circle cx={292} cy={78} r={14} fill={C.orange} />
      <T x={292} y={78} size={9.5} weight={800} color="#fff">
        5분
      </T>
      <T x={262} y={160} size={10.5} weight={800}>
        프로그램 매매
      </T>
      <T x={262} y={175} size={10} weight={700} color={C.orange}>
        잠깐 멈춤!
      </T>
      <T x={104} y={186} size={9.5} color={C.ink2}>
        사람이 하는 일반 거래는 계속돼요
      </T>
    </Svg>
  );
}

function ShortSelling() {
  const cards = [
    { x: 8, n: '①', t: '주식 빌리기', d: '증권사 · 기관에서' },
    { x: 114, n: '②', t: '지금 팔기', d: '2만 원에 매도' },
    { x: 220, n: '③', t: '사서 갚기', d: '1만 원에 매수 → 반납' },
  ];
  return (
    <Svg label="주식을 빌려 2만 원에 팔고, 1만 원으로 떨어졌을 때 다시 사서 갚으면 1만 원 이익">
      {cards.map((c, i) => (
        <g key={c.n}>
          <rect x={c.x} y={10} width={92} height={92} rx={12} fill={C.soft} />
          <T x={c.x + 16} y={26} size={13} weight={800} color={C.accent}>
            {c.n}
          </T>
          {i === 0 && (
            <g>
              <Share x={c.x + 36} y={28} w={20} h={26} color={C.accent} />
              <Arrow x1={c.x + 16} y1={48} x2={c.x + 32} y2={44} color={C.ink2} width={1.5} head={5} />
            </g>
          )}
          {i === 1 && (
            <g>
              <Share x={c.x + 22} y={28} w={20} h={26} color={C.accent} />
              <Arrow x1={c.x + 46} y1={41} x2={c.x + 58} y2={41} color={C.ink2} width={1.5} head={5} />
              <Coin cx={c.x + 70} cy={36} r={8} />
              <Coin cx={c.x + 70} cy={50} r={8} />
            </g>
          )}
          {i === 2 && (
            <g>
              <Coin cx={c.x + 26} cy={42} r={8} />
              <Arrow x1={c.x + 38} y1={41} x2={c.x + 50} y2={41} color={C.ink2} width={1.5} head={5} />
              <Share x={c.x + 56} y={28} w={20} h={26} color={C.accent} />
            </g>
          )}
          <T x={c.x + 46} y={74} size={11.5} weight={800}>
            {c.t}
          </T>
          <T x={c.x + 46} y={90} size={9} color={C.ink2}>
            {c.d}
          </T>
        </g>
      ))}
      <path
        d={linePath([
          [40, 126],
          [80, 122],
          [120, 134],
          [160, 140],
          [200, 156],
          [240, 160],
          [266, 172],
        ])}
        fill="none"
        stroke={C.down}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <circle cx={80} cy={122} r={5} fill={C.card} stroke={C.downInk} strokeWidth={2.5} />
      <T x={80} y={140} size={10} weight={700}>
        2만 원에 팔고
      </T>
      <circle cx={266} cy={172} r={5} fill={C.card} stroke={C.downInk} strokeWidth={2.5} />
      <T x={266} y={190} size={10} weight={700}>
        1만 원에 사서 갚음
      </T>
      <Pill x={176} y={124} text="차익 1만 원" color={C.accentBg} size={10.5} />
    </Svg>
  );
}

function Globe({ cx, cy, r }) {
  return (
    <g fill="none" stroke={C.down} strokeWidth={1.8}>
      <circle cx={cx} cy={cy} r={r} fill={C.downSoft} />
      <ellipse cx={cx} cy={cy} rx={r * 0.45} ry={r} />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
      <path d={`M${cx - r * 0.86},${cy - r * 0.5} H${cx + r * 0.86} M${cx - r * 0.86},${cy + r * 0.5} H${cx + r * 0.86}`} />
    </g>
  );
}

function Ant({ cx, cy }) {
  return (
    <g>
      {[-8, 0, 8].map((d) => (
        <path key={d} d={`M${cx + d},${cy} l${d * 0.3 - 4},10 M${cx + d},${cy} l${d * 0.3 + 4},10`} stroke={C.ink2} strokeWidth={1.6} strokeLinecap="round" />
      ))}
      <circle cx={cx - 13} cy={cy - 2} r={6} fill={C.orange} />
      <circle cx={cx} cy={cy} r={5} fill={C.orange} />
      <ellipse cx={cx + 14} cy={cy + 1} rx={9} ry={7} fill={C.orange} />
      <path d={`M${cx - 15},${cy - 7} q-3,-8 -8,-9 M${cx - 11},${cy - 7} q0,-8 3,-10`} stroke={C.ink2} strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Investors() {
  const base = 128;
  const cols = [
    { x: 58, name: '외국인', v: 1200, icon: <Globe cx={58} cy={24} r={15} /> },
    { x: 160, name: '기관', v: -500, icon: <Building x={145} y={6} w={30} h={34} color={C.accent} /> },
    { x: 262, name: '개인 (개미)', v: -700, icon: <Ant cx={262} cy={26} /> },
  ];
  const k = 40 / 1200;
  return (
    <Svg label="외국인이 순매수하면 다른 투자자 그룹은 그만큼 순매도. 합계는 0에 가깝다">
      {cols.map((c) => {
        const h = Math.abs(c.v) * k;
        const up = c.v > 0;
        return (
          <g key={c.name}>
            {c.icon}
            <T x={c.x} y={52} size={11.5} weight={800}>
              {c.name}
            </T>
            <rect x={c.x - 18} y={up ? base - h : base} width={36} height={h} rx={4} fill={up ? C.up : C.down} />
            <T x={c.x} y={up ? base - h - 10 : base + h + 11} size={10.5} weight={800} color={up ? C.upInk : C.downInk}>
              {up ? '+' : '−'}
              {Math.abs(c.v).toLocaleString()}억
            </T>
            <T x={c.x} y={up ? base + 12 : base - 10} size={9.5} color={C.ink2}>
              {up ? '순매수' : '순매도'}
            </T>
          </g>
        );
      })}
      <line x1={14} y1={base} x2={306} y2={base} stroke={C.line} strokeWidth={1.5} />
      <Box x={20} y={172} w={280} h={24} fill={C.soft} stroke="none" r={8} />
      <T x={160} y={184} size={10} weight={600} color={C.ink2}>
        누가 사면 누가 팔아요 → 세 그룹을 합치면 ≈ 0
      </T>
    </Svg>
  );
}

function InterestRate() {
  return (
    <Svg label="시소처럼 금리가 올라가면 주가는 내려가는 경향">
      <line x1={30} y1={110} x2={290} y2={160} stroke={C.ink2} strokeWidth={6} strokeLinecap="round" />
      <path d="M160,135 L138,176 L182,176 Z" fill={C.muted} />
      <line x1={110} y1={177} x2={210} y2={177} stroke={C.line} strokeWidth={2} />
      <g transform="rotate(10.9 70 117)">
        <rect x={40} y={68} width={64} height={44} rx={8} fill={C.goldSoft} stroke={C.gold} strokeWidth={2} />
        <T x={72} y={84} size={13} weight={800} color={C.goldInk}>
          금리
        </T>
        <T x={72} y={100} size={10} color={C.ink2}>
          예금 매력 ↑
        </T>
      </g>
      <g transform="rotate(10.9 250 152)">
        <rect x={218} y={104} width={64} height={44} rx={8} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
        <T x={250} y={120} size={13} weight={800} color={C.accent}>
          주가
        </T>
        <T x={250} y={136} size={10} color={C.ink2}>
          매력 ↓
        </T>
      </g>
      <Arrow x1={20} y1={90} x2={20} y2={40} color={C.goldInk} width={3} head={9} />
      <Arrow x1={302} y1={64} x2={302} y2={114} color={C.accent} width={3} head={9} />
      <T x={160} y={22} size={11} weight={700}>
        금리 ↑ → 주식 대신 예금 · 채권으로
      </T>
      <T x={160} y={194} size={9.5} color={C.muted}>
        반대로 금리가 내리면 주식으로 돈이 몰리기 쉬워요
      </T>
    </Svg>
  );
}

function starPath(cx, cy, R, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
}

function BlueChip() {
  const chip = (cx, cy, r) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.down} />
      <circle cx={cx} cy={cy} r={r * 0.78} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="7 7" />
      <circle cx={cx} cy={cy} r={r * 0.52} fill={C.downSoft} />
      <path d={starPath(cx, cy, r * 0.36, r * 0.15)} fill={C.down} />
    </g>
  );
  return (
    <Svg label="포커에서 가장 비싼 파란 칩에서 유래한 블루칩, 탄탄한 대표 기업의 주식">
      <ellipse cx={86} cy={168} rx={50} ry={12} fill={C.down} fillOpacity={0.5} />
      <ellipse cx={86} cy={160} rx={50} ry={12} fill={C.down} fillOpacity={0.75} />
      {chip(86, 96, 54)}
      <T x={86} y={188} size={10} color={C.ink2}>
        포커의 가장 비싼 칩
      </T>
      {[
        ['실적이 꾸준히 좋음', 46],
        ['업계 대표 기업', 86],
        ['재무가 탄탄함', 126],
      ].map(([t, y]) => (
        <g key={t}>
          <Check x={172} y={y} s={0.95} />
          <T x={188} y={y} size={12} weight={700} anchor="start">
            {t}
          </T>
        </g>
      ))}
      <T x={236} y={166} size={10} color={C.muted}>
        그래도 &quot;절대 안전&quot;은 없어요
      </T>
    </Svg>
  );
}

function ThemeStock() {
  const tiles = [24, 100, 176, 252];
  return (
    <Svg label="하나의 이슈에 엮인 종목들이 함께 오르고 함께 내리는 테마주">
      <rect x={104} y={10} width={112} height={36} rx={18} fill={C.accentBg} />
      <T x={160} y={28} size={13} weight={800} color="#fff">
        뉴스: &quot;AI 열풍!&quot;
      </T>
      {tiles.map((x, i) => (
        <g key={x}>
          <line x1={160} y1={46} x2={x + 22} y2={82} stroke={C.line} strokeWidth={1.5} strokeDasharray="4 3" />
          <rect x={x} y={82} width={44 + 0} height={66} rx={8} fill={C.soft} />
          <T x={x + 22} y={94} size={9.5} weight={700} color={C.ink2}>
            {['A사', 'B사', 'C사', 'D사'][i]}
          </T>
          <path d={linePath([[x + 6, 136], [x + 14, 126], [x + 22, 108 - i * 2]])} fill="none" stroke={C.up} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={linePath([[x + 22, 108 - i * 2], [x + 30, 124], [x + 38, 138]])} fill="none" stroke={C.down} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      ))}
      <T x={160} y={168} size={11.5} weight={800}>
        우르르 함께 오르고, 우르르 함께 내려요
      </T>
      <T x={160} y={186} size={9.5} color={C.ink2}>
        실적보다 기대감으로 움직여 급등락이 심해요
      </T>
    </Svg>
  );
}

export const marketIllustrations = {
  'bull-bear': BullBear,
  volatility: Volatility,
  'circuit-breaker': CircuitBreaker,
  sidecar: Sidecar,
  'short-selling': ShortSelling,
  investors: Investors,
  'interest-rate': InterestRate,
  'blue-chip': BlueChip,
  'theme-stock': ThemeStock,
};
