// Registration status and the next dated milestone in ET. Deadlines within
// three weeks are highlighted and offer a downloadable calendar event.
import { LIVE_STATUSES, STATUS_LABELS, formatDay, formatTime, milestoneVerb } from '@/app/lib/format';

export default function NextDeadline({
  status,
  milestone,
  urgent,
  calendarHref,
}: {
  status: string;
  milestone: { kind: string; at: string; tentative: boolean } | null;
  urgent: boolean;
  calendarHref: string;
}) {
  return (
    <div className={urgent ? 'next urgent' : 'next'}>
      <span className={LIVE_STATUSES.has(status) ? 'state live' : 'state'}>{STATUS_LABELS[status] ?? status}</span>
      {milestone ? (
        <div className={urgent ? 'v' : 'v quiet'}>
          {milestoneVerb(milestone.kind)} {formatDay(milestone.at)}, <span className="nw">{formatTime(milestone.at)}</span>
          {milestone.tentative && <span className="sub"> (tentative)</span>}
        </div>
      ) : (
        <div className="v quiet">Registration date to come</div>
      )}
      {urgent && (
        <a className="cal" href={calendarHref} download>
          Add to calendar
        </a>
      )}
    </div>
  );
}
