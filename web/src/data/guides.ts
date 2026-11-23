import type { Direction, L } from '../state/prefs';

export type GuideCategory = 'admission' | 'documents' | 'scholarships' | 'language' | 'visa' | 'life';

export interface GuideSection {
  id: string;
  title: L;
  body: L;
  /** Rendered as a numbered sequence ("steps") or a plain list. */
  list?: { kind: 'steps' | 'bullets'; items: L[] };
  table?: { head: [L, L]; rows: [L, L][] };
}

export interface Source {
  label: string;
  url: string;
  note: L;
}

export interface Guide {
  slug: string;
  step: number;
  icon: 'compass' | 'clipboard' | 'wallet' | 'folder' | 'send' | 'plane';
  category: GuideCategory;
  title: L;
  summary: L;
  sections: GuideSection[];
  planItems: string[];
}

export const CATEGORY_LABEL: Record<GuideCategory, L> = {
  admission: { en: 'Admission', ru: 'Поступление', ko: '입학' },
  documents: { en: 'Documents', ru: 'Документы', ko: '서류' },
  scholarships: { en: 'Scholarships', ru: 'Стипендии', ko: '장학금' },
  language: { en: 'Language', ru: 'Язык', ko: '어학' },
  visa: { en: 'Visa & arrival', ru: 'Виза и приезд', ko: '비자와 입국' },
  life: { en: 'Student life', ru: 'Студенческая жизнь', ko: '학생 생활' },
};

/** Official portals worth linking from every guide, per direction. */
export const OFFICIAL_SOURCES: Record<Direction, Source[]> = {
  'kg-kr': [
    {
      label: 'Study in Korea',
      url: 'https://www.studyinkorea.go.kr',
      note: { en: 'Government portal for international students (NIIED)', ru: 'Гос. портал для иностранных студентов (NIIED)', ko: '외국인 유학생 정부 포털(국립국제교육원)' },
    },
    {
      label: 'Korea Visa Portal',
      url: 'https://www.visa.go.kr',
      note: { en: 'Official visa information and applications', ru: 'Официальная визовая информация и заявки', ko: '공식 비자 안내와 신청' },
    },
    {
      label: 'TOPIK',
      url: 'https://www.topik.go.kr',
      note: { en: 'Test of Proficiency in Korean', ru: 'Экзамен по корейскому языку', ko: '한국어능력시험' },
    },
  ],
  'kr-kg': [
    {
      label: 'e-Visa Kyrgyzstan',
      url: 'https://www.evisa.e-gov.kg',
      note: { en: 'Official electronic visa portal of the Kyrgyz Republic', ru: 'Официальный портал электронных виз КР', ko: '키르기스스탄 공식 전자비자 포털' },
    },
  ],
};

