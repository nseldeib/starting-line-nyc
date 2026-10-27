import type Component from "../../app/components/GlanceActions";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  RegisterAndSave: {
    official: { href: "https://nycruns.com/races/?race=nycruns-brooklyn-experience-half-marathon", label: "Register on the official site" },
    save: { slug: "nycruns-brooklyn-experience-half-marathon", raceName: "Brooklyn Experience Half Marathon" },
  },
};

// Capture width matches the actions area beside the facts on the race page.
export const captureWidth: number | undefined = 600;
