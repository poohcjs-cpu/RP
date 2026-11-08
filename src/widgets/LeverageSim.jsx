import { useState } from 'react';
import { wonKorean, signedPct } from '../lib/format';
import { Slider, Segmented, Stat, Note } from './ui';

const MY = 1_000_000;
const MAINTENANCE = 140; // 담보유지비율 예시 (%)

export default function LeverageSim() {
  const [lev, setLev] = useState(2);
  const [chg, setChg] = useState(-20);

  const invest = MY * lev;
  const loan = invest - MY;
  const assets = invest * (1 + chg / 100);
  const equity = assets - loan;
  const myRet = (equity / MY - 1) * 100;
  const ratio = loan > 0 ? (assets / loan) * 100 : Infinity;
  const marginCall = loan > 0 && ratio < MAINTENANCE;
  const wiped = equity <= 0;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-sm font-semibold text-ink-2">레버리지 (내 돈 100만 원 기준)</p>
        <Segmented
          value={lev}
          onChange={setLev}
          options={[1, 1.5, 2, 3].map((v) => ({ value: v, label: v === 1 ? '1배 (내 돈만)' : `${v}배` }))}
        />
      </div>
      <Slider label="주가 변동" value={chg} min={-60} max={60} onChange={setChg} format={(v) => signedPct(v, 0)} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="투자 금액" value={wonKorean(invest)} sub={loan > 0 ? `빌린 돈 ${wonKorean(loan)}` : '빌린 돈 없음'} />
        <Stat label="주식 평가액" value={wonKorean(Math.max(0, assets))} />
        <Stat label="빚 갚고 남는 내 돈" value={wonKorean(Math.max(0, equity))} tone={equity >= MY ? 'up' : 'down'} />
        <Stat label="내 돈 기준 수익률" value={wiped ? '−100%' : signedPct(myRet, 0)} tone={myRet > 0 ? 'up' : myRet < 0 ? 'down' : 'ink'} sub={`주가 ${signedPct(chg, 0)}의 ${lev}배`} />
      </div>
      <div aria-live="polite">
        {wiped ? (
          <Note tone="down">
            <b>원금 전부 손실.</b> 주가가 {signedPct(chg, 0)}만 움직여도 빌린 돈을 갚고 나면 남는 게 없어요. 실제로는 그 전에 반대매매로 강제 매도돼요.
          </Note>
        ) : marginCall ? (
          <Note tone="gold">
            <b>반대매매 위험!</b> 주식 평가액이 빌린 돈의 {Math.round(ratio)}%로 떨어졌어요. 증권사가 정한 담보비율(예: {MAINTENANCE}%) 아래라 추가로 돈을 넣지 않으면 증권사가 내 주식을 강제로 팔 수 있어요.
          </Note>
        ) : (
          <Note>
            레버리지 {lev}배라면 주가가 1% 움직일 때 내 돈은 약 {lev}%씩 움직여요. (빌린 돈의 이자는 빼고 계산했어요)
          </Note>
        )}
      </div>
    </div>
  );
}
