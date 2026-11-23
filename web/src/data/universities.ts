import type { L } from '../state/prefs';

/**
 * Content status, spec §21. Nothing here is "verified": the team has not yet
 * checked these entries against the universities' own admission pages.
 */
export type ContentStatus = 'verified' | 'needs_review' | 'unknown';
export type UniType = 'national' | 'private' | 'government' | 'intergovernmental';

export interface University {
  slug: string;
  name: string;
  /** Name in the country's own language. */
  localName: string;
  /** Short mark drawn on the generated cover. */
  monogram: string;
  country: 'KR' | 'KG';
  city: L;
  type: UniType;
  website: string;
  founded?: number;
  summary: L;
  status: ContentStatus;
  lastVerified: string | null;
  /** Hue tweak for the generated cover, so cards are told apart at a glance. */
  tone: 'blue' | 'navy' | 'teal' | 'indigo';
  /**
   * How the entry is connected to the project:
   * home    — Salymbekov University, where the UniBridge team studies;
   * huss    — a university taking part in the HUSS Global Capstone Design programme;
   * partner — a Korean partner listed among Salymbekov University's memoranda of cooperation.
   */
  affiliation?: Affiliation;
}

export type Affiliation = 'home' | 'huss' | 'partner';

export const AFFILIATION_LABEL: Record<Affiliation, L> = {
  home: { en: 'Our university', ru: 'Наш университет', ko: '우리 대학교' },
  huss: { en: 'HUSS Capstone partner', ru: 'Партнёр HUSS Capstone', ko: 'HUSS 캡스톤 파트너' },
  partner: { en: 'Salymbekov partner', ru: 'Партнёр Салымбеков', ko: '살롬베코프 협력 대학' },
};

const AFFILIATION_RANK: Record<Affiliation, number> = { home: 0, huss: 1, partner: 2 };

/** Project-linked universities first, then everyone else. */
export const affiliationRank = (u: University) => (u.affiliation ? AFFILIATION_RANK[u.affiliation] : 9);

