import { describe, expect, it } from 'vitest';
import { buildIcs, icsDate, icsEscape } from '@/app/lib/ics';

describe('icsDate', () => {
  // Dates are written as compact UTC timestamps without milliseconds.
  it('formats as basic UTC', () => {
    expect(icsDate(new Date('2026-11-10T17:00:00.123Z'))).toBe('20261110T170000Z');
  });
});

describe('icsEscape', () => {
  // Commas, semicolons, backslashes and newlines are escaped per the spec.
  it('escapes special characters and newlines', () => {
    expect(icsEscape('a,b;c\\d\ne\r\nf')).toBe('a\\,b\\;c\\\\d\\ne\\nf');
  });

  // Plain text passes through unchanged.
  it('leaves plain text alone', () => {
    expect(icsEscape('Central Park')).toBe('Central Park');
  });
});

describe('buildIcs', () => {
  const event = {
    uid: 'manhattan-half-2027-next@startingline',
    title: 'Manhattan Half: Registration opens',
    start: new Date('2026-11-10T17:00:00Z'),
    durationMinutes: 30,
    location: 'Central Park',
    description: 'Tue, Nov 10, 12:00 pm ET.',
    stamp: new Date('2026-10-26T14:00:00Z'),
  };

  // The event starts and ends at the right UTC times, with CRLF line endings.
  it('writes a single event with start, end and CRLF endings', () => {
    const ics = buildIcs(event);
    expect(ics.startsWith('BEGIN:VCALENDAR\r\nVERSION:2.0\r\n')).toBe(true);
    expect(ics).toContain('DTSTART:20261110T170000Z\r\n');
    expect(ics).toContain('DTEND:20261110T173000Z\r\n');
    expect(ics).toContain('UID:manhattan-half-2027-next@startingline\r\n');
    expect(ics.endsWith('END:VEVENT\r\nEND:VCALENDAR\r\n')).toBe(true);
  });

  // Text fields are escaped so commas in descriptions do not break parsing.
  it('escapes text fields', () => {
    expect(buildIcs(event)).toContain('DESCRIPTION:Tue\\, Nov 10\\, 12:00 pm ET.\r\n');
  });

  // Location and description lines are omitted when not provided.
  it('omits optional fields when absent', () => {
    const ics = buildIcs({ ...event, location: undefined, description: undefined });
    expect(ics).not.toContain('LOCATION:');
    expect(ics).not.toContain('DESCRIPTION:');
  });
});
