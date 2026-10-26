// The way to actually enter: the organizer's registration page, or their
// site when no registration link is listed.
export default function OfficialLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a className="btn btn-ink" href={href} target="_blank" rel="noopener noreferrer">
      {label} ↗
    </a>
  );
}
