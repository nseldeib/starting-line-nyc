// "Add to calendar" menu: Google Calendar first, then the .ics download for
// Apple Calendar and Outlook. Both come from the same calendar route, so the
// event details always match. A <details> disclosure, so no client JS.
import { googleCalendarHref } from '@/app/lib/raceCalendar';

export default function AddToCalendar({ href }: { href: string }) {
  return (
    <details className="addcal">
      <summary className="cal">Add to calendar</summary>
      <div className="addcal-menu">
        <a href={googleCalendarHref(href)} target="_blank" rel="noopener noreferrer">
          Google Calendar
        </a>
        <a href={href} download>
          Apple / Outlook (.ics)
        </a>
      </div>
    </details>
  );
}
