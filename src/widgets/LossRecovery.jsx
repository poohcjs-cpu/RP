import { useState } from 'react';
import { C } from '../illustrations/colors';
import { T } from '../illustrations/kit';
import { Slider, Note } from './ui';

const need = (loss) => (loss / (100 - loss)) * 100;
const TABLE = [10, 20, 30, 50, 70, 90];

export default function LossRecovery() {
  const [loss, setLoss] = useState(50);
  const remain = 100 - loss;
  const req = need(loss);
  const base = 150;
  const k = 1.3;

  return (
    <div className="space-y-4">
      <Slider label="손실률" value={loss} min={1} max={90} onChange={setLoss} format={(v) => `−${v}%`} />
      <div className="rounded-2xl bg-soft p-2">
        <svg viewBox="0 0 320 170" className="block h-auto w-full" role="img" aria-label={`${loss}% 손실을 회복하려면 ${req.toFixed(1)}% 상승이 필요`}>
          <rect x={30} y={base - 100 * k} width={64} height={100 * k} rx={5} fill={C.accentBg} />
          <T x={62} y={base + 12} size={10.5} weight={700}>
            처음 100만 원
          </T>
          <rect x={128} y={base - remain * k} width={64} height={remain * k} rx={5} fill={C.down} />
          <T x={160} y={base - remain * k - 9} size={10.5} weight={800} color={C.downInk}>
            −{loss}%
          </T>
          <T x={160} y={base + 12} size={10.5} weight={700}>
            {remain}만 원
          </T>
          <rect x={226} y={base - remain * k} width={64} height={remain * k} rx={5} fill={C.down} fillOpacity={0.45} />
          <rect x={226} y={base - 100 * k} width={64} height={loss * k} rx={5} fill={C.up} />
          <T x={258} y={base - 100 * k - 9} size={10.5} weight={800} color={C.upInk}>
            +{req.toFixed(1)}% 필요
          </T>
          <T x={258} y={base + 12} size={10.5} weight={700}>
            다시 100만 원
          </T>
          <line x1={16} x2={304} y1={base} y2={base} stroke={C.line} strokeWidth={1.5} />
        </svg>
      </div>
      <Note tone="gold">
        <b>−{loss}%</b> 손실을 메우려면 남은 {remain}만 원이 <b>+{req.toFixed(1)}%</b> 올라야 해요.
        {loss >= 50 && ' 손실이 커질수록 회복은 기하급수적으로 어려워져요.'}
      </Note>
      <div className="overflow-hidden rounded-xl border border-line">
        <table className="w-full text-center text-sm tabular-nums">
          <thead className="bg-soft text-xs text-muted">
            <tr>
              <th className="py-2 font-bold">손실</th>
              {TABLE.map((l) => (
                <th key={l} className="py-2 font-bold text-down-ink">
                  −{l}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 text-xs font-bold text-muted">회복에 필요</td>
              {TABLE.map((l) => (
                <td key={l} className="py-2 font-extrabold text-up-ink">
                  +{Math.round(need(l))}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
