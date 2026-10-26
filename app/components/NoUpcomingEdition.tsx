export default function NoUpcomingEdition({ organizerUrl }: { organizerUrl: string | null }) {
  return (
    <section className="empty">
      <h2>No upcoming race date is listed yet.</h2>
      <p>The organizer hasn’t published the next edition. Check their site for news.</p>
      {organizerUrl && (
        <a className="btn" href={organizerUrl} target="_blank" rel="noopener noreferrer">
          Visit the organizer ↗
        </a>
      )}
    </section>
  );
}
