import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { usePrefs, type Direction } from '../state/prefs';
import { readJSON, writeJSON } from '../state/storage';
import korea from '../assets/korea.jpg';
import kyrgyzstan from '../assets/kyrgyzstan.jpg';

interface Answers {
  level: '' | 'bachelor' | 'master' | 'other';
  field: string;
  language: string;
  scholarship: '' | 'yes' | 'nice' | 'no';
  city: string;
}

const EMPTY: Answers = { level: '', field: '', language: '', scholarship: '', city: '' };

function Choice<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T;
  options: { v: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="choices">
      {options.map((o) => (
        <label key={o.v} className={`choice${value === o.v ? ' is-on' : ''}`}>
          <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(o.v)} />
          <span className="choice__box" aria-hidden="true">
            <Check size={14} strokeWidth={3} />
          </span>
          {o.label}
        </label>
      ))}
    </div>
  );
}

export default function Start() {
  const { tr, direction, setDirection } = usePrefs();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  // Answers are kept so going back never loses anything (spec §7).
  const [a, setA] = useState<Answers>(() => ({ ...EMPTY, ...readJSON<Partial<Answers>>('ub.start', {}) }));
  const update = (patch: Partial<Answers>) => {
    const next = { ...a, ...patch };
    setA(next);
    writeJSON('ub.start', next);
  };

  const steps = [tr('Direction', 'Направление', '유학 방향'), tr('Education', 'Образование', '학업'), tr('Preferences', 'Предпочтения', '희망 사항')];
  const cityOptions =
    direction === 'kg-kr'
      ? [
          { v: '', label: tr('Any city', 'Любой город', '어느 도시든') },
          { v: 'Seoul', label: tr('Seoul', 'Сеул', '서울') },
          { v: 'Busan', label: tr('Busan', 'Пусан', '부산') },
          { v: 'Daejeon', label: tr('Daejeon', 'Тэджон', '대전') },
        ]
      : [
          { v: '', label: tr('Any city', 'Любой город', '어느 도시든') },
          { v: 'Bishkek', label: tr('Bishkek', 'Бишкек', '비슈케크') },
          { v: 'Osh', label: tr('Osh', 'Ош', '오시') },
        ];

  const finish = () => {
    const p = new URLSearchParams();
    if (a.city && cityOptions.some((c) => c.v === a.city)) p.set('city', a.city);
    const qs = p.toString();
    navigate(`/universities${qs ? `?${qs}` : ''}`);
  };

  const dirCard = (d: Direction, img: string, title: string, text: string, code: string) => (
    <label className={`dir-option${direction === d ? ' is-on' : ''}`}>
      <input type="radio" name="direction" checked={direction === d} onChange={() => setDirection(d)} />
      <span className="dir-option__img" style={{ backgroundImage: `url(${img})` }} aria-hidden="true" />
      <span className="dir-option__body">
        <span className="tag">{code}</span>
        <span className="h4">{title}</span>
        <span className="body-2">{text}</span>
      </span>
      <span className="dir-option__check" aria-hidden="true">
        <Check size={16} strokeWidth={3} />
      </span>
    </label>
  );

  return (
    <div className="container container--narrow page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        {tr('Back', 'Назад', '뒤로')}
      </Link>
      <header className="page-head page-head--center">
        <h1 className="h1">{tr('Tell us about your plans', 'Расскажи о своих планах', '계획을 알려 주세요')}</h1>
        <p className="lead">
          {tr('This helps us show relevant options. No account, no personal data.', 'Это поможет подобрать подходящие варианты. Без аккаунта и личных данных.', '나에게 맞는 정보를 보여 드릴게요. 계정도, 개인정보도 필요 없어요.')}
        </p>
      </header>

      <ol className="wizard-progress" aria-label={tr('Progress', 'Прогресс', '진행 상황')}>
        {steps.map((s, i) => (
          <li key={s} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}>
            <span className="wizard-progress__n">{i < step ? <Check size={14} strokeWidth={3} /> : i + 1}</span>
            <span className="wizard-progress__t">{s}</span>
          </li>
        ))}
      </ol>

      <section className="card wizard" aria-live="polite">
        {step === 0 && (
          <fieldset>
            <legend className="h3">{tr('Where are you planning to study?', 'Где ты планируешь учиться?', '어디에서 공부할 계획인가요?')}</legend>
            <p className="body-2 muted">{tr('You can change this later in the header.', 'Это можно сменить позже в шапке сайта.', '나중에 화면 위쪽 메뉴에서 바꿀 수 있어요.')}</p>
            <div className="dir-options">
              {dirCard('kg-kr', korea, tr('From Kyrgyzstan to Korea', 'Из Кыргызстана в Корею', '키르기스스탄에서 한국으로'), tr('Korean universities, GKS, TOPIK.', 'Корейские вузы, GKS, TOPIK.', '한국 대학, GKS, TOPIK'), 'KG → KR')}
              {dirCard('kr-kg', kyrgyzstan, tr('From Korea to Kyrgyzstan', 'Из Кореи в Кыргызстан', '한국에서 키르기스스탄으로'), tr('Universities in Bishkek and Osh.', 'Вузы Бишкека и Оша.', '비슈케크와 오시의 대학'), 'KR → KG')}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="wizard__fields">
            <fieldset>
              <legend className="label">{tr('Degree level', 'Уровень обучения', '학위 과정')}</legend>
              <Choice
                name="level"
                value={a.level}
                onChange={(level) => update({ level })}
                options={[
                  { v: 'bachelor', label: tr('Bachelor’s', 'Бакалавриат', '학사') },
                  { v: 'master', label: tr('Master’s', 'Магистратура', '석사') },
                  { v: 'other', label: tr('Other / not sure', 'Другое / не знаю', '기타 또는 잘 모르겠어요') },
                ]}
              />
            </fieldset>
            <div className="field">
              <label className="label" htmlFor="field">
                {tr('Field of study', 'Направление', '전공 분야')} <span className="optional">{tr('optional', 'необязательно', '선택')}</span>
              </label>
              <select id="field" className="input" value={a.field} onChange={(e) => update({ field: e.target.value })}>
                <option value="">{tr('Not decided yet', 'Пока не решил(а)', '아직 정하지 않았어요')}</option>
                <option value="cs">Computer Science</option>
                <option value="business">Business</option>
                <option value="engineering">Engineering</option>
                <option value="medicine">{tr('Medicine', 'Медицина', '의학')}</option>
                <option value="humanities">{tr('Humanities', 'Гуманитарные науки', '인문학')}</option>
                <option value="language">{tr('Language programme', 'Языковая программа', '어학 프로그램')}</option>
              </select>
            </div>
            <fieldset>
              <legend className="label">
                {tr('Preferred language of study', 'Язык обучения', '희망 수업 언어')} <span className="optional">{tr('optional', 'необязательно', '선택')}</span>
              </legend>
              <Choice
                name="language"
                value={a.language}
                onChange={(language) => update({ language })}
                options={
                  direction === 'kg-kr'
                    ? [
                        { v: 'en', label: 'English' },
                        { v: 'ko', label: '한국어' },
                        { v: '', label: tr('Any', 'Любой', '상관없어요') },
                      ]
                    : [
                        { v: 'en', label: 'English' },
                        { v: 'ru', label: 'Русский' },
                        { v: 'ky', label: 'Кыргызча' },
                        { v: '', label: tr('Any', 'Любой', '상관없어요') },
                      ]
                }
              />
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="wizard__fields">
            <fieldset>
              <legend className="label">{tr('Do you need a scholarship?', 'Нужна ли стипендия?', '장학금이 필요한가요?')}</legend>
              <Choice
                name="scholarship"
                value={a.scholarship}
                onChange={(scholarship) => update({ scholarship })}
                options={[
                  { v: 'yes', label: tr('Yes', 'Да', '네, 필요해요') },
                  { v: 'nice', label: tr('Would be nice', 'Желательно', '있으면 좋아요') },
                  { v: 'no', label: tr('Not important', 'Неважно', '중요하지 않아요') },
                ]}
              />
            </fieldset>
            <fieldset>
              <legend className="label">
                {tr('Preferred city', 'Предпочитаемый город', '희망 도시')} <span className="optional">{tr('optional', 'необязательно', '선택')}</span>
              </legend>
              <Choice name="city" value={a.city} onChange={(city) => update({ city })} options={cityOptions} />
            </fieldset>
            <p className="hint">
              {tr(
                'Levels and languages are not used as filters yet: we only show them once they are verified for each programme.',
                'Уровень и язык пока не фильтруют выдачу: мы показываем их только после проверки по каждой программе.',
                '과정과 언어는 아직 필터로 쓰지 않아요. 프로그램마다 확인을 마친 뒤에만 보여 드려요.',
              )}
            </p>
          </div>
        )}

        <div className="wizard__nav">
          <span className="muted">
            {tr(`Step ${step + 1} of 3`, `Шаг ${step + 1} из 3`, `3단계 중 ${step + 1}단계`)}
          </span>
          <div className="wizard__btns">
            {step > 0 && (
              <button type="button" className="btn btn--ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={16} aria-hidden="true" />
                {tr('Back', 'Назад', '뒤로')}
              </button>
            )}
            {step < 2 ? (
              <button type="button" className="btn btn--primary" onClick={() => setStep(step + 1)}>
                {tr('Continue', 'Далее', '다음')}
              </button>
            ) : (
              <button type="button" className="btn btn--primary" onClick={finish}>
                {tr('Show universities', 'Показать университеты', '대학 보기')}
              </button>
            )}
          </div>
        </div>
      </section>
      {step > 0 && (
        <p className="center">
          <button type="button" className="link" onClick={finish}>
            {tr('Skip and show all universities', 'Пропустить и показать все вузы', '건너뛰고 모든 대학 보기')}
          </button>
        </p>
      )}
    </div>
  );
}
