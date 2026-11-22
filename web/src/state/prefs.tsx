import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readJSON, writeJSON } from './storage';

export type Locale = 'en' | 'ru';
export type Direction = 'kg-kr' | 'kr-kg';
/** A string in every supported locale. */
export type L = { en: string; ru: string };

interface Prefs {
  locale: Locale;
  setLocale: (l: Locale) => void;
  direction: Direction;
  setDirection: (d: Direction) => void;
  toggleDirection: () => void;
  /** Pick the string for the current locale. */
  tr: (en: string, ru: string) => string;
  /** Same, for a content object. */
  l: (value: L) => string;
}

const PrefsContext = createContext<Prefs | null>(null);

function initialLocale(): Locale {
  const saved = readJSON<Locale | null>('ub.locale', null);
  if (saved === 'en' || saved === 'ru') return saved;
  // Language follows the browser. The study country never does (spec §1.2).
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  return nav.startsWith('ru') || nav.startsWith('ky') ? 'ru' : 'en';
}

function initialDirection(): Direction {
  const saved = readJSON<Direction | null>('ub.direction', null);
  return saved === 'kr-kg' ? 'kr-kg' : 'kg-kr';
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [direction, setDirectionState] = useState<Direction>(initialDirection);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeJSON('ub.locale', next);
  }, []);

  const setDirection = useCallback((next: Direction) => {
    setDirectionState(next);
    writeJSON('ub.direction', next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<Prefs>(
    () => ({
      locale,
      setLocale,
      direction,
      setDirection,
      toggleDirection: () => setDirection(direction === 'kg-kr' ? 'kr-kg' : 'kg-kr'),
      tr: (en, ru) => (locale === 'ru' ? ru : en),
      l: (v) => v[locale],
    }),
    [locale, direction, setLocale, setDirection],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs must be used inside <PrefsProvider>');
  return ctx;
}

/** "1 university / 3 universities" and "1 вуз / 3 вуза / 5 вузов". */
export function plural(locale: Locale, n: number, en: [string, string], ru: [string, string, string]) {
  if (locale === 'en') return n === 1 ? en[0] : en[1];
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return ru[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return ru[1];
  return ru[2];
}

/** Destination country for a direction. */
export const destinationOf = (d: Direction) => (d === 'kg-kr' ? 'KR' : 'KG') as 'KR' | 'KG';
