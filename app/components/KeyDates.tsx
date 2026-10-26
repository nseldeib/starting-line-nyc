import TimelineItem from '@/app/components/TimelineItem';
import { timelineCalendarHref, type TimelineEntry } from '@/app/lib/raceDetail';

export default function KeyDates({
  year,
  timeline,
  calendarBase,
}: {
  year: number;
  timeline: TimelineEntry[];
  calendarBase: string;
}) {
  return (
    <section className="timeline" aria-labelledby="dates">
      <h2 id="dates">Key dates</h2>
      <p className="tz">
        For the {year} race only. All times in Eastern Time (ET).
      </p>
      <ol>
        {timeline.map((t) => (
          <TimelineItem key={`${t.kind}-${t.at}`} entry={t} calendarHref={timelineCalendarHref(calendarBase, t)} />
        ))}
        {timeline.length === 0 && <li className="tl upcoming">No registration dates announced yet.</li>}
      </ol>
    </section>
  );
}
