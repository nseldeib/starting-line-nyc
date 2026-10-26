export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="crumb">
      <a href={href}>← {label}</a>
    </p>
  );
}
