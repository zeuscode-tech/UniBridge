import type { Direction, L } from '../state/prefs';
import type { ContentStatus } from './universities';

export type FundingKind = 'government' | 'university' | 'exchange';
export type Level = 'bachelor' | 'master' | 'doctoral';

export interface Scholarship {
  slug: string;
  title: L;
  provider: L;
  directions: Direction[];
  kind: FundingKind;
  levels: Level[] | null;
  who: L;
  /** null = not confirmed. We never fill coverage from memory. */
  coverage: L | null;
  /** null = "to be confirmed". */
  deadline: string | null;
  source: { label: string; url: string } | null;
  howToApply: L;
  status: ContentStatus;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    slug: 'global-korea-scholarship',
    title: { en: 'Global Korea Scholarship (GKS)', ru: 'Global Korea Scholarship (GKS)' },
    provider: {
      en: 'NIIED · Ministry of Education, Republic of Korea',
      ru: 'NIIED · Министерство образования Республики Корея',
    },
    directions: ['kg-kr'],
    kind: 'government',
    levels: ['bachelor', 'master', 'doctoral'],
    who: {
      en: 'International students applying to degree programmes at Korean universities. Country quotas and eligibility change every year.',
      ru: 'Иностранные студенты, поступающие на программы в корейских вузах. Квоты по странам и условия меняются каждый год.',
    },
    coverage: null,
    deadline: null,
    source: { label: 'Study in Korea (NIIED)', url: 'https://www.studyinkorea.go.kr' },
    howToApply: {
      en: 'Applications usually go either through the Korean embassy or directly through a university, depending on the track. Read the current year’s official notice before preparing anything.',
      ru: 'Подача обычно идёт через посольство Кореи или напрямую через университет — зависит от трека. Сначала прочитай официальное объявление текущего года.',
    },
    status: 'needs_review',
  },
  {
    slug: 'korean-university-scholarships',
    title: {
      en: 'University scholarships for international students in Korea',
      ru: 'Стипендии корейских вузов для иностранных студентов',
    },
    provider: { en: 'Admissions office of each university', ru: 'Приёмная комиссия каждого вуза' },
    directions: ['kg-kr'],
    kind: 'university',
    levels: null,
    who: {
      en: 'Admitted or applying international students. Criteria, often grades or language level, are set by each university.',
      ru: 'Иностранные абитуриенты и студенты. Критерии — часто оценки или уровень языка — устанавливает каждый вуз.',
    },
    coverage: null,
    deadline: null,
    source: null,
    howToApply: {
      en: 'Find the international admissions page of the university you chose and look for “scholarship” in the current admission guide.',
      ru: 'Открой страницу приёма иностранцев выбранного вуза и найди раздел о стипендиях в актуальном руководстве по поступлению.',
    },
    status: 'needs_review',
  },
  {
    slug: 'kyrgyz-university-grants',
    title: {
      en: 'Tuition grants and discounts at universities in Kyrgyzstan',
      ru: 'Гранты и скидки на обучение в вузах Кыргызстана',
    },
    provider: { en: 'International office of each university', ru: 'Международный отдел каждого вуза' },
    directions: ['kr-kg'],
    kind: 'university',
    levels: null,
    who: {
      en: 'International applicants. Whether foreign students qualify differs from one university to another.',
      ru: 'Иностранные абитуриенты. Доступны ли гранты иностранцам, зависит от конкретного вуза.',
    },
    coverage: null,
    deadline: null,
    source: null,
    howToApply: {
      en: 'Write to the university’s international office and ask which grants are open to citizens of your country this year.',
      ru: 'Напиши в международный отдел вуза и уточни, какие гранты в этом году доступны гражданам твоей страны.',
    },
    status: 'unknown',
  },
  {
    slug: 'exchange-agreements',
    title: {
      en: 'Exchange semesters under partner agreements',
      ru: 'Обменный семестр по партнёрским соглашениям',
    },
    provider: { en: 'International office of your current university', ru: 'Международный отдел твоего текущего вуза' },
    directions: ['kg-kr', 'kr-kg'],
    kind: 'exchange',
    levels: ['bachelor', 'master'],
    who: {
      en: 'Students already enrolled at a university that has a partner in the other country.',
      ru: 'Студенты, которые уже учатся в вузе, у которого есть партнёр в другой стране.',
    },
    coverage: null,
    deadline: null,
    source: null,
    howToApply: {
      en: 'Ask your home university which partners it has and when the internal selection takes place.',
      ru: 'Узнай в своём вузе список партнёров и сроки внутреннего отбора.',
    },
    status: 'unknown',
  },
];

export const KIND_LABEL: Record<FundingKind, L> = {
  government: { en: 'Government programme', ru: 'Государственная программа' },
  university: { en: 'University funding', ru: 'Финансирование вуза' },
  exchange: { en: 'Exchange', ru: 'Обмен' },
};

export const LEVEL_LABEL: Record<Level, L> = {
  bachelor: { en: 'Bachelor’s', ru: 'Бакалавриат' },
  master: { en: 'Master’s', ru: 'Магистратура' },
  doctoral: { en: 'Doctoral', ru: 'Докторантура' },
};
