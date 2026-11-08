import { useState } from 'react';
import { won } from '../lib/format';
import { Segmented, Slider, Note } from './ui';

const INITIAL = {
  asks: [
    { price: 70500, qty: 320 },
    { price: 70400, qty: 540 },
    { price: 70300, qty: 210 },
    { price: 70200, qty: 760 },
    { price: 70100, qty: 430 },
  ],
  bids: [
    { price: 70000, qty: 610 },
    { price: 69900, qty: 380 },
    { price: 69800, qty: 820 },
    { price: 69700, qty: 260 },
    { price: 69600, qty: 470 },
  ],
  last: 70000,
};

const clone = (b) => ({ asks: b.asks.map((r) => ({ ...r })), bids: b.bids.map((r) => ({ ...r })), last: b.last });

/** 주문 처리: 가격 우선 → 시간 우선 */
function execute(book, { side, type, qty, price }) {
  const b = clone(book);
  const fills = [];
  let left = qty;
  if (side === 'buy') {
    const asks = [...b.asks].sort((x, y) => x.price - y.price); // 싼 것부터
    for (const row of asks) {
      if (left <= 0) break;
      if (type === 'limit' && row.price > price) break;
      const take = Math.min(left, row.qty);
      if (take > 0) {
        fills.push({ price: row.price, qty: take });
        row.qty -= take;
        left -= take;
      }
    }
    b.asks = b.asks.filter((r) => r.qty > 0);
    if (left > 0 && type === 'limit') {
      const ex = b.bids.find((r) => r.price === price);
      if (ex) {
        ex.qty += left;
        ex.mine = (ex.mine ?? 0) + left;
      } else b.bids.push({ price, qty: left, mine: left });
      b.bids.sort((x, y) => y.price - x.price);
    }
  } else {
    const bids = [...b.bids].sort((x, y) => y.price - x.price); // 비싼 것부터
    for (const row of bids) {
      if (left <= 0) break;
      if (type === 'limit' && row.price < price) break;
      const take = Math.min(left, row.qty);
      if (take > 0) {
        fills.push({ price: row.price, qty: take });
        row.qty -= take;
        left -= take;
      }
    }
    b.bids = b.bids.filter((r) => r.qty > 0);
    if (left > 0 && type === 'limit') {
      const ex = b.asks.find((r) => r.price === price);
      if (ex) {
        ex.qty += left;
        ex.mine = (ex.mine ?? 0) + left;
      } else b.asks.push({ price, qty: left, mine: left });
      b.asks.sort((x, y) => y.price - x.price);
    }
  }
  if (fills.length) b.last = fills[fills.length - 1].price;
  const filled = fills.reduce((s, f) => s + f.qty, 0);
  const amount = fills.reduce((s, f) => s + f.qty * f.price, 0);
  return { book: b, fills, filled, left, avg: filled ? amount / filled : 0, amount };
}

function explain(order, res, before) {
  const sideKo = order.side === 'buy' ? '매수' : '매도';
  const best = order.side === 'buy' ? Math.min(...before.asks.map((r) => r.price)) : Math.max(...before.bids.map((r) => r.price));
  const lines = [];
  if (res.filled === 0) {
    lines.push(
      `${won(order.price)}에 ${sideKo}하겠다는 지정가 주문이 아직 체결되지 않았어요. ${
        order.side === 'buy' ? `지금 가장 싸게 팔려는 가격이 ${won(best)}이라 내 가격과 맞지 않아요.` : `지금 가장 비싸게 사려는 가격이 ${won(best)}이라 내 가격과 맞지 않아요.`
      }`,
    );
  } else {
    const multi = res.fills.length > 1;
    lines.push(
      `${res.filled.toLocaleString()}주가 ${multi ? `${res.fills.length}개 가격에 나눠` : ''} 체결됐어요. 평균 ${won(res.avg)}.`,
    );
    if (multi && order.type === 'market') {
      lines.push(
        order.side === 'buy'
          ? `처음 보이던 ${won(best)}보다 평균 ${won(res.avg - best)} 비싸게 샀어요. 한 가격대의 물량이 모자라면 시장가 주문은 다음 가격까지 올라가며 체결돼요.`
          : `처음 보이던 ${won(best)}보다 평균 ${won(best - res.avg)} 싸게 팔았어요. 한 가격대의 물량이 모자라면 시장가 주문은 다음 가격까지 내려가며 체결돼요.`,
      );
    }
  }
  if (res.left > 0) {
    lines.push(
      order.type === 'limit'
        ? `남은 ${res.left.toLocaleString()}주는 ${order.side === 'buy' ? '매수' : '매도'}호가 ${won(order.price)} 줄 맨 뒤에서 기다려요 (시간 우선).`
        : `호가창의 물량이 바닥나 ${res.left.toLocaleString()}주는 체결되지 못했어요.`,
    );
  }
  return lines;
}

