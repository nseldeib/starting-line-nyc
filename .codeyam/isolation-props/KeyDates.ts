import type Component from "../../app/components/KeyDates";
import type { ComponentProps } from "react";
import { bigBearTimeline, centralParkTimelineDec10, escarpmentTimeline } from "./_raceDetail";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Upcoming: { year: 2027, timeline: bigBearTimeline, calendarBase: "/api/races/big-bear-squatch-north-half/calendar" },
  SomePassed: { year: 2027, timeline: centralParkTimelineDec10, calendarBase: "/api/races/nycruns-central-park-half-marathon/calendar" },
  NothingAnnounced: { year: 2027, timeline: [], calendarBase: "/api/races/escarpment-trail-run/calendar" },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 660;
