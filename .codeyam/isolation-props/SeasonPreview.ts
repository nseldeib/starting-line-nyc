import type Component from "../../app/components/SeasonPreview";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: {},
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 667;
