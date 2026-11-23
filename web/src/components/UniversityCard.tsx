import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, BookmarkCheck, MapPin } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { plan, usePlan } from '../state/plan';
import { AFFILIATION_LABEL, TYPE_LABEL, type University } from '../data/universities';
import { StatusBadge } from './ui';

/**
 * Real university names never get an AI campus photo (spec §30.2).
 * Instead each one gets a typographic cover built from its own name.
 */
export function UniCover({ uni, size = 'card' }: { uni: University; size?: 'card' | 'hero' }) {
  const { tr, l } = usePrefs();
  return (
    <div className={`unicover unicover--${uni.tone} unicover--${size}`} aria-hidden="true">
      <svg className="unicover__arc" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M-10 190 C 90 40, 310 40, 410 190" />
        <path d="M-10 210 C 90 70, 310 70, 410 210" />
      </svg>
      <span className={`unicover__mark${uni.country === 'KR' ? ' unicover__mark--kr' : ''}`}>{uni.monogram}</span>
      <span className="unicover__meta">
        {l(uni.city)}, {uni.country === 'KR' ? 'KR' : 'KG'}
        {uni.founded ? `, ${tr(`est. ${uni.founded}`, `осн. ${uni.founded}`, `${uni.founded}년 설립`)}` : ''}
      </span>
    </div>
  );
}

export function UniversityCard({ uni }: { uni: University }) {
  const { tr, l } = usePrefs();
  const { saved } = usePlan();
  const isSaved = saved.includes(uni.slug);

  return (
    <article className="card unicard">
      <Link to={`/universities/${uni.slug}`} className="unicard__media" tabIndex={-1} aria-hidden="true">
        <UniCover uni={uni} />
      </Link>
      <div className="unicard__body">
        <p className="unicard__where">
          <MapPin size={14} aria-hidden="true" />
          {l(uni.city)}, {uni.country === 'KR' ? tr('South Korea', 'Южная Корея', '한국') : tr('Kyrgyzstan', 'Кыргызстан', '키르기스스탄')}
          <span className="dot" aria-hidden="true" />
          {l(TYPE_LABEL[uni.type])}
        </p>
        {uni.affiliation && (
          <p className="unicard__affil">
            <span className="tag tag--soft">{l(AFFILIATION_LABEL[uni.affiliation])}</span>
          </p>
        )}
        <h3 className="unicard__name">
          <Link to={`/universities/${uni.slug}`} className="stretched">
            {uni.name}
          </Link>
        </h3>
        <p className="unicard__local" lang={uni.country === 'KR' ? 'ko' : 'ru'}>
          {uni.localName}
        </p>
        <dl className="unicard__facts">
          <div>
            <dt>{tr('Levels', 'Уровни', '과정')}</dt>
            <dd className="muted">{tr('Not specified', 'Не указано', '정보 없음')}</dd>
          </div>
          <div>
            <dt>{tr('Languages', 'Языки', '언어')}</dt>
            <dd className="muted">{tr('Not specified', 'Не указано', '정보 없음')}</dd>
          </div>
        </dl>
        <div className="unicard__foot">
          <StatusBadge status={uni.status} />
          <button
            type="button"
            className={`chip-btn${isSaved ? ' is-on' : ''}`}
            aria-pressed={isSaved}
            onClick={() => plan.toggleSaved(uni.slug)}
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {isSaved ? tr('In my plan', 'В плане', '내 계획에 있음') : tr('Add to plan', 'В план', '계획에 추가')}
          </button>
        </div>
      </div>
      <span className="unicard__go" aria-hidden="true">
        <ArrowRight size={18} />
      </span>
    </article>
  );
}
