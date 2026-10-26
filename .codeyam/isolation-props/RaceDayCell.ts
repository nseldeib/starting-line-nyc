import type Component from "../../app/components/RaceDayCell";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Confirmed: { raceDate: "2027-01-24T12:00:00.000Z", tentative: false, locationName: "Central Park" },
  Tentative: { raceDate: "2027-05-15T11:00:00.000Z", tentative: true, locationName: "Prospect Park to Coney Island" },
  DateToCome: { raceDate: null, tentative: false, locationName: "Harriman State Park" },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 195;
