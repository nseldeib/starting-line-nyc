import type Component from "../../app/components/Hero";
import type { ComponentProps } from "react";
import { createElement } from "react";
import HeroSearch from "../../app/components/HeroSearch";
import { NOW, defaultFilters, defaultResults, manhattanHalf, nycHalf, greenbeltHalf, breakneckHalf, brooklynHalf } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { children: createElement(HeroSearch, { filters: defaultFilters, count: 4 }) },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1200;
