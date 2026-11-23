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
        <Breadcrumbs items={[{ label: tr('Home', 'Главная', '홈'), to: '/' }, { label: tr('Guides', 'Гайды', '가이드') }]} />
        <PageHead
          eyebrow={tr('Admissions, made clear', 'Поступление без тумана', '입학 과정, 한눈에')}
          title={tr('How to apply — step by step', 'Как поступить — шаг за шагом', '입학 지원, 단계별로 알아보기')}
          lead={tr(
            'Six steps from choosing a university to your first week on campus. What applies to everyone is marked separately from what depends on you.',
            'Шесть шагов от выбора вуза до первой недели в кампусе. Что универсально, а что зависит от тебя — отмечено отдельно.', '대학 선택부터 캠퍼스 첫 주까지 6단계로 정리했어요. 모두에게 해당하는 내용과 상황에 따라 달라지는 내용을 나눠 표시했어요.',
          )}
        >
          <div className="inline-dir">
            <span className="muted">{tr('Showing sources for', 'Источники для направления', '출처 기준 방향')}</span>
            <DirectionSwitch />
          </div>
        </PageHead>

        <ol className="roadmap">
          {GUIDES.map((g, i) => {
            const Icon = GUIDE_ICON[g.icon];
            return (
              <Reveal as="li" key={g.slug} delay={i * 60} className="roadmap__item">
                <Link to={`/guides/${g.slug}`} className="card roadmap__card">
                  <span className="roadmap__num" aria-hidden="true">{String(g.step).padStart(2, '0')}</span>
                  <span className="roadmap__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="roadmap__cat">{l(CATEGORY_LABEL[g.category])}</span>
                  <h2 className="h4">{l(g.title)}</h2>
                  <p className="body-2">{l(g.summary)}</p>
                  <span className="link link--arrow">
                    {tr('Read the guide', 'Читать инструкцию', '가이드 읽기')}
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
              {tr('Official portals', 'Официальные порталы', '공식 사이트')}
            </h2>
            <p className="body-2">
              {tr(
                'Visa and legal rules depend on citizenship and change over time. Always read them at the source.',
                'Визовые и правовые нормы зависят от гражданства и меняются. Всегда читай их в первоисточнике.', '비자와 법 규정은 국적에 따라 다르고 자주 바뀌어요. 항상 공식 출처에서 확인하세요.',
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
