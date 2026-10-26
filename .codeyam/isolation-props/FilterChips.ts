import type Component from "../../app/components/FilterChips";
import type { ComponentProps } from "react";
import { defaultFilters } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { filters: defaultFilters },
  StatusChipsOn: { filters: { ...defaultFilters, q: "Harriman", terrain: "trail", status: ["open", "train12"] } },
  NothingNarrowing: { filters: { ...defaultFilters, distance: "any", when: "any" } },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 900;
