import { useState, type FormEvent } from 'react';
import { CircleAlert, ExternalLink as ExtIcon, Github, Info } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import { Breadcrumbs, PageHead } from '../components/ui';

type Kind = '' | 'error' | 'idea' | 'other';
const REPO = 'https://github.com/zeuscode-tech/UniBridge';

/**
 * There is no backend yet, so we never pretend a message was "sent" (spec §15).
 * The form prepares a GitHub issue and opens it; the user submits it there.
 */
export default function Contact() {
  const { tr } = usePrefs();
  const [kind, setKind] = useState<Kind>('');
  const [page, setPage] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<{ kind?: string; text?: string }>({});
  const [opened, setOpened] = useState(false);

  const labels: Record<Exclude<Kind, ''>, string> = {
    error: tr('Error in the information', 'Ошибка в информации', '정보 오류'),
    idea: tr('Suggestion', 'Предложение', '제안'),
    other: tr('Other question', 'Другой вопрос', '기타 문의'),
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!kind) next.kind = tr('Choose what it is about.', 'Выберите тип обращения.', '문의 유형을 골라 주세요.');
    if (text.trim().length < 10) next.text = tr('Please write at least 10 characters.', 'Напишите хотя бы 10 символов.', '10자 이상 써 주세요.');
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.kind ? 'kind' : 'text')?.focus();
      return;
    }
    const title = `[${labels[kind as Exclude<Kind, ''>]}] ${text.trim().slice(0, 60)}`;
    const body = `${text.trim()}\n\n---\n${page ? `Page: ${page}\n` : ''}Sent from the UniBridge contact form.`;
    const url = `${REPO}/issues/new?${new URLSearchParams({ title, body })}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpened(true);
  };

  return (
    <div className="page page--canvas">
      <div className="container container--narrow">
        <Breadcrumbs items={[{ label: tr('Home', 'Главная', '홈'), to: '/' }, { label: tr('Contact', 'Связаться', '문의') }]} />
        <PageHead
          title={tr('Contact us', 'Свяжись с нами', '문의하기')}
          lead={tr('Spotted outdated information or have an idea? Tell us.', 'Заметили устаревшую информацию или есть идея? Напишите нам.', '오래된 정보를 찾았거나 좋은 아이디어가 있나요? 알려 주세요.')}
        />

        <div className="notice">
          <Info size={18} aria-hidden="true" />
          <p>
            {tr(
              'Prototype: messages become public issues in our GitHub repository. You’ll need a GitHub account to submit, and please don’t include personal data.',
              'Прототип: обращения публикуются как открытые issue в нашем GitHub-репозитории. Для отправки нужен аккаунт GitHub. Не указывайте личные данные.',
              '프로토타입이라 문의 내용은 GitHub 저장소에 공개 이슈로 올라가요. 보내려면 GitHub 계정이 필요해요. 개인정보는 적지 말아 주세요.',
            )}
          </p>
        </div>

        <form className="card pad form" onSubmit={submit} noValidate>
          <div className="field">
            <label className="label" htmlFor="kind">
              {tr('What is it about?', 'Тип обращения', '어떤 내용인가요?')}
            </label>
            <select
              id="kind"
              className={`input${errors.kind ? ' is-invalid' : ''}`}
              value={kind}
              onChange={(e) => setKind(e.target.value as Kind)}
              aria-invalid={!!errors.kind}
              aria-describedby={errors.kind ? 'kind-err' : undefined}
            >
              <option value="">{tr('Choose…', 'Выберите…', '골라 주세요')}</option>
              <option value="error">{labels.error}</option>
              <option value="idea">{labels.idea}</option>
              <option value="other">{labels.other}</option>
            </select>
            {errors.kind && (
              <p className="field__error" id="kind-err">
                <CircleAlert size={14} aria-hidden="true" /> {errors.kind}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label" htmlFor="page">
              {tr('Page or university', 'Страница или вуз', '페이지 또는 대학')} <span className="optional">{tr('optional', 'необязательно', '선택')}</span>
            </label>
            <input id="page" className="input" value={page} onChange={(e) => setPage(e.target.value)} placeholder={tr('e.g. Guides → Prepare documents', 'например, Гайды → Документы', '예: 가이드 → 서류 준비')} />
          </div>
          <div className="field">
            <label className="label" htmlFor="text">
              {tr('Message', 'Текст обращения', '내용')}
            </label>
            <textarea
              id="text"
              className={`input input--area${errors.text ? ' is-invalid' : ''}`}
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-invalid={!!errors.text}
              aria-describedby={errors.text ? 'text-err' : 'text-hint'}
            />
            {errors.text ? (
              <p className="field__error" id="text-err">
                <CircleAlert size={14} aria-hidden="true" /> {errors.text}
              </p>
            ) : (
              <p className="hint" id="text-hint">
                {tr('If it’s about wrong information, a link to the official source helps a lot.', 'Если речь об ошибке — ссылка на официальный источник очень поможет.', '잘못된 정보라면 공식 출처 링크를 함께 남겨 주세요. 큰 도움이 돼요.')}
              </p>
            )}
          </div>
          <div className="form__foot">
            <button type="submit" className="btn btn--primary">
              <Github size={18} aria-hidden="true" />
              {tr('Continue on GitHub', 'Продолжить на GitHub', 'GitHub에서 계속하기')}
              <ExtIcon size={15} aria-hidden="true" />
            </button>
          </div>
          {opened && (
            <p className="form__status" role="status">
              {tr(
                'We opened a pre-filled issue in a new tab. It is not sent until you press “Submit new issue” there.',
                'Мы открыли заполненный issue в новой вкладке. Он не отправлен, пока вы не нажмёте там «Submit new issue».',
                '새 탭에 내용을 채운 이슈를 열었어요. 거기서 “Submit new issue”를 눌러야 전송돼요.',
              )}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
