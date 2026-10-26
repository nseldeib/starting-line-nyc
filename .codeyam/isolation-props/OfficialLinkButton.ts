import type Component from "../../app/components/OfficialLinkButton";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Register: { href: "https://runsignup.com/Race/NY/BearMountain/BigBearSquaTChNorth", label: "Register on the official site" },
  VisitSite: { href: "https://escarpmenttrail.com/", label: "Visit the official site" },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = undefined;
