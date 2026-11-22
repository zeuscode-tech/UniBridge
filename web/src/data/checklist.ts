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
  { id: 'research', title: { en: 'Research', ru: 'Исследование' } },
  { id: 'requirements', title: { en: 'Requirements', ru: 'Требования' } },
  { id: 'documents', title: { en: 'Documents', ru: 'Документы' } },
  { id: 'application', title: { en: 'Application', ru: 'Подача' } },
  { id: 'arrival', title: { en: 'Arrival', ru: 'Переезд' } },
];

export const CHECKLIST: ChecklistItem[] = [
  {
    id: 'shortlist',
    phase: 'research',
    title: { en: 'Shortlist 3–5 universities', ru: 'Составить список из 3–5 вузов' },
    desc: { en: 'Save them in UniBridge to keep them in one place.', ru: 'Сохрани их в UniBridge, чтобы всё было в одном месте.' },
    guide: 'choose-university',
  },
  {
    id: 'compare-programs',
    phase: 'research',
    title: { en: 'Compare programmes', ru: 'Сравнить программы' },
    desc: { en: 'Degree level, language of instruction, length.', ru: 'Уровень, язык обучения, длительность.' },
    guide: 'choose-university',
  },
  {
    id: 'check-dates',
    phase: 'research',
    title: { en: 'Write down intake dates', ru: 'Выписать сроки набора' },
    desc: { en: 'Only from the official admission guide of this year.', ru: 'Только из официального руководства этого года.' },
    guide: 'apply-officially',
  },
  {
    id: 'academic-reqs',
    phase: 'requirements',
    title: { en: 'Check academic requirements', ru: 'Проверить академические требования' },
    desc: { en: 'Diploma, grades, prerequisite subjects.', ru: 'Диплом, оценки, профильные предметы.' },
    guide: 'check-requirements',
  },
  {
    id: 'language-reqs',
    phase: 'requirements',
    title: { en: 'Check language requirements', ru: 'Проверить языковые требования' },
    desc: { en: 'Which test, which level, how recent.', ru: 'Какой тест, какой уровень, срок действия.' },
    guide: 'check-requirements',
  },
  {
    id: 'docs-list',
    phase: 'requirements',
    title: { en: 'Find the official document list', ru: 'Найти официальный список документов' },
    desc: { en: 'Per programme, not per university.', ru: 'Для программы, а не для вуза в целом.' },
    guide: 'prepare-documents',
  },
  {
    id: 'personal-docs',
    phase: 'documents',
    title: { en: 'Make your personal document list', ru: 'Составить личный список документов' },
    desc: { en: 'Keep scans offline — never upload them here.', ru: 'Храни сканы у себя — сюда их не загружай.' },
    guide: 'prepare-documents',
  },
  {
    id: 'translations',
    phase: 'documents',
    title: { en: 'Check translation and apostille rules', ru: 'Проверить правила перевода и апостиля' },
    desc: { en: 'Notarised translation, apostille or consular legalisation.', ru: 'Нотариальный перевод, апостиль или консульская легализация.' },
    guide: 'prepare-documents',
  },
  {
    id: 'funding',
    phase: 'documents',
    title: { en: 'Decide on funding', ru: 'Определиться с финансированием' },
    desc: { en: 'Scholarship, own funds or both.', ru: 'Стипендия, свои средства или оба варианта.' },
    guide: 'explore-funding',
  },
  {
    id: 'portal',
    phase: 'application',
    title: { en: 'Find the official application portal', ru: 'Найти официальный портал подачи' },
    desc: { en: 'Applications are never submitted through UniBridge.', ru: 'Через UniBridge заявки не подаются.' },
    guide: 'apply-officially',
  },
  {
    id: 'submit',
    phase: 'application',
    title: { en: 'Submit and mark it here', ru: 'Подать и отметить здесь' },
    desc: { en: 'Save the confirmation e-mail from the university.', ru: 'Сохрани письмо-подтверждение от вуза.' },
    guide: 'apply-officially',
  },
  {
    id: 'visa',
    phase: 'arrival',
    title: { en: 'Read the official visa instructions', ru: 'Изучить официальные визовые инструкции' },
    desc: { en: 'Start after you receive the admission letter.', ru: 'Начни после получения письма о зачислении.' },
    guide: 'prepare-arrival',
  },
  {
    id: 'housing',
    phase: 'arrival',
    title: { en: 'Sort out housing', ru: 'Решить вопрос с жильём' },
    desc: { en: 'Dormitory application or private rent.', ru: 'Заявка в общежитие или аренда.' },
    guide: 'prepare-arrival',
  },
  {
    id: 'support',
    phase: 'arrival',
    title: { en: 'Find the international student office', ru: 'Найти офис для иностранных студентов' },
    desc: { en: 'Their contacts are on the university website.', ru: 'Контакты есть на сайте университета.' },
    guide: 'prepare-arrival',
  },
];

export const BASE_PLAN = CHECKLIST.map((c) => c.id);
export const findItem = (id: string) => CHECKLIST.find((c) => c.id === id);
