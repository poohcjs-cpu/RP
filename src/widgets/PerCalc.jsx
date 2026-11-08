import { useState } from 'react';
import { won } from '../lib/format';
import { Slider, Note, Stat, Segmented } from './ui';

function feel(per) {
  if (per < 8) return { tone: 'soft', text: '이익에 비해 꽤 싸게 거래되는 편이에요. 저평가일 수도 있지만, 시장이 앞으로 이익이 줄어들 거라고 걱정하는 걸 수도 있어요.' };
  if (per < 15) return { tone: 'soft', text: '여러 업종에서 흔히 보이는 무난한 수준이에요.' };
  if (per < 30) return { tone: 'soft', text: '이익에 비해 비싼 편이에요. 앞으로 크게 성장할 거라는 기대가 담겨 있을 가능성이 커요.' };
  return { tone: 'gold', text: '아주 높은 기대가 담긴 가격이에요. 성장 기대가 꺾이면 주가가 크게 흔들릴 수 있어요.' };
}

export default function PerCalc() {
  const [price, setPrice] = useState(50000);
  const [eps, setEps] = useState(5000);
  const [loss, setLoss] = useState('profit');

  const per = loss === 'profit' ? price / eps : null;
  const years = per ? Math.min(Math.round(per), 60) : 0;
  const f = per ? feel(per) : null;

  return (
    <div className="space-y-4">
      <Segmented
        value={loss}
        onChange={setLoss}
        options={[
          { value: 'profit', label: '흑자 회사' },
          { value: 'loss', label: '적자 회사' },
        ]}
      />
      <Slider label="주가" value={price} min={5000} max={150000} step={1000} onChange={setPrice} format={won} />
      {loss === 'profit' ? (
        <Slider label="EPS (1주당 1년 순이익)" value={eps} min={500} max={15000} step={100} onChange={setEps} format={won} />
      ) : (
        <Note tone="gold">순이익이 마이너스(적자)라서 EPS도 마이너스예요. 이럴 때 PER은 의미가 없어서 &quot;N/A(계산 불가)&quot;로 표시해요.</Note>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Stat label="PER" value={per ? `${per.toFixed(1)}배` : 'N/A'} tone="accent" sub={loss === 'profit' ? `${won(price)} ÷ ${won(eps)}` : '적자라 계산 불가'} />
        <Stat label="본전 뽑는 데 걸리는 시간" value={per ? `약 ${per.toFixed(1)}년` : '—'} sub="이익이 매년 똑같다고 가정" />
      </div>

      {per && (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">동전 하나 = 1년 동안 1주가 벌어오는 이익 ({won(eps)})</p>
          <div className="flex flex-wrap gap-1" aria-hidden="true">
            {Array.from({ length: years }, (_, i) => (
              <span key={i} className="grid h-5 w-5 place-items-center rounded-full bg-gold text-[9px] font-extrabold text-white">
                {i + 1}
              </span>
            ))}
            {per > 60 && <span className="self-center text-xs text-muted">… (60개까지만 표시)</span>}
          </div>
        </div>
      )}

      {f && (
        <div aria-live="polite">
          <Note tone={f.tone}>
            <b>PER {per.toFixed(1)}배</b> — {f.text}
            <br />
            <span className="text-xs opacity-80">※ 업종마다 평소 PER 수준이 달라서, 같은 업종끼리 비교해야 정확해요.</span>
          </Note>
        </div>
      )}
    </div>
  );
}
