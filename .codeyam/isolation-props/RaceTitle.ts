import type Component from "../../app/components/RaceTitle";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Trail: { name: "Big Bear Squatch North Half Marathon", terrain: "trail", organizer: "Sassquad & NY-NJ Trail Conference", place: "Anthony Wayne Recreation Area, Harriman State Park, Bear Mountain, NY" },
  Road: { name: "Great Gobble 5K", terrain: "road", organizer: "NYCRUNS", place: "Prospect Park, Brooklyn" },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 900;
