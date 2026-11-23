import { useRef, useState, type FormEvent, type PointerEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CircleDashed,
  CircleHelp,
  ClipboardCheck,
  Compass,
  FileSearch,
  Route,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { destinationOf, usePrefs, type Direction } from '../state/prefs';
import { UNIVERSITIES } from '../data/universities';
import { SCHOLARSHIPS, KIND_LABEL } from '../data/scholarships';
import { LIFE_PAIRS, destSide, homeSide } from '../data/lifeTranslator';
import { UniversityCard } from '../components/UniversityCard';
import { DirectionSwitch } from '../components/Layout';
import { BridgeMark, ConceptImage, Reveal } from '../components/ui';
import bridge from '../assets/bridge.jpg';
import korea from '../assets/korea.jpg';
import kyrgyzstan from '../assets/kyrgyzstan.jpg';

function HeroVisual() {
  const { tr, direction } = usePrefs();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const stage = useRef<HTMLDivElement>(null);

  // Max 3° tilt, desktop pointers only, off for reduced motion (spec §30.3).
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
  };
  const onLeave = () => {
    stage.current?.style.setProperty('--ry', '0deg');
    stage.current?.style.setProperty('--rx', '0deg');
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    const qs = params.toString();
    navigate(`/universities${qs ? `?${qs}` : ''}`);
  };

  return (
    <div className="hero__visual" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero__stage" ref={stage}>
        <ConceptImage
          src={bridge}
          eager
          className="hero__img"
          alt={tr(
            'Illustration of a bridge between Kyrgyzstan and South Korea',
            'Иллюстрация моста между Кыргызстаном и Южной Кореей',
            '키르기스스탄과 한국을 잇는 다리 그림',
          )}
        />
      </div>
      <form className="hero__search" role="search" onSubmit={submit}>
        <div className="hero__search-top">
          <p className="hero__search-title">
            {direction === 'kg-kr'
              ? tr('Universities in South Korea', 'Университеты Южной Кореи', '한국의 대학')
              : tr('Universities in Kyrgyzstan', 'Университеты Кыргызстана', '키르기스스탄의 대학')}
          </p>
          <DirectionSwitch />
        </div>
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{tr('Search universities', 'Поиск университетов', '대학 검색')}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr('University name or city…', 'Название вуза или город…', '대학 이름이나 도시…')}
            autoComplete="off"
          />
          <button type="submit" className="btn btn--primary btn--sm">
            {tr('Search', 'Найти', '검색')}
          </button>
        </label>
      </form>
    </div>
  );
}

function RouteStrip() {
  const { tr } = usePrefs();
  return (
    <div className="route" aria-label={tr('Bishkek to Seoul: 4,417 km, 3 hours time difference', 'Бишкек — Сеул: 4 417 км, разница во времени 3 часа', '비슈케크에서 서울까지 4,417km, 시차 3시간')}>
      <div className="route__end">
        <span className="route__city">{tr('Bishkek', 'Бишкек', '비슈케크')}</span>
        <span className="route__coord">42.87° N, 74.59° E</span>
      </div>
      <div className="route__track" aria-hidden="true">
        <svg className="route__arc" viewBox="0 0 600 60" preserveAspectRatio="none">
          <path d="M0 56 C 160 -4, 440 -4, 600 56" />
        </svg>
      </div>
      <div className="route__mid" aria-hidden="true">
        <span>4 417 km</span>
        <span>UTC+6 → UTC+9</span>
      </div>
      <div className="route__end route__end--right">
        <span className="route__city">{tr('Seoul', 'Сеул', '서울')}</span>
        <span className="route__coord">37.57° N, 126.98° E</span>
      </div>
    </div>
  );
}

