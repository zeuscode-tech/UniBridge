import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeftRight, BookOpen, Building2, Home, Languages, ListChecks, Menu } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { usePlan } from '../state/plan';
import { Logo } from './ui';
import { Sheet } from './Sheet';

/* ------------------------------------------------------- Direction switch */

export function DirectionSwitch({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const { direction, toggleDirection, tr } = usePrefs();
  const [from, to] = direction === 'kg-kr' ? ['KG', 'KR'] : ['KR', 'KG'];
  const label =
    direction === 'kg-kr'
      ? tr('Direction: Kyrgyzstan to South Korea. Switch', 'Направление: из Кыргызстана в Корею. Сменить', '방향: 키르기스스탄에서 한국으로. 바꾸기')
      : tr('Direction: South Korea to Kyrgyzstan. Switch', 'Направление: из Кореи в Кыргызстан. Сменить', '방향: 한국에서 키르기스스탄으로. 바꾸기');
  return (
    <button type="button" className={`dirswitch dirswitch--${size}`} onClick={toggleDirection} aria-label={label} title={label}>
      <span className={`dirswitch__code dirswitch__code--${from.toLowerCase()}`} key={from + 'a'}>{from}</span>
      <ArrowLeftRight size={size === 'lg' ? 18 : 15} strokeWidth={2} aria-hidden="true" className="dirswitch__icon" />
      <span className={`dirswitch__code dirswitch__code--${to.toLowerCase()}`} key={to + 'b'}>{to}</span>
    </button>
  );
}

/* ---------------------------------------------------------- Locale switch */

const LOCALES = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'ko', short: '한', name: '한국어' },
] as const;

