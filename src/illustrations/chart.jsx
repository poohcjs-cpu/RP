import { C, linePath, smoothPath, seeded } from './colors';
import { Svg, T, Pill, Arrow, Candle, HLine, Box } from './kit';

function CandleIll() {
  return (
    <Svg label="양봉은 시가보다 종가가 높은 빨간 캔들, 음봉은 시가보다 종가가 낮은 파란 캔들">
      {/* 양봉 */}
      <Candle x={96} open={136} close={58} high={26} low={168} w={36} />
      <Arrow x1={96} y1={124} x2={96} y2={72} color="#fff" width={2.5} />
      {[
        [26, '고가'],
        [58, '종가'],
        [136, '시가'],
        [168, '저가'],
      ].map(([y, t]) => (
        <g key={t}>
          <line x1={58} y1={y} x2={72} y2={y} stroke={C.muted} strokeWidth={1.2} />
          <T x={52} y={y} size={11} weight={700} anchor="end">
            {t}
          </T>
        </g>
      ))}
      {/* 음봉 */}
      <Candle x={224} open={58} close={136} high={26} low={168} w={36} />
      <Arrow x1={224} y1={70} x2={224} y2={122} color="#fff" width={2.5} />
      {[
        [26, '고가'],
        [58, '시가'],
        [136, '종가'],
        [168, '저가'],
      ].map(([y, t]) => (
        <g key={t}>
          <line x1={248} y1={y} x2={262} y2={y} stroke={C.muted} strokeWidth={1.2} />
          <T x={268} y={y} size={11} weight={700} anchor="start">
            {t}
          </T>
        </g>
      ))}
      {/* 가운데 설명 */}
      <T x={160} y={42} size={10.5} weight={700} color={C.ink2}>
        꼬리
      </T>
      <line x1={146} y1={42} x2={102} y2={42} stroke={C.line} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={174} y1={42} x2={218} y2={42} stroke={C.line} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={160} y={97} size={10.5} weight={700} color={C.ink2}>
        몸통
      </T>
      <line x1={146} y1={97} x2={116} y2={97} stroke={C.line} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={174} y1={97} x2={204} y2={97} stroke={C.line} strokeWidth={1.2} strokeDasharray="3 3" />
      <Pill x={96} y={188} text="양봉 · 올라서 끝남" color={C.up} size={10.5} />
      <Pill x={224} y={188} text="음봉 · 내려서 끝남" color={C.down} size={10.5} />
    </Svg>
  );
}

function Wick() {
  return (
    <Svg label="긴 윗꼬리는 위에서 밀린 흔적, 긴 아랫꼬리는 아래에서 받친 흔적, 도지는 팽팽한 균형">
      {/* 윗꼬리 */}
      <Candle x={56} open={118} close={132} high={24} low={142} w={22} />
      <Arrow x1={82} y1={36} x2={82} y2={96} color={C.downInk} width={1.8} head={6} />
      <T x={56} y={164} size={12} weight={800}>
        긴 윗꼬리
      </T>
      <T x={56} y={181} size={9.5} color={C.ink2}>
        올랐다가 밀려 내려옴
      </T>
      {/* 아랫꼬리 */}
      <Candle x={160} open={72} close={56} high={48} low={146} w={22} />
      <Arrow x1={186} y1={138} x2={186} y2={80} color={C.upInk} width={1.8} head={6} />
      <T x={160} y={164} size={12} weight={800}>
        긴 아랫꼬리
      </T>
      <T x={160} y={181} size={9.5} color={C.ink2}>
        떨어졌다가 받쳐 올라옴
      </T>
      {/* 도지 */}
      <Candle x={264} open={95} close={95} high={44} low={146} w={26} color={C.ink2} />
      <Arrow x1={242} y1={76} x2={226} y2={76} color={C.muted} width={1.6} head={5} />
      <Arrow x1={286} y1={76} x2={302} y2={76} color={C.muted} width={1.6} head={5} />
      <T x={264} y={164} size={12} weight={800}>
        도지 (십자)
      </T>
      <T x={264} y={181} size={9.5} color={C.ink2}>
        사자 · 팔자 팽팽
      </T>
    </Svg>
  );
}

