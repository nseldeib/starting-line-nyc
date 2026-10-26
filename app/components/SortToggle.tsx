import { filterHref, type RaceFilters, type SortKey } from '@/app/lib/filters';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'deadline', label: 'Next deadline' },
  { key: 'raceday', label: 'Race day' },
];

export default function SortToggle({ filters }: { filters: RaceFilters }) {
  return (
    <div className="sort">
      Sort
      <span className="seg">
        {SORTS.map((s) => (
          <a key={s.key} className={filters.sort === s.key ? 'on' : undefined} href={filterHref(filters, { sort: s.key })}>
            {s.label}
          </a>
        ))}
      </span>
    </div>
  );
}