export const GUIDES: Guide[] = [
  {
    slug: 'choose-university',
    step: 1,
    icon: 'compass',
    category: 'admission',
    title: { en: 'Choose a university', ru: 'Выбор университета', ko: '대학 고르기' },
    summary: {
      en: 'Match degree level, field and language of instruction before you fall in love with a name.',
      ru: 'Сначала уровень, направление и язык обучения — и только потом громкое имя.', ko: '이름만 보고 정하기 전에 학위 과정, 전공, 수업 언어부터 맞춰 보세요.',
    },
    planItems: ['shortlist', 'compare-programs'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг', ko: '이 단계에서 할 일' },
        body: {
          en: 'A good shortlist saves months. Instead of starting from rankings, start from three questions: what do you want to study, at which level, and in which language you can realistically study from day one.',
          ru: 'Хороший список вузов экономит месяцы. Начни не с рейтингов, а с трёх вопросов: что ты хочешь изучать, на каком уровне и на каком языке ты реально сможешь учиться с первого дня.', ko: '후보를 잘 추리면 몇 달을 아낄 수 있어요. 순위부터 보지 말고 세 가지를 먼저 정하세요. 무엇을 공부할지, 어떤 과정인지, 첫날부터 어떤 언어로 공부할 수 있는지예요.',
        },
      },
      {
        id: 'steps',
        title: { en: 'Step by step', ru: 'Пошагово', ko: '단계별로' },
        body: { en: 'Give yourself a week for this. Write everything down.', ru: 'Выдели на это неделю и записывай всё.', ko: '일주일 정도 여유를 두고, 모두 적어 두세요.' },
        list: {
          kind: 'steps',
          items: [
            { en: 'Pick your field and degree level.', ru: 'Определи направление и уровень обучения.', ko: '전공과 학위 과정을 정하세요.' },
            {
              en: 'Filter universities by city and type in UniBridge, then open each official website.',
              ru: 'Отфильтруй вузы по городу и типу в UniBridge и открой официальный сайт каждого.', ko: 'UniBridge에서 도시와 유형으로 대학을 골라 보고, 각 대학의 공식 사이트를 열어 보세요.',
            },
            {
              en: 'On each site, find the international admissions page and check that your programme is offered in a language you know.',
              ru: 'На каждом сайте найди страницу приёма иностранцев и проверь, что программа есть на знакомом тебе языке.', ko: '사이트마다 외국인 입학 페이지를 찾아, 원하는 학과가 내가 아는 언어로 개설되는지 확인하세요.',
            },
            { en: 'Keep 3–5 universities. Save them to your plan.', ru: 'Оставь 3–5 вузов и сохрани их в план.', ko: '대학 3~5곳을 남기고 내 계획에 저장하세요.' },
          ],
        },
      },
      {
        id: 'compare',
        title: { en: 'What to compare', ru: 'Что сравнивать', ko: '비교할 것' },
        body: {
          en: 'Compare programmes, not universities. Two faculties of the same university can have completely different requirements.',
          ru: 'Сравнивай программы, а не вузы. На двух факультетах одного университета требования могут быть совсем разными.', ko: '대학이 아니라 학과를 비교하세요. 같은 대학이라도 단과대학마다 요건이 완전히 다를 수 있어요.',
        },
        table: {
          head: [
            { en: 'Criterion', ru: 'Критерий', ko: '기준' },
            { en: 'Where to look', ru: 'Где смотреть', ko: '확인할 곳' },
          ],
          rows: [
            [{ en: 'Language of instruction', ru: 'Язык обучения', ko: '수업 언어' }, { en: 'Programme page or admission guide', ru: 'Страница программы или руководство по приёму', ko: '학과 페이지 또는 모집 요강' }],
            [{ en: 'Tuition and period', ru: 'Стоимость и период', ko: '등록금과 기간' }, { en: 'Admission guide of the current year', ru: 'Руководство по приёму текущего года', ko: '올해 모집 요강' }],
            [{ en: 'Intake dates', ru: 'Сроки набора', ko: '모집 일정' }, { en: 'International admissions page', ru: 'Страница приёма иностранцев', ko: '외국인 입학 페이지' }],
            [{ en: 'Housing', ru: 'Жильё', ko: '숙소' }, { en: 'Dormitory or student services page', ru: 'Страница общежития или студ. сервисов', ko: '기숙사 또는 학생 지원 페이지' }],
          ],
        },
      },
      {
        id: 'mistakes',
        title: { en: 'Common mistakes', ru: 'Частые ошибки', ko: '자주 하는 실수' },
        body: { en: 'Most of these cost a full year.', ru: 'Большинство из них стоят целого года.', ko: '대부분 1년을 잃게 되는 실수예요.' },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Relying on an agent’s list instead of the official site.', ru: 'Полагаться на список агента вместо официального сайта.', ko: '공식 사이트 대신 유학원 목록만 믿는 것.' },
            { en: 'Assuming every programme is taught in English.', ru: 'Считать, что все программы преподаются на английском.', ko: '모든 학과가 영어로 수업한다고 생각하는 것.' },
            { en: 'Using last year’s dates.', ru: 'Ориентироваться на прошлогодние сроки.', ko: '작년 일정을 그대로 쓰는 것.' },
          ],
        },
      },
    ],
  },
  {
    slug: 'check-requirements',
    step: 2,
    icon: 'clipboard',
    category: 'language',
    title: { en: 'Check admission requirements', ru: 'Проверка требований', ko: '입학 요건 확인하기' },
    summary: {
      en: 'Academic criteria, language level and what exactly the programme asks for.',
      ru: 'Академические условия, уровень языка и что именно просит программа.', ko: '학업 기준, 어학 수준, 학과가 정확히 요구하는 것을 확인해요.',
    },
    planItems: ['academic-reqs', 'language-reqs', 'docs-list'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг', ko: '이 단계에서 할 일' },
        body: {
          en: 'Requirements depend on your citizenship, the university, the programme, the degree level and the intake year. A rule that applies to one of these does not automatically apply to the others.',
          ru: 'Требования зависят от гражданства, вуза, программы, уровня и года поступления. Правило для одного из этих случаев не переносится автоматически на остальные.', ko: '요건은 국적, 대학, 학과, 학위 과정, 입학 연도에 따라 달라요. 하나에 적용되는 규정이 다른 경우에도 그대로 적용되지는 않아요.',
        },
      },
      {
        id: 'academic',
        title: { en: 'Academic requirements', ru: 'Академические требования', ko: '학업 요건' },
        body: {
          en: 'Look for the minimum previous education, grade requirements and any prerequisite subjects. Write down the exact wording from the official guide.',
          ru: 'Найди минимальный уровень предыдущего образования, требования к оценкам и профильные предметы. Выписывай формулировки дословно из официального руководства.', ko: '최소 학력, 성적 기준, 필수 과목을 확인하세요. 공식 요강의 문구를 그대로 적어 두세요.',
        },
      },
      {
        id: 'language',
        title: { en: 'Language requirements', ru: 'Языковые требования', ko: '어학 요건' },
        body: {
          en: 'Universities usually name an accepted test and a minimum level. For Korean-taught programmes this is often TOPIK; for English-taught ones, an English test. Check how old a certificate may be.',
          ru: 'Вузы обычно указывают принимаемый тест и минимальный уровень. Для программ на корейском это часто TOPIK, для англоязычных — тест по английскому. Проверь, сколько действует сертификат.', ko: '대학은 보통 인정하는 시험과 최소 급수를 정해 둬요. 한국어 과정은 TOPIK, 영어 과정은 영어 시험인 경우가 많아요. 성적표의 유효 기간도 확인하세요.',
        },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Which test is accepted?', ru: 'Какой тест принимается?', ko: '어떤 시험을 인정하나요?' },
            { en: 'What is the minimum level?', ru: 'Какой минимальный уровень?', ko: '최소 급수는 얼마인가요?' },
            { en: 'Can you submit the result after applying?', ru: 'Можно ли досдать результат после подачи?', ko: '지원한 뒤에 성적을 내도 되나요?' },
          ],
        },
      },
      {
        id: 'mistakes',
        title: { en: 'Common mistakes', ru: 'Частые ошибки', ko: '자주 하는 실수' },
        body: {
          en: 'Treating university-level rules as programme rules, and planning the language test too late — test dates fill up.',
          ru: 'Принимать правила уровня вуза за правила программы и поздно планировать языковой тест — места на даты заканчиваются.', ko: '대학 전체 규정을 학과 규정으로 착각하는 것, 어학 시험을 너무 늦게 준비하는 것. 시험 일정은 금방 마감돼요.',
        },
      },
    ],
  },
  {
    slug: 'explore-funding',
    step: 3,
    icon: 'wallet',
    category: 'scholarships',
    title: { en: 'Explore funding', ru: 'Финансирование и стипендии', ko: '학비 지원 알아보기' },
    summary: {
      en: 'Government programmes, university scholarships and exchanges — and how to read their terms.',
      ru: 'Государственные программы, стипендии вузов и обмены — и как читать их условия.', ko: '정부 프로그램, 대학 장학금, 교환학생, 그리고 조건을 읽는 방법이에요.',
    },
    planItems: ['funding'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг', ko: '이 단계에서 할 일' },
        body: {
          en: 'Funding usually comes from three places: government programmes, the university itself, or an exchange agreement between your current university and a partner. Each has its own calendar.',
          ru: 'Финансирование обычно приходит из трёх источников: государственные программы, сам университет или обменное соглашение между твоим вузом и партнёром. У каждого свой календарь.', ko: '학비 지원은 보통 세 곳에서 받아요. 정부 프로그램, 대학 자체, 지금 다니는 대학과 협력 대학의 교환 협정이에요. 일정은 각각 달라요.',
        },
      },
      {
        id: 'read',
        title: { en: 'How to read the terms', ru: 'Как читать условия', ko: '조건 읽는 법' },
        body: { en: 'For every scholarship, find these four things in the official notice.', ru: 'Для каждой стипендии найди в официальном объявлении четыре вещи.', ko: '장학금마다 공식 공고에서 이 네 가지를 찾아보세요.' },
        list: {
          kind: 'steps',
          items: [
            { en: 'Who is eligible: citizenship, level, age, grades.', ru: 'Кто может подать: гражданство, уровень, возраст, оценки.', ko: '지원 자격: 국적, 과정, 나이, 성적.' },
            { en: 'What exactly is covered, and for how long.', ru: 'Что именно покрывается и на какой срок.', ko: '무엇을, 얼마 동안 지원하는지.' },
            { en: 'The deadline, with its time zone.', ru: 'Дедлайн с указанием часового пояса.', ko: '마감일과 기준 시간대.' },
            { en: 'Whether you apply to the scholarship and the university separately.', ru: 'Подаётся ли заявка на стипендию отдельно от поступления.', ko: '장학금과 대학에 따로 지원해야 하는지.' },
          ],
        },
      },
      {
        id: 'mistakes',
        title: { en: 'Common mistakes', ru: 'Частые ошибки', ko: '자주 하는 실수' },
        body: {
          en: 'Trusting “100% grant” posts without a source. If a page promises a guaranteed scholarship for a fee, walk away.',
          ru: 'Верить постам про «100% грант» без источника. Если за плату обещают гарантированную стипендию — уходи.', ko: '출처 없는 ‘100% 장학금’ 글을 믿는 것. 돈을 받고 장학금을 보장한다는 곳은 피하세요.',
        },
      },
    ],
  },
  {
    slug: 'prepare-documents',
    step: 4,
    icon: 'folder',
    category: 'documents',
    title: { en: 'Prepare documents', ru: 'Подготовка документов', ko: '서류 준비하기' },
    summary: {
      en: 'Build a personal list from the official one, and leave time for translations.',
      ru: 'Составь личный список по официальному и заложи время на переводы.', ko: '공식 목록으로 내 목록을 만들고, 번역할 시간을 넉넉히 두세요.',
    },
    planItems: ['personal-docs', 'translations'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг', ko: '이 단계에서 할 일' },
        body: {
          en: 'The official document list is the only list that matters. Use it to build your own checklist with a status for each item. UniBridge never asks you to upload documents.',
          ru: 'Важен только официальный список документов. По нему составь свой чек-лист со статусом каждого пункта. UniBridge никогда не просит загружать документы.', ko: '중요한 것은 공식 서류 목록뿐이에요. 이 목록으로 항목마다 상태를 적은 체크리스트를 만드세요. UniBridge는 서류를 올려 달라고 하지 않아요.',
        },
      },
      {
        id: 'typical',
        title: { en: 'Documents that are often requested', ru: 'Что часто запрашивают', ko: '자주 요구하는 서류' },
        body: { en: 'This is not a list for your application — only a starting point for questions.', ru: 'Это не список для твоей заявки — только отправная точка для вопросов.', ko: '지원용 목록이 아니라, 질문을 시작하기 위한 참고 목록이에요.' },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Diploma or certificate of previous education, with transcript.', ru: 'Диплом или аттестат с приложением.', ko: '이전 학교 졸업장 또는 증명서와 성적표.' },
            { en: 'Language test result.', ru: 'Результат языкового теста.', ko: '어학 시험 성적.' },
            { en: 'Passport copy.', ru: 'Копия паспорта.', ko: '여권 사본.' },
            { en: 'Statement of purpose and recommendation letters, for some programmes.', ru: 'Мотивационное письмо и рекомендации — для некоторых программ.', ko: '일부 학과는 학업 계획서와 추천서.' },
          ],
        },
      },
      {
        id: 'translations',
        title: { en: 'Translations and legalisation', ru: 'Переводы и легализация', ko: '번역과 확인 절차' },
        body: {
          en: 'Check whether documents need a notarised translation, an apostille or consular legalisation, and in which order. This can take several weeks.',
          ru: 'Уточни, нужен ли нотариальный перевод, апостиль или консульская легализация и в каком порядке. Это может занять несколько недель.', ko: '서류에 공증 번역, 아포스티유, 영사 확인 중 무엇이 필요한지, 어떤 순서인지 확인하세요. 몇 주가 걸릴 수 있어요.',
        },
      },
    ],
  },
  {
    slug: 'apply-officially',
    step: 5,
    icon: 'send',
    category: 'admission',
    title: { en: 'Apply officially', ru: 'Официальная подача', ko: '공식 경로로 지원하기' },
    summary: {
      en: 'Applications go through the university’s own channel. Here is how to do it calmly.',
      ru: 'Заявка подаётся через официальный канал вуза. Вот как сделать это спокойно.', ko: '지원은 대학의 공식 경로로 해요. 차분하게 진행하는 방법이에요.',
    },
    planItems: ['portal', 'submit', 'check-dates'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг', ko: '이 단계에서 할 일' },
        body: {
          en: 'UniBridge does not submit applications and is not an admission agent. You apply on the university’s portal, by e-mail or by post — whatever the official guide says.',
          ru: 'UniBridge не подаёт заявки и не является агентом. Подача — на портале вуза, по почте или e-mail, как указано в официальном руководстве.', ko: 'UniBridge는 지원서를 제출하지 않고, 유학원도 아니에요. 공식 요강에 따라 대학 포털, 이메일, 우편으로 직접 지원하세요.',
        },
      },
      {
        id: 'steps',
        title: { en: 'Step by step', ru: 'Пошагово', ko: '단계별로' },
        body: { en: 'Aim to submit a week before the deadline.', ru: 'Старайся подать за неделю до дедлайна.', ko: '마감 일주일 전 제출을 목표로 하세요.' },
        list: {
          kind: 'steps',
          items: [
            { en: 'Open the official application page from the university website.', ru: 'Открой официальную страницу подачи с сайта вуза.', ko: '대학 웹사이트에서 공식 지원 페이지를 여세요.' },
            { en: 'Check the deadline and its time zone.', ru: 'Проверь дедлайн и часовой пояс.', ko: '마감일과 기준 시간대를 확인하세요.' },
            { en: 'Fill in the form and attach documents exactly as requested.', ru: 'Заполни форму и приложи документы строго по требованиям.', ko: '양식을 작성하고 요구한 그대로 서류를 첨부하세요.' },
            { en: 'Pay the application fee only on the official page.', ru: 'Оплачивай сбор только на официальной странице.', ko: '전형료는 공식 페이지에서만 내세요.' },
            { en: 'Save the confirmation and mark the step in your plan.', ru: 'Сохрани подтверждение и отметь шаг в плане.', ko: '확인 메일을 저장하고 내 계획에 표시하세요.' },
          ],
        },
      },
    ],
  },
  {
    slug: 'prepare-arrival',
    step: 6,
    icon: 'plane',
    category: 'visa',
    title: { en: 'Prepare your arrival', ru: 'Подготовка к переезду', ko: '입국 준비하기' },
    summary: {
      en: 'Visa, housing and the first week on campus.',
      ru: 'Виза, жильё и первая неделя в кампусе.', ko: '비자, 숙소, 캠퍼스 첫 주.',
    },
    planItems: ['visa', 'housing', 'support'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг', ko: '이 단계에서 할 일' },
        body: {
          en: 'Visa rules depend on citizenship and change over time. Always read them on the official portal, and use the university’s admission letter as your starting point.',
          ru: 'Визовые правила зависят от гражданства и меняются. Всегда читай их на официальном портале, а отправной точкой считай письмо о зачислении.', ko: '비자 규정은 국적에 따라 다르고 자주 바뀌어요. 항상 공식 포털에서 확인하고, 대학의 입학 허가서를 기준으로 시작하세요.',
        },
      },
      {
        id: 'first-week',
        title: { en: 'Your first week', ru: 'Первая неделя', ko: '첫 주에 할 일' },
        body: { en: 'Things students usually wish they had done earlier.', ru: 'То, что студенты обычно хотели бы сделать раньше.', ko: '학생들이 보통 더 일찍 할걸 하고 후회하는 것들이에요.' },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Save the international office contacts before you fly.', ru: 'Сохрани контакты международного офиса до вылета.', ko: '출국 전에 국제처 연락처를 저장해 두세요.' },
            { en: 'Find out how residence registration works for students.', ru: 'Узнай, как студенты оформляют регистрацию по месту пребывания.', ko: '학생 체류 등록 방법을 알아 두세요.' },
            { en: 'Go to the orientation — it is where you meet everyone.', ru: 'Приходи на ориентацию — там знакомятся все.', ko: '오리엔테이션에 꼭 가세요. 다른 학생들을 만나는 자리예요.' },
          ],
        },
      },
    ],
  },
];

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
