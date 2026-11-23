import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, CircleDashed, CircleHelp, ShieldCheck } from 'lucide-react';
import { usePrefs } from '../state/prefs';
import logoMark from '../assets/unibridge-logo.svg';
import type { ContentStatus } from '../data/universities';

/* ------------------------------------------------------------------ Logo */

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`logo${inverse ? ' logo--inverse' : ''}`}>
      <img className="logo__mark" src={logoMark} alt="" width={58} height={40} />
      <span className="logo__word">UniBridge</span>
    </span>
  );
}

/* ---------------------------------------------------------- Status badge */

export function StatusBadge({ status, compact = false }: { status: ContentStatus; compact?: boolean }) {
  const { tr } = usePrefs();
  const map = {
    verified: { icon: ShieldCheck, label: tr('Verified', 'Проверено', '확인됨') },
    needs_review: { icon: CircleDashed, label: tr('Not yet verified', 'Не проверено', '아직 확인 안 됨') },
    unknown: { icon: CircleHelp, label: tr('No confirmed data', 'Нет подтверждённых данных', '확인된 정보 없음') },
  } as const;
  const { icon: Icon, label } = map[status];
  return (
    <span className={`status status--${status}`} title={label}>
      <Icon size={14} strokeWidth={2} aria-hidden="true" />
      {compact ? <span className="sr-only">{label}</span> : label}
    </span>
  );
}

/* --------------------------------------------------------- External link */

export function ExternalLink({
  href,
  children,
  className = 'link',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const { tr } = usePrefs();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" className="ext-icon" />
      <span className="sr-only">{tr('(opens an external site)', '(откроется внешний сайт)', '(외부 사이트가 열려요)')}</span>
    </a>
  );
}

/* ----------------------------------------------------------- Breadcrumbs */

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const { tr } = usePrefs();
  return (
    <nav className="crumbs" aria-label={tr('Breadcrumb', 'Навигационная цепочка', '현재 위치')}>
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
            {i < items.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------------------------------------------------- Page heading */

export function PageHead({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="h1">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  );
}

/* --------------------------------------------------------- Concept image */

/** Every AI-generated visual says so, on the image itself (spec §30.2). */
export function ConceptImage({
  src,
  alt,
  className = '',
  position,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  eager?: boolean;
}) {
  const { tr } = usePrefs();
  return (
    <figure className={`concept ${className}`}>
      <img
        src={src}
        alt={alt}
        width={768}
        height={512}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
      <figcaption className="concept__tag">{tr('Concept image', 'Концепт-изображение', '콘셉트 이미지')}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- Reveal */

/**
 * Fades a block in once when it enters the viewport.
 * Content is visible by default; the hidden state is only applied by JS,
 * and only to blocks that start below the fold.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', animate = false }: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'li';
  className?: string;
  animate?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'armed' | 'shown'>('idle');

  useEffect(() => {
    // Scroll reveals are off: they left cards blank during fast scrolling and in
    // link previews. The hero keeps its own entrance; pass `animate` to opt back in.
    if (!animate) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState('armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal--${state} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------- Empty state */

export function EmptyState({
  icon,
  title,
  text,
  action,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <div className="empty__icon" aria-hidden="true">
        {icon}
      </div>
      <h2 className="h3">{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}

/**
 * The brand mark of the product: a small arch from the home country (left) to
 * the destination (right). Left half takes the home colour, right half the
 * destination colour: KG flag red, KR taegeuk blue. Purely decorative.
 */
export function BridgeMark({ from, size = 'md' }: { from: 'KR' | 'KG'; size?: 'sm' | 'md' }) {
  const to = from === 'KG' ? 'kr' : 'kg';
  return (
    <span className={`bridge bridge--${size}`} aria-hidden="true">
      <svg viewBox="0 0 48 24" width={size === 'sm' ? 36 : 48} height={size === 'sm' ? 18 : 24} fill="none">
        <path d="M3 19 H45" className="bridge__deck" />
        <path d="M3 19 Q13 6 24 6" className={`bridge__half bridge__half--${from.toLowerCase()}`} />
        <path d="M24 6 Q35 6 45 19" className={`bridge__half bridge__half--${to}`} />
        <path d="M39 15.5 L45 19 L38.5 20.5" className={`bridge__half bridge__half--${to}`} />
      </svg>
    </span>
  );
}
