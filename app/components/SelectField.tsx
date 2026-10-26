// A labelled dropdown cell in the hero search bar.
export default function SelectField({
  id,
  label,
  value,
  options,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <span className="caret">
        <select id={id} name={id} defaultValue={value}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </span>
    </div>
  );
}
