// Shared sample data for isolated component scenarios. Mirrors the clearly
// labelled sample races in prisma/sample-data.json, as seen on 2026-10-26.
import type { RaceFilters } from "../../app/lib/filters";
import type { RaceListItem } from "../../app/lib/raceList";

export const NOW = new Date("2026-10-26T14:00:00Z");

export const defaultFilters: RaceFilters = { q: "", distance: "half", when: "6m", terrain: "any", status: [], sort: "deadline" };

const base = { elevationGainFt: null, photoUrl: null, photoAlt: null, raceDateTentative: false, entryMethod: "open", isSample: true };

export const manhattanHalf: RaceListItem = {
  ...base, slug: "fred-lebow-manhattan-half", name: "Fred Lebow Manhattan Half", terrain: "road", distanceMiles: 13.1,
  locationName: "Central Park", organizer: "NYRR", photoUrl: "/images/central-park-drive.jpg", photoAlt: "Runners on the Central Park drive",
  raceDate: "2027-01-24T12:00:00.000Z", registrationStatus: "opening_soon",
  nextMilestone: { kind: "registration_opens", at: "2026-11-10T17:00:00.000Z", tentative: false }, weeksToTrain: 12,
};
export const nycHalf: RaceListItem = {
  ...base, slug: "united-airlines-nyc-half", name: "United Airlines NYC Half", terrain: "road", distanceMiles: 13.1,
  locationName: "Brooklyn to Times Square", organizer: "NYRR", photoUrl: "/images/nyc-half-manhattan.jpg", photoAlt: "NYC Half runners on a Manhattan avenue",
  raceDate: "2027-03-21T11:00:00.000Z", registrationStatus: "lottery_open", entryMethod: "lottery",
  nextMilestone: { kind: "lottery_closes", at: "2026-11-18T04:59:00.000Z", tentative: false }, weeksToTrain: 20,
};
export const greenbeltHalf: RaceListItem = {
  ...base, slug: "greenbelt-trail-half", name: "Greenbelt Trail Half", terrain: "trail", distanceMiles: 13.1,
  locationName: "Staten Island Greenbelt", organizer: "Staten Island Trail Runners",
  raceDate: "2027-02-07T13:00:00.000Z", registrationStatus: "open",
  nextMilestone: { kind: "registration_closes", at: "2027-02-01T04:59:00.000Z", tentative: false }, weeksToTrain: 14,
};
export const breakneckHalf: RaceListItem = {
  ...base, slug: "breakneck-point-trail-half", name: "Breakneck Point Trail Half", terrain: "trail", distanceMiles: 13.1, elevationGainFt: 3100,
  locationName: "Beacon, NY", organizer: "Hudson Valley Trail Co.", photoUrl: "/images/breakneck-ridge.jpg", photoAlt: "The Hudson Highlands seen from Breakneck Ridge",
  raceDate: "2027-04-10T11:00:00.000Z", registrationStatus: "open",
  nextMilestone: { kind: "registration_closes", at: "2027-04-03T03:59:00.000Z", tentative: false }, weeksToTrain: 23,
};
export const brooklynHalf: RaceListItem = {
  ...base, slug: "brooklyn-half", name: "Brooklyn Half", terrain: "road", distanceMiles: 13.1,
  locationName: "Prospect Park to Coney Island", organizer: "NYRR", photoUrl: "/images/prospect-park-drive.jpg", photoAlt: "Runners on the Prospect Park drive",
  raceDate: "2027-05-15T11:00:00.000Z", raceDateTentative: true, registrationStatus: "not_announced",
  nextMilestone: null, weeksToTrain: 28,
};

export const defaultResults: RaceListItem[] = [manhattanHalf, nycHalf, greenbeltHalf, breakneckHalf];
