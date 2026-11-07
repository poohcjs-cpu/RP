import { C, textWidth } from './colors';

/** 그림 공통 틀 (가로 320 × 세로 200 좌표계) */
export function Svg({ label, children, vb = '0 0 320 200', className = 'block w-full h-auto' }) {
  return (
    <svg viewBox={vb} role="img" aria-label={label} className={className}>
      {label && <title>{label}</title>}
      {children}
    </svg>
  );
}

/** 텍스트 (x, y 가 글자 중심) */
export function T({ x, y, children, size = 12, color = C.ink, weight = 500, anchor = 'middle', ...rest }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      fontWeight={weight}
      textAnchor={anchor}
      dominantBaseline="central"
      {...rest}
    >
      {children}
    </text>
  );
}

/** 둥근 라벨 */
export function Pill({ x, y, text, color = C.accentBg, textColor = '#fff', size = 11, pad = 7, anchor = 'middle' }) {
  const w = textWidth(text, size) + pad * 2;
  const h = size + 9;
  const left = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
  return (
    <g>
      <rect x={left} y={y - h / 2} width={w} height={h} rx={h / 2} fill={color} />
      <T x={left + w / 2} y={y + 0.5} size={size} color={textColor} weight={700}>
        {text}
      </T>
    </g>
  );
}

/** 화살표 */
export function Arrow({ x1, y1, x2, y2, color = C.ink2, width = 2, head = 7, dashed = false }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - Math.cos(ang) * head * 0.9;
  const by = y2 - Math.sin(ang) * head * 0.9;
  const p1 = [x2, y2];
  const p2 = [x2 - head * Math.cos(ang - 0.45), y2 - head * Math.sin(ang - 0.45)];
  const p3 = [x2 - head * Math.cos(ang + 0.45), y2 - head * Math.sin(ang + 0.45)];
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon points={[p1, p2, p3].map((p) => p.join(',')).join(' ')} fill={color} />
    </g>
  );
}

/** 캔들 하나. 값은 SVG y 좌표 (작을수록 높은 가격) */
export function Candle({ x, open, close, high, low, w = 16, color }) {
  const isUp = close <= open;
  const fill = color ?? (isUp ? C.up : C.down);
  const top = Math.min(open, close);
  const h = Math.max(Math.abs(open - close), 2);
  return (
    <g>
      <line x1={x} y1={high} x2={x} y2={low} stroke={fill} strokeWidth={2} strokeLinecap="round" />
      <rect x={x - w / 2} y={top} width={w} height={h} rx={2} fill={fill} />
    </g>
  );
}

/** 동전 */
export function Coin({ cx, cy, r = 10, label = '₩' }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.gold} />
      <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={1.2} />
      <T x={cx} y={cy + 0.5} size={r * 1.0} color="#fff" weight={800}>
        {label}
      </T>
    </g>
  );
}

/** 사람 (x, y 는 발 위치 중심) */
export function Person({ x, y, s = 1, color = C.accent, face = true }) {
  return (
    <g>
      <circle cx={x} cy={y - 30 * s} r={8 * s} fill={color} />
      <path
        d={`M${x - 12 * s},${y} L${x - 12 * s},${y - 10 * s} Q${x - 12 * s},${y - 20 * s} ${x},${y - 20 * s} Q${x + 12 * s},${y - 20 * s} ${x + 12 * s},${y - 10 * s} L${x + 12 * s},${y} Z`}
        fill={color}
      />
      {face && (
        <g fill="#fff">
          <circle cx={x - 2.8 * s} cy={y - 31 * s} r={1.2 * s} />
          <circle cx={x + 2.8 * s} cy={y - 31 * s} r={1.2 * s} />
        </g>
      )}
    </g>
  );
}

/** 회사 건물 */
export function Building({ x, y, w = 50, h = 60, color = C.accent, windows = true }) {
  const cols = Math.max(2, Math.floor(w / 14));
  const rows = Math.max(2, Math.floor((h - 18) / 13));
  const ww = (w - 12) / cols - 4;
  const items = [];
  if (windows) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        items.push(
          <rect
            key={`${r}-${c}`}
            x={x + 6 + c * (ww + 4) + 2}
            y={y + 8 + r * 13}
            width={ww}
            height={7}
            rx={1.5}
            fill="#fff"
            fillOpacity={0.7}
          />,
        );
      }
    }
  }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={color} />
      {items}
      <rect x={x + w / 2 - 6} y={y + h - 14} width={12} height={14} rx={2} fill="#fff" fillOpacity={0.85} />
    </g>
  );
}

/** 카드 상자 */
export function Box({ x, y, w, h, fill = C.card, stroke = C.line, r = 10, dashed = false, sw = 1.5 }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeDasharray={dashed ? '5 4' : undefined}
    />
  );
}

