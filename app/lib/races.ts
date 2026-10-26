// Race discovery read path shared by the home page and /api/races.
// Server-only: it talks to the database. The filtering itself is pure and
// lives in raceList.ts.
import { prisma } from '@/app/lib/prisma';
import type { RaceFilters } from '@/app/lib/filters';
import { filterAndSortRaces, type RaceListItem } from '@/app/lib/raceList';

export async function findRaces(filters: RaceFilters, now = new Date()): Promise<RaceListItem[]> {
  const races = await prisma.race.findMany({
    include: { organizer: true, editions: { include: { milestones: true } } },
  });
  return filterAndSortRaces(races, filters, now);
}
