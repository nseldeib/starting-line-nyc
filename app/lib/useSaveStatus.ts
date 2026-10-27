'use client';

// A race's saved status in this browser, kept in sync with saves made by
// other buttons on the page and in other tabs. Null on the server and before
// hydration, so the first render matches the server's plain "Save".
import { useSyncExternalStore } from 'react';
import { parseSavedRaces, readSavedRacesRaw, subscribeSavedRaces, type SaveStatus } from '@/app/lib/savedRaces';

const noStorageSnapshot = () => null;

export function useSaveStatus(slug: string): SaveStatus | null {
  const raw = useSyncExternalStore(subscribeSavedRaces, readSavedRacesRaw, noStorageSnapshot);
  return parseSavedRaces(raw)[slug]?.status ?? null;
}
