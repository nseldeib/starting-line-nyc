import SeasonPreview from '@/app/components/SeasonPreview';

// Accounts aren't live yet; the copy says so instead of implying a sign-up works.
export default function SeasonTeaser() {
  return (
    <section className="helps" id="season" aria-labelledby="hw">
      <div>
        <h2 id="hw">Save races to see your season.</h2>
        <p>
          With a free account, saved races line up on one timeline: training blocks, registration deadlines and race
          days.
        </p>
        <a className="btn btn-ink" href="#season" aria-disabled="true" title="Accounts are coming soon">
          Sign up free
        </a>
        <p className="sub">Accounts aren’t live yet. This is a preview of what saved races will look like.</p>
      </div>
      <SeasonPreview />
    </section>
  );
}
