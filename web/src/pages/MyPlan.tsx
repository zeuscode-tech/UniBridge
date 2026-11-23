import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, ListChecks, RotateCcw, Trash2, X } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { plan, usePlan } from '../state/plan';
import { CHECKLIST, PHASES } from '../data/checklist';
import { findUniversity, hostOf } from '../data/universities';
import { Breadcrumbs, EmptyState, PageHead } from '../components/ui';
import { Sheet } from '../components/Sheet';

function Ring({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r={r} className="ring__track" />
      <circle cx="40" cy="40" r={r} className="ring__bar" strokeDasharray={c} strokeDashoffset={c * (1 - value)} />
    </svg>
  );
}

export default function MyPlan() {
  const { tr, l, direction } = usePrefs();
  const state = usePlan();
  const [confirm, setConfirm] = useState(false);

  const saved = state.saved.map(findUniversity).filter(Boolean) as NonNullable<ReturnType<typeof findUniversity>>[];
  const items = CHECKLIST.filter((c) => state.items.includes(c.id));
  const doneCount = items.filter((c) => state.done[c.id]).length;
  const progress = items.length ? doneCount / items.length : 0;

  if (!items.length && !saved.length) {
    return (
      <div className="page page--canvas">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: tr('Home', 'Главная', '홈'), to: '/' }, { label: tr('My plan', 'Мой план', '내 계획') }]} />
          <PageHead title={tr('My admission plan', 'Мой план поступления', '내 입학 계획')} />
          <div className="card">
            <EmptyState
              icon={<ListChecks size={30} />}
              title={tr('You don’t have an admission plan yet', 'У тебя пока нет плана поступления', '아직 입학 계획이 없어요')}
              text={tr(
                'Pick a university or start from the basic list of steps. Everything stays in this browser.',
                'Выбери университет или начни с базового списка шагов. Всё хранится в этом браузере.',
                '대학을 고르거나 기본 단계 목록으로 시작하세요. 모든 내용은 이 브라우저에만 저장돼요.',
              )}
              action={
                <div className="empty__actions">
                  <button type="button" className="btn btn--primary" onClick={() => plan.start()}>
                    {tr('Create my plan', 'Составить план', '계획 만들기')}
                  </button>
                  <Link to="/universities" className="btn btn--secondary">
                    {tr('Browse universities', 'Смотреть вузы', '대학 둘러보기')}
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--canvas">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная', '홈'), to: '/' }, { label: tr('My plan', 'Мой план', '내 계획') }]} />
        <header className="plan-head">
          <div>
            <h1 className="h1">{tr('My admission plan', 'Мой план поступления', '내 입학 계획')}</h1>
            <p className="lead">
              {direction === 'kg-kr'
                ? tr('Kyrgyzstan → South Korea', 'Кыргызстан → Южная Корея', '키르기스스탄 → 한국')
                : tr('South Korea → Kyrgyzstan', 'Южная Корея → Кыргызстан', '한국 → 키르기스스탄')}
            </p>
          </div>
          {items.length > 0 && (
          <div className="plan-progress card" role="group" aria-label={tr('Preparation progress', 'Прогресс подготовки', '준비 진행률')}>
            <div className="plan-progress__ring">
              <Ring value={progress} />
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div>
              <p className="plan-progress__n">
                {tr(`${doneCount} of ${items.length} steps`, `${doneCount} из ${items.length} шагов`, `${items.length}단계 중 ${doneCount}단계 완료`)}
              </p>
              <p className="hint">{tr('Your preparation — not an official application status.', 'Это твоя подготовка, а не официальный статус заявки.', '내 준비 상황이에요. 공식 지원 상태는 아니에요.')}</p>
            </div>
          </div>
          )}
        </header>

        <div className="plan">
          <div className="plan__main">
            {!items.length && (
              <div className="card pad">
                <p className="body-2">{tr('Add the checklist to track every step.', 'Добавь чек-лист, чтобы отслеживать каждый шаг.', '체크리스트를 추가하면 모든 단계를 챙길 수 있어요.')}</p>
                <button type="button" className="btn btn--primary" onClick={() => plan.start()}>
                  {tr('Add the checklist', 'Добавить чек-лист', '체크리스트 추가')}
                </button>
              </div>
            )}
            {PHASES.map((ph) => {
              const list = items.filter((c) => c.phase === ph.id);
              if (!list.length) return null;
              const phDone = list.filter((c) => state.done[c.id]).length;
              return (
                <section key={ph.id} className="phase" aria-labelledby={`ph-${ph.id}`}>
                  <header className="phase__head">
                    <h2 className="h4" id={`ph-${ph.id}`}>
                      {l(ph.title)}
                    </h2>
                    <span className={`phase__count${phDone === list.length ? ' is-done' : ''}`}>
                      {phDone}/{list.length}
                    </span>
                  </header>
                  <ul className="checklist">
                    {list.map((c) => {
                      const done = !!state.done[c.id];
                      return (
                        <li key={c.id} className={`check-item${done ? ' is-done' : ''}`}>
                          <label className="check-item__main">
                            <input type="checkbox" checked={done} onChange={() => plan.toggle(c.id)} />
                            <span className="check-item__box" aria-hidden="true">
                              <Check size={14} strokeWidth={3} />
                            </span>
                            <span className="check-item__text">
                              <span className="check-item__title">{l(c.title)}</span>
                              <span className="check-item__desc">{l(c.desc)}</span>
                            </span>
                          </label>
                          <div className="check-item__side">
                            {c.guide && (
                              <Link to={`/guides/${c.guide}`} className="link link--sm">
                                {tr('Guide', 'Гайд', '가이드')}
                              </Link>
                            )}
                            <label className="date">
                              <span className="sr-only">{tr('My target date', 'Моя целевая дата', '목표 날짜')}</span>
                              <input type="date" value={state.dates[c.id] ?? ''} onChange={(e) => plan.setDate(c.id, e.target.value)} />
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <aside className="plan__side">
            <section className="card pad">
              <h2 className="h4">
                {tr('Saved universities', 'Сохранённые вузы', '저장한 대학')} <span className="muted">{saved.length}</span>
              </h2>
              {saved.length ? (
                <ul className="saved">
                  {saved.map((u) => (
                    <li key={u.slug}>
                      <Link to={`/universities/${u.slug}`}>
                        <span className={`saved__mark saved__mark--${u.tone}`} aria-hidden="true">
                          {u.monogram.slice(0, 2)}
                        </span>
                        <span>
                          <strong>{u.name}</strong>
                          <span className="muted">{hostOf(u.website)}</span>
                        </span>
                      </Link>
                      <button type="button" className="icon-btn icon-btn--sm" onClick={() => plan.toggleSaved(u.slug)} aria-label={tr(`Remove ${u.name}`, `Убрать ${u.name}`, `${u.name} 삭제`)}>
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="body-2 muted">
                  <Bookmark size={14} aria-hidden="true" /> {tr('Nothing saved yet.', 'Пока ничего не сохранено.', '아직 저장한 대학이 없어요.')}
                </p>
              )}
              <Link to="/universities" className="link link--arrow">
                {tr('Find universities', 'Найти вузы', '대학 찾기')}
              </Link>
            </section>

            <section className="card pad">
              <h2 className="h4">{tr('Where this is stored', 'Где это хранится', '저장 위치')}</h2>
              <p className="body-2">
                {plan.isPersisted()
                  ? tr(
                      'Your plan is saved in this browser. Clearing browser data will remove it.',
                      'План сохранён в этом браузере. При очистке данных браузера он может быть потерян.',
                      '계획은 이 브라우저에 저장돼요. 브라우저 데이터를 지우면 함께 사라져요.',
                    )
                  : tr(
                      'This browser blocks local storage, so the plan will be lost when you close the tab.',
                      'Этот браузер блокирует локальное хранилище — план пропадёт после закрытия вкладки.',
                      '이 브라우저는 로컬 저장소를 막고 있어요. 탭을 닫으면 계획이 사라져요.',
                    )}
              </p>
              <button type="button" className="btn btn--danger-ghost btn--sm" onClick={() => setConfirm(true)}>
                <Trash2 size={16} aria-hidden="true" />
                {tr('Clear plan', 'Очистить план', '계획 지우기')}
              </button>
            </section>
          </aside>
        </div>
      </div>

      <Sheet
        open={confirm}
        onClose={() => setConfirm(false)}
        title={tr('Clear your plan?', 'Очистить план?', '계획을 지울까요?')}
        variant="center"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setConfirm(false)}>
              {tr('Cancel', 'Отмена', '취소')}
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => {
                plan.reset();
                setConfirm(false);
              }}
            >
              <RotateCcw size={16} aria-hidden="true" />
              {tr('Clear everything', 'Очистить всё', '모두 지우기')}
            </button>
          </>
        }
      >
        <p className="body-2">
          {tr(
            'Ticked steps, dates and saved universities will be removed from this browser. This can’t be undone.',
            'Отмеченные шаги, даты и сохранённые вузы будут удалены из этого браузера. Отменить нельзя.',
            '체크한 단계, 날짜, 저장한 대학이 이 브라우저에서 지워져요. 되돌릴 수 없어요.',
          )}
        </p>
      </Sheet>
    </div>
  );
}
