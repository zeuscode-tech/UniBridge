import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Link2, ListPlus, TriangleAlert } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { plan, usePlan } from '../state/plan';
import { CATEGORY_LABEL, GUIDES, OFFICIAL_SOURCES, findGuide } from '../data/guides';
import { findItem } from '../data/checklist';
import { Breadcrumbs, ExternalLink } from '../components/ui';
import { GUIDE_ICON } from './Guides';
import NotFound from './NotFound';

export default function GuideArticle() {
  const { slug = '' } = useParams();
  const guide = findGuide(slug);
  const { tr, l, direction } = usePrefs();
  const { items } = usePlan();
  const [active, setActive] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Scroll-spy for the table of contents.
  useEffect(() => {
    if (!guide) return;
    // Active = the last section whose heading has passed the top third of the screen.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      let current = guide.sections[0]?.id ?? '';
      for (const s of guide.sections) {
        const el = document.getElementById(`s-${s.id}`);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      // At the very bottom, the last section wins even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = guide.sections[guide.sections.length - 1]?.id ?? current;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [guide]);

  if (!guide) return <NotFound />;

  const Icon = GUIDE_ICON[guide.icon];
  const added = guide.planItems.every((id) => items.includes(id));
  const prev = GUIDES.find((g) => g.step === guide.step - 1);
  const next = GUIDES.find((g) => g.step === guide.step + 1);
  const jump = (id: string) =>
    document.getElementById(`s-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: tr('Guides', 'Гайды'), to: '/guides' },
            { label: l(CATEGORY_LABEL[guide.category]) },
            { label: l(guide.title) },
          ]}
        />
        <div className="article-layout">
          <nav className="article-nav" aria-label={tr('All guides', 'Все гайды')}>
            <p className="label">{tr('Six steps', 'Шесть шагов')}</p>
            <ol>
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}`} aria-current={g.slug === guide.slug ? 'page' : undefined}>
                    <span className="article-nav__n">{String(g.step).padStart(2, '0')}</span>
                    {l(g.title)}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <article className="article">
            <header className="article__head">
              <span className="article__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <p className="eyebrow">
                {tr(`Step ${guide.step} of 6`, `Шаг ${guide.step} из 6`)} · {l(CATEGORY_LABEL[guide.category])}
              </p>
              <h1 className="h1">{l(guide.title)}</h1>
              <p className="lead">{l(guide.summary)}</p>
              <div className="notice notice--warn">
                <TriangleAlert size={18} aria-hidden="true" />
                <p>
                  {tr(
                    'General guidance, not legal advice. Rules depend on citizenship, university, programme and intake year — check the official sources below.',
                    'Это общие рекомендации, а не юридическая консультация. Правила зависят от гражданства, вуза, программы и года набора — сверяйся с официальными источниками ниже.',
                  )}
                </p>
              </div>
            </header>

            {guide.sections.map((s) => (
              <section key={s.id} id={`s-${s.id}`} className="article__section">
                <h2 className="h3">{l(s.title)}</h2>
                <p>{l(s.body)}</p>
                {s.list && s.list.kind === 'steps' && (
                  <ol className="steps-list">
                    {s.list.items.map((it, i) => (
                      <li key={i}>{l(it)}</li>
                    ))}
                  </ol>
                )}
                {s.list && s.list.kind === 'bullets' && (
                  <ul className="bullets">
                    {s.list.items.map((it, i) => (
                      <li key={i}>{l(it)}</li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="table-wrap">
                    <table className="table table--grid">
                      <thead>
                        <tr>
                          <th>{l(s.table.head[0])}</th>
                          <th>{l(s.table.head[1])}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r, i) => (
                          <tr key={i}>
                            <td>{l(r[0])}</td>
                            <td>{l(r[1])}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            <section className="article-cta card">
              <div>
                <h2 className="h4">{tr('Add these steps to my plan', 'Добавить эти шаги в мой план')}</h2>
                <ul className="article-cta__items">
                  {guide.planItems.map((id) => {
                    const it = findItem(id);
                    return it ? <li key={id}>{l(it.title)}</li> : null;
                  })}
                </ul>
                <p className="hint">{tr('Saved in this browser only.', 'Сохраняется только в этом браузере.')}</p>
              </div>
              <div className="article-cta__btns">
                {added ? (
                  <Link to="/my-plan" className="btn btn--secondary">
                    <Check size={16} aria-hidden="true" />
                    {tr('In your plan — open', 'Уже в плане — открыть')}
                  </Link>
                ) : (
                  <button type="button" className="btn btn--primary" onClick={() => plan.addItems(guide.planItems)}>
                    <ListPlus size={18} aria-hidden="true" />
                    {tr('Add to my plan', 'Добавить в план')}
                  </button>
                )}
                <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
                  {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
                  {copied ? tr('Link copied', 'Ссылка скопирована') : tr('Copy link', 'Скопировать ссылку')}
                </button>
              </div>
            </section>

            <nav className="pager" aria-label={tr('Previous and next guide', 'Предыдущий и следующий гайд')}>
              {prev ? (
                <Link to={`/guides/${prev.slug}`} className="pager__link">
                  <span className="muted">
                    <ArrowLeft size={14} aria-hidden="true" /> {tr('Previous', 'Назад')}
                  </span>
                  {l(prev.title)}
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/guides/${next.slug}`} className="pager__link pager__link--next">
                  <span className="muted">
                    {tr('Next', 'Далее')} <ArrowRight size={14} aria-hidden="true" />
                  </span>
                  {l(next.title)}
                </Link>
              )}
            </nav>
          </article>

          <aside className="article-aside">
            <div className="sticky-panel">
              <p className="label">{tr('On this page', 'На этой странице')}</p>
              <ul className="toc">
                {guide.sections.map((s) => (
                  <li key={s.id}>
                    <button type="button" className={active === s.id ? 'is-active' : ''} onClick={() => jump(s.id)}>
                      {l(s.title)}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="label">{tr('Official sources', 'Официальные источники')}</p>
              <ul className="sources">
                {OFFICIAL_SOURCES[direction].map((s) => (
                  <li key={s.url}>
                    <ExternalLink href={s.url}>{s.label}</ExternalLink>
                    <span className="muted">{l(s.note)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
