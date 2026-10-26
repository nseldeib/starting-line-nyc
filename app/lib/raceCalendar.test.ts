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
        { kind: 'registration_closes', at: new Date('2027-01-10T04:59:00Z'), tentative: false },
        { kind: 'registration_opens', at: new Date('2026-11-10T17:00:00Z'), tentative: false },
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

describe('calendarFileName', () => {
  // Race day downloads get a distinct file name.
  it('names next and race day files', () => {
    expect(calendarFileName('brooklyn-half', 'next')).toBe('brooklyn-half.ics');
    expect(calendarFileName('brooklyn-half', 'raceday')).toBe('brooklyn-half-raceday.ics');
  });
});
