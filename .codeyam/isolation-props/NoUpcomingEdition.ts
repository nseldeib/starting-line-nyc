import type Component from "../../app/components/NoUpcomingEdition";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { organizerUrl: "https://nycruns.com" },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 1200;
