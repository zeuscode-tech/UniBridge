import { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import '../styles/share.css';

/** Public address of the deployed site; QR codes and shares always point here, never to localhost. */
export const PUBLIC_URL = 'https://zeuscode-tech.github.io/UniBridge/';

/**
 * Share block: a QR code for phones (made for showing on a slide or a Zoom screen),
 * the system share sheet where available (it offers KakaoTalk on Korean phones),
 * and a plain "copy link" fallback.
 */
export function ShareBar({ path = '#/life', qr = 'qr-life.svg' }: { path?: string; qr?: string }) {
  const { tr } = usePrefs();
  const [copied, setCopied] = useState(false);
  const url = PUBLIC_URL + path;
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(tr('Copy this link', 'Скопируй ссылку', '링크를 복사하세요'), url);
    }
  };

  const share = () =>
    navigator
      .share({
        title: 'UniBridge — 생활 번역기 · Life Translator',
        text: tr(
          'What replaces Kakao T, Naver Map and KakaoTalk in Bishkek — and the other way round.',
          'Чем заменить Kakao T, Naver Map и KakaoTalk в Бишкеке — и наоборот.',
          '비슈케크에서는 카카오 T, 네이버 지도, 카카오톡 대신 무엇을 쓸까요? 반대 방향도 있어요.',
        ),
        url,
      })
      .catch(() => {
        /* The person closed the share sheet: nothing to do. */
      });

  return (
    <section className="sharebar" aria-labelledby="sharebar-title">
      <img className="sharebar__qr" src={`./${qr}`} width={132} height={132} alt={tr(`QR code for ${url}`, `QR-код для ${url}`, `${url} QR 코드`)} />
      <div className="sharebar__text">
        <h2 className="sharebar__title" id="sharebar-title">
          {tr('Open it on your phone', 'Открой на телефоне', '휴대폰으로 열어 보세요')}
        </h2>
        <p className="sharebar__lead">
          {tr(
            'Scan the code with the camera, or send the link to a friend who is about to move.',
            'Наведи камеру на код или отправь ссылку другу, который скоро переезжает.',
            '카메라로 코드를 스캔하거나, 곧 떠나는 친구에게 링크를 보내 주세요.',
          )}
        </p>
        <div className="sharebar__actions">
          {canShare && (
            <button type="button" className="btn btn--primary" onClick={share}>
              <Share2 size={18} aria-hidden="true" />
              {tr('Share', 'Поделиться', '공유하기')}
            </button>
          )}
          <button type="button" className="btn btn--secondary" onClick={copy} aria-live="polite">
            {copied ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
            {copied ? tr('Link copied', 'Ссылка скопирована', '링크를 복사했어요') : tr('Copy link', 'Скопировать ссылку', '링크 복사')}
          </button>
        </div>
      </div>
    </section>
  );
}
