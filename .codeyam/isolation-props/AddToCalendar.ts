import type Component from "../../app/components/AddToCalendar";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route. The open state is
// reached by the scenario's `interactions` (click "Add to calendar").
export const scenarios: Record<string, Props> = {
  Closed: { href: "/api/races/big-bear-squatch-north-half/calendar?milestone=16" },
  OpenDeadline: { href: "/api/races/escarpment-trail-run/calendar?milestone=1" },
};

// Capture width matches the timeline column on the race page.
export const captureWidth: number | undefined = 640;
