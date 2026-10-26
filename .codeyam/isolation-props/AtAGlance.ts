import type Component from "../../app/components/AtAGlance";
import type { ComponentProps } from "react";
import { bigBearTimeline, centralParkTimelineDec10, escarpmentTimeline } from "./_raceDetail";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Open: { raceDate: "2027-04-03T13:00:00.000Z", distanceMiles: 13.1, elevationGainFt: 2600, entryTitle: "Open registration", status: "open", priceCents: 7520, nextDeadline: bigBearTimeline[0], weeksToTrain: 22, official: { href: "https://runsignup.com/Race/NY/BearMountain/BigBearSquaTChNorth", label: "Register on the official site" } },
  QualifierNotOpen: { raceDate: "2027-07-25T13:00:00.000Z", distanceMiles: 18.6, elevationGainFt: 4800, entryTitle: "Qualifying standard", status: "not_announced", priceCents: null, nextDeadline: escarpmentTimeline[0], weeksToTrain: 38, official: { href: "https://escarpmenttrail.com/", label: "Visit the official site" } },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 1150;
