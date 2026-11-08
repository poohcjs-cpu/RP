import { Link } from './common';

const NAV = [
  {
    to: '/',
    match: (n) => n === '',
    label: '홈',
    icon: <path d="M4 11.5L12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  },
  {
    to: '/terms',
    match: (n) => n === 'terms' || n === 't',
    label: '용어사전',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H19v14H6.5A1.5 1.5 0 0 0 5 19.5z" />
        <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19" />
        <path d="M9 8.5h6M9 12h4" />
      </g>
    ),
  },
  {
    to: '/quiz',
    match: (n) => n === 'quiz',
    label: '퀴즈',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4" />
        <circle cx="12" cy="16.8" r=".6" fill="currentColor" />
      </g>
    ),
  },
  {
    to: '/me',
    match: (n) => n === 'me',
    label: '내 학습',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M5 20V13M10 20V8M15 20v-5M20 20V5" />
      </g>
    ),
  },
];

function Logo() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="var(--c-accent-bg)" />
      <line x1="22" y1="12" x2="22" y2="50" stroke="#ffb3b3" strokeWidth="3" strokeLinecap="round" />
      <rect x="15" y="20" width="14" height="22" rx="3" fill="#ff6b6b" />
      <line x1="42" y1="16" x2="42" y2="54" stroke="#b9d4ff" strokeWidth="3" strokeLinecap="round" />
      <rect x="35" y="26" width="14" height="20" rx="3" fill="#5aa0ff" />
    </svg>
  );
}

export default function Layout({ routeName, children }) {
  return (
    <div className="min-h-dvh bg-bg">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2">
        본문으로 건너뛰기
      </a>
      <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2" aria-label="주식 용어 그림사전 홈">
            <Logo />
            <span className="text-[17px] font-extrabold tracking-tight text-ink">
              주식 용어 <span className="text-accent">그림사전</span>
            </span>
          </Link>
          <nav className="ml-auto hidden gap-1 md:flex" aria-label="주 메뉴">
            {NAV.map((n) => {
              const active = n.match(routeName);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${active ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-soft hover:text-ink'}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-4 pb-28 pt-5 md:pb-16">
        {children}
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-28 text-center text-xs leading-relaxed text-muted md:pb-10">
        이 앱은 주식 용어 학습을 위한 교육용 자료이며, 특정 종목의 매수 · 매도를 권유하지 않아요.
        <br />
        세율 · 거래 제도 등은 바뀔 수 있으니 실제 투자 전에는 증권사 · 거래소 안내를 꼭 확인하세요.
      </footer>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        aria-label="하단 메뉴"
      >
        <div className="mx-auto grid max-w-md grid-cols-4">
          {NAV.map((n) => {
            const active = n.match(routeName);
            return (
              <Link
                key={n.to}
                to={n.to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold ${active ? 'text-accent' : 'text-muted'}`}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  {n.icon}
                </svg>
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
