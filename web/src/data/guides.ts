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
  admission: { en: 'Admission', ru: 'Поступление' },
  documents: { en: 'Documents', ru: 'Документы' },
  scholarships: { en: 'Scholarships', ru: 'Стипендии' },
  language: { en: 'Language', ru: 'Язык' },
  visa: { en: 'Visa & arrival', ru: 'Виза и приезд' },
  life: { en: 'Student life', ru: 'Студенческая жизнь' },
};

/** Official portals worth linking from every guide, per direction. */
export const OFFICIAL_SOURCES: Record<Direction, Source[]> = {
  'kg-kr': [
    {
      label: 'Study in Korea',
      url: 'https://www.studyinkorea.go.kr',
      note: { en: 'Government portal for international students (NIIED)', ru: 'Гос. портал для иностранных студентов (NIIED)' },
    },
    {
      label: 'Korea Visa Portal',
      url: 'https://www.visa.go.kr',
      note: { en: 'Official visa information and applications', ru: 'Официальная визовая информация и заявки' },
    },
    {
      label: 'TOPIK',
      url: 'https://www.topik.go.kr',
      note: { en: 'Test of Proficiency in Korean', ru: 'Экзамен по корейскому языку' },
    },
  ],
  'kr-kg': [
    {
      label: 'e-Visa Kyrgyzstan',
      url: 'https://www.evisa.e-gov.kg',
      note: { en: 'Official electronic visa portal of the Kyrgyz Republic', ru: 'Официальный портал электронных виз КР' },
    },
  ],
};

