import type Component from "../../app/components/RaceRow";
import type { ComponentProps } from "react";
import { centralParkHalf, bigBearHalf, escarpment, donuts10k } from "./_fixtures";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  UrgentDeadline: { race: centralParkHalf, urgent: true },
  ExactTimeTrail: { race: bigBearHalf, urgent: false },
  QualifierNotAnnounced: { race: escarpment, urgent: false },
  NoPhotoRoad: { race: donuts10k, urgent: true },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 1200;
