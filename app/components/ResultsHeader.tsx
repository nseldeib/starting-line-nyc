import { raceCountLabel } from '@/app/lib/filters';

export default function ResultsHeader({ heading, count }: { heading: string; count: number }) {
  return (
    <div className="res-h">
      <h2 id="r">{heading}</h2>
      <span className="count">{raceCountLabel(count)}</span>
    </div>
  );
}
