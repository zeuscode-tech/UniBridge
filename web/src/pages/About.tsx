import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Compass, Link2, Scale } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { Breadcrumbs, ConceptImage, Reveal } from '../components/ui';
import students from '../assets/students.jpg';

export default function About() {
  const { tr } = usePrefs();
  const how = [
    { icon: Compass, t: tr('Research', 'Исследование'), d: tr('We compare orientation resources of universities in both countries.', 'Сравниваем материалы для иностранных студентов в вузах обеих стран.') },
    { icon: Link2, t: tr('Checkable sources', 'Проверяемые источники'), d: tr('Every important fact links to an official page and a review date.', 'У каждого важного факта есть ссылка на официальную страницу и дата проверки.') },
    { icon: BookOpenCheck, t: tr('Clear instructions', 'Понятные инструкции'), d: tr('Plain-language steps instead of scattered PDFs.', 'Простые шаги вместо разрозненных PDF.') },
    { icon: Scale, t: tr('Honest limits', 'Честные границы'), d: tr('If we don’t know something, the page says so.', 'Если мы чего-то не знаем — страница прямо это говорит.') },
  ];
  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная'), to: '/' }, { label: tr('About', 'О проекте') }]} />
        <section className="about-hero">
          <div>
            <p className="eyebrow">{tr('About UniBridge', 'О UniBridge')}</p>
            <h1 className="display display--sm">{tr('Connecting students, universities and opportunities', 'Соединяем студентов, университеты и возможности')}</h1>
            <p className="lead">
              {tr(
                'Moving to study in another country means hunting for information across websites, PDFs and languages. UniBridge puts the essentials for Kyrgyzstan ↔ South Korea in one calm place.',
                'Переезд на учёбу в другую страну — это поиск информации по сайтам, PDF и разным языкам. UniBridge собирает главное для направления Кыргызстан ↔ Южная Корея в одном спокойном месте.',
              )}
            </p>
          </div>
          <ConceptImage src={students} alt={tr('Illustration: two students working in a library', 'Иллюстрация: два студента занимаются в библиотеке')} className="about-hero__img" eager />
        </section>

        <section className="section-tight">
          <h2 className="h2">{tr('How we work', 'Как мы работаем')}</h2>
          <div className="about-grid">
            {how.map((h, i) => (
              <Reveal key={i} delay={i * 60} className="card pad about-card">
                <span className="step__icon" aria-hidden="true">
                  <h.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="h4">{h.t}</h3>
                <p className="body-2">{h.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-tight about-cols">
          <div>
            <h2 className="h3">{tr('Research & Capstone', 'Исследование и Capstone')}</h2>
            <p className="body-1">
              {tr(
                'UniBridge is a HUSS Global Capstone Design project (November 2026 – January 2027). The research compares orientation resources from one university in Kyrgyzstan and one in South Korea: findability, language accessibility, completeness, clarity and usability.',
                'UniBridge — проект HUSS Global Capstone Design (ноябрь 2026 — январь 2027). Исследование сравнивает материалы для иностранных студентов одного вуза Кыргызстана и одного вуза Южной Кореи: находимость, языковую доступность, полноту, ясность и удобство.',
              )}
            </p>
            <p className="body-2 muted">
              {tr(
                'Status: planning and discovery. This site is a working prototype, not a released service.',
                'Статус: планирование и исследование. Этот сайт — рабочий прототип, а не запущенный сервис.',
              )}
            </p>
          </div>
          <div>
            <h2 className="h3">{tr('Information policy', 'Политика информации')}</h2>
            <ul className="bullets">
              <li>{tr('UniBridge does not represent any university or government body.', 'UniBridge не представляет вузы и государственные органы.')}</li>
              <li>{tr('We don’t make admission decisions or accept applications.', 'Мы не принимаем решений о зачислении и не принимаем заявки.')}</li>
              <li>{tr('Images marked “Concept image” are illustrations, not photos of real campuses.', 'Изображения с пометкой «Концепт-изображение» — иллюстрации, а не фото реальных кампусов.')}</li>
              <li>{tr('We don’t collect passports, documents or other personal data.', 'Мы не собираем паспорта, документы и другие личные данные.')}</li>
            </ul>
          </div>
        </section>

        <section className="cta-inline card pad">
          <div>
            <h2 className="h4">{tr('Found a mistake?', 'Нашли ошибку?')}</h2>
            <p className="body-2">{tr('Tell us — corrections make the guide better for everyone.', 'Напишите — исправления делают гид лучше для всех.')}</p>
          </div>
          <Link to="/contact" className="btn btn--primary">
            {tr('Contact us', 'Связаться')} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
