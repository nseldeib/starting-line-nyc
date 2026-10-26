import type Component from "../../app/components/RaceThumb";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Photo: { photoUrl: "/images/central-park-drive.jpg", photoAlt: "Runners on the Central Park drive", distanceMiles: 13.1 },
  DistanceTile: { photoUrl: null, photoAlt: null, distanceMiles: 13.1 },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 76;
