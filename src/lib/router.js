import { useEffect, useState } from 'react';

/** 해시 기반 라우터 (GitHub Pages 에서도 새로고침 문제 없음) */
export function useHashRoute() {
  const [path, setPath] = useState(() => readHash());
  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

function readHash() {
  const h = window.location.hash.replace(/^#/, '');
  return h || '/';
}

export function href(path) {
  return `#${path}`;
}

export function navigate(path) {
  window.location.hash = path;
}

/** '/t/per' → { name: 't', params: ['per'], query } */
export function parseRoute(path) {
  const [p, qs = ''] = path.split('?');
  const parts = p.split('/').filter(Boolean).map(decodeURIComponent);
  const query = Object.fromEntries(new URLSearchParams(qs));
  return { name: parts[0] ?? '', params: parts.slice(1), query };
}
