import { useState } from 'react';
import { C } from '../illustrations/colors';
import { T } from '../illustrations/kit';
import { won, signedPct } from '../lib/format';
import { Slider, Stat, Note } from './ui';

let nextId = 3;

export default function AvgCost() {
  const [buys, setBuys] = useState([
    { id: 1, price: 10000, qty: 10 },
    { id: 2, price: 8000, qty: 10 },
  ]);
  const [now, setNow] = useState(9500);

  const totalQty = buys.reduce((s, b) => s + b.qty, 0);
  const cost = buys.reduce((s, b) => s + b.qty * b.price, 0);
  const avg = totalQty ? cost / totalQty : 0;
  const value = totalQty * now;
  const pnl = value - cost;
  const ret = cost ? (pnl / cost) * 100 : 0;

  const update = (id, key, val) => setBuys((list) => list.map((b) => (b.id === id ? { ...b, [key]: val } : b)));
  const remove = (id) => setBuys((list) => list.filter((b) => b.id !== id));
  const add = () =>
    setBuys((list) => (list.length >= 5 ? list : [...list, { id: nextId++, price: Math.max(5000, Math.round(now / 100) * 100 - 500), qty: 10 }]));

  // 차트
  const MIN = 5000;
  const MAX = 15000;
  const y = (p) => 12 + ((MAX - p) / (MAX - MIN)) * 116;
  const x = (i) => 40 + (i * 220) / Math.max(1, buys.length);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-soft p-2">
        <svg viewBox="0 0 320 140" className="block h-auto w-full" role="img" aria-label="매수 가격과 평균단가, 현재가">
          {[6000, 8000, 10000, 12000, 14000].map((p) => (
            <g key={p}>
              <line x1={36} x2={312} y1={y(p)} y2={y(p)} stroke={C.line} strokeDasharray="2 4" />
              <T x={32} y={y(p)} size={8.5} color={C.muted} anchor="end">
                {p / 1000}천
              </T>
            </g>
          ))}
          {totalQty > 0 && (
            <>
              <line x1={36} x2={312} y1={y(avg)} y2={y(avg)} stroke={C.accent} strokeWidth={2} />
              <T x={312} y={y(avg) - 8} size={9.5} weight={800} color={C.accent} anchor="end">
                평균 {won(avg)}
              </T>
            </>
          )}
          <line x1={36} x2={312} y1={y(now)} y2={y(now)} stroke={C.ink2} strokeWidth={1.5} strokeDasharray="5 3" />
          <T x={312} y={y(now) + 9} size={9.5} weight={700} color={C.ink2} anchor="end">
            현재가 {won(now)}
          </T>
          {buys.map((b, i) => (
            <g key={b.id}>
              <circle cx={x(i) + 20} cy={y(b.price)} r={4 + Math.min(8, b.qty / 4)} fill={C.up} fillOpacity={0.85} />
              <T x={x(i) + 20} y={y(b.price)} size={8.5} weight={800} color="#fff">
                {i + 1}
              </T>
            </g>
          ))}
        </svg>
      </div>

      <div className="space-y-2">
        {buys.map((b, i) => (
          <div key={b.id} className="rounded-xl border border-line bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-extrabold text-up-ink">{i + 1}차 매수</span>
              {buys.length > 1 && (
                <button type="button" onClick={() => remove(b.id)} className="text-xs font-bold text-muted hover:text-ink" aria-label={`${i + 1}차 매수 삭제`}>
                  삭제
                </button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Slider label="가격" value={b.price} min={5000} max={15000} step={100} onChange={(v) => update(b.id, 'price', v)} format={won} />
              <Slider label="수량" value={b.qty} min={1} max={50} onChange={(v) => update(b.id, 'qty', v)} format={(v) => `${v}주`} />
            </div>
          </div>
        ))}
        {buys.length < 5 && (
          <button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-line py-2.5 text-sm font-bold text-ink-2 hover:border-accent hover:text-accent">
            + 추가 매수하기
          </button>
        )}
      </div>

      <Slider label="현재 주가" value={now} min={5000} max={15000} step={100} onChange={setNow} format={won} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="평균단가" value={won(avg)} tone="accent" />
        <Stat label="보유 수량" value={`${totalQty}주`} sub={`매수금액 ${won(cost)}`} />
        <Stat label="평가금액" value={won(value)} />
        <Stat label="평가손익" value={signedPct(ret)} tone={pnl > 0 ? 'up' : pnl < 0 ? 'down' : 'ink'} sub={`${pnl >= 0 ? '+' : '−'}${won(Math.abs(pnl))}`} />
      </div>
      <Note>
        평균단가 = 총 매수금액 {won(cost)} ÷ 총 수량 {totalQty}주. 현재가가 평균단가보다 {now >= avg ? '높아서 수익' : '낮아서 손실'}이에요.
      </Note>
    </div>
  );
}
