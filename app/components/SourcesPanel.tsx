// Where the race's details come from, when they were checked, and a way to
// report something missing or wrong.
import { formatDay } from '@/app/lib/format';
import { sourceHost } from '@/app/lib/raceDetail';

export default function SourcesPanel({
  sourceUrl,
  lastVerifiedAt,
  reportHref,
}: {
  sourceUrl: string | null;
  lastVerifiedAt: string | null;
  reportHref: string;
}) {
  const host = sourceHost(sourceUrl);
  return (
    <section className="sources" aria-labelledby="sources">
      <h2 id="sources">Sources</h2>
      <p>
        {sourceUrl && host ? (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            {host}
          </a>
        ) : (
          'No official source on file yet.'
        )}
        {lastVerifiedAt && (
          <span className="sub">
            {' '}
            · last checked {formatDay(lastVerifiedAt)}, {new Date(lastVerifiedAt).getUTCFullYear()}
          </span>
        )}
      </p>
      <p className="sub">Anything we couldn’t confirm is left out. Confirm on the official site before you register.</p>
      <a className="report" href={reportHref} target="_blank" rel="noopener noreferrer">
        Report a missing or wrong detail ↗
      </a>
    </section>
  );
}
