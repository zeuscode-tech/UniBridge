import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, Compass, FolderOpen, Plane, Send, Wallet } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { CATEGORY_LABEL, GUIDES, OFFICIAL_SOURCES, type Guide } from '../data/guides';
import { Breadcrumbs, ExternalLink, PageHead, Reveal } from '../components/ui';
import { DirectionSwitch } from '../components/Layout';

export const GUIDE_ICON: Record<Guide['icon'], typeof Compass> = {
  compass: Compass,
  clipboard: ClipboardList,
  wallet: Wallet,
  folder: FolderOpen,
  send: Send,
  plane: Plane,
};

export default function Guides() {
  const { tr, l, direction } = usePrefs();
  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная'), to: '/' }, { label: tr('Guides', 'Гайды') }]} />
        <PageHead
          eyebrow={tr('Admissions, made clear', 'Поступление без тумана')}
          title={tr('How to apply — step by step', 'Как поступить — шаг за шагом')}
          lead={tr(
            'Six steps from choosing a university to your first week on campus. What applies to everyone is marked separately from what depends on you.',
            'Шесть шагов от выбора вуза до первой недели в кампусе. Что универсально, а что зависит от тебя — отмечено отдельно.',
          )}
        >
          <div className="inline-dir">
            <span className="muted">{tr('Showing sources for', 'Источники для направления')}</span>
            <DirectionSwitch />
          </div>
        </PageHead>

        <ol className="roadmap">
          {GUIDES.map((g, i) => {
            const Icon = GUIDE_ICON[g.icon];
            return (
              <Reveal as="li" key={g.slug} delay={i * 60} className="roadmap__item">
                <Link to={`/guides/${g.slug}`} className="card roadmap__card">
                  <span className="roadmap__num">{String(g.step).padStart(2, '0')}</span>
                  <span className="roadmap__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="roadmap__cat">{l(CATEGORY_LABEL[g.category])}</span>
                  <h2 className="h4">{l(g.title)}</h2>
                  <p className="body-2">{l(g.summary)}</p>
                  <span className="link link--arrow">
                    {tr('Read the guide', 'Читать инструкцию')}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ol>

        <section className="official" aria-labelledby="official-title">
          <div>
            <h2 className="h3" id="official-title">
              {tr('Official portals', 'Официальные порталы')}
            </h2>
            <p className="body-2">
              {tr(
                'Visa and legal rules depend on citizenship and change over time. Always read them at the source.',
                'Визовые и правовые нормы зависят от гражданства и меняются. Всегда читай их в первоисточнике.',
              )}
            </p>
          </div>
          <ul className="official__list">
            {OFFICIAL_SOURCES[direction].map((s) => (
              <li key={s.url}>
                <ExternalLink href={s.url} className="official__link">
                  <strong>{s.label}</strong>
                </ExternalLink>
                <span className="muted">{l(s.note)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
