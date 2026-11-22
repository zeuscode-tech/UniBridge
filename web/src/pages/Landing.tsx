import { useRef, useState, type FormEvent, type PointerEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
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
import { UniversityCard } from '../components/UniversityCard';
import { DirectionSwitch } from '../components/Layout';
import { ConceptImage, Reveal } from '../components/ui';
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
          )}
        />
      </div>
      <form className="hero__search" role="search" onSubmit={submit}>
        <div className="hero__search-top">
          <p className="hero__search-title">
            {direction === 'kg-kr'
              ? tr('Universities in South Korea', 'Университеты Южной Кореи')
              : tr('Universities in Kyrgyzstan', 'Университеты Кыргызстана')}
          </p>
          <DirectionSwitch />
        </div>
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{tr('Search universities', 'Поиск университетов')}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr('University name or city…', 'Название вуза или город…')}
            autoComplete="off"
          />
          <button type="submit" className="btn btn--primary btn--sm">
            {tr('Search', 'Найти')}
          </button>
        </label>
      </form>
    </div>
  );
}

function RouteStrip() {
  const { tr } = usePrefs();
  return (
    <div className="route" aria-label={tr('Bishkek to Seoul: 4,417 km, 3 hours time difference', 'Бишкек — Сеул: 4 417 км, разница во времени 3 часа')}>
      <div className="route__end">
        <span className="route__city">{tr('Bishkek', 'Бишкек')}</span>
        <span className="route__coord">42.87° N · 74.59° E</span>
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
        <span className="route__city">{tr('Seoul', 'Сеул')}</span>
        <span className="route__coord">37.57° N · 126.98° E</span>
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
      title: tr('Study in South Korea', 'Учёба в Южной Корее'),
      text: tr(
        'For students from Kyrgyzstan: Korean universities, GKS and other funding, TOPIK and visa basics.',
        'Для студентов из Кыргызстана: корейские вузы, GKS и другое финансирование, TOPIK и основы визы.',
      ),
      cta: tr('Universities in Korea', 'Университеты Кореи'),
      count: UNIVERSITIES.filter((u) => u.country === 'KR').length,
    },
    {
      d: 'kr-kg',
      img: kyrgyzstan,
      tag: 'KR → KG',
      title: tr('Study in Kyrgyzstan', 'Учёба в Кыргызстане'),
      text: tr(
        'For students from Korea: universities in Bishkek and Osh, grants, documents and the e-visa portal.',
        'Для студентов из Кореи: вузы Бишкека и Оша, гранты, документы и портал электронных виз.',
      ),
      cta: tr('Universities in Kyrgyzstan', 'Университеты Кыргызстана'),
      count: UNIVERSITIES.filter((u) => u.country === 'KG').length,
    },
  ];
  return (
    <section className="section" aria-labelledby="dest-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{tr('Two directions, one bridge', 'Два направления, один мост')}</p>
            <h2 className="h2" id="dest-title">
              {tr('Where do you want to study?', 'Куда ты хочешь поступить?')}
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
                      {c.count} {tr('universities listed', 'вузов в каталоге')}
                    </span>
                  </div>
                  <h3 className="h3">{c.title}</h3>
                  <p className="body-2">{c.text}</p>
                  <button type="button" className="link link--arrow stretched" onClick={() => go(c.d)}>
                    {c.cta}
                    <ArrowRight size={16} aria-hidden="true" />
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

function HowItWorks() {
  const { tr } = usePrefs();
  const steps = [
    { icon: Compass, t: tr('Choose a direction', 'Выбери направление'), d: tr('Kyrgyzstan → Korea or Korea → Kyrgyzstan. Change it any time.', 'Кыргызстан → Корея или Корея → Кыргызстан. Можно сменить в любой момент.') },
    { icon: FileSearch, t: tr('Find a university', 'Найди университет'), d: tr('Filter by city and type, open the official site in one click.', 'Фильтр по городу и типу, официальный сайт — в один клик.') },
    { icon: ClipboardCheck, t: tr('Check requirements & funding', 'Изучи требования и стипендии'), d: tr('Step-by-step guides that say where each fact comes from.', 'Пошаговые гайды, где у каждого факта есть источник.') },
    { icon: Route, t: tr('Build your plan', 'Собери свой план'), d: tr('A checklist saved in your browser. No sign-up.', 'Чек-лист сохраняется в браузере. Без регистрации.') },
  ];
  return (
    <section className="section section--tint" id="how" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{tr('How it works', 'Как это работает')}</p>
            <h2 className="h2" id="how-title">
              {tr('From an idea to admission — a clear process', 'От идеи до поступления — понятный процесс')}
            </h2>
          </div>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 60} className="step">
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
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
            <p className="eyebrow">{dest === 'KR' ? tr('South Korea', 'Южная Корея') : tr('Kyrgyzstan', 'Кыргызстан')}</p>
            <h2 className="h2" id="feat-title">
              {tr('Start by exploring universities', 'Начни с изучения университетов')}
            </h2>
          </div>
          <Link to="/universities" className="btn btn--secondary">
            {tr('All universities', 'Все университеты')}
            <ArrowRight size={16} aria-hidden="true" />
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
          <p className="eyebrow">{tr('Funding', 'Финансирование')}</p>
          <h2 className="h2" id="sch-title">
            {tr('Scholarships, without the hype', 'Стипендии — без громких обещаний')}
          </h2>
          <p className="lead">
            {tr(
              'We list who runs each programme and link the official notice. Coverage and deadlines stay “to be confirmed” until we have checked them.',
              'Мы показываем, кто проводит программу, и даём ссылку на официальное объявление. Покрытие и сроки остаются «уточняется», пока мы их не проверили.',
            )}
          </p>
          <Link to="/scholarships" className="btn btn--primary">
            {tr('Explore scholarships', 'Изучить стипендии')}
            <ArrowRight size={16} aria-hidden="true" />
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
                    <dt>{tr('Deadline', 'Дедлайн')}</dt>
                    <dd>{tr('To be confirmed', 'Уточняется')}</dd>
                  </div>
                  <div>
                    <dt>{tr('Coverage', 'Покрытие')}</dt>
                    <dd>{tr('Check the official notice', 'См. официальное объявление')}</dd>
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
    { icon: ShieldCheck, cls: 'verified', t: tr('Verified', 'Проверено'), d: tr('Checked against the official source, with the date of the check.', 'Сверено с официальным источником, указана дата проверки.') },
    { icon: CircleDashed, cls: 'needs_review', t: tr('Not yet verified', 'Не проверено'), d: tr('Taken from an official site, but not reviewed by the team yet.', 'Взято с официального сайта, но командой ещё не проверено.') },
    { icon: CircleHelp, cls: 'unknown', t: tr('No confirmed data', 'Нет данных'), d: tr('We don’t know yet — so we say so instead of guessing.', 'Мы пока не знаем — и честно это показываем.') },
  ];
  return (
    <section className="section" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust">
          <div className="trust__intro">
            <p className="eyebrow">{tr('Information policy', 'Политика информации')}</p>
            <h2 className="h2" id="trust-title">
              {tr('Every fact shows where it came from', 'У каждого факта видно происхождение')}
            </h2>
            <p className="body-2">
              {tr(
                'No made-up ratings, no “guaranteed admission”, no fake reviews. Applications always go through the university itself.',
                'Без выдуманных рейтингов, «гарантированного поступления» и фейковых отзывов. Заявки — только через сам университет.',
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
              <h2 className="h2">{tr('Start building your admission plan', 'Начни строить свой план поступления')}</h2>
              <p>{tr('Three short questions, no account. You can change everything later.', 'Три коротких вопроса, без аккаунта. Всё можно поменять позже.')}</p>
            </div>
            <Link to="/start" className="btn btn--white btn--lg">
              {tr('Get started', 'Начать')}
              <ArrowRight size={18} aria-hidden="true" />
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
              {tr('Kyrgyzstan ↔ South Korea', 'Кыргызстан ↔ Южная Корея')}
            </p>
            <h1 className="display">
              {tr('Your path to studying abroad ', 'Твой путь к обучению за границей ')}
              <span className="display__accent">{tr('starts here', 'начинается здесь')}</span>
            </h1>
            <p className="lead hero__lead">
              {tr(
                'Find a university, understand the requirements, learn about scholarships and build a step-by-step admission plan.',
                'Найди университет, изучи требования, узнай о стипендиях и составь пошаговый план поступления.',
              )}
            </p>
            <div className="hero__ctas">
              <Link to="/start" className="btn btn--primary btn--lg">
                {tr('Find a university', 'Найти университет')}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn--secondary btn--lg"
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                {tr('How it works', 'Как это работает')}
              </button>
            </div>
            <p className="hero__note">
              <ShieldCheck size={16} aria-hidden="true" />
              {tr(
                'Information from checkable sources. Applications happen on official sites.',
                'Информация из проверяемых источников. Подача заявок — на официальных сайтах.',
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
      <HowItWorks />
      <Featured />
      <ScholarshipsPreview />
      <Trust />
      <FinalCta />
    </>
  );
}
