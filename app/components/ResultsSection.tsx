// The results column: heading, filters, timezone note, race list, then the
// saved-races teaser.
import FilterToolbar from '@/app/components/FilterToolbar';
import RaceList from '@/app/components/RaceList';
import ResultsHeader from '@/app/components/ResultsHeader';
import SeasonTeaser from '@/app/components/SeasonTeaser';
import TimezoneNote from '@/app/components/TimezoneNote';
import { resultsHeading, type RaceFilters } from '@/app/lib/filters';
import type { RaceListItem } from '@/app/lib/raceList';

export default function ResultsSection({ races, filters, now }: { races: RaceListItem[]; filters: RaceFilters; now: Date }) {
  return (
    <main className="results" aria-labelledby="r">
      <ResultsHeader heading={resultsHeading(filters)} count={races.length} />
      <FilterToolbar filters={filters} />
      <TimezoneNote />
      <RaceList races={races} filters={filters} now={now} />
      <SeasonTeaser />
    </main>
  );
}
