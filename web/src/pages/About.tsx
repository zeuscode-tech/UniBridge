import { Link } from 'react-router-dom';
import { BookOpenCheck, Compass, Link2, Scale } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { Breadcrumbs, ConceptImage, Reveal } from '../components/ui';
import students from '../assets/students.jpg';

export default function About() {
  const { tr } = usePrefs();
  const how = [
    { icon: Compass, t: tr('Research', 'Исследование', '조사'), d: tr('We compare orientation resources of universities in both countries.', 'Сравниваем материалы для иностранных студентов в вузах обеих стран.', '두 나라 대학의 유학생 안내 자료를 비교해요.') },
    { icon: Link2, t: tr('Checkable sources', 'Проверяемые источники', '확인할 수 있는 출처'), d: tr('Every important fact links to an official page and a review date.', 'У каждого важного факта есть ссылка на официальную страницу и дата проверки.', '중요한 정보마다 공식 페이지 링크와 확인 날짜를 달아요.') },
    { icon: BookOpenCheck, t: tr('Clear instructions', 'Понятные инструкции', '알기 쉬운 안내'), d: tr('Plain-language steps instead of scattered PDFs.', 'Простые шаги вместо разрозненных PDF.', '흩어진 PDF 대신 쉬운 말로 단계별로 안내해요.') },
    { icon: Scale, t: tr('Honest limits', 'Честные границы', '모르는 건 솔직하게'), d: tr('If we don’t know something, the page says so.', 'Если мы чего-то не знаем — страница прямо это говорит.', '모르는 정보는 모른다고 페이지에 적어요.') },
  ];
  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная', '홈'), to: '/' }, { label: tr('About', 'О проекте', '프로젝트 소개') }]} />
        <section className="about-hero">
          <div>
            <p className="eyebrow">{tr('About UniBridge', 'О UniBridge', 'UniBridge 소개')}</p>
            <h1 className="display display--sm">{tr('Connecting students, universities and opportunities', 'Соединяем студентов, университеты и возможности', '학생과 대학, 기회를 이어요')}</h1>
            <p className="lead">
              {tr(
                'Moving to study in another country means hunting for information across websites, PDFs and languages. UniBridge puts the essentials for Kyrgyzstan ↔ South Korea in one calm place.',
                'Переезд на учёбу в другую страну — это поиск информации по сайтам, PDF и разным языкам. UniBridge собирает главное для направления Кыргызстан ↔ Южная Корея в одном спокойном месте.',
                '다른 나라로 유학을 가려면 여러 웹사이트와 PDF, 여러 언어로 된 정보를 찾아다녀야 해요. UniBridge는 키르기스스탄 ↔ 한국 유학에 꼭 필요한 정보를 한곳에 차분하게 모아요.',
              )}
            </p>
          </div>
          <ConceptImage src={students} alt={tr('Illustration: two students working in a library', 'Иллюстрация: два студента занимаются в библиотеке', '일러스트: 도서관에서 공부하는 학생 두 명')} className="about-hero__img" eager />
        </section>

        <section className="section-tight">
          <h2 className="h2">{tr('How we work', 'Как мы работаем', '이렇게 일해요')}</h2>
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
            <h2 className="h3">{tr('Research & Capstone', 'Исследование и Capstone', '연구와 캡스톤')}</h2>
            <p className="body-1">
              {tr(
                'UniBridge is a HUSS Global Capstone Design project (November 2026 – January 2027). The research compares orientation resources from one university in Kyrgyzstan and one in South Korea: findability, language accessibility, completeness, clarity and usability.',
                'UniBridge — проект HUSS Global Capstone Design (ноябрь 2026 — январь 2027). Исследование сравнивает материалы для иностранных студентов одного вуза Кыргызстана и одного вуза Южной Кореи: находимость, языковую доступность, полноту, ясность и удобство.',
                'UniBridge는 HUSS Global Capstone Design 프로젝트예요(2026년 11월~2027년 1월). 키르기스스탄 대학 한 곳과 한국 대학 한 곳의 유학생 안내 자료를 찾기 쉬운지, 언어 접근성, 충분한지, 명확한지, 쓰기 편한지 기준으로 비교해요.',
              )}
            </p>
            <p className="body-2 muted">
              {tr(
                'Status: planning and discovery. This site is a working prototype, not a released service.',
                'Статус: планирование и исследование. Этот сайт — рабочий прототип, а не запущенный сервис.',
                '현재 단계: 기획과 조사. 이 사이트는 정식 서비스가 아니라 작동하는 프로토타입이에요.',
              )}
            </p>
          </div>
          <div>
            <h2 className="h3">{tr('Information policy', 'Политика информации', '정보 원칙')}</h2>
            <ul className="bullets">
              <li>{tr('UniBridge does not represent any university or government body.', 'UniBridge не представляет вузы и государственные органы.', 'UniBridge는 어떤 대학이나 정부 기관도 대표하지 않아요.')}</li>
              <li>{tr('We don’t make admission decisions or accept applications.', 'Мы не принимаем решений о зачислении и не принимаем заявки.', '입학을 결정하거나 지원서를 받지 않아요.')}</li>
              <li>{tr('Images marked “Concept image” are illustrations, not photos of real campuses.', 'Изображения с пометкой «Концепт-изображение» — иллюстрации, а не фото реальных кампусов.', '“콘셉트 이미지” 표시가 있는 이미지는 실제 캠퍼스 사진이 아니라 일러스트예요.')}</li>
              <li>{tr('We don’t collect passports, documents or other personal data.', 'Мы не собираем паспорта, документы и другие личные данные.', '여권, 서류 같은 개인정보는 받지 않아요.')}</li>
            </ul>
          </div>
        </section>

        <section className="cta-inline card pad">
          <div>
            <h2 className="h4">{tr('Found a mistake?', 'Нашли ошибку?', '잘못된 정보를 찾았나요?')}</h2>
            <p className="body-2">{tr('Tell us — corrections make the guide better for everyone.', 'Напишите — исправления делают гид лучше для всех.', '알려 주세요. 고쳐 주신 내용은 모두에게 도움이 돼요.')}</p>
          </div>
          <Link to="/contact" className="btn btn--primary">
            {tr('Contact us', 'Связаться', '문의하기')}
          </Link>
        </section>
      </div>
    </div>
  );
}
