import EmptyResults from '@/app/components/EmptyResults';
import RaceRow from '@/app/components/RaceRow';
import ShowAllLink from '@/app/components/ShowAllLink';
import { DEFAULT_FILTERS, DISTANCES, filterHref, type RaceFilters } from '@/app/lib/filters';
import { isUrgent, type RaceListItem } from '@/app/lib/raceList';

export default function RaceList({ races, filters, now }: { races: RaceListItem[]; filters: RaceFilters; now: Date }) {
  if (races.length === 0) {
    return <EmptyResults showAllHref={filterHref(DEFAULT_FILTERS, { distance: 'any', when: 'any' })} />;
  }
  return (
    <>
      {races.map((race) => (
        <RaceRow key={race.slug} race={race} urgent={isUrgent(race.nextMilestone?.at, now)} />
      ))}
      {filters.when !== 'any' && (
        <ShowAllLink
          href={filterHref(filters, { when: 'any', status: [] })}
          label={`Show all ${DISTANCES[filters.distance].plural.toLowerCase()}`}
        />
      )}
    </>
  );
}