function makeSeries(seed, n, start, drift, vol) {
  const rnd = seeded(seed);
  const out = [];
  let p = start;
  for (let i = 0; i < n; i++) {
    const o = p;
    const c = o + drift(i) + (rnd() - 0.5) * vol;
    const h = Math.max(o, c) + rnd() * vol * 0.45;
    const l = Math.min(o, c) - rnd() * vol * 0.45;
    out.push({ o, c, h, l });
    p = c;
  }
  return out;
}

function ma(series, n) {
  return series.map((_, i) => {
    if (i < n - 1) return null;
    let s = 0;
    for (let k = i - n + 1; k <= i; k++) s += series[k].c;
    return s / n;
  });
}

function MovingAverage() {
  const all = makeSeries(7, 50, 100, (i) => (i < 30 ? 0.6 : i < 40 ? -0.9 : 0.8), 4);
  const m5 = ma(all, 5);
  const m20 = ma(all, 20);
  const view = all.slice(24);
  const v5 = m5.slice(24);
  const v20 = m20.slice(24);
  const prices = view.flatMap((d) => [d.h, d.l]).concat(v20, v5);
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const y = (p) => 30 + ((max - p) / (max - min)) * 130;
  const x = (i) => 18 + i * 11.2;
  return (
    <Svg label="캔들 위에 5일 이동평균선과 20일 이동평균선을 그린 모습">
      {view.map((d, i) => (
        <Candle key={i} x={x(i)} open={y(d.o)} close={y(d.c)} high={y(d.h)} low={y(d.l)} w={6} />
      ))}
      <path d={smoothPath(v20.map((v, i) => [x(i), y(v)]))} fill="none" stroke={C.accent} strokeWidth={2.6} strokeLinecap="round" />
      <path d={smoothPath(v5.map((v, i) => [x(i), y(v)]))} fill="none" stroke={C.orange} strokeWidth={2.2} strokeLinecap="round" />
      <g>
        <line x1={20} y1={180} x2={36} y2={180} stroke={C.orange} strokeWidth={3} strokeLinecap="round" />
        <T x={42} y={180} size={10.5} weight={700} anchor="start">
          5일선 · 민감하게
        </T>
        <line x1={150} y1={180} x2={166} y2={180} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />
        <T x={172} y={180} size={10.5} weight={700} anchor="start">
          20일선 · 느긋하게
        </T>
      </g>
      <T x={18} y={14} size={10} color={C.muted} anchor="start">
        평균을 내면 들쭉날쭉한 움직임 속 큰 흐름이 보여요
      </T>
    </Svg>
  );
}