function Destinations() {
  const { tr, setDirection } = usePrefs();
  const navigate = useNavigate();
  const go = (d: Direction) => {
    setDirection(d);
    navigate('/universities');
  };
  const cards: { d: Direction; img: string; tag: string; title: string; text: string; cta: string; count: number }[] = [
    {
      d: 'kg-kr',
      img: korea,
      tag: 'KG → KR',
      title: tr('Study in South Korea', 'Учёба в Южной Корее', '한국에서 공부하기'),
      text: tr(
        'For students from Kyrgyzstan: Korean universities, GKS and other funding, TOPIK and visa basics.',
        'Для студентов из Кыргызстана: корейские вузы, GKS и другое финансирование, TOPIK и основы визы.',
        '키르기스스탄 학생을 위해 한국 대학, GKS와 다른 장학금, TOPIK, 비자 기본 정보를 모았어요.',
      ),
      cta: tr('Universities in Korea', 'Университеты Кореи', '한국의 대학'),
      count: UNIVERSITIES.filter((u) => u.country === 'KR').length,
    },
    {
      d: 'kr-kg',
      img: kyrgyzstan,
      tag: 'KR → KG',
      title: tr('Study in Kyrgyzstan', 'Учёба в Кыргызстане', '키르기스스탄에서 공부하기'),
      text: tr(
        'For students from Korea: universities in Bishkek and Osh, grants, documents and the e-visa portal.',
        'Для студентов из Кореи: вузы Бишкека и Оша, гранты, документы и портал электронных виз.',
        '한국 학생을 위해 비슈케크와 오시의 대학, 지원금, 서류, 전자 비자 포털을 모았어요.',
      ),
      cta: tr('Universities in Kyrgyzstan', 'Университеты Кыргызстана', '키르기스스탄의 대학'),
      count: UNIVERSITIES.filter((u) => u.country === 'KG').length,
    },
  ];
  return (
    <section className="section" aria-labelledby="dest-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{tr('Two directions, one bridge', 'Два направления, один мост', '두 방향, 하나의 다리')}</p>
            <h2 className="h2" id="dest-title">
              {tr('Where do you want to study?', 'Куда ты хочешь поступить?', '어디에서 공부하고 싶나요?')}
            </h2>
          </div>
        </div>
        <div className="dest-grid">
          {cards.map((c, i) => (
            <Reveal key={c.d} delay={i * 80}>
              <article className="card dest">
                <ConceptImage src={c.img} alt="" className="dest__img" position={c.d === 'kg-kr' ? '50% 40%' : '50% 45%'} />
                <div className="dest__body">
                  <div className="dest__meta">
                    <span className="tag">{c.tag}</span>
                    <span className="muted">
                      {tr(`${c.count} universities listed`, `${c.count} вузов в каталоге`, `대학 ${c.count}곳`)}
                    </span>
                  </div>
                  <h3 className="h3">{c.title}</h3>
                  <p className="body-2">{c.text}</p>
                  <button type="button" className="link link--arrow stretched" onClick={() => go(c.d)}>
                    {c.cta}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifePreview() {
  const { tr, l, direction } = usePrefs();
  const dest = destinationOf(direction);
  const sample = ['taxi', 'maps', 'messenger', 'foreigner-help']
    .map((id) => LIFE_PAIRS.find((p) => p.id === id))
    .filter((p): p is (typeof LIFE_PAIRS)[number] => !!p);
  const label = (s?: { name: string; local?: string }) => (s ? s.local ?? s.name : '');
  return (
    <section className="section" aria-labelledby="life-title">
      <div className="container">
        <div className="card life-teaser">
          <div className="life-teaser__text">
            <p className="eyebrow">
              <span lang="ko">생활 번역기</span> · Life Translator
            </p>
            <h2 className="h2" id="life-title">
              {tr('Your apps, translated to the other country', 'Твои приложения — в переводе на другую страну', '내가 쓰던 앱을 다른 나라 버전으로')}
            </h2>
            <p className="body-2">
              {tr(
                'Google Translate translates words. UniBridge translates everyday life: what replaces the taxi app, the map and the messenger you use at home.',
                'Google Translate переводит слова. UniBridge переводит привычную жизнь: чем заменить такси, карты и мессенджер, которыми ты пользуешься дома.',
                'Google Translate는 말을 번역해요. UniBridge는 일상을 번역해요. 집에서 쓰던 택시 앱, 지도, 메신저 대신 무엇을 쓰면 되는지 알려 드려요.',
              )}
            </p>
            <Link to="/life" className="btn btn--primary">
              {tr('Open Life Translator', 'Открыть переводчик жизни', '생활 번역기 열기')}
            </Link>
          </div>
          <ul className="life-teaser__rows">
            {sample.map((p) => {
              const from = homeSide(p, dest)[0];
              const to = destSide(p, dest)[0];
              const gap = p.gapIn === dest;
              return (
                <li key={p.id} className={gap ? 'is-gap' : undefined}>
                  <span className="life-teaser__need">{l(p.need)}</span>
                  <span className="life-teaser__pair">
                    <span lang={dest === 'KR' ? 'ru' : 'ko'}>{label(from)}</span>
                    <BridgeMark from={dest === 'KR' ? 'KG' : 'KR'} size="sm" />
                    <span lang={dest === 'KR' ? 'ko' : 'ru'}>{gap ? tr('no equivalent', 'аналога нет', '대체 서비스 없음') : label(to)}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { tr } = usePrefs();
  const steps = [
    { icon: Compass, t: tr('Choose a direction', 'Выбери направление', '방향 고르기'), d: tr('Kyrgyzstan → Korea or Korea → Kyrgyzstan. Change it any time.', 'Кыргызстан → Корея или Корея → Кыргызстан. Можно сменить в любой момент.', '키르기스스탄 → 한국 또는 한국 → 키르기스스탄. 언제든 바꿀 수 있어요.') },
    { icon: FileSearch, t: tr('Find a university', 'Найди университет', '대학 찾기'), d: tr('Filter by city and type, open the official site in one click.', 'Фильтр по городу и типу, официальный сайт — в один клик.', '도시와 유형으로 골라 보고, 공식 사이트를 바로 열 수 있어요.') },
    { icon: ClipboardCheck, t: tr('Check requirements & funding', 'Изучи требования и стипендии', '지원 조건과 장학금 확인하기'), d: tr('Step-by-step guides that say where each fact comes from.', 'Пошаговые гайды, где у каждого факта есть источник.', '모든 정보의 출처를 밝힌 단계별 가이드예요.') },
    { icon: Route, t: tr('Build your plan', 'Собери свой план', '내 계획 세우기'), d: tr('A checklist saved in your browser. No sign-up.', 'Чек-лист сохраняется в браузере. Без регистрации.', '체크리스트는 브라우저에 저장돼요. 가입은 필요 없어요.') },
  ];
  return (
    <section className="section section--tint" id="how" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{tr('How it works', 'Как это работает', '이용 방법')}</p>
            <h2 className="h2" id="how-title">
              {tr('From an idea to admission — a clear process', 'От идеи до поступления — понятный процесс', '생각에서 입학까지, 한눈에 보이는 과정')}
            </h2>
          </div>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 60} className="step">
              <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="step__icon" aria-hidden="true">
                <s.icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="h4">{s.t}</h3>
              <p className="body-2">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Featured() {
  const { tr, direction } = usePrefs();
  const dest = destinationOf(direction);
  const list = UNIVERSITIES.filter((u) => u.country === dest).slice(0, 3);
  return (
    <section className="section" aria-labelledby="feat-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dest === 'KR' ? tr('South Korea', 'Южная Корея', '한국') : tr('Kyrgyzstan', 'Кыргызстан', '키르기스스탄')}</p>
            <h2 className="h2" id="feat-title">
              {tr('Start by exploring universities', 'Начни с изучения университетов', '대학부터 살펴보세요')}
            </h2>
          </div>
          <Link to="/universities" className="btn btn--secondary">
            {tr('All universities', 'Все университеты', '모든 대학')}
          </Link>
        </div>
        <div className="uni-grid uni-grid--3">
          {list.map((u, i) => (
            <Reveal key={u.slug} delay={i * 60}>
              <UniversityCard uni={u} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScholarshipsPreview() {
  const { tr, l, direction } = usePrefs();
  const list = SCHOLARSHIPS.filter((s) => s.directions.includes(direction)).slice(0, 2);
  return (
    <section className="section section--tint" aria-labelledby="sch-title">
      <div className="container split">
        <div className="split__text">
          <p className="eyebrow">{tr('Funding', 'Финансирование', '학비 지원')}</p>
          <h2 className="h2" id="sch-title">
            {tr('Scholarships, without the hype', 'Стипендии — без громких обещаний', '과장 없는 장학금 정보')}
          </h2>
          <p className="lead">
            {tr(
              'We list who runs each programme and link the official notice. Coverage and deadlines stay “to be confirmed” until we have checked them.',
              'Мы показываем, кто проводит программу, и даём ссылку на официальное объявление. Покрытие и сроки остаются «уточняется», пока мы их не проверили.',
              '프로그램을 운영하는 기관과 공식 공고 링크를 보여 드려요. 지원 범위와 마감일은 저희가 확인하기 전까지 ‘확인 중’으로 표시해요.',
            )}
          </p>
          <Link to="/scholarships" className="btn btn--primary">
            {tr('Explore scholarships', 'Изучить стипендии', '장학금 보기')}
          </Link>
        </div>
        <div className="split__cards">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <Link to={`/scholarships?open=${s.slug}`} className="card mini-sch">
                <span className="tag tag--soft">{l(KIND_LABEL[s.kind])}</span>
                <h3 className="h4">{l(s.title)}</h3>
                <p className="body-2 muted">{l(s.provider)}</p>
                <dl className="kv">
                  <div>
                    <dt>{tr('Deadline', 'Дедлайн', '마감일')}</dt>
                    <dd>{tr('To be confirmed', 'Уточняется', '확인 중')}</dd>
                  </div>
                  <div>
                    <dt>{tr('Coverage', 'Покрытие', '지원 범위')}</dt>
                    <dd>{tr('Check the official notice', 'См. официальное объявление', '공식 공고를 확인하세요')}</dd>
                  </div>
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const { tr } = usePrefs();
  const rows = [
    { icon: ShieldCheck, cls: 'verified', t: tr('Verified', 'Проверено', '확인됨'), d: tr('Checked against the official source, with the date of the check.', 'Сверено с официальным источником, указана дата проверки.', '공식 출처와 대조했고, 확인한 날짜를 적어 두었어요.') },
    { icon: CircleDashed, cls: 'needs_review', t: tr('Not yet verified', 'Не проверено', '아직 확인 안 됨'), d: tr('Taken from an official site, but not reviewed by the team yet.', 'Взято с официального сайта, но командой ещё не проверено.', '공식 사이트에서 가져왔지만, 팀이 아직 검토하지 않았어요.') },
    { icon: CircleHelp, cls: 'unknown', t: tr('No confirmed data', 'Нет данных', '확인된 정보 없음'), d: tr('We don’t know yet — so we say so instead of guessing.', 'Мы пока не знаем — и честно это показываем.', '아직 몰라요. 추측하지 않고 모른다고 적어요.') },
  ];
  return (
    <section className="section" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust">
          <div className="trust__intro">
            <p className="eyebrow">{tr('Information policy', 'Политика информации', '정보 원칙')}</p>
            <h2 className="h2" id="trust-title">
              {tr('Every fact shows where it came from', 'У каждого факта видно происхождение', '모든 정보에 출처가 있어요')}
            </h2>
            <p className="body-2">
              {tr(
                'No made-up ratings, no “guaranteed admission”, no fake reviews. Applications always go through the university itself.',
                'Без выдуманных рейтингов, «гарантированного поступления» и фейковых отзывов. Заявки — только через сам университет.',
                '지어낸 순위, ‘합격 보장’, 가짜 후기는 없어요. 지원은 언제나 대학에 직접 해요.',
              )}
            </p>
          </div>
          <ul className="trust__list">
            {rows.map((r) => (
              <li key={r.cls}>
                <span className={`status status--${r.cls} status--lg`} aria-hidden="true">
                  <r.icon size={18} />
                </span>
                <div>
                  <h3 className="h4">{r.t}</h3>
                  <p className="body-2">{r.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const { tr } = usePrefs();
  return (
    <section className="section section--last">
      <div className="container">
        <Reveal>
          <div className="cta-band">
            <svg className="cta-band__arcs" viewBox="0 0 1200 320" preserveAspectRatio="none" aria-hidden="true">
              <path d="M-20 330 C 300 40, 900 40, 1220 330" />
              <path d="M-20 360 C 300 90, 900 90, 1220 360" />
              <path d="M-20 390 C 300 140, 900 140, 1220 390" />
            </svg>
            <div className="cta-band__text">
              <h2 className="h2">{tr('Start building your admission plan', 'Начни строить свой план поступления', '입학 계획을 세워 보세요')}</h2>
              <p>{tr('Three short questions, no account. You can change everything later.', 'Три коротких вопроса, без аккаунта. Всё можно поменять позже.', '짧은 질문 3개면 돼요. 계정은 필요 없고, 나중에 모두 바꿀 수 있어요.')}</p>
            </div>
            <Link to="/start" className="btn btn--white btn--lg">
              {tr('Get started', 'Начать', '시작하기')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Landing() {
  const { tr } = usePrefs();
  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__text">
            <p className="pill">
              <span className="pill__dot" aria-hidden="true" />
              {tr('Kyrgyzstan ↔ South Korea', 'Кыргызстан ↔ Южная Корея', '키르기스스탄 ↔ 한국')}
            </p>
            <h1 className="display">
              {tr(
                'Your first weeks in a new country, already figured out',
                'Первые недели в новой стране — уже разобраны',
                '낯선 나라에서의 첫\u00a0몇\u00a0주, 미리 정리해 두었어요',
              )}
            </h1>
            <p className="lead hero__lead">
              {tr(
                'What replaces your everyday apps, which documents to sort out first and where to ask for help — for students moving between Kyrgyzstan and Korea. Every fact has a source and a check date.',
                'Чем заменить привычные приложения, какие документы оформить первыми и куда обращаться за помощью — для студентов между Кыргызстаном и Кореей. У каждого факта есть источник и дата проверки.',
                '평소 쓰던 앱 대신 무엇을 쓸지, 어떤 서류부터 챙길지, 도움은 어디서 받을지 알려 드려요. 키르기스스탄과 한국을 오가는 학생을 위해 만들었어요. 모든 정보에는 출처와 확인 날짜가 있어요.',
              )}
            </p>
            <div className="hero__ctas">
              <Link to="/life" className="btn btn--primary btn--lg">
                {tr('Open Life Translator', 'Открыть переводчик жизни', '생활 번역기 열기')}
              </Link>
              <Link to="/start" className="btn btn--secondary btn--lg">
                {tr('Find a university', 'Найти университет', '대학 찾기')}
              </Link>
            </div>
            <p className="hero__note">
              <ShieldCheck size={16} aria-hidden="true" />
              {tr(
                'Information from checkable sources. Applications happen on official sites.',
                'Информация из проверяемых источников. Подача заявок — на официальных сайтах.',
                '확인할 수 있는 출처의 정보만 담았어요. 지원은 공식 사이트에서 해요.',
              )}
            </p>
          </div>
          <HeroVisual />
        </div>
        <div className="container">
          <RouteStrip />
        </div>
      </section>
      <Destinations />
      <LifePreview />
      <HowItWorks />
      <Featured />
      <ScholarshipsPreview />
      <Trust />
      <FinalCta />
    </>
  );
}
