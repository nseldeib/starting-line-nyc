import NextDeadline from '@/app/components/NextDeadline';
import RaceDayCell from '@/app/components/RaceDayCell';
import RaceIdentity from '@/app/components/RaceIdentity';
import RaceThumb from '@/app/components/RaceThumb';
import SaveRaceButton from '@/app/components/SaveRaceButton';
import WeeksToTrain from '@/app/components/WeeksToTrain';
import type { RaceListItem } from '@/app/lib/raceList';

export default function RaceRow({ race, urgent }: { race: RaceListItem; urgent: boolean }) {
  return (
    <div className="row">
      <RaceThumb photoUrl={race.photoUrl} photoAlt={race.photoAlt} distanceMiles={race.distanceMiles} />
      <RaceIdentity
        name={race.name}
        terrain={race.terrain}
        distanceMiles={race.distanceMiles}
        elevationGainFt={race.elevationGainFt}
        organizer={race.organizer}
        href={`/races/${race.slug}`}
      />
      <RaceDayCell raceDate={race.raceDate} tentative={race.raceDateTentative} locationName={race.locationName} />
      <NextDeadline
        status={race.registrationStatus}
        milestone={race.nextMilestone}
        urgent={urgent}
        calendarHref={`/api/races/${race.slug}/calendar`}
      />
      <WeeksToTrain weeks={race.weeksToTrain} />
      <SaveRaceButton raceName={race.name} />
    </div>
  );
}
