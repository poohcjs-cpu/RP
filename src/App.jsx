import { useEffect } from 'react';
import { useHashRoute, parseRoute } from './lib/router';
import { StudyProvider } from './lib/StudyProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import TermList from './pages/TermList';
import TermDetail from './pages/TermDetail';
import Quiz from './pages/Quiz';
import MyStudy from './pages/MyStudy';
import { TERM_MAP } from './data/terms';

const TITLE = '주식 용어 그림사전';

export default function App() {
  const path = useHashRoute();
  const { name, params, query } = parseRoute(path);
  const pathOnly = path.split('?')[0];

  // 페이지가 바뀌면 맨 위로 (검색어만 바뀔 땐 그대로)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathOnly]);

  useEffect(() => {
    const sub =
      name === 't' ? TERM_MAP[params[0]]?.term : name === 'terms' ? '용어사전' : name === 'quiz' ? '퀴즈' : name === 'me' ? '내 학습' : null;
    document.title = sub ? `${sub} · ${TITLE}` : TITLE;
  }, [name, params]);

  let page;
  if (name === 't') page = <TermDetail id={params[0]} />;
  else if (name === 'terms') page = <TermList query={query} />;
  else if (name === 'quiz') page = <Quiz />;
  else if (name === 'me') page = <MyStudy />;
  else page = <Home />;

  return (
    <StudyProvider>
      <Layout routeName={name}>{page}</Layout>
    </StudyProvider>
  );
}
