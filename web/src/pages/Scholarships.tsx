import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Building, Landmark, Repeat, SearchX } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { KIND_LABEL, LEVEL_LABEL, SCHOLARSHIPS, type FundingKind, type Scholarship } from '../data/scholarships';
import { Breadcrumbs, EmptyState, ExternalLink, PageHead, StatusBadge } from '../components/ui';
import { Sheet } from '../components/Sheet';

const KIND_ICON = { government: Landmark, university: Building, exchange: Repeat } as const;

function Details({ s }: { s: Scholarship }) {
  const { tr, l } = usePrefs();
  const unknown = <span className="muted">{tr('Not confirmed', 'Не подтверждено')}</span>;
  return (
    <div className="sch-details">
      <p className="body-2 muted">{l(s.provider)}</p>
      <StatusBadge status={s.status} />
      <section>
        <h3 className="label">{tr('Who it is for', 'Кому подходит')}</h3>
        <p className="body-2">{l(s.who)}</p>
      </section>
      <dl className="kv kv--rows">
        <div>
          <dt>{tr('Levels', 'Уровни')}</dt>
          <dd>{s.levels ? s.levels.map((x) => l(LEVEL_LABEL[x])).join(', ') : tr('Depends on the university', 'Зависит от вуза')}</dd>
        </div>
        <div>
          <dt>{tr('Coverage', 'Покрытие')}</dt>
          <dd>{s.coverage ? l(s.coverage) : unknown}</dd>
        </div>
        <div>
          <dt>{tr('Deadline', 'Дедлайн')}</dt>
          <dd>{s.deadline ?? <span className="muted">{tr('To be confirmed', 'Срок уточняется')}</span>}</dd>
        </div>
      </dl>
      <section>
        <h3 className="label">{tr('How to apply', 'Как подать')}</h3>
        <p className="body-2">{l(s.howToApply)}</p>
      </section>
      <section>
        <h3 className="label">{tr('Sources', 'Источники')}</h3>
        {s.source ? (
          <ExternalLink href={s.source.url}>{s.source.label}</ExternalLink>
        ) : (
          <p className="body-2 muted">{tr('The official page of the university you choose.', 'Официальная страница выбранного вуза.')}</p>
        )}
      </section>
      <p className="hint">
        {tr('UniBridge never shows chances of winning or “guaranteed” grants.', 'UniBridge не показывает «шансы» и «гарантированные» гранты.')}
      </p>
    </div>
  );
}

export default function Scholarships() {
  const { tr, l, direction } = usePrefs();
  const [params, setParams] = useSearchParams();
  const kinds = params.getAll('kind') as FundingKind[];
  const openSlug = params.get('open');
  const open = SCHOLARSHIPS.find((s) => s.slug === openSlug) ?? null;

  const pool = SCHOLARSHIPS.filter((s) => s.directions.includes(direction));
  const list = pool.filter((s) => (kinds.length ? kinds.includes(s.kind) : true));
  const allKinds = Array.from(new Set(pool.map((s) => s.kind)));

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mut(next);
    setParams(next, { replace: true });
  };

  return (
    <div className="page page--canvas">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная'), to: '/' }, { label: tr('Scholarships', 'Стипендии') }]} />
        <PageHead
          eyebrow={direction === 'kg-kr' ? 'KG → KR' : 'KR → KG'}
          title={tr('Scholarships and funding', 'Стипендии и финансирование')}
          lead={tr(
            'Explore funding programmes and check their terms with the official provider.',
            'Изучай программы поддержки обучения и проверяй условия в официальных источниках.',
          )}
        />

        <div className="filter-row" role="group" aria-label={tr('Type of funding', 'Тип финансирования')}>
          <button type="button" className={`chip${kinds.length === 0 ? ' is-on' : ''}`} aria-pressed={kinds.length === 0} onClick={() => update((p) => p.delete('kind'))}>
            {tr('All', 'Все')} <span className="chip__n">{pool.length}</span>
          </button>
          {allKinds.map((k) => {
            const on = kinds.includes(k);
            return (
              <button
                key={k}
                type="button"
                className={`chip${on ? ' is-on' : ''}`}
                aria-pressed={on}
                onClick={() =>
                  update((p) => {
                    p.delete('kind');
                    (on ? kinds.filter((x) => x !== k) : [...kinds, k]).forEach((x) => p.append('kind', x));
                  })
                }
              >
                {l(KIND_LABEL[k])} <span className="chip__n">{pool.filter((s) => s.kind === k).length}</span>
              </button>
            );
          })}
        </div>

        {list.length ? (
          <div className="sch-grid">
            {list.map((s) => {
              const Icon = KIND_ICON[s.kind];
              return (
                <article key={s.slug} className="card sch">
                  <div className="sch__top">
                    <span className="sch__icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="tag tag--soft">{l(KIND_LABEL[s.kind])}</span>
                  </div>
                  <h2 className="h4">{l(s.title)}</h2>
                  <p className="body-2 muted">{l(s.provider)}</p>
                  <p className="body-2 sch__who">{l(s.who)}</p>
                  <dl className="kv">
                    <div>
                      <dt>{tr('Deadline', 'Дедлайн')}</dt>
                      <dd>{s.deadline ?? tr('To be confirmed', 'Уточняется')}</dd>
                    </div>
                    <div>
                      <dt>{tr('Coverage', 'Покрытие')}</dt>
                      <dd>{s.coverage ? l(s.coverage) : tr('Not confirmed', 'Не подтверждено')}</dd>
                    </div>
                  </dl>
                  <div className="sch__foot">
                    <StatusBadge status={s.status} />
                    <button type="button" className="link link--arrow stretched" onClick={() => update((p) => p.set('open', s.slug))}>
                      {tr('Details', 'Подробнее')}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<SearchX size={28} />}
            title={tr('Nothing here for this filter', 'По этому фильтру ничего нет')}
            text={tr('Try another type of funding.', 'Попробуй другой тип финансирования.')}
            action={
              <button type="button" className="btn btn--secondary" onClick={() => update((p) => p.delete('kind'))}>
                {tr('Show all', 'Показать все')}
              </button>
            }
          />
        )}
      </div>

      <Sheet open={!!open} onClose={() => update((p) => p.delete('open'))} title={open ? l(open.title) : ''} variant="side">
        {open && <Details s={open} />}
      </Sheet>
    </div>
  );
}