function Row({ r, side, maxQty, flash }) {
  const w = Math.max(4, (r.qty / maxQty) * 100);
  const isAsk = side === 'ask';
  return (
    <div className={`grid grid-cols-[1fr_88px_1fr] items-center gap-1 text-xs tabular-nums ${flash ? 'animate-pop' : ''}`}>
      <div className="relative flex h-7 items-center justify-end">
        {isAsk && (
          <>
            <div className="absolute inset-y-1 right-0 rounded-sm bg-down/25" style={{ width: `${w}%` }} />
            <span className="relative pr-1.5 font-semibold text-ink-2">
              {r.mine ? <span className="mr-1 rounded bg-accent-bg px-1 text-[10px] font-bold text-white">내 주문</span> : null}
              {r.qty.toLocaleString()}
            </span>
          </>
        )}
      </div>
      <div className={`flex h-7 items-center justify-center rounded-md font-bold ${isAsk ? 'bg-down-soft text-down-ink' : 'bg-up-soft text-up-ink'}`}>
        {r.price.toLocaleString()}
      </div>
      <div className="relative flex h-7 items-center">
        {!isAsk && (
          <>
            <div className="absolute inset-y-1 left-0 rounded-sm bg-up/25" style={{ width: `${w}%` }} />
            <span className="relative pl-1.5 font-semibold text-ink-2">
              {r.qty.toLocaleString()}
              {r.mine ? <span className="ml-1 rounded bg-accent-bg px-1 text-[10px] font-bold text-white">내 주문</span> : null}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function OrderBookSim() {
  const [book, setBook] = useState(() => clone(INITIAL));
  const [side, setSide] = useState('buy');
  const [type, setType] = useState('market');
  const [qty, setQty] = useState(600);
  const [price, setPrice] = useState(70000);
  const [result, setResult] = useState(null);
  const [tick, setTick] = useState(0);

  const maxQty = Math.max(...book.asks.map((r) => r.qty), ...book.bids.map((r) => r.qty), 1);
  const asks = [...book.asks].sort((a, b) => b.price - a.price).slice(-7);
  const bids = [...book.bids].sort((a, b) => b.price - a.price).slice(0, 7);

  const submit = () => {
    const order = { side, type, qty, price };
    const res = execute(book, order);
    setResult({ ...res, lines: explain(order, res, book), order });
    setBook(res.book);
    setTick((t) => t + 1);
  };

  const reset = () => {
    setBook(clone(INITIAL));
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-soft p-3">
        <div className="mb-1.5 grid grid-cols-[1fr_88px_1fr] gap-1 text-[11px] font-bold text-muted">
          <span className="text-right">매도 잔량</span>
          <span className="text-center">가격</span>
          <span>매수 잔량</span>
        </div>
        <div className="space-y-0.5" key={tick}>
          {asks.map((r) => (
            <Row key={`a${r.price}`} r={r} side="ask" maxQty={maxQty} />
          ))}
          <div className="my-1 flex items-center justify-center gap-2 text-xs font-bold text-ink-2">
            <span className="h-px flex-1 bg-line" />
            현재가 {won(book.last)}
            <span className="h-px flex-1 bg-line" />
          </div>
          {bids.map((r) => (
            <Row key={`b${r.price}`} r={r} side="bid" maxQty={maxQty} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          value={side}
          onChange={setSide}
          options={[
            { value: 'buy', label: '매수', activeClass: 'text-up-ink' },
            { value: 'sell', label: '매도', activeClass: 'text-down-ink' },
          ]}
        />
        <Segmented
          value={type}
          onChange={setType}
          options={[
            { value: 'market', label: '시장가' },
            { value: 'limit', label: '지정가' },
          ]}
        />
      </div>
      <Slider label="수량" value={qty} min={10} max={2000} step={10} onChange={setQty} format={(v) => `${v.toLocaleString()}주`} />
      {type === 'limit' && (
        <Slider
          label="내가 정한 가격"
          value={price}
          min={69500}
          max={70600}
          step={100}
          onChange={setPrice}
          format={won}
          hint="5만~20만 원대 주식은 호가단위가 100원이라 100원씩만 움직여요"
        />
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={submit}
          className={`flex-1 rounded-xl py-3 text-base font-extrabold text-white shadow-sm transition active:scale-[0.99] ${side === 'buy' ? 'bg-up' : 'bg-down'}`}
        >
          {type === 'market' ? '시장가' : `${price.toLocaleString()}원`} {qty.toLocaleString()}주 {side === 'buy' ? '매수' : '매도'}
        </button>
        <button type="button" onClick={reset} className="rounded-xl border border-line bg-card px-4 text-sm font-bold text-ink-2 hover:text-ink">
          초기화
        </button>
      </div>

      <div aria-live="polite">
        {result ? (
          <div className="space-y-2 animate-pop">
            {result.fills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {result.fills.map((f) => (
                  <span key={f.price} className="rounded-lg bg-card px-2 py-1 text-xs font-bold tabular-nums text-ink ring-1 ring-line">
                    {f.price.toLocaleString()}원 × {f.qty.toLocaleString()}주
                  </span>
                ))}
              </div>
            )}
            <Note tone={result.filled ? 'accent' : 'gold'}>
              {result.lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </Note>
          </div>
        ) : (
          <Note>
            💡 수량을 600주로 두고 <b>시장가 매수</b>를 눌러 보세요. 70,100원에 430주밖에 없어서 나머지는 더 비싼 가격에 사게 돼요. 그다음
            <b> 지정가</b>로 69,900원에 사 보면 어떻게 될까요?
          </Note>
        )}
      </div>
    </div>
  );
}
