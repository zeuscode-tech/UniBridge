import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, SearchX, SlidersHorizontal, X, Search } from 'lucide-react';
import { destinationOf, plural, usePrefs } from '../state/prefs';
import { TYPE_LABEL, UNIVERSITIES, type UniType } from '../data/universities';
import { UniversityCard } from '../components/UniversityCard';
import { Breadcrumbs, EmptyState, PageHead } from '../components/ui';
import { Sheet } from '../components/Sheet';

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

export default function Universities() {
  const { tr, l, locale, direction, setDirection } = usePrefs();
  const [params, setParams] = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  // A shared link can carry the direction: ?to=kr or ?to=kg.
  useEffect(() => {
    const to = params.get('to');
    if (to === 'kr' && direction !== 'kg-kr') setDirection('kg-kr');
    if (to === 'kg' && direction !== 'kr-kg') setDirection('kr-kg');
  }, []);

  const dest = destinationOf(direction);
  const q = params.get('q') ?? '';
  const cities = params.getAll('city');
  const types = params.getAll('type') as UniType[];
  const sort = params.get('sort') === 'city' ? 'city' : 'name';

  const pool = UNIVERSITIES.filter((u) => u.country === dest);
  const cityOptions = Array.from(new Map(pool.map((u) => [u.city.en, u.city])).values());
  const typeOptions = Array.from(new Set(pool.map((u) => u.type)));

  const setParam = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mut(next);
    next.set('to', dest === 'KR' ? 'kr' : 'kg');
    setParams(next, { replace: true });
  };
  const toggleMulti = (key: string, value: string) =>
    setParam((p) => {
      const cur = p.getAll(key);
      p.delete(key);
      (cur.includes(value) ? cur.filter((c) => c !== value) : [...cur, value]).forEach((v) => p.append(key, v));
    });
  const reset = () => setParams(new URLSearchParams({ to: dest === 'KR' ? 'kr' : 'kg' }), { replace: true });

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return pool
      .filter((u) => (cities.length ? cities.includes(u.city.en) : true))
      .filter((u) => (types.length ? types.includes(u.type) : true))
      .filter((u) =>
        nq ? [u.name, u.localName, u.monogram, u.city.en, u.city.ru].some((s) => norm(s).includes(nq)) : true,
      )
      .sort((a, b) =>
        sort === 'city' ? a.city.en.localeCompare(b.city.en) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name),
      );
  }, [dest, q, cities.join(), types.join(), sort]);

  const activeCount = cities.length + types.length;

  const filters = (
    <div className="filters">
      <fieldset className="filters__group">
        <legend className="label">{tr('Destination', 'Страна обучения')}</legend>
        <div className="seg-tabs" role="radiogroup">
          {(['kg-kr', 'kr-kg'] as const).map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={direction === d}
              className={direction === d ? 'is-on' : ''}
              onClick={() => {
                setDirection(d);
                setParams(new URLSearchParams({ to: d === 'kg-kr' ? 'kr' : 'kg' }), { replace: true });
              }}
            >
              {d === 'kg-kr' ? tr('South Korea', 'Южная Корея') : tr('Kyrgyzstan', 'Кыргызстан')}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="filters__group">
        <legend className="label">{tr('City', 'Город')}</legend>
        {cityOptions.map((c) => (
          <label key={c.en} className="check">
            <input type="checkbox" checked={cities.includes(c.en)} onChange={() => toggleMulti('city', c.en)} />
            <span>{l(c)}</span>
            <span className="check__count">{pool.filter((u) => u.city.en === c.en).length}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="filters__group">
        <legend className="label">{tr('Type', 'Тип')}</legend>
        {typeOptions.map((t) => (
          <label key={t} className="check">
            <input type="checkbox" checked={types.includes(t)} onChange={() => toggleMulti('type', t)} />
            <span>{l(TYPE_LABEL[t])}</span>
            <span className="check__count">{pool.filter((u) => u.type === t).length}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="filters__group filters__group--muted">
        <legend className="label">{tr('Level · language · tuition', 'Уровень · язык · стоимость')}</legend>
        <p className="hint">
          {tr(
            'Available once programme data is verified. We don’t filter on guesses.',
            'Появятся после проверки данных по программам. Мы не фильтруем по догадкам.',
          )}
        </p>
      </fieldset>
      {activeCount > 0 && (
        <button type="button" className="link" onClick={reset}>
          {tr('Reset filters', 'Сбросить фильтры')}
        </button>
      )}
    </div>
  );

  return (
    <div className="page page--canvas">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная'), to: '/' }, { label: tr('Universities', 'Университеты') }]} />
        <PageHead
          title={tr('Universities', 'Университеты')}
          lead={
            dest === 'KR'
              ? tr('Studying in South Korea, from Kyrgyzstan.', 'Учёба в Южной Корее для студентов из Кыргызстана.')
              : tr('Studying in Kyrgyzstan, from South Korea.', 'Учёба в Кыргызстане для студентов из Кореи.')
          }
        >
          <label className="search-field search-field--lg">
            <Search size={20} aria-hidden="true" />
            <span className="sr-only">{tr('Search universities', 'Поиск университетов')}</span>
            <input
              type="search"
              value={q}
              placeholder={tr('Search by name or city', 'Поиск по названию или городу')}
              onChange={(e) =>
                setParam((p) => {
                  if (e.target.value) p.set('q', e.target.value);
                  else p.delete('q');
                })
              }
            />
          </label>
        </PageHead>

        <div className="catalog">
          <aside className="catalog__side card" aria-label={tr('Filters', 'Фильтры')}>
            <h2 className="h4">{tr('Filters', 'Фильтры')}</h2>
            {filters}
          </aside>

          <section className="catalog__main" aria-labelledby="results-count">
            <div className="notice">
              <Info size={18} aria-hidden="true" />
              <p>
                {tr(
                  'These are real universities, but the team has not verified their admission details yet. Names, cities and websites only — always confirm on the official site.',
                  'Это реальные университеты, но команда ещё не проверила их условия поступления. Здесь только названия, города и сайты — всегда сверяйся с официальным сайтом.',
                )}
              </p>
            </div>

            <div className="toolbar">
              <p id="results-count" className="toolbar__count" aria-live="polite">
                <strong>{results.length}</strong>{' '}
                {plural(locale, results.length, ['university', 'universities'], ['вуз', 'вуза', 'вузов'])}
              </p>
              <div className="toolbar__right">
                <button type="button" className="btn btn--secondary btn--sm toolbar__filters" onClick={() => setDrawer(true)}>
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  {tr('Filters', 'Фильтры')}
                  {activeCount > 0 && <span className="badge-count">{activeCount}</span>}
                </button>
                <label className="sort">
                  <span className="sr-only">{tr('Sort', 'Сортировка')}</span>
                  <select
                    className="input input--sm"
                    value={sort}
                    onChange={(e) => setParam((p) => (e.target.value === 'name' ? p.delete('sort') : p.set('sort', e.target.value)))}
                  >
                    <option value="name">{tr('By name', 'По названию')}</option>
                    <option value="city">{tr('By city', 'По городу')}</option>
                  </select>
                </label>
              </div>
            </div>

            {activeCount > 0 && (
              <ul className="chips" aria-label={tr('Active filters', 'Активные фильтры')}>
                {cities.map((c) => (
                  <li key={c}>
                    <button type="button" className="chip" onClick={() => toggleMulti('city', c)}>
                      {l(cityOptions.find((o) => o.en === c) ?? { en: c, ru: c })}
                      <X size={14} aria-label={tr('remove', 'убрать')} />
                    </button>
                  </li>
                ))}
                {types.map((t) => (
                  <li key={t}>
                    <button type="button" className="chip" onClick={() => toggleMulti('type', t)}>
                      {TYPE_LABEL[t] ? l(TYPE_LABEL[t]) : t}
                      <X size={14} aria-label={tr('remove', 'убрать')} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {results.length ? (
              <div className="uni-grid">
                {results.map((u) => (
                  <UniversityCard key={u.slug} uni={u} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<SearchX size={28} />}
                title={tr('Nothing matches these filters', 'По выбранным параметрам ничего не найдено')}
                text={tr('Try another city or clear the search.', 'Попробуй другой город или очисти поиск.')}
                action={
                  <button type="button" className="btn btn--secondary" onClick={reset}>
                    {tr('Reset filters', 'Сбросить фильтры')}
                  </button>
                }
              />
            )}
          </section>
        </div>
      </div>

      <Sheet
        open={drawer}
        onClose={() => setDrawer(false)}
        title={tr('Filters', 'Фильтры')}
        variant="bottom"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={reset}>
              {tr('Reset', 'Сбросить')}
            </button>
            <button type="button" className="btn btn--primary" onClick={() => setDrawer(false)}>
              {tr(`Show ${results.length} results`, `Показать (${results.length})`)}
            </button>
          </>
        }
      >
        {filters}
      </Sheet>
    </div>
  );
}
