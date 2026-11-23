import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Languages, Search, SearchX, TriangleAlert } from 'lucide-react';
import { destinationOf, plural, usePrefs } from '../state/prefs';
import {
  CATEGORY_LABEL,
  LIFE_PAIRS,
  destSide,
  homeSide,
  type LifeCategory,
  type LifePair,
  type Service,
} from '../data/lifeTranslator';
import { BridgeMark, Breadcrumbs, EmptyState, ExternalLink, StatusBadge } from '../components/ui';
import { ShareBar } from '../components/ShareBar';
import { DirectionSwitch } from '../components/Layout';

const norm = (s: string) => s.toLowerCase().normalize('NFKC');

function ServiceChips({ list, country }: { list: Service[]; country: 'KR' | 'KG' }) {
  return (
    <ul className="lt-svcs">
      {list.map((s) => (
        <li key={s.name} className={`lt-svc lt-svc--${country.toLowerCase()}`}>
          <span className="lt-svc__name">{s.name}</span>
          {s.local && s.local !== s.name && (
            <span className="lt-svc__local" lang={country === 'KR' ? 'ko' : 'ru'}>
              {s.local}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function PairCard({ p, dest }: { p: LifePair; dest: 'KR' | 'KG' }) {
  const { tr, l, locale } = usePrefs();
  const home = dest === 'KR' ? 'KG' : 'KR';
  const from = homeSide(p, dest);
  const to = destSide(p, dest);
  const gap = p.gapIn === dest;
  const links = to.filter((s) => s.url);

  return (
    <article className={`card lt-card${gap ? ' lt-card--gap' : ''}`}>
      <div className="lt-card__top">
        <span className="tag tag--soft">{l(CATEGORY_LABEL[p.category])}</span>
        {gap && (
          <span className="lt-gapflag">
            <TriangleAlert size={14} aria-hidden="true" />
            {tr('Barrier found', 'Найден барьер', '장벽 발견')}
          </span>
        )}
      </div>
      <h2 className="h4 lt-card__need">{l(p.need)}</h2>

      <div className={`lt-row lt-row--from-${home.toLowerCase()}`}>
        <div className="lt-side">
          <p className={`lt-side__label lt-side__label--${home.toLowerCase()}`}>{home === 'KR' ? tr('At home in Korea', 'Дома в Корее', '한국에서 쓰던 것') : tr('At home in Kyrgyzstan', 'Дома в Кыргызстане', '키르기스스탄에서 쓰던 것')}</p>
          {from.length ? <ServiceChips list={from} country={home} /> : <p className="lt-none">—</p>}
        </div>
        <span className="lt-arrow">
          <BridgeMark from={home} />
        </span>
        <div className="lt-side">
          <p className={`lt-side__label lt-side__label--${dest.toLowerCase()}`}>{dest === 'KR' ? tr('In Korea', 'В Корее', '한국에서 쓸 것') : tr('In Kyrgyzstan', 'В Кыргызстане', '키르기스스탄에서 쓸 것')}</p>
          {to.length ? (
            <ServiceChips list={to} country={dest} />
          ) : (
            <p className="lt-none lt-none--gap">{tr('No equivalent found', 'Аналог не найден', '대체 서비스를 찾지 못했어요')}</p>
          )}
        </div>
      </div>

      <p className="body-2 lt-card__tip">{l(dest === 'KR' ? p.inKR : p.inKG)}</p>

      {links.length > 0 && (
        <p className="lt-card__links">
          {links.map((s) => (
            <ExternalLink key={s.name} href={s.url!}>
              {s.name}
            </ExternalLink>
          ))}
        </p>
      )}

      <div className="lt-card__foot">
        <StatusBadge status={p.status} />
        {p.checked && (
          <span className="hint">
            {tr('Checked', 'Проверено', '확인일')} {new Date(p.checked).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'ko' ? 'ko-KR' : 'en-GB')}
          </span>
        )}
      </div>
      {p.sources && p.sources.length > 0 && (
        <details className="lt-sources">
          <summary>
            {tr('Sources', 'Источники', '출처')} ({p.sources.length})
          </summary>
          <ul>
            {p.sources.map((s) => (
              <li key={s.url}>
                <ExternalLink href={s.url}>{s.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}

export default function LifeTranslator() {
  const { tr, l, direction, locale } = usePrefs();
  const dest = destinationOf(direction);
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const cat = params.get('cat') as LifeCategory | null;

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mut(next);
    setParams(next, { replace: true });
  };

  const categories = Array.from(new Set(LIFE_PAIRS.map((p) => p.category)));
  const gaps = LIFE_PAIRS.filter((p) => p.gapIn === dest).length;
  const direct = LIFE_PAIRS.length - gaps;

  // Suggestions are the apps a student from the home country already knows.
  const suggestions = LIFE_PAIRS.map((p) => homeSide(p, dest)[0])
    .filter((s): s is Service => !!s)
    .slice(0, 7);

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return LIFE_PAIRS.filter((p) => (cat ? p.category === cat : true)).filter((p) => {
      if (!nq) return true;
      const hay = [...p.kr, ...p.kg].flatMap((s) => [s.name, s.local ?? '']).concat(p.need.en, p.need.ru, p.need.ko ?? '');
      return hay.some((s) => norm(s).includes(nq));
    });
  }, [q, cat]);

  return (
    <div className="page page--canvas">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная', '홈'), to: '/' }, { label: tr('Life Translator', 'Переводчик жизни', '생활 번역기') }]} />

        <header className="lt-hero">
          <div className="lt-hero__text">
            <p className="eyebrow">
              <span lang="ko">생활 번역기</span> · Life Translator
            </p>
            <h1 className="h1">{tr('We translate everyday life, not just words', 'Переводим не слова, а привычную жизнь', '말이 아니라 일상을 번역해요')}</h1>
            <p className="lead">
              {tr(
                'Type an app you use every day at home and see what replaces it in the other country, and what you need to start using it.',
                'Напиши приложение, которым пользуешься дома каждый день, и узнай, что его заменяет в другой стране и что нужно, чтобы начать.',
                '집에서 매일 쓰는 앱을 입력해 보세요. 다른 나라에서 무엇으로 바꾸면 되는지, 쓰려면 무엇이 필요한지 알려 드려요.',
              )}
            </p>
          </div>
          <div className="lt-hero__dir">
            <p className="label">{tr('I am moving', 'Я переезжаю', '내 이동 방향')}</p>
            <DirectionSwitch size="lg" />
          </div>
        </header>

        <label className="search-field search-field--lg lt-search">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">{tr('Search everyday services', 'Поиск по сервисам', '생활 서비스 검색')}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => update((p) => (e.target.value ? p.set('q', e.target.value) : p.delete('q')))}
            placeholder={
              dest === 'KG'
                ? tr('For example: Kakao T, 네이버 지도, T-money', 'Например: Kakao T, 네이버 지도, T-money', '예: Kakao T, 네이버 지도, T-money')
                : tr('For example: 2GIS, WhatsApp, Lalafo', 'Например: 2GIS, WhatsApp, Lalafo', '예: 2GIS, WhatsApp, Lalafo')
            }
          />
        </label>

        <div className="lt-suggest" role="group" aria-label={tr('Popular at home', 'Популярное дома', '많이 쓰는 앱')}>
          <span className="hint">{tr('Try:', 'Попробуй:', '예시:')}</span>
          {suggestions.map((s) => (
            <button key={s.name} type="button" className="chip" onClick={() => update((p) => p.set('q', s.local ?? s.name))}>
              {s.local ?? s.name}
            </button>
          ))}
        </div>

        <div className="lt-stats" aria-live="polite">
          <div>
            <strong>{LIFE_PAIRS.length}</strong>
            <span>{tr('everyday needs', 'бытовых задач', '생활 상황')}</span>
          </div>
          <div>
            <strong>{direct}</strong>
            <span>{tr('have an equivalent', 'имеют аналог', '대체 서비스 있음')}</span>
          </div>
          <div className="lt-stats__gap">
            <strong>{gaps}</strong>
            <span>
              {locale === 'ko'
                ? '장벽 발견'
                : plural(locale, gaps, ['barrier found', 'barriers found'], ['барьер найден', 'барьера найдено', 'барьеров найдено'])}
            </span>
          </div>
          <p className="hint lt-stats__note">
            {tr(
              'Every “no equivalent” is a barrier for newcomers. We record each one in our Kyrgyzstan–Korea comparison.',
              'Каждое «аналога нет» — барьер для приезжих. Мы записываем его в наше сравнение Кыргызстана и Кореи.',
              '‘대체 서비스 없음’은 새로 온 사람에게 장벽이에요. 저희는 이런 장벽을 하나하나 키르기스스탄과 한국 비교 연구에 기록해요.',
            )}
          </p>
        </div>

        <div className="filter-row" role="group" aria-label={tr('Category', 'Категория', '분류')}>
          <button type="button" className={`chip${!cat ? ' is-on' : ''}`} aria-pressed={!cat} onClick={() => update((p) => p.delete('cat'))}>
            {tr('All', 'Все', '전체')} <span className="chip__n">{LIFE_PAIRS.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip${cat === c ? ' is-on' : ''}`}
              aria-pressed={cat === c}
              onClick={() => update((p) => (cat === c ? p.delete('cat') : p.set('cat', c)))}
            >
              {l(CATEGORY_LABEL[c])} <span className="chip__n">{LIFE_PAIRS.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>

        {results.length ? (
          <div className="lt-grid">
            {results.map((p) => (
              <PairCard key={p.id} p={p} dest={dest} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<SearchX size={28} />}
            title={tr('We have not translated this yet', 'Это мы ещё не перевели', '아직 번역하지 않은 앱이에요')}
            text={tr(
              'Tell us which app you use and we will add it after checking.',
              'Напиши, каким приложением пользуешься, и мы добавим его после проверки.',
              '어떤 앱을 쓰는지 알려 주세요. 확인한 뒤 추가할게요.',
            )}
            action={
              <button type="button" className="btn btn--secondary" onClick={() => update((p) => { p.delete('q'); p.delete('cat'); })}>
                {tr('Show all', 'Показать все', '전체 보기')}
              </button>
            }
          />
        )}

        <p className="hint lt-disclaimer">
          <Languages size={16} aria-hidden="true" />
          {tr(
            'Apps and rules change. Treat these cards as a starting point and confirm with the official source or your university.',
            'Приложения и правила меняются. Карточки — это отправная точка; уточняй в официальном источнике или в своём вузе.',
            '앱과 규정은 바뀔 수 있어요. 이 카드는 출발점으로만 보고, 공식 출처나 학교에서 꼭 확인하세요.',
          )}
        </p>

        <ShareBar />
      </div>
    </div>
  );
}
