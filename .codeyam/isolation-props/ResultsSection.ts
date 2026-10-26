import type Component from "../../app/components/ResultsSection";
import type { ComponentProps } from "react";
import { NOW, defaultFilters, defaultResults } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { races: defaultResults, filters: defaultFilters, now: NOW },
  Empty: { races: [], filters: { ...defaultFilters, distance: "marathon", when: "any" }, now: NOW },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1200;
