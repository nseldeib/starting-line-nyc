// Display helpers. Every user-facing time is shown in America/New_York.
const TZ = 'America/New_York';

export const MILESTONE_LABELS: Record<string, string> = {
  registration_opens: 'Registration opens',
  registration_closes: 'Registration closes',
  lottery_opens: 'Lottery opens',
  lottery_closes: 'Lottery closes',
  lottery_draw: 'Lottery drawing',
  qualification_deadline: 'Qualifying deadline',
};

const MILESTONE_VERBS: Record<string, string> = {
  registration_opens: 'Opens',
  registration_closes: 'Closes',
  lottery_opens: 'Opens',
  lottery_closes: 'Closes',
  lottery_draw: 'Drawing',
  qualification_deadline: 'Qualify by',
};

export const STATUS_LABELS: Record<string, string> = {
  opening_soon: 'Opening soon',
  open: 'Open',
  lottery_open: 'Lottery open',
  waitlist: 'Waitlist',
  sold_out: 'Sold out',
  closed: 'Closed',
  not_announced: 'Not announced',
};

export const LIVE_STATUSES = new Set(['opening_soon', 'open', 'lottery_open', 'waitlist']);

export function formatDay(iso: string | Date): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric' }).format(
    new Date(iso),
  );
}

export function formatTime(iso: string | Date): string {
  const t = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
    .format(new Date(iso))
    .replace(' AM', ' am')
    .replace(' PM', ' pm');
  return `${t} ET`;
}

export function formatEt(iso: string | Date): string {
  return `${formatDay(iso)}, ${formatTime(iso)}`;
}

export function milestoneVerb(kind: string): string {
  return MILESTONE_VERBS[kind] ?? MILESTONE_LABELS[kind] ?? kind;
}

export function formatDistance(miles: number, elevationGainFt: number | null): string {
  const d = `${Number.isInteger(miles) ? miles : miles.toFixed(1)} mi`;
  return elevationGainFt ? `${d}, ${elevationGainFt.toLocaleString('en-US')} ft climb` : d;
}