// Only facts that are stable and easy to check on the official site:
// name, city, type, website and founding year. Programs, languages, fees
// and deadlines are left unknown on purpose until the team verifies them.
export const UNIVERSITIES: University[] = [
  // --- Korea: universities in the HUSS Global Capstone Design programme ---
  {
    slug: 'sogang-university',
    name: 'Sogang University',
    localName: '서강대학교',
    monogram: '서강',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул', ko: '서울' },
    type: 'private',
    website: 'https://www.sogang.ac.kr',
    founded: 1960,
    summary: {
      en: 'Private university in Seoul. Takes part in the HUSS Global Capstone Design programme.',
      ru: 'Частный университет в Сеуле. Участник программы HUSS Global Capstone Design.',
      ko: '서울에 있는 사립대학교예요. HUSS Global Capstone Design 프로그램에 참여하고 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'indigo',
    affiliation: 'huss',
  },
  {
    slug: 'daegu-university',
    name: 'Daegu University',
    localName: '대구대학교',
    monogram: '대구대',
    country: 'KR',
    city: { en: 'Gyeongsan', ru: 'Кёнсан', ko: '경산' },
    type: 'private',
    website: 'https://www.daegu.ac.kr',
    founded: 1956,
    summary: {
      en: 'Private university in Gyeongsan near Daegu. Takes part in the HUSS Global Capstone Design programme.',
      ru: 'Частный университет в Кёнсане под Тэгу. Участник программы HUSS Global Capstone Design.',
      ko: '대구 근처 경산에 있는 사립대학교예요. HUSS Global Capstone Design 프로그램에 참여하고 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'blue',
    affiliation: 'huss',
  },
  {
    slug: 'sangji-university',
    name: 'Sangji University',
    localName: '상지대학교',
    monogram: '상지대',
    country: 'KR',
    city: { en: 'Wonju', ru: 'Вонджу', ko: '원주' },
    type: 'private',
    website: 'https://www.sangji.ac.kr',
    summary: {
      en: 'Private university in Wonju. Takes part in the HUSS Global Capstone Design programme.',
      ru: 'Частный университет в Вонджу. Участник программы HUSS Global Capstone Design.',
      ko: '원주에 있는 사립대학교예요. HUSS Global Capstone Design 프로그램에 참여하고 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
    affiliation: 'huss',
  },
  {
    slug: 'incheon-national-university',
    name: 'Incheon National University',
    localName: '인천대학교',
    monogram: '인천대',
    country: 'KR',
    city: { en: 'Incheon', ru: 'Инчхон', ko: '인천' },
    type: 'national',
    website: 'https://www.inu.ac.kr',
    founded: 1979,
    summary: {
      en: 'National university in Incheon. Takes part in the HUSS Global Capstone Design programme.',
      ru: 'Национальный университет в Инчхоне. Участник программы HUSS Global Capstone Design.',
      ko: '인천에 있는 국립대학교예요. HUSS Global Capstone Design 프로그램에 참여하고 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'navy',
    affiliation: 'huss',
  },
  // --- Korea: partners in Salymbekov University's memoranda of cooperation ---
  {
    slug: 'inha-university',
    name: 'Inha University',
    localName: '인하대학교',
    monogram: '인하',
    country: 'KR',
    city: { en: 'Incheon', ru: 'Инчхон', ko: '인천' },
    type: 'private',
    website: 'https://www.inha.ac.kr',
    founded: 1954,
    summary: {
      en: 'Private university in Incheon. Listed on salymbekov.com among Salymbekov University’s memoranda of cooperation.',
      ru: 'Частный университет в Инчхоне. Указан на salymbekov.com среди меморандумов о сотрудничестве Салымбеков Университета.',
      ko: '인천에 있는 사립대학교예요. salymbekov.com에 살롬베코프 대학교의 협력 협약(MOU) 대학으로 나와 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'blue',
    affiliation: 'partner',
  },
  {
    slug: 'inha-technical-college',
    name: 'Inha Technical College',
    localName: '인하공업전문대학',
    monogram: '인하공전',
    country: 'KR',
    city: { en: 'Incheon', ru: 'Инчхон', ko: '인천' },
    type: 'private',
    website: 'https://www.inhatc.ac.kr',
    founded: 1958,
    summary: {
      en: 'Private technical college in Incheon. Listed on salymbekov.com among Salymbekov University’s memoranda of cooperation.',
      ru: 'Частный технический колледж в Инчхоне. Указан на salymbekov.com среди меморандумов о сотрудничестве Салымбеков Университета.',
      ko: '인천에 있는 사립 전문대학이에요. salymbekov.com에 살롬베코프 대학교의 협력 협약(MOU) 대학으로 나와 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
    affiliation: 'partner',
  },
  // --- Korea: other well-known universities ---
  {
    slug: 'seoul-national-university',
    name: 'Seoul National University',
    localName: '서울대학교',
    monogram: '서울대',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул', ko: '서울' },
    type: 'national',
    website: 'https://www.snu.ac.kr',
    founded: 1946,
    summary: {
      en: 'National university in Seoul, founded in 1946.',
      ru: 'Национальный университет в Сеуле, основан в 1946 году.',
      ko: '서울에 있는 국립대학교예요. 1946년에 세워졌어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'navy',
  },
  {
    slug: 'yonsei-university',
    name: 'Yonsei University',
    localName: '연세대학교',
    monogram: '연세',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул', ko: '서울' },
    type: 'private',
    website: 'https://www.yonsei.ac.kr',
    founded: 1885,
    summary: {
      en: 'Private university in Seoul whose history goes back to 1885.',
      ru: 'Частный университет в Сеуле, история которого начинается в 1885 году.',
      ko: '서울에 있는 사립대학교예요. 역사가 1885년에 시작됐어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'blue',
  },
  {
    slug: 'korea-university',
    name: 'Korea University',
    localName: '고려대학교',
    monogram: '고려',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул', ko: '서울' },
    type: 'private',
    website: 'https://www.korea.ac.kr',
    founded: 1905,
    summary: {
      en: 'Private university in Seoul, founded in 1905.',
      ru: 'Частный университет в Сеуле, основан в 1905 году.',
      ko: '서울에 있는 사립대학교예요. 1905년에 세워졌어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'indigo',
  },
  {
    slug: 'kaist',
    name: 'KAIST',
    localName: '한국과학기술원',
    monogram: 'KAIST',
    country: 'KR',
    city: { en: 'Daejeon', ru: 'Тэджон', ko: '대전' },
    type: 'government',
    website: 'https://www.kaist.ac.kr',
    founded: 1971,
    summary: {
      en: 'Government-funded science and technology university in Daejeon.',
      ru: 'Государственный научно-технический университет в Тэджоне.',
      ko: '대전에 있는 정부 출연 과학기술 대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
  },
  {
    slug: 'pusan-national-university',
    name: 'Pusan National University',
    localName: '부산대학교',
    monogram: '부산대',
    country: 'KR',
    city: { en: 'Busan', ru: 'Пусан', ko: '부산' },
    type: 'national',
    website: 'https://www.pusan.ac.kr',
    founded: 1946,
    summary: {
      en: 'National university in Busan, founded in 1946.',
      ru: 'Национальный университет в Пусане, основан в 1946 году.',
      ko: '부산에 있는 국립대학교예요. 1946년에 세워졌어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'blue',
  },
  {
    slug: 'kyung-hee-university',
    name: 'Kyung Hee University',
    localName: '경희대학교',
    monogram: '경희',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул', ko: '서울' },
    type: 'private',
    website: 'https://www.khu.ac.kr',
    summary: {
      en: 'Private university with campuses in Seoul and Yongin.',
      ru: 'Частный университет с кампусами в Сеуле и Йонъине.',
      ko: '서울과 용인에 캠퍼스가 있는 사립대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'navy',
  },
  {
    slug: 'sungkyunkwan-university',
    name: 'Sungkyunkwan University',
    localName: '성균관대학교',
    monogram: '성균관',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул', ko: '서울' },
    type: 'private',
    website: 'https://www.skku.edu',
    summary: {
      en: 'Private university with campuses in Seoul and Suwon.',
      ru: 'Частный университет с кампусами в Сеуле и Сувоне.',
      ko: '서울과 수원에 캠퍼스가 있는 사립대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
  },

  // --- Kyrgyzstan: Salymbekov University, home of the UniBridge team ---
  {
    slug: 'salymbekov-university',
    name: 'Salymbekov University',
    localName: 'Салымбеков Университет',
    monogram: 'Салымбеков',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'private',
    website: 'https://salymbekov.com',
    founded: 2019,
    summary: {
      en: 'Private university in Bishkek with a Higher School of Medicine, the American Institute of Technology, a business school and an IT college. Home of the UniBridge team and of Kyrgyzstan’s teams in HUSS Global Capstone Design.',
      ru: 'Частный университет в Бишкеке: Высшая школа медицины, Американский институт технологий, бизнес-школа и IT-колледж. Здесь учится команда UniBridge и кыргызстанские команды HUSS Global Capstone Design.',
      ko: '비슈케크에 있는 사립대학교예요. 의과대학(Higher School of Medicine), American Institute of Technology, 비즈니스 스쿨, IT 칼리지가 있어요. UniBridge 팀과 HUSS Global Capstone Design의 키르기스스탄 팀이 이곳에서 공부해요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'navy',
    affiliation: 'home',
  },
  {
    slug: 'salymbekov-international-college-it-business',
    name: 'International College of IT and Business (Salymbekov University)',
    localName: 'Международный колледж IT и бизнеса Салымбеков Университета',
    monogram: 'Колледж',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'private',
    website: 'https://salymbekov.com/en/mezhdunarodnyj-kolledzh-it-i-biznesa/',
    summary: {
      en: 'College of Salymbekov University: computer science, multimedia and mobile development, taught in Russian and English, entry after grade 9 or 11.',
      ru: 'Колледж Салымбеков Университета: компьютерные науки, мультимедиа и мобильная разработка, обучение на русском и английском, приём после 9 или 11 класса.',
      ko: '살롬베코프 대학교의 칼리지예요. 컴퓨터 과학, 멀티미디어, 모바일 개발을 러시아어와 영어로 가르쳐요. 9학년이나 11학년을 마치면 입학할 수 있어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
    affiliation: 'home',
  },
  // --- Kyrgyzstan: other universities ---
  {
    slug: 'kyrgyz-national-university',
    name: 'Kyrgyz National University named after J. Balasagyn',
    localName: 'Кыргызский национальный университет им. Ж. Баласагына',
    monogram: 'КНУ',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'national',
    website: 'https://knu.kg',
    summary: {
      en: 'National university in Bishkek.',
      ru: 'Национальный университет в Бишкеке.',
      ko: '비슈케크에 있는 국립대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'navy',
  },
  {
    slug: 'american-university-of-central-asia',
    name: 'American University of Central Asia',
    localName: 'Американский университет в Центральной Азии',
    monogram: 'АУЦА',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'private',
    website: 'https://auca.kg',
    founded: 1997,
    summary: {
      en: 'Private liberal-arts university in Bishkek, founded in 1997.',
      ru: 'Частный университет свободных искусств в Бишкеке, основан в 1997 году.',
      ko: '비슈케크에 있는 사립 교양(리버럴 아츠) 대학교예요. 1997년에 세워졌어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'blue',
  },
  {
    slug: 'kyrgyz-turkish-manas-university',
    name: 'Kyrgyz-Turkish Manas University',
    localName: 'Кыргызско-Турецкий университет «Манас»',
    monogram: 'Манас',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'intergovernmental',
    website: 'https://manas.edu.kg',
    founded: 1995,
    summary: {
      en: 'Intergovernmental Kyrgyz–Turkish university in Bishkek, founded in 1995.',
      ru: 'Межгосударственный кыргызско-турецкий университет в Бишкеке, основан в 1995 году.',
      ko: '키르기스스탄과 튀르키예 정부가 함께 세운 대학교로, 비슈케크에 있어요. 1995년에 세워졌어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
  },
  {
    slug: 'kyrgyz-russian-slavic-university',
    name: 'Kyrgyz-Russian Slavic University',
    localName: 'Кыргызско-Российский Славянский университет им. Б. Н. Ельцина',
    monogram: 'КРСУ',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'intergovernmental',
    website: 'https://www.krsu.kg',
    founded: 1993,
    summary: {
      en: 'Intergovernmental Kyrgyz–Russian university in Bishkek, founded in 1993.',
      ru: 'Межгосударственный кыргызско-российский университет в Бишкеке, основан в 1993 году.',
      ko: '키르기스스탄과 러시아 정부가 함께 세운 대학교로, 비슈케크에 있어요. 1993년에 세워졌어요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'indigo',
  },
  {
    slug: 'kyrgyz-state-technical-university',
    name: 'Kyrgyz State Technical University named after I. Razzakov',
    localName: 'Кыргызский государственный технический университет им. И. Раззакова',
    monogram: 'КГТУ',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'national',
    website: 'https://kstu.kg',
    summary: {
      en: 'State technical university in Bishkek.',
      ru: 'Государственный технический университет в Бишкеке.',
      ko: '비슈케크에 있는 국립 기술대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'blue',
  },
  {
    slug: 'osh-state-university',
    name: 'Osh State University',
    localName: 'Ошский государственный университет',
    monogram: 'ОшГУ',
    country: 'KG',
    city: { en: 'Osh', ru: 'Ош', ko: '오시' },
    type: 'national',
    website: 'https://oshsu.kg',
    summary: {
      en: 'State university in Osh, in the south of Kyrgyzstan.',
      ru: 'Государственный университет в Оше, на юге Кыргызстана.',
      ko: '키르기스스탄 남부 오시에 있는 국립대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'navy',
  },
  {
    slug: 'ala-too-international-university',
    name: 'Ala-Too International University',
    localName: 'Международный университет «Ала-Тоо»',
    monogram: 'Ала-Тоо',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек', ko: '비슈케크' },
    type: 'private',
    website: 'https://alatoo.edu.kg',
    summary: {
      en: 'Private international university in Bishkek.',
      ru: 'Частный международный университет в Бишкеке.',
      ko: '비슈케크에 있는 사립 국제대학교예요.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'indigo',
  },
];

export const TYPE_LABEL: Record<UniType, L> = {
  national: { en: 'Public', ru: 'Государственный', ko: '국립' },
  government: { en: 'Government-funded', ru: 'Гос. финансирование', ko: '정부 출연' },
  private: { en: 'Private', ru: 'Частный', ko: '사립' },
  intergovernmental: { en: 'Intergovernmental', ru: 'Межгосударственный', ko: '정부 간 공동 설립' },
};

export const findUniversity = (slug: string) => UNIVERSITIES.find((u) => u.slug === slug);

export const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
