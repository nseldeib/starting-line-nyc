import type Component from "../../app/components/SortToggle";
import type { ComponentProps } from "react";
import { NOW, defaultFilters, defaultResults, manhattanHalf, nycHalf, greenbeltHalf, breakneckHalf, brooklynHalf } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  NextDeadline: { filters: defaultFilters },
  RaceDay: { filters: { ...defaultFilters, sort: "raceday" } },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = undefined;
