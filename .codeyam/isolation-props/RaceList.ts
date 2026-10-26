import type Component from "../../app/components/RaceList";
import type { ComponentProps } from "react";
import { NOW, defaultFilters, defaultResults, escarpment } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { races: defaultResults, filters: defaultFilters, now: NOW },
  WithUnannouncedRace: { races: [...defaultResults, escarpment], filters: { ...defaultFilters, distance: "any", when: "12m" }, now: NOW },
  Empty: { races: [], filters: { ...defaultFilters, distance: "marathon" }, now: NOW },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1200;
