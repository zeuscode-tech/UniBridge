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
}

// Only facts that are stable and easy to check on the official site:
// name, city, type, website and founding year. Programs, languages, fees
// and deadlines are left unknown on purpose until the team verifies them.
export const UNIVERSITIES: University[] = [
  {
    slug: 'seoul-national-university',
    name: 'Seoul National University',
    localName: '서울대학교',
    monogram: '서울대',
    country: 'KR',
    city: { en: 'Seoul', ru: 'Сеул' },
    type: 'national',
    website: 'https://www.snu.ac.kr',
    founded: 1946,
    summary: {
      en: 'National university in Seoul, founded in 1946.',
      ru: 'Национальный университет в Сеуле, основан в 1946 году.',
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
    city: { en: 'Seoul', ru: 'Сеул' },
    type: 'private',
    website: 'https://www.yonsei.ac.kr',
    founded: 1885,
    summary: {
      en: 'Private university in Seoul whose history goes back to 1885.',
      ru: 'Частный университет в Сеуле, история которого начинается в 1885 году.',
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
    city: { en: 'Seoul', ru: 'Сеул' },
    type: 'private',
    website: 'https://www.korea.ac.kr',
    founded: 1905,
    summary: {
      en: 'Private university in Seoul, founded in 1905.',
      ru: 'Частный университет в Сеуле, основан в 1905 году.',
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
    city: { en: 'Daejeon', ru: 'Тэджон' },
    type: 'government',
    website: 'https://www.kaist.ac.kr',
    founded: 1971,
    summary: {
      en: 'Government-funded science and technology university in Daejeon.',
      ru: 'Государственный научно-технический университет в Тэджоне.',
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
    city: { en: 'Busan', ru: 'Пусан' },
    type: 'national',
    website: 'https://www.pusan.ac.kr',
    founded: 1946,
    summary: {
      en: 'National university in Busan, founded in 1946.',
      ru: 'Национальный университет в Пусане, основан в 1946 году.',
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
    city: { en: 'Seoul', ru: 'Сеул' },
    type: 'private',
    website: 'https://www.khu.ac.kr',
    summary: {
      en: 'Private university with campuses in Seoul and Yongin.',
      ru: 'Частный университет с кампусами в Сеуле и Йонъине.',
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
    city: { en: 'Seoul', ru: 'Сеул' },
    type: 'private',
    website: 'https://www.skku.edu',
    summary: {
      en: 'Private university with campuses in Seoul and Suwon.',
      ru: 'Частный университет с кампусами в Сеуле и Сувоне.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'teal',
  },

  {
    slug: 'kyrgyz-national-university',
    name: 'Kyrgyz National University named after J. Balasagyn',
    localName: 'Кыргызский национальный университет им. Ж. Баласагына',
    monogram: 'КНУ',
    country: 'KG',
    city: { en: 'Bishkek', ru: 'Бишкек' },
    type: 'national',
    website: 'https://knu.kg',
    summary: {
      en: 'National university in Bishkek.',
      ru: 'Национальный университет в Бишкеке.',
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
    city: { en: 'Bishkek', ru: 'Бишкек' },
    type: 'private',
    website: 'https://auca.kg',
    founded: 1997,
    summary: {
      en: 'Private liberal-arts university in Bishkek, founded in 1997.',
      ru: 'Частный университет свободных искусств в Бишкеке, основан в 1997 году.',
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
    city: { en: 'Bishkek', ru: 'Бишкек' },
    type: 'intergovernmental',
    website: 'https://manas.edu.kg',
    founded: 1995,
    summary: {
      en: 'Intergovernmental Kyrgyz–Turkish university in Bishkek, founded in 1995.',
      ru: 'Межгосударственный кыргызско-турецкий университет в Бишкеке, основан в 1995 году.',
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
    city: { en: 'Bishkek', ru: 'Бишкек' },
    type: 'intergovernmental',
    website: 'https://www.krsu.kg',
    founded: 1993,
    summary: {
      en: 'Intergovernmental Kyrgyz–Russian university in Bishkek, founded in 1993.',
      ru: 'Межгосударственный кыргызско-российский университет в Бишкеке, основан в 1993 году.',
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
    city: { en: 'Bishkek', ru: 'Бишкек' },
    type: 'national',
    website: 'https://kstu.kg',
    summary: {
      en: 'State technical university in Bishkek.',
      ru: 'Государственный технический университет в Бишкеке.',
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
    city: { en: 'Osh', ru: 'Ош' },
    type: 'national',
    website: 'https://oshsu.kg',
    summary: {
      en: 'State university in Osh, in the south of Kyrgyzstan.',
      ru: 'Государственный университет в Оше, на юге Кыргызстана.',
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
    city: { en: 'Bishkek', ru: 'Бишкек' },
    type: 'private',
    website: 'https://alatoo.edu.kg',
    summary: {
      en: 'Private international university in Bishkek.',
      ru: 'Частный международный университет в Бишкеке.',
    },
    status: 'needs_review',
    lastVerified: null,
    tone: 'indigo',
  },
];

export const TYPE_LABEL: Record<UniType, L> = {
  national: { en: 'Public', ru: 'Государственный' },
  government: { en: 'Government-funded', ru: 'Гос. финансирование' },
  private: { en: 'Private', ru: 'Частный' },
  intergovernmental: { en: 'Intergovernmental', ru: 'Межгосударственный' },
};

export const findUniversity = (slug: string) => UNIVERSITIES.find((u) => u.slug === slug);

export const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