function GoldenDeadCross() {
  const N = 60;
  const pts = Array.from({ length: N + 1 }, (_, i) => i / N);
  const X = (t) => 20 + t * 280;
  const longY = (t) => 110 - 26 * Math.sin(Math.PI * t);
  const shortY = (t) => longY(t) + 34 * Math.cos(2 * Math.PI * t) + 4 * Math.sin(9 * t);
  const longPts = pts.map((t) => [X(t), longY(t)]);
  const shortPts = pts.map((t) => [X(t), shortY(t)]);
  // 교차점 찾기
  const crosses = [];
  for (let i = 0; i < N; i++) {
    const d0 = shortY(pts[i]) - longY(pts[i]);
    const d1 = shortY(pts[i + 1]) - longY(pts[i + 1]);
    if (d0 * d1 < 0) {
      const t = pts[i] + (d0 / (d0 - d1)) * (pts[i + 1] - pts[i]);
      crosses.push({ t, golden: d0 > 0 });
    }
  }
  return (
    <Svg label="단기선이 장기선을 위로 뚫는 골든크로스와 아래로 뚫는 데드크로스">
      <path d={linePath(longPts)} fill="none" stroke={C.accent} strokeWidth={2.6} strokeLinecap="round" />
      <path d={linePath(shortPts)} fill="none" stroke={C.orange} strokeWidth={2.6} strokeLinecap="round" />
      {crosses.map((c) => {
        const cx = X(c.t);
        const cy = longY(c.t);
        return (
          <g key={c.t}>
            <circle cx={cx} cy={cy} r={9} fill="none" stroke={c.golden ? C.gold : C.ink2} strokeWidth={2.5} />
            {c.golden ? (
              <>
                <Pill x={cx - 26} y={cy - 50} text="골든크로스" color={C.gold} size={10.5} />
                <T x={cx - 26} y={cy - 32} size={9.5} color={C.upInk} weight={700}>
                  상승 신호로 해석
                </T>
              </>
            ) : (
              <>
                <Pill x={cx + 32} y={cy - 56} text="데드크로스" color={C.ink2} size={10.5} />
                <T x={cx + 32} y={cy - 38} size={9.5} color={C.downInk} weight={700}>
                  하락 신호로 해석
                </T>
              </>
            )}
          </g>
        );
      })}
      <g>
        <line x1={44} y1={184} x2={60} y2={184} stroke={C.orange} strokeWidth={3} strokeLinecap="round" />
        <T x={66} y={184} size={10.5} weight={700} anchor="start">
          단기선 (예: 5일)
        </T>
        <line x1={172} y1={184} x2={188} y2={184} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />
        <T x={194} y={184} size={10.5} weight={700} anchor="start">
          장기선 (예: 20일)
        </T>
      </g>
    </Svg>
  );
}

function SupportResistance() {
  const R = 56;
  const S = 144;
  const pts = [
    [20, 120],
    [46, R + 2],
    [76, S - 2],
    [106, R + 2],
    [136, S - 2],
    [166, R + 2],
    [196, S - 2],
    [228, R - 2],
    [250, 34],
    [272, R - 2],
    [302, 20],
  ];
  return (
    <Svg label="주가가 지지선에서 튀어 오르고 저항선에서 막히다가, 돌파한 뒤 저항선이 지지선이 된다">
      <rect x={14} y={R} width={292} height={S - R} fill={C.soft} opacity={0.6} />
      <HLine x1={14} x2={306} y={R} color={C.orange} dashed={false} width={2.5} />
      <HLine x1={14} x2={306} y={S} color={C.aqua} dashed={false} width={2.5} />
      <path d={linePath(pts)} fill="none" stroke={C.ink2} strokeWidth={2.2} strokeLinejoin="round" />
      {[46, 106, 166].map((x) => (
        <circle key={x} cx={x} cy={R + 2} r={4} fill={C.orange} />
      ))}
      {[76, 136, 196].map((x) => (
        <circle key={x} cx={x} cy={S - 2} r={4} fill={C.aqua} />
      ))}
      <circle cx={272} cy={R - 2} r={4.5} fill={C.accent} />
      <T x={16} y={R - 14} size={11.5} weight={800} color={C.orange} anchor="start">
        저항선 · 천장
      </T>
      <T x={16} y={S + 15} size={11.5} weight={800} color={C.aquaInk} anchor="start">
        지지선 · 바닥
      </T>
      <Pill x={262} y={84} text="돌파 후 천장 → 바닥" color={C.accentBg} size={9.5} />
      <T x={130} y={S + 32} size={10} color={C.ink2}>
        바닥에선 사려는 사람이, 천장에선 팔려는 사람이 많아요
      </T>
    </Svg>
  );
}

