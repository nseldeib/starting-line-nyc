import type Component from "../../app/components/HeroSearch";
import type { ComponentProps } from "react";
import { NOW, defaultFilters, defaultResults, manhattanHalf, nycHalf, greenbeltHalf, breakneckHalf, brooklynHalf } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { filters: defaultFilters, count: 4 },
  SearchTyped: { filters: { ...defaultFilters, q: "Brooklyn", distance: "any", when: "12m", terrain: "road" }, count: 1 },
  NoMatches: { filters: { ...defaultFilters, distance: "marathon" }, count: 0 },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1040;
