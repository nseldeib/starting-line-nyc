// Downloadable calendar event (.ics) for a race's next registration
// milestone, or its race day with ?event=raceday.
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { buildIcs } from '@/app/lib/ics';
import { calendarFileName, raceCalendarEvent } from '@/app/lib/raceCalendar';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kind = new URL(request.url).searchParams.get('event') === 'raceday' ? 'raceday' : 'next';

  const race = await prisma.race.findUnique({ where: { slug }, include: { editions: { include: { milestones: true } } } });
  if (!race) return NextResponse.json({ error: 'Race not found' }, { status: 404 });

  const result = raceCalendarEvent(race, kind, new Date());
  if ('error' in result) return NextResponse.json({ error: result.error }, { status: 404 });

  return new NextResponse(buildIcs(result.event), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${calendarFileName(race.slug, kind)}"`,
    },
  });
}
