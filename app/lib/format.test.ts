import { describe, expect, it } from 'vitest';
import { formatDay, formatDistance, formatEt, formatTime, milestoneVerb } from '@/app/lib/format';

describe('formatDay', () => {
  // Days are shown in New York time, which can differ from the UTC date.
  it('formats in Eastern Time even across a UTC date boundary', () => {
    expect(formatDay('2027-02-01T04:59:00Z')).toBe('Sun, Jan 31');
    expect(formatDay(new Date('2027-01-24T12:00:00Z'))).toBe('Sun, Jan 24');
  });
});

describe('formatTime', () => {
  // Standard time in November: 17:00 UTC is noon ET.
  it('formats standard time with a lowercase meridiem and ET', () => {
    expect(formatTime('2026-11-10T17:00:00Z')).toBe('12:00 pm ET');
  });

  // Daylight time in April: 03:59 UTC is 11:59 pm the previous evening.
  it('handles daylight saving time', () => {
    expect(formatTime('2027-04-03T03:59:00Z')).toBe('11:59 pm ET');
  });
});

describe('formatEt', () => {
  // Day and time combine into one line.
  it('joins day and time', () => {
    expect(formatEt('2026-11-18T04:59:00Z')).toBe('Tue, Nov 17, 11:59 pm ET');
  });
});

describe('milestoneVerb', () => {
  // Each milestone kind reads as a short verb in the deadline column.
  it('maps known kinds to verbs', () => {
    expect(milestoneVerb('registration_opens')).toBe('Opens');
    expect(milestoneVerb('lottery_closes')).toBe('Closes');
    expect(milestoneVerb('qualification_deadline')).toBe('Qualify by');
  });

  // An unknown kind is shown as-is rather than hidden.
  it('falls back to the raw kind', () => {
    expect(milestoneVerb('something_new')).toBe('something_new');
  });
});

describe('formatDistance', () => {
  // Distances keep one decimal, whole numbers stay whole.
  it('formats miles', () => {
    expect(formatDistance(13.1, null)).toBe('13.1 mi');
    expect(formatDistance(5, null)).toBe('5 mi');
  });

  // Elevation gain is appended with a thousands separator.
  it('appends elevation gain', () => {
    expect(formatDistance(13.1, 3100)).toBe('13.1 mi, 3,100 ft climb');
  });
});
