import FilterChips from '@/app/components/FilterChips';
import SortToggle from '@/app/components/SortToggle';
import type { RaceFilters } from '@/app/lib/filters';

export default function FilterToolbar({ filters }: { filters: RaceFilters }) {
  return (
    <div className="toolbar">
      <FilterChips filters={filters} />
      <SortToggle filters={filters} />
    </div>
  );
}
