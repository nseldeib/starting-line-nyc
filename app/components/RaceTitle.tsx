// The race name with its terrain, organizer and place underneath.
export default function RaceTitle({
  name,
  terrain,
  organizer,
  place,
}: {
  name: string;
  terrain: string;
  organizer: string;
  place: string;
}) {
  return (
    <div className="race-title">
      <span className="type">{terrain === 'trail' ? 'Trail' : 'Road'}</span>
      <h1 id="race-name">{name}</h1>
      <p>
        {organizer} <span aria-hidden="true">·</span> {place}
      </p>
    </div>
  );
}
