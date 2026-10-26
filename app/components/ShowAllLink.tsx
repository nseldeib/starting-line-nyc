export default function ShowAllLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="seeall">
      <a className="btn" href={href}>{label}</a>
    </div>
  );
}
