// Saved races live in this browser only (localStorage), keyed by race slug.
// Accounts aren't live yet, so nothing is sent to a server. Every read
// tolerates missing, blocked or corrupt storage and falls back to "nothing saved".

export type SaveStatus = 'interested' | 'considering' | 'signed-up';

export type SavedRace = { status: SaveStatus; savedAt: string };

export type SavedRaces = Record<string, SavedRace>;

export const STORAGE_KEY = 'starting-line:saved-races';

export const SAVE_STATUSES: SaveStatus[] = ['interested', 'considering', 'signed-up'];

export const SAVE_STATUS_LABELS: Record<SaveStatus, string> = {
  interested: 'Interested',
  considering: 'Considering',
  'signed-up': 'Signed up',
};

const CHANGE_EVENT = 'starting-line:saved-races-changed';

function isSaveStatus(value: unknown): value is SaveStatus {
  return typeof value === 'string' && (SAVE_STATUSES as string[]).includes(value);
}

// Parses the stored JSON, dropping any entry that isn't a known status.
export function parseSavedRaces(raw: string | null): SavedRaces {
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  const saved: SavedRaces = {};
  for (const [slug, entry] of Object.entries(parsed as Record<string, unknown>)) {
    if (!entry || typeof entry !== 'object') continue;
    const { status, savedAt } = entry as { status?: unknown; savedAt?: unknown };
    if (!isSaveStatus(status)) continue;
    saved[slug] = { status, savedAt: typeof savedAt === 'string' ? savedAt : '' };
  }
  return saved;
}

// Returns the next saved set: the race's status set, or the race removed when status is null.
export function withSaveStatus(
  saved: SavedRaces,
  slug: string,
  status: SaveStatus | null,
  now: Date = new Date(),
): SavedRaces {
  const next = { ...saved };
  if (status === null) delete next[slug];
  else next[slug] = { status, savedAt: next[slug]?.status === status ? next[slug].savedAt : now.toISOString() };
  return next;
}

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

// Raw stored string, so useSyncExternalStore gets a stable snapshot between changes.
export function readSavedRacesRaw(): string | null {
  try {
    return storage()?.getItem(STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
}

// Saves the status (or removes the race). Returns false when storage is unavailable.
export function setSaveStatus(slug: string, status: SaveStatus | null): boolean {
  const store = storage();
  if (!store) return false;
  try {
    const next = withSaveStatus(parseSavedRaces(store.getItem(STORAGE_KEY)), slug, status);
    store.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return true;
}

// Notifies on saves from this tab and from other tabs.
export function subscribeSavedRaces(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function storageAvailable(): boolean {
  const store = storage();
  if (!store) return false;
  try {
    const probe = `${STORAGE_KEY}:probe`;
    store.setItem(probe, '1');
    store.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