export function LocaleSwitch() {
  const { locale, setLocale, tr } = usePrefs();
  return (
    <div className="segmented" role="group" aria-label={tr('Language', 'Язык', '언어')}>
      {LOCALES.map(({ code, short, name }) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          lang={code}
          aria-label={`${short} · ${name}`}
          title={name}
        >
          {short}
        </button>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- Header */

function useNavItems() {
  const { tr } = usePrefs();
  return [
    { to: '/universities', label: tr('Universities', 'Университеты', '대학') },
    { to: '/life', label: tr('Life Translator', 'Переводчик жизни', '생활 번역기') },
    { to: '/scholarships', label: tr('Scholarships', 'Стипендии', '장학금') },
    { to: '/guides', label: tr('Guides', 'Гайды', '가이드') },
    { to: '/my-plan', label: tr('My plan', 'Мой план', '내 계획') },
    { to: '/about', label: tr('About', 'О проекте', '소개') },
  ];
}

function Header() {
  const { tr } = usePrefs();
  const items = useNavItems();
  const { items: planItems, done } = usePlan();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMenu(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const doneCount = planItems.filter((id) => done[id]).length;

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__row">
        <Link to="/" className="site-header__brand" aria-label="UniBridge — home">
          <Logo />
        </Link>
        <nav className="site-nav" aria-label={tr('Main', 'Основная навигация', '주요 메뉴')}>
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} className="site-nav__link">
              {it.label}
              {it.to === '/my-plan' && planItems.length > 0 && (
                <span className="site-nav__count" aria-label={tr(`${doneCount} of ${planItems.length} done`, `${doneCount} из ${planItems.length} выполнено`, `${planItems.length}개 중 ${doneCount}개 완료`)}>
                  {doneCount}/{planItems.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__tools">
          <DirectionSwitch />
          <LocaleSwitch />
          <button type="button" className="icon-btn site-header__menu" onClick={() => setMenu(true)} aria-label={tr('Open menu', 'Открыть меню', '메뉴 열기')}>
            <Menu size={22} />
          </button>
        </div>
      </div>
      <Sheet open={menu} onClose={() => setMenu(false)} title={tr('Menu', 'Меню', '메뉴')} variant="side">
        <nav className="mobile-menu" aria-label={tr('Main', 'Основная навигация', '주요 메뉴')}>
          <NavLink to="/" end>{tr('Home', 'Главная', '홈')}</NavLink>
          {items.map((it) => (
            <NavLink key={it.to} to={it.to}>
              {it.label}
            </NavLink>
          ))}
          <NavLink to="/start">{tr('Get started', 'Начать', '시작하기')}</NavLink>
          <NavLink to="/contact">{tr('Contact', 'Связаться', '문의하기')}</NavLink>
        </nav>
        <div className="mobile-menu__prefs">
          <p className="label">{tr('Study direction', 'Направление', '유학 방향')}</p>
          <DirectionSwitch size="lg" />
          <p className="label">{tr('Language', 'Язык', '언어')}</p>
          <LocaleSwitch />
        </div>
      </Sheet>
    </header>
  );
}

/* ------------------------------------------------------------- Bottom nav */

function BottomNav() {
  const { tr } = usePrefs();
  const items = [
    { to: '/', label: tr('Home', 'Главная', '홈'), icon: Home, end: true },
    { to: '/life', label: tr('Life', 'Жизнь', '생활'), icon: Languages },
    { to: '/universities', label: tr('Universities', 'Вузы', '대학'), icon: Building2 },
    { to: '/guides', label: tr('Guides', 'Гайды', '가이드'), icon: BookOpen },
    { to: '/my-plan', label: tr('My plan', 'Мой план', '내 계획'), icon: ListChecks },
  ];
  return (
    <nav className="bottom-nav" aria-label={tr('Quick navigation', 'Быстрая навигация', '빠른 이동')}>
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

/* ----------------------------------------------------------------- Footer */

function Footer() {
  const { tr } = usePrefs();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__about">
            <Logo inverse />
            <p>
              {tr(
                'A guide for students moving between Kyrgyzstan and South Korea. Built as a HUSS Global Capstone Design project.',
                'Гид для студентов, которые едут учиться между Кыргызстаном и Южной Кореей. Проект HUSS Global Capstone Design.',
                '키르기스스탄과 한국을 오가는 학생을 위한 안내서예요. HUSS Global Capstone Design 프로젝트로 만들었어요.',
              )}
            </p>
            <p className="site-footer__words" aria-hidden="true">
              <span lang="ky">көпүрө</span>
              <span lang="ko">다리</span>
              <span lang="en">bridge</span>
            </p>
          </div>
          <div>
            <h2 className="site-footer__h">{tr('Explore', 'Обзор', '둘러보기')}</h2>
            <ul>
              <li><Link to="/life">{tr('Life Translator', 'Переводчик жизни', '생활 번역기')}</Link></li>
              <li><Link to="/universities">{tr('Universities', 'Университеты', '대학')}</Link></li>
              <li><Link to="/scholarships">{tr('Scholarships', 'Стипендии', '장학금')}</Link></li>
              <li><Link to="/start">{tr('Get started', 'Начать', '시작하기')}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">{tr('Resources', 'Ресурсы', '자료')}</h2>
            <ul>
              <li><Link to="/guides">{tr('Admission guides', 'Гайды по поступлению', '입학 가이드')}</Link></li>
              <li><Link to="/guides/prepare-arrival">{tr('Visa & arrival', 'Виза и приезд', '비자와 입국')}</Link></li>
              <li><Link to="/my-plan">{tr('My plan', 'Мой план', '내 계획')}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">{tr('Project', 'Проект', '프로젝트')}</h2>
            <ul>
              <li><Link to="/about">{tr('About & sources', 'О проекте и источниках', '소개와 출처')}</Link></li>
              <li><Link to="/contact">{tr('Report an error', 'Сообщить об ошибке', '오류 알리기')}</Link></li>
              <li><a href="https://github.com/zeuscode-tech/UniBridge" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 UniBridge</p>
          <p>
            {tr(
              'Independent information project. Not affiliated with any university or government body. Applications are submitted only through official channels.',
              'Независимый информационный проект. Не связан с вузами и госорганами. Заявки подаются только через официальные каналы.',
              '독립 정보 프로젝트예요. 대학이나 정부 기관과 관련이 없어요. 지원은 공식 채널로만 할 수 있어요.',
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------- Layout */

export function Layout() {
  const { pathname } = useLocation();
  const { tr } = usePrefs();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <>
      {/* A plain #main href would be read as a route by the hash router. */}
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        {tr('Skip to content', 'Перейти к содержимому', '본문으로 건너뛰기')}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
