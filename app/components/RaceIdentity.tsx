import { formatDistance } from '@/app/lib/format';

export default function RaceIdentity({
  name,
  terrain,
  distanceMiles,
  elevationGainFt,
  organizer,
}: {
  name: string;
  terrain: string;
  distanceMiles: number;
  elevationGainFt: number | null;
  organizer: string;
}) {
  return (
    <div>
      <div className="name">{name}</div>
      <div className="meta">
        <span className="type">{terrain === 'trail' ? 'Trail' : 'Road'}</span>
        <span>{formatDistance(distanceMiles, elevationGainFt)}</span>
        <span className="org">{organizer}</span>
      </div>
    </div>
  );
}
