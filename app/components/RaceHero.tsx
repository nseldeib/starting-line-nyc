// Full-width header: a licensed photo of the race's place (or a plain ink
// band when there is none) with the race title over it.
export default function RaceHero({
  photoUrl,
  photoAlt,
  photoCredit,
  children,
}: {
  photoUrl: string | null;
  photoAlt: string | null;
  photoCredit: string | null;
  children: React.ReactNode;
}) {
  return (
    <section
      className={photoUrl ? 'race-hero' : 'race-hero plain'}
      aria-labelledby="race-name"
      style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
    >
      {photoUrl && <span className="sr">{photoAlt}</span>}
      {photoCredit && <p className="credit">Photo: {photoCredit}</p>}
      <div className="race-hero-in">{children}</div>
    </section>
  );
}
