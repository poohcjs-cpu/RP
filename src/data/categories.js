export const CATEGORIES = [
  { id: 'basics', name: '주식 기초', icon: '🌱', desc: '주식이 뭔지부터 차근차근' },
  { id: 'trading', name: '주문 · 거래', icon: '🛒', desc: '사고파는 방법과 시장의 규칙' },
  { id: 'chart', name: '차트 읽기', icon: '🕯️', desc: '캔들과 선으로 흐름 읽기' },
  { id: 'value', name: '가치 평가', icon: '🔍', desc: '비싼지 싼지 따져보는 지표' },
  { id: 'finance', name: '재무제표', icon: '📒', desc: '회사의 성적표 읽는 법' },
  { id: 'market', name: '시장 흐름', icon: '🌊', desc: '시장 분위기와 안전장치' },
  { id: 'events', name: '기업 이벤트', icon: '📣', desc: '증자 · 분할 · 배당 같은 소식' },
  { id: 'strategy', name: '투자 전략 · 위험', icon: '🧭', desc: '오래 살아남는 투자 습관' },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export const LEVELS = {
  1: { label: '입문', className: 'bg-aqua-soft text-aqua-ink' },
  2: { label: '기초', className: 'bg-gold-soft text-gold-ink' },
  3: { label: '심화', className: 'bg-accent-soft text-accent' },
};

/** 처음 시작하는 사람에게 추천하는 학습 순서 */
export const STARTER_PATH = [
  'stock',
  'shareholder',
  'kospi-kosdaq',
  'buy-sell',
  'order-book',
  'market-limit',
  'candle',
  'market-cap',
  'per',
  'diversification',
];
