import type { L } from '../state/prefs';

export type Phase = 'research' | 'requirements' | 'documents' | 'application' | 'arrival';

export interface ChecklistItem {
  id: string;
  phase: Phase;
  title: L;
  desc: L;
  guide?: string;
}

export const PHASES: { id: Phase; title: L }[] = [
  { id: 'research', title: { en: 'Research', ru: 'Исследование', ko: '알아보기' } },
  { id: 'requirements', title: { en: 'Requirements', ru: 'Требования', ko: '지원 요건' } },
  { id: 'documents', title: { en: 'Documents', ru: 'Документы', ko: '서류' } },
  { id: 'application', title: { en: 'Application', ru: 'Подача', ko: '지원' } },
  { id: 'arrival', title: { en: 'Arrival', ru: 'Переезд', ko: '입국' } },
];

export const CHECKLIST: ChecklistItem[] = [
  {
    id: 'shortlist',
    phase: 'research',
    title: { en: 'Shortlist 3–5 universities', ru: 'Составить список из 3–5 вузов', ko: '대학 3~5곳 고르기' },
    desc: { en: 'Save them in UniBridge to keep them in one place.', ru: 'Сохрани их в UniBridge, чтобы всё было в одном месте.', ko: 'UniBridge에 저장해 한곳에서 관리하세요.' },
    guide: 'choose-university',
  },
  {
    id: 'compare-programs',
    phase: 'research',
    title: { en: 'Compare programmes', ru: 'Сравнить программы', ko: '학과 비교하기' },
    desc: { en: 'Degree level, language of instruction, length.', ru: 'Уровень, язык обучения, длительность.', ko: '학위 과정, 수업 언어, 기간을 비교하세요.' },
    guide: 'choose-university',
  },
  {
    id: 'check-dates',
    phase: 'research',
    title: { en: 'Write down intake dates', ru: 'Выписать сроки набора', ko: '모집 일정 적어 두기' },
    desc: { en: 'Only from the official admission guide of this year.', ru: 'Только из официального руководства этого года.', ko: '올해 공식 모집 요강에서만 확인하세요.' },
    guide: 'apply-officially',
  },
  {
    id: 'academic-reqs',
    phase: 'requirements',
    title: { en: 'Check academic requirements', ru: 'Проверить академические требования', ko: '학업 요건 확인하기' },
    desc: { en: 'Diploma, grades, prerequisite subjects.', ru: 'Диплом, оценки, профильные предметы.', ko: '졸업장, 성적, 필수 과목을 확인하세요.' },
    guide: 'check-requirements',
  },
  {
    id: 'language-reqs',
    phase: 'requirements',
    title: { en: 'Check language requirements', ru: 'Проверить языковые требования', ko: '어학 요건 확인하기' },
    desc: { en: 'Which test, which level, how recent.', ru: 'Какой тест, какой уровень, срок действия.', ko: '어떤 시험, 어떤 급수, 유효 기간을 확인하세요.' },
    guide: 'check-requirements',
  },
  {
    id: 'docs-list',
    phase: 'requirements',
    title: { en: 'Find the official document list', ru: 'Найти официальный список документов', ko: '공식 제출 서류 목록 찾기' },
    desc: { en: 'Per programme, not per university.', ru: 'Для программы, а не для вуза в целом.', ko: '대학 전체가 아니라 학과별로 확인하세요.' },
    guide: 'prepare-documents',
  },
  {
    id: 'personal-docs',
    phase: 'documents',
    title: { en: 'Make your personal document list', ru: 'Составить личный список документов', ko: '내 서류 목록 만들기' },
    desc: { en: 'Keep scans offline — never upload them here.', ru: 'Храни сканы у себя — сюда их не загружай.', ko: '스캔본은 내 기기에만 두고, 여기에는 올리지 마세요.' },
    guide: 'prepare-documents',
  },
  {
    id: 'translations',
    phase: 'documents',
    title: { en: 'Check translation and apostille rules', ru: 'Проверить правила перевода и апостиля', ko: '번역과 아포스티유 규정 확인하기' },
    desc: { en: 'Notarised translation, apostille or consular legalisation.', ru: 'Нотариальный перевод, апостиль или консульская легализация.', ko: '공증 번역, 아포스티유, 영사 확인 중 무엇이 필요한지 보세요.' },
    guide: 'prepare-documents',
  },
  {
    id: 'funding',
    phase: 'documents',
    title: { en: 'Decide on funding', ru: 'Определиться с финансированием', ko: '학비 마련 방법 정하기' },
    desc: { en: 'Scholarship, own funds or both.', ru: 'Стипендия, свои средства или оба варианта.', ko: '장학금, 개인 자금, 또는 둘 다.' },
    guide: 'explore-funding',
  },
  {
    id: 'portal',
    phase: 'application',
    title: { en: 'Find the official application portal', ru: 'Найти официальный портал подачи', ko: '공식 지원 사이트 찾기' },
    desc: { en: 'Applications are never submitted through UniBridge.', ru: 'Через UniBridge заявки не подаются.', ko: 'UniBridge에서는 지원서를 제출하지 않아요.' },
    guide: 'apply-officially',
  },
  {
    id: 'submit',
    phase: 'application',
    title: { en: 'Submit and mark it here', ru: 'Подать и отметить здесь', ko: '지원하고 여기에 표시하기' },
    desc: { en: 'Save the confirmation e-mail from the university.', ru: 'Сохрани письмо-подтверждение от вуза.', ko: '대학에서 온 확인 메일을 저장해 두세요.' },
    guide: 'apply-officially',
  },
  {
    id: 'visa',
    phase: 'arrival',
    title: { en: 'Read the official visa instructions', ru: 'Изучить официальные визовые инструкции', ko: '공식 비자 안내 읽기' },
    desc: { en: 'Start after you receive the admission letter.', ru: 'Начни после получения письма о зачислении.', ko: '입학 허가서를 받은 뒤 시작하세요.' },
    guide: 'prepare-arrival',
  },
  {
    id: 'housing',
    phase: 'arrival',
    title: { en: 'Sort out housing', ru: 'Решить вопрос с жильём', ko: '숙소 정하기' },
    desc: { en: 'Dormitory application or private rent.', ru: 'Заявка в общежитие или аренда.', ko: '기숙사 신청 또는 개인 임대.' },
    guide: 'prepare-arrival',
  },
  {
    id: 'support',
    phase: 'arrival',
    title: { en: 'Find the international student office', ru: 'Найти офис для иностранных студентов', ko: '국제학생 담당 부서 찾기' },
    desc: { en: 'Their contacts are on the university website.', ru: 'Контакты есть на сайте университета.', ko: '연락처는 대학 웹사이트에 있어요.' },
    guide: 'prepare-arrival',
  },
];

export const BASE_PLAN = CHECKLIST.map((c) => c.id);
export const findItem = (id: string) => CHECKLIST.find((c) => c.id === id);
