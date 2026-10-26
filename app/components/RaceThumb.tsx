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
    // eslint-disable-next-line @next/next/no-img-element -- local licensed photo, fixed thumb size
    return <img className="thumb" src={photoUrl} alt={photoAlt ?? ''} />;
  }
  return (
    <div className="thumb" aria-hidden="true">
      {Number.isInteger(distanceMiles) ? distanceMiles : distanceMiles.toFixed(1)}
    </div>
  );
}
