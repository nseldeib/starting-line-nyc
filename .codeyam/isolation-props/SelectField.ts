import type Component from "../../app/components/SelectField";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: {
    id: "distance",
    label: "Distance",
    value: "half",
    options: [
      { value: "any", label: "Any distance" },
      { value: "10k", label: "10K" },
      { value: "half", label: "Half marathon" },
      { value: "marathon", label: "Marathon" },
    ],
  },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 260;