export const GUIDES: Guide[] = [
  {
    slug: 'choose-university',
    step: 1,
    icon: 'compass',
    category: 'admission',
    title: { en: 'Choose a university', ru: 'Выбор университета' },
    summary: {
      en: 'Match degree level, field and language of instruction before you fall in love with a name.',
      ru: 'Сначала уровень, направление и язык обучения — и только потом громкое имя.',
    },
    planItems: ['shortlist', 'compare-programs'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг' },
        body: {
          en: 'A good shortlist saves months. Instead of starting from rankings, start from three questions: what do you want to study, at which level, and in which language you can realistically study from day one.',
          ru: 'Хороший список вузов экономит месяцы. Начни не с рейтингов, а с трёх вопросов: что ты хочешь изучать, на каком уровне и на каком языке ты реально сможешь учиться с первого дня.',
        },
      },
      {
        id: 'steps',
        title: { en: 'Step by step', ru: 'Пошагово' },
        body: { en: 'Give yourself a week for this. Write everything down.', ru: 'Выдели на это неделю и записывай всё.' },
        list: {
          kind: 'steps',
          items: [
            { en: 'Pick your field and degree level.', ru: 'Определи направление и уровень обучения.' },
            {
              en: 'Filter universities by city and type in UniBridge, then open each official website.',
              ru: 'Отфильтруй вузы по городу и типу в UniBridge и открой официальный сайт каждого.',
            },
            {
              en: 'On each site, find the international admissions page and check that your programme is offered in a language you know.',
              ru: 'На каждом сайте найди страницу приёма иностранцев и проверь, что программа есть на знакомом тебе языке.',
            },
            { en: 'Keep 3–5 universities. Save them to your plan.', ru: 'Оставь 3–5 вузов и сохрани их в план.' },
          ],
        },
      },
      {
        id: 'compare',
        title: { en: 'What to compare', ru: 'Что сравнивать' },
        body: {
          en: 'Compare programmes, not universities. Two faculties of the same university can have completely different requirements.',
          ru: 'Сравнивай программы, а не вузы. На двух факультетах одного университета требования могут быть совсем разными.',
        },
        table: {
          head: [
            { en: 'Criterion', ru: 'Критерий' },
            { en: 'Where to look', ru: 'Где смотреть' },
          ],
          rows: [
            [{ en: 'Language of instruction', ru: 'Язык обучения' }, { en: 'Programme page or admission guide', ru: 'Страница программы или руководство по приёму' }],
            [{ en: 'Tuition and period', ru: 'Стоимость и период' }, { en: 'Admission guide of the current year', ru: 'Руководство по приёму текущего года' }],
            [{ en: 'Intake dates', ru: 'Сроки набора' }, { en: 'International admissions page', ru: 'Страница приёма иностранцев' }],
            [{ en: 'Housing', ru: 'Жильё' }, { en: 'Dormitory or student services page', ru: 'Страница общежития или студ. сервисов' }],
          ],
        },
      },
      {
        id: 'mistakes',
        title: { en: 'Common mistakes', ru: 'Частые ошибки' },
        body: { en: 'Most of these cost a full year.', ru: 'Большинство из них стоят целого года.' },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Relying on an agent’s list instead of the official site.', ru: 'Полагаться на список агента вместо официального сайта.' },
            { en: 'Assuming every programme is taught in English.', ru: 'Считать, что все программы преподаются на английском.' },
            { en: 'Using last year’s dates.', ru: 'Ориентироваться на прошлогодние сроки.' },
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
    title: { en: 'Check admission requirements', ru: 'Проверка требований' },
    summary: {
      en: 'Academic criteria, language level and what exactly the programme asks for.',
      ru: 'Академические условия, уровень языка и что именно просит программа.',
    },
    planItems: ['academic-reqs', 'language-reqs', 'docs-list'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг' },
        body: {
          en: 'Requirements depend on your citizenship, the university, the programme, the degree level and the intake year. A rule that applies to one of these does not automatically apply to the others.',
          ru: 'Требования зависят от гражданства, вуза, программы, уровня и года поступления. Правило для одного из этих случаев не переносится автоматически на остальные.',
        },
      },
      {
        id: 'academic',
        title: { en: 'Academic requirements', ru: 'Академические требования' },
        body: {
          en: 'Look for the minimum previous education, grade requirements and any prerequisite subjects. Write down the exact wording from the official guide.',
          ru: 'Найди минимальный уровень предыдущего образования, требования к оценкам и профильные предметы. Выписывай формулировки дословно из официального руководства.',
        },
      },
      {
        id: 'language',
        title: { en: 'Language requirements', ru: 'Языковые требования' },
        body: {
          en: 'Universities usually name an accepted test and a minimum level. For Korean-taught programmes this is often TOPIK; for English-taught ones, an English test. Check how old a certificate may be.',
          ru: 'Вузы обычно указывают принимаемый тест и минимальный уровень. Для программ на корейском это часто TOPIK, для англоязычных — тест по английскому. Проверь, сколько действует сертификат.',
        },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Which test is accepted?', ru: 'Какой тест принимается?' },
            { en: 'What is the minimum level?', ru: 'Какой минимальный уровень?' },
            { en: 'Can you submit the result after applying?', ru: 'Можно ли досдать результат после подачи?' },
          ],
        },
      },
      {
        id: 'mistakes',
        title: { en: 'Common mistakes', ru: 'Частые ошибки' },
        body: {
          en: 'Treating university-level rules as programme rules, and planning the language test too late — test dates fill up.',
          ru: 'Принимать правила уровня вуза за правила программы и поздно планировать языковой тест — места на даты заканчиваются.',
        },
      },
    ],
  },
  {
    slug: 'explore-funding',
    step: 3,
    icon: 'wallet',
    category: 'scholarships',
    title: { en: 'Explore funding', ru: 'Финансирование и стипендии' },
    summary: {
      en: 'Government programmes, university scholarships and exchanges — and how to read their terms.',
      ru: 'Государственные программы, стипендии вузов и обмены — и как читать их условия.',
    },
    planItems: ['funding'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг' },
        body: {
          en: 'Funding usually comes from three places: government programmes, the university itself, or an exchange agreement between your current university and a partner. Each has its own calendar.',
          ru: 'Финансирование обычно приходит из трёх источников: государственные программы, сам университет или обменное соглашение между твоим вузом и партнёром. У каждого свой календарь.',
        },
      },
      {
        id: 'read',
        title: { en: 'How to read the terms', ru: 'Как читать условия' },
        body: { en: 'For every scholarship, find these four things in the official notice.', ru: 'Для каждой стипендии найди в официальном объявлении четыре вещи.' },
        list: {
          kind: 'steps',
          items: [
            { en: 'Who is eligible: citizenship, level, age, grades.', ru: 'Кто может подать: гражданство, уровень, возраст, оценки.' },
            { en: 'What exactly is covered, and for how long.', ru: 'Что именно покрывается и на какой срок.' },
            { en: 'The deadline, with its time zone.', ru: 'Дедлайн с указанием часового пояса.' },
            { en: 'Whether you apply to the scholarship and the university separately.', ru: 'Подаётся ли заявка на стипендию отдельно от поступления.' },
          ],
        },
      },
      {
        id: 'mistakes',
        title: { en: 'Common mistakes', ru: 'Частые ошибки' },
        body: {
          en: 'Trusting “100% grant” posts without a source. If a page promises a guaranteed scholarship for a fee, walk away.',
          ru: 'Верить постам про «100% грант» без источника. Если за плату обещают гарантированную стипендию — уходи.',
        },
      },
    ],
  },
  {
    slug: 'prepare-documents',
    step: 4,
    icon: 'folder',
    category: 'documents',
    title: { en: 'Prepare documents', ru: 'Подготовка документов' },
    summary: {
      en: 'Build a personal list from the official one, and leave time for translations.',
      ru: 'Составь личный список по официальному и заложи время на переводы.',
    },
    planItems: ['personal-docs', 'translations'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг' },
        body: {
          en: 'The official document list is the only list that matters. Use it to build your own checklist with a status for each item. UniBridge never asks you to upload documents.',
          ru: 'Важен только официальный список документов. По нему составь свой чек-лист со статусом каждого пункта. UniBridge никогда не просит загружать документы.',
        },
      },
      {
        id: 'typical',
        title: { en: 'Documents that are often requested', ru: 'Что часто запрашивают' },
        body: { en: 'This is not a list for your application — only a starting point for questions.', ru: 'Это не список для твоей заявки — только отправная точка для вопросов.' },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Diploma or certificate of previous education, with transcript.', ru: 'Диплом или аттестат с приложением.' },
            { en: 'Language test result.', ru: 'Результат языкового теста.' },
            { en: 'Passport copy.', ru: 'Копия паспорта.' },
            { en: 'Statement of purpose and recommendation letters, for some programmes.', ru: 'Мотивационное письмо и рекомендации — для некоторых программ.' },
          ],
        },
      },
      {
        id: 'translations',
        title: { en: 'Translations and legalisation', ru: 'Переводы и легализация' },
        body: {
          en: 'Check whether documents need a notarised translation, an apostille or consular legalisation, and in which order. This can take several weeks.',
          ru: 'Уточни, нужен ли нотариальный перевод, апостиль или консульская легализация и в каком порядке. Это может занять несколько недель.',
        },
      },
    ],
  },
  {
    slug: 'apply-officially',
    step: 5,
    icon: 'send',
    category: 'admission',
    title: { en: 'Apply officially', ru: 'Официальная подача' },
    summary: {
      en: 'Applications go through the university’s own channel. Here is how to do it calmly.',
      ru: 'Заявка подаётся через официальный канал вуза. Вот как сделать это спокойно.',
    },
    planItems: ['portal', 'submit', 'check-dates'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг' },
        body: {
          en: 'UniBridge does not submit applications and is not an admission agent. You apply on the university’s portal, by e-mail or by post — whatever the official guide says.',
          ru: 'UniBridge не подаёт заявки и не является агентом. Подача — на портале вуза, по почте или e-mail, как указано в официальном руководстве.',
        },
      },
      {
        id: 'steps',
        title: { en: 'Step by step', ru: 'Пошагово' },
        body: { en: 'Aim to submit a week before the deadline.', ru: 'Старайся подать за неделю до дедлайна.' },
        list: {
          kind: 'steps',
          items: [
            { en: 'Open the official application page from the university website.', ru: 'Открой официальную страницу подачи с сайта вуза.' },
            { en: 'Check the deadline and its time zone.', ru: 'Проверь дедлайн и часовой пояс.' },
            { en: 'Fill in the form and attach documents exactly as requested.', ru: 'Заполни форму и приложи документы строго по требованиям.' },
            { en: 'Pay the application fee only on the official page.', ru: 'Оплачивай сбор только на официальной странице.' },
            { en: 'Save the confirmation and mark the step in your plan.', ru: 'Сохрани подтверждение и отметь шаг в плане.' },
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
    title: { en: 'Prepare your arrival', ru: 'Подготовка к переезду' },
    summary: {
      en: 'Visa, housing and the first week on campus.',
      ru: 'Виза, жильё и первая неделя в кампусе.',
    },
    planItems: ['visa', 'housing', 'support'],
    sections: [
      {
        id: 'what',
        title: { en: 'What this step is about', ru: 'О чём этот шаг' },
        body: {
          en: 'Visa rules depend on citizenship and change over time. Always read them on the official portal, and use the university’s admission letter as your starting point.',
          ru: 'Визовые правила зависят от гражданства и меняются. Всегда читай их на официальном портале, а отправной точкой считай письмо о зачислении.',
        },
      },
      {
        id: 'first-week',
        title: { en: 'Your first week', ru: 'Первая неделя' },
        body: { en: 'Things students usually wish they had done earlier.', ru: 'То, что студенты обычно хотели бы сделать раньше.' },
        list: {
          kind: 'bullets',
          items: [
            { en: 'Save the international office contacts before you fly.', ru: 'Сохрани контакты международного офиса до вылета.' },
            { en: 'Find out how residence registration works for students.', ru: 'Узнай, как студенты оформляют регистрацию по месту пребывания.' },
            { en: 'Go to the orientation — it is where you meet everyone.', ru: 'Приходи на ориентацию — там знакомятся все.' },
          ],
        },
      },
    ],
  },
];

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
