// Chooses the calendar event for a race: its next registration milestone,
// or its race day. Pure — the route loads the race and serves the file.
import { formatEt, MILESTONE_LABELS } from '@/app/lib/format';
import type { CalendarEvent } from '@/app/lib/ics';
import { nextMilestone, upcomingEdition, type MilestoneRecord } from '@/app/lib/raceList';

export type CalendarRace = {
  slug: string;
  name: string;
  locationName: string;
  editions: {
    year: number;
    raceDate: Date | null;
    registrationUrl: string | null;
    isSample: boolean;
    milestones: MilestoneRecord[];
  }[];
};

export type CalendarEventKind = 'next' | 'raceday';

export type CalendarEventResult = { event: CalendarEvent } | { error: string };

const RACE_DAY_MINUTES = 240;
const MILESTONE_MINUTES = 30;

export function raceCalendarEvent(race: CalendarRace, kind: CalendarEventKind, now: Date): CalendarEventResult {
  const edition = upcomingEdition(race.editions, now);
  if (!edition) return { error: 'No upcoming edition' };

  let title: string;
  let start: Date;
  let durationMinutes: number;
  if (kind === 'raceday') {
    if (!edition.raceDate) return { error: 'Race date not announced' };
    title = `${race.name} (race day)`;
    start = edition.raceDate;
    durationMinutes = RACE_DAY_MINUTES;
  } else {
    const next = nextMilestone(edition.milestones, now);
    if (!next) return { error: 'No upcoming registration date' };
    title = `${race.name}: ${MILESTONE_LABELS[next.kind] ?? next.kind}`;
    start = next.at;
    durationMinutes = MILESTONE_MINUTES;
  }

  const description = [
    `${formatEt(start)} (Eastern Time).`,
    edition.registrationUrl ? `Official registration: ${edition.registrationUrl}` : null,
    edition.isSample ? 'Sample data from Starting Line. Confirm on the official site.' : null,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    event: {
      uid: `${race.slug}-${edition.year}-${kind}@startingline`,
      title,
      start,
      durationMinutes,
      location: race.locationName,
      description,
      stamp: now,
    },
  };
}

export function calendarFileName(slug: string, kind: CalendarEventKind): string {
  return `${slug}${kind === 'raceday' ? '-raceday' : ''}.ics`;
}
