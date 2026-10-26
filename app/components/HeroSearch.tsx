// The single race search. A plain GET form, so it works without JavaScript;
// chip and sort choices ride along as hidden fields.
import SelectField from '@/app/components/SelectField';
import { DEFAULT_FILTERS, DISTANCES, TERRAINS, WINDOWS, raceCountLabel, type RaceFilters } from '@/app/lib/filters';

const options = (record: Record<string, string | { label: string }>) =>
  Object.entries(record).map(([value, v]) => ({ value, label: typeof v === 'string' ? v : v.label }));

export default function HeroSearch({ filters, count }: { filters: RaceFilters; count: number }) {
  return (
    <form className="finder" role="search" aria-label="Find races" action="/" method="get">
      <div>
        <label className="label" htmlFor="q">Race, park or organizer</label>
        <input id="q" name="q" type="search" placeholder="e.g. Brooklyn Half" defaultValue={filters.q} />
      </div>
      <SelectField id="distance" label="Distance" value={filters.distance} options={options(DISTANCES)} />
      <SelectField id="when" label="When" value={filters.when} options={options(WINDOWS)} />
      <SelectField id="terrain" label="Terrain" value={filters.terrain} options={options(TERRAINS)} />
      {filters.status.length > 0 && <input type="hidden" name="status" value={filters.status.join(',')} />}
      {filters.sort !== DEFAULT_FILTERS.sort && <input type="hidden" name="sort" value={filters.sort} />}
      <div className="go">
        <button className="btn btn-ink" type="submit">Show {raceCountLabel(count)}</button>
      </div>
    </form>
  );
}
