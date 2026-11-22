import { useSyncExternalStore } from 'react';
import { readJSON, removeKey, writeJSON } from './storage';
import { BASE_PLAN } from '../data/checklist';

/**
 * The admission plan lives in this browser only (spec §13, P0 storage).
 * No account, no documents, no personal data: just which steps are ticked.
 */
export interface PlanState {
  items: string[];
  done: Record<string, true>;
  dates: Record<string, string>;
  saved: string[];
}

const KEY = 'ub.plan.v1';
const EMPTY: PlanState = { items: [], done: {}, dates: {}, saved: [] };

let state: PlanState = load();
let persisted = true;
const listeners = new Set<() => void>();

function load(): PlanState {
  const raw = readJSON<Partial<PlanState>>(KEY, EMPTY);
  return {
    items: Array.isArray(raw.items) ? raw.items : [],
    done: raw.done && typeof raw.done === 'object' ? raw.done : {},
    dates: raw.dates && typeof raw.dates === 'object' ? raw.dates : {},
    saved: Array.isArray(raw.saved) ? raw.saved : [],
  };
}

function set(next: PlanState) {
  state = next;
  persisted = writeJSON(KEY, state);
  listeners.forEach((l) => l());
}

export const plan = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  get: () => state,
  isPersisted: () => persisted,

  start() {
    if (state.items.length) return;
    set({ ...state, items: [...BASE_PLAN] });
  },
  addItems(ids: string[]) {
    const base = state.items.length ? state.items : [...BASE_PLAN];
    const items = [...base];
    ids.forEach((id) => !items.includes(id) && items.push(id));
    set({ ...state, items });
  },
  toggle(id: string) {
    const done = { ...state.done };
    if (done[id]) delete done[id];
    else done[id] = true;
    set({ ...state, done });
  },
  setDate(id: string, date: string) {
    const dates = { ...state.dates };
    if (date) dates[id] = date;
    else delete dates[id];
    set({ ...state, dates });
  },
  toggleSaved(slug: string) {
    const saved = state.saved.includes(slug) ? state.saved.filter((s) => s !== slug) : [...state.saved, slug];
    set({ ...state, saved });
  },
  reset() {
    removeKey(KEY);
    state = { ...EMPTY };
    listeners.forEach((l) => l());
  },
};

// Keep two open tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

export function usePlan() {
  return useSyncExternalStore(plan.subscribe, plan.get, plan.get);
}
