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
    error: tr('Error in the information', 'Ошибка в информации'),
    idea: tr('Suggestion', 'Предложение'),
    other: tr('Other question', 'Другой вопрос'),
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!kind) next.kind = tr('Choose what it is about.', 'Выберите тип обращения.');
    if (text.trim().length < 10) next.text = tr('Please write at least 10 characters.', 'Напишите хотя бы 10 символов.');
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
        <Breadcrumbs items={[{ label: tr('Home', 'Главная'), to: '/' }, { label: tr('Contact', 'Связаться') }]} />
        <PageHead
          title={tr('Contact us', 'Свяжись с нами')}
          lead={tr('Spotted outdated information or have an idea? Tell us.', 'Заметили устаревшую информацию или есть идея? Напишите нам.')}
        />

        <div className="notice">
          <Info size={18} aria-hidden="true" />
          <p>
            {tr(
              'Prototype: messages become public issues in our GitHub repository. You’ll need a GitHub account to submit, and please don’t include personal data.',
              'Прототип: обращения публикуются как открытые issue в нашем GitHub-репозитории. Для отправки нужен аккаунт GitHub. Не указывайте личные данные.',
            )}
          </p>
        </div>

        <form className="card pad form" onSubmit={submit} noValidate>
          <div className="field">
            <label className="label" htmlFor="kind">
              {tr('What is it about?', 'Тип обращения')}
            </label>
            <select
              id="kind"
              className={`input${errors.kind ? ' is-invalid' : ''}`}
              value={kind}
              onChange={(e) => setKind(e.target.value as Kind)}
              aria-invalid={!!errors.kind}
              aria-describedby={errors.kind ? 'kind-err' : undefined}
            >
              <option value="">{tr('Choose…', 'Выберите…')}</option>
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
              {tr('Page or university', 'Страница или вуз')} <span className="optional">{tr('optional', 'необязательно')}</span>
            </label>
            <input id="page" className="input" value={page} onChange={(e) => setPage(e.target.value)} placeholder={tr('e.g. Guides → Prepare documents', 'например, Гайды → Документы')} />
          </div>
          <div className="field">
            <label className="label" htmlFor="text">
              {tr('Message', 'Текст обращения')}
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
                {tr('If it’s about wrong information, a link to the official source helps a lot.', 'Если речь об ошибке — ссылка на официальный источник очень поможет.')}
              </p>
            )}
          </div>
          <div className="form__foot">
            <button type="submit" className="btn btn--primary">
              <Github size={18} aria-hidden="true" />
              {tr('Continue on GitHub', 'Продолжить на GitHub')}
              <ExtIcon size={15} aria-hidden="true" />
            </button>
          </div>
          {opened && (
            <p className="form__status" role="status">
              {tr(
                'We opened a pre-filled issue in a new tab. It is not sent until you press “Submit new issue” there.',
                'Мы открыли заполненный issue в новой вкладке. Он не отправлен, пока вы не нажмёте там «Submit new issue».',
              )}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
