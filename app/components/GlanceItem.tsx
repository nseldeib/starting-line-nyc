// One labelled fact in the race page's at-a-glance strip.
export default function GlanceItem({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string | null;
  emphasis?: boolean;
}) {
  return (
    <div className={emphasis ? 'glance-item emphasis' : 'glance-item'}>
      <dt>{label}</dt>
      <dd>
        <span className="v">{value}</span>
        {sub && <span className="sub">{sub}</span>}
      </dd>
    </div>
  );
}
