import type Component from "../../app/components/ResultsHeader";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { heading: "Half marathons, next 6 months", count: 4 },
  SingleRace: { heading: "Ultras", count: 1 },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1200;
