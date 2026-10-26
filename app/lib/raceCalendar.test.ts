import { describe, expect, it } from 'vitest';
import { calendarFileName, raceCalendarEvent, type CalendarRace } from '@/app/lib/raceCalendar';

const NOW = new Date('2026-10-26T14:00:00Z');

const race: CalendarRace = {
  slug: 'fred-lebow-manhattan-half',
  name: 'Fred Lebow Manhattan Half',
  locationName: 'Central Park',
  editions: [
    {
      year: 2027,
      raceDate: new Date('2027-01-24T12:00:00Z'),
      registrationUrl: 'https://www.nyrr.org',
      isSample: true,
      milestones: [
        { kind: 'registration_closes', at: new Date('2027-01-10T04:59:00Z'), timeKnown: true, tentative: false },
        { kind: 'registration_opens', at: new Date('2026-11-10T17:00:00Z'), timeKnown: true, tentative: false },
      ],
    },
  ],
};

describe('raceCalendarEvent', () => {
  // The default event is the next registration milestone, titled by its kind.
  it('builds the next milestone event', () => {
    const result = raceCalendarEvent(race, 'next', NOW);
    if ('error' in result) throw new Error(result.error);
    expect(result.event.title).toBe('Fred Lebow Manhattan Half: Registration opens');
    expect(result.event.start.toISOString()).toBe('2026-11-10T17:00:00.000Z');
    expect(result.event.durationMinutes).toBe(30);
    expect(result.event.uid).toBe('fred-lebow-manhattan-half-2027-next@startingline');
  });

  // The description restates the time in ET, links the official site and flags sample data.
  it('describes the time in ET with the official link and sample notice', () => {
    const result = raceCalendarEvent(race, 'next', NOW);
    if ('error' in result) throw new Error(result.error);
    expect(result.event.description).toBe(
      'Tue, Nov 10, 12:00 pm ET (Eastern Time).\nOfficial registration: https://www.nyrr.org\nSample data from Starting Line. Confirm on the official site.',
    );
  });

  // Race day events use the race date and a longer block.
  it('builds a race day event', () => {
    const result = raceCalendarEvent(race, 'raceday', NOW);
    if ('error' in result) throw new Error(result.error);
    expect(result.event.title).toBe('Fred Lebow Manhattan Half (race day)');
    expect(result.event.start.toISOString()).toBe('2027-01-24T12:00:00.000Z');
    expect(result.event.durationMinutes).toBe(240);
  });

  // A race day export is refused when the date has not been announced.
  it('refuses race day when the date is unannounced', () => {
    const tbd = { ...race, editions: [{ ...race.editions[0], raceDate: null }] };
    expect(raceCalendarEvent(tbd, 'raceday', NOW)).toEqual({ error: 'Race date not announced' });
  });

  // With no future milestone there is nothing to remind about.
  it('refuses when no registration date is upcoming', () => {
    const none = { ...race, editions: [{ ...race.editions[0], milestones: [] }] };
    expect(raceCalendarEvent(none, 'next', NOW)).toEqual({ error: 'No upcoming registration date' });
  });

  // A race whose editions are all past has nothing to export.
  it('refuses when there is no upcoming edition', () => {
    const past = { ...race, editions: [{ ...race.editions[0], raceDate: new Date('2026-01-25T12:00:00Z') }] };
    expect(raceCalendarEvent(past, 'next', NOW)).toEqual({ error: 'No upcoming edition' });
  });
});

describe('raceCalendarEvent for one milestone', () => {
  const withIds: CalendarRace = {
    ...race,
    editions: [
      {
        ...race.editions[0],
        milestones: [
          { id: 1, kind: 'price_increase', at: new Date('2026-10-01T16:00:00Z'), timeKnown: false, tentative: false },
          { id: 2, kind: 'price_increase', at: new Date('2026-11-09T17:00:00Z'), timeKnown: false, tentative: false, note: 'Rises to $65' },
          { id: 3, kind: 'charity_closes', at: new Date('2027-01-10T14:00:00Z'), timeKnown: true, tentative: false },
        ],
      },
    ],
  };

  // A date-only milestone becomes an all-day event on its ET date, with its note.
  it('exports a date-only milestone as all day', () => {
    const r = raceCalendarEvent(withIds, 2, NOW);
    if ('error' in r) throw new Error(r.error);
    expect(r.event.allDayDate).toBe('2026-11-09');
    expect(r.event.title).toBe('Fred Lebow Manhattan Half: Last day at the current price');
    expect(r.event.description).toContain('Mon, Nov 9 (time not stated) (Eastern Time).');
    expect(r.event.description).toContain('Rises to $65');
  });

  // A milestone with a stated time keeps that time.
  it('exports a timed milestone at its time', () => {
    const r = raceCalendarEvent(withIds, 3, NOW);
    if ('error' in r) throw new Error(r.error);
    expect(r.event.allDayDate).toBeUndefined();
    expect(r.event.start.toISOString()).toBe('2027-01-10T14:00:00.000Z');
  });

  // Unknown or already-passed milestones are refused.
  it('refuses missing or past milestones', () => {
    expect(raceCalendarEvent(withIds, 99, NOW)).toEqual({ error: 'Registration date not found' });
    expect(raceCalendarEvent(withIds, 1, NOW)).toEqual({ error: 'That registration date has passed' });
  });
});

describe('calendarFileName', () => {
  // Race day and single-milestone downloads get distinct file names.
  it('names next, race day and milestone files', () => {
    expect(calendarFileName('brooklyn-half', 'next')).toBe('brooklyn-half.ics');
    expect(calendarFileName('brooklyn-half', 'raceday')).toBe('brooklyn-half-raceday.ics');
    expect(calendarFileName('brooklyn-half', 4)).toBe('brooklyn-half-deadline-4.ics');
  });
});
