// Saving needs an account, which isn't live yet — this points at the
// season teaser that explains so, rather than pretending to save.
export default function SaveRaceButton({ raceName }: { raceName: string }) {
  return (
    <div>
      <a className="btn btn-sm" href="#season" aria-label={`Save ${raceName}`}>Save</a>
    </div>
  );
}
