import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeftRight, BookOpen, Building2, Home, ListChecks, Menu } from 'lucide-react';
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
      ? tr('Direction: Kyrgyzstan to South Korea. Switch', 'Направление: из Кыргызстана в Корею. Сменить')
      : tr('Direction: South Korea to Kyrgyzstan. Switch', 'Направление: из Кореи в Кыргызстан. Сменить');
  return (
    <button type="button" className={`dirswitch dirswitch--${size}`} onClick={toggleDirection} aria-label={label} title={label}>
      <span className="dirswitch__code" key={from + 'a'}>{from}</span>
      <ArrowLeftRight size={size === 'lg' ? 18 : 15} strokeWidth={2} aria-hidden="true" className="dirswitch__icon" />
      <span className="dirswitch__code dirswitch__code--to" key={to + 'b'}>{to}</span>
    </button>
  );
}

/* ---------------------------------------------------------- Locale switch */

export function LocaleSwitch() {
  const { locale, setLocale, tr } = usePrefs();
  return (
    <div className="segmented" role="group" aria-label={tr('Language', 'Язык')}>
      {(['en', 'ru'] as const).map((l) => (
        <button key={l} type="button" aria-pressed={locale === l} onClick={() => setLocale(l)} lang={l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- Header */

function useNavItems() {
  const { tr } = usePrefs();
  return [
    { to: '/universities', label: tr('Universities', 'Университеты') },
    { to: '/scholarships', label: tr('Scholarships', 'Стипендии') },
    { to: '/guides', label: tr('Guides', 'Гайды') },
    { to: '/my-plan', label: tr('My plan', 'Мой план') },
    { to: '/about', label: tr('About', 'О проекте') },
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
        <nav className="site-nav" aria-label={tr('Main', 'Основная навигация')}>
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} className="site-nav__link">
              {it.label}
              {it.to === '/my-plan' && planItems.length > 0 && (
                <span className="site-nav__count" aria-label={tr(`${doneCount} of ${planItems.length} done`, `${doneCount} из ${planItems.length} выполнено`)}>
                  {doneCount}/{planItems.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__tools">
          <DirectionSwitch />
          <LocaleSwitch />
          <button type="button" className="icon-btn site-header__menu" onClick={() => setMenu(true)} aria-label={tr('Open menu', 'Открыть меню')}>
            <Menu size={22} />
          </button>
        </div>
      </div>
      <Sheet open={menu} onClose={() => setMenu(false)} title={tr('Menu', 'Меню')} variant="side">
        <nav className="mobile-menu" aria-label={tr('Main', 'Основная навигация')}>
          <NavLink to="/" end>{tr('Home', 'Главная')}</NavLink>
          {items.map((it) => (
            <NavLink key={it.to} to={it.to}>
              {it.label}
            </NavLink>
          ))}
          <NavLink to="/start">{tr('Get started', 'Начать')}</NavLink>
          <NavLink to="/contact">{tr('Contact', 'Связаться')}</NavLink>
        </nav>
        <div className="mobile-menu__prefs">
          <p className="label">{tr('Study direction', 'Направление')}</p>
          <DirectionSwitch size="lg" />
          <p className="label">{tr('Language', 'Язык')}</p>
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
    { to: '/', label: tr('Home', 'Главная'), icon: Home, end: true },
    { to: '/universities', label: tr('Universities', 'Вузы'), icon: Building2 },
    { to: '/guides', label: tr('Guides', 'Гайды'), icon: BookOpen },
    { to: '/my-plan', label: tr('My plan', 'Мой план'), icon: ListChecks },
  ];
  return (
    <nav className="bottom-nav" aria-label={tr('Quick navigation', 'Быстрая навигация')}>
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
              )}
            </p>
            <p className="site-footer__words" aria-hidden="true">
              <span lang="ky">көпүрө</span>
              <span lang="ko">다리</span>
              <span lang="en">bridge</span>
            </p>
          </div>
          <div>
            <h2 className="site-footer__h">{tr('Explore', 'Обзор')}</h2>
            <ul>
              <li><Link to="/universities">{tr('Universities', 'Университеты')}</Link></li>
              <li><Link to="/scholarships">{tr('Scholarships', 'Стипендии')}</Link></li>
              <li><Link to="/start">{tr('Get started', 'Начать')}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">{tr('Resources', 'Ресурсы')}</h2>
            <ul>
              <li><Link to="/guides">{tr('Admission guides', 'Гайды по поступлению')}</Link></li>
              <li><Link to="/guides/prepare-arrival">{tr('Visa & arrival', 'Виза и приезд')}</Link></li>
              <li><Link to="/my-plan">{tr('My plan', 'Мой план')}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">{tr('Project', 'Проект')}</h2>
            <ul>
              <li><Link to="/about">{tr('About & sources', 'О проекте и источниках')}</Link></li>
              <li><Link to="/contact">{tr('Report an error', 'Сообщить об ошибке')}</Link></li>
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
        {tr('Skip to content', 'Перейти к содержимому')}
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
