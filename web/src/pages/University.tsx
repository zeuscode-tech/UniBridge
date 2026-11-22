import { useState, type KeyboardEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookmarkCheck, Bookmark, ExternalLink as ExtIcon, Info, Globe } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { plan, usePlan } from '../state/plan';
import { findUniversity, hostOf, TYPE_LABEL } from '../data/universities';
import { SCHOLARSHIPS, KIND_LABEL } from '../data/scholarships';
import { UniCover } from '../components/UniversityCard';
import { Breadcrumbs, ExternalLink, StatusBadge } from '../components/ui';
import NotFound from './NotFound';

type Tab = 'overview' | 'programs' | 'admission' | 'scholarships' | 'life';

export default function University() {
  const { slug = '' } = useParams();
  const uni = findUniversity(slug);
  const { tr, l } = usePrefs();
  const { saved } = usePlan();
  const [tab, setTab] = useState<Tab>('overview');

  if (!uni) return <NotFound />;

  const isSaved = saved.includes(uni.slug);
  const country = uni.country === 'KR' ? tr('South Korea', 'Южная Корея') : tr('Kyrgyzstan', 'Кыргызстан');
  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: tr('Overview', 'Обзор') },
    { id: 'programs', label: tr('Programmes', 'Программы') },
    { id: 'admission', label: tr('Admission', 'Поступление') },
    { id: 'scholarships', label: tr('Scholarships', 'Стипендии') },
    { id: 'life', label: tr('Student life', 'Студенческая жизнь') },
  ];
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setTab(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };
  const notSet = <span className="muted">{tr('Not verified', 'Не проверено')}</span>;
  const related = SCHOLARSHIPS.filter((s) => s.directions.includes(uni.country === 'KR' ? 'kg-kr' : 'kr-kg'));

  const checkRows = (rows: [string, string][]) => (
    <table className="table">
      <tbody>
        {rows.map(([k, hint]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>
              {notSet}
              <span className="table__hint">{hint}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: tr('Universities', 'Университеты'), to: '/universities' },
            { label: country, to: `/universities?to=${uni.country === 'KR' ? 'kr' : 'kg'}` },
            { label: uni.name },
          ]}
        />
        <UniCover uni={uni} size="hero" />

        <header className="uni-head">
          <div className="uni-head__text">
            <p className="uni-head__meta">
              <span className="tag">{country}</span>
              <span>{l(uni.city)}</span>
              <span className="dot" aria-hidden="true" />
              <span>{l(TYPE_LABEL[uni.type])}</span>
              {uni.founded && (
                <>
                  <span className="dot" aria-hidden="true" />
                  <span>{tr(`Founded ${uni.founded}`, `Осн. в ${uni.founded}`)}</span>
                </>
              )}
            </p>
            <h1 className="h1">{uni.name}</h1>
            <p className="uni-head__local" lang={uni.country === 'KR' ? 'ko' : 'ru'}>
              {uni.localName}
            </p>
          </div>
          <div className="uni-head__actions">
            <button type="button" className={`btn ${isSaved ? 'btn--secondary' : 'btn--primary'}`} aria-pressed={isSaved} onClick={() => plan.toggleSaved(uni.slug)}>
              {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {isSaved ? tr('Saved to my plan', 'В моём плане') : tr('Add to my plan', 'Добавить в мой план')}
            </button>
            <ExternalLink href={uni.website} className="btn btn--secondary">
              {tr('Official website', 'Официальный сайт')}
            </ExternalLink>
          </div>
        </header>

        <div className="detail">
          <div className="detail__main">
            <div className="tabs" role="tablist" aria-label={tr('University sections', 'Разделы')}>
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="tabpanel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} key={tab}>
              {tab === 'overview' && (
                <>
                  <section className="card pad">
                    <h2 className="h3">{tr('About', 'Об университете')}</h2>
                    <p className="body-1">{l(uni.summary)}</p>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">{tr('Location', 'Расположение')}</th>
                          <td>
                            {l(uni.city)}, {country}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Type', 'Тип')}</th>
                          <td>{l(TYPE_LABEL[uni.type])}</td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Languages of instruction', 'Языки обучения')}</th>
                          <td>{notSet}</td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Degree levels', 'Уровни обучения')}</th>
                          <td>{notSet}</td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Official website', 'Официальный сайт')}</th>
                          <td>
                            <ExternalLink href={uni.website}>{hostOf(uni.website)}</ExternalLink>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </>
              )}

              {tab === 'programs' && (
                <section className="card pad">
                  <h2 className="h3">{tr('Programmes', 'Программы')}</h2>
                  <p className="body-2">
                    {tr(
                      'No programme has been verified yet. When it is, each one will show its level, language, duration and tuition with a source.',
                      'Ни одна программа ещё не проверена. После проверки у каждой будут уровень, язык, длительность и стоимость с источником.',
                    )}
                  </p>
                  <div className="table-wrap">
                    <table className="table table--grid">
                      <thead>
                        <tr>
                          <th>{tr('Programme', 'Программа')}</th>
                          <th>{tr('Level', 'Уровень')}</th>
                          <th>{tr('Language', 'Язык')}</th>
                          <th>{tr('Duration', 'Срок')}</th>
                          <th>{tr('Tuition', 'Стоимость')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table__empty">
                          <td colSpan={5}>{tr('No verified programmes yet', 'Проверенных программ пока нет')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ExternalLink href={uni.website}>{tr('Browse programmes on the official site', 'Смотреть программы на официальном сайте')}</ExternalLink>
                </section>
              )}

              {tab === 'admission' && (
                <section className="card pad">
                  <h2 className="h3">{tr('Admission requirements', 'Требования к поступлению')}</h2>
                  <div className="notice notice--warn">
                    <Info size={18} aria-hidden="true" />
                    <p>
                      {tr(
                        'Requirements differ by programme, level and intake year. University-wide rules don’t automatically apply to every programme.',
                        'Требования зависят от программы, уровня и года набора. Общие правила вуза не обязательно действуют для каждой программы.',
                      )}
                    </p>
                  </div>
                  {checkRows([
                    [tr('Academic', 'Академические'), tr('Previous education, grades, prerequisite subjects', 'Предыдущее образование, оценки, профильные предметы')],
                    [tr('Language', 'Языковые'), tr('Accepted test and minimum level', 'Принимаемый тест и минимальный уровень')],
                    [tr('Documents', 'Документы'), tr('Official list for your programme', 'Официальный список для твоей программы')],
                    [tr('Application stages', 'Этапы подачи'), tr('Portal, interview, results', 'Портал, собеседование, результаты')],
                    [tr('Dates', 'Сроки'), tr('Only from this year’s admission guide', 'Только из руководства этого года')],
                  ])}
                  <Link to="/guides/check-requirements" className="link link--arrow">
                    {tr('How to check requirements', 'Как проверять требования')} →
                  </Link>
                </section>
              )}

              {tab === 'scholarships' && (
                <section className="card pad">
                  <h2 className="h3">{tr('Related funding', 'Связанное финансирование')}</h2>
                  <ul className="rel-list">
                    {related.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/scholarships?open=${s.slug}`}>
                          <span className="tag tag--soft">{l(KIND_LABEL[s.kind])}</span>
                          <strong>{l(s.title)}</strong>
                          <span className="muted">{l(s.provider)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {tab === 'life' && (
                <section className="card pad">
                  <h2 className="h3">{tr('Student life', 'Студенческая жизнь')}</h2>
                  {checkRows([
                    [tr('Dormitory', 'Общежитие'), tr('Availability for international students', 'Доступность для иностранных студентов')],
                    [tr('International office', 'Международный офис'), tr('Contacts and support services', 'Контакты и службы поддержки')],
                    [tr('Orientation', 'Ориентация'), tr('Dates of the welcome programme', 'Даты вводной программы')],
                  ])}
                  <Link to="/guides/prepare-arrival" className="link link--arrow">
                    {tr('Preparing your arrival', 'Подготовка к переезду')} →
                  </Link>
                </section>
              )}
            </div>
          </div>

          <aside className="detail__side">
            <div className="card pad sticky-panel">
              <h2 className="h4">{tr('Next step', 'Следующий шаг')}</h2>
              <dl className="kv kv--rows">
                <div>
                  <dt>{tr('Information status', 'Статус информации')}</dt>
                  <dd>
                    <StatusBadge status={uni.status} />
                  </dd>
                </div>
                <div>
                  <dt>{tr('Last checked', 'Последняя проверка')}</dt>
                  <dd>{uni.lastVerified ?? '—'}</dd>
                </div>
              </dl>
              <ExternalLink href={uni.website} className="btn btn--primary btn--block">
                {tr('Go to the official site', 'Перейти на официальный сайт')}
              </ExternalLink>
              <p className="hint">
                {tr(
                  'Applications are submitted on the university’s own site, not through UniBridge.',
                  'Заявка подаётся на сайте университета, а не через UniBridge.',
                )}
              </p>
              <h3 className="label">{tr('Sources', 'Источники')}</h3>
              <ul className="sources">
                <li>
                  <Globe size={16} aria-hidden="true" />
                  <a href={uni.website} target="_blank" rel="noopener noreferrer">
                    {hostOf(uni.website)}
                    <ExtIcon size={13} aria-hidden="true" />
                  </a>
                  <span className="muted">{tr('Official website', 'Официальный сайт')}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
