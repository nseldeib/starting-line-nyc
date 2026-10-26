import { describe, expect, it } from 'vitest';
import {
  REPO_URL,
  buildTimeline,
  entryMethod,
  nextDeadline,
  officialLink,
  pageUrlFrom,
  reportIssueUrl,
  sourceHost,
  timelineCalendarHref,
} from '@/app/lib/raceDetail';

const NOW = new Date('2026-10-26T20:00:00Z');
const m = (id: number, kind: string, at: string, timeKnown = true, note: string | null = null) => ({
  id,
  kind,
  at: new Date(at),
  timeKnown,
  tentative: false,
  note,
});

describe('buildTimeline', () => {
  // Milestones come out in date order with race day appended last.
  it('sorts milestones by date and appends race day', () => {
    const t = buildTimeline(
      [m(2, 'registration_closes', '2026-12-12T17:00:00Z', false), m(1, 'price_increase', '2026-11-09T17:00:00Z', false)],
      new Date('2026-12-13T13:00:00Z'),
      false,
      NOW,
    );
    expect(t.map((e) => e.kind)).toEqual(['price_increase', 'registration_closes', 'race_day']);
    expect(t[2]).toMatchObject({ id: null, timeKnown: true });
  });

  // Passed dates are past, the first remaining one is next, the rest upcoming.
  it('marks past, next and upcoming', () => {
    const t = buildTimeline(
      [m(1, 'price_increase', '2026-10-01T17:00:00Z'), m(2, 'price_increase', '2026-11-09T17:00:00Z'), m(3, 'registration_closes', '2026-12-12T17:00:00Z')],
      null,
      false,
      NOW,
    );
    expect(t.map((e) => e.state)).toEqual(['past', 'next', 'upcoming']);
  });

  // A date-only deadline on today's date is still next until the ET day ends.
  it('keeps a date-only deadline for today as next', () => {
    const t = buildTimeline([m(1, 'price_increase', '2026-10-26T16:00:00Z', false)], null, false, NOW);
    expect(t[0].state).toBe('next');
  });

  // With no race date and no milestones the timeline is empty.
  it('is empty when nothing is announced', () => {
    expect(buildTimeline([], null, false, NOW)).toEqual([]);
  });
});

describe('nextDeadline', () => {
  // The first non-past registration date is the next deadline; race day never is.
  it('skips past entries and race day', () => {
    const t = buildTimeline(
      [m(1, 'price_increase', '2026-10-01T17:00:00Z'), m(2, 'charity_closes', '2027-03-30T13:00:00Z')],
      new Date('2027-04-03T13:00:00Z'),
      false,
      NOW,
    );
    expect(nextDeadline(t)?.kind).toBe('charity_closes');
    expect(nextDeadline(buildTimeline([], new Date('2027-04-03T13:00:00Z'), false, NOW))).toBeNull();
  });
});

describe('timelineCalendarHref', () => {
  // Race day and milestones link to their own calendar downloads.
  it('builds race day and milestone links', () => {
    const [ms, rd] = buildTimeline([m(7, 'price_increase', '2026-11-09T17:00:00Z')], new Date('2026-12-13T13:00:00Z'), false, NOW);
    expect(timelineCalendarHref('/api/races/x/calendar', ms)).toBe('/api/races/x/calendar?milestone=7');
    expect(timelineCalendarHref('/api/races/x/calendar', rd)).toBe('/api/races/x/calendar?event=raceday');
  });
});

describe('entryMethod', () => {
  // Known methods get a plain-language title and explanation.
  it('explains known entry methods', () => {
    expect(entryMethod('qualification').title).toBe('Qualifying standard');
    expect(entryMethod('lottery').explain).toMatch(/drawn at random/);
  });

  // An unknown method is shown as-is rather than hidden.
  it('falls back to the raw method', () => {
    expect(entryMethod('invite')).toEqual({ title: 'invite', explain: '' });
  });
});

describe('officialLink', () => {
  // The registration page wins and is labelled Register.
  it('prefers the registration link', () => {
    expect(officialLink({ registrationUrl: 'https://r', sourceUrl: 'https://s' }, 'https://o')).toEqual({
      href: 'https://r',
      label: 'Register on the official site',
    });
  });

  // Without one it falls back to the source, then the organizer, labelled Visit.
  it('falls back to the source then the organizer', () => {
    expect(officialLink({ registrationUrl: null, sourceUrl: 'https://s' }, 'https://o')?.href).toBe('https://s');
    expect(officialLink({ registrationUrl: null, sourceUrl: null }, 'https://o')).toEqual({
      href: 'https://o',
      label: 'Visit the official site',
    });
    expect(officialLink({ registrationUrl: null, sourceUrl: null }, null)).toBeNull();
  });
});

describe('sourceHost', () => {
  // The host is shown without www.
  it('strips www and handles missing or bad URLs', () => {
    expect(sourceHost('https://www.sassquadtrailrunning.com/bigbearsquatchnorth')).toBe('sassquadtrailrunning.com');
    expect(sourceHost(null)).toBeNull();
    expect(sourceHost('not a url')).toBeNull();
  });
});

describe('pageUrlFrom', () => {
  // Forwarded headers from the Codespaces proxy are respected.
  it('uses forwarded host and protocol', () => {
    const h = new Map([['x-forwarded-host', 'app.example.dev'], ['x-forwarded-proto', 'https']]);
    expect(pageUrlFrom({ get: (k) => h.get(k) ?? null }, 'escarpment-trail-run')).toBe('https://app.example.dev/races/escarpment-trail-run');
  });

  // Plain localhost requests become http URLs.
  it('defaults to http on localhost', () => {
    const h = new Map([['host', 'localhost:3000']]);
    expect(pageUrlFrom({ get: (k) => h.get(k) ?? null }, 'x')).toBe('http://localhost:3000/races/x');
  });
});

describe('reportIssueUrl', () => {
  // The issue is pre-filled with the race, edition, page link and a label.
  it('pre-fills a GitHub issue', () => {
    const url = new URL(reportIssueUrl({ name: 'Great Gobble 5K' }, 2026, 'https://site/races/g'));
    expect(url.origin + url.pathname).toBe(`${REPO_URL}/issues/new`);
    expect(url.searchParams.get('title')).toBe('Race detail: Great Gobble 5K (2026)');
    expect(url.searchParams.get('body')).toContain('https://site/races/g');
    expect(url.searchParams.get('labels')).toBe('race-data');
  });
});
