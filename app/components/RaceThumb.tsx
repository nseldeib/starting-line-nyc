// A licensed race photo, or the distance as a tile when there is none.
// Never an invented image or course map.
export default function RaceThumb({
  photoUrl,
  photoAlt,
  distanceMiles,
}: {
  photoUrl: string | null;
  photoAlt: string | null;
  distanceMiles: number;
}) {
  if (photoUrl) {
    return <div className="thumb" style={{ backgroundImage: `url('${photoUrl}')` }} role="img" aria-label={photoAlt ?? ''} />;
  }
  return (
    <div className="thumb" aria-hidden="true">
      {Number.isInteger(distanceMiles) ? distanceMiles : distanceMiles.toFixed(1)}
    </div>
  );
}
