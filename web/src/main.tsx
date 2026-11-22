import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';
import { PrefsProvider } from './state/prefs';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';

// Landing is in the main bundle; inner pages load on demand.
const Start = lazy(() => import('./pages/Start'));
const Universities = lazy(() => import('./pages/Universities'));
const University = lazy(() => import('./pages/University'));
const Scholarships = lazy(() => import('./pages/Scholarships'));
const Guides = lazy(() => import('./pages/Guides'));
const GuideArticle = lazy(() => import('./pages/GuideArticle'));
const MyPlan = lazy(() => import('./pages/MyPlan'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Fallback = () => <div className="page-loading" aria-hidden="true" />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrefsProvider>
      {/* Hash routing: works on any static host (GitHub Pages included) without server rewrites. */}
      <HashRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="start" element={<Start />} />
              <Route path="universities" element={<Universities />} />
              <Route path="universities/:slug" element={<University />} />
              <Route path="scholarships" element={<Scholarships />} />
              <Route path="guides" element={<Guides />} />
              <Route path="guides/:slug" element={<GuideArticle />} />
              <Route path="my-plan" element={<MyPlan />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </PrefsProvider>
  </StrictMode>,
);
