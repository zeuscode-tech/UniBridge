import { useState, type KeyboardEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookmarkCheck, Bookmark, ExternalLink as ExtIcon, Info, Globe } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { plan, usePlan } from '../state/plan';
import { AFFILIATION_LABEL, findUniversity, hostOf, TYPE_LABEL } from '../data/universities';
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
  const country = uni.country === 'KR' ? tr('South Korea', 'Южная Корея', '한국') : tr('Kyrgyzstan', 'Кыргызстан', '키르기스스탄');
  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: tr('Overview', 'Обзор', '개요') },
    { id: 'programs', label: tr('Programmes', 'Программы', '프로그램') },
    { id: 'admission', label: tr('Admission', 'Поступление', '입학') },
    { id: 'scholarships', label: tr('Scholarships', 'Стипендии', '장학금') },
    { id: 'life', label: tr('Student life', 'Студенческая жизнь', '학생 생활') },
  ];
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setTab(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };
  const notSet = <span className="muted">{tr('Not verified', 'Не проверено', '확인되지 않음')}</span>;
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
            { label: tr('Universities', 'Университеты', '대학'), to: '/universities' },
            { label: country, to: `/universities?to=${uni.country === 'KR' ? 'kr' : 'kg'}` },
            { label: uni.name },
          ]}
        />
        <UniCover uni={uni} size="hero" />

        <header className="uni-head">
          <div className="uni-head__text">
            <p className="uni-head__meta">
              <span className="tag">{country}</span>
              {uni.affiliation && <span className="tag tag--soft">{l(AFFILIATION_LABEL[uni.affiliation])}</span>}
              <span>{l(uni.city)}</span>
              <span className="dot" aria-hidden="true" />
              <span>{l(TYPE_LABEL[uni.type])}</span>
              {uni.founded && (
                <>
                  <span className="dot" aria-hidden="true" />
                  <span>{tr(`Founded ${uni.founded}`, `Осн. в ${uni.founded}`, `${uni.founded}년 설립`)}</span>
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
              {isSaved ? tr('Saved to my plan', 'В моём плане', '내 계획에 저장됨') : tr('Add to my plan', 'Добавить в мой план', '내 계획에 추가')}
            </button>
            <ExternalLink href={uni.website} className="btn btn--secondary">
              {tr('Official website', 'Официальный сайт', '공식 웹사이트')}
            </ExternalLink>
          </div>
        </header>

        <div className="detail">
          <div className="detail__main">
            <div className="tabs" role="tablist" aria-label={tr('University sections', 'Разделы', '대학 정보 메뉴')}>
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
                    <h2 className="h3">{tr('About', 'Об университете', '대학 소개')}</h2>
                    <p className="body-1">{l(uni.summary)}</p>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">{tr('Location', 'Расположение', '위치')}</th>
                          <td>
                            {l(uni.city)}, {country}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Type', 'Тип', '유형')}</th>
                          <td>{l(TYPE_LABEL[uni.type])}</td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Languages of instruction', 'Языки обучения', '수업 언어')}</th>
                          <td>{notSet}</td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Degree levels', 'Уровни обучения', '학위 과정')}</th>
                          <td>{notSet}</td>
                        </tr>
                        <tr>
                          <th scope="row">{tr('Official website', 'Официальный сайт', '공식 웹사이트')}</th>
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
                  <h2 className="h3">{tr('Programmes', 'Программы', '프로그램')}</h2>
                  <p className="body-2">
                    {tr(
                      'No programme has been verified yet. When it is, each one will show its level, language, duration and tuition with a source.',
                      'Ни одна программа ещё не проверена. После проверки у каждой будут уровень, язык, длительность и стоимость с источником.',
                      '아직 확인된 프로그램이 없어요. 확인되면 프로그램마다 과정, 언어, 기간, 학비를 출처와 함께 보여 드릴게요.',
                    )}
                  </p>
                  <div className="table-wrap">
                    <table className="table table--grid">
                      <thead>
                        <tr>
                          <th>{tr('Programme', 'Программа', '프로그램')}</th>
                          <th>{tr('Level', 'Уровень', '과정')}</th>
                          <th>{tr('Language', 'Язык', '언어')}</th>
                          <th>{tr('Duration', 'Срок', '기간')}</th>
                          <th>{tr('Tuition', 'Стоимость', '학비')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table__empty">
                          <td colSpan={5}>{tr('No verified programmes yet', 'Проверенных программ пока нет', '아직 확인된 프로그램이 없어요')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ExternalLink href={uni.website}>{tr('Browse programmes on the official site', 'Смотреть программы на официальном сайте', '공식 사이트에서 프로그램 보기')}</ExternalLink>
                </section>
              )}

              {tab === 'admission' && (
                <section className="card pad">
                  <h2 className="h3">{tr('Admission requirements', 'Требования к поступлению', '입학 요건')}</h2>
                  <div className="notice notice--warn">
                    <Info size={18} aria-hidden="true" />
                    <p>
                      {tr(
                        'Requirements differ by programme, level and intake year. University-wide rules don’t automatically apply to every programme.',
                        'Требования зависят от программы, уровня и года набора. Общие правила вуза не обязательно действуют для каждой программы.',
                        '요건은 프로그램, 과정, 입학 연도마다 달라요. 대학 전체 규정이 모든 프로그램에 그대로 적용되지는 않아요.',
                      )}
                    </p>
                  </div>
                  {checkRows([
                    [tr('Academic', 'Академические', '학업'), tr('Previous education, grades, prerequisite subjects', 'Предыдущее образование, оценки, профильные предметы', '이전 학력, 성적, 선수 과목')],
                    [tr('Language', 'Языковые', '어학'), tr('Accepted test and minimum level', 'Принимаемый тест и минимальный уровень', '인정하는 시험과 최소 기준')],
                    [tr('Documents', 'Документы', '서류'), tr('Official list for your programme', 'Официальный список для твоей программы', '지원하는 프로그램의 공식 서류 목록')],
                    [tr('Application stages', 'Этапы подачи', '지원 단계'), tr('Portal, interview, results', 'Портал, собеседование, результаты', '온라인 접수, 면접, 결과 발표')],
                    [tr('Dates', 'Сроки', '일정'), tr('Only from this year’s admission guide', 'Только из руководства этого года', '올해 모집 요강으로만 확인')],
                  ])}
                  <Link to="/guides/check-requirements" className="link link--arrow">
                    {tr('How to check requirements', 'Как проверять требования', '요건 확인하는 법')}
                  </Link>
                </section>
              )}

              {tab === 'scholarships' && (
                <section className="card pad">
                  <h2 className="h3">{tr('Related funding', 'Связанное финансирование', '관련 재정 지원')}</h2>
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
                  <h2 className="h3">{tr('Student life', 'Студенческая жизнь', '학생 생활')}</h2>
                  {checkRows([
                    [tr('Dormitory', 'Общежитие', '기숙사'), tr('Availability for international students', 'Доступность для иностранных студентов', '외국인 학생 입주 가능 여부')],
                    [tr('International office', 'Международный офис', '국제교류처'), tr('Contacts and support services', 'Контакты и службы поддержки', '연락처와 지원 서비스')],
                    [tr('Orientation', 'Ориентация', '오리엔테이션'), tr('Dates of the welcome programme', 'Даты вводной программы', '신입생 환영 프로그램 일정')],
                  ])}
                  <Link to="/guides/prepare-arrival" className="link link--arrow">
                    {tr('Preparing your arrival', 'Подготовка к переезду', '출국 전 준비하기')}
                  </Link>
                </section>
              )}
            </div>
          </div>

          <aside className="detail__side">
            <div className="card pad sticky-panel">
              <h2 className="h4">{tr('Next step', 'Следующий шаг', '다음 단계')}</h2>
              <dl className="kv kv--rows">
                <div>
                  <dt>{tr('Information status', 'Статус информации', '정보 상태')}</dt>
                  <dd>
                    <StatusBadge status={uni.status} />
                  </dd>
                </div>
                <div>
                  <dt>{tr('Last checked', 'Последняя проверка', '마지막 확인')}</dt>
                  <dd>{uni.lastVerified ?? '—'}</dd>
                </div>
              </dl>
              <ExternalLink href={uni.website} className="btn btn--primary btn--block">
                {tr('Go to the official site', 'Перейти на официальный сайт', '공식 사이트로 가기')}
              </ExternalLink>
              <p className="hint">
                {tr(
                  'Applications are submitted on the university’s own site, not through UniBridge.',
                  'Заявка подаётся на сайте университета, а не через UniBridge.',
                  '지원은 UniBridge가 아니라 대학 공식 사이트에서 해요.',
                )}
              </p>
              <h3 className="label">{tr('Sources', 'Источники', '출처')}</h3>
              <ul className="sources">
                <li>
                  <Globe size={16} aria-hidden="true" />
                  <a href={uni.website} target="_blank" rel="noopener noreferrer">
                    {hostOf(uni.website)}
                    <ExtIcon size={13} aria-hidden="true" />
                  </a>
                  <span className="muted">{tr('Official website', 'Официальный сайт', '공식 웹사이트')}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
