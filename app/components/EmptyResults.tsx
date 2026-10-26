export default function EmptyResults({ showAllHref }: { showAllHref: string }) {
  return (
    <div className="empty">
      <h2>No races match these filters.</h2>
      <p>Try a longer time window or another distance. We only list races with an official source.</p>
      <a className="btn" href={showAllHref}>Show all races</a>
    </div>
  );
}
