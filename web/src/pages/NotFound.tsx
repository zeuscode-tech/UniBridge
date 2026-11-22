import { Link } from 'react-router-dom';
import { usePrefs } from '../state/prefs';

export default function NotFound() {
  const { tr } = usePrefs();
  return (
    <div className="container page notfound">
      <svg viewBox="0 0 240 90" className="notfound__arc" aria-hidden="true">
        <path d="M10 80 C 50 10, 90 10, 108 40" />
        <path d="M132 40 C 150 10, 190 10, 230 80" />
        <path d="M4 80 H 236" />
      </svg>
      <p className="eyebrow">404</p>
      <h1 className="h1">{tr('This bridge isn’t built yet', 'Этот мост ещё не построен')}</h1>
      <p className="lead">{tr('The page you were looking for doesn’t exist.', 'Такой страницы нет.')}</p>
      <div className="hero__ctas">
        <Link to="/" className="btn btn--primary">
          {tr('Go home', 'На главную')}
        </Link>
        <Link to="/universities" className="btn btn--secondary">
          {tr('Universities', 'Университеты')}
        </Link>
      </div>
    </div>
  );
}
