import type Component from "../../app/components/FilterToolbar";
import type { ComponentProps } from "react";
import { defaultFilters } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { filters: defaultFilters },
  LotterySortedByRaceDay: { filters: { ...defaultFilters, status: ["lottery"], sort: "raceday" } },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1200;
