import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { usePrefs } from '../state/prefs';

/**
 * Modal surface used for the scholarship drawer, mobile filters, the mobile
 * menu and confirmations. Traps focus, closes on Esc / backdrop click and
 * returns focus to whatever opened it (spec §30.4).
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  variant = 'side',
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'side' | 'bottom' | 'center';
  labelledBy?: string;
}) {
  const { tr } = usePrefs();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    requestAnimationFrame(() => (focusables()[0] ?? panel.current)?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key === 'Tab') {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  const titleId = labelledBy ?? 'sheet-title';

  return createPortal(
    <div className={`sheet sheet--${variant}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panel} tabIndex={-1}>
        <div className="sheet__head">
          <h2 className="h4" id={titleId}>
            {title}
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={tr('Close', 'Закрыть')}>
            <X size={20} />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
        {footer && <div className="sheet__foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
