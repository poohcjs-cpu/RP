import { lazy } from 'react';

export const WIDGETS = {
  candle: { title: '캔들 직접 만들어 보기', Component: lazy(() => import('./CandleBuilder')) },
  orderbook: { title: '호가창에서 주문 넣어 보기', Component: lazy(() => import('./OrderBookSim')) },
  per: { title: 'PER 계산기', Component: lazy(() => import('./PerCalc')) },
  avg: { title: '평균단가 계산기', Component: lazy(() => import('./AvgCost')) },
  compound: { title: '복리 계산기', Component: lazy(() => import('./CompoundCalc')) },
  loss: { title: '손실 회복 계산기', Component: lazy(() => import('./LossRecovery')) },
  leverage: { title: '레버리지 체험', Component: lazy(() => import('./LeverageSim')) },
};
