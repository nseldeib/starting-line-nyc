import type Component from "../../app/components/SaveRaceButton";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { raceName: "Fred Lebow Manhattan Half" },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = undefined;
