import { formatDay } from '@/app/lib/format';

export default function RaceDayCell({
  raceDate,
  tentative,
  locationName,
}: {
  raceDate: string | null;
  tentative: boolean;
  locationName: string;
}) {
  return (
    <div className="c-day">
      <span className="label">Race day</span>
      <span className="v">
        {raceDate ? formatDay(raceDate) : 'Date to come'}
        {raceDate && tentative && <span className="sub"> (tentative)</span>}
      </span>
      <div className="sub">{locationName}</div>
    </div>
  );
}
