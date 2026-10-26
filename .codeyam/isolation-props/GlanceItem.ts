import type Component from "../../app/components/GlanceItem";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { label: "Race day", value: "Sat, Apr 3", sub: "9:00 am ET start" },
  Emphasis: { label: "Next deadline", value: "Thu, Dec 31", sub: "Last day at the current price", emphasis: true },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 200;