function Trend() {
  const panel = (x, title, color, pts, guide, note) => (
    <g>
      <Box x={x} y={12} w={96} h={140} fill={C.soft} stroke="none" r={12} />
      {guide && <path d={linePath(guide)} stroke={color} strokeWidth={1.5} strokeDasharray="4 4" fill="none" />}
      <path d={linePath(pts)} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <T x={x + 48} y={168} size={12} weight={800} color={color}>
        {title}
      </T>
      <T x={x + 48} y={185} size={9.5} color={C.ink2}>
        {note}
      </T>
    </g>
  );
  return (
    <Svg label="상승 추세는 고점과 저점이 높아지고, 하락 추세는 낮아지고, 횡보는 범위 안에서 움직인다">
      {panel(
        8,
        '상승 추세',
        C.upInk,
        [
          [16, 130],
          [34, 104],
          [44, 116],
          [62, 78],
          [72, 92],
          [88, 44],
          [98, 54],
        ],
        [
          [16, 132],
          [72, 94],
          [100, 74],
        ],
        '저점이 계속 높아져요',
      )}
      {panel(
        112,
        '하락 추세',
        C.downInk,
        [
          [120, 34],
          [138, 60],
          [148, 48],
          [166, 88],
          [176, 76],
          [192, 120],
          [202, 112],
        ],
        [
          [120, 32],
          [148, 46],
          [204, 82],
        ],
        '고점이 계속 낮아져요',
      )}
      {panel(
        216,
        '횡보 · 박스권',
        C.ink2,
        [
          [224, 84],
          [238, 52],
          [252, 110],
          [266, 54],
          [280, 108],
          [294, 56],
          [304, 80],
        ],
        null,
        '범위 안에서 왔다갔다',
      )}
      <HLine x1={222} x2={306} y={50} color={C.muted} />
      <HLine x1={222} x2={306} y={112} color={C.muted} />
    </Svg>
  );
}

function Gap() {
  return (
    <Svg label="전날 종가와 오늘 시가 사이에 빈 공간이 생기는 갭상승과 갭하락">
      {/* 갭상승 */}
      <rect x={14} y={86} width={136} height={28} fill={C.goldSoft} />
      <HLine x1={14} x2={150} y={86} color={C.gold} />
      <HLine x1={14} x2={150} y={114} color={C.gold} />
      <Candle x={30} open={150} close={132} high={126} low={158} w={16} />
      <Candle x={58} open={134} close={120} high={114} low={140} w={16} />
      <Candle x={104} open={76} close={58} high={50} low={86} w={16} />
      <Candle x={132} open={60} close={44} high={36} low={66} w={16} />
      <T x={82} y={100} size={10.5} weight={800} color={C.goldInk}>
        갭 (빈 공간)
      </T>
      <Pill x={82} y={182} text="갭상승" color={C.up} />
      {/* 구분선 */}
      <line x1={160} y1={20} x2={160} y2={170} stroke={C.line} strokeWidth={1.5} />
      {/* 갭하락 */}
      <rect x={170} y={86} width={136} height={28} fill={C.goldSoft} />
      <HLine x1={170} x2={306} y={86} color={C.gold} />
      <HLine x1={170} x2={306} y={114} color={C.gold} />
      <Candle x={186} open={60} close={44} high={38} low={66} w={16} />
      <Candle x={214} open={46} close={72} high={40} low={86} w={16} />
      <Candle x={260} open={124} close={142} high={114} low={150} w={16} />
      <Candle x={288} open={144} close={158} high={138} low={166} w={16} />
      <T x={238} y={100} size={10.5} weight={800} color={C.goldInk}>
        갭 (빈 공간)
      </T>
      <Pill x={238} y={182} text="갭하락" color={C.down} />
    </Svg>
  );
}

export const chartIllustrations = {
  candle: CandleIll,
  wick: Wick,
  'moving-average': MovingAverage,
  'golden-dead-cross': GoldenDeadCross,
  'support-resistance': SupportResistance,
  trend: Trend,
  gap: Gap,
};