/** 주식 증서 (작은 종이) */
export function Share({ x, y, w = 22, h = 28, color = C.accent, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={C.card} stroke={color} strokeWidth={1.6} />
      <line x1={x + 5} y1={y + 8} x2={x + w - 5} y2={y + 8} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <line x1={x + 5} y1={y + 14} x2={x + w - 8} y2={y + 14} stroke={color} strokeOpacity={0.5} strokeWidth={1.4} strokeLinecap="round" />
      {label ? (
        <T x={x + w / 2} y={y + h - 7} size={8} color={color} weight={800}>
          {label}
        </T>
      ) : (
        <circle cx={x + w / 2} cy={y + h - 7} r={3} fill={color} />
      )}
    </g>
  );
}

/** ✓ 표시 */
export function Check({ x, y, s = 1, color = C.aqua }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9 * s} fill={color} />
      <path
        d={`M${x - 4 * s},${y} l${3 * s},${3 * s} l${5 * s},${-6 * s}`}
        stroke="#fff"
        strokeWidth={2 * s}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** ✕ 표시 */
export function Cross({ x, y, s = 1, color = C.muted }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9 * s} fill={color} />
      <path
        d={`M${x - 3.5 * s},${y - 3.5 * s} l${7 * s},${7 * s} M${x + 3.5 * s},${y - 3.5 * s} l${-7 * s},${7 * s}`}
        stroke="#fff"
        strokeWidth={2 * s}
        strokeLinecap="round"
      />
    </g>
  );
}

/** 가로 점선 */
export function HLine({ x1, x2, y, color = C.line, dashed = true, width = 1.5 }) {
  return (
    <line
      x1={x1}
      x2={x2}
      y1={y}
      y2={y}
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dashed ? '4 4' : undefined}
    />
  );
}

/** 피자 (회사 지분 비유). colors: 조각별 색 지정 { [index]: { fill, stroke } } */
export function Pizza({ cx, cy, r, slices = 8, colors = {}, pop = {}, toppings = true }) {
  const step = 360 / slices;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 5} fill={C.gold} />
      {Array.from({ length: slices }, (_, i) => {
        const a0 = i * step;
        const a1 = (i + 1) * step;
        const mid = ((a0 + a1) / 2) * (Math.PI / 180);
        const off = pop[i] ?? 0;
        const dx = Math.sin(mid) * off;
        const dy = -Math.cos(mid) * off;
        const col = colors[i] ?? {};
        const tx = cx + Math.sin(mid) * r * 0.6;
        const ty = cy - Math.cos(mid) * r * 0.6;
        return (
          <g key={i} transform={`translate(${dx.toFixed(1)},${dy.toFixed(1)})`}>
            {off > 0 && <path d={slicePathLocal(cx, cy, r + 5, a0, a1)} fill={C.gold} />}
            <path
              d={slicePathLocal(cx, cy, r, a0, a1)}
              fill={col.fill ?? C.goldSoft}
              stroke={col.stroke ?? C.card}
              strokeWidth={col.stroke ? 3 : 2.5}
              strokeLinejoin="round"
            />
            {toppings && !col.fill && <circle cx={tx} cy={ty} r={r * 0.09} fill={C.orange} fillOpacity={0.75} />}
          </g>
        );
      })}
    </g>
  );
}

function slicePathLocal(cx, cy, r, a0, a1) {
  const rad = (a) => ((a - 90) * Math.PI) / 180;
  const x0 = cx + r * Math.cos(rad(a0));
  const y0 = cy + r * Math.sin(rad(a0));
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
}

/** 달걀 */
export function Egg({ cx, cy, s = 1, cracked = false }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={8 * s} ry={10.5 * s} fill={C.card} stroke={C.ink2} strokeWidth={1.4} />
      {cracked && (
        <path
          d={`M${cx - 8 * s},${cy} l${3 * s},${-3 * s} l${3 * s},${4 * s} l${3 * s},${-4 * s} l${3 * s},${4 * s} l${3 * s},${-3 * s}`}
          stroke={C.ink2}
          strokeWidth={1.4}
          fill="none"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/** 바구니 (cx: 가운데, y: 윗변) */
export function Basket({ cx, y, w = 56, h = 30, rotate = 0 }) {
  const t = w / 2;
  const b = w * 0.36;
  return (
    <g transform={`rotate(${rotate} ${cx} ${y + h / 2})`}>
      <path
        d={`M${cx - t},${y} L${cx + t},${y} L${cx + b},${y + h} L${cx - b},${y + h} Z`}
        fill={C.goldSoft}
        stroke={C.gold}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line x1={cx - t * 0.86} y1={y + h * 0.4} x2={cx + t * 0.86} y2={y + h * 0.4} stroke={C.gold} strokeWidth={1.4} />
      <line x1={cx - t * 0.76} y1={y + h * 0.72} x2={cx + t * 0.76} y2={y + h * 0.72} stroke={C.gold} strokeWidth={1.4} />
      <path d={`M${cx - t * 0.7},${y} Q${cx},${y - h * 0.9} ${cx + t * 0.7},${y}`} fill="none" stroke={C.gold} strokeWidth={2} />
    </g>
  );
}
