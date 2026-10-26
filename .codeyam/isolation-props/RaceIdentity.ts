import type Component from "../../app/components/RaceIdentity";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Road: { name: "Big Apple Half Marathon", terrain: "road", distanceMiles: 13.1, elevationGainFt: null, organizer: "NYCRUNS", href: "/races/nycruns-big-apple-half-marathon" },
  TrailWithClimb: { name: "Escarpment Trail Run", terrain: "trail", distanceMiles: 18.6, elevationGainFt: 4800, organizer: "Escarpment Trail Run", href: "/races/escarpment-trail-run" },
  LongNameUltra: { name: "Big Bear Squatch North Half Marathon", terrain: "trail", distanceMiles: 13.1, elevationGainFt: 2600, organizer: "Sassquad & NY-NJ Trail Conference", href: "/races/big-bear-squatch-north-half" },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 326;
