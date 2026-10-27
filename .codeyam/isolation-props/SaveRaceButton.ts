import type Component from "../../app/components/SaveRaceButton";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { slug: "nycruns-big-apple-half-marathon", raceName: "Big Apple Half Marathon" },
  MenuOpen: { slug: "nycruns-big-apple-half-marathon", raceName: "Big Apple Half Marathon" },
  SignedUpMenu: { slug: "nycruns-brooklyn-experience-half-marathon", raceName: "Brooklyn Experience Half Marathon" },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = undefined;
