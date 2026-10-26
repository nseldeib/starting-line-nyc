import type Component from "../../app/components/RaceIdentity";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Road: { name: "Fred Lebow Manhattan Half", terrain: "road", distanceMiles: 13.1, elevationGainFt: null, organizer: "NYRR" },
  TrailWithClimb: { name: "Breakneck Point Trail Half", terrain: "trail", distanceMiles: 13.1, elevationGainFt: 3100, organizer: "Hudson Valley Trail Co." },
  LongNameUltra: { name: "Harriman State Park Trail 50K Ultramarathon", terrain: "trail", distanceMiles: 31.1, elevationGainFt: 5200, organizer: "Hudson Valley Trail Co." },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 326;
