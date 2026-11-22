// localStorage can be missing or throw (private mode, blocked site data).
// Every read/write goes through here so the app keeps working without it.

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* nothing to do */
  }
}
