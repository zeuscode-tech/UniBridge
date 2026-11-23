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
    title: { en: 'Global Korea Scholarship (GKS)', ru: 'Global Korea Scholarship (GKS)', ko: '정부초청장학금(GKS)' },
    provider: {
      en: 'NIIED · Ministry of Education, Republic of Korea',
      ru: 'NIIED · Министерство образования Республики Корея', ko: '국립국제교육원 · 대한민국 교육부',
    },
    directions: ['kg-kr'],
    kind: 'government',
    levels: ['bachelor', 'master', 'doctoral'],
    who: {
      en: 'International students applying to degree programmes at Korean universities. Country quotas and eligibility change every year.',
      ru: 'Иностранные студенты, поступающие на программы в корейских вузах. Квоты по странам и условия меняются каждый год.', ko: '한국 대학의 학위 과정에 지원하는 외국인 학생. 국가별 인원과 자격 조건은 해마다 바뀌어요.',
    },
    coverage: null,
    deadline: null,
    source: { label: 'Study in Korea (NIIED)', url: 'https://www.studyinkorea.go.kr' },
    howToApply: {
      en: 'Applications usually go either through the Korean embassy or directly through a university, depending on the track. Read the current year’s official notice before preparing anything.',
      ru: 'Подача обычно идёт через посольство Кореи или напрямую через университет — зависит от трека. Сначала прочитай официальное объявление текущего года.', ko: '트랙에 따라 보통 한국 대사관이나 대학을 통해 지원해요. 준비하기 전에 올해 공식 공고부터 읽어 보세요.',
    },
    status: 'needs_review',
  },
  {
    slug: 'korean-university-scholarships',
    title: {
      en: 'University scholarships for international students in Korea',
      ru: 'Стипендии корейских вузов для иностранных студентов', ko: '한국 대학의 외국인 유학생 장학금',
    },
    provider: { en: 'Admissions office of each university', ru: 'Приёмная комиссия каждого вуза', ko: '각 대학 입학처' },
    directions: ['kg-kr'],
    kind: 'university',
    levels: null,
    who: {
      en: 'Admitted or applying international students. Criteria, often grades or language level, are set by each university.',
      ru: 'Иностранные абитуриенты и студенты. Критерии — часто оценки или уровень языка — устанавливает каждый вуз.', ko: '합격했거나 지원하는 외국인 학생. 성적이나 어학 수준 같은 기준은 대학마다 정해요.',
    },
    coverage: null,
    deadline: null,
    source: null,
    howToApply: {
      en: 'Find the international admissions page of the university you chose and look for “scholarship” in the current admission guide.',
      ru: 'Открой страницу приёма иностранцев выбранного вуза и найди раздел о стипендиях в актуальном руководстве по поступлению.', ko: '선택한 대학의 외국인 입학 페이지를 열고, 올해 모집 요강에서 ‘장학금’ 항목을 찾아보세요.',
    },
    status: 'needs_review',
  },
  {
    slug: 'kyrgyz-university-grants',
    title: {
      en: 'Tuition grants and discounts at universities in Kyrgyzstan',
      ru: 'Гранты и скидки на обучение в вузах Кыргызстана', ko: '키르기스스탄 대학의 등록금 지원과 할인',
    },
    provider: { en: 'International office of each university', ru: 'Международный отдел каждого вуза', ko: '각 대학 국제처' },
    directions: ['kr-kg'],
    kind: 'university',
    levels: null,
    who: {
      en: 'International applicants. Whether foreign students qualify differs from one university to another.',
      ru: 'Иностранные абитуриенты. Доступны ли гранты иностранцам, зависит от конкретного вуза.', ko: '외국인 지원자. 외국인도 받을 수 있는지는 대학마다 달라요.',
    },
    coverage: null,
    deadline: null,
    source: null,
    howToApply: {
      en: 'Write to the university’s international office and ask which grants are open to citizens of your country this year.',
      ru: 'Напиши в международный отдел вуза и уточни, какие гранты в этом году доступны гражданам твоей страны.', ko: '대학 국제처에 연락해 올해 우리나라 국민이 받을 수 있는 지원이 무엇인지 물어보세요.',
    },
    status: 'unknown',
  },
  {
    slug: 'exchange-agreements',
    title: {
      en: 'Exchange semesters under partner agreements',
      ru: 'Обменный семестр по партнёрским соглашениям', ko: '협정에 따른 교환학생 학기',
    },
    provider: { en: 'International office of your current university', ru: 'Международный отдел твоего текущего вуза', ko: '지금 다니는 대학의 국제처' },
    directions: ['kg-kr', 'kr-kg'],
    kind: 'exchange',
    levels: ['bachelor', 'master'],
    who: {
      en: 'Students already enrolled at a university that has a partner in the other country.',
      ru: 'Студенты, которые уже учатся в вузе, у которого есть партнёр в другой стране.', ko: '상대 나라에 협력 대학이 있는 대학에 이미 다니는 학생.',
    },
    coverage: null,
    deadline: null,
    source: null,
    howToApply: {
      en: 'Ask your home university which partners it has and when the internal selection takes place.',
      ru: 'Узнай в своём вузе список партнёров и сроки внутреннего отбора.', ko: '지금 다니는 대학에 협력 대학 목록과 교내 선발 일정을 물어보세요.',
    },
    status: 'unknown',
  },
];

export const KIND_LABEL: Record<FundingKind, L> = {
  government: { en: 'Government programme', ru: 'Государственная программа', ko: '정부 프로그램' },
  university: { en: 'University funding', ru: 'Финансирование вуза', ko: '대학 지원' },
  exchange: { en: 'Exchange', ru: 'Обмен', ko: '교환학생' },
};

export const LEVEL_LABEL: Record<Level, L> = {
  bachelor: { en: 'Bachelor’s', ru: 'Бакалавриат', ko: '학사' },
  master: { en: 'Master’s', ru: 'Магистратура', ko: '석사' },
  doctoral: { en: 'Doctoral', ru: 'Докторантура', ko: '박사' },
};
