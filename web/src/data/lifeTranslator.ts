import type { L } from '../state/prefs';
import type { ContentStatus } from './universities';

/**
 * Life Translator (생활 번역기): it translates everyday life, not words.
 * Each pair says "what you use at home" → "what to use in the other country".
 *
 * Where a country has no real equivalent, `gapIn` marks it. A gap is a finding:
 * it is an information barrier for newcomers and feeds the research comparison
 * matrix (Completeness, Actionability).
 *
 * Status rule (spec §21): `verified` only when the key fact was checked against
 * a cited source on `checked`; everything else stays `needs_review` or `unknown`.
 * Fact-check: 23 Nov 2026, see research_notes/ in the project folder.
 */

export type LifeCategory =
  | 'transport'
  | 'maps'
  | 'money'
  | 'communication'
  | 'shopping'
  | 'documents'
  | 'health'
  | 'emergency'
  | 'daily';

export interface Service {
  name: string;
  /** Name in the country's own script, e.g. 카카오 T. */
  local?: string;
  url?: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface LifePair {
  id: string;
  category: LifeCategory;
  /** One-line description of the need, shown as the card title. */
  need: L;
  kr: Service[];
  kg: Service[];
  /** The country where no real equivalent exists. */
  gapIn?: 'KR' | 'KG';
  /** What a newcomer arriving in Korea should know. */
  inKR: L;
  /** What a newcomer arriving in Kyrgyzstan should know. */
  inKG: L;
  status: ContentStatus;
  /** Date the facts were last checked against `sources`. */
  checked?: string;
  sources?: Source[];
}

export const CATEGORY_LABEL: Record<LifeCategory, L> = {
  transport: { en: 'Transport', ru: 'Транспорт', ko: '교통' },
  maps: { en: 'Maps', ru: 'Карты', ko: '지도' },
  money: { en: 'Money', ru: 'Деньги', ko: '금융' },
  communication: { en: 'Communication', ru: 'Связь', ko: '통신' },
  shopping: { en: 'Shopping & food', ru: 'Покупки и еда', ko: '쇼핑과 음식' },
  documents: { en: 'Documents', ru: 'Документы', ko: '서류' },
  health: { en: 'Health', ru: 'Здоровье', ko: '건강' },
  emergency: { en: 'Emergency', ru: 'Экстренное', ko: '긴급' },
  daily: { en: 'Everyday', ru: 'Повседневное', ko: '일상' },
};

const CHECKED = '2026-11-23';

export const LIFE_PAIRS: LifePair[] = [
  {
    id: 'taxi',
    category: 'transport',
    need: { en: 'Call a taxi', ru: 'Вызвать такси', ko: '택시 부르기' },
    kr: [
      { name: 'Kakao T', local: '카카오 T', url: 'https://www.kakaomobility.com' },
      { name: 'K.Ride', local: 'for foreigners · 외국인용' },
    ],
    kg: [{ name: 'Yandex Go', url: 'https://go.yandex' }, { name: 'WB Taxi', local: 'от Wildberries' }, { name: 'Bi Taxi' }],
    inKR: {
      en: 'Kakao T is what Koreans use, but foreign cards often fail in it. Kakao Mobility made K.Ride for visitors: sign in with Google, Apple or e-mail and pay with a foreign card.',
      ru: 'Корейцы пользуются Kakao T, но иностранные карты там часто не проходят. Для иностранцев Kakao Mobility сделала K.Ride: вход через Google, Apple или почту, оплата иностранной картой.',
      ko: '한국 사람들은 카카오 T를 쓰지만, 해외 카드는 결제가 안 될 때가 많아요. 카카오모빌리티가 외국인을 위해 K.Ride를 만들었어요. Google, Apple, 이메일로 로그인하고 해외 카드로 결제할 수 있어요.',
    },
    inKG: {
      en: 'Taxis are ordered in apps. Yandex Go is the biggest. WB Taxi from Wildberries opened to everyone in Bishkek in May 2026, but it needs a Kyrgyz or Uzbek phone number, so get a local SIM first. Bi Taxi is the former Namba Taxi.',
      ru: 'Такси заказывают в приложениях. Крупнейшее — Yandex Go. WB Taxi от Wildberries с мая 2026 года открыт для всех в Бишкеке, но нужен кыргызский или узбекский номер — сначала купи местную SIM. Bi Taxi — это бывшее Namba Taxi.',
      ko: '택시는 앱으로 불러요. 가장 큰 앱은 Yandex Go예요. Wildberries의 WB Taxi는 2026년 5월부터 비슈케크에서 누구나 쓸 수 있어요. 다만 키르기스스탄이나 우즈베키스탄 번호가 필요하니 현지 유심부터 사 두세요. Bi Taxi는 예전 Namba Taxi예요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'Asia Economy: K.Ride (2025)', url: 'https://view.asiae.co.kr/en/article/2025032721290024060' },
      { label: 'kaktus.media: WB Taxi, 25 May 2026', url: 'https://kaktus.media/doc/546782_wb_taxi_vyhodit_na_massovyy_rynok_bishkeka.html' },
      { label: 'kaktus.media: Namba One', url: 'https://kaktus.media/doc/450881_ceo_namba_one:_my_legko_ybedili_bakay_bank_profinansirovat_elektrotaksi_namba_way.html' },
    ],
  },
  {
    id: 'maps',
    category: 'maps',
    need: { en: 'Find a building and a route', ru: 'Найти здание и маршрут', ko: '건물과 길 찾기' },
    kr: [
      { name: 'Naver Map', local: '네이버 지도', url: 'https://map.naver.com' },
      { name: 'KakaoMap', local: '카카오맵', url: 'https://map.kakao.com' },
    ],
    kg: [{ name: '2GIS', url: 'https://2gis.kg' }],
    inKR: {
      en: 'Google Maps still gives no turn-by-turn walking or driving directions in Korea. Install Naver Map or KakaoMap before you land.',
      ru: 'Google Maps в Корее до сих пор не ведёт пешком и на машине по шагам. Поставь Naver Map или KakaoMap до прилёта.',
      ko: 'Google Maps는 한국에서 아직 걷기와 운전 길 안내를 단계별로 해 주지 않아요. 한국에 오기 전에 네이버 지도나 카카오맵을 설치해 두세요.',
    },
    inKG: {
      en: '2GIS covers all of Kyrgyzstan and works offline after you download the region. It can even find the right entrance from a flat number.',
      ru: '2GIS покрывает весь Кыргызстан и работает офлайн после загрузки региона. Он даже находит нужный подъезд по номеру квартиры.',
      ko: '2GIS는 키르기스스탄 전역을 지원해요. 지역 지도를 내려받으면 인터넷 없이도 쓸 수 있어요. 집 호수만 넣어도 맞는 출입구까지 찾아 줘요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'TechCrunch, 27 Feb 2026', url: 'https://techcrunch.com/2026/02/27/south-korea-opens-the-door-to-let-google-maps-operate-fully' },
      { label: 'kaktus.media: 2GIS, вся страна', url: 'https://kaktus.media/doc/509975_vsia_strana_na_odnoy_karte_v_2gis_poiavilas_detalnaia_karta_vsego_kyrgyzstana.html' },
    ],
  },
  {
    id: 'transit-card',
    category: 'transport',
    need: { en: 'Pay for buses and the metro', ru: 'Платить за автобус и метро', ko: '버스와 지하철 요금 내기' },
    kr: [{ name: 'T-money', local: '티머니', url: 'https://www.t-money.co.kr' }],
    kg: [{ name: 'Tulpar card', local: 'Карта «Тулпар»' }],
    inKR: {
      en: 'T-money cards are sold and topped up at convenience stores and work on buses and the metro.',
      ru: 'Карты T-money продают и пополняют в магазинах у дома, они работают в автобусах и метро.',
      ko: '티머니 카드는 편의점에서 사고 충전해요. 버스와 지하철 모두 쓸 수 있어요.',
    },
    inKG: {
      en: 'Bishkek has no metro, and since 1 July 2026 municipal buses take no cash. Pay with a Tulpar card, a contactless bank card or a QR code in Tulpar, MBank or O!Dengi. A bus costs 17 som; transfers within 60 minutes are free only with the Tulpar card.',
      ru: 'Метро в Бишкеке нет, а с 1 июля 2026 года в муниципальных автобусах не берут наличные. Плати картой «Тулпар», бесконтактной банковской картой или QR в Tulpar, MBank, O!Деньги. Автобус — 17 сомов; пересадка в течение 60 минут бесплатна только с картой «Тулпар».',
      ko: '비슈케크에는 지하철이 없어요. 2026년 7월 1일부터 시내버스는 현금을 받지 않아요. Tulpar 카드, 비접촉 은행 카드, 또는 Tulpar, MBank, O!Dengi 앱의 QR 코드로 내세요. 버스 요금은 17솜이에요. 60분 안 환승 무료는 Tulpar 카드로 낼 때만 돼요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: '24.kg, 30 Jun 2026', url: 'https://24.kg/obschestvo/380138_peresadki_vtechenie_chasa_vavtobusah_bishkeka_budut_besplatnyimi/' },
      { label: 'kaktus.media: где купить «Тулпар»', url: 'https://kaktus.media/doc/462750_beznalichnaia_oplata_proezda:_gde_priobresti_i_kak_popolnit_karty_tylpar.html' },
    ],
  },
  {
    id: 'mobile-pay',
    category: 'money',
    need: { en: 'Bank account and phone payments', ru: 'Банк и оплата телефоном', ko: '은행 계좌와 휴대폰 결제' },
    kr: [
      { name: 'KakaoBank', local: '카카오뱅크', url: 'https://www.kakaobank.com' },
      { name: 'Toss Bank', local: '토스뱅크', url: 'https://toss.im' },
    ],
    kg: [{ name: 'MBank', url: 'https://mbank.kg' }, { name: 'ELQR', local: 'национальный QR-стандарт' }],
    inKR: {
      en: 'You need the residence card (ARC) to open an account. Since March 2025 six banks accept the mobile residence card, and since October 2026 KakaoBank lets foreign residents open an account in the app.',
      ru: 'Для счёта нужна ID-карта иностранца (ARC). С марта 2025 года шесть банков принимают мобильную ARC, а с октября 2026 года KakaoBank открывает счёт иностранцам прямо в приложении.',
      ko: '계좌를 만들려면 외국인등록증(ARC)이 필요해요. 2025년 3월부터 은행 6곳이 모바일 외국인등록증을 받아요. 2026년 10월부터는 카카오뱅크 앱에서 외국인 거주자도 바로 계좌를 만들 수 있어요.',
    },
    inKG: {
      en: 'Paying by QR is everywhere: ELQR is the National Bank’s single QR standard, so one banking app pays in any shop or bus. Foreigners open an account with a passport and their registration.',
      ru: 'QR-оплата везде: ELQR — единый QR-стандарт Нацбанка, поэтому одно банковское приложение платит в любом магазине и автобусе. Иностранцу для счёта нужны паспорт и регистрация.',
      ko: 'QR 결제가 어디서나 돼요. ELQR은 키르기스스탄 국립은행의 통합 QR 표준이라, 은행 앱 하나로 모든 가게와 버스에서 결제할 수 있어요. 외국인은 여권과 거주 등록만 있으면 계좌를 만들 수 있어요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'Korea JoongAng Daily: KakaoBank', url: 'https://www.koreajoongangdaily.com/business/kakaobank-opens-app-to-foreign-residents-enabling-remote-account-opening/12914315' },
      { label: 'FSC: mobile residence card', url: 'https://fsc.go.kr/eng/pr010101/84215?curPage=3' },
      { label: 'economist.kg: ELQR', url: 'https://economist.kg/novosti-kompanii/2026/03/02/qr-vmiesto-nalichnykh-kak-elqr-za-6-liet-pieriestroil-platiezhnyi-rynok-kyrghyzstana/' },
    ],
  },
  {
    id: 'messenger',
    category: 'communication',
    need: { en: 'Message classmates and the university', ru: 'Писать одногруппникам и вузу', ko: '동기, 학교와 연락하기' },
    kr: [{ name: 'KakaoTalk', local: '카카오톡', url: 'https://www.kakaocorp.com/page/service/service/KakaoTalk' }],
    kg: [{ name: 'WhatsApp' }, { name: 'Telegram' }],
    inKR: {
      en: 'Group chats and department notices usually go through KakaoTalk. Install it on day one.',
      ru: 'Групповые чаты и объявления кафедры обычно идут через KakaoTalk. Установи в первый же день.',
      ko: '단체 대화방과 학과 공지는 보통 카카오톡으로 와요. 첫날 바로 설치하세요.',
    },
    inKG: {
      en: 'Group chats live in WhatsApp; channels and news in Telegram. Ask your group leader to add you.',
      ru: 'Групповые чаты — в WhatsApp, каналы и новости — в Telegram. Попроси старосту добавить тебя.',
      ko: '단체 대화방은 WhatsApp에, 채널과 뉴스는 Telegram에 있어요. 과대표에게 초대해 달라고 하세요.',
    },
    status: 'needs_review',
  },
  {
    id: 'community',
    category: 'communication',
    need: { en: 'Find a community of newcomers', ru: 'Найти сообщество приезжих', ko: '새로 온 외국인 커뮤니티 찾기' },
    kr: [{ name: 'Kakao Open Chat', local: '오픈채팅' }],
    kg: [{ name: 'Telegram groups' }],
    inKR: {
      en: 'Open chats exist for many universities and nationalities. Search by your university name in English and Korean.',
      ru: 'Открытые чаты есть у многих вузов и землячеств. Ищи по названию вуза на английском и корейском.',
      ko: '여러 대학과 나라별로 오픈채팅방이 있어요. 학교 이름을 영어와 한국어로 검색해 보세요.',
    },
    inKG: {
      en: 'Student and expat communities gather in Telegram groups. Check with your university which groups are official.',
      ru: 'Студенческие и экспат-сообщества собираются в Telegram-группах. Уточни в вузе, какие из них официальные.',
      ko: '학생과 외국인 커뮤니티는 Telegram 그룹에 모여요. 어떤 그룹이 공식인지 학교에 확인하세요.',
    },
    status: 'needs_review',
  },
  {
    id: 'sim',
    category: 'communication',
    need: { en: 'Get a local SIM card', ru: 'Купить местную SIM-карту', ko: '현지 유심 사기' },
    kr: [{ name: 'SKT' }, { name: 'KT' }, { name: 'LG U+' }],
    kg: [{ name: 'Beeline' }, { name: 'MegaCom' }, { name: 'O!' }],
    inKR: {
      en: 'Identity checks (본인인증) in Korean apps work only with a line in your own name that matches your ARC. Airport prepaid SIMs usually do not pass them.',
      ru: 'Проверка личности (본인인증) в корейских приложениях работает только с номером на твоё имя, которое совпадает с ARC. Туристические SIM из аэропорта обычно её не проходят.',
      ko: '한국 앱의 본인인증은 외국인등록증과 이름이 같은 본인 명의 번호로만 돼요. 공항에서 파는 선불 유심은 보통 인증이 안 돼요.',
    },
    inKG: {
      en: 'A SIM needs your passport, and since 1 April 2024 every new SIM must be registered in the operator’s app, or service stays limited. O! sells eSIMs to foreigners online.',
      ru: 'Для SIM нужен паспорт, а с 1 апреля 2024 года каждую новую SIM нужно зарегистрировать в приложении оператора, иначе связь ограничена. O! продаёт иностранцам eSIM онлайн.',
      ko: '유심을 사려면 여권이 필요해요. 2024년 4월 1일부터 새 유심은 모두 통신사 앱에서 등록해야 해요. 등록하지 않으면 서비스가 제한돼요. O!는 외국인에게 eSIM을 온라인으로 팔아요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'Toss Feed: Korea life hacks', url: 'https://toss.im/tossfeed/article/korealifehacks-7-en' },
      { label: 'kaktus.media: регистрация SIM', url: 'https://kaktus.media/doc/497733_novye_pravila_registracii_sim_kart_v_kyrgyzstane._otvety_na_popyliarnye_voprosy_abonentov.html' },
    ],
  },
  {
    id: 'translate',
    category: 'communication',
    need: { en: 'Translate signs and forms', ru: 'Переводить вывески и бланки', ko: '간판과 서류 번역하기' },
    kr: [{ name: 'Papago', local: '파파고', url: 'https://papago.naver.com' }],
    kg: [{ name: 'Google Translate' }, { name: 'Yandex Translate' }],
    gapIn: 'KR',
    inKR: {
      en: 'Papago is the best for Korean and supports Russian, but it has no Kyrgyz. Kyrgyz speakers should switch to Russian.',
      ru: 'Papago лучше всех переводит корейский и поддерживает русский, но кыргызского в нём нет. Носителям кыргызского — переключаться на русский.',
      ko: '한국어 번역은 파파고가 가장 좋고 러시아어도 지원해요. 하지만 키르기스어는 없어요. 키르기스어를 쓴다면 러시아어로 바꿔서 쓰세요.',
    },
    inKG: {
      en: 'Signs are in Kyrgyz and Russian. Google Translate has supported Kyrgyz since 2016, and Yandex Translate supports it too.',
      ru: 'Вывески на кыргызском и русском. Google Translate поддерживает кыргызский с 2016 года, Яндекс Переводчик — тоже.',
      ko: '간판은 키르기스어와 러시아어로 되어 있어요. Google Translate는 2016년부터 키르기스어를 지원하고, Yandex Translate도 지원해요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [{ label: 'Papago languages', url: 'https://machinetranslate.org/papago' }],
  },
  {
    id: 'shopping',
    category: 'shopping',
    need: { en: 'Order things online', ru: 'Заказать вещи онлайн', ko: '온라인으로 물건 주문하기' },
    kr: [{ name: 'Coupang', local: '쿠팡', url: 'https://www.coupang.com' }],
    kg: [{ name: 'Wildberries' }, { name: 'Ozon' }],
    inKR: {
      en: 'Coupang delivers overnight. Sign-up needs a Korean phone number for the SMS code.',
      ru: 'Coupang доставляет за ночь. Для регистрации нужен корейский номер — на него приходит SMS-код.',
      ko: '쿠팡은 밤사이에 배송해 줘요. 가입하려면 SMS 인증번호를 받을 한국 전화번호가 필요해요.',
    },
    inKG: {
      en: 'Orders arrive at pick-up points; Ozon also has courier delivery and keeps parcels for 14 days.',
      ru: 'Заказы приходят в пункты выдачи; у Ozon есть ещё курьерская доставка, посылка хранится 14 дней.',
      ko: '주문한 물건은 픽업 장소에서 받아요. Ozon은 택배 배송도 하고, 물건을 14일 동안 보관해 줘요.',
    },
    status: 'needs_review',
    sources: [{ label: '10 Magazine: Coupang guide', url: 'https://10mag.com/how-to-use-coupang-in-korea-english-guide-for-foreigners/' }],
  },
  {
    id: 'secondhand',
    category: 'shopping',
    need: { en: 'Buy second-hand furniture and goods', ru: 'Купить б/у мебель и вещи', ko: '중고 가구와 물건 사기' },
    kr: [{ name: 'Karrot (Danggeun)', local: '당근', url: 'https://www.daangn.com' }],
    kg: [{ name: 'Lalafo', url: 'https://lalafo.kg' }],
    inKR: {
      en: 'Karrot shows listings near you. It needs a Korean number registered to your ARC.',
      ru: 'Karrot показывает объявления рядом. Нужен корейский номер, оформленный на твою ARC.',
      ko: '당근은 내 근처 매물을 보여 줘요. 외국인등록증 명의로 개통한 한국 번호가 필요해요.',
    },
    inKG: {
      en: 'Lalafo is the main classifieds site, including room and flat rentals. Never pay a deposit before seeing the place.',
      ru: 'Lalafo — главная доска объявлений, в том числе аренда комнат и квартир. Не плати задаток, пока не увидел жильё.',
      ko: 'Lalafo는 대표적인 온라인 광고 게시판이에요. 방이나 집 임대 매물도 있어요. 집을 직접 보기 전에는 계약금을 보내지 마세요.',
    },
    status: 'needs_review',
    sources: [{ label: 'SeoulStart: Karrot guide', url: 'https://seoulstart.com/guides/karrot-danggeun-guide' }],
  },
  {
    id: 'delivery',
    category: 'shopping',
    need: { en: 'Get food delivered', ru: 'Заказать доставку еды', ko: '음식 배달 시키기' },
    kr: [{ name: 'Baemin', local: '배달의민족' }, { name: 'Coupang Eats', local: '쿠팡이츠' }],
    kg: [{ name: 'Glovo' }, { name: 'Yandex Eats' }],
    inKR: {
      en: 'Since July 2026 Baemin accepts foreign cards and Apple Pay without a Korean phone number at checkout.',
      ru: 'С июля 2026 года Baemin принимает иностранные карты и Apple Pay без корейского номера при оплате.',
      ko: '2026년 7월부터 배달의민족은 결제할 때 한국 번호 없이도 해외 카드와 Apple Pay를 받아요.',
    },
    inKG: {
      en: 'Glovo (including 24/7 Glovo Express) and Yandex Eats both deliver in Bishkek.',
      ru: 'В Бишкеке доставляют Glovo (включая круглосуточный Glovo Express) и Яндекс Еда.',
      ko: '비슈케크에서는 Glovo(24시간 Glovo Express 포함)와 Yandex Eats가 배달해요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'Korea Times, 29 Jul 2026', url: 'https://koreatimes.co.kr/lifestyle/travel-food/20260729/seoul-simplifies-food-delivery-apps-for-international-visitors' },
      { label: 'economist.kg: Glovo Express', url: 'https://economist.kg/novosti-kompanii/2025/03/20/glovo-express-piervyi-darkstor-v-kyrghyzstanie-nabiraiet-oboroty.md' },
    ],
  },
  {
    id: 'shop-near',
    category: 'daily',
    need: { en: 'Corner shop open late', ru: 'Магазин у дома допоздна', ko: '늦게까지 여는 동네 가게' },
    kr: [{ name: 'CU' }, { name: 'GS25' }, { name: '7-Eleven' }],
    kg: [{ name: 'Globus' }, { name: 'Narodny', local: 'Народный' }],
    inKR: {
      en: 'Convenience stores are on every corner and sell T-money cards, top-ups and simple meals.',
      ru: 'Магазины у дома на каждом углу: там продают T-money, пополнение и простую еду.',
      ko: '편의점은 어디에나 있어요. 티머니 카드와 충전, 간단한 식사를 팔아요.',
    },
    inKG: {
      en: 'Globus has over 70 supermarkets; Narodny shops are in every district. Markets are cheapest for fresh food.',
      ru: 'У «Глобуса» больше 70 супермаркетов, «Народные» есть в каждом районе. На базаре дешевле всего свежие продукты.',
      ko: 'Globus는 슈퍼마켓이 70곳이 넘고, Narodny 가게는 모든 구에 있어요. 신선 식품은 시장이 가장 싸요.',
    },
    status: 'needs_review',
  },
  {
    id: 'registration',
    category: 'documents',
    need: { en: 'Register as a foreign resident', ru: 'Зарегистрироваться как иностранец', ko: '외국인 등록하기' },
    kr: [{ name: 'Residence card (ARC) via HiKorea', local: '외국인등록증 · 하이코리아', url: 'https://www.hikorea.go.kr' }],
    kg: [{ name: 'Registration at a ЦОН or ereg.e-gov.kg', local: 'Департамент регистрации населения' }],
    inKR: {
      en: 'Staying over 90 days? Apply for the ARC within 90 days of entry: book on HiKorea, then go in person. A mobile residence card exists since January 2025 and counts the same as the plastic one.',
      ru: 'Остаёшься больше 90 дней? Подай на ARC в течение 90 дней после въезда: запись на HiKorea, потом визит лично. С января 2025 года есть мобильная ARC, она равна пластиковой.',
      ko: '90일 넘게 머무르나요? 입국 후 90일 안에 외국인등록증을 신청하세요. 하이코리아에서 예약하고 직접 방문하면 돼요. 2025년 1월부터 모바일 외국인등록증이 있고, 실물 카드와 똑같이 인정돼요.',
    },
    inKG: {
      en: 'Study needs a student visa through the university: visa-free entry does not cover study. Citizens of Korea must register within 30 days of entry at the actual address (rules of September 2026), at a ЦОН or online. Re-register within 10 working days after a move. Rules changed three times in 2025–2026, so confirm with the international office.',
      ru: 'Для учёбы нужна студенческая виза через вуз: безвизовый въезд учёбу не покрывает. Гражданам Кореи нужно зарегистрироваться в течение 30 дней после въезда по фактическому адресу (правила сентября 2026), в ЦОНе или онлайн. После переезда — перерегистрация за 10 рабочих дней. Правила менялись три раза за 2025–2026 годы, уточняй в международном отделе.',
      ko: '공부하려면 학교를 통해 학생 비자를 받아야 해요. 무비자 입국으로는 공부할 수 없어요. 한국 국민은 입국 후 30일 안에 실제 사는 주소로 등록해야 해요(2026년 9월 규정). ЦОН(공공서비스센터)이나 온라인으로 할 수 있어요. 이사하면 10영업일 안에 다시 등록하세요. 규정이 2025~2026년에 세 번 바뀌었으니 국제처에 꼭 확인하세요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'MOJ: mobile residence card', url: 'https://www.moj.go.kr/bbs/immigration_eng/229/591100/artclView.do' },
      { label: 'economist.kg, 21 Sep 2026', url: 'https://economist.kg/pravo-znat/2026/09/21/v-kyrgyzstane-izmenili-poriadok-registratsii-inostrannykh-grazhdan-chto-nuzhno-znat/' },
    ],
  },
  {
    id: 'official-guide',
    category: 'documents',
    need: { en: 'An official guide for international students', ru: 'Официальный гид для иностранных студентов', ko: '외국인 유학생을 위한 공식 안내' },
    kr: [{ name: 'Study in Korea', local: '스터디인코리아', url: 'https://www.studyinkorea.go.kr' }],
    kg: [],
    gapIn: 'KG',
    inKR: {
      en: 'The government portal has an AI consultant around the clock and human counsellors in six languages, Russian included.',
      ru: 'На госпортале круглосуточный ИИ-консультант и живые консультанты на шести языках, включая русский.',
      ko: '정부 포털에서 AI 상담원이 24시간 답해 줘요. 러시아어를 포함한 6개 언어로 사람 상담원과도 이야기할 수 있어요.',
    },
    inKG: {
      en: 'Official portals (EduGate, e-visa) cover admission and visas only. We found no official guide to everyday life for foreign students.',
      ru: 'Официальные порталы (EduGate, e-visa) покрывают только поступление и визу. Официального гида по повседневной жизни для иностранных студентов мы не нашли.',
      ko: '공식 포털(EduGate, e-visa)은 입학과 비자만 다뤄요. 외국인 학생을 위한 공식 생활 안내는 찾지 못했어요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [{ label: 'EduGate applicant guide (2026)', url: 'https://auca.kg/uploads/Admission%20Sample%20Exams/EduGate_Applicant_Guide_EN_26.pdf' }],
  },
  {
    id: 'egov',
    category: 'documents',
    need: { en: 'Government services online', ru: 'Госуслуги онлайн', ko: '온라인 정부 서비스' },
    kr: [{ name: 'Gov24', local: '정부24', url: 'https://www.gov.kr' }],
    kg: [{ name: 'Tunduk', local: 'Түндүк' }],
    inKR: {
      en: 'Gov24 has a section for foreigners, but English is partial and many services need Korean identity verification. Help line: 1588-2188.',
      ru: 'В Gov24 есть раздел для иностранцев, но английский частичный, а многим услугам нужна корейская проверка личности. Справка: 1588-2188.',
      ko: '정부24에 외국인 메뉴가 있지만 영어는 일부만 돼요. 많은 서비스에 한국 본인인증이 필요해요. 문의: 1588-2188.',
    },
    inKG: {
      en: 'Tunduk is built mainly for citizens. Foreign students usually go through the university.',
      ru: 'Tunduk рассчитан в основном на граждан. Иностранные студенты обычно идут через вуз.',
      ko: 'Tunduk은 주로 자국민을 위한 서비스예요. 외국인 학생은 보통 학교를 통해 처리해요.',
    },
    status: 'needs_review',
  },
  {
    id: 'insurance',
    category: 'health',
    need: { en: 'Health insurance', ru: 'Медицинская страховка', ko: '건강보험' },
    kr: [{ name: 'National Health Insurance', local: '국민건강보험', url: 'https://www.nhis.or.kr' }],
    kg: [{ name: 'Compulsory health insurance policy', local: 'Полис ОМС (ФОМС)' }],
    inKR: {
      en: 'Degree students are enrolled automatically. In 2026 a student pays 79,320 KRW a month after a 50% discount. Help line: 1577-1000.',
      ru: 'Студентов включают в страховку автоматически. В 2026 году студент платит 79 320 вон в месяц уже со скидкой 50%. Справка: 1577-1000.',
      ko: '학위 과정 학생은 국민건강보험에 자동으로 가입돼요. 2026년 학생 보험료는 50% 할인 후 월 79,320원이에요. 문의: 1577-1000.',
    },
    inKG: {
      en: 'Foreign students must buy a policy from the Compulsory Health Insurance Fund: 11,910 som a year (2026). Without it you pay full clinic prices. Hotline: 113.',
      ru: 'Иностранным студентам нужен полис ФОМС: 11 910 сомов в год (2026). Без него лечение по полному прейскуранту. Горячая линия: 113.',
      ko: '외국인 학생은 의무건강보험기금(ФОМС) 보험증을 사야 해요. 2026년 기준 1년에 11,910솜이에요. 보험이 없으면 병원비를 전액 내요. 상담 전화: 113.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'Sungshin Univ. notice (NHIS)', url: 'https://sungshin.ac.kr/bbs/main_eng/4941/152421/artclView.do' },
      { label: 'kaktus.media: ФОМС, 25 Feb 2026', url: 'https://kaktus.media/doc/541223_stydenty_iz_stran_eaes_prosiat_snizit_stoimost_polisa_oms._kommentariy_foms.html' },
    ],
  },
  {
    id: 'emergency',
    category: 'emergency',
    need: { en: 'Emergency numbers', ru: 'Экстренные номера', ko: '긴급 전화번호' },
    kr: [{ name: '119', local: '소방 · 구급' }, { name: '112', local: '경찰' }],
    kg: [
      { name: '101', local: 'Пожарная служба' },
      { name: '102', local: 'Милиция' },
      { name: '103', local: 'Скорая помощь' },
      { name: '112', local: 'Единый номер' },
    ],
    inKR: {
      en: 'In Korea 119 is fire and ambulance (in Kyrgyzstan the same number is the migration call centre). Police 112 has English and Chinese operators and connects other languages through interpreters.',
      ru: 'В Корее 119 — это пожарные и скорая (в Кыргызстане этот же номер — миграционный колл-центр). В полиции 112 есть операторы на английском и китайском, другие языки — через переводчика.',
      ko: '한국에서 119는 화재와 구급이에요(키르기스스탄에서는 같은 번호가 이민 콜센터예요). 경찰 112에는 영어와 중국어 상담원이 있고, 다른 언어는 통역으로 연결해요.',
    },
    inKG: {
      en: 'Careful: 119 is not an emergency number here, it is the migration call centre. For fire dial 101, for an ambulance 103. The single 112 is being rolled out region by region.',
      ru: 'Осторожно: 119 здесь не экстренный номер, а миграционный колл-центр. Пожар — 101, скорая — 103. Единый 112 запускают по регионам.',
      ko: '조심하세요. 여기서 119는 긴급 번호가 아니라 이민 콜센터예요. 화재는 101, 구급차는 103이에요. 통합 번호 112는 지역별로 도입하고 있어요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [
      { label: 'The Star: interpretation gaps (2026)', url: 'https://www.thestar.com.my/aseanplus/aseanplus-news/2026/10/25/interpretation-gaps-in-south-korea039s-police-leave-foreigners-lost-in-translation' },
      { label: 'UN Kyrgyzstan: 112', url: 'https://kyrgyzstan.un.org/en/node/35934' },
      { label: 'kaktus.media: колл-центр 119', url: 'https://kaktus.media/doc/508603_registraciia_inostrancev_grajdan_rossii_toje_po_novym_pravilam._otvety_na_glavnye_voprosy.html' },
    ],
  },
  {
    id: 'foreigner-help',
    category: 'emergency',
    need: { en: 'A help line for foreigners', ru: 'Горячая линия для иностранцев', ko: '외국인 상담 전화' },
    kr: [
      { name: '1345', local: '외국인종합안내센터' },
      { name: '1577-1366', local: '다누리' },
    ],
    kg: [],
    gapIn: 'KG',
    inKR: {
      en: '1345 answers on visas and life in Korea in 20 languages, Russian included (no Kyrgyz), on weekdays 09:00–22:00. After 18:00 only Korean, English and Chinese.',
      ru: '1345 отвечает о визах и жизни в Корее на 20 языках, включая русский (кыргызского нет), по будням 09:00–22:00. После 18:00 — только корейский, английский и китайский.',
      ko: '1345는 비자와 한국 생활을 20개 언어로 안내해요. 러시아어는 있고 키르기스어는 없어요. 평일 09:00~22:00에 운영하고, 18:00 이후에는 한국어, 영어, 중국어만 돼요.',
    },
    inKG: {
      en: 'We found no multilingual line for foreigners. Your university’s international office is the first contact; Bishkek has a tourist police unit.',
      ru: 'Многоязычной линии для иностранцев мы не нашли. Первый контакт — международный отдел вуза; в Бишкеке есть туристическая милиция.',
      ko: '외국인을 위한 다국어 상담 전화는 찾지 못했어요. 먼저 학교 국제처에 연락하세요. 비슈케크에는 관광 경찰이 있어요.',
    },
    status: 'verified',
    checked: CHECKED,
    sources: [{ label: 'Korea Immigration Service: 1345', url: 'https://www.immigration.go.kr/immigration/1530/subview.do' }],
  },
  {
    id: 'air',
    category: 'daily',
    need: { en: 'Check air quality', ru: 'Проверить качество воздуха', ko: '공기 질 확인하기' },
    kr: [{ name: 'AirKorea', local: '에어코리아', url: 'https://www.airkorea.or.kr' }],
    kg: [{ name: 'AQ.kg (MoveGreen)' }, { name: 'IQAir', url: 'https://www.iqair.com' }],
    inKR: {
      en: 'Fine-dust (미세먼지) alerts are common in spring. Koreans check the index in the morning and wear masks on bad days.',
      ru: 'Весной часто предупреждают о мелкой пыли (미세먼지). Корейцы с утра смотрят индекс и носят маски в плохие дни.',
      ko: '봄에는 미세먼지 경보가 자주 나와요. 한국 사람들은 아침에 지수를 확인하고, 나쁜 날에는 마스크를 써요.',
    },
    inKG: {
      en: 'In winter Bishkek is often among the most polluted cities in IQAir’s live ranking. Check the index before going out.',
      ru: 'Зимой Бишкек часто входит в число самых загрязнённых городов в рейтинге IQAir. Проверяй индекс перед выходом.',
      ko: '겨울에 비슈케크는 IQAir 실시간 순위에서 가장 오염된 도시에 자주 들어가요. 나가기 전에 지수를 확인하세요.',
    },
    status: 'needs_review',
  },
];

/** Services on the side the student already knows. */
export const homeSide = (p: LifePair, dest: 'KR' | 'KG') => (dest === 'KR' ? p.kg : p.kr);
/** Services in the country the student is moving to. */
export const destSide = (p: LifePair, dest: 'KR' | 'KG') => (dest === 'KR' ? p.kr : p.kg);
