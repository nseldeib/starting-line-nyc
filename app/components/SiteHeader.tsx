import Logo from '@/app/components/Logo';

export default function SiteHeader({ deadlinesHref }: { deadlinesHref: string }) {
  return (
    <header className="bar">
      <a className="brand" href="/" aria-label="Starting Line home">
        <Logo />
        <b>Starting Line</b>
      </a>
      <nav aria-label="Main">
        <a className="on" href="/">Races</a>
        <a href={deadlinesHref}>Deadlines</a>
        <a href="#how-entry-works">How entry works</a>
      </nav>
      <div className="right">
        <a href="#season">Log in</a>
        <a className="btn btn-ink btn-sm" href="#season">Sign up free</a>
      </div>
    </header>
  );
}
