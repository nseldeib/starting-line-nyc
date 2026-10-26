// How entry works for this race, in plain words, with the price detail.
import { formatPrice } from '@/app/lib/format';

export default function HowToEnter({
  title,
  explain,
  entryNote,
  priceCents,
  priceNote,
  raceDayCalendarHref,
}: {
  title: string;
  explain: string;
  entryNote: string | null;
  priceCents: number | null;
  priceNote: string | null;
  raceDayCalendarHref: string | null;
}) {
  return (
    <section className="enter" aria-labelledby="how-to-enter">
      <h2 id="how-to-enter">How to enter</h2>
      <p className="method">
        <b>{title}.</b> {explain}
      </p>
      {entryNote && <p className="note">{entryNote}</p>}
      <p className="price-line">
        <span className="label">Price</span>
        {priceCents !== null ? (
          <>
            <b>{formatPrice(priceCents)}</b> {priceNote}
          </>
        ) : (
          'Not listed by the organizer yet. Check the official site.'
        )}
      </p>
      {raceDayCalendarHref && (
        <a className="btn btn-sm" href={raceDayCalendarHref} download>
          Add race day to calendar
        </a>
      )}
    </section>
  );
}
